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

1. Student 클래스 수정은?...
2. name, age만 있지만 값이 더 많이지면 따로 분리되어있는 종속 프로퍼티인데 문제가 생기지 않을까?

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
