class Core {
  static #targets = new WeakMap();
  static #activeEffect;

  static #subscribe(target, key) {
    const depsMap = this.#targets.get(target) ?? this.#targets.set(target, new Map()).get(target);
    const depsEffects = depsMap.get(key) ?? depsMap.set(key, new Set()).get(key);
    return depsEffects;
  }

  static track(target, key) {
    this.activeEffect && this.#subscribe(target, key).add(this.activeEffect);
  }

  static trigger(target, key) {
    this.#subscribe(target, key).forEach((effect) => effect());
  }
}

function ref(value) {
  const instance = {
    get value() {
      track(instance, "value");
      return value;
    },
    set value(newValue) {
      value = newValue;
      trigger(instance, "value");
    },
  };
  return instance;
}
function reactive(value) {
  const instance = new Proxy(value, {
    get(target, key) {
      track(target, key);
      return target[key];
    },
    set(target, key, newValue) {
      target[key] = newValue;
      trigger(target, key);
      return target[key];
    },
  });
  return instance;
}

const computedFactorys = new Map();
computedFactorys.set("function", computedFunctionFactory);
computedFactorys.set("object", computedObjectFactory);
function computed(update) {
  const shouldFactory = computedFactorys.get(typeof update);
  if (!shouldFactory) throw new Error("지원하지 않는 타입입니다.");

  const factoryInstance = shouldFactory(update);
  return factoryInstance;
}

function computedFunctionFactory(updateFunction) {
  let value;
  const instance = {
    get value() {
      track(instance, "value");
      return value;
    },
  };
  activeEffect = () => {
    value = updateFunction();
    trigger(instance, "value");
  };
  activeEffect();
  activeEffect = null;
  return instance;
}
function computedObjectFactory(updateObject) {
  let value;
  const instance = {
    get value() {
      value = updateObject.get();
      track(instance, "value");
      return value;
    },
    set value(newValue) {
      updateObject.set(newValue);
      trigger(instance, "value");
    },
  };
  activeEffect = () => {
    value = updateObject.get();
    trigger(instance, "value");
  };
  activeEffect();
  activeEffect = null;
  return instance;
}
