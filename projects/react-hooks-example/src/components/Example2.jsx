import React from "react";

export default function Example2() {
  //만약 클릭을 해서 setCount가 호출이 되면 function이 다시 실행된다.
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={click}>Click me</button>
    </div>
  );

  function click() {
    setCount(count + 1);
  }
}

//react의 useState라는 Hook 사용
//첫번쨰 인자 = 값, 두번쨰 인자 함수
