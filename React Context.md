
# 컨텍스트(Context) 객체 
컨텍스트(Context) 객체는 React 애플리케이션에서 데이터를 **전역적으로 공유하기 위한 메커니즘**을 제공하는 객체입니다. 이 객체를 사용하면 중간 컴포넌트를 거치지 않고 컴포넌트 간에 데이터를 전달할 수 있습니다. 컨텍스트 객체는 **React.createContext** 함수를 사용하여 생성됩니다. 생성된 컨텍스트 객체에는 **Provider와 Consumer**라는 두 가지 주요 속성이 있습니다.


### React.createContext 함수
React.createContext 함수는 컨텍스트 객체를 생성합니다. 이 함수는 초기값을 인자로 받을 수 있습니다. 초기값은 컨텍스트를 사용하는 컴포넌트에서 해당 컨텍스트의 공급자가 값을 제공하지 않을 때 사용됩니다. React.createContext 함수를 호출하면 두 가지 속성(context.Provider, context.consumer)을 가지는 컨텍스트 객체가 반환됩니다.
```javascript
const MyContext = React.createContext(initialValue);
```

#### 1. Provider
컨텍스트 값을 제공하는 컴포넌트입니다. Provider 컴포넌트를 사용하여 컨텍스트 값을 설정하고, 하위 컴포넌트에서 해당 값을 사용할 수 있습니다.

```javascript
<MyContext.Provider value={value}>
  {/* 하위 컴포넌트 */}
</MyContext.Provider>
```

#### 2. Consumer
컨텍스트 값을 소비하는 컴포넌트입니다. Consumer 컴포넌트를 사용하여 컨텍스트 값을 읽어올 수 있습니다. React의 클래스 컴포넌트에서는 MyContext.Consumer로 사용하며, 함수형 컴포넌트에서는 MyContext를 직접 사용할 수 있습니다.
```javascript
<MyContext.Consumer>
  {value => (
    // value를 사용하여 컨텍스트 값에 접근
  )}
</MyContext.Consumer>
```

---

# Context 예시 코드

#### 📌 class component
```javascript
// 컨텍스트 객체 생성
const MyContext = React.createContext();

// 데이터를 공유할 상위 컴포넌트
class ParentComponent extends React.Component {
  state = {
    value: 'Hello, World!'
  };

  render() {
    return (
      <MyContext.Provider value={this.state.value}>
        <ChildComponent />
      </MyContext.Provider>
    );
  }
}

// 데이터를 사용할 하위 컴포넌트
class ChildComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Child Component</h1>
        <MyContext.Consumer>
          {value => <p>{value}</p>}
        </MyContext.Consumer>
      </div>
    );
  }
}

// 애플리케이션
class App extends React.Component {
  render() {
    return <ParentComponent />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

```

#### 📌 function component
```javascript
// 컨텍스트 객체 생성
const MyContext = React.createContext();

// 데이터를 공유할 상위 컴포넌트
function ParentComponent() {
  const value = 'Hello, World!';

  return (
    <MyContext.Provider value={value}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

// 데이터를 사용할 하위 컴포넌트
function ChildComponent() {
  return (
    <div>
      <h1>Child Component</h1>
      <MyContext.Consumer>
        {value => <p>{value}</p>}
      </MyContext.Consumer>
    </div>
  );
}

// 애플리케이션
function App() {
  return <ParentComponent />;
}

ReactDOM.render(<App />, document.getElementById('root'));

```

#### 📌 React.useContext
React.useContext는 React Hooks의 하나로, 함수형 컴포넌트에서 컨텍스트(Context) 값을 간편하게 조회하기 위해 사용되는 Hook입니다. React.useContext를 사용하면 컨텍스트 객체의 값을 직접 읽어올 수 있으며, 클래스 컴포넌트의 static contextType 또는 Consumer를 사용하는 것보다 간단하고 간결한 코드를 작성할 수 있습니다.

```javascript
function ChildComponent() {
  const value = React.useContext(MyContext);

  return (
    <div>
      <h1>Child Component</h1>
      <p>{value}</p>
    </div>
  );
}

```

---

# Context의 유의할점


1. 컨텍스트 값을 변경하는 경우, **모든 해당 컨텍스트를 구독하는 컴포넌트들이 다시 렌더링**됩니다. 이는 **성능에 영향**을 줄 수 있으므로, 불필요한 렌더링을 방지하기 위해 최적화 기법을 사용하는 것이 중요합니다. 예를 들어 React.memo를 사용하여 컴포넌트를 메모이제이션하거나, 컨텍스트 값이 변경되지 않는 한 값을 캐시하는 등의 최적화를 고려해야 합니다.
2. 컨텍스트는 전역 상태를 공유하기 위해 사용되는 메커니즘이므로, 남용하지 않도록 주의해야 합니다. 컨텍스트를 사용하면 컴포넌트 간에 직접적으로 데이터를 전달할 필요 없이 전역적으로 접근할 수 있어 편리하지만, 이로 인해 컴포넌트 간의 의존성이 높아질 수 있습니다. 따라서 컨텍스트를 사용할 때는 적절한 범위와 사용 목적을 고려하여야 합니다.
3. 컴포넌트 간의 관계가 명시적이지 않아 가독성이 낮아질 수 있습니다.
4. 컨텍스트를 많이 사용하면 컴포넌트 간의 의존성이 복잡해지고 관리하기 어려워질 수 있습니다. 따라서 컨텍스트를 사용할 때에는 신중하게 사용하고, 필요한 경우에만 사용해야 합니다.


---


# Context의 렌더링

Context에 의한 렌더링은 다음과 같은 과정을 거칩니다.
1. Provider를 렌더링했을 때 Context Provider에 새로운 값이 전달되었는지 여부를 체크
2. 만약 Provider의 값이 새로운 참조값이라면 Context를 소비하는 컴포넌트를 업데이트

아래의 소스를 예시로 들었을때, ParentComponent가 렌더링 될 때마다, React는 MyContext.Provider가 새로운 값을 받았다는 것을 알아차릴 것이고, **서브 트리를 하나씩 돌면서** MyContext를 소비하는 컴포넌트를 찾을 것입니다. Context Provider가 새로운 값을 가질 때면, Context를 사용하는 **모든 중첩된 컴포넌트는 리렌더링**이 될 것입니다.

```jsx
function GrandchildComponent() {
    const value = useContext(MyContext);
    return <div>{value.a}</div>
}

function ChildComponent() {
    return <GrandchildComponent />
}

function ParentComponent() {
    const [a, setA] = useState(0);
    const [b, setB] = useState("text");

    const contextValue = {a, b};

    return (
      <MyContext.Provider value={contextValue}>
        <ChildComponent />
      </MyContext.Provider>
    )
}
```

### 여기서 주의해야 할점은! 위에서 GrandchildComponent 컴포넌트는 Context와 상관없이 항상 리랜더링 됩니다. 그 이유는 Parent의 중첩 컴포넌트 이기 때문입니다.

React는 기본적으로 부모 컴포넌트가 렌더링되면, 그 안에 있는 **모든 자식 컴포넌트를 재귀적으로 렌더링**됩니다. React는 "**Props가 변경되었는지 여부"와는 상관없이** 그저 부모 컴포넌트가 렌더링 된다면 무조건 모든 자식 컴포넌트들을 렌더링합니다. 따라서 위의 코드에서 ParentComponent가 랜더링 되면 그의 자식인 ChildComponent가 랜더링 되고 또 그의 자식인 GrandchildComponent가 랜더링 됩니다. 그렇지만 우리가 원하는 것은 Context를 가지지 않는 **ChildComponent는 리랜더링 되지 않게 하는 것입니다!** 이를 위해서 우리는 useMemo를 사용해야 합니다.

---


# useMemo를 통해 랜더 최적화 하기

```jsx
function GreatGrandchildComponent() {
  return <div>Hi</div>
}

function GrandchildComponent() {
    const value = useContext(MyContext);
    return (
      <div>
        {value.a}
        <GreatGrandchildComponent />
      </div>
}

function ChildComponent() {
    return <GrandchildComponent />
}

const MemoizedChildComponent = React.memo(ChildComponent);

function ParentComponent() {
    const [a, setA] = useState(0);
    const [b, setB] = useState("text");

    const contextValue = {a, b};

    return (
      <MyContext.Provider value={contextValue}>
        <MemoizedChildComponent />
      </MyContext.Provider>
    )
}
```

이렇게 소스를 수정하게 되면 아래와 같은 순서로 React가 작업을 하게 됩니다.🧐

1. ParentComponent가 렌더링 될 것입니다.
2. React는 MemoizedChildComponent를 렌더링하려고 시도할 것이지만, `React.memo()`로 감싸져있는 것을 발견합니다. Props를 전달받고있지 않기 때문에 **실제로 변경되는 Props는 없습니다.** 따라서 React는 ChildComponent 전체 렌더링을 **건너 뛸 것입니다.**
3. 하지만, MyContext.Provider에 업데이트가 있었습니다. 따라서 이 업데이트를 알아차려야 할 컴포넌트가 밑에 있을 수 있습니다.
4. React는 밑으로 더 내려가서 GrandchildComponent에 도달합니다. 그리고 GrandchildComponent가 MyContext를 읽고 있는 것을 발견합니다. 따라서 `새로운 Context 값`이 있기 때문에 리렌더링이 필요하다는 것도 알아챕니다. React는 더 진행해서 GrandchildComponent를 리렌더링 합니다. **Context의 변경으로 인한 리렌더링**이죠.
5. GrandchildComponent가 렌더링되었기 때문에, React는 **그 안에 들어있는 모든 것을 렌더링**할 것입니다. 따라서 React는 GreatGrandchildComponent도 리렌더링 할 것입니다.

### 결론적으로 여러분의 Context Provider 바로 밑에 있는 React 컴포넌트는 React.memo를 사용해야 합니다❗❗❗

[랜더링의 모든것을 정리해준 velog](https://velog.io/@arthur/%EB%B2%88%EC%97%AD-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%8F%99%EC%9E%91%EC%9D%98-%EA%B1%B0%EC%9D%98-%EC%99%84%EB%B2%BD%ED%95%9C-%EA%B0%80%EC%9D%B4%EB%93%9C-A-Mostly-Complete-Guide-to-React-Rendering-Behavior#context-%EA%B8%B0%EB%B3%B8)
[리액트 공식 문서 - context](https://ko.legacy.reactjs.org/docs/context.html#reactcreatecontext)



















