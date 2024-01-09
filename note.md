#### 2024.01.08

프론트엔드에서 빌더 패턴을 사용할 떄 고민의 여지가 생김...  
처음에는 GPT한테 예제를 달라고하고 좀 고쳐봤음

```ts
class Student {
  private name: string = "";
  private age: number = 0;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
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
    return new Student(this.name, this.age);
  }
}

const student: Student = new StudentBuilder().setName("민석").setAge(21).builder();
```

위에 방법이 제일 간단한 빌드 패턴 방법이긴한데 몇 가지 케이스를 생각하면 고민사항이 생김

1. Student 클래스 수정은?... 이후 불변성은?...
2. name, age만 있지만 값이 더 많이지면 따로 분리되어있는 종속 프로퍼티인데 문제가 생기지 않을까?

```java
public class StudentConfig{
  private String name;
  private Number age;
  private StudentConfig(Builder builder){
    this.name = builder.name;
    this.age = builder.age;
  }
  public static class Builder{
    private static final String name;
    private static final Number age;
    public StudentConfig build(){
      return new StudentConfig(this)
    }
    public Builder setName(String name){
      this.name = name;
      return this;
    }
    public Builder setAge(Number age){
      this.age = age;
      return this;
    }
  }
}
```

<디자인 패턴의 아름다움> 책에서는 빌더 패턴을 예제를 이렇게 소개해주는데 자바 코드다.  
자바에서는 클래스 안에 또 다른 클래스를 선언할 수 있어서 같은 클래스내에서는 `private` 이라도 데이터를 가져올 수 있나보다...  
위에 코드의 포인트는 Builder의 build 함수에서 상위 클래스를 인스턴스로 만들면서 현재 인스턴스의 값을 this로 보내는거다.  
그걸 StudentConfig 에서 받아서 단 하나의 매개변수로 builder 정보를 가져올 수 있어서 가독성이 매우 좋다고 말할 수 있다. (타쓰는 이게 어려움)

```ts
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
    public build() {
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

const student = Student.Builder().setName("민석").setAge(21).build();
console.log(student.name, student.age);
```

가독성을 좋게 하려면 namespace 로 Builder에 대한 타입 명시를 다시 할 수 있지만 생성자가 많이지면 그렇게 해야될 거 같기도 하다(아니면 처음부터 명시적 전략으로 가는것도 좋을지도)  
위에 1, 2번 질문에 대한건 1번 같은 경우에는 수정해야되는 경우에 새로 만들어야되는거라 Builder를 실행해야되는 부분인거 같다. (수정과 불변성 해결)  
2번에 해당하는 질문은 어쩔수 없는 부분이 있는거 같다. 결국 Builder 에서 가공해서 Student 객체에 추가항목이 생길수도 있는거다. 추상화 클래스, 인터페이스로도 해결할 수 없는 노릇이다...

#### 2024.01.04 ~ 2024.01.05

Vue에서 MVVM을 수행할 때는 Ref, Reactive 같은 반응성 객체가 필요한데  
데이터를 구축하거나 읽어온 데이터를 수정해야하는 상황에서 관련 이벤트에서 수정을 진행해야함  
하지만 이렇게 코드를 작성할 경우 코드 수정의 대한 의존성이 이벤트 코드로 넘어가게 됨

이걸 회피하는 방법은 응집도를 높이는 Class구조로 개발해서 수정함수를 제공하는것이라고 생각함  
그래서 Vue에서 Ref, Reactive가 Class 내의 값의 수정로 반응을 하는지 테스트를 해봤는데 가능함  
단 Proxy 가 아닌 객체에서 호출하는 경우에는 당연히 감지할 수 없기에 잘 알고 코드를 작성해야함

Class로 작성할 경우 API 응답값으로 데이터를 가져왔을 떄 Class 직렬화가 필요한 상태다.  
Class 직렬화를 지원하는 라이브러리는 `class-transfomer`인데 Nuxt3에 데코레이터 기능을 사용할 때 문제가 발생함.  
해당 라이브러리에서는 `expose` 라는 데코레이터 함수를 제공하는데 만약 Class Property의 이름이 name 인데 백엔드에서 user_name 으로 줬을 때  
따로 조절해서 변경할 수 있는 데코레이터인데 `nuxt3`에서는 데코레이터 파서에러가 발생하기 됐음

데코레이터 파서에러가 발생한 이유는 Nuxt3는 ESBuild를 사용하는데 ESBuild에서는 정식으로 데코레이터를 지원하지 않았음  
[https://github.com/evanw/esbuild/issues/104](https://github.com/evanw/esbuild/issues/104) 에서 읽어보면 지원을 준비중이라고 하는듯함  
ESBuild에서 지원하지 않으면 따로 ESBuild를 포기하고 사용하든 해야는데 그러고 싶진 않아서 `expose` 데코레이터는 나중에 사용하기로 함
