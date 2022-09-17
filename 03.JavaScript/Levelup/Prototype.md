# prototype

자바스크립트에서는 기존의 객체를 복사하여(cloning) 새로운 객체를 생성하는 프로토타입 기반의 언어입니다. 이렇게 생성된 객체 역시 또 다른 객체의 원형이 될 수 있습니다.

프로토 타입은 객체를 확장하고 객체 지향적인 프로그래밍을 할 수 있게 해줍니다.

프로토 타입의 종류로는 아래 2가지가 존재한다.

1. Prototype Link
2. Prototype Object

## Prototype Object 이해하기 1

객체는 언제나 함수로 생성됩니다.

```javascript
function Person() {} // => 함수
var personObject = new Person(); // => 함수로 객체를 생성

var obj = {};
var obj = new Object();
// Object는 자바스크립트에서 기본적으로 제공하는 함수(Object와 마찬가지로 Function, Array도 모두 함수로 정의되어 있음)
```

## Prototype Object 이해하기 2

자바스크립트에서는 함수가 정의 될때 다음과 같은 2가지의 일이 동시에 이루어집니다.

1.해당 함수에 Constructor(생성자) 자격 부여 2.해당 함수의 속성 속성 prototype(Prototype Object) 생성 및 연결 3. prototype(Prototype Object)의 속성인 constructor, `__proto__` 생성

- constructor 함수를 가리킴
- `__proto__` 은 아래서 설명

<img width="711" alt="image" src="https://user-images.githubusercontent.com/32887635/190853991-f93312f5-5777-4f6b-9a32-3225fb2d02d3.png">
<img width="360" alt="image" src="https://user-images.githubusercontent.com/32887635/190854004-d1f0fc62-9882-4e93-93d7-ef7c0aa640f6.png">

## Prototype Link 이해하기

함수(클래스)를 생성하고 new 라는 키워드로 객체(인스턴스들)을 생성하면 아래와 같은 속성들이 각자 생성됩니다.

1. 함수(클래스) : prototype 속성 생성
2. 객체(인스턴스들) : `__proto__` 속성 생성

위에서 생성된 속성들 모두 Prototype Object를 가리킵니다. 이렇게 **proto**속성을 통해 상위 프로토타입과 연결되어있는 형태를 프로토타입 체인(Chain)이라고 합니다.

## 모든 객체는 Object의 자식

이런 프로토타입 체인 구조 때문에 ** 모든 객체는 Object의 자식** 이라고 불리고, Object Prototype Object에 있는 모든 속성을 사용할 수 있습니다.

![image](https://user-images.githubusercontent.com/32887635/190854287-523d1bc3-c34d-4eab-83e0-d7343a9d4ba7.png)

[참고](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)
