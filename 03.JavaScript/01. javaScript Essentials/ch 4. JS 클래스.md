# JS 클래스 - 4

## 생성자 함수(자바스크립트의 클래스)

개발을 하다 보면 유사한 객체를 여러 개 만들어야 할 때가 생기곤 합니다. 이 경우 'new' 연산자와 생성자 함수를 사용하면 유사한 객체 여러 개를 쉽게 만들 수 있습니다. 이러한 방법을 자바스크립트의 클래스라고 하며 이는 리터럴 방식으로 구현된다.

### 생성자 함수

생성자 함수(constructor function)와 일반 함수에 기술적인 차이는 없습니다. 다만 생성자 함수는 아래 두 관례를 따릅니다.

1. 함수 이름의 첫 글자는 대문자로 시작합니다.
2. 반드시 'new' 연산자를 붙여 실행합니다.

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

// 생성자 함수를 통해서 할당된 객체를 생성자 함수의 인스턴스라고 부른다.
let user = new User("홍길동", 21);

console.log(user.name); //홍길동
console.log(user.age); //21
```

### 생성자 함수 실행 후 알고리즘 동작 방법

new User(...)를 써서 함수를 실행하면 아래와 같은 알고리즘이 동작합니다.

1. 빈 객체를 만들어 this에 할당합니다.
2. 함수 본문을 실행합니다. this에 새로운 프로퍼티를 추가해 this를 수정합니다.
3. this를 반환합니다.

```javascript
function User(name, age) {
  // this = {};  (빈 객체가 암시적으로 만들어짐)

  // 새로운 프로퍼티를 this에 추가함
  this.name = name;
  this.age = age;

  // return this;  (this가 암시적으로 반환됨)
}
```

[참고](https://ko.javascript.info/constructor-new)

### prototype을 이용하여 메모리 절약하기

[prototype](https://github.com/JEONGBOYEON/study-react/blob/main/03.JavaScript/Levelup/Prototype.md)을 이용하면 객체의 같은 값이나 함수가 반복적으로 메모리에 할당되는 것을 방지할 수 있다.

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.getFullUserInfor = () => {
  return `name: ${this.name}, age:${this.age}`;
};
```

## this

[javascript의 this 바인딩에 대해 더 알아보기](https://github.com/JEONGBOYEON/study-react/blob/main/03.JavaScript/Levelup/this.md)

## ES6 Classes

### Classes 문법

기존의 자바스크립트에서는 prototype을 이용해 유사하게 상속을 구현했었습니다. ES6이후 Class가 나오면서 명료하고 간편하게 객체를 생성하고, 상속을 구현할 수 있습니다.

\*내부적으로 class는 기존의 prototype을 연결하는 속기법일 뿐입니다.

### Classes 사용법

1. new 키워드를 이용한 Class 생성

```javascript
// ASIS
// function Coupon() {}
// const coupon = new Coupon();

// TOBE
class Coupon {}
const coupon = new Coupon();
```

2. constructor() 생성자 함수로 속성 설정

```javascript
// ASIS
// function Coupon(price, expiration) {
        this.price = price;
        this.expiration = expiration || '2주'}
// const coupon = new Coupon(5);

// TOBE
class Coupon {
    constructor (price, expiration) {
        this.price = price;
        this.expiration = expiration || '2주'
    }
}
const coupon = new Coupon(5)
console.log(coupon.price)            // 5
console.log(coupon['expiration'])    // 2주
```

3. 메서드 정의하기

```javascript
// ASIS
// function Coupon(price, expiration) {
        this.price = price;
        this.expiration = expiration || '2주'}
// Coupon.prototype.getPriceText() {
//     return `$${this.price}`
// }

// TOBE
class Coupon {
    constructor (price, expiration) {
        this.price = price;
        this.expiration = expiration || '2주'
    }
    getPriceText() {
        return `$${this.price}`
    }
}
const coupon = new Coupon(5);
console.log(coupon.getPriceText); // 5
```

## 상속(확장)

javascript의 class는 상속(확장) 쉽게 가능하다. extend로 부모 class를 상속 받아 온후, 내부에서 super() 메서드는 부모클래스의 생성자를 호출합니다. \*반드시 super()을 호출한 뒤에 새로운 속성을 추가하거나 부모속성을 덮어 씌울 수 있습니다.

```javascript
class FlashCoupon extends Coupon {
  constructor(price, expiration) {
    super(price); // 부모클래스 생성자 호출
    this.expiration = expiration || "2시간"; // 속성 덮어씌움
  }
  getExpirationMessage() {
    // 동일이름 메서드 대체
    return `이 쿠폰은 깜짝쿠폰이며 ${this.expiration}후에 만료됩니다.`;
  }
}
const flash = new FlashCoupon(10);
console.log(flash.price); // 10
console.log(flash.getPriceText()); // $10
console.log(flash.getExpirationMessage());
// "이 쿠폰은 2시간 후에 만료됩니다.
```

[..](https://velog.io/@kwonh/ES6-Class-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B01-%EC%82%AC%EC%9A%A9%EB%B2%95%EA%B3%BC-prototype)
