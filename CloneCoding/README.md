# Starbucks Clone-Coding

## 01. 시작하기 - 프로젝트 시작, 스타일 초기화, 파비콘

### ico -> png로 변환해서 해상도 올리기

```html
<link rel="icon" href="./favicon.png" />
```

### reset.css cdn 추가해서 기본적인 크롬 브라우저의 css 리셋해주기

[reset.css cdn](https://cdnjs.com/libraries/meyer-reset)구글링해서 두번째 혹은 첫번째꺼 가져다가 쓰기

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
  integrity="sha512-NmLkDIU1C/C88wi324HBc+S2kLhi08PN5GDeUVVVC/BVt/9Izdsc9SVeVfA1UZbY3sHUlDSyRXhCzHfr6hmPPw=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

## 02. 오픈 그래프와 트위터 카드

### 오픈 그래프(The Open Graph protocol)

웹페이지가 소셜 미디어(페이스북 등)로 공유될 때 우선적으로 활용되는 정보를 지정합니다. 예를 들어 카카오톡은 사이트의 링크를 공유하면 내부에서 웹페이지에 접속 후 최소한의 메타정보를 가져와 카드 형식으로 중요한 정보만 제공해줍니다.

<div align=center>
<img width="332" alt="image" src="https://user-images.githubusercontent.com/32887635/190332040-e2cb6c44-ad3e-4455-95ba-c7303b6fa07d.png">
</div>

```html
<!-- og: Open Graph 약어-->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Starbucks" />
<meta property="og:title" content="Starbucks Coffee Korea" />
<meta property="og:description" content="스타벅스는 세계에서 가장 큰 다국적 커피 전문점으로, 64개국에서 총 23,187개의 매점을 운영하고 있습니다." />
<meta property="og:image" content="./images/starbucks_seo.jpg" />
<meta property="og:url" content="https://starbuc
```

### 트위터 카드(Twitter Cards)

웹페이지가 소셜 미디어(트위터)로 공유될 때 우선적으로 활용되는 정보를 지정합니다.

```html
<meta property="twitter:card" content="summary" />
<meta property="twitter:site" content="Starbucks" />
<meta property="twitter:title" content="Starbucks Coffee Korea" />
<meta
  property="twitter:description"
  content="스타벅스는 세계에서 가장 큰 다국적 커피 전문점으로, 64개국에서 총 23,187개의 매점을 운영하고 있습니다."
/>
<meta property="twitter:image" content="./images/starbucks_seo.jpg" />
<meta property="twitter:url" content="https://starbucks.co.kr" />
```

## 03. Google Fonts

- [css>font]()
  [Google Fonts](https://fonts.google.com/) > [Nanum Gothic](https://fonts.google.com/specimen/Nanum+Gothic?query=nanum)

header랑 css에 적용 후에 Computed를 확인하면 바뀐것을 확인 할 수 있습니다.
<img width="246" alt="image" src="https://user-images.githubusercontent.com/32887635/190335562-0cd8de7c-2178-4fb0-84ca-ace978fbca1b.png">

## 04. Google Material Icons

Web에서 Google Material Icons사용하기 위해서는 [Getting Started Web](https://material.io/develop/web/getting-started)에 들어가서 두번째 stylesheet만 있는 CDN을 복사하여 사용해주면 된다.

```html
<head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
</head>
```

[Material Icons](https://fonts.google.com/icons?selected=Material+Icons&icon.query=login) 사이트에 들어가서 원하는 아이콘을 클릭 후 해당 예시를 받아와 사용하면 됩니다. 태그는 상관없이 클래스 이름만 동일하게 선택해주면 됩니다.

- 만약 크기를 변경하고 싶다면 font-size를 변경해주면 된다.

## 05. 헤더&드롭다운 - 로고

### header

header라는 태그는 특정한 기능을 제공하지는 않으며, header라는 명칭을 주는 태그

```html
<header></header>
<!-- 기능을 제공하지 않기 때문에 div에 class이름 넣어준것곽 같음 -->
<div class="header"></div>
```

### 기본 설정

```css
body {
  color: #333;
  font-size: 16px;
  font-weight: 400;
  /* 글꼴마다 적절한 line-height가 있다. */
  line-height: 1.4;
  font-family: "Nanum Gothic", sans-serif;
}
```

### img 태그의 baseline 삭제(inline 요소 -> block 요소)

```css
img {
  display: block;
}
```

### 가운데 배치(Positoin)

- 세로 가운데 정렬

1. 반드시 height를 정확히 지정해주어야 한다.
2. top, bootom의 위치를 지정해주어야 한다.
3. position을 absolute로 지정해주고 반드시, 지정해주기 전에 기준이 되어야 하는 부모 속성에 position을 relative으로 지정해주어야 한다.

- 가로 가운데 정렬

1. 반드시 width를 정확히 지정해주어야 한다.
2. right, left의 위치를 지정해주어야 한다.
3. position을 absolute로 지정해주고 반드시, 지정해주기 전에 기준이 되어야 하는 부모 속성에 position을 relative으로 지정해주어야 한다.

```css
/* 세로 배치 가운데 정렬 */
header .inner {
  position: relative;
}
header .logo {
  position: absolute;
  height: 75px;
  top: 0;
  bottom: 0;
  margin: auto;
}

/* 가로 배치 가운데 정렬 */
header .inner {
  position: relative;
}
header .logo {
  position: absolute;
  width: 75px;
  left: 0;
  right: 0;
  margin: auto;
}
```

## 06. 헤더&드롭다운 - 서브 메뉴

###

```html

```

## 07. 헤더&드롭다운 - 검색

###

```html

```

## 08. 헤더&드롭다운 - 메인 메뉴(1)

###

```html

```

## 09. 헤더&드롭다운 - 메인 메뉴(2)

###

```html

```

## 10. 헤더&드롭다운 - BEM

###

```html

```

## 11. 헤더&드롭다운 - 전역 배지(GSAP) (1)

###

```html

```

## 12. 헤더&드롭다운 - 서브 메뉴

###

```html

```

## 13. 순차적 애니메이션 - 전역 버튼 스타일(1)

###

```html

```
