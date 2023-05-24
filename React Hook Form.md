🕐❗❕❓❔🔅⚠⛔❌⭕✔➕➖✖💣💰📔📖🔗🏆🔥⚡😀😎🤓😭😵😲😨😱😮😪😩❤🧡👀☠
# React Hook Form

[React Hook Form](https://react-hook-form.com/)은 React 기반의 폼 관리 라이브러리로, **폼 상태와 유효성 검사를 처리하기 위한 간편한 방법**을 제공합니다. 이를 통해 폼 컴포넌트의 개발과 유지 보수를 용이하게 할 수 있습니다. 

React Hook Form을 사용하면 폼 컴포넌트의 상태 및 유효성 검사를 관리하는 데 필요한 **코드 양을 대폭 줄일 수 있습니다**. 폼 요소의 값이나 상태 변경에 대한 이벤트를 관리하기 위해 명시적인 **이벤트 핸들러를 작성할 필요 없이, 단순히 Hook(useForm, useController, useWatch...)을 사용하여 관련 데이터를 추적하고 업데이트할** 수 있습니다.

📖 React Hook Form의 **장점**은 다음과 같습니다.
>
1. 간결한 API: React Hook Form은 사용하기 쉽고 직관적인 API를 제공하여 복잡한 폼 로직을 단순화합니다. 기본적으로 **제공하는 Hook** 함수들과 컴포넌트들을 사용하여 **폼을 쉽게 생성하고 관리**할 수 있습니다.
2. 높은 성능: React Hook Form은 성능에 중점을 두어 최적화되어 있습니다. 입력 필드의 값 변화를 추적하는 **"상태" 대신 각 입력 필드의 참조(reference)를 사용**하여 **불필요한 리렌더링을 방지하고, 가상 DOM의 업데이트를 최소화**합니다. 그로 인하여 [높은 성능](https://github.com/react-hook-form/performance-compare)을 보여줍니다.
3. 유효성 검사: React Hook Form은 내장된 유효성 검사를 지원하며, Yup, Joi 등의 외부 유효성 검사 라이브러리와 통합할 수도 있습니다. 입력 필드의 값에 대한 유효성 검사를 수행하고, 에러 메시지를 표시할 수 있습니다.
4. 커스텀 훅: React Hook Form은 커스텀 훅을 사용하여 개발자가 필요한 로직을 쉽게 작성하고 재사용할 수 있도록 지원합니다. 커스텀 훅을 사용하면 폼 상태, 에러 처리, 폼 제출 등의 로직을 캡슐화할 수 있습니다.

📖 React Hook Form을 사용하려면 다음과 같은 **주요 개념**을 이해해야 합니다:
>
1. useForm: useForm은 React Hook Form의 핵심 함수로, 폼의 인스턴스를 생성하고 폼 데이터와 메서드를 제공합니다.
2. register: register 함수는 입력 필드를 React Hook Form에 등록합니다. 입력 필드에 대한 유효성 검사 규칙, 기본값 등을 설정할 수 있습니다.
3. handleSubmit: handleSubmit 함수는 폼 제출 시 실행할 함수를 정의합니다. 이 함수는 유효성 검사를 수행하고, 제출할 데이터를 처리하는 로직을 작성할 수 있습니다.
4. errors: errors 객체는 유효성 검사 실패 시 해당 필드의 에러 메시지를 포함합니다.

---
## react-hook-form의 간단한 예시 😎

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" name="firstName" ref={register({ required: true })} />
      {errors.firstName && <span>First name is required.</span>}

      <input type="text" name="lastName" ref={register({ required: true })} />
      {errors.lastName && <span>Last name is required.</span>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
```
위의 예시에서는 useForm 훅을 사용하여 폼 인스턴스를 생성합니다. register 함수를 사용하여 각 입력 필드를 등록하고, 유효성 검사 규칙을 설정합니다. handleSubmit 함수를 사용하여 폼 제출 시 실행할 함수를 정의하고, onSubmit 함수를 해당 함수로 전달합니다.

입력 필드에 대한 유효성 검사 규칙은 register 함수의 인자로 전달됩니다. 예시에서는 각 필드가 필수(required)인지를 검사하도록 설정하였습니다. 유효성 검사 실패 시 errors 객체에 해당 필드의 에러 메시지가 포함되며, 이를 활용하여 에러 메시지를 표시할 수 있습니다.

폼 제출 시 onSubmit 함수가 실행되며, 해당 함수에서는 제출할 데이터를 처리하거나 API 호출 등의 로직을 작성할 수 있습니다. 이 예시에서는 단순히 제출한 데이터를 콘솔에 출력하도록 했습니다.

---
## react form과 react-hook-form 비교하기! 🧐
### ✔ ASIS react form : state로 form 요소 관리
```jsx

interface FormData {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}
const AsisInputExample = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Last Name</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div>
        <label>Email ID</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
```

### ✔ TOBE react-hook-form
```jsx
const BasicInputExample = () => {
  const { register, handleSubmit } = useForm();
  return (
    <form
      onSubmit={handleSubmit(data => {
        console.log(data);
      })}
    >
      <div>
        <label>First Name</label>
        <input {...register('name')} />
      </div>
      <div>
        <label>Last Name</label>
        <input {...register('name')} />
      </div>

      <div>
        <label>Phone Number</label>
        <input {...register('phone')} />
      </div>
      <div>
        <label>Email ID</label>
        <input type="email" {...register('email')} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
      </div>
      <button>submit</button>
    </form>
  );
};
```
> 코드가 매우 **간결**해진것을 확인할수 있습니다!


### 💡 랜더링 비교
![](https://velog.velcdn.com/images/boyeon_jeong/post/66f9040b-9fb2-4edf-8a4b-6289a322e471/image.gif)

> ASIS react hook form은 form 요소마다 `전체가 리랜더링` 되는데에 반해 react-hook-form은 `해당 input만 리랜더링` 되는것을 확인할 수 있습니다.


---

# React Hook Form으로 validation 구현하기

#### 1. 기본 react-hook-form
register함수의 두번째 인자에 validation(required, min, max, minLength, maxLength, pattern, validate..)을 추가해주면 됩니다.
```jsx
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  );
}
```

#### 2. controller(mui)
controller를 사용하여 구현할 경우 
```jsx
const ControllerValidationExample = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Grid item>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item style={{ width: '30%' }}>
            <Controller
              name="firstName"
              control={control}
              defaultValue={''}
              rules={{ required: 'First Name is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  label="First Name"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: '30%' }}>
            <Controller
              name="lastName"
              control={control}
              defaultValue={''}
              rules={{ required: 'Last Name is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Last Name"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: '30%' }}>
            <Controller
              name="phone"
              defaultValue={''}
              control={control}
              rules={{ required: 'Phone Number is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Phone Number"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: '30%' }}>
            <Controller
              name="email"
              control={control}
              defaultValue={''}
              rules={{
                required: 'Email ID is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
                minLength: {
                  value: 6,
                  message: 'Email must be at least 6 characters',
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Email ID"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: '30%' }}>
            <Controller
              name="password"
              defaultValue={''}
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Password"
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: '30%' }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};
```

react-hook-form을 사용하면 다중 조건 및 각 조건에 대한 메시지를 설정할 수 있습니다. Contoller의 rules 객체에 여러 조건을 설정하고 각 조건에 대한 메시지를 지정할 수 있습니다.

```jsx
<Controller
  name="email"
  control={control}
  defaultValue={''}
  rules={{
    required: 'Email ID is required',
    pattern: {
    	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    	message: 'Invalid email address',
    },
    minLength: {
    	value: 6,
    	message: 'Email must be at least 6 characters',
    },
 }}
 ...
/>
```
![](https://velog.velcdn.com/images/boyeon_jeong/post/70dc2a9e-43b2-4855-a857-8672828e7f47/image.gif)

이처럼 validation을 직접 주어도 되지만 가독성을 위해 **미리 선언**해두고 사용할 수 있습니다.

```jsx
const emailRules = {
  required: 'Email ID를 입력해주세요',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: '올바른 이메일 형식이 아닙니다.',
  },
  minLength: {
    value: 6,
    message: '이메일은 최소 6자 이상이어야 합니다.',
  },
};

const numberRules = {
  required: 'Number is required',
  valueAsNumber: true,
  validate: {
    positive: (value: number) => value > 0 || '반드시 양수여야 합니다.',
    max: (value: number) => value <= 100 || '100까지 입력할 수 있습니다.',
  },
};

return(
  <Controller
  name="email"
  control={control}
  defaultValue={''}
  rules={emailRules}
/>
);
```

#### 3. controller(mui) + yup 
단순하게 react-hook-form으로도 validation 해줄수 있지만 가독성이 좋지 않을 수 있습니다. 따라서 yup을 사용해 [스키마](https://react-hook-form.com/get-started#SchemaValidation)를 지정해줄 수 있습니다.

1. 이를 위해서는 yup과 @hookform/resolvers를 설치해주어야 합니다.
```shell
yarn add @hookform/resolvers yup
```

2. 그리고 스키마를 지정해줍니다.
```jsx
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email ID is required')
    .email('Invalid email address')
    .min(6, 'Email must be at least 6 characters'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .max(100, 'Age must be less than or equal to 100'),
  price: yup
    .number()
    .required('Price is required')
    .typeError('Price must be a number')
    .positive('Price must be a positive number'),
});

```

3. 직접 사용하는 form에 넣어줍니다.
```jsx
import { yupResolver } from '@hookform/resolvers/yup';

 const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
```


---
### 관찰을 할수 있다. watch 함수로 nam준걸 근데! ref에 register로 등록을 해줘야지!! 

```jsx
console.log(watch("example"));
return (
	<div>
    	<form onSubmit={handleSubmit(onSubmit)}>
          <input name="example" ref={register}/>
    	</form>
  	</div>
)

```

![업로드중..](blob:https://velog.io/c3af57dc-3a8f-402b-84db-4ed2a2182336)



---
# yup으로 validation 구현하기

formik, yup과 같은 외부라이브러리와 함께 react-hook-form을 사용할 수 있습니다. react-hook-form만으로도 validation을 구현할 수 있지만 외부라이브러리를 사용하게 되면 ~ 장점이 있습니다.













