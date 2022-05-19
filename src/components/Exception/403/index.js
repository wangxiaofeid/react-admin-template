import { parse } from "query-string";
import emptyImg from "@/resource/images/empty03.svg";
import "../index.less";

export default function Exp403() {
  const { title } = parse(location.search);
  return (
    <div className="exception">
      <div className="page container">
        <div className="exception-con">
          <img src={emptyImg}></img>
          <div className="desc">{title ? decodeURI(title) : "抱歉，您无权访问该页面"}</div>
        </div>
      </div>
    </div>
  );
}
