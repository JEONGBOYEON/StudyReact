## 객체

---

객체는 변수 혹은 상수를 사용하게 될때 **하나의 이름에 여러 종류의 값**을 넣을 수 있게 해줍니다.

```javascript
const dog = {
  name: "멍멍이",
  age: 2,
};

console.log(dog.name);
console.log(dog.age);
```

## 객체 비구조화 할당(객체 구조 분해)

---

위의 예시 코드 처럼 객체의 내부의 값을 조회할때마다 **dog.** 으로 나타내야 합니다. 만약 객체 비구조화 할당이라는 문법을 사용한다면 **코드를 더욱 보기 좋고 짧게** 작성할 수 있습니다.

```javascript
const dog = {
  name: "멍멍이",
  age: 2,
};

function print(animal) {
  const [name, age] = animal;
  log(name);
  console.log(age);
}

print(dog);
```

## 배열 비구조화 할당

---

위에서 설명했던 비 구조화 할당은 객체 뿐만 아니라 배열에서도 사용 할 수 있습니다.

```javascript
const array = [1, 2];
const [one, two] = array;

console.log(one);
console.log(two);
```

## ES6 의 object-shorthand 문법

```javascript
const extracted = {
  name: name,
  languages: languages,
  value: value
}

key 이름으로 선언된 값이 존재하다면, 바로 매칭시켜주는 문법입니다.
```

##

---

```javascript

```

##

---

```javascript

```
