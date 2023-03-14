export default function validateLogin(values: Login.LoginInfo) {
  let errors: any = {};

  if (!values.email) {
    errors.email = 'Please enter your email';
  }
  else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Please enter a valid email';
  }
  if (!values.password || values.password === "") {
    errors.password = 'Please enter your password';

  }
  return errors;
}  