# 리액트 라우터로 SPA(Single Page Application) 개발하기

여러 페이지로 구성된 웹 어플리케이션을 만들 때 페이지 별로 컴포넌트들을 분리해가면서 프로젝트를 관리하기 위해 라우팅 시스템이 필요합니다. 리액트에서는 공식적으로 제공해주는 라우팅 시스템이 없기 때문에 다양한 라이브러리 or 프레임워크 기능을 통해 구현할 수 있습니다. 여기에서는 react router로 구현해 보도록 하겠습니다.

## Single Page Application

기존에는 사용자가 다른 페이지로 이동할 때마다 새로운 html을 받아 오고, 페이지를 로딩할 때마다 서버에서 리소스를 전달받아 해석한 뒤 화면에 보여 주었습니다. 이렇게 사용자에게 보이는 화면은 서버 측에서 준비했습니다. 이렇게 서버 측에서 뷰를 감당하게 되면 트래픽이 너무 많이 나오거나, 사용자가 몰려 서버에 높은 부하가 쉽게 걸릴 경우 성능상의 이슈가 생길 수 있습니다.

따라서 리액트 같은 라이브러리 혹은 프레임워크를 사용하여 뷰 렌더링을 사용자의 브라우저가 담당하도록 하고, 우선 애플리케이션을 브라우저에 불러와서 실행시킨 후에 사용자와의 인터랙션이 발생하면 필요한 부분만 자바스크립트를 사용하여 업데이트해주고, 새로운 데이터가 필요하다면 서버 API를 호출하여 필요한 데이터만 새로 불러와 애플리케이션에서 사용할 수 있습니다. 이를 SPA 라고 부릅니다.

SPA는 기술적으로는 한 페이지만 존재하지만, 사용자가 경험하기에는 여러 페이지가 존재하는 것처럼 느낄 수 있는데요. 이는 링크를 누를때마다 서버에 html을 요청하는것이 아닌 브라우저의 history API를 사용하였기 때문입니다. history API는 브라우저의 주소창의 값만 변경하고 기존에 페이지에 띄웠던 어플리케이션을 그대로 유지하면서 보여주는 페이지만 다르게 띄워줍니다.

## 리액트 라우터 사용하기

1. 아래와 같이 react-router를 설치해줍니다.

```shell
yarn add react-router-dom
```

2. src/index.js 파일에서 react-router-dom에 내장되어 있는 BrowserRouter라는 컴포넌트를 사용하여 감싸줍니다.

\*BrowserRouter컴포넌트는 HTML5의 History API를 사용하여 리액트 컴포넌트에서 사용할 수 있도록 해줍니다.

```js

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById(‘root‘)
);
```

3. App.js에서 Route 컴포넌트를 사용하여 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여 줄지 정의해줍니다. 규칙은 아래왁 같습니다.

```js
<Routes>
    <Route path="주소규칙" element={보여 줄 컴포넌트} />
</Routes>
```

```js
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
```

## Link 컴포넌트로 페이지 이동하는 링크 보여주기

링크를 보여주기 위해서는 a 태그를 사용하였는데, 리액트 라우터에서는 이 a 태그를 사용할 경우 브라우저에서 페이지를 새롭게 불러오기 때문에 사용하면 안됩니다. 사용 방법은 아래와 같습니다.

\*Link 태그 역시 a 태그를 사용하기는 하지만, 새로운 페이지를 불러오는 것을 막고 History API를 통해 브라우저 주소의 경로만 바꾸는 기능이 내장되어 있습니다.

```js
<Link to="주소">내용</Link>
```

```jsx
import Link from ‘react-router-dom‘;

const Home = () => {
  return (
    <div>
        <h1>홈</h1>
        <Link to = "/about">소개</Link>
    </div>
  );
};

export default App;
```

## 유동적인 값 넘겨주기

유동적인 값을 사용해야 하는 상황에서 파라미터를 써야 할지 쿼리를 써야 할지 정할 때, 무조건 따라야 하는 규칙은 없습니다. 다만 일반적으로 파라미터는 특정 아이디 혹은 이름을 사용하여 조회할 때 사용하고, 쿼리는 우리가 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용합니다.
• 파라미터 예시: /profiles/velopert
• 쿼리 예시: /about?details=true

### URL 파라미터

URL 파라미터는 useParams라는 Hook을 사용하여 객체 형태로 조회 할 수 있습니다.

```jsx
import { useParams } from ‘react-router-dom‘;

const data = {
  velopert: {
    name: ‘김민준‘,
    description: ‘리액트를 좋아하는 개발자‘
  },
  gildong: {
    name: ‘홍길동‘,
    description: ‘고전 소설 홍길동전의 주인공‘
  }
};

const Profile = () => {
  const params = useParams();
  // 객체 이름은 path props로 넘겨줌
  const profile = data[params.username];

  return (
    <div>
        <h1>사용자 프로필</h1>
        {profile ? (
            <div>
                <h2>{profile.name}</h2>
                <p>{profile.descriptrion}</p>
            </div>
        ) : (
            <p>존재하지 않는 프로필입니다.</p>
        )}
    </div>
  );
};

export default Profile;
```

```jsx
<Route path="/profile/:username" element={<Profile />} />
```

```jsx
<Link to="/profile/velopert">velopert 프로필</Link>
```

### 쿼리스트링

쿼리스트링은 useLocation Hook을 사용하여 객체 형태로 조회 할 수 있습니다.
