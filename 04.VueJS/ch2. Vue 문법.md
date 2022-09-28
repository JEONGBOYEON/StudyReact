# Vue 문법

## 어플리케이션 인스턴스 생성하기

[자세히보기](https://v3.ko.vuejs.org/guide/instance.html#%E1%84%8B%E1%85%A5%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8F%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB-%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%86%AB%E1%84%89%E1%85%B3-%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)

모든 vue는 createApp 함수를 사용해서 새로운 어플리케이션 인스턴스를 생성합니다. 인스턴스 생성후 html에 마운트를 시키고 싶다면 해당하는 아이디를 mount 매소드에 전달하여 mount 할 수 있습니다.

\*대부분의 매소드들은 동일한 인스턴스를 반환하기 때문에 체이닝을 허용합니다.

### root(최상위) 컴포넌트

vue는 createApp으로 전달된 부분을 이 애플리케이션을 mounte 할때 랜더링의 시작점으로 사용한다. 이에 해당하는 컴포넌트를 루트 컴포넌트라고 부른다. 이 루트 컴포넌트에 **추가적인 컴포넌트들을 연결**해서 사용할 수 있다.

### Lifecycle Hooks

![image](https://user-images.githubusercontent.com/32887635/192659418-32e71312-b3f7-487a-8456-2fa997ea2a94.png)

1. beforeCreate
   : event & lifecycle 초기화 후

2. created
   : injections & reactivity 초기화 후
   : data: {return}의 값들을 읽을 수 있다.

3. beforeMount
   : DOM node에 vue가 연결되는 직전

4. mounted
   : DOM node에 vue가 연결되는 직후

5. beforeUpdate
   : 만약 데이터가 바뀌게 되면 Virtual DOM 을 생성하여 바뀌기 전의 DOM과 비교한 후 Virtual DOM으로 re-rendered되는데 그 진전에 호출

6. updated
   : Virtual DOM으로 re-rendered된 직후

7. beforeUnmount
   : unmount()라는 매소드가 실행되면 vue와 html의 연결이 끊어지게 되는데 unmount()라는 매소드가 실행된 후 끊어지기 직전

8. unmounted
   : unmount()라는 매소드가 실행된 후 끊어진 직후

## 템플릿 문법

1. 문자열: {{}}, Mustache(머스테치), 보관법(interpolation)

   > v-once, v-html="data"

2. html의 속성에는 Mustache(머스테치)를 사용할 수 없기 때문에 아래 문법을 사용해야 합니다.

- 속성: v-bind:(:)
- 이벤트: @v-on(@)
- attribute 이름: :[]
- 이벤트 이름: @[]

## Computed

vue JS 속성인 Computed는 계산된 데이터라고 볼 수 있는데요, 템플릿 안에서 너무 많은 연산을 하면 코드가 비대해지고 유지보수가 어렵기 때문에 간단한 연산을 위해서는 Computed 사용해야 합니다.

Computed는 각각 생성될때 매소드로 생성이 되자만 값으로 인식이 되기 때문에 호출할때는 변수처럼 호출을 해주어야 합니다.(매소드 실행 xx) 또한, 반드시 결과값을 return 해주어야 합니다.

```javascript
Vue.createApp({
  data() {
    return {
      author: {
        name: '존 도우',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  method:{

  },
  computed: {
    // computed getter
    publishedBooksMessage() {
      // 여기서의 `this` 는 vm 인스턴스이다.
      return this.author.books.length > 0 ? '있음' : '없음'
    }
    publishedBookNameValue() {
      // 여기서의 `this` 는 vm 인스턴스이다.
      return this.author.name === '' false : true
    }
  }
}).mount('#computed-basics')
```

```html
<div id="computed-basics">
  <p>출판된 책:</p>
  <span>{{ publishedBooksMessage }}</span>
  <section v-if="publishedBookNameValue">
  <span>{{ author.name }}</span>
  <p>작가:</p>
  <section>
</div>
```

### Computed 캐싱

Computed는 **Computed 캐싱**이라는 기능을 가지고 있기 떄문에 한번 연산한 데이터는 만약 의존하는 값에 변화가 없다면 다시 조회할때 재 연산이 이루어지지 않습니다. 따라서

### Computed Getter, Setter

computed 프로퍼티는 기본적으로 getter 만 가지고 있지만, 필요하다면 setter 를 지정하는 것도 가능합니다. 그러기 위해서는 computed 프로퍼티를 get 과 set 두가지 프로퍼티를 가진 object 로 변경해주어야 합니다. 두 프로퍼티 (또는 메서드로도 사용 가능합니다)는 우리가 computed 프로퍼티를 사용할 때, get 은 값을 확인/가져올 때, set 은 값을 설정/변경할 때 사용됩니다.

```javascript
computed: {
  fullName: {
    get: function () { ... },        // get () { ... }
    set: function (newValue) { ...}  // set () { ... }
  }
}
```

## 클래스와 스타일 바인딩

1. 객체구문

```html
<div :class="{ active: isActive }"></div>
<!-- 여러연산도 객체로 표현 가능 아래의 결과로는 class="static active" 이렇게
랜더링 됩니다. -->
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
데이터가 객체 자체인 값으로도 연산 및 랜더링 가능, 아래의 경우 class="active
text-danger" 로 렌더링
<div :class="classObject"></div>
```

```javascript
data() {
  return {
    isActive: true,
    hasError: false,
    classObject: {
      active: true,
      'text-danger': true
    }
  }
}
```

### 배열 구문

```html
<div :class="[activeClass, errorClass]"></div>
<!-- 배열, 객체 구문 동시 사용 가능 -->
<div :class="[{ active: isActive }, errorClass]"></div>
```

```javascript
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

### 인라인 스타일 바인딩하기

인라인 스타일도 데이터 바인딩으로 가능하다.

```html
<div :style="styleObject"></div>
```

> 출처 : https://v3.ko.vuejs.org/guide/class-and-style.html#%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB-%E1%84%89%E1%85%B3%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF-%E1%84%87%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5

## 조건부 랜더링

### v-if

v-if
v-else-if
v-else

\*v-if를 사용하면 랜더링 자체가 되지 않는다. 따라서 일반 요소 대신 template 요소를 사용하여 범위를 묶어서 사용할 수 있다.

```html
<template>
  <template v-if="isShow">
    <h1></h1>
    <p></p>
    <p></p>
  </template>
</template>
```

### v-show

v-show: 구조적으로 랜더링은 하기 때문에 DOM에는 남아있지만 dispaly: none 속성을 가짐(출력은 안된다)
\*template 사용 불가

### 비교

v-if는 전환되는 비용(성능적)비용이 높은 편이고, v-show는 초기 렌더링 비용이 높다. 따라서 자주 전환되는 화면이라면 v-show를 사용하는것이 더 좋다.

## 리스트 랜더링

### 배열 함수

push()
pop()
shift() : 앞쪽 빼기
unshift() : 앞쪽 밀어넣기
splice()
sort()
reverse()
filter()
concat()

## 이벤트 핸들링

### preventDefault()

a 태그나 submit 태그는 누르게 되면 href 를 통해 이동하거나 , 창이 새로고침하여 실행됩니다.
preventDefault 를 통해 이러한 html 태그의 기본적이 동작을 막아줄 수 있습니다.

```html
<template>
  <a href="https//naver.com" target="_blank" @click="handler"> Naver </a>
</template>
```

```javascript
export default {
  methods: {
    handler(e) {
      e.preventDefault();
      console.log(Naver);
    },
  },
};
```

### target, curretTarget

target은 실제 이벤트가 발생된 요소를 의미
curretTarget은 이벤트 핸들러가 걸려있는 요소를 의미

### 이벤트 수식어

.stop : 이벤트 버블링 방지(StopPropagation(), 프로파게이션 대신 사용)
.prevent : preventDefault() 대신 사용 가능
.capture : 캡쳐링 실행
.self : 겹쳐진 부분 무시하고 정확히 자신의 영역의 경우만 핸들러 동작(target, curretTarget이 같은 경우만 실행)
.once : 이벤트가 발생해도 핸들러가 한번만 실행
.passive : 실제 이벤트와 핸들러의 로직 수행을 독립시켜준다. (ex, @wheel), 5배 이상 성능이 좋아질수 있음

\*위에 수식어들은 체이닝 가능

```html
<template>
  <a href="https//naver.com" target="_blank" @click.prevent.once="handler">
    Naver
  </a>
</template>
```

### 이벤트 수식어 - 키 수식어

event 객체안에는 키 수식어가 존재하는데 만약 이벤트가 발생되면 그 이벤트가 어떠한 이벤트인지 key 수식어에 저장이 됩니다. 따라서 일반적으로 event.key 형태로 사용할 수 있습니다.

```html
<template>
  <input type="text" @keydown="handler" />
</template>
```

```javascript
export default {
  method: {
    handler(e) {
      if (e.key === "enter") {
        console.log(finished);
      }
    },
  },
};
```

vue.js에서는 이러한 event의 key 수식어를 이벤트 핸들러 수식으로 사용할 수 있게 제공합니다. key이름의 카멜 케이스로 수식어로 붙여주면 됩니다.

```html
<template>
  <!-- enter일 경우에만 keydown 핸들러 호출 -->
  <input type="text" @keydown.enter="handler" />
  <!-- a가 입력되는 순간 경우에만 keydown 핸들러 호출 -->
  <input type="text" @keydown.a="handler" />
</template>
```

```javascript
export default {
  method: {
    handler(e) {
      console.log(finished);
    },
  },
};
```

## v-model 단방향 바인딩 > 양방향 바인딩

기존 아래의 코드는 vue에서 html로만 데이터를 전달해줄수 있다. 이를 **단방향 바인딩**이라고 부른다.

```html
<template>
  <h1>{{msg}}</h1>
  <input type="text" value="msg" />
</template>
```

```javascript
export default {
  data() {
    return {
      msg: "Hello",
    };
  },
};
```

그런데 이때 input이라는 이벤트를 연결해주게 되면 양방향 데이터 바인딩이 가능해진다. 이때 vue의 데이터에 $event.target.value를 직접 바인딩 해주어야 한다.

```html
<template>
  <h1>{{msg}}</h1>
  <input type="text" :value="msg" @input="msg = $event.target.value" />
</template>
```

```javascript
export default {
  data() {
    return {
      msg: "Hello",
    };
  },
};
```

이러한 양방향 바인딩을 vue.js에서는 v-model 디렉티브로 간단하게 사용할 수 있도록 제공해준다. 이때 기존 사용하던 :value, @input을 모두 제거해주어도 된다.

```html
<template>
  <h1>{{msg}}</h1>
  <input type="text" v-model="msg" />
</template>
```

```javascript
export default {
  data() {
    return {
      msg: "Hello",
    };
  },
};
```

이때 한글로 이 기능을 작동시키려고 하면 한 박자씩 데이터가 늦게 반응하여 들어가게 된다. 이유는 하나를 입력할때마다 데이터가 생성되는 것이 아닌 자음과 모음의 조합으로 데이터가 생성되기 때문이다. 이때는 초반과 같이 :value, @input을 사용해야 한다.

```html
<template>
  <h1>{{msg}}</h1>
  <input type="text" :value="msg" @input="msg = $event.target.value" />
</template>
```

```javascript
export default {
  data() {
    return {
      msg: "Hello",
    };
  },
};
```

## v-model 수식어

v-model에도 여러가지 수식어가 존재한다.

### .lazy

가장 먼저 @input이 아닌 @change라는 이벤트는 데이터가 입력 될때마다가 아닌 데이터가 변경이 완료된 후 발생하는 이벤트이다. 이를 v-model로 사용하기 위해서는 .lazy라는 수식어를 활용해야 한다.

```html
<template>
  <h1>{{msg}}</h1>
  <input type="text" :value="msg" v-model.lazy="msg" />
  <input type="text" :value="msg" @change="msg = $event.target.value" />
</template>
```

```javascript
export default {
  data() {
    return {
      msg: "Hello",
    };
  },
};
```

### .number

v-model은 기존적으로 데이터를 string으로 인식한다. 데이터를 number로 받아오고 싶다면 .number 수식어를 사용해야 한다.

### .trim
