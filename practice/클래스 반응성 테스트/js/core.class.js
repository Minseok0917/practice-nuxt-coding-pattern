class Core {
  static #targets = new WeakMap(); // key : object, value : new Set()
  static #activeEffect; // computed, watch 같은 종속성 함수들 추가용

  /* @구독
      weakMap(target, new Map(key, new Set())) 객체를 기준으로 저장하고 KEY별 SET이 있는데 computed, watch 관련된 의존성 담아두는곳임
      최종적으론 특정 KEY의 의존성이 있는 녀석들을 모아두는건데 SET으로 동일한건 중복되지 않게끔 추가하고 의존성들은 추가 또는 실행을 시킴
    */
  static #subscribe(target, key) {
    const depsMap = this.#targets.get(target) ?? this.#targets.set(target, new Map()).get(target);
    const depsEffects = depsMap.get(key) ?? depsMap.set(key, new Set()).get(key);
    return depsEffects;
  }

  /* @등록
      activeEffect 가 있을 때 SET에 의존성이 변경됐을 때 실행될 함수들을 집어넣음
    */
  static track(target, key) {
    this.activeEffect && this.#subscribe(target, key).add(this.activeEffect);
  }

  /* @실행
      의존성 요소가 값이 변경됐을 때 의존 요소를 모아둔 SET에 있는 모든 요소를 한 번씩 실행 시킴
    */
  static trigger(target, key) {
    this.#subscribe(target, key).forEach((effect) => effect());
  }
}

class Ref {
  #value;
  static create = (value) => new Ref(value);
  constructor(value) {
    this.#value = value;
  }
  get value() {
    Core.track(this, "value");
    return this.#value;
  }
  set value(newValue) {
    this.#value = newValue;
    Core.trigger(this, "value");
  }
}

class Reactive {
  #value;
  static create = (value) => new Reactive(value);
  constructor(value) {
    this.#value = new Proxy(value, {
      get(target, key) {
        Core.track(target, key);
        return target[key];
      },
      set(target, key, newValue) {
        target[key] = newValue;
        Core.trigger(target, key);
        return target[key];
      },
    });
    return this.#value;
  }
}

class ComputedFunctionFactory {
  /* 
      함수형 computed는 get 밖에 존재하지 않기에 의존되어있는 반응형객체가 변경되면 변경될 수밖에 없어서 getter 밖에 없으며, 
      변경될 당시에 computed를 의존하고 있는 모든 반응성 객체 또한 신규 업데이트 되어야함
  
      생성자에서 activeEffect 를 한 번 선언하고 값이 변경될 때마다 인수로 넘긴 함수를 실행 시켜서 값을 업데이트 시킴
      그리고 Core의 activEffect 를 실행시키므로 의존되어있는 객체들의 getter가 실행될 것이며 실행될 때 Core.track가 실행되며 activeEffect가 있으면 종속으로 들어감
      이후 종속으로 들어갔으므로 이후에는 activeEffect 값을 null로 초기화 진행
     */

  #value;
  constructor(updateFunction) {
    Core.activeEffect = () => {
      this.#value = updateFunction();
      Core.trigger(this, "value"); // computed와 의존 관계 함수들 전체 실행
    };
    Core.activeEffect();
    Core.activeEffect = null;
  }

  get value() {
    Core.track(this, "value");
    return this.#value;
  }
}
class ComputedObjectFactory {
  #value;
  #updateObject;
  constructor(updateObject) {
    this.#updateObject = updateObject;

    Core.activeEffect = () => {
      this.#value = updateObject.get();
      Core.trigger(this, "value");
    };
    Core.activeEffect();
    Core.activeEffect = null;
  }
  get value() {
    Core.track(this, "value");
    return this.#value;
  }
  set value(newValue) {
    this.#updateObject.set(newValue);
    Core.trigger(this, "value");
  }
}

const computedFactorys = new Map();
computedFactorys.set("function", ComputedFunctionFactory);
computedFactorys.set("object", ComputedObjectFactory);

class ComputedCore {
  constructor(update) {
    const shouldFactory = computedFactorys.get(typeof update);
    if (!shouldFactory) throw new Error("지원하지 않는 타입입니다.");

    const factoryInstance = new shouldFactory(update);
    return factoryInstance;
  }
}

const userName = Ref.create("minseok");

const user = Reactive.create({
  name: "minseok",
  age: 21,
});

const userInfoA = new ComputedCore(() => `${user.name}/${user.age}`);
const userInfoB = new ComputedCore({
  get() {
    return `${user.name} 안녕하세요 ${user.age}살 입니다.`;
  },
  set({ name, age }) {
    user.name = name;
    user.age = age;
    console.log(user);
  },
});

console.log(userInfoA.value);
console.log(userInfoB.value);
userInfoB.value = { name: "junseo", age: 19 };
console.log(userInfoA.value);
console.log(userInfoB.value);
