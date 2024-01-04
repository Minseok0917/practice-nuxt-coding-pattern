import { CoreProxyFactory } from "./core.js";

export function shallowReactive(initialObject) {
  return new Proxy(initialObject, {
    get: CoreProxyFactory.proxyGetter,
    set: CoreProxyFactory.proxySetter,
  });
}
