<template>
  <div>
    <h1>Design Pattern</h1>
  </div>
</template>
<script lang="ts" setup>
class DeveloperInfo {
  private static developerInfoInstance = new DeveloperInfo();
  private name: string = "Minseok Jung";
  private age: number = 21;

  static getInstance(): DeveloperInfo {
    return this.developerInfoInstance;
  }

  getDeveloperInfo() {
    return {
      name: this.name,
      age: this.age,
    };
  }
}

const UserA = DeveloperInfo.getInstance();
const UserB = DeveloperInfo.getInstance();
console.log(UserA === UserB, UserA.getDeveloperInfo());
</script>
