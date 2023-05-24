## Yup이란 무엇인가?
Yup은 JavaScript에서 사용되는 **객체 스키마 유효성 검사 라이브러리**입니다. 이를 통해 **간편하게 데이터의 유효성을 확인하고 검증**할 수 있습니다. 

>아래는 Yup의 주요 문법과 기능에 대한 설명입니다:

`스키마 정의`: Yup을 사용하려면 **스키마를 정의**해야 합니다. 스키마는 데이터 모델을 설명하는 객체입니다. **yup.object()**를 사용하여 스키마를 정의할 수 있습니다.
`필드 유효성 검사`: 스키마 내에서 각 필드에 대한 유효성 검사를 **정의**할 수 있습니다. 다양한 메서드를 사용하여 유효성 규칙을 설정할 수 있습니다. 예를 들어, .string(), .number(), .boolean() 등 필드의 타입을 지정할 수 있습니다.
`필수 필드`: .required() 메서드를 사용하여 필드가 반드시 존재해야 함을 명시할 수 있습니다.
`값 범위 검사`: .min(), .max() 메서드를 사용하여 값의 최소 및 최대 범위를 검사할 수 있습니다. 예를 들어, .min(18)은 값이 18보다 크거나 같아야 함을 의미합니다.
`패턴 검사`: .matches() 메서드를 사용하여 정규식 패턴을 통한 값의 형식을 검사할 수 있습니다. 예를 들어, .matches(/^\d{4}$/)은 4자리 숫자인지 확인합니다.
`에러 메시지`: 각 유효성 검사 규칙에 대한 커스텀 에러 메시지를 설정할 수 있습니다. .required('Custom error message')와 같이 사용할 수 있습니다.
`체이닝`: Yup은 메서드 체이닝을 통해 여러 유효성 검사 규칙을 연결할 수 있습니다. 예를 들어, .string().required().min(6)과 같이 사용할 수 있습니다.
`유효성 검사 실행`: 정의된 스키마에 따라 데이터의 유효성을 검사할 수 있습니다. schema.validate(data, options) 메서드를 사용하여 유효성 검사를 수행합니다. 유효성 검사에 성공하면 Promise가 해결되고, 실패하면 Promise가 거부됩니다.

이러한 기능을 사용하여 데이터의 유효성을 쉽게 검사하고 처리할 수 있습니다. Yup은 다양한 유효성 검사 규칙과 메서드를 제공하므로 필요에 맞게 활용할 수 있습니다. 자세한 내용은 Yup의 공식 문서를 참고하시면 도움이 될 것입니다.

---

## 모듈 export 종류 🤓
```javascript
// core schema
import {
  mixed,
  string,
  number,
  boolean,
  bool,
  date,
  object,
  array,
  ref,
  lazy,
} from 'yup';

// Classes
import {
  Schema,
  MixedSchema,
  StringSchema,
  NumberSchema,
  BooleanSchema,
  DateSchema,
  ArraySchema,
  ObjectSchema,
} from 'yup';

// Types
import type { InferType, ISchema, AnySchema, AnyObjectSchema } from 'yup';
```

---

## schema 예시
> schema.validate() 로 검사
> 성공시 .then(()=>{})
> 실패시 .catch((error) => {})

### 📌 string schema

`string.required(message?: string | function)`
`string.length(limit: number | Ref, message?: string | function)`
```jsx
const yup = require('yup');
const schema = yup.string().length(5, '문자열은 5자여야 합니다.');
schema.validate('hello'); // 유효성 검사 통과
schema.validate('world'); // 유효성 검사 실패: "문자열은 5자여야 합니다."
```
`string.min(limit: number | Ref, message?: string | function)`
`string.max(limit: number | Ref, message?: string | function)`
`string.matches(regex: Regex, message?: string | function)`
```jsx
import * as yup from 'yup';
const schema = yup.string().matches(/^[0-9]+$/, '숫자만 입력해주세요.');
schema.validate('123')
  .then(() => {
    console.log('검사 성공');
  })
  .catch((error) => {
    console.log('검사 실패:', error.message);
  });
```
`string.matches(regex: Regex, options: { message: string, excludeEmptyString: bool })`
```jsx
import * as yup from 'yup';
//excludeEmptyString 옵션은 빈 문자열이 있는 경우 정규식 테스트를 건너뛰도록 설정합니다.
const schema = yup.string().matches(
  /^[a-zA-Z]+$/,
  { message: '영문자만 입력해주세요.', excludeEmptyString: true }
);
schema.validate('abc')
  .then(() => {
    console.log('검사 성공');
  })
  .catch((error) => {
    console.log('검사 실패:', error.message);
  });
```
`string.email(message?: string | function)`
`string.url(message?: string | function)`
`string.uuid(message?: string | function)`
`string.ensure()`  : undefined 또는 null 값이 주어진 경우 이를 빈 문자열로 변환하도록 합니다.
`string.trim(message?: string | function)` : 양쪽 공백이 사라짐
`string.lowercase(message?: string | function)` : 소문자로 모두 변환
`string.uppercase(message?: string | function)` : 대문자로 모두 변환


### 📌 number schema
`number.min(limit: number | Ref, message?: string | function)` 
: 숫자 값이 주어진 최소값보다 크거나 같은지를 확인하는 유효성 검사를 수행
```jsx
import * as yup from 'yup';

const schema = yup.number().min(5, '최소값은 5입니다.');

console.log(schema.isValidSync(7)); // true
console.log(schema.isValidSync(3)); // false, 유효성 검사 실패
```
`number.max(limit: number | Ref, message?: string | function)` 
: 함수는 숫자 값이 주어진 최대값보다 작거나 같은지를 확인하는 유효성 검사를 수행
```jsx
import * as yup from 'yup';

const schema = yup.number().max(10, '최대값은 10입니다.');

console.log(schema.isValidSync(7)); // true
console.log(schema.isValidSync(12)); // false, 유효성 검사 실패
```
`number.lessThan(max: number | Ref, message?: string | function)`
: 함수는 숫자 값이 주어진 값보다 작은지를 확인하는 유효성 검사를 수행
```jsx
import * as yup from 'yup';

const schema = yup.number().lessThan(10, '10보다 작아야 합니다.');

console.log(schema.isValidSync(7)); // true
console.log(schema.isValidSync(12)); // false, 유효성 검사 실패
```
`number.moreThan(min: number | Ref, message?: string | function)`
: 함수는 숫자 값이 주어진 값보다 큰지를 확인하는 유효성 검사를 수행
```jsx
import * as yup from 'yup';

const schema = yup.number().moreThan(5, '5보다 커야 합니다.');

console.log(schema.isValidSync(7)); // true
console.log(schema.isValidSync(3)); // false, 유효성 검사 실패
```
`number.positive(message?: string | function)`
: 함수는 숫자 값이 양수인지를 확인하는 유효성 검사를 수행
```jsx
import * as yup from 'yup';

const schema = yup.number().positive('양수여야 합니다.');

console.log(schema.isValidSync(7)); // true
console.log(schema.isValidSync(-3)); // false, 유효성 검사 실패
```
`number.negative(message?: string | function)`
: 함수는 숫자 값이 음수인지를 확인하는 유효성 검사를 수행
```jsx
import * as yup from 'yup';

const schema = yup.number().negative('음수여야 합니다.');

console.log(schema.isValidSync(-3)); // true
console.log(schema.isValidSync(7)); // false, 유효성 검사 실패
```
`number.integer(message?: string | function)`
: 숫자 값이 정수인지를 확인하는 유효성 검사를 수행
```jsx
import * as yup from 'yup';

const schema = yup.number().integer('정수여야 합니다.');

console.log(schema.isValidSync(7)); // true
console.log(schema.isValidSync(7.5)); // false, 유효성 검사 실패
```
`number.truncate()`
: 함수는 숫자 값을 정수로 변환
```jsx
import * as yup from 'yup';

const schema = yup.number().truncate();

console.log(schema.cast(7.5)); // 7
console.log(schema.cast(3.9)); // 3
```
`number.round(type: 'floor' | 'ceil' | 'trunc' | 'round' = 'round')`
: 함수는 숫자 값을 주어진 방식으로 반올림합니다. 기본값은 'round'이며, 옵션으로 'floor', 'ceil', 'trunc'을 사용할 수 있습니다.
```jsx
import * as yup from 'yup';

const schema = yup.number().round('floor');

console.log(schema.cast(7.5)); // 7
console.log(schema.cast(3.2)); // 3
```

### 📌 boolean schema
```jsx
import * as yup from 'yup';

const schema = yup.boolean();

console.log(schema.isValidSync(true)); // true
console.log(schema.isValidSync(false)); // true
console.log(schema.isValidSync('hello')); // false, 유효성 검사 실패
```

### 📌 date schema
```jsx
import * as yup from 'yup';

const schema = yup.date();

console.log(schema.isValidSync(new Date())); // true
console.log(schema.isValidSync('2023-05-24')); // true
console.log(schema.isValidSync('hello')); // false, 유효성 검사 실패
```

```date.min(limit: Date | string | Ref, message?: string | function)```
: 최소 허용 날짜를 설정합니다. 문자열이 주어진 경우 먼저 날짜로 변환하고 그 결과를 제한값으로 사용합니다.
```jsx
import * as yup from 'yup';

const schema = yup.date().min(new Date('2023-01-01'), '최소 날짜는 2023-01-01입니다.');

console.log(schema.isValidSync(new Date('2023-05-24'))); // true
console.log(schema.isValidSync(new Date('2022-12-31'))); // false, 유효성 검사 실패
```

```date.max(limit: Date | string | Ref, message?: string | function)```
: 최대 허용 날짜를 설정합니다. 문자열이 주어진 경우 먼저 날짜로 변환하고 그 결과를 제한값으로 사용합니다.
```jsx
import * as yup from 'yup';

const schema = yup.date().max(new Date('2023-12-31'), '최대 날짜는 2023-12-31입니다.');

console.log(schema.isValidSync(new Date('2023-05-24'))); // true
console.log(schema.isValidSync(new Date('2024-01-01'))); // false, 유효성 검사 실패
```

### 📌 [array](https://github.com/jquense/yup#array) schema
### 📌 [tuple](https://github.com/jquense/yup#tuple) schema
### 📌 [object](object) schema

---

object() 메서드를 사용하여 객체 스키마를 정의한 후, 해당 객체의 속성에 대한 검사 조건을 설정합니다. 일반적으로 .shape() 메서드를 사용하여 속성과 해당 속성의 유효성 검사 조건을 정의합니다.

```jsx
import { object, string, number } from 'yup';

const schema = object().shape({
  name: string().required('Name is required'),
  age: number().positive('Age must be a positive number').integer('Age must be an integer'),
  
const data = {
  name: 'John',
  age: 25,
};

schema.validate(data)
  .then(validatedData => {
    // 유효성 검사 통과한 데이터 처리
    console.log(validatedData);
  })
  .catch(errors => {
    // 유효성 검사 실패한 경우 에러 처리
    console.log(errors);
  });
});
```

---
## Yup 더 활용하기😎

### 📌 yup ref 활용

```jsx
const schema = yup.object({
  age: yup.number().required(),
  retirementAge: yup
    .number()
    .required()
    .min(yup.ref('age'), '퇴직 나이는 나이보다 작거나 같아야 합니다.'),
});
```

### 📌 yup의 test 활용
```jsx
const schema = yup.object({
  password: yup.string(),
  confirmPassword: yup.string().test(
    'password-match',
    '비밀번호와 일치해야 합니다.',
    function (value) {
      return value === this.resolve(yup.ref('password'));
    }
  ),
});
```
