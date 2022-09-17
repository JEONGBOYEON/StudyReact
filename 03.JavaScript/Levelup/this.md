# javascript의 this 바인딩

### javascript의 this 바인딩의 종류

javascript의 this는 총 아래의 3가지의 케이스로 바인딩 됩니다.

1. 전역 공간의 this : 전역 객체
2. **메소드** 호출 시 메소드 내부의 this : 해당 메소드를 호출한 객체
3. **함수** 호출 시 함수 내부의 this : 지정되지 않음(❓❗️ )

### 메소드와 함수

javascript가 다른 언어와의 다른 점 중 하나는 함수가 값이 될 수 있다는 점입니다.

예를 들어 아래처럼 함수를 선언 했을때 이는 곧 변수가 되어 a라는 변수에 함수가 담기게 됩니다. 곧 함수가 변수된 것이라고 말할 수 있습니다.

```javascript
function a() {}
```

따라서 함수는 객체의 값으로도 표현될 수 있습니다. 이렇게 객체의 속성 값을 담겨진 함수를 **매소드**라고 부릅니다.

```javascript
const a = {
    b: 1,
    c: function a() {};
}
```

### **함수** 호출 시 함수 내부의 this

다시 본론으로 돌아와서 이처럼 함수 호출시 this는 바인딩 되지 않기 때문에 다음과 같은 문제가 발생할 수 있습니다.

```javascript
const cat = {
  name: "meow",
  foo1: function () {
    const foo2 = function () {
      console.log(this.name);
    };
    foo2();
  },
};

cat.foo1(); // undefined
```

### 화살표 함수의 this 바인딩

화살표 함수는 위와 같은 상황에서 this가 바인딩 되도록 하였습니다. 기존 일반 함수로 this를 함수의 this가 바인딩 되지 않았기 때문에 전역 this를 찾았고, 전역 this에 해당 값이 없기 때문에 undefined으로 나타나게 됩니다. 그와 비교하여 화살표 함수로 선언한 함수에는 this가 없습니다. 따라서 자동으로 선언될 시점에서 상위 스코프가 this로 바인딩 됩니다.

> JavaScript에서는 어떤 식별자(변수)를 찾을 때 현재 환경에서 그 변수가 없으면 바로 상위 환경을 검색합니다. 그렇게 점점 상위 환경으로 타고 타고 올라가다가 변수를 찾거나 가장 상위 환경에 도달하면 그만두게 되는 것이죠. 화살표 함수에서의 this 바인딩 방식도 이와 유사합니다. 화살표 함수에는 this라는 변수 자체가 존재하지 않기 때문에 그 상위 환경에서의 this를 참조하게 됩니다.

# 화살표 함수의 this가 사용되면 안되는 상황

### 메소드

### 생성자 함수

### addEventListener()의 콜백함수

[참고](https://velog.io/@padoling/JavaScript-%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98%EC%99%80-this-%EB%B0%94%EC%9D%B8%EB%94%A9)
