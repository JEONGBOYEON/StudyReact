import { useParams, useLocation } from "react-router-dom";
import queryString from "query-string";

//react-router-dom 버전 6부터는 element로 컴포넌트를 만들고, route props(match, history, location)을 받지 않는다. 따라서, useParams, useLocation, useHistory를 사용하여 route context에 접근한다
export default function Profile(props) {
  console.log(props);
  const { id } = useParams();
  const { search } = useLocation();
  const { name } = queryString.parse(search);
  return (
    <div>
      <h2>Profile 페이지 입니다.</h2>
      {id && <p> id는 {id} 입니다.</p>}
      {/* && 조걸절 */}
      {name && <p> id는 {name} 입니다.</p>}
    </div>
  );
}
