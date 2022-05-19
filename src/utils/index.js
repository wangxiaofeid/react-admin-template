import React from "react";
import { get } from "lodash";
import { message } from "antd";

// JS判断字符串长度（英文占1个字符，中文汉字占2个字符）
export function getStrLen(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}

export function reBytesStr(str, len) {
  if (!str && typeof str != "undefined") {
    return "";
  }
  let num = 0;
  let str1 = `${str}`;
  let newStr = "";
  for (var i = 0, lens = str1.length; i < lens; i++) {
    num += str1.charCodeAt(i) > 255 ? 2 : 1;
    if (num > len) {
      break;
    } else {
      newStr = str1.substring(0, i + 1);
    }
  }
  return newStr !== str1 ? `${newStr}...` : newStr;
}

export const safeParseJSON = (str, defaultObj) => {
  if (!str) {
    return defaultObj;
  }
  try {
    return JSON.parse(str);
  } catch (err) {
    console.warn("json parse error:", err);
    return defaultObj;
  }
};

const codes = "abcdefghijklmnopqrstuvwxyz0123456789_";
const codeLength = codes.length;
export function randomCode(length = 8) {
  let code = codes[parseInt(Math.random() * 10000, 10) % 26];
  for (let i = 0; i < length - 1; i++) {
    code += codes[parseInt(Math.random() * 10000, 10) % codeLength];
  }
  return code;
}

export function getHeader() {
  const headers = {};
  headers["X-Cf-Random"] = sessionStorage.getItem("_csrf_");
  return headers;
}

export function gotoLogin() {
  if (isDev) {
    return;
  }
  sessionStorage.setItem("_csrf_", "");
  sessionStorage.clear();
  localStorage.removeItem("_up_qjt_csrf_");
  localStorage.removeItem("getSessionStorage");
  window.location.href = getLoginUrl();
}

export function getLoginUrl() {
  const { origin, pathname, search } = window.location;
  const callbackUrl = origin + pathname + encodeURIComponent(search);
  return "/user/login?callbackUrl=" + callbackUrl;
}

export function downloadFile({ url, params = {}, fileName, type = "GET" }) {
  let downFileName = fileName;
  const fetchData =
    type === "POST"
      ? fetch(`${url}`, {
          headers: {
            "Content-Type": "application/json",
            ...getHeader()
          },
          credentials: "include",
          method: "POST",
          body: JSON.stringify(params)
        })
      : fetch(
          `${url}?${Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join("&")}`,
          {
            headers: getHeader(),
            credentials: "include",
            method: "GET"
          }
        );

  fetchData
    .then((res) => {
      const disposition = res.headers.get("Content-Disposition");
      if (disposition) {
        const backFileName = get(disposition.split("="), "[1]", "").replace(/\"/g, "");
        if (!downFileName && backFileName) {
          downFileName = decodeURIComponent(backFileName);
        }
        return res.blob();
      } else {
        return res.json();
      }
    })
    .then((res) => {
      if ("success" in res) {
        if (!res.success) {
          message.warn(res.message || "下载失败");
        }
      } else {
        const url = URL.createObjectURL(res);
        const a = document.createElement("a");
        a.download = downFileName;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export function highlightText(keycode, text) {
  if (!keycode || !text) {
    return text;
  }
  const sourceText = `${text}`;
  const index = text.indexOf(keycode);
  if (index === -1) {
    return text;
  }
  return (
    <>
      {sourceText.slice(0, index)}
      <span className="c-blue">{keycode}</span>
      {sourceText.slice(index + keycode.length)}
    </>
  );
}
