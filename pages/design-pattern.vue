<template>
  <div>
    <h1>Design Pattern</h1>
  </div>
</template>
<script lang="ts" setup>
class Student {
  private name: string = "";
  private age: number = 0;
  constructor(builder: StudentBuilder) {
    this.name = builder.name;
    this.age = builder.age;
  }
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
}

class StudentBuilder {
  private name: string = "";
  private age: number = 0;
  setName(name: string) {
    this.name = name;
    return this;
  }
  setAge(age: number) {
    this.age = age;
    return this;
  }
  builder() {
    return new Student(this);
  }
}

class StudentA {
  private name: string = "";
  private age: number = 0;
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
  setName(name: string) {
    this.name = name;
    return this;
  }
  setAge(age: number) {
    this.age = age;
    return this;
  }
}

const student = new StudentBuilder().setName("정민석").setAge(21).builder();

new StudentA().setName("민석").setAge(21);
</script>
