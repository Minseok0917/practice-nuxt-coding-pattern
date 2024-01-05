- A : 필수

### 멀티워드 컴포넌트 사용

단순하게 직설적인 Item 으로 사용하지 않고 TodoItem 이런 형식으로 사용하기

### 상세한 Prop 정의

예전에 귀찮을 땐 A 많이 사용했는데, 요즘은 B를 많이 사용하긴 함  
TS 도입후 validator 부분 제외하면 type, required 는 명시하면서 B 방법을 사용했음

```javascript
// A - 안좋은 예시
const props = defineProps(["status"]);

// B - 좋은 예시
const props = defineProps({
    status:String
})

// C - 더 좋은 예시
const props = defineProps({
    status:{
        type:String
        required:true,
        validator: (value) => {
            return ['syncing', 'synced', 'version-conflict', 'error'].includes(
                value
            )
        }
    }
});
```

### v-for 에 key 사용하기

거의 맨날 사용해서 딱히 상관없을듯 중요한건 **고유KEY**

### v-if 와 v-for를 함께 사용하지 않기

이것도 코딩 습관중에 별로 안이뻐서 하지 않았는데 적절하게 사용하는것이였네

### 컴포넌트 범위 스타일 사용하기

SFC 에서 style 태그 사용할 때 scope 옵션 넣어서 해당 컴포넌트에서만 적용되게 하라는 뜻  
개인적으로 scope 옵션을 많이 사용하진 않음 Tailwind 를 사용하고 따로 파일 분류하기 때문에  
참고로 CSS module 도 있어서 module 옵션 넣고 $style 로 class 명을 가져올 수도 있음  
BEM 스타일을 섞어서 사용하면 좋음

- B : 강력 추천

### 컴포넌트 파일

컴포넌트는 JS 확장자로 선언하지 말고 따로 vue 확장자 파일로 만들자는 뜻

### 싱글 파일 컴포넌트 파일명 대/소문자

컴포넌트 네이밍은 파스칼 또는 케밥 케이스로 권장

- 파스칼 : MyComponent
- 케밥 : my-component

### 기본 컴포넌트 이름

앱별 스타일과 규칙을 적용하는 기본 컴포넌트들 모두 Base, App, V 같은 특정 접두사 설정해두기  
개인적으로는 Template 요소는 The 라는 요소를 자주 사용함  
그외에는 아마 Base 를 붙여서 사용하는거 같음

### 긴밀하게 결합된 컴포넌트 이름

부모 컴포넌트에 의존하고 있는 자식 컴포넌트들은 부모 컴포넌트 이름을 접두사로 둔다.  
컴포넌트 이름도 거의 BEM 방식 비스무리하게 따라가면 괜찮다.

```javascript
// not
/*
 components/
    TodoList.vue
    TodoItem.vue
    TodoButton.vue
*/

// good
/*
 components/
    TodoList.vue
    TodoListItem.vue
    TodoListItemButton.vue
*/
```

### 컴포넌트 이름 내 단어 순서

당연한 소리지만... ClearSearchButton, RunSearchButton 일 경우 알파벳 순서 정렬인 파일에선 어지럽게 정렬되어있어서 보기 힘들다.

그렇기에 SearchButtonClear, SearchButtonRun 처럼 동일하거나 많이 사용하는 용어들을 앞으로 우선순위를 정해서 순서를 정렬한다.

### 셀프 클로징 컴포넌트

보통 평상시에 하위 요소에 slot 보낼 내용들을 넣어두는 얘들만 케밥 으로 사용함 `<todo-item></todo-item>` (in-dom 템플릿이라고 부름)
그리고 한 번만 사용하는 것을들 파스칼로 사용함 `<TodoItem />` 이 방법에 차이가 있다고함

케밥 일 경우에 하위에 slot 요소를 넣는다고 가정하에 실행하고  
파스칼 일 경우에 따로 생각하지 않고 넣기에 파스칼로 사용하는걸 케밥으로 하면 컴파일러에서 한 번도 내려간다고 함

요약 : 하위요소로 slot 를 넘기는 패턴이 아니면 파스칼 넘기면 케밥 패턴 사용하자

### 템플릿 내 컴포넌트 이름 대/소문자 구분

약간 이건 컨벤션인디... 위에 있던것과 비슷함  
단일 요소는 파스칼, 다수 요소는 케밥인데 이미 컨벤션이 케밥으로 하고 있으면 전체 다 케밥으로 해도 됌 이럼

### JS/JSX의 컴포넌트 이름 대/소문자

전역으로 컴포넌트 선언해야되는 경우에는 케밥 또는 파스칼로 선언하자

### 전체 단어 컴포넌트 이름

컴포넌트 이름은 약어보단 전체 단어를 사용하자

### prop 이름 대소문자

일종의 컴포넌트 형식에 맞춰서 일관성 있게 props 네이밍 형식을 정해라 이소리임  
케밥이면 케밥으로 넘기고, 파스칼이면 케밥 또는, 카멜로 넘기자

### 다중 속성 엘리먼트

여러 속성을 가진 엘리먼트는 한 줄 당 하나의 속성만 사용하자  
이 부분은 prettier 가 알아서 해결해 줍니다. (그냥 속성당 내리라는 뜻 직관적으로)

### 템플릿의 간단한 표현식

template 안에서 코드를 사용해서 가공하지 않고 computed 사용해서 계산된 값을 가져오라는 뜻

### 단순 계산 프로퍼티

복잡한 계산은 단순한 프로퍼티(computed)를 많이 만들어서 계산하면 직관적이게 이해하기 편함

### 따옴표로 묶인 속성 값

안하면 에러나오는 설정이긴한데, `<input  type=text/>` 같은 `"text"` 로 변경해야됌 따옴표 추가 관련된것

### 지시어 단축

이게 아마 제일 꿀팁이 아닐까 싶다.. 지시어 단축 또는 통일화 (그냥 단축하세요)

- v-bind:value => :value
- v-on:input => @input
- v-slot:header => #header
- :value, @setValue => v-model:value, value, update:value

- C : 추천

### 컴포넌트/인스턴스 옵션 순서

컴포넌트 안에 코드 작성할 떄 권장순서인데 그냥 알아서 잘 분리하면 될 듯함 필수는 아닌 듯  
어차피 vue3 부터는 6 => 5, 4, 7, 8 ,9 인듯

1. 글로벌 인지도 : name
2. 템플릿 컴파일러 옵션 : compilerOption
3. 템플릿 의존성 : components, directive
4. 구성 : extends, mixins, provide / inject
5. 인터페이스 : inheritAttrs, props, emits
6. 구성 API : setup
7. 로컬 상태 : data, computed
8. watch, 라이프사이클
9. 비반응형 속성 : methods
10. 렌더링 : template, render

### 요소 속성 순서

컴포넌트 요소 작성 순서는 어차피 컴포넌트에 그렇게 많이 넣는 구조도 아니라서 필수는 아니라고 생각함

1. 정의문 : is
2. 목록 렌더링 : v-for
3. 조건부 : v-if, v-else-if, v-else, v-show, v-cloak
4. 렌더링 수정자 : v-pre, v-once
5. 글로벌 인지도 : id
6. 고유속성 : ref, key
7. 양방향 바인딩 : v-model
8. 기타속성 : 모든 지정되지 않은 바인딩 및 바인딩 되지 않은 속성
9. 이벤트 : v-on
10. 내용 : v-html, v-text

### 컴포넌트/인스턴스 옵션에서의 빈 줄

코드 하나 쓰면 간격을 한 칸씩 띄워두라는 뜻 매번 띄우라는건 아니고, 그냥 defineProps, ref, reactive, computed, watch 같은 **함수** 들을 사용할 때나 특정 코드의 역할별 분리하든가 쨋든 그럴때 마다 한 칸씩 띄워서 영역 분리해주삼

### 싱글 파일 컴포넌트 최상위 요소 순서

SFC 에서는 3개의 태그를 넣어둘 수 있음, `template` `script` `style`  
코드 작성하는 사람이 여러명이면 형식이 일치하지 않을 수도 있음

참고로 본인은 `template` => `scirpt` => `style` 순서대로 작성함  
만약 변경의 여지가 있으면 `script` => `template` => `style` 일 듯함  
하지만 변경하지 않고 이전 방법을 계속 사용할 듯함 왜냐하면 유지보수 입장에선 template 를 먼저 파악하고 컴포넌트 구조를 파악해야되기 때문이다.

- D : 주의해서 사용

### scope 에서 요소 선택자

scope 는 말 그대로 선언한 vue 파일 코드에서만 동작하는 CSS 이기에  
요소선택자로 변경하면 처리하는데 속도에 문제가 생긴다 (애초에 scope 에서 요소 선택자 가공하는것 부터가 안티패턴이라고 생각함)

### 암시적인 부모-자식 커뮤니케이션

instance 뜯어서 붙지 말고 prop, emit 사용해서 해라
