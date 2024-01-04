import { CoreProxyFactory } from "./core.js";
import { shallowReactive } from "./_shallowReactive.js";

export function shallowRef(initialValue) {
  const state = { value: initialValue };
  return Object.defineProperty({}, "value", {
    get: () => CoreProxyFactory.proxyGetter(state, "value"),
    set: (value) => {
      CoreProxyFactory.proxySetter(state, "value", value);
    },
  });
}
