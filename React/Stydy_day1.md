
# 브라우저는 어떻게 동작하는가?

### 브라우저의 주요 기능
브라우저의 주요 기능은 사용자가 선택한 **자원을 서버에 요청하고 브라우저에 표시**하는 것이다. (자원은 보통 HTML 문서) 자원의 주소는 URI(Uniform Resource Identifier)에 의해 정해진다.
1. 우리가 url을 통해 웹 사이트에 접속하게 되면, 해당 사이트의 리소스들을 브라우저가 웹 서버에 요청한다.
2. 서버는 해당 웹 사이트의 HTML, CSS 등의 리소스들을 브라우저에게 응답으로 전송한다.
3. 브라우저는 해당 문서들을 파싱한 후 사용자에게 제공한다.

### 브라우저의 기본 구조

<img width="246" alt="image" src="https://user-images.githubusercontent.com/32887635/200104553-63364747-0294-4370-b091-13b3c4df6e35">
                                  
                                  
1. 사용자 인터페이스 - 주소 표시줄, 이전/다음 버튼, 북마크 메뉴 등. 요청한 페이지를 보여주는 창을 제외한 나머지 모든 부분이다.
2. 브라우저 엔진 - 사용자 인터페이스와 렌더링 엔진 사이의 동작을 제어.
3. 렌더링 엔진 - 요청한 콘텐츠를 표시. 예를 들어 HTML을 요청하면 HTML과 CSS를 파싱하여 화면에 표시함.
4. 통신 - HTTP 요청과 같은 네트워크 호출에 사용됨. 이것은 플랫폼 독립적인 인터페이스이고 각 플랫폼 하부에서 실행됨.
5. UI 백엔드 - 콤보 박스와 창 같은 기본적인 장치를 그림. 플랫폼에서 명시하지 않은 일반적인 인터페이스로서, OS 사용자 인터페이스 체계를 사용.
6. 자바스크립트 해석기 - 자바스크립트 코드를 해석하고 실행.
7. 자료 저장소 - 이 부분은 자료를 저장하는 계층이다. 쿠키를 저장하는 것과 같이 모든 종류의 자원을 하드 디스크에 저장할 필요가 있다. HTML5 명세에는 브라우저가 지원하는 '웹 데이터 베이스'가 정의되어 있다.

### 랜더링 엔진(Webkit) 동작 방식
렌더링 엔진은 사용자의 요청에 따른 서버의 응답 내용인 HTML, CSS 등의 리소스들을 파싱하여 브라우저에 표시한다.
* 크롬,사파리는 웹킷, 파이어폭스는 게코

<img width="246" alt="image" src="https://user-images.githubusercontent.com/32887635/200104614-609f9bc2-609b-42c5-8df5-e4bacbc5fd50.png">

1. 먼저 서버의 응답 내용중 HTML파일을 파싱 후 DOM 트리를 구축한다.
또한 CSS파일 및 style요소 모두에서 스타일 데이터 파싱 후 CSSOM (CSS object model)Tree를 구축한다.
2. 그 후 완성된 돔 트리들을 Attachment 작업을 거친다. 이는 HTML 규칙에 맞게 스타일 정보를 사용하여 렌더 트리를 생성하는 과정이다. 게코 엔진에서는 콘텐츠 싱크 레이어를 거친다고 말한다.
3. 다음으로 각 노드가 화면에 어느곳에 어느 크기로 배치되어야 하는지 정확한 좌표를 제공받아 해당 좌표에 노드들을 배치하는 레이아웃 프로세스를 거친다.
이는 게코 엔진에서는 리플로우 과정이라 한다.
4. 마지막으로 UI 백엔드 레이어를 사용하여 화면에 그리는 페인트 작업을 거쳐 최종적으로 화면에 요소들을 그린다.


> https://velog.io/@alsghk9701/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC

> https://d2.naver.com/helloworld/59361


---

# DOM

### DOM 이란
문서 객체 모델(The Document Object Model, 이하 DOM) 은 HTML, XML 문서의 프로그래밍 interface 이다. DOM 은 구조화된 nodes와 property 와 method 를 갖고 있는 objects로 문서를 표현한다. 
1. 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공
2. 그들이 문서 구조, 스타일, 내용 등을 변경할 수 있게 도움

### DOM과 HTML의 차이점
DOM이 갖고 있는 근본적인 차이는 단순 텍스트로 구성된 HTML 문서의 내용과 구조가 객체 모델로 변환되어 다양한 프로그램에서 사용될 수 있다는 점입니다.
1. 작성된 HTML 문서가 유효하지 않을 때
DOM은 유효한 HTML 문서의 인터페이스 입니다. DOM을 생성하는 동안, 브라우저는 유효하지 않은 HTML 코드를 올바르게 교정합니다.
2. 자바스크립트에 의해 DOM이 수정될 때
DOM은 HTML 문서의 내용을 볼 수 있는 인터페이스 역할을 하는 동시에 동적 자원이 되어 수정될 수 있습니다. 예를 들어, 자바스크립트를 사용해 DOM에 새로운 노드를 추가할 수 있습니다. 이 코드는 DOM을 업데이트합니다. 하지만 HTML 문서의 내용을 변경하진 않습니다.
3. DOM은 브라우저에서 보이는 것이 아닙니다.
브라우저 뷰 포트에 보이는 것은 렌더 트리로 DOM과 CSSOM의 조합입니다. 렌더 트리는 오직 스크린에 그려지는 것으로 구성되어 있어 DOM과 다릅니다. 달리 말하면, 렌더링 되는 요소만이 관련 있기 때문에 시각적으로 보이지 않는 요소는 제외됩니다. 예를 들어, display: none 스타일 속성을 가지고 있는 요소입니다.

> https://wit.nts-corp.com/2019/02/14/5522

### DOM API, Brower API, SCCOM

---

### Virtual DOM
사실 가상 DOM은 일반적인 자바스크립트 객체일 뿐입니다. 그렇기 때문에 DOM을 직접 건드리지 않고도 자유롭게 조작할 수 있다. diffing 알고리즘을 통해 이전 DOM과 업데이트된 DOM을 비교하여 최소한의 연산을 하여 DOM을 작동시킬 수 있습니다. Virtual DOM은 메모리상에 존재한다.
 
```javascript
const vdom = {
    tagName: "html",
    children: [
        { tagName: "head" },
        {
            tagName: "body",
            children: [
                {
                    tagName: "ul",
                    attributes: { "class": "list" },
                    children: [
                        {
                            tagName: "li",
                            attributes: { "class": "list__item" },
                            textContent: "List item"
                        } // end li
                    ]
                } // end ul
            ]
        } // end body
    ]
} // end html
```

> https://bitsofco.de/understanding-the-virtual-dom/







































