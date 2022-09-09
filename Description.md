## 리액트의 핵심 모듈

1. 리액트 컴포넌트를 HTMLElemnet 연결하기
   import ReactDOM from 'react-dom';

2. 리액트 컴포넌트 만들기
   import React from 'react';

--

import는 ES6 방식

원래 Node.js에서 모듈을 가져다 쓰려고 하면 require를 사용해야 하지만 나중에 import 구문이 webpack을 통해 변경이 되기 때문에 사용할 수 있다.

- require: https://codegear.tistory.com/43
- webpack: https://serzhul.io/JavaScript/learn-webpack-in-under-10minutes/

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

- <srcipt type="text/babel">
  https://babeljs.io/

- JSX 문법 : <h1 id="root"></h1>
- 순수한 자바스크립트 함수 : React.createElement('h1', null, null>

## JSX 문법의 장점

- 가독성이 뛰어나다
- babel과 같은 컴파일 과정에서 문법적 오류를 인지하기 쉽다.

## JSX 문법

1. 최상위 요소가 하나여야 한다.

- 만약 같은 요소를 반복하고 싶다면 Fragment를 사용하면 되는데 JSX 문법에서는 이를 가장 최상위 요소를 <></>으로 감싸는 것으로 표현한다.

2. 자바스크립트 표현식을 사용하려며, {} 이용
3. if문 대신에 삼항 연사자 혹은 &&을 사용
4. class라는 것은 자바스크립트 예약어이기 때문에 사용할 수 없으므로 className으로 사용해야 한다.
5. <h1 a="1"> 처럼 사용되는 attribute는 props로 컴파일이 되어 React.createElement의 두번째 인자로 넘어가게 된다.

---

## props와 State

1. props는 컴포넌트 외부에서 컴포넌트를 사용할때 주는 데이터
2. State는 컴포넌트 내부에서 변경할 수 있는 데이터

> > 두가지의 값이 바뀔때마다 랜더 함수가 다시 실행된다.

--

## Event Handling

1. camelCase로만 사용할 수 있고 엘리먼트에서 사용할 수 있는 이벤트명 (onClink, onMouseEnter)
2. 이벤트={}

--

## CRA(Create React App)

https://create-react-app.dev/

- react applicatio을 만드는 커멘드 라인 툴에 대한 설명(facebook opensource - 공식)

- 단순히 프로젝트 생성을 넘어서 개발에 필요한 다양한 기능을 제공해줌

- npx: npm 5.2.0 이상부터 함께 설치된 커맨드라인 명령어

/_
npx create-react-app react-start
cd react-start
code .
_/

- 기본적으로 CRA을 통해 만든 프로젝트는 node.js 기반 따라서 package.json 파일이 있다.
  \*package.json의 dependencies
  > testing libray, react library
  > \*scripts는 npm 명령어
  > npm start : 개발모드로 로컬에서 띄울수 있음
  > npm run build : production mode build -> complie
  > npx serve -s build : build라는 파일을 로컬에서 파일서버로 띄어준다.
  > npm test : jest를 통해 test code 실행
  > npm run eject > CRA에서 빼내온 후 다양한 커스터마이징 가능(위험)

--

## ESLint

- lint라는 툴을 사용하여 코딩스타일을 내부적으로 규정
- 모든 자바 스크립트와 JSX로 되어있는 프로젝트 다 가능

- 실습

1. mkdir eslint
2. npm init -y
3. npm install -D
4. npx eslint --init //config 파일 생성됨

--

## prittier

plugin 설치하고
Setting > Formatting > default를 prittier

https://prettier.io/docs/en/options.html
만약에 내 설정으로 바꾸고 싶으면 .prettierrc.json 파일을 만들고 설정 해주면 됨

혹시나 ESLint와 prittier 충돌이 나서 문제가 생길 수도 있으니 eslint-config-prettier를 추가해주면 된다.

{
...
"eslintConfig": {
"extends": [
"react-app",
"prettier"
]
},
...
}

--

## husky

git hook을 쉽게 사용해주는 패키지

커밋하기 전에 test 하여 문제있는 코드를 올리지 않은 수 있다.

--

## init-staged

커밋하려고 하려는 파일들에 대해 lint-staged 넣어주는것

--

## React 시작 코드 이해하기

1. index.js가 가장 처음 시작하는 코드
2. pulic/index.html의 root에 그려짐

- public은 static한 파일을 담고 있는 폴더

3. App.js

import는 ES6문법 webpack의 loader가 가져와줌

--

## React Developer Tools

https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi

- 크롬확장 프로그램을 설치한 후에 DevTools을 열면 Components, Profiler가 추가되어있음

--

## React Router

서버에서 하나의 큰 애플리케이션을 받아주고 react router라고 하는 libar의 로직에 따라 클라이언트(브라우저)가 라우팅 해줌

npx create-react-app react-router-example

cd react-router-example
npm i react-router-dom

React-Router-Dom이라는 패키지의 특징은 대문자로 시작하는 컴포넌트들을 제공해줌

- BrowserRouter

https://kyung-a.tistory.com/36 바뀐것

1. Route 컴포넌트에 경로(path) 와 컴포넌트(component) 를 설정하여 나열해줍니다.
2. BrowserRouter 로 Route 들을 감싸줍니다.
3. 브라우저에서 요청한 경로에 Route 의 path 가 들어있으면 해당 component 를 보여줍니다.

- 만약 완전히 똑같아야만 한다면 exact 추가

V6이후 부터 아래와 같이 수정됨
<Routes>
<Route path="/" element={<Home />} />

--

## 동적 Routing

Route />에서 컴포넌트 렌더링

\*react-router-dom 버전 6부터는 element로 컴포넌트를 만들고, route props(match, history, location)을 받지 않는다. 따라서, useParams, useLocation, useHistory를 사용하여 route context에 접근한다

1.  URL Params 읽는법 (match 객체)

/1

- String
  <Route path="/profile/:id" element={<Profile />} exact />
  const { id } = useParams();

2. Query 읽는법 (location 객체)

?name=mark

- Query String 쿼리스트링 은 없어도 된다. 따라서 추가적인 라우트 처리 없음
  https://velog.io/@pear/Query-String-%EC%BF%BC%EB%A6%AC%EC%8A%A4%ED%8A%B8%EB%A7%81%EC%9D%B4%EB%9E%80

- 브라우저 내장 객체인 URLSearchParams 사용(IEX 지원 안함)
  const searchParams = new URLSearchParams(props.location.search);
  const name = searchParams.get('name');

- npm i query-string -S

* qs라는 라이브러리를 사용
  const query = queryString.parse(props.location.search);
  const { name } = query;

- V6 부터는 useLocation
  const { search } = useLocation();
  const { name } = queryString.parse(search);
