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

