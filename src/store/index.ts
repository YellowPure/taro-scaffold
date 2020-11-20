import User from './user';
import LoginDialogUI from './loginDialogUI';

const store = {
  user: new User(),
  loginDialogUI: new LoginDialogUI()
}

export {
  User,
  LoginDialogUI
}

export default store;