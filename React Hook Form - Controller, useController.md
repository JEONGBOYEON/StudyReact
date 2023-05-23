
# Controller API

### 제어 컴포넌트란 무엇인가!! 🧐
[제어 컴포넌트](https://legacy.reactjs.org/docs/forms.html#controlled-components)(controlled component)는 폼 요소의 상태를 React의 state로 관리하는 방식입니다. **폼 요소의 값이 state에 의해 제어되므로, 폼 요소의 값을 변경하려면 state를 업데이트**해야 합니다. 이 경우, **폼 요소의 값이 항상 React의 state와 동기화**되어 있습니다. 제어 컴포넌트의 장점은 React의 상태(state)를 사용하여 폼 요소의 값을 제어하므로, 사용자 입력에 따라 리액트 애플리케이션의 **다른 부분과 상호작용**할 수 있다는 점입니다. 또한, **폼의 유효성 검사, 제출 처리 등의 작업을 쉽게 구현**할 수 있습니다.

> React에서 제어 컴포넌트는 폼 요소뿐만 아니라 일반적인 컴포넌트에서도 사용될 수 있습니다. 그러나 폼 요소를 제어 컴포넌트로 사용하는 것이 가장 일반적입니다. 폼 요소의 값을 동적으로 업데이트하고 제어하는 데 필요한 기능을 제공합니다.

### 비제어 컴포넌트와의 차이점은??

비제어 컴포넌트(uncontrolled component)는 반면에, **폼 요소의 값이 React의 state와 동기화되지 않습니다. 대신, 폼 요소의 값을 직접 `DOM` 에서 읽어옵니다**. React Hook Form은 이 접근 방식을 채택하여, 폼 요소의 값을 직접 관리하고 유효성 검사 등의 기능을 제공합니다. 폼 요소의 상태를 직접 추적하기 때문에, **state 업데이트와 렌더링에 따른 성능 이점을 얻을 수 있습니다.**

>- 제어 컴포넌트(Controlled Component) : 제어 컴포넌트에서는 값이 변경될 때마다 컴포넌트 전체가 리렌더링됩니다. 이는 React의 일반적인 상태 업데이트 방식입니다.
- react-hook-form : react-hook-form은 내부적으로 **변경된 필드만 다시 렌더링하여 최적화된 성능**을 제공합니다. 따라서, 필드가 변경되더라도 전체 폼이 리렌더링되지 않습니다.

### ReactHookForm = uncontrolled && MUI(TextField) = controlled component

React Hook Form은 **비제어(uncontrolled) 컴포넌트를 사용하는 라이브러리**입니다. 이는 React의 기본 제어(controlled) 컴포넌트와는 다른 접근 방식을 가지고 있습니다. 반면, Material-UI(MUI)는 React를 기반으로 한 UI 라이브러리입니다. MUI의 컴포넌트는 **제어 컴포넌트(controlled component)로 구현**되어 있습니다. 예를 들어, `TextField` 컴포넌트는 내부적으로 상태를 가지고 있으며, 값을 업데이트하려면 `onChange` 이벤트 핸들러를 사용하여 상태를 업데이트해야 합니다.

이 둘을 같이 사용하기 위해서는 react-hook-form의 Controller를 사용하면 됩니다. 정확히 말하면, react-hook-form의 Controller 컴포넌트를 사용할 때에도 실제로 state를 업데이트하는 것은 동일합니다. Controller 컴포넌트는 react-hook-form과 MUI를 연결해주는 역할을 수행하며, 내부적으로 상태를 관리합니다. Controller 컴포넌트를 사용하여 MUI 컴포넌트를 래핑하면, **react-hook-form이 해당 필드의 상태를 추적하고 필요한 경우에만 업데이트하는 장점을 그대로 이용할 수 있습니다. 이는 react-hook-form이 내부적으로 상태를 관리하고 필요한 부분만 리렌더링되기 때문입니다.**

따라서, react-hook-form의 Controller를 사용하면 여전히 필요한 부분만 업데이트되어 성능 이점을 얻을 수 있습니다. MUI 컴포넌트를 사용하면서도 react-hook-form의 성능 이점을 유지할 수 있는것입니다.

> 물론, Controller 컴포넌트를 사용하면 MUI 컴포넌트의 내부 상태를 업데이트하는 부분이 추가됩니다. 하지만 이는 MUI 컴포넌트의 내부 동작과 관련된 상태 업데이트로, react-hook-form이 필드의 상태를 추적하고 리렌더링하는 방식과는 별개입니다.

---

### [Controller](https://react-hook-form.com/docs/usecontroller/controller)
#### 💡Controller의 Props
`name(필수값)`: 입력의 고유한 이름입니다. ( 중복 등록 필요 ❌)
`control`: useForm을 호출하여 얻은 control 객체입니다. FormProvider를 사용하는 경우 선택적으로 사용할 수 있습니다.
`render(필수값)`: 렌더링을 위한 함수입니다. React 요소를 반환하고 이벤트와 값을 컴포넌트에 연결하는 역할을 합니다. 이를 통해 외부 제어 컴포넌트와 통합하는 것이 간소화되며, 일반적이지 않은 prop 이름을 사용할 수 있습니다. onChange, onBlur, name, ref 및 value를 자식 컴포넌트에 제공하고, fieldState 객체도 제공합니다.
`defaultValue(필수)`: defaultValues에 undefined를 적용할 수 없습니다.onChange를 undefined와 함께 호출하는 것은 올바르지 않습니다. 대신 기본값이나 초기화된 값으로 null이나 빈 문자열을 사용해야 합니다.
`rules`: register 옵션과 동일한 형식의 유효성 검사 규칙을 설정합니다.
`shouldUnregister`: 컴포넌트가 언마운트된 후에 등록을 취소하고 defaultValues도 제거할지 여부를 설정합니다. useFieldArray와 함께 사용할 때는 이 prop을 피해야 합니다. unregister 함수가 입력이 언마운트/리마운트 및 재정렬된 후에 호출되기 때문입니다.


#### 💡Controller render의 props인 field 객체
`field.onChange`: 입력값을 library로 전송하는 함수입니다. 입력의 onChange prop에 할당되어야 하며, 값은 undefined일 수 없습니다. **이 prop은 formState를 업데이트하며, 수동으로 setValue나 다른 field 업데이트와 관련된 API를 호출하는 것을 피해야 합니다.**
`field.onBlur`: 입력의 onBlur 이벤트를 library로 전송하는 함수입니다. 입력의 onBlur prop에 할당되어야 합니다.
`field.value`: 제어 컴포넌트의 현재 값입니다.
`field.name`: 등록된 입력의 이름입니다.
`field.ref`: hook form을 입력과 연결하기 위해 사용하는 ref입니다. hook form이 오류가 있는 입력에 포커스를 설정할 수 있도록 컴포넌트의 입력 ref에 ref를 할당해야 합니다.

🧐_ 근데 여기서 name 과 value의 역할은_❓
> `field.name`: React Hook Form은 **내부적으로 이 이름을 사용하여 필드를 등록하고 관리**합니다. 
`field.value`: Controller 컴포넌트가 control 객체와 함께 사용되면서 **value에 현재 폼 필드의 값을 할당하고 업데이트**합니다.



#### 💡Controller render의 props인 fieldState 객체

`fieldState.invalid`: 현재 입력에 대한 유효하지 않은 상태입니다.
`fieldState.isTouched`: 현재 제어 입력에 대한 터치 상태입니다.
`fieldState.isDirty`: 현재 제어 입력에 대한 변경된 상태입니다.
`fieldState.error`: 현재 입력에 대한 오류입니다.
`formState.isDirty`: 사용자가 입력 중 하나라도 수정한 경우 true로 설정됩니다. useForm에서 모든 입력의 defaultValues를 제공해야 하므로 form이 변경된 상태인지 비교할 수 있습니다.
`formState.dirtyFields`: 사용자가 수정한 필드의 객체입니다. useForm을 통해 모든 입력의 defaultValues를 제공해야 하므로 라이브러리가 defaultValues와 비교할 수 있습니다. dirtyFields는 isDirty formState로 표시되지 않습니다. 왜냐하면 dirtyFields는 전체 폼이 아닌 개별 필드 수준에서 필드가 변경되었음을 표시하기 때문입니다. 전체 폼 상태를 확인하려면 isDirty를 사용해야 합니다.
`formState.touchedFields`: 사용자가 상호작용한 모든 입력을 포함하는 객체입니다.
`formState.defaultValues`: useForm의 defaultValues에 설정된 값 또는 reset API를 통해 업데이트된 defaultValues입니다.
`formState.isSubmitted`: 폼이 제출된 후에 true로 설정됩니다. reset 메서드가 호출될 때까지 true 상태를 유지합니다.
`formState.isSubmitSuccessful`: 런타임 오류 없이 폼이 성공적으로 제출된 것을 나타냅니다.
`formState.isSubmitting`: 폼이 현재 제출 중인 경우 true로 설정됩니다. 그렇지 않으면 false입니다.
`formState.isLoading`: 현재 비동기 defaultValues를로드하는 경우 true입니다. 이 prop은 비동기 defaultValues에만 적용됩니다.
`formState.submitCount`: 폼이 제출된 횟수입니다.
`formState.isValid`: 오류가 없는 경우 true로 설정됩니다. setError는 isValid formState에 영향을 주지 않으며, isValid는 항상 전체 폼 유효성 검사 결과를 기준으로 파생됩니다.
`formState.isValidating`: 검증 중일 때 true로 설정됩니다.
`formState.errors`: 필드 오류를 포함하는 객체입니다. 간편하게 오류 메시지를 검색할 수 있는 ErrorMessage 컴포넌트도 있습니다.

---

### [useController](https://react-hook-form.com/docs/usecontroller)(Controller를 구현하기 위해 사용되는 커스텀 훅)

```jsx
import { TextField } from "@material-ui/core";
import { useController, useForm } from "react-hook-form";

function Input({ control, name }) {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <TextField 
      onChange={field.onChange} // send value to hook form 
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value} // input value
      name={field.name} // send down the input name
      inputRef={field.ref} // send input ref, so we can focus on input when error appear
    />
  );
}
```

_* 하나의 컴포넌트에는 **일반적으로 하나의 useController만 사용하는 것이 이상적**입니다. 여러 개의 useController를 사용해야 하는 경우, 각각의 field를 구분하기 위해 prop 이름을 변경해야 합니다. 또는 Controller 컴포넌트를 사용하는 것도 고려할 수 있습니다._


