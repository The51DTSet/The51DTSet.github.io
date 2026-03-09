---
date: '2026-03-02 22:40:00 +0900'
title: 'About'
summary: 'The51X DT Center Set Team Blog'
author: ['aluvy']
categories: []
tags: []
thumbnail: './cover.png'
---


## WHO WE ARE
**Special Group for Digital Marketing**{: .fc-primary}

더피프티원은 매년 다양한 프로젝트 경험과 전문성 있는 인적자원으로 프로젝트를 성공적으로 진행하며 업계를 선도합니다.


## Overview
**There are many numbers in between ‘0’ and ‘100’**{: .fc-primary}

'0'과 '100'사이에는 많은 숫자가 존재합니다.   
'100'이 모든것을 이루어낸 '완성'을 의미한다면 '0'은 이루어나가야 하는 '미완성'을 의미합니다.
누군가는 모든것을 이루어낸 '100'에 큰 의미를 부여하지만 우리는 '0'과 '100'사이의
'51(fifty-one)'에 주목합니다. '51'은 가능과 불가능을 구분짓는 '가능성'을 의미하기 때문입니다. 불가능을 가능으로 만드는 '51'의 순간을 우리는 함께 경험할 것입니다.

If '100' represents 'complete' that achieved everything '0' represents 'incomplete' that has to achieve everything While someone gives significant meaning to '100' we focus on '51(fifty-one)' between '0' and '100'
'51' represents 'possibility' that defferentiates possible and impossible We will experience the moment of '51' making the impossible to possible all together.


- 언어 이름만 (자동 표시)
  ```js
  const foo = 'bar'
  ```

  - 파일명 표시
    ```js:title=index.js
      const foo = 'bar'
    ```


### 줄 번호 매기기
코드 옆에 줄 번호를 표시하려면 다음 `numberLines`옵션을 사용하세요.

```javascript{numberLines: true}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

원하는 인덱스부터 번호를 매길 수도 있습니다(여기서는 5번째 인덱스부터 시작합니다).

```javascript{numberLines: 5}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```


### 라인 강조 표시
코드 줄 강조 표시 기능도 추가할 수 있습니다. 이 기능은 특정 클래스가 포함된 테두리를 코드 줄 주위에 표시하고 `.gatsby-highlight-code-line`, 해당 클래스에 스타일을 적용할 수 있습니다. 자세한 내용은 README 파일을 참조하세요.

코드에서 특정 줄을 강조 표시하려면 다음 지시어 중 하나를 코드에 주석으로 사용할 수 있습니다.

TODO: test

- highlight-line
  - highlights the current line;
  - highlights the next line;
  - highlights the lines until the matching `hightlight-end`;
  - will highlight the next line, and the fourth, fifth and sixth lines.

```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

코드 블록 외부에서 강조 표시할 줄을 지정할 수도 있습니다. 다음 코드 스니펫에서는 1번째 줄과 4번째 줄부터 6번째 줄까지가 강조 표시됩니다. 줄 범위 구문 분석은 https://www.npmjs.com/package/parse-numeric-range 패키지를 사용하여 수행됩니다 .

```javascript{1,4-6}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```