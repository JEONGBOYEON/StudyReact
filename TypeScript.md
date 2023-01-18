
## TypeScript

TypeScript는 Type Annotation을 이용해서 타입이 정확히 지정(변수, 매개변수)  
아무타입도 안 넣어주면 any

```jsx
let a: number;

function hello(b: number) {
}
```

### TypeScript Types vs JavaScript Types

Static Types vs Dynamic Type(runtime때 알 수 있음)

### 1. Primitive Types

실제 값을 저장하는 자료형(Object, reference 형태가 아닌)  
Boolean, number, String, symbol, null, undefined  

literal 값으로 Primitive Type의 서브타입으로 나타낼 수 있다.  

마치 래퍼 객체로 만들 수 있다.  
아래와 같이 쓰면 Object이고 Primitive Type이 아니다. 권장 안함  
```jsx
new Boolean(false) // typeof 하면 Object
new String(’world’) // typeof 하면 Object
new Number(3) // typeof 하면 Object
```

### 2. boolean

```jsx
mkdir basic-types
cd basic-types
npm init -y
npm i typescript -D
//typescript config: root 경로에 tsconfig.json 파일이 생김
npx tsc --init 

//모든 파일 compile .js 파일 생성
npx tsc
node boolean.js
```

### 3. string

Template String

- 문자열은 backtick(=backquote)  `` 기호로 둘러쌓임
- 표현식(자바스크립트)는 `${ }` 로 둘러쌓임
- 행에 걸쳐 있거나, 표현식을 넣을 수 있는 문자열
    - ₩n 안써줘도 표현할 수 있음

```jsx
let sentence: string = `Hello, my name is ${fullNmae}.
I'll be ${age +1 } years old next month.`;
```

### 4. symbol

new Symbol로 사용할 수 없음  
Symbol 함수를 사용해서 symbol 타입을 만들 수 있음

### 5. undefined & null

실제로 undefined & null 값을 가진다  
void와 마찬가지로 그 자체로는 그다지 유용하지 않음  
둘다 소문자만 존재한다  
다른 모든 타입들의 **서브타입**으로 존재한다.  
(예를 들어 number에 undefined & null을 쓸 수 있다)

그런데 만약 —strickNullChecks 라는 옵션을 사용하면 서브타입으로 존재할 수 없다.  
대부분 —strickNullChecks 옵션을 사용하기 때문에 우리는 **유니온 타입**으로 undefined & null을 사용해줘야 한다.  
유니온 타입이란 합집합의 개념으로 **type | type** 으로 표현해서 사용하면 된다.  
타입가드…? 나중에…
```jsx
let union: String | null = null;
union = "Mark";
```

- null &  undefined in javascript  
runtime에서 typeof 연산자를 이용해서 null을 체크하면 Object라고 나온다.  
runtime에서 typeof 연산자를 이용해서 undefined을 체크하면 undefined라고 나온다.  
```jsx
let n : null = null;
consloe.log(typeof n) // Object

let u : undefined = undefined;
consloe.log(typeof u) // undefined
```

### 6. Object

primitive type이 아닌 것을 의미

### 7. Array

Object의 일종인 타입  
주의할점은 배열안에 있는 요소들이 **하나의 타입**이 아닐 경우 Array가 아니다.  
만약 한 배열에 여러가지 타입을 사용하고 싶을 경우 **유니온 타입을 이용**해서 구현하면 된다.  
```jsx
let list: number[] = [1,2,3,4];
let unionList: (number | string)[] = [1,2,3,"4"];
```

<aside>
💡 그런데 이때! 만약 각 요소가 매번 보장되는 type으로 생성이 될 경우가 있을 수 있다. typescript에서는 이를 위해 Tuple이라는 새로운 타입을 만들었다.

</aside>

### 8. Tuple

```jsx
let x: [string, number];

x = ["hello", 39]; //가능
x = [39, "hello"]; //불가능

x[2] = "" //불가능 index 0,1 만 넣을 수 있음

------
const person: [string, number] = ["mark", 39];
const [first, second] = person; // 구조 분해 할당
const [first, second, third] = person; // error
```

### 9. any

type이 모르는 상태에서 모든 것을 사용할 수 있음.  
정확한 Typescript를 위해서는 사용 안하는게 더 좋음 = **타입 안정성**을 잃는다.  
```jsx
//function의 return 값도 type 지정 가능
function returnAny(message: any): any {
	console.log(message)
}

const any1 = returnAny("리턴은 아무거나");
any1.toString();
```

### 10. unknown

### 11. never

### 12. void
