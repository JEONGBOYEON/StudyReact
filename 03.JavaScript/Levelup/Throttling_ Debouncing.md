# Debouncing, Throttling

이벤트 오버클럭(overclock-과도한 이벤트 발생)은 **리소스 사용량**을 증가시키기 때문에 성능 문제를 야기하고, 사용자 경험을 떨어뜨립니다. 예를 들어 스크롤 이벤트의 경우, 스크롤을 빨리 내리게 되면
3초 간격 내에 몇 천번 이상의 이벤트가 발생하게 되기 때문에
성능에 문제가 생기게 됩니다.

이러한 과도한 이벤트나 함수들의 빈도수를 줄여서 성능을 향상시키는 프로그래밍 기법 중, 자주 언급되는 두가지에 대해 알아보도록 하겠습니다.

## Throttling(쓰로틀링)

마지막 함수가 호출된 후 일정시간이 지나기 전에 다시 호출되지 않게 하는 기법으로, 여러번 실행되는 이벤트를 일정시간 동안 한번만 실행되게 합니다.

![image](https://user-images.githubusercontent.com/32887635/192080577-81b60db6-2a98-4ac4-910c-9c60d930ff8c.png)

```javascript
let timer;
document.querySelector("#input").addEventListener("input", function (e) {
  if (!timer) {
    // 타이머가 없을 경우에 타이머를 설정
    timer = setTimeout(function () {
      timer = null; // 타이머가 설정되있을 경우엔 아무동작도 하지 않음
      console.log("여기에 ajax 요청", e.target.value);
    }, 200);
  }
});
```

## Debouncing(더블링)

Debouncing은 계속 호출되는 함수들 중 제일 마지막 함수만 호출되게 하는 기법입니다. 따라서 가장 최신으로 실행된 이벤트를 실행되게 됩니다.

![image](https://user-images.githubusercontent.com/32887635/192080750-8d466b45-f0a8-45fe-9ce6-7e7132da7e86.png)

일정 이벤트들이 실행된 후에 정해둔 delay time 이 넘어가게 되면 이벤트를 실행시킵니다.

```javascript
let timer;
document.querySelector("#input").addEventListener("input", function (e) {
  if (timer) {
    clearTimeout(timer); // 타자 입력으로 이전 타이머 취소
  }
  timer = setTimeout(function () {
    // 새로운 타이머 설정
    console.log("여기에 ajax 요청", e.target.value);
  }, 200);
});
```

## 내장 함수

이렇게 직접 코드를 작성할 수도 있지만 lodash나 underscore와 같은 라이브러리에서도 내장함수로 구현되어 있기 때문에, 이를 이용하면 간편하게 함수 호출만으로도 동일한 기능을 수행할 수 있다.

> 참고 문서
> https://velog.io/@eassy/Throttling%EA%B3%BC-Debouncing
