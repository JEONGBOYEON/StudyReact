# JS 시작하기

## ECMAScript(ECMA, ES)
ES는 자바스크립트를 표준화 해주는 국제 표준화 기구를 의미합니다.

### ES6
ES6는 2015년에 만들어진 ES의 6버전입니다. 이 버전은 ECMAScript 2015 (ES2015)라고도 불립니다. 이 버전은 대규모로 바뀌었기 때문에 바로 전 버전이 ES5 버전과의 차이점을 잘 알아야 한다.

## project 시작하기(../project/js-test)

### project 생성 및 package 설치
```shell
npm init -y
npm install parcel-bundler -D
```

### parcel script 작성
```json
  "scripts": {
    "dev": "parcel index.html",
    "build" : "parcel build index.html"
  },
```

### 파일 생성
./index
./js/main.js