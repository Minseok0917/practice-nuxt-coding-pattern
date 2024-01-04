<template>
  <div>
    <!-- {{ a }} -->
    dasdasdsa
    {{ a }}
    <!-- <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>나이</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in reactiveUsers" :key="user.getUser.name">
          <td @click="() => user.setName('이병헌')">{{ user.getUser.name }}</td>
          <td>{{ user.getUser.age }}</td>
          <td></td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>
<script setup lang="ts">
import { plainToInstance } from "class-transformer";
// import { User } from "./user.class";
// const users: User[] = plainToInstance(User, [
//   {
//     name: "정민석",
//     age: 21,
//   },
//   {
//     name: "권규량",
//     age: 21,
//   },
//   {
//     name: "윤장혁",
//     age: 21,
//   },
// ]);

// const reactiveUsers = reactive<User[]>(users);

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.list = [0, 1, 2];
  }
  addList(n) {
    this.list.push(n);
    this.addN("테스트용");
  }
  addN(n) {
    this.list.push(n);
  }
}
const u0 = new User("민석", 21);
const a = reactive([u0, new User("규량", 21), new User("장혁", 21), new User("혁도", 21)]);

setTimeout(function () {
  a[0].addList(3);
  //   a.value.lists ||= [];
  //   a.value.lists.push(1);
}, 1000);

/* class MyClass {
  constructor() {
    this.entries = ["a"];

    //=== example change triggered from INSIDE the class ===
    setTimeout(() => {
      this.entries.push("c");
    }, 1000);
  }
}

const my = reactive(new MyClass());
setTimeout(() => {
  my.entries.push("b");
}, 500); */
</script>
