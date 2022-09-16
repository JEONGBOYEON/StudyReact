// JS 시작하기

// [산술 연산자(arithmetic operator)]
// console.log(1 + 2);
// console.log(1 - 2);
// console.log(1 * 2);
// console.log(10 / 2);
// // 나머지 연산자
// console.log(7 % 2);

// [할당 연산자(assingment operator)]
// let a = 2;
// a *= 1;
// console.log(a);

// [비교 연산자(comparison operator)]

// const aa = 1;
// const bb = 1;

// console.log(a === b);

// 반복문

// const ulEl = document.querySelector("ul");
// console.log(ulEl);

// for (let i = 0; i < 10; i++) {
//   const li = document.createElement("li");
//   li.textContent = `list-${i + 1}`;
//   li.addEventListener("click", function () {
//     console.log(li.textContent);
//   });
//   ulEl.appendChild(li);
// }

// 변수 유효범위
// var, let, const

// function scope() {
//   if (true) {
//     // const, let => 같은 중괄호(블록 레벨) 범위내에서만 사용할 수 있는 변수
//     // var => 함수레벨의 변수
//     // var 변수는 의도하지 않은 범위내에서 변수를 사용할 수 있고, 메모리 누수로 발전할 수 있기 때문에 권장하지 않는다.
//     const a = 123;
//     console.log(a);
//   }
//   console.log(a);
// }

// scope();

// JS 함수
