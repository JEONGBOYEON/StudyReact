# JS 함수

## 함수 선언 방법

### 함수 선언 방식: 기명 함수

이름이 있는 함수

```javascript
function sum(x, y) {
  return x + y;
}
```

### 익명 함수, 함수 표현

익명 함수: 이름이 없는 함수
함수 표현: 익명 함수를 변수에 담아서 사용

```javascript
const sum = function (x, y) {
  return x + y;
};
```

## arguments 객체, 나머지 매개변수

### arguments 객체

Arguments 객체는 함수의 매개변수에 지정되지 않은 값을 인자로 넘길 경우 Array 형태의 객체로 받을 수 있게 해주는 개체입니다.
\*(Array 형태 != Array) > Arguments는 Array가 아닌 Array**형태** 이기 때문에 length 속성과 더불어 0부터 인덱스 된 다른 속성을 가지고 있지만, Array의 forEach, map과 같은 내장 메서드를 가지고 있지는 않습니다.

```javascript
function func1(a, b, c) {
  console.log(arguments[0]);
  // expected output: 1
  console.log(arguments[1]);
  // expected output: 2
  console.log(arguments[2]);
  // expected output: 3
}

func1(1, 2, 3);
```

- 각 인수를 재할당 할 수 있습니다.
- arguments 객체는 Array가 아닙니다. Array와 비슷하지만, length 빼고는 pop()과 같은 어떤 Array 속성도 없습니다. 그러나 실제 Array로 변환할 수 있습니다:

```javascript
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES6의 Array.from() 매소드
var args = Array.from(arguments);
// ES6의 전개 연산자 사용
var args = [...arguments];
```

_[Array.from()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
_[전개 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### 나머지 매개변수

함수의 마지막 매개변수 앞에 "..."를 붙이면 인자들을 배열에 넣도록 지정합니다.

- 마지막 매개변수만 나머지 매개변수로 설정할 수 있습니다.
- 함수 정의에는 하나의 ...만 존재할 수 있습니다.

```javascript
function myFun(a, b, ...manyMoreArgs) {
  console.log("a", a);
  console.log("b", b);
  console.log("manyMoreArgs", manyMoreArgs);
}

myFun("one", "two", "three", "four", "five", "six");

// 콘솔 출력:
// a, one
// b, two
// manyMoreArgs, [three, four, five, six]
```

[나머지 매개변수와 arguments 객체의 차이](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters#%EB%82%98%EB%A8%B8%EC%A7%80_%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98%EC%99%80_arguments_%EA%B0%9D%EC%B2%B4%EC%9D%98_%EC%B0%A8%EC%9D%B4)

## 화살표 함수

화살표 함수는 function이라는 키워드를 사용하지 않고 할당연산자와 화살표 함수로 함수를 축약하여 표현할 수 있는 함수이다.

```javascript
const sum = (x, y) => {
  return x + y;
};
// 만약 함수 연산이 단순 return이라면 중괄호와 return 생략할 수 있다.
const sum = (x, y) => x + y;
// 그런데 만약 리턴해야 하는 값이 Object라면 {}를 ()로 한번 더 감싸주어야 한다.
const sum = (x, y) => ({ name: bobo });
// 만약 매개변수가 하나라면 ()을 생략할 수 있다.
const sum = (x) => x;
```

## 즉식실행함수(IIFE, Immediately Invoked Function Expression)

즉시 실행 함수 표현은 **정의되자마자 즉시 실행**되는 Javascript Function 를 말한다.

이는 Self-Executing Anonymous Function 으로 알려진 디자인 패턴이고 크게 두 부분으로 구성된다.

1. (function(){})**()**:첫 번째는 괄호((), Grouping Operator)로 둘러싸인 익명함수(Anonymous Function)이다. 이는 전역 스코프에 불필요한 변수를 추가해서 오염시키는 것을 방지할 수 있을 뿐 아니라 IIFE 내부안으로 다른 변수들이 접근하는 것을 막을 수 있는 방법이다.

2. (function(){}**()**)두 번째 부분은 즉시 실행 함수를 생성하는 괄호()이다. 이를 통해 자바스크립트 엔진은 함수를 즉시 해석해서 실행한다.

## 호이스팅

[호이스팅](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)은 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미합니다.

호이스팅은 선언만 코드의 최상단으로 옮깁니다.(초기화는 옮기지 않음) 따라서 변수를 정의하는 코드보다 사용하는 코드가 앞서 등장할 수 있습니다.

### 함수의 호이스팅

```javascript
catName("클로이");

function catName(name) {
  console.log("제 고양이의 이름은 " + name + "입니다");
}
```

### var 변수의 호이스팅

```javascript
console.log(num); // 호이스팅한 var 선언으로 인해 undefined 출력
var num; // 선언
num = 6; // 초기화
```

### let, const 변수의 호이스팅

let과 const로 선언한 변수도 호이스팅 대상이지만, var와 달리 호이스팅 시 undefined로 변수를 초기화하지는 않습니다. 따라서 변수의 초기화를 수행하기 전에 읽는 코드가 먼저 나타나면 예외가 발생합니다.

```javascript
console.log(num); // 예외 발생
let num; // 선언
num = 6; // 초기화
```

## 타이머 함수

<!-- 1. set -->

###

```javascript

```

## 콜백

###

```javascript

```
