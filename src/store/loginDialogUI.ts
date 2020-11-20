/**
 * @module:  登录弹窗
 * @author Liang Huang 
 * @date 2020-09-14 17:47:08 
 */
import { observable } from "mobx";

class LoginDialogUI {
  @observable phoneValue: string;
  /**
   * 登录弹窗是否显示
   */
  @observable visible: boolean;
}

export default LoginDialogUI;
