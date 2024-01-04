import { shallowRef, shallowReactive, computed } from "./core/index.js";

const name = shallowRef("민석");
const introduce = computed(() => `안녕하세요 저는 ${name.value}입니다.`);

name.value = "정민석";
