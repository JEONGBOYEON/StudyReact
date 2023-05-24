## useFormContext / FormProvider

#### [useFormContext](https://react-hook-form.com/docs/useformcontext) / [FormProvider는](https://react-hook-form.com/docs/formprovider) 무엇일까요? 🧐
FormProvider는 React Hook Form에서 제공하는 컴포넌트로, React의 Context API를 기반으로 구현되었습니다. FormProvider는 **상위 컴포넌트에서 하위 컴포넌트로 폼 데이터와 관련된 상태와 로직을 전달**하기 위해 사용됩니다.

useFormContext는 React Hook Form의 컨텍스트에 접근하기 위한 커스텀 훅입니다. useFormContext를 사용하면 **컨텍스트를 prop으로 전달하는 것이 불편한 깊은 중첩 구조에서도 컨텍스트에 접근할 수 있습니다.🎊** 이 훅을 사용하면 useForm에서 ``반환하는 모든 메서드와 속성``을 가져올 수 있습니다. 즉, useForm의 반환값을 `그대로 사용할 수 있습니다`.

useFormContext를 사용하기 위해서는 폼을 FormProvider 컴포넌트로 감싸주어야 합니다. FormProvider 컴포넌트에 useForm에서 반환한 메서드와 속성을 전달하면 됩니다. 그런 다음 useFormContext를 호출하여 해당 메서드와 속성을 가져올 수 있습니다.


#### 다음과 같이 사용됩니다👇
>
1. `useForm()` 훅을 사용하여 폼 메서드 및 상태를 가져옵니다.
2. `FormProvider` 컴포넌트로 폼 메서드와 상태를 감싸줍니다.
3. 폼 컴포넌트들을 `FormProvider` 내부에 작성합니다.
4. 그리고 내부 폼 컴포넌트들은 `useFormContext`을 통해 useForm의 반환값을 사용할 수 있습니다. 이를 통해 하위 컴포넌트에서 폼 데이터에 접근하고, 폼 유효성 검사, 데이터 제출 등의 기능을 수행할 수 있습니다.



#### FormProvider 예시

예를 들어, 다음은 `FormProvider`를 사용하여 간단한 폼을 구성하는 예제입니다:

```jsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const MyForm = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input type="text" name="firstName" {...methods.register('firstName')} />
        <input type="text" name="lastName" {...methods.register('lastName')} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

const App = () => {
  return (
    <div>
      <h1>My Form</h1>
      <MyForm />
    </div>
  );
};

export default App;
```

위의 예제에서 `useForm()` 훅을 사용하여 **`methods` 객체를** 가져옵니다. 이 객체는 폼 메서드와 상태를 포함하고 있습니다. `FormProvider` 컴포넌트로 `methods` 객체를 전달하여 하위 컴포넌트에서 접근할 수 있게 합니다. 그리고 폼 요소들을 `FormProvider` 내부에 작성하여 폼 데이터를 관리하고 제출할 수 있습니다.

#### methods 객체

`methods` 객체에는 다양한 메서드와 속성이 포함되어 있습니다. 몇 가지 주요한 메서드와 속성은 다음과 같습니다:

- `handleSubmit`: 폼 제출을 처리하는 함수입니다. 이 함수를 폼의 `onSubmit` 이벤트 핸들러로 전달하여 데이터를 처리할 수 있습니다.
- `register`: 폼 필드를 등록하는 함수입니다. 폼 필드를 컨트롤하기 위해 필요한 속성을 반환합니다.
- `watch`: 특정 폼 필드를 감시하고 해당 필드의 값 변경을 추적하는 함수입니다.
- `errors`: 폼 필드의 유효성 검사 오류 정보를 포함하는 객체입니다.

---

## mui(Controller)와 함께 써보자!
#### 방법1: `<Controller />` 사용
```jsx
import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import FssInput from './FssInput';

const MyForm = () => {
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        //따로 props를 넘기지 않아도 된다.
        <CustomInput name="inputName" label="Input Field" />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

const App = () => {
  return (
    <div>
      <h1>My Form</h1>
      <MyForm />
    </div>
  );
};

export default App;
```
```jsx

const CustomInput = ({ name, isPrice, ...rest }: any) => {
  const { control, formState: { errors } } = useFormContext();

  const error = errors[name];
  const errorMessage = error ? (
    <Grid container>
      <ErrorOutlineIcon color="warning" sx={{ marginRight: '4px' }} />
      {error.message}
    </Grid>
  ) : null;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          fullWidth
          autoComplete="off"
          variant="outlined"
          value={field.value}
          error={!!error}
          {...rest}
        />
      )}
    />
  );
};

```
#### 방법2: controller 매소드 사용
```jsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const MyForm = () => {
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        //control과 name을 props로 넘기기
        <CustomInput name="inputName" label="Input Field" control={methods.control} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

const App = () => {
  return (
    <div>
      <h1>My Form</h1>
      <MyForm />
    </div>
  );
};

export default App;
```
```jsx
const CutstomInput = ({ name, control, ...rest }: any) => {
  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({ name, control });

  const error = errors[name];
  const errorMessage = error ? (
    <Grid container>
      <ErrorOutlineIcon color="warning" sx={{ marginRight: '4px' }} />
      {error.message}
    </Grid>
  ) : null;

  return (
    <TextField
      fullWidth
      autoComplete="off"
      variant="outlined"
      InputProps={{
        value: value,
        onChange,
        onBlur
      }}
      error={!!error}
      {...rest}
    />
  );
};

```

---
## 성능 이슈에 대한 고민 🤔

보통 react의 context를 쓰면 불필요한 리랜더링이 발생하게 되어 성능에 이슈를 야기한다는 말이 있다. 따라서 react-hook-form의 FormProvider/useFormContext도 성능이슈를 야기할까 고민이 되었다.

만약 아래와 같은 깊은 계층 구조를 가지는 컴포넌트가 있다고 생각했을때 실제 FormProvider는 detailSheet에서 감싸주고 가장 하위 컴포넌트인 Product, CouterInput 내부의 CustomInput 컴포넌트에서 useFormContext를 사용한다고 가정했을때, CustomInput의 input을 수정하면 부모 컴포넌트들도 재랜더링이 될까? 답은 아니다!!
![](https://velog.velcdn.com/images/boyeon_jeong/post/76471326-7459-4e11-8d59-15b8195ef676/image.png)

그 이유는 FormProvider와 useFormContext를 사용하는 핵심 개념인 **`로컬 폼 상태` 을 활용하여 최적화** 하였기 때문입니다. 로컬 폼 상태는 해당 컴포넌트가 직접적으로 의존하는 폼 필드에 대해서만 관리하고 업데이트하므로, 다른 컴포넌트의 리렌더링에 영향을 받지 않습니다. 따라서, CustomInput 컴포넌트의 성능 이슈는 해당 필드의 변경에 따라 발생하며, 다른 부모나 형제 컴포넌트들의 리렌더링과는 독립적입니다.

#### 🚫 그러나 깊은 계층 구조를 가지는 컴포넌트에서는 여전히 주의해야 할 점이 있습니다. 
만약 부모 컴포넌트가 FormProvider로 감싸져 있고, 그 하위에 여러 개의 자식 컴포넌트가 있고, 그 자식 컴포넌트들 중에서 useFormContext를 사용하는 컴포넌트가 있다면, 해당 useFormContext를 사용하는 컴포넌트의 로컬 폼 상태 변경이 발생하면 **그 컴포넌트와 그의 하위 컴포넌트들이 리렌더링**될 수 있습니다. 이는 **React의 컴포넌트 트리에서 상위로의 리렌더링 전파**로 인해 발생합니다.
[읽어보기](https://velog.io/@arthur/%EB%B2%88%EC%97%AD-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%8F%99%EC%9E%91%EC%9D%98-%EA%B1%B0%EC%9D%98-%EC%99%84%EB%B2%BD%ED%95%9C-%EA%B0%80%EC%9D%B4%EB%93%9C-A-Mostly-Complete-Guide-to-React-Rendering-Behavior)

따라서, 깊은 계층 구조를 가지는 컴포넌트에서는 useFormContext를 사용하는 컴포넌트의 성능에 영향을 주는 요소들을 최적화하는 것이 중요합니다. 필요한 경우 React.memo나 shouldComponentUpdate를 사용하여 부모 컴포넌트의 리렌더링을 최적화하고, useFormContext를 사용하는 컴포넌트 자체의 성능을 개선할 수 있습니다.

### 🗣 결국엔 context는 부모 컴포넌트들이 아닌 하위 컴포넌트들이 재랜더링 될 수 있으니 주의해야 한다!
