## 리액트의 핵심 모듈

1. 리액트 컴포넌트를 HTMLElemnet 연결하기
import ReactDOM from 'react-dom';

2. 리액트 컴포넌트 만들기
import React from 'react';

--

import는 ES6 방식

원래 Node.js에서 모듈을 가져다 쓰려고 하면 require를 사용해야 하지만 나중에 import 구문이 webpack을 통해 변경이 되기 때문에 사용할 수 있다.

* require: https://codegear.tistory.com/43
* webpack: https://serzhul.io/JavaScript/learn-webpack-in-under-10minutes/

보통 JS에서 라이브러리를 사용하려면 스크립트 추가하고 그 전역 객체를 끌어다가 사용하는데 import를 사용하려면 webpack과 같은 번들을 따로 사용해야 한다.

--

주요 함수
//html에 실제 render해주는 함수
ReactDom.render();

//component 만들어주는 함수
React.Component

--

### 라이브러리 실습
1. npm init -y
2. npx serve
: 이 폴더를 마치 file server 처럼 사용할 수 있게 해주는 명령어
: localhost:5000번을 열면 현재 index.html이 없기 때문에 파일 목록이 뜬다.
: html 간단하게 작성
: body사이에 cdn으로 react, react-dom을 넣어줌
https://reactjs.org/docs/cdn-links.html
https://reactjs.org/docs/react-api.html

--

## 리액트 이전의 프론트엔드

1. 고전
HTML로 문서 구조를 잡고, CSS 스타일을 입히고, JavaScript로 DOM을 조작한다.

2. Component화한 프론트엔드
클래스 느낌으로 컴포넌트화
직접 함수와 객체를 만든다.

3. React

--

## Hooks 이전

보통 컴포넌트 내부에 유지되는 상태가 있다면 class 컴포넌트를 만들었다.

그리고 만약 유지되는 상태가 없다면
1. 라이프 사이클 이용해야하면 Class 컴포넌트
2. 라이프 사이클 이용 안해도 되면 function 컴포넌트 

그런데 Hook이라는 기술이 나온후에는 위의 기준을 사용하지 않는다. 그말인 즉슨, function 컴포넌트에도 Hook을 이용한다면 상태나 라이프 사이클 같은 기능을 할 수 있다.


https://jbhs7014.tistory.com/39

--

## class component


## function component


function은 매개변수 형태로 props를 받음
class는 매개변수 형태 아님, this 사용
class는 extend, render()이라는 구문이 추가됨

--

## JSX 문법과 babel
JSX 문법으로 작성한 코드를 순수한 자바스크립트로 컴파일 해주는 역할을 babel이 한다.

* <srcipt type="text/babel">
https://babeljs.io/

* JSX 문법 : <h1 id="root"></h1>
* 순수한 자바스크립트 함수 : React.createElement('h1', null, null>

## JSX 문법의 장점
- 가독성이 뛰어나다
- babel과 같은 컴파일 과정에서 문법적 오류를 인지하기 쉽다.

## JSX 문법
1. 최상위 요소가 하나여야 한다.
* 만약 같은 요소를 반복하고 싶다면 Fragment를 사용하면 되는데 JSX 문법에서는 이를 가장 최상위 요소를 <></>으로 감싸는 것으로 표현한다.
2. 자바스크립트 표현식을 사용하려며, {} 이용
3. if문 대신에 삼항 연사자 혹은 &&을 사용
4. class라는 것은 자바스크립트 예약어이기 때문에 사용할 수 없으므로 className으로 사용해야 한다.
5. <h1 a="1"> 처럼 사용되는 attribute는 props로 컴파일이 되어 React.createElement의 두번째 인자로 넘어가게 된다.

---

## props와 State

1. props는 컴포넌트 외부에서 컴포넌트를 사용할때 주는 데이터
2. State는 컴포넌트 내부에서 변경할 수 있는 데이터

>> 두가지의 값이 바뀔때마다 랜더 함수가 다시 실행된다.

--

## Event Handling

1. camelCase로만 사용할 수 있고 엘리먼트에서 사용할 수 있는 이벤트명 (onClink, onMouseEnter)
2. 이벤트={}

--


