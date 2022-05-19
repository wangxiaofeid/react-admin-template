import { message } from "antd";

export const labelReg = /^[a-z][a-z0-9_]*$/;

const hiveTableReg = /^[a-z]$|^[a-z][a-z0-9_\.]*[a-z0-9]$/;

const hiveTableReg2 = /^[a-z]$|^[a-z][a-z0-9_]*[a-z0-9]$/;

export const dbTableNameReg = /^[a-zA-Z]\w*$/;

export const urlReg = /http(s)?:\/\/([\w-]+\.)*[\w-]+([:]{1}[\d]+)?(\/[\w-.:/?%&=]*)?(#[\w]+)?/g;

export const spaceReg = /\s/;

export const noSpaceReg = /^\S*$/;

export const formulaReg = /[\\+\\-\\*\\/@#()]/;

export const splitStr = /[，,\s]/;

export const integerReg = /^[1-9]\d*$/;

export const cnEngReg = /^[A-Za-z\u4e00-\u9fa5]+$/;

export const positIntReg = /^[1-9]\d*$/;

export const cnEngUndPntReg = /^[a-zA-Z][a-zA-Z0-9_\.]*$/;

export const appIdReg = /^[a-z0-9_]*$/;

export const formTip = {
  code: "仅支持小写字母、数字、下划线，且需以字母开头",
  hive: "仅支持小写字母、数字、下划线、点，需以字母开头、字母数字结尾",
  hive2: "仅支持小写字母、数字、下划线，需以字母开头、字母数字结尾",
  space: "不能包含空格",
  formula: "不能包含公式特有字符",
  cnEng: "仅支持输入中英文",
  positInt: "仅支持输入正整数",
  cnEngUndPnt: "仅支持英文字母、数字、下划线、圆点组成，且需以字母开头",
  appId: "仅支持英文小写字母、数字、下划线组成"
};

export const labelRegCheck = (value) =>
  new Promise((resolve) => resolve(!value || labelReg.test(value) ? false : formTip.code));

export const hiveTableCheck = (value) =>
  new Promise((resolve) => resolve(!value || hiveTableReg.test(value) ? false : formTip.hive));

export const hiveTableCheck2 = (value) =>
  new Promise((resolve) => resolve(!value || hiveTableReg2.test(value) ? false : formTip.hive2));

export const noSpaceRegCheck = (value) =>
  new Promise((resolve) => resolve(!value || noSpaceReg.test(value) ? false : formTip.space));

export const cnEngRegCheck = (value) =>
  new Promise((resolve) => resolve(!value || cnEngReg.test(value) ? false : formTip.cnEng));

export const positIntRegCheck = (value) =>
  new Promise((resolve) => resolve(!value || positIntReg.test(value) ? false : formTip.positInt));

export const cnEngUndPntRegCheck = (value) =>
  new Promise((resolve) =>
    resolve(!value || cnEngUndPntReg.test(value) ? false : formTip.cnEngUndPnt)
  );

export const appIdRegCheck = (value) =>
  new Promise((resolve) => resolve(!value || appIdReg.test(value) ? false : formTip.appId));

export const maxLength =
  (max = 50) =>
  (value) =>
    new Promise((resolve) => {
      if (value && value.length > max) {
        resolve(`长度不能超过${max}`);
      } else {
        resolve(false);
      }
    });

export const maxLength50 = maxLength(50);
export const maxLength100 = maxLength(100);
export const maxLength5000 = maxLength(5000);
export const variableOrInteger = (value) => {
  return new Promise((resolve) => {
    if (value && !(value.includes("${") || integerReg.test(value))) {
      resolve("格式错误");
    } else {
      resolve(false);
    }
  });
};

export const noNullCheck = (arr, msg) => {
  const keys = Object.keys(msg);

  for (let j = 0; j < keys.length; j++) {
    const key = keys[j];
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (!obj) {
        message.warning("此为必填字段");
        return true;
      }
      if (!obj[key]) {
        message.warning(`${msg[key]}必填`);
        return true;
      }
    }
  }
  return false;
};

export const regCheck = (arr, msg, reg = labelReg) => {
  const keys = Object.keys(msg);
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    if (obj) {
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        if (!reg.test(obj[key])) {
          message.warning(msg[key]);
          return true;
        }
      }
    }
  }
  return false;
};
