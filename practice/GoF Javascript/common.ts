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
  private name: string = "";
  private age: number = -1;
}

class StudentBuilder {
  private student: Student;
  constructor() {
    this.student = new Student();
  }
  setName(name: string) {
    this.student.name = name;
    return this;
  }
  setAge(age: number) {
    this.student.age = age;
    return this;
  }
  builder() {
    return this.student;
  }
}
const students: Student[] = [
  new StudentBuilder().setName("민석").setAge(21).builder(),
  new StudentBuilder().setName("규량").setAge(21).builder(),
  new StudentBuilder().setName("장혁").setAge(21).builder(),
];
/* ======================================================================= */