const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const nameRegExp = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;

export default class FormValid {
  constructor(form, name, email, text) {
    this.form = form;
    this.nameInput = name;
    this.email = email;
    this.text = text;

    // this._validateEmail = this._validateEmail.bind(this);
    // this._validateName = this._validateName.bind(this);
    // this._validateText = this._validateText.bind(this);
    // this.checkvalidity = this.checkvalidity.bind(this);
    this.checkvalidity();
    this.form.addEventListener('submit', this._onFormSubmit);
  }

  _onValidateName() {
    const inputName = this.nameInput.value;
    if (inputName.length !== 0 && nameRegExp.test(inputName)) {
      this.nameInput.setCustomValidity('');
    } else {
      this.nameInput.setCustomValidity('wrong name');
    }
  }

  _onValidateEmail() {
    const emailInput = this.email.value;
    if (emailInput.length !== 0 && emailRegExp.test(emailInput)) {
      this.email.setCustomValidity('');
    } else {
      this.email.setCustomValidity('wrong email');
    }
  }

  _onValidateText(evt) {
    const textInput = this.text.value;
    if (textInput.length > 50 && textInput.length < 400) {
      this.text.setCustomValidity = '';
    } else {
      this.text.setCustomValidity = `Message must be between 50 and 400 characterrs. Now ${this.text.value.length}`;
    }
  }

  checkvalidity() {
    this.nameInput.addEventListener('input', this._onValidateName);
    this.email.addEventListener('input', this._onValidateEmail);
    this.text.addEventListener('change', this._onValidateText);
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    console.log(this.email.value);
    console.log(this.nameInput.value);
    console.log(this.text.value);
  }
}
