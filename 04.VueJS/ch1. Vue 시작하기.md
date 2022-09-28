# Vue 시작하기

## 시작하기

### CDN

[CDN 복사 링크](https://v3.ko.vuejs.org/guide/installation.html#vue-devtools)

1. Vue의 createApp() 매소드와 체이닝을 통해 mount() 매소드를 실행시킵니다. mount매소드의 인수로는 연결할 요소의 아이디값을 넣어줍니다.

```html
<div id="app"></div>
```

```javascript
// cdn
<script src="https://unpkg.com/vue@next"></script>
Vue.createdApp().mount(#id)
```

2. createdApp의 인수로 객체를 넣어주고 안에 매소드를 작성해준다. 아래의 코드 처럼 구성해주면 데이터가 바로 html에 적용이 된다. 이를 반응성이라고 부르며 이런 반응성 때문에 이러한 프레임워크들이 유용하게 쓰일수 있는것

```html
<div id="app">
  <h1>{{message}}</h1>
</div>
```

```javascript
Vue.createdApp({
    data(){
        return{
            message: "hi"
        }
    }
}).mount(#id)
```

## CLI(Command-Line Interface)

- vue라는 파일의 코드 하이라이팅을 위해서는 Vetur라는 확장프로그램을 깔아주어야 한다.

1. npm으로 vuecli를 전역설치: 전역 설치를 해야 vue라는 명령어를 어디서든 사용할 수 있다.
   > npm install -g @vue/cli
2. vue project 만들기

   > vue create [project-이름]

3. Vue의 createApp() 매소드와 체이닝을 통해 mount() 매소드를 실행시킵니다. mount매소드의 인수로는 연결할 요소의 아이디값을 넣어줍니다.

```html
<div id="app"></div>
```

```javascript
import { createApp } from "vue";
import { App } from "./App.vue";
createApp().mount("#app");
```

4. createApp의 인수로 넘겨준 App.vue파일은 Template(html), script, style영역으로 나누어져 있습니다.

App.vue 내부에서는 component라는 vue파일을 한번 더 import하며 component 객체에 포함하여 App.vue파일은 export default로 객체 데이터를 내보내줍니다.

template단에서 {{}}형태로 vue의 데이터를 반응형으로 보여주는 방법은 선언적 랜더링이라고 부르며, increase 함수 부분을 호출해주는 @click와 같은 부분을 입력 핸들링 이라고 부릅니다.

```vue
<template>
<h1 @click="increase">
{{count}}
</h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
    name: 'App',
    component: {
        HelloWorld
    },
    data(){
        return count:0
    },
    methods:{
        increase(){
            this.count+=1;
        }
    }
}
</script>

<style>
<style>
```
