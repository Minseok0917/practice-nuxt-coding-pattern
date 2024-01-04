export class Core {
  static #targets = new WeakMap();
  static #activeEffect;

  static #subscribe(target, key) {
    const depsMap = this.#targets.get(target) ?? this.#targets.set(target, new Map()).get(target);
    const depsEffects = depsMap.get(key) ?? depsMap.set(key, new Set()).get(key);
    return depsEffects;
  }

  static addEffect(effectFunction) {
    this.#activeEffect = effectFunction;
    this.#activeEffect();
    this.#activeEffect = null;
  }

  static track(target, key) {
    this.#activeEffect && this.#subscribe(target, key).add(this.#activeEffect);
  }

  static trigger(target, key) {
    this.#subscribe(target, key).forEach((effect) => effect());
  }
}

export class CoreProxyFactory {
  static proxyGetter(target, key) {
    Core.track(target, key);
    return target[key];
  }
  static proxySetter(target, key, value) {
    target[key] = value;
    Core.trigger(target, key);
  }
}
