---
date: '2026-01-01'
title: '[프론트엔드 개발환경의 이해] 01. NPM'
author: ['aluvy', 'example']
categories: ['posts']
tags: ['frontend']
summary: 'Node.js는 백엔드를 구현하는 기술이라고 생각했을지 모른다. 웹 어플리케이션 개발에 직접적으로 사용하는 것은 아니지만 개발 환경을 이해하고 구성하는데 Node.js를 모르면 언젠가는 한계에 부딪히게 될 것이다.'
thumbnail: './cover.png'
---

# [프론트엔드 개발환경의 이해] 01. NPM

Node.js는 백엔드를 구현하는 기술이라고 생각했을지 모른다. 웹 어플리케이션 개발에 직접적으로 사용하는 것은 아니지만 개발 환경을 이해하고 구성하는데 Node.js를 모르면 언젠가는 한계에 부딪히게 될 것이다.

## 1. 프론트엔드 개발에 Node.js 가 필요한 이유

**최신 스펙으로 개발할 수 있다.**  
자바스크립트 스펙의 빠른 발전에 비해 브라우저의 지원 속도는 항상 뒤쳐진다. 아무리 편리한 스펙이 나오더라도 이것을 구현해주는 징검다리 역할, 이를테면 바벨 같은 도구의 도움 없이는 부족하다. 더불어 웹팩, NPM 같은 노드 기술로 만들어진 환경에서 사용할 때 비로소 자동화된 프론트엔드 개발환경을 갖출 수 있다.

마찬가지로 Typescript, SASS 같은 고수준 프로그래밍 언어를 사용하려면 전용 트랜스파일러가 필요하다. 물론 이것 역시 Node.js 환경이 뒷받침 되어야 우리가 말하는 프론트엔드 개발 환경을 만들 수 있다.

**빌드 자동화**  
과거처럼 코딩 결과물을 브라우저에 바로 올리는 경우는 흔치 않다. 파일을 압축하고, 코드를 난독화하고, 폴리필을 추가하는 등 개발 이외의 작업을 거친 후 배포한다. Node.js는 이러한 일련의 빌드 과정을 이해하는데 적지 않은 역할을 한다. 뿐만 아니라 라이브러리 의존성을 해결하고, 각종 테스트를 자동화하는데도 사용된다.

**개발 환경 커스터마이징**  
각 프레임워크에서 제공하는 도구를 사용하면 손쉽게 개발환경을 갖출 수 있다. React.js 의 CRA(create-react-app), Vuejs의 vue-cli를 사용하면 말이다. 그러나 개발 프로젝트는 각자의 형편이라는 것이 있어서 툴을 그대로 사용할 수 없는 경우도 빈번하다. 커스터마이징 하려면 Node.js 지식이 필요하다. 어쩌면 자동화된 도구를 사용할 수 없는 환경이라면 직접 환경을 구축해야 할 상황에 놓을 수도 있다.

이러한 배경하에 Node.js는 프론트엔드 개발에서 필수 기술로 자리매김하고 있다.

## 2. Node.js 설치

Node.js 는 아래 사이트에서 운영체제별로 설치파일을 다운받으면 된다.

두 가지 버전을 선택하여 설치할 수 있다. 왼쪽 짝수 버전, 오른쪽이 홀수 버전이다. 안정적이고 장기간 지원하는 것이 짝수 버전이고, 불안정할 수 있지만 최신 기능을 지원하는 것이 홀수 버전이다. 리눅스 배포 버전과 비슷한 관례를 따른다.

- nodejs 다운로드: <https://nodejs.org/en>

![alt text](./nodejs.png)
_nodejs logo image_

버튼을 몇 번 클릭하면 아래 경로에 Node.js와 NPM이 설치된다. (운영체제에 따라 경로는 다를 수 있다.)

- Node.js : /user/local/bin/node
- NPM : /user/local/bin/npm

설치를 마친 뒤 터미널을 열어 각 명령어를 확인해 보자. 먼저 Node.js 부터 실행한다.

```shell
$ node
> 1 + 2
3
```

`>` 프롬프트와 함께 입력 대기화면이 나온다. 정수를 계산하는 짧은 코드를 입력하면 결과 3을 출력한다.

이것을 노드 REPL (read-eval-print loop)이라고 부르는데, 자바스크립트 코드를 입력하고 즉시 결과를 확인할 수 있는 프로그램이다. 파이썬이나 PHP 같은 언어에도 제공하는 기능이다.

`.exit` 명령을 실행하거나 `ctrl + c` 를 연속 두 번 입력하면 REPL 프로그램에서 빠져나올 수 있다.

- 이번에는 `--version` 옵션을 추가해 설치한 노드 버전을 확인해 보자.

  ```shell
  $ node --version
  v13.1.0

  $ npm --version
  6.12.1
  ```

- NPM (Node Package Manage) 명령어도 확인해 보자.

  ```shell
  $ npm
  Usage: npm <command>
  ```

보통 터미널 도구처럼 사용방법(Usage)을 알려주고 종료한다.

### 2-1. Node.js NPM 버전 업데이트

Node.js와 NPM의 낮은 버전이 이미 설치되어 있다면, 터미널에 아래 명령어를 실행하여 Node.js와 NPM을 업데이트 할 수 있다.

- n 모듈 설치

  ```shell
  $ sudo npm install -g n
  ```

- Node.js LTS 버전으로 업데이트

  ```shell
  $ sudo n lts
  ```

- NPM 재설치

  ```shell
  $ sudo npm install -g n
  ```

- 버전 확인
  ```shell
  $ node -v
  $ npm -v
  ```

## 3. 프로젝트 초기화

개발 프로젝트는 외부 라이브러리를 다운로드 받고 빌드하는 등 일련의 명령어를 자동화하여 프로젝트를 관리하는 도구가 존재한다.

PHP의 컴포저(Composer)나 자바의 그래들(Gradle) 같은 툴이 그러한 프로그램이다.  
NPM은 자바스크립트 기반 프로젝트의 빌드 도구인 셈이다. NPM을 이용해 프론트엔드 개발 프로젝트를 세팅해 보자.

### 3-1. init

NPM은 다양한 하위 명령어를 제공하는데 그 중 init 명령어를 사용하면 프로젝트를 생성할 수 있다.

먼저 프로젝트를 생성 할 폴더를 만들고, vs code로 폴더를 연다. 그리고 터미널을 열어 아래 명령어를 입력한다.

```shell
$ npm init

package name:
version:
description:
entry point:
test command:
git repository:
keywords:
author:
license:
```

패키지 이름, 버전 등 프로젝트와 관련한 몇 가지 정보를 얻기 위한 질문을 볼 수 있다. 답변하거나 혹은 빈 칸으로 남겨 두면 괄호 안의 기본값을 입력할 수 있다. 모든 질문에 답하면 명령어를 실행한 폴더에 package.json 파일이 생성된다. 모두 기본값을 사용할 것이라면 npm init -y 명령어로 질문을 스킵하고 package.json 파일을 생성할 수 있다.

### 3-2. package.json

Node.js는 package.json 파일에 프로젝트의 모든 정보를 기록한다. 각 항목의 의미는 다음과 같다.

- **name**: 프로젝트 이름
- **version**: 프로젝트 버전 정보
- **description**: 프로젝트 설명
- **main**: 노드 어플리케이션일 경우 진입점 경로. 프론트엔드 프로젝트일 경우 사용하지 않는다.
- **scripts**: 프로젝트 명령어를 등록할 수 있다. 초기화 시 test 명령어가 샘플로 등록되어 있다.
- **author**: 프로그램 작성자
- **license**: 라이센스

## 4. 프로젝트 명령어

생성한 프로젝트는 package.json에 등록한 스크립트(scripts)를 이용해 실행한다. 어플리케이션 빌드, 테스트, 배포, 실행 따위의 명령어를 등록하는데 실행하는 방법은 다음과 같다.

```shell
$ npm test

Error: no test specified
npm ERR! Test failed. See above for more details.
```

에러 메세지를 출력하고 그 다음 줄에 npm 에러가 발생한다. 이것은 npm 스크립트에 등록된 쉘 스크립트 코드를 실행했기 때문이다.

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

{: file="package.json"}

echo 명령어로 메세지 “Error: no test specified”를 출력한 뒤 에러 코드 1을 던지면서 종료하는 동작이다. 에러 코드 1을 확인하면 에러 (“npm ERR!…“)를 출력한다.

NPM에서 사용할 수 있는 명령어는 몇개나 될까? NPM 사용법을 확인해 보자.

```shell
Usage: npm <command>

where <command> is one of:
  access, adduser, audit, bin, bugs, c, cache, ci, cit,
  clean-install, clean-install-test, completion, config,
  create, ddp, dedupe, deprecate, dist-tag, docs, doctor,
  edit, explore, get, help, help-search, hook, i, init,
  install, install-ci-test, install-test, it, link, list, ln,
  login, logout, ls, org, outdated, owner, pack, ping, prefix,
  profile, prune, publish, rb, rebuild, repo, restart, root,
  run, run-script, s, se, search, set, shrinkwrap, star,
  stars, start, stop, t, team, test, token, tst, un,
  uninstall, unpublish, unstar, up, update, v, version, view,
  whoami
```

무척 많다. 보통 사용하는 것들이 start, test, install, uninstall 이다.

- **start**: 어플리케이션 실행
- **test**: 테스트
- **install**: 패키지 설치
- **uninstall**: 패키지 삭제

명령어를 추가할 수도 있다. 가령 빌드를 위한 build 스크립트는 package.json의 scripts 부분에 build 키를 추가하고 쉘 스크립트를 문자열로 등록하면 된다.

```json
{
  "scripts": {
    "build": "여기에 빌드 스크립트를 등록한다"
  }
}
```

{: file="package.json"}

커스텀으로 등록한 명령어는 아래 형식으로 run을 추가해서 실행한다.

```shell
$ npm run build
```

프론트엔드 개발 환경을 구축하기 위해 추가할 스크립트는 build, lint 정도가 있겠다.

- **build** : 소스 빌드
- **lint** : 소스 컨벤션 검사

## 5. 패키지 설치

### 5-1. CDN을 이용한 방법

외부 라이브러리를 가져다 쓰는 것은 무척 자연스러운 일이다. 간단한 방법은 CDN (Contents Delivery Network) 으로 제공하는 라이브러리를 직접 가져 오는 방식이다. 리액트의 주소를 html에서 로딩한다.

```html
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
```

CDN 서버 장애로 인해 외부 라이브러리를 사용할 수 없다면 어떻게 될까? 아무리 우리 어플리케이션 서버가 정상이더라도 필수 라이브러리를 가져오지 못한다면 웹 어플리케이션은 정상적으로 동작하지 않을 것이다.

### 5-2. 직접 다운로드 하는 방법

라이브러리 코드를 우리 프로젝트 폴더 안에 다운받아 놓는건 어떨까? CDN을 사용하지 않기 때문에 장애와 독립적으로 웹 어플리케이션을 제공할 수 있을 것 같다.

하지만 이런 상황도 있다. 라이브러리는 계속해서 업데이트 될 것이고 우리 프로젝트에서도 최신 버전으로 교체해야 한다. 매번 직접 다운로드 하는 것은 매우 귀찮은 일이 될 것이다. 버전에 따라 하위 호환성 여부까지 확인하려면 실수할 여지가 많다.

라이브러리를 어느 한 곳에서 업데이트하고 하위 호환되는 안전한 버전만 다운받아 사용할 수 있다면 어떨까?

### 5-3. NPM을 이용한 방법

NPM은 이러한 방식으로 패키지를 관리한다. npm install 명령어로 외부 패키지를 우리 프로젝트 폴더에 다운로드 해보자.

$ npm install react
최신 버전의 react를 NPM 저장소에서 찾아 우리 프로젝트로 다운로드 하는 명령어다.
package.json 에는 설치한 패키지 정보를 기록한다.

```json
{
  "dependencies": {
    "react": "^16.12.0"
  }
}
```

{: file="package.json"}

버전 16.12.0을 설치했다는 의미다.

---

##### Reference

- [김정환 블로그 프론트엔드 개발환경의 이해: NPM](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)
- [개발꾼 (mac) node, npm 업그레이드 하기](https://code-boki.tistory.com/107)
