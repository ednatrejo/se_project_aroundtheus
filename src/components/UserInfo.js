// responsible for rendering information about the user on the page
export default class UserInfo {
  constructor(userNameSelector, jobTitleSelector) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(jobTitleSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}
