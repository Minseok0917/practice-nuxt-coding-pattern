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

class CoreProxyFactory {
  static proxyGetter(target, key) {
    Core.track(target, key);
    return target[key];
  }
  static proxySetter(target, key, value) {
    target[key] = value;
    Core.trigger(target, key);
  }
}

export function shallowRef(initialValue) {
  // object get, set 은 : 으로 표시가 불가능해서 별로 이쁘지 않아서 한 줄처리되는 defineProperty로 작성
  const state = { value: initialValue };
  return Object.defineProperty({}, "value", {
    get: () => CoreProxyFactory.proxyGetter(state, "value"),
    set: (value) => CoreProxyFactory.propertySetter(state, "value", value),
  });
}
export function shallowReactive(initialObject) {
  return new Proxy(initialObject, {
    get: CoreProxyFactory.proxyGetter,
    set: CoreProxyFactory.proxySetter,
  });
}

shallowRef("dsasd");
