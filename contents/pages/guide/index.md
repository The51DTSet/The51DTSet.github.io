---
date: '2026-06-12 14:09:00 +0900'
title: 'Posting Guide'
summary: 'The51X DT Center Set Team Blog'
author: ['aluvy']
categories: []
tags: []
thumbnail: './cover.png'
---


## **포스팅을 작성하기 위한 기본 세팅**

### 1. 레포지토리 클론

The51DTSet.github.io 레포지토리를 클론한다.

### 2. 브랜치 생성

<strong class="fc-primary">develop 브랜치</strong>에서 새 브랜치를 생성한다.   
브랜치 명 규칙은 `${id}/${subject}` 로 한다.   
모든 포스팅 작업은 새로 만든 브랜치에서 진행한다.

### 3. 서버 실행

터미널에서 서버를 시작한다.

```shell
$ npm start
```

서버가 정상적으로 실행되면 아래 주소로 접속이 가능해진다.   
- http://localhost:8000/
- http://localhost:8000/___graphql


### 4. 포스팅 폴더 생성하기

포스팅 폴더의 위치는 contents/posts/ 이며, posts 폴더 하위에 새로운 폴더를 생성한다.   
폴더명 규칙은 `${category}/${YYYY}-${MM}-${DD}--${subject}` 로 한다.   
폴더 생성 후 폴더 내에 index.md 파일을 생성한다.

### 5. 포스팅 작성하기

index.md 파일 상단에 Front matter를 작성한다.

> **Front matter 란?**   
> Front matter는 `---` 로 감싸진 메타 데이터 블록이다.   
> YAML 형식으로 작성되기 때문에 YAML front matter라고도 부른다.   
> Gatsby나 Jekyll 같은 정적 사이트 생성기에서 페이지/포스터의 제목, 날짜, 태그 등 메타 정보를 정의하는 데 사용된다.
{: .prompt-tip}


Front matter 예시
```markdown:title=index.md
date: '2026-01-01 00:00:00 +0900'
title: 'Post Title'
summary: 'The51X DT Center Set Team Blog'
author: ['aluvy']
categories: []
tags: []
thumbnail: './cover.jpg'
```

### 5. 포스팅 작성 완료하기

포스팅을 모두 작성한 후에 깃허브에 push 한다.   
The51DTSet.github.io 레포지토리의 Pull requests를 진행한다.   
base 브랜치와 compare 브랜치 선택에 유의하고, Create pull request   
(작성 중)


<br><br><br><br>
<hr>
<br><br><br><br>

## **가독성 높은 포스팅 작성을 위한 팁**

### 1. Headings

# H1 - Heading
## H2 - Heading
### H3 - Heading
#### H4 - Heading
##### H5 - Heading
###### H6 - Heading


---


### 2. line

---
또는
<hr>

```md
---
또는
<br>
```


### 3. Paragraph
기본적으로 포스팅 작성하는 방법은 Markdown 문법을 사용한다.   

#### 3-1. 내려쓰기

내려쓰기(Enter)는 문장 끝에 공백 3개를 추가하거나 `<br>` 태그를 사용한다.
```md
동해물과 백두산이   
마르고 닳도록<br>
하느님이 보우하사   
우리 나라 만세
```

#### 3-2. 텍스트에 **bold**, ~~취소선~~, _이탤릭_, `code` 처리하는 방법

```md
**bold**
~~취소선~~
_이탤릭_
`code`
```

#### 3-3. 폰트 색상 적용하기

동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세{: .fc-primary}

```md
동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세{: .fc-primary}
```

##### 3-3-1. 특정 단어에만 폰트 색상 적용하기

<span class="fc-success">동해물</span>과 <strong class="fc-primary">백두산</strong>이 마르고 닳도록 하느님이 보우하사 우리 나라 만세

```md
<span class="fc-success">동해물</span>과
<strong class="fc-primary">백두산</strong>이
마르고 닳도록 하느님이 보우하사 우리 나라 만세
```

##### 3-3-2. 폰트 색상 종류
- <span class="fc-primary">fc-primary</span>
- <span class="fc-default">fc-default</span>
- <span class="fc-sub">fc-sub</span>
- <span class="fc-danger">fc-danger</span>
- <span class="fc-success">fc-success</span>


#### 3-4. 링크 추가하기

링크를 추가하고 싶을 때에는 아래와 같은 방법이 있다.
- 주소만 넣는 방법: <https://www.google.com/>
- [주소를 숨기는 방법](https://www.google.com/)

```md
- 주소만 넣는 방법: <https://www.google.com/>
- [주소를 숨기는 방법](https://www.google.com/)
```


---

### 4. 리스트

- 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
  - 남산 위에 저 소나무 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
    - 가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
      - 이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
        - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세

---

### 5. 테이블

|Company	|Contact|Country|center|
|:--|:--|--:|:--:|
|Alfreds Futterkiste|Maria Anders|Germany|d|
|Island Trading|Helen Bennett	|UK|4|
|Magazzini Alimentari Riuniti|Giovanni Rovelli	|Italy|1|

---



### 6. 이미지 넣기

![철수 이미지](./image.jpg){: .img-sm}
_철수 이미지 .img-sm_

![철수 이미지](./image.jpg){: .img-md}
_철수 이미지 .img-md_

![철수 이미지](./image.jpg)
_철수 이미지_

```md
![철수 이미지](./image.jpg){: .img-sm}
_철수 이미지 .img-sm_

![철수 이미지](./image.jpg){: .img-md}
_철수 이미지 .img-md_

![철수 이미지](./image.jpg)
_철수 이미지_
```




---

### 7. prompt

#### 7-1. 기본 프롬프트
> **기본 프롬프트**   
> 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세

```md
> **기본 프롬프트**   
> 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세
```

#### 7-2. tip 프롬프트

> **prompt tip**      
> 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세
{: .prompt-tip}

```md
> **prompt tip**   
> 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세
{: .prompt-tip}
```


#### 7-3. info 프롬프트

> **prompt info**   
> 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세
{: .prompt-info}

```md
> **prompt info**   
> 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세
{: .prompt-info}
```


#### 7-4. warning 프롬프트

> **prompt warning**   
> 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세
{: .prompt-warning}

```md
> **prompt warning**   
> 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세
{: .prompt-warning}
```



#### 7-5. danger 프롬프트


> **prompt danger**   
> 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세
{: .prompt-danger}


```md
> **prompt danger**   
> 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세
{: .prompt-danger}
```



---




### 8. code block


> 코드블럭 안에 코드블럭 문법을 넣고 싶으면 바깥 백틱을 안쪽 백틱보다 많이 쓰면 된다.
{: .prompt-tip}

#### 8-1. 언어 이름 표시

```js
const foo = 'bar'
```

````md
```js
const foo = 'bar'
```
````



#### 8-2. 파일명 표시하기

`js:title=index.js`

```js:title=index.js
const foo = 'bar'
```

````md
```js:title=index.js
const foo = 'bar'
```
````




#### 8-3. 줄 번호 매기기 (기본 값 임)

`javascript{numberLines: true}`

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

````md
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
````





#### 8-4. 원하는 인덱스부터 표시하기

`javascript{numberLines: 5}`

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

````md
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
````


#### 8-5. 라인 강조 표시

`javascript{1,4-6}`

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

````md
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
````

---



