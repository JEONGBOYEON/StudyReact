# Components

## Components 등록

component는 app.Components([이름]){}으로 등록해야 합니다. 이때 name은 kebab-case or 파스칼 케이스록 작성해야 합니다.

### 전역등록

전역으로 등록을 하게 되면 모든 템플릿 내부에 사용될 수 있습니다. 이는 모든 하위 컴포넌트에도 마찬가지로 적용되며, 이 세 개의 컴포넌트는 다시 서로의 내부에서 사용될 수 있습니다.

```javascript
const app = Vue.createApp({});

app.component("component-a", {
  /* ... */
});
app.component("component-b", {
  /* ... */
});
app.component("component-c", {
  /* ... */
});

app.mount("#app");
```

```html
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```

### 지역등록

전역 등록으로 컴포넌트들을 등록할 경우 컴포넌트를 사용하지 않더라도 계속해서 최종 빌드에 해당 컴포넌트가 포함되는 것을 의미하기 때문에 사용자가 다운로드하는 자바스크립트 파일의 크기를 불필요하게 증가시킵니다. 따라서 아래와 같이 객체로 정의하면 지역으로 필요한 부분에서만 사용할 수 있습니다.

```javascript
const ComponentA = {
  /* ... */
};
const ComponentB = {
  /* ... */
};
const ComponentC = {
  /* ... */
};
```

```javascript
// components 옵션으로 정의
const app = Vue.createApp({
  components: {
    "component-a": ComponentA,
    "component-b": ComponentB,
  },
});
```

### ES6 지역등록

```javascript
import ComponentA from "./ComponentA.vue";

export default {
  components: {
    ComponentA,
  },
  // ...
};
```

<!--
## Props
Props를 이용하면 자식 컴포넌트에게 데이터를 전달할 수 있습니다.

## Slot -->

## Non-Prop 속성와 속성 상속

Non-Prop 속성이란 props나 emits에 정의된 특성을 지니고 있지 않은 속성(예: class, style, v-on 리스너 등)을 의미합니다. 이에 대한 일반적인 예로 class, style, id 속성이 있습니다. 이러한 속성들은 $attrs 프로퍼티를 통해 접근할 수 있습니다.

자식 컴포넌트를 사용하는 부모에서 이러한 Non-Prop을 주게 되면 자동으로 자식 컴포넌트에 적용이 되는데 이때 자식 컴포넌트의 최상위 컴포넌트에 적용이 됩니다. 만약 최상위 컴포넌트가 두개 이상이라면 적용이 되지 않아 사용하기 위해서는 따로 설정(v-bind="$attrs")이 필요합니다.

### 최상위 컴포넌트가 1개인 경우

\*부모

```vue
<template>
  // 클래스 속성이 자식 컴포넌트로 넘어간다
  <HelloWorld message="HelloHEROPY" class="active" />
</template>

<script>
import HelloWorld from "~/components/HelloWorld.vue";

export default {
  components: {
    HelloWorld,
  },
};
</script>
```

\*자식 컴포넌트 : HelloWorld

```vue
<template>
  // 클래스를 따로 지정해주지 않아도 부모에서 작성한 클래스가 상속된다.
  class="active"
  <div>{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  color: red;
}
</style>
```

### 최상위 컴포넌트가 2개 이상인 경우

\*부모

```vue
<template>
  // 클래스 속성이 자식 컴포넌트로 넘어간다
  <HelloWorld message="HelloHEROPY" class="active" />
</template>

<script>
import HelloWorld from "~/components/HelloWorld.vue";

export default {
  components: {
    HelloWorld,
  },
};
</script>
```

\*자식 컴포넌트 : HelloWorld

```vue
<template>
  <div>{{ message }}</div>
  <h1 v-bind="$attrs">12</h1>
</template>

<style lang="scss" scoped>
.active {
  color: red;
}
</style>
```

### 상속받고 싶지 않은 경우

만약 컴포넌트가 속성을 자동으로 상속하지 않도록 하려면, 자식 컴포넌트 옵션에서 inheritAttrs: false를 설정하세요.

속성 상속을 비활성화하는 일반적인 시나리오는 속성을 루트 노드 이외의 다른 엘리먼트들에 적용해야 하는 경우입니다. 따라서 $attrs 속성을 사용하여 다른 엘리먼트에 속성을 적용하도록 제어할 수 있습니다.

```vue
<template>
  <div>
    <h1 :class="$attrs.class" :style="$attrs.style">12</h1>
    <h1 v-bind="$attrs">12</h1>
    {{ message }}
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>
```

```javascript

```

```html

```

```javascript

```

```html

```

## Props와 Slot
