import { useState, useEffect } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  //   useEffect(() => {
  //     const onResize = () => setWidth(window.innerWidth);
  //     window.addEventListener("resize", onResize);
  //     return () => {
  //       window.removeEventLister("resize", onResize);
  //     };
  //   }, []);

  useEffect(() => {
    const resize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize");

    return () => {
      window.removeEventLister("resize");
    };
  }, []);

  return width;
}
const ADD_TODO = "ADD_TODO";

function addTodo() {
  return {
    type: ADD_TODO,
  };
}
