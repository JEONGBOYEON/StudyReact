# 이벤트 핸들링

사용자가 웹 브라우저에서 DOM 요소들과 상호 작용하는 것을 이벤트(event)라고 합니다. HTML에서 DOM 요소에 이벤트를 설정하는 방법은 다음과 같습니다.

```html
<button onclick="“alert(‘executed‘)“">Click Me</button>
```

HTML에서는 이처럼 이벤트를 실행하면 " " 사이에 있는 자바스크립트를 실행하도록 코드를 작성합니다. 리액트에서 이벤트를 다룰 때는 이와 비슷하면서도 좀 다릅니다.

## 리액트의 이벤트 시스템

리액트의 이벤트 시스템은 웹 브라우저의 HTML 이벤트와 인터페이스가 동일하기 때문에 사용법이 꽤 비슷합니다. 그렇지만 주의해야 할 사항이 몇가지 있습니다.

### 리액트 이벤트 사용 주의 사항

1. 이벤트 이름은 카멜 표기법으로 작성합니다.
2. DOM 요소에만 이벤트를 설정할 수 있습니다.
3. 이벤트에 실행할 자바스크립트 코드를 전달하는 것이 아니라, 함수 형태의 값을 전달합니다
   : HTML에서 이벤트를 설정할 때는 큰따옴표 안에 실행할 코드를 넣었지만, 리액트에서는 함수 형태의 객체를 전달합니다. 

### 리액트에서 지원하는 이벤트 종류

Clipboard, Composition, Keyboard, Focus, Form, Mouse, Selection, Touch, UI, Wheel, Media, Image, Animation, Transition

> https://facebook.github.io/react/docs/events.html

## 리액트 이벤트 핸들링 예제

### 화살표 함수

아래의 예제는 input값에 change이벤트를 걸어 값이 바뀔때마다 message state값을 변경해주고, button에 onClick 이벤트를 걸어 클릭하면 변경된 값이 alert창에 띄운후 초기화 되도록 구현해주었습니다.

```jsx
import React, { Component } from ‘react‘;

class EventPractice extends Component {
    state = {
        message: “
    }
    render() {
        return (
          <div>
            <h1>이벤트 연습</h1>
            <input
              type=“text“
              name=“message“
              placeholder=“아무거나 입력해 보세요“
              value={this.state.message}
              onChange={
                (e) => {
                  this.setState({
                    message: e.target.value
                  })
                }
              }
            />

            <button onClick={
                () => {
                    alert(this.state.message);
                    this.setState({
                        message: “
                    });
                }
            }>확인</button>
          </div>
        );
    }
}

export default EventPractice;
```

위의 예제에서 e 객체는 SyntheticEvent로 웹 브라우저의 네이티브 이벤트를 감싸는 객체입니다. 네이티브 이벤트와 인터페이스가 같으므로 순수 자바스크립트에서 HTML 이벤트를 다룰 때와 똑같이 사용하면 됩니다.

### 임의 메서드 만들기1 - constructor

위처럼 랜더링을 하는 동시에 함수를 만들어서 전달해 줄수도 있지만, 함수를 미리 준비하여 전달하는 방법도 있습니다. 성능상으로는 차이가 거의 없지만, 가독성은 훨씬 높습니다.

임의로 메서드를 만드는 방법은 2가지가 있습니다. 첫번째로 기본적인 방법인 constructor 바인딩 작성법을 알아보도록 하겠습니다.

함수가 호출될 때 this는 호출부에 따라 결정되므로, 클래스의 임의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서 메서드와 this의 관계가 끊어져 버립니다. 이 때문에 임의 메서드가 이벤트로 등록되어도 this를 컴포넌트 자신으로 제대로 가리키기 위해서는 메서드를 this와 바인딩(binding)하는 작업이 필요합니다. 만약 바인딩하지 않는 경우라면 this가 undefined를 가리키게 됩니다. 따라서 constructor 함수에서 함수를 바인딩하는 작업이 이루어져야 합니다.

```jsx
import React, { Component } from ‘react‘;

class EventPractice extends Component {

state = {
    message: “
  }

constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

handleClick() {
    alert(this.state.message);
    this.setState({
      message: “
    });
  }

render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type=“text“
          name=“message“
          placeholder=“아무거나 입력해 보세요“
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;
```

### 임의 메서드 만들기2 - Property Initializer Syntax

위의 방법대로 작성할 경우 새 메서드를 만들 때만다 constructor도 수정해야 하기 때문에 불편할 수 있습니다. 따라서 이 작업을 좀 더 간단하게 할 수 있는 방법이 있습니다. 바로 바벨의 transform-class-properties 문법을 사용하여 **화살표 함수 형태**로 메서드를 정의하는 것입니다.

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
  state = {
    message: "",
  };

  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  handleClick = () => {
    alert(this.state.message);
    this.setState({
      message: "",
    });
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해 보세요"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;
```
