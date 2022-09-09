## Redux

npx create-react-app redux-start
cd redux-start
npm i redux

## Reduc Action

Action은 그냥 객체이다.
두가지 형태의 액션이 있다.

1. payload 없는 액션(필수 프로퍼티인 type만 있는, type은 문자열)
2. payload 있는 액션(여러가지 프로퍼티)

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
