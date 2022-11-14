# 컴포넌트 성능 최적화

## 크롬 개발자 도구를 통한 성능 모니터링

프로젝트를 개발하며 성능 이슈가 느껴질때 정확히 몇초가 걸리는지 확인하기 위해서는 크롬 개발자 도구의 Performance 탭을 열면 다음과 같이 녹화 버튼을 클릭해줍니다.

## 재 랜더링 방지: React.memo를 사용하여 컴포넌트 성능 최적화

컴포넌트 재랜더링을 방지하려면 각 컴포넌트마다 다음과 같은 매소드를 활용하면 됩니다.

1. class Component: shouldComponentUpdate() 라이프사이클 매서드
2. function Component: React.memo()

이 중에서 컴포넌트의 function Component의 React.memo()는 props가 바뀌지 않았다면, 리렌더링하지 않도록 설정하여 함수형 컴포넌트의 리렌더링 성능을 최적화해 줄 수 있습니다.

React.memo의 사용법은 매우 간단합니다. 컴포넌트를 만들고 나서 감싸 주기만 하면 됩니다. 이제 TodoListItem 컴포넌트는 todo, onRemove, onToggle이 바뀌지 않으면 리렌더링을 하지 않습니다.

React.memo는 오직 props가 변경됐는지 아닌지만 체크합니다. 만약 React.memo에 감싸진 함수형 컴포넌트가 함수 내부에서 useState나 useContext같은 훅을 사용하고 있다면, state나 context가 변경될 때마다 리렌더링됩니다.

> https://sustainable-dev.tistory.com/137

```jsx
import React from ‘react‘;

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  (…)
};

export default React.memo(TodoListItem);
```

## 함수 재 생성 방지: 함수가 계속 만들어지는 상황을 방지하는 방법은 두 가지

### useState의 함수형 업데이트

기존 useState Setter 함수에 새로운 상태를 넘겨주었던 것과 다르게 업데이트 함수를 넣어주면 함수를 한번만 생성하게 됩니다. 이를 함수형 업데이트라고 부릅니다.

```jsx
const [number, setNumber] = useState(0);
// prevNumbers는 현재 number 값을 가리킵니다.
const onIncrease = useCallback(
  () => setNumber((prevNumber) => prevNumber + 1),
  []
);
// 기존 useCallback에 number를 넣어주어야 하지만 함수형 업데이트로 구현할 경우 넣어주지 않아도 된다.
```

### useReducer

1. reducer 함수 생성하기
   - 파라미터1: 현재 상태
   - 파라미터2: action
2. useReducer 함수 호출하기
   - 파라미터1 : 위에서 생성한 reducer 함수
   - 파라미터2 : 초기 상태
   - 파라미터3 : 초기 상태를 구현한 함수(이 값을 넣을때 파라미터 2는 undefined으로 넣어주어야 함)
   - 반환값 배열[0] : state
   - 반환값 배열[1] : dispatch
3. dispatch 함수로 실행
   - 객체1, type : action Type
   - 객체2, 파라미터 값

```jsx
import React, { useReducer, useRef, useCallback } from ‘react‘;
import TodoTemplate from ‘./components/TodoTemplate‘;
import TodoInsert from ‘./components/TodoInsert‘;
import TodoList from ‘./components/TodoList‘;

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: </span><span class="co31">할</span> <span class="co31">일</span> <span class="co49">${</span><span class="co33">i</span><span class="co49">}</span><span class="co31">,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case ‘INSERT‘: // 새로 추가
      // { type: ‘INSERT‘, todo: { id: 1, text: ‘todo‘, checked: false } }
      return todos.concat(action.todo);
    case ‘REMOVE‘: // 제거
      // { type: ‘REMOVE‘, id: 1 }
      return todos.filter(todo => todo.id != = action.id);
    case ‘TOGGLE‘: // 토글
      // { type: ‘REMOVE‘, id: 1 }
      return todos.map(todo =>
        todo.id === action.id ? { …todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: ‘INSERT‘, todo });
    nextId.current += 1; // nextId 1씩 더하기
  }, []);

  const onRemove = useCallback(id => {
    dispatch({ type: ‘REMOVE‘, id });
  }, []);

  const onToggle = useCallback(id => {
    dispatch({ type: ‘TOGGLE‘, id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
```

## 불변성의 중요성

## TodoList 컴포넌트 최적화하기

## react-virtualized를 사용한 렌더링 최적화
