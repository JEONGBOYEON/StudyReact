# ref: Dom에 이름 달기

일반 HTML에서 DOM 요소에 이름을 달 때는 id를 사용합니다. 이렇게 요소에 id를 달면 CSS에서 특정 id에 특정 스타일을 적용하거나 자바스크립트에서 해당 id를 가진 요소를 찾아서 작업할 수 있습니다. 이렇게 HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법이 있습니다. 바로 ref(reference의 줄임말) 개념입니다.

> 리액트 컴포넌트 안에서도 id를 사용할 수는 있습니다. 하지만 HTML에서 DOM의 id는 유일(unique)해야 하는데, 같은 컴포넌트를 여러 번 사용한다고 했을 경우 중복 id를 가진 DOM이 여러 개 생기게 됩니다. 따라서 권장하지는 않지만, 다른 라이브러리나 프레임워크로 인하여 사용해야 할 수 도 있습니다. 이때는 id 뒷부분에 텍스트를 붙여 id가 중복되지 않도록 해야 합니다.

## ref 사용 목적

리액트에서 굳이 DOM에 접근하지 않아도 state로 구현할 수 있지만, 가끔 state만으로 해결할 수 없는 아래와 같은 기능이 있습니다. 이때는 어쩔 수 없이 DOM에 직접적으로 접근해야 하는데, 이때 ref를 사용합니다.

1. 특정 input에 포커스 주기
2. 스크롤 박스 조작하기
3. Canvas 요소에 그림 그리기 등

## ref 사용 방법

ref를 사용하는 방법에는 두가지가 존재합니다.

### 콜백 함수를 통한 ref 설정

ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달해 주고 함수 내부에서 파라미터로 받은 ref를 컴포넌트의 멤버 변수로 설정해 줍니다.

```jsx
<input
  ref={(ref) => {
    this.input = ref;
  }}
/>
```

위왁 같이 작성할 경우 this.input은 **input 요소의 DOM을 가르킵니다.** 여기서 this.input의 이름은 자율적으로 지정할 수 있습니다.

### createRef를 통한 ref 설정

ref를 만드는 또 다른 방법은 리액트에 내장되어 있는 createRef라는 함수를 사용하는 것입니다. 이 함수를 사용해서 만들면 더 적은 코드로 쉽게 사용할 수 있습니다. 이 기능은 리액트 v16.3부터 도입되었으며 이전 버전에서는 작동하지 않습니다.

우선 컴포넌트 내부에서 멤버 변수로 React.createRef()를 담아 주어야 합니다. 그리고 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 넣어 주면 ref 설정이 완료됩니다.

ref를 설정해 준 DOM에 접근하려면 this.input.current를 조회하면 됩니다. 콜백 함수를 사용할 때와 다른 점은 이렇게 뒷부분에 .current를 넣어 주어야 한다는 것입니다.

```jsx
import React, { Component } from ‘react‘;

class RefSample extends Component {
  input = React.createRef();

handleFocus = () => {
    this.input.current.focus();
  }

render() {
    return (
      <div>
        <input ref={this.input} />
      </div>
    );
  }
}

export default RefSample;
```

## 컴포넌트에 ref 달기

리액트에서는 컴포넌트에도 ref를 달 수 있습니다. **이 방법은 주로 컴포넌트 내부에 있는 DOM을 컴포넌트 외부에서 사용할 때 씁니다.** 컴포넌트에 ref를 다는 방법은 DOM에 ref를 다는 방법과 똑같습니다.

```jsx
import React, { Component } from 'react';

class ScrollBox extends Component {

  scrollToBottom = () => {
    const { scrollHeight, clientHeight } = this.box;
    /* 앞 코드에는 비구조화 할당 문법을 사용했습니다.
       다음 코드와 같은 의미입니다.
       const scrollHeight = this.box.scrollHeight;
       const clientHeight = this.box.cliengHeight;
    */
    this.box.scrollTop = scrollHeight - clientHeight;
  }

  render() {
    (...)
}

export default ScrollBox;
```

```jsx
import React, { Component } from ‘react‘;
import ScrollBox from ‘./ScrollBox‘;

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={(ref) => this.scrollBox=ref}/>
        <button onClick={() => this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>
    );
  }
}

export default App;
```
