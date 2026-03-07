---
date: '2026-03-07 20:00:00 +0900'
title: '[JavaScript] Debounce & Throttle'
summary: '이벤트 오버클럭(overclock - 과도한 이벤트 발생)은 리소스 사용량을 증가시키기 때문에 성능문제를 야기하고 사용자 경험을 떨어트립니다. 과도한 이벤트나 함수들의 빈도수를 줄여서 성능을 향상시키는 프로그래밍 기법 중, 자주 언급되는 두 가지를 알아봅니다.'
author: ['aluvy']
categories: ['JavaScript']
tags: ['JavaScript']
# thumbnail: './cover.png'
---


# Debounce & Throttle
이벤트 오버클럭(overclock - 과도한 이벤트 발생)은 리소스 사용량을 증가시키기 때문에 성능문제를 야기하고 사용자 경험을 떨어트립니다.   
과도한 이벤트나 함수들의 빈도수를 줄여서 성능을 향상시키는 프로그래밍 기법 중, 자주 언급되는 두 가지를 알아봅니다.

Debounce와 Throttle은 둘 다 함수의 연속적인 실행을 제한하는 목적을 가지고 설계되었습니다.

- 그 중 `Debounce`는 **특정 기간 동안 함수의 실행을 모두 취소하고**, **마지막 실행만 수행**{: .fc-primary}합니다.
- 반대로 `Throttle`은 **함수 실행 후** **특정 기간 동안 추가적인 함수의 재실행을 모두 취소**{: .fc-primary}합니다.

이 둘은 매우 비슷해 보이지만 서로 다른 특성을 갖고 있는, 정해진 시간 동안 얼마나 많은 함수의 실행을 허가할 것인가에 대한 테크닉입니다.

~~Debounce와 Throttle은 특히 Future와 Stream에 관련된 함수에서 자주 볼 수 있습니다.~~

API 요청 시에 Debounce와 Throttle이 특히 유용하게 사용됩니다. 불필요하게 API 요청이 1초에 30번 씩 발생한다면 어떨까요? 검색을 하는데, 한 글자 한 글자 타이핑을 할 때마다 검색 쿼리 문이 날라간다면, 이는 서버에 엄청난 부하를 주게 될 것입니다.

서버 뿐만 아니라, 앱을 사용하는 사용자에게도 좋지 않은 경험을 줄 수 있습니다. 스크롤을 할 때마다, 무거운 이벤트가 발생하게 된다면 어떨까요? John Resig은 2011년 이 문제를 제기하였습니다. 그는 스크롤 시에 무거운 이벤트 리스닝을 하는 것은 현명한 방법이 아니라며, 250ms마다 이벤트를 발생시키는 방식을 제안했습니다. 현대에는 이보다 더 정교화된 기법인 Debounce와 Throttle을 사용합니다.

## Debounce
`Debounce`는 함수를 마지막으로 호출한 후 일정 시간이 경과한 후에만 함수가 실행되도록 하는 방법입니다.

일반적으로 사용자가 입력이나 스크롤, 리사이즈 등과 같은 이벤트 트리거를 중단할 때까지 함수 실행을 지연시키고자 하는 시나리오에서 사용됩니다.

````javascript
function debounce(callback, time = 500) {
  let timeout
  // closer
  return function(...args) {
    clearTimeout(timeout);			// 기존 타이머 삭지
      timeout = setTimeout(() => {	// 새 타이머 할당
      callback.apply(this, args);	// this binding
    }, time)
  }
}

function hi() {
  console.log('hi');
}

window.addEventListener('resize', debounce(hi, 100));
````

### 대표적 사용 예시

- 키워드 검색 혹은 자동완성 기능에서 api 함수 호출 횟수를 최대한 줄이고 싶을 때
- 사용자가 창 크기 조정을 멈출때까지 기다렸다가 resizing event를 반영하고 싶을 때



## Throttle
`Throttle`은 연속해서 발생하는 이벤트에 대해서, 특정 시간을 주기로 끊어내는 개념입니다.
즉, 지정된 시간 간격, Time interval 안에 최대 한 번의 이벤트만 리스닝 하겠다는 개념입니다.

예를 들어 Throttle 의 설정 시간을 1ms로 주게되면 해당 이벤트는 1ms 동안 최대 한번만 발생하게 됩니다.

예를 들어 API 호출을 트리거하는 버튼이 있다고 가정해 보겠습니다. 이 버튼의 클릭 이벤트에 1초 간격으로 Throttle을 적용하면, 1초 내에 버튼을 반복해서 클릭하면 API 호출이 한 번만 트리거 됩니다. 1초 내의 후속 클릭은 1초가 지날 때까지 무시됩니다.

````javascript
function throttle(callback, limit = 100) {
  let waiting = false;

  // closer
  return function() {
    if(!waiting) {
      callback.apply(this, arguments)
      waiting = true
      setTimeout(() => {
        waiting = false
      }, limit)
    }
  }
}
````

### 대표적 사용 예시
- 스크롤 이벤트. (모든 스크롤을 기록하는 것 또한 성능 문제가 있음, 따라서 특정 시간마다 스크롤의 위치를 찍어주는 것이 좋다.)

---

##### 참고

- [Throttling과 Debouncing에 대해서 아시나요 / 네?](https://velog.io/@eassy/Throttling%EA%B3%BC-Debouncing)
- [디바운스와 쓰로틀(Debounce & Throttle) - 최적화를 도와주는 기법](https://nx006.tistory.com/63)
- [Debounce 와 throttle 은 뭐고 각각 언제 사용할까?](https://velog.io/@jiynn_12/Debounce-%EC%99%80-throttle-%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B3%A0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90)