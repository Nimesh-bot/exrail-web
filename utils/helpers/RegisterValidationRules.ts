export default function validateRegister(values: Register.RegisterInfo) {
    let errors: any = {};
  
    if (!values.name) {
      errors.name = 'Please enter your fullname';
    }
    if (!values.email) {
      errors.email = 'Please enter your email';
    }
    else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!values.password || values.password === "") {
      errors.password = 'Please enter your password';
    }
    if (!values.confirmPassword || values.confirmPassword === "") {
      errors.confirmPassword = 'Please confirm your password';
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
      errors.password = 'Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and a special character';
    }
  }
  