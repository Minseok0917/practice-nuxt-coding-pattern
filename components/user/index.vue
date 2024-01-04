<template>
  <div>
    <table>
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
    </table>
  </div>
</template>
<script setup lang="ts">
import { plainToInstance } from "class-transformer";
import { User } from "./user.class";
const users: User[] = plainToInstance(User, [
  {
    name: "정민석",
    age: 21,
  },
  {
    name: "권규량",
    age: 21,
  },
  {
    name: "윤장혁",
    age: 21,
  },
]);

const reactiveUsers = reactive<User[]>(users);

console.log(reactiveUsers);
</script>
