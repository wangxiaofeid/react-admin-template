import { observable, computed, autorun, when, action } from "mobx";

// 文档 https://cn.mobx.js.org/refguide/autorun.html

export default class GlobalStore {
  @observable num = 1;
  @observable num2 = 2;
  num3 = 3;

  constructor() {
    autorun(() => {
      this.num3 = this.num + this.num2;
    });
    when(
      // 一旦...
      () => this.num === 2,
      // ... 然后
      () => {
        console.log("num===2");
      }
    );
  }

  @computed get sumNum() {
    return this.num + this.num2;
  }

  @action plusNum() {
    this.num += 1;
  }
}
