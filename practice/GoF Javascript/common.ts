/* ======================================================================= */
/* 싱글톤 패턴
  싱클톤 패턴은 클래스의 인스턴스가 단 하나만 생성되로고 보장되어야함
*/
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
  setName(name: string) {
    this.name = name;
  }
  setAge(age: number) {
    this.age = age;
  }
}

const developerInfoA = DeveloperInfo.getInstance();
const developerInfoB = DeveloperInfo.getInstance();
console.log(developerInfoA === developerInfoB); // true
/* ======================================================================= */
/* 빌더 패턴
  빌더 패턴은 복잡한 객체의 생성 과정을 단계별로 분리한다.
*/
class Student {
  private readonly name: string = "";
  private readonly age: number = 0;
  private constructor(builder: InstanceType<typeof Student.Builder>) {
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
const students: Student[] = [
  new Student.Builder().setName("민석").setAge(21).build(),
  new Student.Builder().setName("규량").setAge(21).build(),
  new Student.Builder().setName("장혁").setAge(21).build(),
];
/* ======================================================================= */
