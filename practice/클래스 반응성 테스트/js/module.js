import { shallowRef, shallowReactive, computed } from "./core/index.js";

const name = shallowRef("민석");
const introduceA = computed(() => `안녕하세요 저는 ${name.value}입니다.`);
const introduceB = computed({
  get: () => `${name.value} 입니다.`,
  set: (newName) => {
    name.value = newName;
  },
});

const reactivityChecked = () => console.log(`${name.value} / ${introduceA.value} / ${introduceB.value}`);

reactivityChecked();
name.value = "민석02";
reactivityChecked();
introduceB.value = "민석2024";
reactivityChecked();
