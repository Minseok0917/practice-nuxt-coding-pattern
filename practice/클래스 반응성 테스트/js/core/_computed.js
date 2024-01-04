import { Core, CoreProxyFactory } from "./core.js";

class IComputedTypeFactory {
  read() {}
}
class ComputedFunctionFactory {
  constructor(computedFunction) {
    const state = { value: null };

    Core.addEffect(() => {
      state.value = computedFunction();
      Core.trigger(state, "value");
    });
    return Object.defineProperty({}, "value", {
      get: () => CoreProxyFactory.proxyGetter(state, "value"),
    });
  }
}
class ComputedObjectFactory {}

class ComputedFactory {
  static factorys = new Map();
  static initialize() {
    this.factorys.set("function", ComputedFunctionFactory);
    this.factorys.set("object", ComputedObjectFactory);
  }
}

export function computed(computedUpdated) {
  const computedFactory = ComputedFactory.factorys.get(typeof computedUpdated);
  if (!computedFactory) throw new Error(`computed don't ${typeof computedUpdated} type`);

  return new computedFactory(computedUpdated);
}

ComputedFactory.initialize();
