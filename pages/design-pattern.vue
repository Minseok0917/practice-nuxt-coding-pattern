<template>
  <div>
    <h1>Design Pattern</h1>
  </div>
</template>
<script lang="ts" setup>
namespace Student {
  export type Builder = InstanceType<typeof Student.Builder>;
}

class Student {
  private readonly name: string = "";
  private readonly age: number = 0;
  private constructor(builder: Student.Builder) {
    this.name = builder.name;
    this.age = builder.age;
  }
  public static Builder = class {
    private _name: string = "";
    private _age: number = 0;

    public setName(name: string) {
      this._name = name;
      return this;
    }
    public setAge(age: number) {
      this._age = age;
      return this;
    }
    public build(): Student {
      return new Student(this);
    }

    public get name() {
      return this._name;
    }
    public get age() {
      return this._age;
    }
  };
}
const a = new Student.Builder().setName("민석").setAge(21).build();
console.log(a);
// const students: Student[] = [
//   new Student.Builder().setName("규량").setAge(21),
//   new Student.Builder().setName("장혁").setAge(21),
// ];
</script>
