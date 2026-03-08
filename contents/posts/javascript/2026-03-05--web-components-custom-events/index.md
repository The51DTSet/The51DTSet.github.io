---
date: '2026-03-05 08:30:00 +0900'
title: '[JavaScript] Web Components : Custom Elements'
summary: 'Custom Elements는 사용자 HTML Element를 만들게 해준다. 그리고 이는 DOM의 모든 기능을 다 사용할 수 있다. 기본적으로 두 가지 타입으로 생성한다.'
author: ['aluvy']
categories: ['JavaScript']
tags: ['JavaScript']
thumbnail: './cover.png'
---


## 기본설명

Custom Elements는 사용자 HTML Element를 만들게 해준다. 그리고 이는 DOM의 모든 기능을 다 사용할 수 있다.
기본적으로 두 가지 타입으로 생성한다.

- 표준 HTML 요소를 상속하지 않은 Elements. 요소는 상속하지 않지만 HTML Element는 상속 한다.
- 표준 HTML 요소를 상속한 Element.

이렇게 생성한 Element는 Lifecycle callback을 class 안에 정의하여 특정 시점에 동작 하도록 한다.

## 기본 사용법

### 독립적인 사용자 정의 요소

````javascript
class MyComponent extends HTMLElement {
  constructor() {
    // 항상 super를 호출 해야 한다.
    super();
    
    this.innerHTML = `<h1>This is my Element</h1>`;
  }
}

customElements.define("my-component", MyComponent);
````

customElements.define에서 정의할 때 아래 사항을 꼭 유념해야 한다.

> Name for the new custom element. Note that custom element names must contain a `hypen`.   
> 새 커스텀 엘리먼트의 이름입니다. 커스텀 요소 이름에는 `하이픈`이 포함되어야 합니다.
{: .prompt-tip}

constructor 메서드 안에 this는 customElements를 가리킨다.   
`<my-element>`를 사용해 보면 `<h1>` element가 생성 되고 This is My Element가 표현 된다.

### Built-in 사용자 정의 요소

먼저 상속할 Element를 extends하여 class를 정의 한다.

````javascript
class ButtonComponent extends HTMLInputElement {
  constructor() {
    super();
    
    this.style.border = '1px solid';
    this.addEventListener('click', (e) => e.preventDefault());
  }
}
````

정의한 사용자 요소를 등록하빈다. 이때 상속한 Element를 인수로 넘겨 준다.

````javascript
customElements.define("button-component", ButtonComponent, {
  extends: "button",
});
````

마지막으로 `<button>` 사용 시 is attribute에 `my-button`을 사용자 요소로 사용함을 알려 준다.

````html
<button is='button-component'>Click</button>
````


## 생명 주기 콜백

custom component가 생성되고 삭제 되기 까지 네 가지 상태에 따른 별도의 callback을 정의할 수 있습니다.

- **connectedCallback**: 사용자 정의 요소가 문서에 연결된 요소에 추가될 때마다 호출됩니다. 이것은 노드가 이동 될 때마다 발생할 것이며, 요소의 내용이 완전히 해석되기 전에 발생할 지도 모릅니다.

- **disconnectedCallback**: 사용자 정의 요소가 document DOM에서 연결 해제 되었을 때마다 호출됩니다.

- **adoptedCallback**: 사용자 정의 요소가 새로운 document로 이동 되었을 때마다 호출됩니다.

- **attributeChangedCallback**: 사용자 정의 요소의 특성들 중 하나가 추가되거나, 제거되거나, 변경될 때마다 호출됩니다. 어떤 특성이 변경에 대해 알릴지는 static get `observedAttributes` 메서드에서 명시됩니다.

위 생명 주기 콜백을 보면 vue, react 등에서 사용했던 `componentDidMount`, ‘mounted’와 비슷한 모양입니다.   
사용법도 아래와 같이 비슷합니다.

````javascript
connectedCallback() {
  console.log('연결 완료');
}
disconnectedCallback() {
  console.log('연결 해제 완료');
}
adoptedCallback() {
  console.log('Element가 다른 page로 이동 하였습니다.');
}
attributeChangedCallback(name, oldValue, newValue) {
  console.log('name이 변경 되었습니다.');
}

static get observedAttributes() {
  // 변경을 관찰하고자 하는 attribute를 나열한다.
  // 아래 반환값들이 변경되면 attributeChangedCallback 이 호출된다.
  return ['autoFocus', 'disabled', 'form', 'value'];
}
````


## Web Components 사용하기

예를 들어서 `<custom-input>` 이라고 입력하면   
`<label><input>` 이렇게 2개의 태그가 안에 출현하게 만들고 싶다면 아래와 같이 사용하면 된다.

````javascript
class InputComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<label>이름을 입력하세요.</label><input>`;
  }
}
customElements.define('input-component', InputComponent);
````

````html
<script type="module" src="components/input-component.js" defer></script>
<input-component></input-component>
````

## HTML 태그를 innerHTML보다 효율적으로 짜고 싶다면

````javascript
class InputComponent extends HTMLElement {
  connectedCallback() {
    let label = document.createElement('label');
    this.appendChild(label);
    
    this.innerHTML = `<label>이름을 입력해주세요.</label><input>`
  }
}
customElements.define('input-component', InputComponent);
````

> 위와 방식으로 사용하면 innerHTML보다 html 생성 속도가 10배 빨라진다.
{: .prompt-info}


## 파라미터 문법 구현 가능

````javascript
class InputComponent extends HTMLElement {
  connectedCallback() {
    let name = this.getAttribute('name');
    this.innerHTML = `<label>${name} 인풋입니다.</label><input>`;
  }
}
customElements.define('input-component', InputComponent);
````

````html
<input-component name='비밀번호'></input-component>
````


## attribute 변경 감지하기
attribute가 바뀌면, html도 자동으로 업데이트 해줄 수 있다.   
name이라는 custom attribute가 변경될 때마다, 특정 코드를 실행할 수도 있다.

````javascript
class InputComponent extends HTMLElement {
  connectedCallback() {
    let name = this.getAttribute('name');
    this.innerHTML = `<label>${name}을 입력하세요.</label><input>`;
  }
  
  static get observedAttributes() {
    return ['name'];
  }
  
  attributeChangedCallback() {
    // attribute 변경 시 실행할 코드
    this.innerHTML = `<label>${name}이 변경되었습니다.</label><input>`;
  }
}
customElements.define('input-component', InputComponent);
````


## 사용예시

````html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Component</title>
  <script type="module" src="components/header-component.js" defer></script>
</head>
<body>
  <!-- 헤더 컴포넌트 -->
  <header-component></header-component>
</body>
</html>
````

````javascript:title=components/header-component.js
class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <nav>
          <a href="#" id="home-link">Home</a>
          <a href="#" id="about-link">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
    `;

    this.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('click');
    });
  }
}
customElements.define('header-component', HeaderComponent);
````



---


##### 참고

- [Web Components : 커스텀 HTML 태그 만들기](https://velog.io/@gil0127/Web-Components-%EC%BB%A4%EC%8A%A4%ED%85%80-HTML-%ED%83%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)
- [\[웹 컴포넌트\] Custom Elements](https://velog.io/@rageboom/Custom-Elements)
- [MDN \| Window.customElements](https://developer.mozilla.org/ko/docs/Web/API/Window/customElements)
- [MDN \| Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [MDN \| 웹 컴포넌트](https://developer.mozilla.org/ko/docs/Web/API/Web_components)