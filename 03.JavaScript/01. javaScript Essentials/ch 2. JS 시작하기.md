# JS 시작하기

## ECMAScript(ECMA, ES)

ES는 자바스크립트를 표준화 해주는 국제 표준화 기구를 의미합니다.

### ES6

ES6는 2015년에 만들어진 ES의 6버전입니다. 이 버전은 ECMAScript 2015 (ES2015)라고도 불립니다. 이 버전은 대규모로 바뀌었기 때문에 바로 전 버전이 ES5 버전과의 차이점을 잘 알아야 한다.

## project 시작하기(../project/js-test)

### project 생성 및 package 설치

```shell
npm init -y
npm install parcel-bundler -D
```

### parcel script 작성

```json
  "scripts": {
    "dev": "parcel index.html",
    "build" : "parcel build index.html"
  },
```

### 파일 생성

./index
./js/main.js

### 코드 컨맨션

- 하나의 한줄만
- 세미콜론 안 붙여도 된다.(bundle에서 자동으로 생성된다.) 그렇지만 몇가지는 안 붙이면 오류가 뜬다.

### typeof

undefined: 의도하지 않은 비어있는 값
null: 의도한 비어있는 값

### export, import

## document methods

> querySelector()
> querySelectorAll()
> createElement()
> createAttribute
> appendChild()
> textContent

```javascript
const ulEl = document.querySelector("ul");

for (let i = 0; i < 10; i++) {
  const li = document.createElement("li");
  li.textContent = `list-${i + 1}`;
  li.addEventListener("click", function () {
    console.log(li.textContent);
  });
  ulEl.appendChild(li);
}
```

## defer, async

모던 웹브라우저에서 돌아가는 스크립트들은 대부분 HTML보다 ‘무겁습니다’. 용량이 커서 다운로드받는 데 오랜 시간이 걸리고 처리하는 것 역시 마찬가지이죠.

브라우저는 HTML을 읽다가 <script>...</script> 태그를 만나면 스크립트를 먼저 실행해야 하므로 DOM 생성을 멈춥니다. 외부에서 스크립트를 다운받고 실행한 후에야 남은 페이지를 처리할 수 있습니다.

따라서 아래의 두가지의 문제가 발생할 가능성이 존재합니다.

1. 스크립트에서는 스크립트 아래에 있는 DOM 요소에 접근할 수 없습니다. 따라서 DOM 요소에 핸들러를 추가하는 것과 같은 여러 행위가 불가능해집니다.
2. 페이지 위쪽에 용량이 큰 스크립트가 있는 경우 스크립트가 페이지를 ‘막아버립니다’. 페이지에 접속하는 사용자들은 스크립트를 다운받고 실행할 때까지 스크립트 아래쪽 페이지를 볼 수 없게 됩니다.

이를 해결하기 위해서는 몇가지의 방법이 있습니다.

첫번째로, 다음과 같이 스크립트를 DOM 중간에 위치하게 해줍니다.

```javascript
<p>...스크립트 앞 콘텐츠...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- 스크립트 다운로드 및 실행이 끝나기 전까지 아래 내용이 보이지 않습니다. -->
<p>...스크립트 뒤 콘텐츠...</p>
```

이렇게 작성한 경우 HTML 문서 자체가 아주 클 떄에는 브라우저가 HTML 문서 전체를 다운로드 한 다음에 스크립트를 다운받게 하면 페이지가 정말 느려질 겁니다.

따라서 다음방법으로는 <script> 속성인 defer와 async을 사용하여 해결해주어야 합니다.

### defer

브라우저는 defer 속성이 있는 스크립트(defer 스크립트/지연 스크립트)를 '백그라운드’에서 다운로드 합니다. 따라서 지연 스크립트를 다운로드 하는 도중에도 HTML 파싱이 멈추지 않습니다. 그리고 defer 스크립트 실행은 페이지 구성이 끝날 때까지 지연 됩니다.

지연 스크립트는 DOM이 준비된 후에 실행되긴 하지만 DOMContentLoaded 이벤트 발생 전에 실행됩니다.

```javascript
<p>...스크립트 앞 콘텐츠...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- 바로 볼 수 있네요! -->
<p>...스크립트 뒤 콘텐츠...</p>
```

\*<script>에 src가 없으면 defer 속성은 무시됩니다.

### async

[참고](https://ko.javascript.info/script-async-defer)

## 변수 유효범위[var, let, const]

1. const, let => 같은 중괄호(블록 레벨) 범위내에서만 사용할 수 있는 변수
2. var => 함수레벨의 변수
   \*var 변수는 의도하지 않은 범위내에서 변수를 사용할 수 있고, 메모리 누수로

```javascript
function scope() {
  if (true) {
    const a = 123;
    console.log(a);
  }
  console.log(a);
}

scope();
```

## 형 변환

### (동등 연산자와 일치 연산자)

자바스크립트에서는 동등 연산자(==)를 사용할 시에는 형 변환 후 데이터를 비교하여 다른 값들도 true라는 결과를 반환할 수 있다. 따라서 반드시 일치 연산자(===)를 사용해주어야 한다.

```javascript
const a = 1;
const b = "1";

// 현재 서로 다른값인데 형변환이 일어난후 비교하기 때문에 true를 반환함
console.log(a == b);
```

### Truthy, Falsy 값

자바스크립트는 특정 값들을 ture, false와 같이 형변환을 하여 인식한다. 아래와 같은 값들 중에서 Truthy한 데이터는 너무 많기 때문에 Falsy을 기억해주는 것이 좋다.

1. Truthy
   ture
   {} > 모든 객체
   [] > 모든 배열
   1, 2, -12 > 값이 존재하는 숫자
   'false', '3.14' > 비어있지 않은 문자열
   ....

2. Falsy
   false
   '' > 비어있는 문자열
   null
   nudefined
   0, -0 > 0인 숫자
   NaN > (Not a Number) ex, 1 + nudefined
