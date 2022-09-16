# Node.js 개요 및 설치

## Node.js
Node.js은 Chrome V8 javaScript 엔진으로 만들어진 javaScript 런타임 입니다.
* 런타임 : 프로그래밍 언어가 동작하는 환경

### 런타임 환경 종류
1. node.js가 설치된 컴퓨터
2. Chrome과 같은 브라우저

### node.js가 필요한 이유
HTML, CSS, JS이외에 SCSS, EJS, BABEL 등 다양한 도구들을 사용할 수 있기 위해서는 명령어를 실행시켜 HTML, CSS, JS로 변환해야 하는데, 이를 도와주는 환경이 node.js 입니다.

### node.js 버전
1. LTS(짝수): Long Term Supported, 최신버전은 아니지만 안정적이고 신뢰도가 높아 제품화 과정에서 유용하게 사용 가능합니다.
2. 최신 버전(홀수)


## NVM

### NVM(node version manager) 설치
다양한 node version을 사용할 수 있도록 도와주는 도구입니다.
[NVM mac install](https://github.com/nvm-sh/nvm)
[NVM window install > nvm-setup.zip](https://github.com/coreybutler/nvm-windows/releases)
```shell
nvm --version
```

### NVM(node version manager)으로 node.js 설치
```shell
# 설치되어 있는 node.js 확인 가능
nvm ls
# 버전 설치 및 선택
nvm install [버전]
nvm use [버전]
# 버전 삭제
nvm uninstall [버전]
# 여러가지 명령어 확인
nvm --help
```

## NPM

### npm 개요
NPM(Node Package Manager)은 Node.js 환경에서 전 세계 개발자들이 만든 다양한 기능인 Package, Modul 들을 관리해주는 매니저입니다.
* node.js를 설치했다면 자동으로 설치됨

### npm 으로 프로젝트 생성 및 Pacakge 설치
```shell
# package.json 생성
npm init -y
# parcel-bundler Pacakge 설치, 
# 개발용 의존성 패키지(-D, --save-dev)
# 개발할 때만 도움을 받는 용도
npm install parcel-bundler -D
# loadash Pacakge 설치
# 일반 의존성 설치
# 웹 브라우저에서도 동작 할 수 있음
npm install loadash
```

이처럼 Pacakg들을 설치하면 package.json의 dependencies에 버전과 설치된 목록이 작성됩니다. 따라서 만약 node_modules라는 폴더를 삭제하더라도 npm install 이라는 명령어를 통해 다시 설치할 수 있습니다.
* package-lock.json은 설치된 package 내부의 필요한 package들을 자동으로 관리합니다.

## parcel-bundler

### parcel-bundler 실행
parcel-bundler 기존에 많이 사용하던 Webpack이나 Gulp와 다르게 별도 설정 없어도 빠르게 빌드가 가능합니다. 따라서 빌드를 위해 번들러를 학습하는 시간을 많이 줄일 수 있습니다.

>번들러란 쉽게 말하자면, 많은 파일들이 생기는 프로젝트에서 여러 파일들을 하나의 파일로 묶어주어 네트워크의 응답속도도 빠르게 도와주며 파일간의 병목현상을 없애주고 유지보수를 올려주는 역할을 합니다.

parcel-bundler는 개발용 의존성 패키지 이기 때문에 프로젝트 내부에서만 사용 가능하다. 따라서 터미널에서 동작할 수 있도록 package.json의 script를 추가해주어 사용해야 한다.

```json
  "scripts": {
    "dev": "parcel index.html"
  },
```
```shell
npm run dev
```

### parcel-bundler build

```json
  "scripts": {
    "build" : "parcel build index.html"
  },
```
```shell
npm run build
```

build를 실행시키면 dist라는 폴더가 생성되고 해당 폴더에 난독화된 파일들이 생성됩니다. 이 파일들을 개발자가 보는 용도가 아닌 웹 브라우저에서 동작시키는 용도 이기 때문에 난독화(압축)가 진행됩니다.

## lodash

### lodash 개요 및 실행
Lodash(로대쉬)는 JavaScript의 인기있는 라이브러리 중 하나로 제이쿼리, 리액트와 같이 전세계적으로 가장 많이 사용되는 라이브러리입니다.

Jquery가 자바스크립트 DOM을 간편하게 다루기 위해 탄생했듯이, Lodash는 주로 array, collection, date 같은 데이터의 구조를 간편하게 함수형으로 다룰 수 있게 하기 위해서 탄생했습니다.

```js
import _ from 'lodash';

console.log(_.camelCase('hello world'));
```

### lodash와 ES6문법 장단점
lodash와 ES6문법의 성능을 비교해보면 ES6문법의 성능이 빠르다는 것을 확인할 수 있습니다. 그렇지만 lodash를 사용할 경우 함수의 확장성이 높아지기 때문에 무겁더라도 사용하는 경우가 있습니다. 

![image](https://user-images.githubusercontent.com/32887635/190570260-65ffbb6f-4863-4c3b-8251-ea986fcd6391.png)

[find() 성능 비교 하기](https://measurethat.net/Benchmarks/Show/4831/0/native-find-vs-lodash-find#latest_results_block)

[참고](https://inpa.tistory.com/entry/LODASH-%F0%9F%93%9A-Lodash-vs-ES6-%EC%84%A4%EC%B9%98-%EC%9B%90%EB%A6%AC)


## 유의적 버전(Sematic Versioning,SemVer)
SemVer이란, 버전에 의미가 있음 버전을 의미합니다. 
```
^Major.Minor.Path

1. Major: 기존 버전과 호환되지 않는 새로운 버전
2. Minor: 기존 버전과 호환되는 새로운 기능이 추가된 버전
3. Path: 기존 버전과 호환되는 버그 및 오타 등이 수정된 버전
* ^: Minor, Path버전을 최신 버전으로 업그레이드 할 것(실제 명시된 버전과 설치된 버전의 Minor, Path가 다를 수 있다.)
```

## .gitignore
버전관리가 필요없는 파일들을 무시하고 git에 올릴 수 있습니다. 





<!-- 샘플 -->

##

### 

```javascript

```
