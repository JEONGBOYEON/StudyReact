## VueX 도입

### VueX Installation(CDN)
```javascript
<script src="https://unpkg.com/vuex"></script> 
```

### Store 생성
VueX에서는 Store라는 저장소에 컴포넌트 간 공유할 data 속성인 state를 정의합니다. 이렇게 정의한 state 데이터를 변경할 수 있는 로직을 각각 Component에서 정의할 수도 있지만, 공통되는 로직을 매번 따로 정의할 경우, 가독성이 떨어지고 성능이 떨어질 수 있습니다. 따라서 Mutations, Actions, Getters 를 사용하여 공통으로 사용되는 로직을 한곳에서 관리합니다.

이 3가지는 공통으로 사용되는 로직을 한곳에서 관리한다는 공통점이 가지지만, 아래와 같은 차이점을 가지고 있습니다.

| Mutations | Actions |  Getters |
|-----------|---------|:--------:|
| method    | method  | Computed |
| 동기      | 비동기  |          |

<!-- https://www.tablesgenerator.com/markdown_tables -->

<details>
<summary>computed & methods</summary>

- computed : 계산해야하는 목표 데이터를 정의 하는 ‘선언형’ 프로그래밍 방식. 저장된 결과(캐싱)를 반환하므로 종속 대상의 변경이 일어나기 전까지 호출 되지 않는다.
- methods : 렌더링이 일어날 때마다 항상 함수를 실행한다.
</details>

```javascript
//fss/js/vue/store/index.js

const { createStore } = Vuex;

export const store = createStore({
    state: {
        message: "Hello Vue!",
        count: 1,
    },
    getters: {
        getStates(state) {
            return state.message + state.count;
        }
    },
    mutations: {
        increment(state){
            state.count += 1;
        }
    },
    actions: {
        incrementAsync ({ commit }) {
            setTimeout(() => {
                //actions 내부에서 mutation을 호출(commit)
                commit('increment')
            }, 1000)
        }
    }
});
```
![image](https://user-images.githubusercontent.com/32887635/206720171-d7a7c3d7-455e-4dc7-8117-ca8a8c72f6db.png)

### Store 연결
```javascript
const app = createApp({ /* your root component */ })

//use를 통해 app에 vuex store를 연결
app.use(store)
```

### Store 사용
```javascript
// 1. state 사용
// store.state.state-name
<div>{{store.state.name}}</div>

// 2. getters 사용
// store.getters["getter-name"]
const countAResult = computed(()=>{
    return store.getters["getStates"];
});

// 3. actions 사용
// store.dispatch("action-name");
store.dispatch("incrementAsync");

// 4. mutataions 사용
// store.commit("mutataions-name");
store.commit("increment");
```

<details>
<summary>전체 코드</summary>

```javascript
  <body>
  <div>
    <h1>Vuex Basic Example</h1>
    <h1>{{ resultValue }}</h1>
    <button @click="incrementCount()" style="width: 80px">Button</button>
  </div>
    
  <script src="https://unpkg.com/vue@3"></script>
  <script src="https://unpkg.com/vuex"></script>
  
  <script type="module">
    import { store }  from "/fss/js/vue/store/index.js";
    const { createApp, computed } = Vue;
    const { useStore } = Vuex;
  
    createApp({
      setup() {
        const store = useStore();
  
        //getters는 computed에서 호출
        //store.getters.[getter-name]
        const resultValue = computed(()=>{
          return store.getters.getStates;
        });
  
        const incrementCount = () => {
          //mutations, actions은 method로 호출
          
          //mutations: store.commit('mutations-name')
          store.commit('increment');
          
          //actions: store.dispatch('action-name')
          store.dispatch('incrementAsync');
        }
  
        return {
          store,
          resultValue,
          incrementCount
        };
      },
      data() {
        return {
        };
      },
    }).use(store).mount("#app");
  </script>
</body>
```
</details>

### Devtools 활용
**state, getters**

Vue > Vuex tab에서 확인 가능
![image](https://user-images.githubusercontent.com/32887635/206720450-ad79260e-40ac-4c52-bcfc-1d7b0ce59049.png)

**mutatoins, actions**

Vue > Timeline Tab에서 확인 가능
![image](https://user-images.githubusercontent.com/32887635/206720549-f8498d60-ec26-42da-a26b-25f63925398c.png)
![image](https://user-images.githubusercontent.com/32887635/206720614-d6c9e7e9-dbf1-4ad5-bfd8-0214e25f2bca.png)

---

## VueX 모듈화

### 1. VueX 기본 modules
```
store
├─ index.js
├─ actions.js
├─ mutation.js
```

**index.js**

```javascript
const { createStore } = Vuex;
import getters from "/fss/js/vue/store/getters.js";
import mutations from "/fss/js/vue/store/mutations.js";
import actions from "/fss/js/vue/store/actions.js";


export const store = createStore({
    state: {
        message: "Hello Vue!",
        count: 1,
    },
    getters,
    mutations,
    actions,
});
```

**actions.js**

```javascript
export default {
    incrementAsync ({ commit }) {
        setTimeout(() => {
            commit('increment')
        }, 1000)
    }
}
```

**mutation.js**

```javascript
export default {
    increment(state){
        state.count += 1;
    }
}
```

**getters.js**

```javascript
export default {
    getStates(state) {
        return state.message + state.count;
    }
}
```

### 2. VueX namespaced modules

```
store
├─ index.js
├─ countA
│  ├─ actions.js
│  ├─ mutations.js
│  ├─ index.js
│
├─ countB
   ├─ actions.js
   ├─ mutations.js
   ├─ index.js
```

**countA/index.js**

```javascript
import { getters } from "/fss/js/vue/vuexStoreModule/countA/getters.js";
import { mutations } from "/fss/js/vue/vuexStoreModule/countA/mutations.js";
import { actions } from "/fss/js/vue/vuexStoreModule/countA/actions.js";

export const countA = {
    namespaced: true,
    state: {
        name: 'countA',
        count: 3,
    },
    getters,
    mutations,
    actions
};
```

**countB/index.js**

```javascript
import { getters } from "/fss/js/vue/vuexStoreModule/countB/getters.js";
import { mutations } from "/fss/js/vue/vuexStoreModule/countB/mutations.js";
import { actions } from "/fss/js/vue/vuexStoreModule/countB/actions.js";

export const countB = {
    namespaced: true,
    state: {
        name: 'countB',
        count: 5,
    },
    getters,
    mutations,
    actions
};
```

**store/index.js**

```javascript
const { createStore } = Vuex;
import { countA } from "/fss/js/vue/vuexStoreModule/countA/index.js";
import { countB } from "/fss/js/vue/vuexStoreModule/countB/index.js";

export const store = createStore({
    modules: {
        countA,
        countB
    }
});
```

**namespaced modules VueX Store 사용**

```javascript
// 1. state 사용
// store.state.[module-name].[state-name]
<div>{{store.state.countA.name}}</div>

// 2. getters 사용
// store.getters[module-name/getter-name]
const countAResult = computed(()=>{
    return store.getters["countA/getStates"];
});

// 3. actions 사용
// store.dispatch[module-name/getter-name]
store.dispatch('countA/incrementAsync');

// 4. mutataions 사용
// store.commit[module-name/getter-name]
store.commit("countA/increment");
```



<details>
<summary>전체 코드</summary>

```javascript
  const { useStore } = Vuex;
const { computed } = Vue;

export default {
    setup() {
        const store = useStore();

        // module의 getters
        // store.getters[module-name/getter-name]
        const countAResult = computed(()=>{
            return store.getters["countA/getStates"];
        });
        const countBResult = computed(()=>{
            return store.getters["countB/getStates"];
        });


        // module의 actions
        // store.dispatch[module-name/getter-name]
        // module의 mutations
        // store.commit[module-name/getter-name]
        const incrementCountA = () => {
            store.dispatch('countA/incrementAsync');
            store.commit("countA/increment");
        }
        const incrementCountB = () => {
            store.dispatch('countB/incrementAsync');
            store.commit("countB/increment");
        }

        return {
            store,
            countAResult,
            countBResult,
            incrementCountA,
            incrementCountB,
        };
    },
    template: `
      <div>
        <h2>Vuex Modules Example</h2>
        <br><br>
        
        <!--    countA Module     -->
        <h2>CountA Module</h2>
        <!--     module의 state      -->
        <!--     store.state.[module-name].[state-name]   -->
        <div>{{store.state.countA.name}}</div>
        <div>{{countAResult}}</div>
        <button @click="incrementCountA()" style="width: 80px">Button</button>

        <!--    countB Module     -->
        <br><br>
        <h2>CountB Module</h2>
        <span>{{store.state.countB.name}}</span>
        <div>{{countBResult}}</div>
        <button @click="incrementCountB()" style="width: 80px">Button</button>
    
        <hr style="width='100%' " />
    
      </div>
    `
};
```
</details>

### namespaced modules devtools 활용
![image](https://user-images.githubusercontent.com/32887635/206721623-19d096e6-e432-473f-953f-d48b977f4c55.png)
![image](https://user-images.githubusercontent.com/32887635/206721630-03fcfa30-06a9-4d2a-a2f4-7ba01b89f525.png)
![image](https://user-images.githubusercontent.com/32887635/206721648-7b9f85ac-7ac7-498b-9db4-e101e9aa2ccd.png)

---

### 마무리
지금까지 VueX 가이드 문서였습니다.

감사합니다.



