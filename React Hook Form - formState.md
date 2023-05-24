
# [formState](https://react-hook-form.com/docs/useform/formstate)

### formState return value
`isDirty`: 사용자가 입력 중 **하나라도 수정한 경우 true**로 설정됩니다. 기본값과 비교하여 폼의 변경 여부를 확인하는 데 사용됩니다.
`dirtyFields`: 사용자가 수정한 필드를 포함하는 객체입니다. useForm을 통해 모든 입력 필드의 기본값을 제공해야 하며, 라이브러리가 기본값과 비교하여 각 필드의 변경 여부를 판단할 수 있습니다.
`touchedFields`: 사용자가 상호 작용한 모든 입력 필드를 포함하는 객체입니다.
`defaultValues`: useForm의 defaultValues를 통해 설정한 기본값이나 reset API를 통해 업데이트된 기본값입니다.
`isSubmitted`: 폼이 제출된 후 true로 설정됩니다. reset 메서드가 호출될 때까지 유지됩니다.
`isSubmitSuccessful`: 폼이 런타임 오류 없이 성공적으로 제출된 경우 true로 설정됩니다.
`isSubmitting`: 폼이 현재 제출 중인 경우 true로 설정됩니다. 제출 중이 아닌 경우 false입니다.
`isLoading`: 비동기 기본값을 로딩 중인 경우 true로 설정됩니다. (비동기 기본값에만 적용됩니다.)
`submitCount`: 폼이 제출된 횟수입니다.
`isValid`: 폼에 오류가 없는 경우 true로 설정됩니다. setError는 isValid formState에 영향을 주지 않으며, isValid는 항상 전체 폼 유효성 검사 결과에 따라 결정됩니다.
`isValidating`: 유효성 검사 중일 때 true로 설정됩니다.
`errors`: 필드 오류를 포함하는 객체입니다. ErrorMessage 컴포넌트를 사용하여 오류 메시지를 쉽게 가져올 수 있습니다.

---

### formState example

> * **formState**는 form 전체의 state (formState.isValid)
> * **fieldState**는 하나의 field에 대한 state (fieldState.error)

```jsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

const MyForm = () => {
  const { handleSubmit, control, formState } = useForm();

  const onSubmit = (data) => {
    // 폼 제출 시 실행되는 로직
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: '이름을 입력해주세요.' }}
        render={({ field, fieldState }) => (
          <TextField
            label="이름"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{ required: '이메일을 입력해주세요.' }}
        render={({ field, fieldState }) => (
          <TextField
            label="이메일"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Button
        type="submit"
        disabled={!formState.isValid || Object.keys(formState.dirtyFields).length === 0}
      >
        제출
      </Button>
    </form>
  );
};

export default MyForm;

```
---

### formState를 사용할때 주의해야할 점

####  🚨 formState는 `일괄적으로 업데이트`됩니다. 만약 useEffect를 통해 formState를 구독하려면, 선택적 배열에 `전체 formState`를 넣어야 합니다.
```jsx
//formState는 렌더링 성능을 개선하고, 특정 상태가 구독되지 않은 경우 추가 로직을 건너뛰기 위해 Proxy로 래핑됩니다. 
//따라서 상태 업데이트를 활성화하려면 렌더링 전에 formState를 호출하거나 읽도록 해야 합니다.
useEffect(() => {
  if (formState.errors.firstName) {
    // 여기서 로직을 수행합니다.
  }
}, [formState]); // ✅
// ❌ formState.errors는 useEffect를 트리거하지 않습니다.

```
####  🚨 formState를 구독할 때 논리 연산자에 주의해야 합니다.
```jsx
// ❌ formState.isValid는 조건부로 접근되므로 Proxy가 해당 상태의 변경을 구독하지 않습니다.
return <button disabled={!formState.isDirty || !formState.isValid} />;

// ✅ 모든 formState 값을 읽어서 변경 사항을 구독합니다.
const { isDirty, isValid } = formState;
return <button disabled={!isDirty || !isValid} />;
```
---

### formState 프록시(Proxy)

프록시(Proxy)는 JavaScript에서 **객체의 동작을 `가로채고 커스텀 동작을 정의` 할 수 있게 해주는 내장 객체**입니다. 프록시는 대상 객체(타겟)에 대한 중간 계층으로 동작하며, 프록시 객체를 통해 대상 객체의 동작을 감시하고 제어할 수 있습니다.

프록시 객체는 new Proxy(target, handler)를 사용하여 생성됩니다. 여기서 target은 프록시로 가로챌 대상 객체이고, handler는 프록시 객체의 동작을 정의하는 핸들러 객체입니다. 핸들러 객체는 다양한 훅(trap) 메소드를 제공하여 프록시 동작을 커스터마이즈할 수 있습니다. 예를 들어, get, set, deleteProperty와 같은 훅 메소드를 사용하여 프로퍼티 접근, 할당, 삭제 등을 가로챌 수 있습니다.

React Hook Form의 formState는 프록시로 래핑됩니다. 이는 formState 객체가 변경되는 상황을 감지하고 필요한 로직을 실행하기 위해 사용됩니다. 그러나 프록시는 특정 상태가 구독되지 않은 경우 추가 로직을 건너뛰기 위해 사용됩니다. 
