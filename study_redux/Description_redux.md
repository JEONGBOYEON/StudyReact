# 1. Redux 핵심 키워드

```
npx create-react-app redux-start
cd redux-start
npm i redux
```

## 액션(Action)

상태에 어떤 변화가 필요할게 되면, 액션을 발생시킵니다. 액션은 **객체**로 표현되며, 종류는 두가지가 있습니다.

1. Type만 있는 액션(Type 필수)

```javascript
{
  type: "ADD_VALUE";
}
```

2. Payload가 있는 액션(Type 필수)

```javascript
{
  type: "ADD_VALUE",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
```

```javascript
{
  type: "ADD_VALUE",
  text: "리덕스 배우기"
}
```

## 액션 생성 함수(Action Creator)

액션 생성 함수는 컴포넌트에서 액션을 더욱 쉽게 발생시키기 위한 함수로, 액션을 만드는 함수입니다.

```javascript
export function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

// 화살표 함수로
export const changeInput = (text) => ({
  type: "CHANGE_INPUT",
  text,
});
```

---

## Redux Store

dispatch > action을 주는 행위
getState > 현재 state를 가져오는 함수
relaceReducer
subscribe > 변경이 생겼을때 실행시키는 함수

## combineReducers

애플리케이션이 커지면, state 가 복잡해진다.
리듀서를 분할해서 만들고, 합치는 방법을 사용할 수 있습니다.

todos 만 변경하는 액션들을 처리하는 A 라는 리듀서 함수를 만들고,
filter 만을 변경하는 액션들을 처리하는 B 라는 리듀서 함수를 만들고,
A 와 B 를 합침.
