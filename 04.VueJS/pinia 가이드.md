## Pinia 도입

### Pinia Installation(CDN)
```javascript
<script src="https://unpkg.com/vue-demi"></script>
<script src="https://unpkg.com/pinia"></script>
```

### Store 생성
**Optional**

```javascript
const { defineStore } = Pinia;

// store name은 use+'사용처'+Store으로 만드는것을 추천
// defineStore의 첫번째 argument는 devtools에서 connect할수 있는 unique id
export const useTestStore = defineStore('piniaTest', {
    state: () => ({
        count: 9,
        name: 'pinia'
    }),
    getters: {
        getStates(state) {
            return state.name + state.count;
        }
    },
    actions: {
        increment() {
            this.count++;
        },
        incrementAsync () {
            setTimeout(() => {
                this.count++;
            }, 1000)
        }
    },
})
```

**Composition API**

```javascript
const { defineStore } = Pinia;
const { computed, ref } = Vue;

export const useTestStore = defineStore('piniaTest', () => {

    // ref() > state
    const count = ref(9)
    const name = ref('pinia')
    
    // computed() > getters
    const getStates = computed(() => count.value + name.value)
    
    // function() > actions
    function increment() {
        count.value++
    }
    function incrementAsync() {
        setTimeout(() => {
            count.value++
        }, 1000)
    }

    return { count, name, getStates, increment, incrementAsync }
})
```

![image](https://user-images.githubusercontent.com/32887635/206722055-d63fd28f-f902-4623-8b53-3c369268228e.png)

**pinia 연결**

```javascript
const { createPinia } = Pinia;

const app = createApp({ /* your root component */ })
//use를 통해 app에 pinia를 연결
app.use(createPinia())
```

### Component에서 Store 사용

**Optional API**

```javascript
import { useTestStore } from "/fss/js/vue/piniaStore/useTestStore.js";
const { computed } = Vue;

export default {
    setup() {
        const store = useTestStore();

        const resultValue = computed(()=>{
            return store.getStates;
        });


        const incrementCount = () => {
            store.increment();
        }

        const incrementCountAsync = () => {
            store.incrementAsync();
        }

        return {
            store,
            resultValue,
            incrementCount,
            incrementCountAsync
        };
    },
    template: `
      <div>
        <h1>pinia Example</h1>
        <h3>name: {{ store.name }}</h3>
        <h3>count: {{ store.count }}</h3>
        <h3>{{ resultValue }}</h3>
        <br>
    
        <button @click="incrementCount()" style="width: 130px">Synchronous</button>    
        <br>    
        <br>    
        <button @click="incrementCountAsync()" style="width: 130px">Asynchronous</button>
        <hr style="width='100%' " />
    
      </div>
    `
};
```

**Composition API**

```javascript
import { useCompositionTestStore } from "/fss/js/vue/piniaStore/useCompositionTestStore.js";
const { computed } = Vue;

export default {
    setup() {
        const store = useCompositionTestStore();
        // 구조 분해 할당
        const { count, name, getStates, increment, incrementAsync } = store;

        const resultValue = computed(()=>{
            return store.getStates;
        });

        return {
            store,
            name,
            count,
            getStates,
            resultValue,
            increment,
            incrementAsync
        };
    },
    template: `
      <div>
        <h1>pinia Example</h1>
        <h3>name: {{ name }}</h3>
        <h3>count: {{ store.count }}</h3>
        <h3>{{ resultValue }}</h3>
        <br>
    
        <button @click="increment()" style="width: 130px">Synchronous</button>    
        <br>    
        <br>    
        <button @click="incrementAsync()" style="width: 130px">Asynchronous</button>
        <hr style="width='100%' " />
    
      </div>
    `
};
```

### Devtools 활용
**state, getters**

Vue > Vuex tab에서 확인 가능
![image](https://user-images.githubusercontent.com/32887635/206722209-f2baa740-ba0b-422e-8d56-477a6eca20c0.png)


**mutatoins, actions**

Vue > Timeline Tab에서 확인 가능


---


## Pinia multiple stores Example
```
store
├─ useCountAStore
├─ useCountBStore
```

### useCountAStore
```javascript
const { defineStore } = Pinia;
const { computed, ref } = Vue;

export const useCountAStore = defineStore('countA', () => {

    const count = ref(3)
    const name = ref('countA')
    
    const getStates = computed(() => count.value + name.value)
    
    function increment() {
        count.value += 3;
    }
    function incrementAsync() {
        setTimeout(() => {
            count.value += 3;
        }, 3000)
    }

    return { count, name, getStates, increment, incrementAsync }
})
```

### useCountBStore
```javascript
const { defineStore } = Pinia;
const { computed, ref } = Vue;

export const useCountBStore = defineStore('countB', () => {

    const countB = ref(5)
    const nameB = ref('countB')
    
    const getStatesB = computed(() => countB.value + nameB.value)
    
    function incrementB() {
        countB.value += 5;
    }
    function incrementAsyncB() {
        setTimeout(() => {
            countB.value += 5;
        }, 5000)
    }

    return { countB, nameB, getStatesB, incrementB, incrementAsyncB }
})
```

### pinia multiple stores 사용
```javascript
// 1. store들 import
import { useCountAStore } from "/fss/js/vue/piniaStore/useCountAStore.js";
import { useCountBStore } from "/fss/js/vue/piniaStore/useCountBStore.js";

// 2. store 및 프로퍼티 선언
const countAStore = useCountAStore();
const countBStore = useCountBStore();
//구조 분해 할당
const { count, name, getStates, increment, incrementAsync } = countAStore;
const { countB, nameB, getStatesB, incrementB, incrementAsyncB} = countBStore;

// 3. state 사용
<div>{{name}}</div>

// 4. getter 사용
// https://pinia.vuejs.org/core-concepts/getters.html#without-setup 참고
const resultValueA = computed( () => {
    return countAStore.getStates;
});

// 5. action 사용
const incrementCountA = () => {
    increment();
    incrementAsync();
}
```

<details>
<summary>전체 코드</summary>

```javascript
import { useCountAStore } from "/fss/js/vue/piniaStore/useCountAStore.js";
import { useCountBStore } from "/fss/js/vue/piniaStore/useCountBStore.js";
const { computed } = Vue;

export default {
    setup() {
        const countAStore = useCountAStore();
        const countBStore = useCountBStore();

        //구조 분해 할당
        const { count, name, getStates, increment, incrementAsync } = countAStore;
        const { countB, nameB, getStatesB, incrementB, incrementAsyncB} = countBStore;

        const resultValueA = computed( () => {
            return countAStore.getStates;
        });

        const resultValueB = computed( () => {
            return countBStore.getStatesB;
        });

        const incrementCountA = () => {
            increment();
            incrementAsync();
        }

        const incrementCountB = () => {
            incrementB();
            incrementAsyncB();
        }

        return {
            countAStore,
            name,
            count,
            resultValueA,
            incrementCountA,

            countBStore,
            nameB,
            countB,
            resultValueB,
            incrementCountB,

        };
    },
    template: `
      <div>
        <h2>pinia Modules Example</h2>
        <br><br>
        
        <!--    countA Module     -->
        <h2>CountA Module</h2>
        <div>{{name}}</div>
        <div>{{resultValueA}}</div>
        <button @click="incrementCountA()" style="width: 80px">Button</button>

        <!--    countB Module     -->
        <br><br>
        <h2>CountB Module</h2>
        <span>{{nameB}}</span>
        <div>{{resultValueB}}</div>
        <button @click="incrementCountB()" style="width: 80px">Button</button>
    
        <hr style="width='100%' " />
    
      </div>
    `
};
```
</details>

---


## 마무리

지금까지 PINIA 가이드 문서였습니다.
감사합니다.

> https://pinia.vuejs.org/getting-started.html







