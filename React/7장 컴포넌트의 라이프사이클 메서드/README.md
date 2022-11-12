# 컴포넌트의 라이프사이클 메서드

모든 리액트 컴포넌트에는 라이프사이클(수명 주기)이 존재합니다. 컴포넌트의 수명은 페이지에 렌더링되기 전인 준비 과정에서 시작하여 페이지에서 사라질 때 끝납니다. 각각 수명 주기 사이사이 작업이 필요할때가 있는데 이때 컴포넌트의 라이프사이클 메서드를 사용합니다.

라이플사이클 매서드는 class형 컴포넌트에서만 사용가능합니다. 그 대신에 함수형 컴포넌트는 Hooks 기능을 사용하여 비슷한 작업을 처리할 수 있습니다.

## 라이프 사이클 매서드 특징

- 라이프사이클 메서드의 종류는 총 아홉 가지

- Will 접두사가 붙은 메서드는 어떤 작업을 작동하기 전에 실행되는 메서드
- Did 접두사가 붙은 메서드는 어떤 작업을 작동한 후에 실행되는 메서드

- 라이프사이클은 총 세 가지, 즉 마운트, 업데이트, 언마운트 카테고리로 나눈다.

<img src="https://user-images.githubusercontent.com/32887635/201484759-a574c0ed-e217-45d5-b9c9-3441371ca907.png" width="300" height="300">

## 라이플 사이클 카테고리

### 마운트

DOM이 생성되고 웹 브라우저상에 나타나는 것을 마운트(mount)라고 합니다. 이때 호출하는 메서드는 다음과 같습니다. 아래의 순서대로 호출됩니다.

1. constructor: 컴포넌트를 새로 만들 때마다 호출되는 클래스 생성자 메서드입니다.
2. getDerivedStateFromProps: props에 있는 값을 state에 넣을 때 사용하는 메서드입니다.
3. render: 우리가 준비한 UI를 렌더링하는 메서드입니다.
4. componentDidMount: 컴포넌트가 웹 브라우저상에 나타난 후 호출하는 메서드입니다.

### 업데이트

컴포넌트는 다음과 같은 총 네 가지 경우에 업데이트합니다.

- props가 바뀔때
- state가 바뀔때
- 부모 컴포넌트가 리렌더링 될때
- this.forceUpdate로 강제로 랜더링을 트리거 할때

이때 호출하는 메서드는 다음과 같습니다. 아래의 순서대로 호출됩니다.

1. getDerivedStateFromProps: 이 메서드는 마운트 과정에서도 호출되며, 업데이트가 시작하기 전에도 호출됩니다. **props의 변화에 따라 state 값에도 변화**를 주고 싶을 때 사용합니다.
2. shouldComponentUpdate: **컴포넌트가 리렌더링을 해야 할지 말아야 할지를 결정**하는 메서드입니다. 이 메서드에서는 true 혹은 false 값을 반환해야 하며, true를 반환하면 다음 라이프사이클 메서드를 계속 실행하고, false를 반환하면 작업을 중지합니다. 즉, 컴포넌트가 리렌더링되지 않습니다. 만약 특정 함수에서 this.forceUpdate() 함수를 호출한다면 이 과정을 생략하고 바로 render 함수를 호출합니다.
3. render: 컴포넌트를 리렌더링합니다.
4. getSnapshotBeforeUpdate: 컴포넌트 변화를 **DOM에 반영하기 바로 직전**에 호출하는 메서드입니다.
5. componentDidUpdate: 컴포넌트의 업데이트 작업이 끝난 후 호출하는 메서드입니다.

### 언마운트

마운트의 반대 과정, 즉 컴포넌트를 DOM에서 제거하는 것을 언마운트(unmount)라고 합니다. 호출하는 메서드는 다음과 같습니다.

1. componentWillUnmount: 컴포넌트가 웹 브라우저상에서 사라지기 전에 호출하는 메서드입니다.

## 라이프사이클 메서드 살펴보기(9가지)

### 1. render()

이 메서드는 컴포넌트 모양새를 정의합니다. 라이프사이클 메서드 중 유일한 필수 메서드이기도 합니다.

- this.props와 this.state에 접근할 수 있다.
- 리액트 요소를 반환한다.
- setState를 사용하면 안 되며, 브라우저의 DOM에 접근해서도 안 된다.

### 2. constructor()

이것은 컴포넌트의 생성자 메서드로 컴포넌트를 만들 때 처음으로 실행됩니다. 이 메서드에서는 초기 state를 정할 수 있습니다.

### 3. getDerivedStateFromProps()

이것은 리액트 v16.3 이후에 새로 만든 라이프사이클 메서드입니다. **props로 받아 온 값을 state에 동기화**시키는 용도로 사용하며, 컴포넌트가 마운트될 때와 업데이트될 때 호출됩니다.

```jsx
static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.value != = prevState.value) { // 조건에 따라 특정 값 동기화
      return { value: nextProps.value };
    }
    return null; // state를 변경할 필요가 없다면 null을 반환
}
```

### 4. componentDidMount

이것은 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행합니다.

- 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출
- 이벤트 등록
- setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리
- DOM 정보를 가져오기
- state에 변화주기

---

### 5. shouldComponentUpdate(nextProps, nextState) { ... }

이것은 props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드입니다. 이 메서드에서는 반드시 true 값 또는 false 값을 반환해야 합니다. 기본적으로 언제나 true 값을 반환합니다. 이 메서드가 false 값을 반환한다면 업데이트 과정은 여기서 중지됩니다.

이 메서드 안에서 현재 props와 state는 this.props와 this.state로 접근하고, 새로 설정될 props 또는 state는 nextProps와 nextState로 접근할 수 있습니다.

프로젝트 성능을 최적화할 때, 상황에 맞는 알고리즘을 작성하여 리렌더링을 방지할 때는 false 값을 반환하게 합니다.

### 6. getSnapshotBeforeUpdate

이것은 리액트 v16.3 이후 만든 메서드입니다. 이 메서드는 render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출됩니다. 이 메서드에서 반환하는 값은 componentDidUpdate에서 세 번째 파라미터인 snapshot 값으로 전달받을 수 있는데요. 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용됩니다(예: 스크롤바 위치 유지).

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
    if(prevState.array != = this.state.array) {
        const { scrollTop, scrollHeight } = this.list
        return { scrollTop, scrollHeight };
    }
}
```

### 7. componentDidUpdate(prevProps, prevState, snapshot) { ... }

이것은 리렌더링을 완료한 후 실행합니다. DOM 관련 처리가 가능합니다.

---

### 8. componentWillUnmount

이것은 컴포넌트를 DOM에서 제거할 때 실행합니다. componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야 합니다.

### 9. componentDidCatch

componentDidCatch 메서드는 리액트 v16에서 새롭게 도입되었으며, 컴포넌트 렌더링 도중에 에러가 발생했을 때 애플리케이션이 먹통이 되지 않고 오류 UI를 보여 줄 수 있게 해 줍니다. 사용 방법은 다음과 같습니다.

```jsx
componentDidCatch(error, info) {
  this.setState({
      error: true
  });
  console.log({ error, info });
}
```

여기서 error는 파라미터에 어떤 에러가 발생했는지 알려 주며, info 파라미터는 어디에 있는 코드에서 오류가 발생했는지에 대한 정보를 줍니다. 앞의 코드에서는 그저 console.log만 했지만, 나중에 실제로 사용할 때 오류가 발생하면 서버 API를 호출하여 따로 수집할 수도 있습니다.

그러나 이 메서드를 사용할 때는 컴포넌트 자신에게 발생하는 에러를 잡아낼 수 없고 자신의 this.props.children으로 전달되는 컴포넌트에서 발생하는 에러만 잡아낼 수 있다는 점을 알아 두어야 합니다. 이 메서드를 사용하는 방법은 7.3.3절 ‘에러 잡아내기’에서 알아보겠습니다.
