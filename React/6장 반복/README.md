# 반복

프로젝트에서 반복적인 내용을 효율적으로 관리하지 못하면 파일용량이 커지고 유지보수 역시 힘들게 됩니다. 리액트에서는 이와 같이 반복적인 부분을 효율적으로 관리하기 위한 방법이 존재합니다.

## array의 map() 함수

자바스크립트 배열 객체의 내장 함수인 map 함수를 사용하여 반복되는 컴포넌트를 렌더링할 수 있습니다.

<!--
map 함수의 파라미터는 다음과 같습니다.

```
arr.map(callback, [thisArg])

• callback: 새로운 배열의 요소를 생성하는 함수로 파라미터는 다음 세 가지입니다.
- currentValue: 현재 처리하고 있는 요소
- index: 현재 처리하고 있는 요소의 index 값
- array: 현재 처리하고 있는 원본 배열

• thisArg(선택 항목): callback 함수 내부에서 사용할 this 레퍼런스
``` -->

이 함수를 사용하여 기존 배열의 요소를 제곱하여 새로운 배열을 생성하겠습니다.

```jsx
const numbers = [1, 2, 3, 4, 5];
const result = number.map((num) => num * num);
console.log(result);
```

### 컴포넌트 배열로 변환

위의 예제처럼 일반적인 값으로 배열을 새로 생성할 수 있지만 리액트에서는 컴포넌트로 구성된 배열을 생성할 수도 있습니다. 이때 callback 함수에 JSX 코드로 된 값을 반환해줍니다.

```jsx
import React from "react";

const IterationSample = () => {
  const names = ["눈사람", "얼음", "눈", "바람"];
  const nameList = names.map((name) => <li>{name}</li>);
  return <ul>{nameList}</ul>;
};

export default IterationSample;
```

### 컴포넌트 배열과 key값

그런데 이때 위와 같은 코드에서 랜더링은 정상적으로 되지만 크롬 개발자 도구의 콘솔에 key prop이 없다는 경고 메세지를 받게 됩니다.

리액트에서는 컴포넌트 배열을 렌더링할때 Virtual DOM을 비교하는 과정에서 어떤 값이 변화가 일어났는지 빠르게 확인하기 위해 key를 사용합니다. 만약 key값이 없다면 리스트를 순차적으로 비교하여 감지하기 때문에 오래걸립니다.

key값은 유일해야 하며 설정은 컴포넌트 props를 설정하듯이 설정하면 됩니다. 이때 키 값을 유일하게 나타내는 값이 없다면 콜백 함수의 인수인 index 값을 사용해도 좋지만, 효율적으로 리렌더링하지 못하기 때문에 가능하다면 유일한 값을 생성하여 key값으로 넘겨주어야 합니다.

```javascript
import React from "react";

const IterationSample = () => {
  const names = ["눈사람", "얼음", "눈", "바람"];
  const namesList = names.map((name, index) => <li key={index}>{name}</li>);
  return <ul>{namesList}</ul>;
};

export default IterationSample;
```

### 배열의 내장 함수 응용

1. Array.prototype.concat(): 기존 배열을 변경하지 않고, 합쳐서 반환
2. Array.prototype..filter(): 조건을 통과하는 요소만 모아 새로운 배열로 반환

> https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/concat > https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

```jsx
import React, { useState } from ‘react‘;

const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: ‘눈사람‘ },
    { id: 2, text: ‘얼음‘ },
    { id: 3, text: ‘눈‘ },
    { id: 4, text: ‘바람‘ }
  ]);
  const [inputText, setInputText] = useState(“);
  const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 id

  const onChange = e => setInputText(e.target.value);
  const onClick = () => {
    const nextNames = names.concat({
      id: nextId, // nextId 값을 id로 설정하고
      text: inputText
    });
    setNextId(nextId + 1); // nextId 값에 1을 더해 준다.
    setNames(nextNames); // names 값을 업데이트한다.
    setInputText(“); // inputText를 비운다.
  };
  const onRemove = id => {
    const nextNames = names.filter(name => name.id != = id);
    setNames(nextNames);
  };
  const namesList = names.map(name => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
  ));
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{namesList}</ul>
    </>
  );
};

export default IterationSample;
```

### push와 cancat

- Array.prototype.push(): 배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환합니다.(기존 배열 수정)
- Array.prototype.concat(): 기존 배열을 변경하지 않고, 새로운 배열을 반환

concat은 push와 다르게 기존 배열의 변화를 주지 않아 불변성이 유지됩니다. 리액트에서 상태를 업데이트할 때는 기존 상태를 그대로 두면서 새로운 값을 상태로 설정해야 합니다. 이처럼 불변성 유지를 해 주어야 나중에 리액트 컴포넌트의 성능을 최적화할 수 있습니다.

리액트는 상태값을 업데이트 할 때 얕은 비교를 수행합니다. 즉 객체의 속성 하나하나를 비교하는게 아니라 참조값만 비교하여 상태 변화를 감지합니다.

spread operator, map, filter, slice, reduce 등등 새로운 배열을 반환하는 메소드들을 활용하면 됩니다.

- splice는 원본데이터를 변경함
