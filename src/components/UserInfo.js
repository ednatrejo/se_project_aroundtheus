// responsible for rendering information about the user on the page
export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      description: this._job.textContent,
    };
    return this._userInfo;
  }

  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
  }
}
