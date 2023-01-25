### Type System

타입 시스템으로는 일반적으로 두가지가 있습니다.

1. 컴파일러에게 사용하는 타입을 `명시적`으로 지정하는 시스템
2. 컴파일러가 자동으로 타입을 `추론`하는 시스템  

⇒ 타입스크립트는 이 두가지를 모두 포함한다.

### Type System: Structural vs Nominal

1. Structural Type System : 구조가 같으면, 같은 타입이다. (typesscript)
2. Nominal Type System  : 구조가 다르면, 다른 타입이다. (c언어)
3. duck typing (python)

---

### TypeScript options 소개

1.  `nolmplicitAny option`

    ⇒ 원래 typescript는 명시적으로 지정해주지 않으면 any라고 추론한다. `nolmplicitAny option`을 사용하면 타입을 명시적으로 지정하지 않은 경우, 타입스크립트가 추정 중 ‘any’라고 판단하게 되면, **컴파일 에러**를 발생시켜 명시적으로 지정하도록 유도하는 option
   
    
2. `strictNullChecks option`

	null & undefined는 모든 type에 포함이 된다.
    
    ```jsx
    // a가 양수일 경우 number type return
    // a가 음수일 때는 undefined type return
    // 그런데 return type을 명시적으로 지정해주지 않았지만, number로 추정
    function f4(a: number) {
    	if(a > 0){
    		return a * 38;
    	}
    }
    
    console.log(f4(5));
    //여기서 undefined + 5 이기 때문에 원래 error
    //그런데, 추정된 return type이 number이기 때문에 error 없이 NaN이 출력이 된다.
    console.log(f4(-5) + 5); 
    
    //실제 return type인 undefined은 추론된 retrun type인 number가 아니기 때문에 에러가 발생해야 하는데 그냥 넘어감
    //그 이유는 모든 타입은 null & undefined를 포함하고 있기 때문에
    ```
    
    `strictNullChecks option`
    
    ⇒ 모든 타입에 자동으로 포함되어 있던 null & undefined를 제거해준다.
    
    ```jsx
    // 그런데 return type을 명시적으로 지정해주지 않았지만, number | undefiend로 추정
    function f4(a: number) {
    	if(a > 0){
    		return a * 38;
    	}
    }
    
    console.log(f4(5));
    console.log(f4(-5) + 5); //undefined type과의 연산은 못 하기 때문에 error 발생
    ```
    

3. `nolmplicitReturns option`

⇒ 함수 내에서 모든 코드가 값을 리턴하지 않으면, 컴파일 에러를 발생시킨다.

---

### Object literal type

1. Object literal type
    
    만약 object의 parameter type을 지정해주지 않으면 다음과 같이 undefined, NaN이 뜰 수 있다.
    
    ```jsx
    function f7(a) {
    	return `이름은 ${a.name} 이고, 연령대는 ${Math.floor(a.age/10) * 10}대 입니다.`
    }
    
    console.log(f6({name: 'Mark', age: 38})); // 정상
    console.log(f6('Mark'); // 이름은 undefined이고, 연령대는 NaN대 입니다.
    ```
    
    따라서 `Object literal type`을 지정해 주어야 한다.
    
    ```jsx
    function f7(a: {name: string; age: number}) {
    	return `이름은 ${a.name} 이고, 연령대는 ${Math.floor(a.age/10) * 10}대 입니다.`
    }
    
    console.log(f6({name: 'Mark', age: 38})); // 정상
    console.log(f6('Mark'); // Argument of type 'string' is not assignable to parameter of type {name: string; age: number}
    ```
    
    `Object literal type`를 좀 더 사용하기 쉽게 하는 방법으로는
    
    - interface
    - type alias
    - class

---

### 타입 호환성(Type Compatibility)

1. sub 타입과 super 타입 관계
    - super type = sub type
    - sub type ≠ super type

```jsx
// 리터럴 타입 < 타입
let sub: 1 = 1;
let sup: number = sub1;
sub = sup; //error

// 배열 < object
let sub: number[] = [1];
let sup: object = sub2;
sub = sup; //error

// tuple < 배열
let sub: [number, number] = [1, 2];
let sup: number[] = sub
sub = sup //error

// ! 예외
// 타입 < any 인데 타입 = any 가 가능
let sub: number = 1;
let sup: any = sub;
sub = sup; //error xx

// A extends B
// B < A
class Animal {}
class Dog extends Animal {
	eat() {}
}

let sub: Dog = new Dog();
let sup: Animal = sub;
sub = sup //error
```

1. 공변
    
    ⇒ `같거나 서브 타입`인 경우, 할당이 가능하다
    

```jsx
let sub: string = '';
let sup: string | number = sub;

let sub: { a: string; b: number } = { a: '', b: 1 };
let sup: { a: string | number; b: number } = sub

// array - object
let sub: Array<{ a:string; b:number }> = [{ a: '', b: 1 }];
let sup: Array<{ a:string | number; b:number }> = sub
```

1. 반병
    
    ⇒ `같거나 슈퍼타입`인 경우 , 할당이 가능하다
    
    ⇒ 유일하게 `함수의 매개변수`인 경우만(조금의 융통성을 준다)
    
    ⇒ 그런데! 이때, 만약 strictFunctionTypes options를 키면 에러를 통해 경고 한다.
    

```jsx
class Person {}
class Developer extends Person {
	coding() {}
}
class StartDeveloper extends Person {
	burning() {}
}

// 매개변수의 매개변수 타입 지정
function tellme(f: (d: Developer) => Developer) {}

tellme(function dtoD(d: Developer): Developer {
	return new Developer();
});

tellme(function dtoP(d: Person): Developer {
	return new Developer();
});

//error 발생해야 하지만 발생 안함
//만약 strictFunctionTypes 옵션을 주면 error 발생
tellme(function dtoS(d: StartDeveloper): Developer {
	return new Developer();
});
```

---

### 타입 별칭(Arias)

- Interface랑 비슷해 보임
- Primitive, Union Type, Tuple, Function ..
- 예전에는 Interface와 다른점이 에러가 발생하면 추적하는 방식이이였는데 지금은 똑같음

```jsx
//Primitive(크게 의미 없음)
type MyStringType = string;
const str = 'world';
let myStr: MyStringType = 'hello';
myStr = str;

//Union Type
let person: string | number = 0;
person = "mark";

type StringOrNumber = tring | number;
let another: StringOrNumber = 0;
another = "Anna";

//Tuple
let person: [stinrg, number] = ["mark", 35];

type PersonTuple = [string, number];

let another: PersonTuple = ["Anna", 24];

//Function
type EatType = (food: string) => void;
```
