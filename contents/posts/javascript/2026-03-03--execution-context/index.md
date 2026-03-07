---
date: '2026-03-03 21:30:00 +0900'
title: '[JavaScript] Execution Context (실행 컨텍스트)'
summary: '실행 컨텍스트는 실행 문맥이라고도 한다. 실행 컨텍스트(Execution Context)는 실행 할 코드에 제공할 환경 정보들을 모아놓은 객체다.'
author: ['aluvy']
categories: ['JavaScript']
tags: ['JavaScript']
# thumbnail: './cover.png'
---

# Execution Context

실행 컨텍스트는 실행 문맥이라고도 한다.   
실행 컨텍스트(Execution Context)는 **실행 할 코드에 제공할 환경 정보들을 모아놓은 객체다.**{: .fc-primary}   
실행 컨텍스트는 scope, hoisting, this, function, closure 등의 동작원리를 담고 있는 **자바스크립트의 핵심원리**이다.

자바스크립트 코드의 실행 흐름과 코드에 대한 정보가 Execution Context로 관리된다.

자바스크립트는 **코드를 실행하며 필요한 환경 정보**들을 모아 이를 이용해 실행 컨텍스트를 만들고,   
이를 **콜 스택 (LIFO: Last In, First Out)**에 쌓아 올렸다가,   
가장 위에 쌓여있는 컨텍스트와 관련 있는 코드들을 실행하는 식으로   
**전체 코드의 환경과 순서를 보장**할 수 있게 된다.

어떤 실행 컨텍스트가 활성화 되는 시점에 선언된 변수를 위로 끌어올리고 외부 환경 정보를 구성하고, this 값을 설정하는 등의 동작을 수행한다.

---

## Execution Context의 종류

### 1. Global Execution Context

**전역 실행 컨텍스트**{: .fc-primary}

자바스크립트 코드가 처음 실행되면 생성되는, 단 한 개만 정의되는 전역 Context이다.   
코드를 실행하면 무조건 생성되는 Context로 Web에서의 Window 객체나 nodeJS의 Global 객체를 생성한다.   
전역 실행 컨텍스트는 Call Stack에 가장 먼저 추가되어 앱이 종료될 때 삭제된다.


### 2. Functional Execution Context

**함수 실행 컨텍스트**{: .fc-primary}

함수가 호출될 때 마다 정의되는 context다. 전역 실행 컨텍스트가 단 한번만 정의되는 것과 달리, 함수 실행 컨텍스트는 매 실행 시마다 정의되며 함수 실행이 종료(return) 되면 Call Stack에서 제거된다.


---


## Execution Context의 관리 : Call Stack
자바스크립트 엔진은 생성된 Context를 관리하는 목적의 Call Stack(호출 스택)을 갖고 있다.
실행 컨텍스트들의 **실행 순서를 결정**하는 것이 바로 Stack 이다. (LIFO : Last In, First Out)

자바스크립트는 싱글 스레드 형식이기 때문에 런타임에 단 하나의 call stack이 존재한다.

자바스크립트 엔진은 전역 범위의 코드를 실행하며 Global Execution Context를 생성해 stack에 push 한다.
그리고 함수가 실행 또는 종료 될 때마다 Global Execution Context의 위로 Functional Execution Context를 push(추가), pop(제거) 한다.

> Call Stack은 최대 Stack 사이즈가 정해져 있다. Call Stack에 쌓인 Context Stack이 최대치를 넘게 될 경우   
> ‘RangeError: Maximum call stack size exceeded’ 라는 에러가 발생한다. 이 에러는 Stack Overflow라고 부르기도 한다.
{: .prompt-tip}

### Memory Heap & Call Stack
자바스크립트는 싱글 스레드 프로그램이다. 스레드가 1개 있다는 뜻이다.
싱글 스레드 안에는 한 개의 Memory Heap과 한 개의 Call Stack(Execution Context Stack) 이 존재한다.

- **Memory Heap**
  - 메모리를 관리하는 공간
- **Call Stack**
  - (Execution Context Stack) Call Stack은 자바스크립트에서 Execution Context Stack이라고 한다.
  - Stack은 특정 데이터 구조를 얘기하는데, 마지막에 들어온 것이 먼저 나가는 구조를 말한다.   
  (LIFO : Last In, First Out)

![alt text](image.png)
_Memory Heap & Call Stack_




## 단계 별 Execution Context 생성 과정
Execution Context 생성과정은 2가지 과정을 거친다.

- **Creation Phase**(생성단계)
- **Execution Phase**(실행단계)

**Creation Phase(생성단계)**{: .fc-success}는 다시 3가지 단계로 이루어진다.

- **Variable Environment** 생성
- **Lexical Environment** 생성
- **this 바인딩**

여기서 주의 할 점은 값이 변수에 매핑되지 않는다는 것이다.   
var의 경우는 undefined로 초기화되고 let과 const는 아무 값도 가지지 않는다.

**Execution Phase (실행단계)**{: .fc-success}는 코드를 실행하면서 변수에 값을 매핑시킨다.


### 1. Creation Phase (생성단계)
Creation 단계에선 Variable Environment와 Lexical Environment의 정의가 이루어진다.   
this binding과 Outer Environment Reference를 결정하고, Environment Record에 변수 식별자에 대한 메모리가 매핑되며 값의 할당은 선언 방식(var or let, const)에 따라 다르게 이루어진다.

**Variable Environment 에는**

- var로 선언된 변수가 메모리에 매핑되며 초기값으로 undefined가 할당된다. ==> 호이스팅
- 선언형 함수가 메모리에 매핑되며 함수 전체가 메모리에 할당된다.

**Lexical Environment 에는**

- let, const로 선언된 변수가 메모리에 매핑되지만 초기값은 할당되지 않는다.
- Global Object를 생성한다. window 또는 global 객체가 생성되고 함수에서는 arguments 객체가 생성된다.
- this를 window 또는 global에 바인딩한다.
- 변수와 함수를 Memory Heap에 배정하고 기본 값을 undefined로 저장한다. (이 부분이 호이스팅이 일어나는 이유임)

### 2. Execution Phase (실행단계)
Creation 단계에서 코드 실행을 위한 환경 정보 값이 결정되었다면, Execution은 코드를 위에서부터 읽으며 실행한다.
변수 값이 할당되는 코드가 실행될 경우 Environment Record에 저장된 식별자 메모리에 값을 수정 또는 할당한다.

- 코드를 실행한다.
- 필요하다면 새로운 Execution Context를 생성한다.



## Execution Context 세부 생성 과정
실행 컨텍스트의 생성과 종료 과정은 자바스크립트 엔진에 의해 관리되며, 코드 실행 중에 스코프, 변수 및 함수의 범위를 지정하는 데 중요한 역할을 한다.


### Creation Phase

#### 1. 전역 실행 컨텍스트(Global Execution Context) 생성
- 자바스크립트 코드가 처음 실행될 때 Global Execution Context가 생성된다.
- Web에서의 Window 객체나 nodeJS의 Global 객체를 포함한다.

#### 2. 함수 호출 시 함수 실행 컨텍스트(Functional Execution Context) 생성
- 함수가 호출될 때 마다 해상 함수의 실행 컨텍스트가 생성된다.
- 각 함수 호출은 각각 자체 실행 컨텍스트를 가지며, 이 컨텍스트에서는 함수의 지역 변수, 매개 변수, this 값 등이 포함되어 있다.

#### 3. 변수 객체(Variable Object) 생성
- 실행 컨텍스트 내에서 사용되는 변수 및 함수 선언을 저장하는 변수 객체가 생성된다.
- 이 변수 객체는 해당 컨텍스트에서 사용 가능한 식별자와 값에 대한 매핑을 관리한다.

#### 4. 스코프 체인(Scoping Chain) 생성
- 실행 컨텍스트는 변수 객체와 그 부모 컨텍스트의 변수 객체에 대한 스코프 체인을 설정한다.
- 이 스코프 체인은 변수 검색을 위해 사용된다.
- 내부 컨텍스트는 외부 컨텍스트의 변수에 접근할 수 있지만 반대로는 불가능하다.

#### 5. this 바인딩
- 실행 컨텍스트 내에서 this 키워드가 어떤 값을 참조할 지 결정한다.
- this는 함수가 어떻게 호출되었는지에 따라 다르게 동작한다.


### Execution Phase

#### 6. 코드 실행
- 실행 컨텍스트 내에서 this 키워드가 어떤 값을 참조할 지 결정한다.
- this는 함수가 어떻게 호출되었는지에 따라 다르게 동작한다.

#### 7. 컨텍스트 종료
- 코드 실행이 완료되거나 함수가 반환되면 해당 실행 컨텍스트는 종료된다.
- 변수 객체와 스코프 체인은 메모리에서 해제되고, 컨텍스트가 이전 컨텍스트로 돌아간다.

#### 8. 콜 스택 관리
- 실행 컨텍스트는 콜 스택에 push(추가) 되거나 pop(제거)된다.
- 스택에 가장 위에 있는 컨텍스트가 현재 실행중인 컨텍스트다.


## Execution Context 구성 요소
실행 컨텍스트는 다음과 같은 구성 요소를 갖는다.

- Variable Environment
- Lexical Environment
- this 바인딩


### 1. Variable Environment
Variable Environment란 현재 컨텍스트 내부의 식별자 정보 Environment Record, 외부 환경 정보 Outer Environment Reference가 포함되어 있다.

Variable Environment에 먼저 정보를 담고, 이 정보를 그대로 Lexical Environment에 복사한다.


### 2. Lexical Environment
Lexical Environment는 초기에는 Variable Environment와 같지만 **변경 사항이 실시간으로 적용**된다.   
즉, **Variable Environment는 초기 상태**{: .fc-danger}를 기억하고 있으며, **Lexical Environment는 최신 상태**{: .fc-danger}를 저장하고 있다.

Lexical Environment는 2개의 구성 요소를 갖는다.

- Environment Record
- Outer Environment Reference

> **Environment Record**   
> 내부의 식별자 정보 , 환경 레코드
> - 현재 컨텍스트와 관련된 식별자와 식별자에 바인딩 된 값이 기록되는 저장소.
> - 실행 컨텍스트 내부 전체를 처음부터 끝까지 확인하여 순서대로 수집한다. ※ 호이스팅과 관련있다.
{: .prompt-tip}

> **Outer Environment Reference**   
> - 외부 Lexical Environment를 참조, 외부 환경 정보
> - 현재 호출 된 함수가 선언되는 시점에서의 Lexical Environment를 참조하는 포인터이다.
> - **스코프 체인**{: .fc-danger}을 가능하게 하는 역할.
> 현재 환경과 관련된 외부 렉시컬 환경의 참조를 가진다. 이것은 스코프 체인을 형성하고 변수를 검색하는 데 사용된다.   
> 함수 내부에서 전역 변수에 접근이 가능한 이유가 Outer Environment Reference 때문이다.   
> 현재 호출 된 함수가 선언 될 당시의 Lexical Environment를 참조하는데, 이때 Outer Environment Reference는 글로벌 실행 컨텍스트의 Lexical Environment를 참조하고 있어, 해당 환경의 Environment Record에 전역 변수 정보들이 기록되어 있기 때문이다.
{: .prompt-tip}

#### 호이스팅이란?

````javascript
console.log(foo);	// undefined
var foo = 'JavaSCript';
````

자바스크립트 엔진이 코드를 실행(Execution Phase)하기 전, 코드의 실행 환경 정보를 구축(Creation Phase)하는 것이 hoisting이 이루어지는 이유이다.   
호이스팅을 설명할 때 흔히 말하는 ‘끌어올림’은 실질적으로 코드의 선언 줄이 변경되는 것이 아닌, **Creation 단계에서 변수 식별자가 메모리에 우선적으로 매핑되는 특징**{: .fc-success}을 말한다.   
이러한 과정을 통해 엔진은 **함수를 실행하기도 전에 해당 컨텍스트 내부의 변수명들을 이미 알고있다.**   
__var와 let, const의 경우 호이스팅 + 선언 개념이 조금 다르다.__{: .fc-sub}

### 3. this binding
this는 식별자가 바라봐야 할 대상 객체를 의미한다.   
method에서 사용 시 해당 method가 담겨있는 Instance or Object를 가리키며, 함수 표현식에서 사용 시 this를 바인딩하지 않는 이상 전역 객체를 가리킨다.

---

##### 참고

- [실행 컨텍스트 (Execution Context)](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/execution-context.md)
- [\[Javascript\] 실행 컨텍스트란 ? (Execution Context)](https://velog.io/@dea8307/Javascript-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8%EB%9E%80-Execution-Context)
- [JS Execution Context (실행 컨텍스트) 란?](https://gamguma.dev/post/2022/04/js_execution_context)