// console.log(typeof 123);
// console.log(typeof false);
// // 아래는 모두 Object로 나타남 더 자세히 알아내기 위해서 아래의 함수를 만든다.
// console.log(typeof null);
// console.log(typeof 123);
// console.log(typeof 123);

export default function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

// console.log(getType(123));
// console.log(getType(false));
// // 각각 NULL, Object, Arraㅛ로 나온다.
// console.log(getType(null));
// console.log(getType({}));
// console.log(getType([]));
