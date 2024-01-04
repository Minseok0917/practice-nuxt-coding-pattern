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

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name;
  }
}

const a = shallowReactive([new User("철수", 10), new User("유리", 1), new User("맹구", 2), new User("훈이", 4)]);
const b = computed(() => a.map((user) => user.getName()));

console.log(a, b.value);
