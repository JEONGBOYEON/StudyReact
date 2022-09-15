# Shallow compare와 React.PureComponent

## 01.Shallow compare와 deep equaility checking 비교

1. shallow equality checking : 단순히 같은 객체의 두가지의 다른 변수 참조들이 있는지 비교하는 것

- 숫자나 문자열 같은 scalar 값 : 그들의 값을 비교
- obejct : 그들의 attribute들을 비교하지 않고, 그들의 reference를 비교합니다. (따라서 값은 값을 넣어도 다른값으로 체크)

2. deep equaility checking : 두 객체의 properties의 모든 value들을 확인

deep equaility checking시 반복되는 순회 확인을 해야해서, 연산작업이 많이 들어가게 됩니다. 따라서 redux는 좋은 성능을 유지하기 위해 shallow equaility를 통한 겉핥기식 데이터 비교를 진행합니다.

## 02.Shallow compare와 React

React는 State가 바뀔때마다 랜더링을 하게 됩니다. 따라서 Object의 값이 같더라도 Shallow compare를 진행하게 되어 다른 값으로 체크를 하게 되면 불필요한 리랜더링을 진행하게 되어 성능이 떨어질 수 있습니다.

## 03. shouldComponentUpdate()

이 매소드는 오직 성능 최적화만을 위한 것입니다. 현재 state 또는 props의 변화가 컴포넌트의 출력 결과에 영향을 미치는지 여부를 확인한 후 불 필요한 랜더링을 줄여줍니다.

```javascript
shouldComponentUpdate(nextProps, nextState);
```

- shouldComponentUpdate()는 props 또는 state가 새로운 값으로 갱신되어서 렌더링이 발생하기 직전에 호출됩니다.
- 이 메서드는 초기 렌더링 또는 forceUpdate()가 사용될 때에는 호출되지 않습니다.
- 대부분의 경우 State의 변화마다 리랜더링을 수행하는 기본 동작을 따라야 합니다.
- shouldComponentUpdate()의 내용을 직접 작성하는 대신에 PureComponent를 사용하는 것이 좋습니다.

## 04. PureComponent

pureComponent는 shouldComponentUpdate가 이미 적용된 버전의 React.Component입니다. pureComponent는 renderer에서 shouldComponentUpdate 를 수행할때 shallow compare를 수행합니다. 따라서 불필요한 state 변화감지 그리고 이로인한, 재렌더링을 줄임으로써 성능을 극대화 할수 있습니다.

> React.PureComponent의 shouldComponentUpdate()는 컴포넌트에 대하여 얕은 비교만을 수행합니다. 따라서 컴포넌트에 복잡한 자료 구조가 포함되어있다면, 깊은 차이가 존재함에도 불구하고 차이가 없다고 판단하는 잘못된 결과를 만들어낼 수 있습니다. props와 state의 구조가 간단할 것으로 예상될 때에만 PureComponent를 상속하고, 깊은 자료 구조의 변화가 있다면 forceUpdate()를 사용하세요.
