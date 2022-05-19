import { pathPrefix } from "@/constants/systemConfig";
import emptyImg from "@/resource/images/empty03.svg";
import "../index.less";

export default function Exp403() {
  return (
    <div className="exception">
      <div className="page container">
        <div className="exception-con">
          <img src={emptyImg}></img>
          <div className="desc">
            抱歉，您访问的页面不存在。<a href={pathPrefix}>返回首页</a>
          </div>
        </div>
      </div>
    </div>
  );
}
