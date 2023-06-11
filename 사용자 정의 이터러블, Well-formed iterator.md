자바스크립트 빌트인 이터러블이 아닌 사용자가 특정 데이터 구조를 순회가능하도록 만들기 위해서 사용자 정의 이터러블을 만들수 있습니다. 

1. 우선 이터러블은 **[Symble.iterable] 매소드**를 가져야 합니다.
2. 이 [Symble.iterable] 매소드는 **iterator 객체를 return** 해야 합니다.
3. iterator 객체는 **next 매소드**를 가져야 합니다.
4. next 매소드는 **value, done 을 가지는 객체**를 return 해야 합니다.

![](https://velog.velcdn.com/images/boyeon_jeong/post/24204812-b0fb-4597-bf13-3fad591dab5f/image.png)



```javascript
const iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        return {value, done}
      }
    }
  }
}

//실제 예시
const iterable = {
  [Symbol.iterator](){
    let i = 3;
    return{
      next () {
        return i==0 ? {done:true}:{value: i--, done:false}
      }
    }
  }
}

let iterator = iterable[[Symbol.iterator]]();
log(iterator.next());
```

그런데!! 위의 소스는 **Well-formed iterator** 가 아닙니다. ❌❌

---
## 잘만들어진 이터레이블 Well-formed iterator 만들기 👍


"Well-formed iterator"는 이터레이터(iterator) 객체가 일반적으로 기대되는 동작을 제대로 수행하는 것을 말합니다. 이터레이터는 이터레이터 프로토콜(iterator protocol)을 준수해야 하며, 적절한 `next()` 메서드를 가지고 있어야 합니다.

Well-formed iterator는 다음과 같은 특징을 가지고 있습니다:

1. `next()` 메서드: 이터레이터 객체는 `next()` 메서드를 가지고 있어야 합니다. `next()` 메서드는 `{ value, done }` 형태의 객체를 반환해야 합니다. `value`는 현재 값을 나타내며, `done`은 순회가 완료되었는지 여부를 나타냅니다.

2. 반복 가능성: 이터레이터 객체는 자체적으로 이터러블(iterable)해야 합니다. 이는 이터레이터 객체의 `[Symbol.iterator]()` 메서드가 **이터레이터 🌟자신을 반환🌟**해야 함을 의미합니다. 이는 이터레이터 객체를 다시 이터레이션할 수 있는 순환 가능한 객체로 만들어줍니다.

3. 순회 동작: 이터레이터 객체는 순회를 위한 반복 구문인 `for...of` 루프와 함께 사용될 수 있어야 합니다. 이는 이터레이터 객체가 이터러블 프로토콜을 준수하고 순차적으로 값을 반환할 수 있어야 함을 의미합니다.


```javascript
const iterable = {
  [Symbol.iterator](){
    let i = 3;
    return{
      next () {
        return i==0 ? {done:true}:{value: i--, done:false}
      },
      [Symbol.iterator]() { return this; }
    }
  }
}
```
