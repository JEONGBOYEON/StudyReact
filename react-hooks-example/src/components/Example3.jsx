import React from "react";

//ASIS useState => count > 값
//TODO useSatte => {count:0}; > 객체(실제 State 처럼 사용)
export default function Example3() {
  //만약 클릭을 해서 setCount가 호출이 되면 function이 다시 실행된다.
  const [state, setState] = React.useState({ count: 0 });

  return (
    <div>
      <p>You clicked {state.count} times</p>
      <button onClick={click}>Click me</button>
    </div>
  );

  // function click() {
  //   setState({ count: state.count + 1 });
  // }

  function click() {
    setState((state) => {
      return {
        count: state.count + 1,
      };
    });
  }
}

//react의 useState라는 Hook 사용
//첫번쨰 인자 = 값, 두번쨰 인자 함수
