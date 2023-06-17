## 제너레이터란?

제너레이터 함수는 이터레이터를 생성하는 데 사용될 수 있습니다. 이터레이터를 생성하기 위해 제너레이터 함수를 작성하면, yield 키워드를 사용하여 순차적으로 값을 반환하고 이터레이터를 제어할 수 있습니다.

```javascript
function* myIterator() {
  yield '첫 번째';
  yield '두 번째';
  yield '세 번째';
}

const iterator = myIterator();

console.log(iterator.next().value); // 첫 번째
console.log(iterator.next().value); // 두 번째
console.log(iterator.next().value); // 세 번째
console.log(iterator.next().value); // undefined

```
## 제너레이터는 이터러블이자 이터레이터(well-formed iterator)
제너레이터는`well-formed iterator` 이기 때문에 `이터레이터(iterator)이자 이터러블(iterable) 객체`입니다.![](https://velog.velcdn.com/images/boyeon_jeong/post/acc5ccde-bbaf-46e1-9a05-2adaec95a7b9/image.png)


> 🔎 **well-formed iterator는 이터레이터(iterator)이자 이터러블(iterable) 객체인가용 ?**<br/>
맞습니다!<br/>
🤓 간단히 말하면 [이터레이터](https://velog.io/@boyeon_jeong/%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94-%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%ED%84%B0-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BB%AC)는 next()를 가지는 객체, [이터러블](https://velog.io/@boyeon_jeong/%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94-%EC%9D%B4%ED%84%B0%EB%A0%88%EC%9D%B4%ED%84%B0-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BB%AC)은 Symbol.intertor 매소드를 가지는 객체입니다.
🤓 그리고 [well-formed iterator](https://velog.io/@boyeon_jeong/%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-%EC%9D%B4%ED%84%B0%EB%9F%AC%EB%B8%94)는 이터레이터인데, Symbol.intertor 매소드를 가지면 이를 호출하면 자기자신을 반환하는 이터레이터입니다.
🤓 따라서 well-formed iterator는 이터레이터이자 이터러블 객체입니다.
![](https://velog.velcdn.com/images/boyeon_jeong/post/f9fbb05e-0cf2-42da-81ab-fe2b3c6ac66c/image.png)


## 제너레이터의 return
이터러블 제너레이터는 return 문을 사용하여 순회를 종료할 때 마지막으로 값을 반환할 수 있습니다. 마지막 next를 호출하면 **done은 true가 되고, value는 return 문의 값**이 됩니다.

그러나 **for...of 루프를 사용하여 이터러블 제너레이터를 순회할 때는 return 문의 값은 반환되지 않습니다.** for...of 루프는 제너레이터의 모든 값을 순회한 후에 자연스럽게 종료됩니다.

```javascript
function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
  return '마지막 값';
}

const iterator = myGenerator();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: '마지막 값', done: true }
console.log(iterator.next()); // { value: undefined, done: true }

for (const item of myGenerator()) {
  console.log(item);
}
// 출력: 1, 2, 3
```

이터러블 제너레이터에서 return 문을 사용하는 경우는 순회를 중간에 강제로 종료해야 할 때 또는 추가적인 정리 작업을 수행해야 할 때 유용합니다. 

```javascript
function* searchGenerator(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return `찾았습니다! 인덱스: ${i}`;
    }
    yield array[i];
  }
  return '찾지 못했습니다.';
}

const iterator = searchGenerator([1, 2, 3, 4, 5], 3);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: '찾았습니다! 인덱스: 2', done: true }
```

## 제너레이터 

제너레이터는 문장을 값으로 만들 수 있다. 그리고 그 값은 순회할 수 있다. 따라서 제너레이터는 문장으로 순회할 수 있는 값을 만든다.

이는 자바스크립트가 제너레이터를 통해 어떠한 값, 어떠한 문장이든 순회할 수 있게 만들 수 있다는 것을 의미한다.

이는 다향성을 굉장히 높여주는 부분으로 상징적이며, 함수형 프로그래밍에도 중요한 개념이 된다.

제너레이터는 자바스크립트에서 값을 문장 형태로 표현하고, 해당 값을 순회할 수 있는 기능을 제공합니다. 제너레이터를 통해 어떤 값이든지 문장으로 표현하고, 그 값을 순회할 수 있는 이터레이터를 생성할 수 있습니다.

이러한 특성은 제너레이터를 활용하여 다양한 값들을 순회할 수 있는 유연성을 제공하며, 자바스크립트에서 함수형 프로그래밍과 같은 패러다임을 지원하는 데 중요한 역할을 합니다.

제너레이터는 상태와 제어 흐름을 캡슐화하고, 값을 느긋하게 생성하거나 처리할 수 있는 장점을 제공합니다. 이를 통해 비동기 코드의 순차적인 흐름을 표현하거나, 데이터의 지연 평가(lazy evaluation)를 수행하는 등 다양한 상황에서 활용할 수 있습니다.

함수형 프로그래밍에서는 제너레이터를 통해 문장으로 표현된 값들을 조합하고 변형할 수 있으며, 이를 통해 풍부한 다형성(polymorphism)을 달성할 수 있습니다. 이는 자바스크립트에서 함수형 프로그래밍의 핵심 개념 중 하나입니다.

제너레이터는 자바스크립트에서 매우 강력하고 유용한 개념으로, 다양한 상황에서 코드의 가독성과 유연성을 높이는 데에 기여합니다.


## 추가적인 제너레이터 활용 방안
제너레이터는 이터레이터를 생성하는 데 주로 사용됩니다. 그러나 이터레이터 생성 이외에도 제너레이터는 다양한 상황에서 활용될 수 있습니다. 몇 가지 예시를 들어보겠습니다:

1. 비동기 작업 관리: 제너레이터 함수는 비동기 작업의 흐름을 관리하는 데 사용될 수 있습니다. 비동기 작업을 수행하고 그 결과를 반환하는 과정을 제너레이터 함수로 구현하면, 비동기 코드를 동기적으로 작성할 수 있습니다. 예를 들어, 제너레이터를 사용하여 비동기 호출을 순차적으로 수행하거나, 여러 비동기 호출의 병렬 실행과 결과 수집을 관리할 수 있습니다.

>```javascript
function* fetchData() {
  try {
    const data1 = yield fetch('https://api.example.com/data1');
    const data2 = yield fetch('https://api.example.com/data2');
    // 비동기 작업의 결과를 순차적으로 받아옴
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log('Error:', error);
  }
}
const iterator = fetchData();
const promise1 = iterator.next().value; // 첫 번째 비동기 작업 시작
promise1.then(response1 => {
  iterator.next(response1).value.then(response2 => {
    iterator.next(response2);
  });
});
```
>위 예시에서 `fetchData` 함수는 제너레이터 함수입니다. `fetchData` 함수를 호출하여 이터레이터를 생성한 다음, `next()` 메서드를 사용하여 비동기 작업을 순차적으로 진행합니다. 각 비동기 작업의 결과는 `yield` 키워드를 통해 제너레이터 함수로 반환됩니다. 비동기 작업이 완료되면 `next()` 메서드를 호출하여 다음 작업을 수행합니다.

2. 데이터 생성: 제너레이터는 데이터를 생성하는 데 사용될 수 있습니다. 예를 들어, 제너레이터 함수를 사용하여 무한한 수열, 랜덤한 데이터 시퀀스, 혹은 특정 조건에 따라 데이터를 생성하는 로직을 구현할 수 있습니다.

>```javascript
function* generateSequence() {
  let i = 1;
  while (true) {
    yield i++;
  }
}
const iterator = generateSequence();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
// ...
```
위 예시에서 `generateSequence` 함수는 제너레이터 함수입니다. 이 함수는 무한한 수열을 생성하며, `yield` 키워드를 사용하여 값을 순차적으로 반환합니다. 이터레이터를 생성한 후 `next()` 메서드를 호출하여 순차적으로 값을 가져올 수 있습니다.

3. 상태 머신: 제너레이터는 상태 머신(State Machine)을 구현하는 데 사용될 수 있습니다. 상태가 변경되고 다음 상태로 진행되는 동안 제너레이터 함수는 현재 상태를 유지하고, 필요한 액션을 수행하며, 다음 상태로의 전이를 관리할 수 있습니다.


>```javascript
function* trafficLight() {
  let state = 'red';
  while (true) {
    if (state === 'red') {
      yield 'green';
      state = 'green';
    } else if (state === 'green') {
      yield 'yellow';
      state = 'yellow';
    } else if (state === 'yellow') {
      yield 'red';
      state = 'red';
    }
  }
}
const iterator = trafficLight();
console.log(iterator.next().value); // red
console.log(iterator.next().value); // green
console.log(iterator.next().value); // yellow
console.log(iterator.next().value); // red
// ...
```
위 예시에서 `trafficLight` 함수는 제너레이터 함수입니다. 이 함수는 상태 머신을 구현하여 교통 신호등의 상태를 순환하며 반환합니다. `yield` 키워드를 사용하여 현재 상태를 반환하고, 다음 상태로 전환합니다. 이를 반복하여 신호등의 상태를 계속하여 가져올 수 있습니다.

4. 지연 평가(Lazy Evaluation): 제너레이터는 지연 평가를 구현하는 데 사용될 수 있습니다. 지연 평가는 필요한 시점까지 계산을 미루고, 필요한 만큼만 계산하는 기법입니다. 제너레이터를 사용하여 데이터의 생성을 지연시키고, 필요한 만큼만 소비할 수 있습니다.

>```javascript
function* lazyDataGenerator() {
  let index = 0;
  while (true) {
    yield getData(index++); // 데이터 생성
  }
}
function getData(index) {
  console.log(`Getting data for index ${index}`);
  return index;
}
const dataIterator = lazyDataGenerator();
console.log(dataIterator.next().value); // Getting data for index 0, 0
console.log(dataIterator.next().value); // Getting data for index 1, 1
console.log(dataIterator.next().value); // Getting data for index 2, 2
// ...
```
위 예시에서 `lazyDataGenerator` 함수는 제너레이터 함수로, `getData` 함수를 호출하여 데이터를 생성합니다. `lazyDataGenerator` 함수를 호출하여 이터레이터를 생성하고, `next()` 메서드를 호출하여 필요한 만큼의 데이터를 소비합니다.
제너레이터 함수는 `yield` 키워드를 통해 데이터를 생성하며, 호출 시점에 해당 데이터를 실제로 가져옵니다. 즉, 데이터가 필요한 시점에서만 `getData` 함수가 호출되어 데이터를 가져옵니다. 이를 통해 필요한 만큼의 데이터만 생성하고 소비할 수 있으며, 불필요한 데이터 생성을 방지하여 메모리와 처리 시간을 절약할 수 있습니다.



이처럼 제너레이터 함수를 사용하여 다양한 상황에서 유연하고 강력한 로직을 구현할 수 있습니다. 

