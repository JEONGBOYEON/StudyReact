## Interface

- 내부적으로는 숨겨져있고, 외부적으로 들어나 있는 호출방식
- 실제로 컴파일 후에 .js 파일에서는 사라지게 된다.

1. optional property_1   ⇒ :?
    
    ⇒ 객체의 프로퍼티가 있을 수도 있고, 없을 수도 있게 만들어주는 인터페이스
    

```jsx
interface Person {
	name: string;
	//물음표로 넣기
	age?: number;
}

function hello(person: Persion): void {
	console.log(`안녕하세요! ${persion.name} 입니다`);
}

hello("Mark", 49);
hello("Anna");
```

1. optional property_2   ⇒ indexable type
    
    ⇒ index의 type은 2가지가 올 수 있다. (string, ?)
    
    ⇒ 어떤 이름의 property든 추가가능(추가 안해도 됨)
    

```jsx
interface Person {
	name: string;
	age?: number;
	[index: string]: any
}

a['whatever'] = "love";

function hello(person: Person): void {
	console.log(`안녕하세요! ${person.name} 입니다`);
}

const p: Person3 = {
	name: "Anna",
	age: 39,
	systers: ["Sung", "Chan"]
}
```

1. function in property
    - hello: function() `사용 가능`
    - hello() `사용 가능`
    - hello: () ⇒ `사용 불가`

```jsx
interface Persion {
	name: string;
	age: number;
	hello(): void;
}

//방법1: 변수에 할당하기(function 키워드로)
const p: Person3 = {
	name: "Anna",
	age: 39,
	hello: function() : void {
		(`안녕하세요! ${this.name} 입니다`);
	}
}
//방법2: function 키워드 없이 할당
const p: Person3 = {
	name: "Anna",
	age: 39,
	hello() : void {
		(`안녕하세요! ${this.name} 입니다`);
	}
}
//방법3: arrow function
const p: Person3 = {
	name: "Anna",
	age: 39,
	hello: () : void => {
		//this는 global this를 가르키기 때문에 error
		(`안녕하세요! ${this.name} 입니다`);
	}
}
```

<aside>
💡 [arrow function](https://codingapple.com/unit/es6-3-arrow-function-why/)

</aside>

1. class implements interface
    
    ⇒ interface를 이용해서 class를 만드는 방법 (implements)  
    ⇒ 컴파일이 되어도 class는 javascript 파일에 남아있다  
    ⇒ OOP(객체지향)에서 많이 사용 되는 방법  
    

```jsx
//그저 type
interface PersonImple {
	name: string;
	age?: number;
	hello(): void;
}

//실제 구현체
class Person implements PersonImple {
	name: string;
	age?: number } undefiend;

	//optional이 아닌 값들은 constructor에서 초기화 해주어야함
	constructor(name: string) {
		this.name = name;
	}
	
	hello(): void {
		//throw new Error();
		console.log(`안녕하세요! ${this.name} 입니다`);
	}
}

const persion: PersonImple = new Persion("Mark");
person.hello();
```

1. interface extends interface
    
    ⇒ 상속(extends 키워드 사용)
    

```jsx
interface PersonSuper {
	name: string;
	age?: number;
}

interface PersonSub extends PersonSuper{
	city: string;
}

const k: PersonSub = {
	name: "이용재",
	city: "서울",
};
```

1. function interface

```jsx
interface HelloPerson {
	(name: string, age?: number): void;
}

const helloPerson: HelloPerson = function(name: string) {
	console.log(`안녕하세요! ${this.name} 입니다`);
}

const helloPerson: HelloPerson = function(name: string, age?: number) {
	console.log(`안녕하세요! ${this.name} 입니다`);
}

//error
const helloPerson: HelloPerson = function(name: string, age: number) {
	console.log(`안녕하세요! ${this.name} 입니다`);
}
```
