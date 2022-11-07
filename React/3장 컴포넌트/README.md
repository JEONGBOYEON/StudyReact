# Component
리액트를 사용하여 애플리케이션의 인터페이스를 설계할 때 사용자가 볼 수 있는 요소는 여러 가지 컴포넌트로 구성되어 있습니다. 컴포넌트의 기능은 단순한 템플릿 이상입니다. 데이터가 주어졌을 때 이에 맞추어 UI를 만들어 주는 것은 물론이고, 라이프사이클 API를 이용하여 컴포넌트가 화면에서 나타날 때, 사라질 때, 변화가 일어날 때 주어진 작업들을 처리할 수 있으며, 임의 메서드를 만들어 특별한 기능을 붙여 줄 수 있습니다.

컴포넌트를 선언할 수 있는 방법에는 클래스형 컴포넌트와 함수형 컴포넌트가 이렇게 두가지가 존재합니다. 클래스형 컴포넌트와 함수형 컴포넌트의 차이점은 클래스형 컴포넌트는 state 기능 및 라이프사이클 기능을 사용할 수 있다는 것과 임의 메서드를 정의할 수 있다는 것입니다.

## 함수형 컴포넌트

함수형 컴포넌트는 클래스형 컴포넌트와 비교해보았을때 다음과 같은 장점이 있습니다.
1. 클래스형 컴포넌트보다 선언하기가 훨씬 편합니다. 
2. 메모리 자원도 클래스형 컴포넌트보다 덜 사용한다.
3. 프로젝트를 완성하여 빌드한 후 배포할 때도 함수형 컴포넌트를 사용하는 것이 결과물의 파일 크기가 더 작다

그렇지만 함수형 컴포넌트에는 치명적인 단점이 2가지 존재했습니다.
1. state를 사용할 수 없다.
2. 라이프 사이클을 사용 할 수 없다

이러한 단점은 v16.8 업데이트 이후 Hooks라는 기능이 도입되면서 해결되었습니다. 완전히 똑같은 기능을 가지진 않지만 보안하여 사용할 수 있습니다.

따라서 리액트 공식 매뉴얼에서는 컴포넌트를 새로 작성할 때 함수형 컴포넌트와 Hooks를 사용하도록 권장하고 있습니다. 하지만 그렇다고 해서 클래스형 컴포넌트가 사라지는 것은 아니므로 클래스형 컴포넌트의 기능은 꼭 알아 두어야 합니다.

# Props

Props는 컴포넌트 외부에서 컴포넌트에게 주는 데이터이며

State는 컴포넌트 내부에서 변경 할 수 있는 데이터입니다.(즉, 컴포넌트 상태에 따라 값이 변경 될 수 있습니다.)

\*둘다 변경이 발생하면, 랜더가 다시 일어날 수 있습니다.(랜더 함수 호출)

<img width="811" src="https://user-images.githubusercontent.com/32887635/197555870-c93aeb4d-95bd-4f0a-be77-7ae7d69ecd33.png">

### function Component의 Props

: Component(props), return, props.message

```javascript
// function은 매개변수 형태로 props를 받음
function Component(props) {
  return (
    <div>
      <h1>{props.message} 이것은 함수로 만든 컴포넌트 입니다.</h1>
    </div>
  );
}

ReactDOM.render(<Component message="Hi" />, document.querySelector("#root"));
```

### Class Component의 Props

: extends React.Component, render(), this.props.message

```javascript
//class는 매개변수 형태 아님, this 사용
//class는 extend, render()이라는 구문이 추가됨
class Component extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.message} 이것은 클래스로 만든 컴포넌트 입니다.</h1>
      </div>
    );
  }

ReactDOM.render(<Component message="Hi" />, document.querySelector("#root"));
}
```

> https://github.com/JEONGBOYEON/study-react/blob/main/projects/props.html
