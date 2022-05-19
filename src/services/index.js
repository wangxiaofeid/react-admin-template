import service from "lib-service";
import { get } from "lodash";
import { message } from "antd";
import { apiPrefix, isDev } from "@/constants/systemConfig";
import { gotoLogin, getLoginUrl, getHeader } from "@/utils";

const baseConfig = {
  dataType: "json", // json、formdata, 默认是formdata
  redirectUrl: getLoginUrl,
  headers: getHeader,
  401: (res) => {
    if (!isDev) {
      gotoLogin();
    }
  },
  // 全局通用错误处理
  onError: (err) => {
    console.log(err);
    message.error(err.message || err.reason || "服务器未知错误");
  }
};

export const createService = service({
  baseUrl: apiPrefix,
  interceptors: (res) => {
    if (res instanceof Response && res.text instanceof Function) {
      return res?.text().then((text) => ({ success: true, data: text }));
    }

    const { success, result, reason, code } = res || {};
    return {
      success: !!success,
      data: result,
      message: reason,
      code
    };
  },
  ...baseConfig
});
