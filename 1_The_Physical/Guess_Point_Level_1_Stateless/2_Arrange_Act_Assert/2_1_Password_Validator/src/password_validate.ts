interface IPasswordResult {
  isValid: boolean,
  errors: string[];
}

export function validatePassword(password: string): IPasswordResult {
  let passwordResult: IPasswordResult = { isValid: false, errors: [] };
  let pattern1 = /\d/;
  let pattern2 = /[A-Z]/;
  if (password.length < 5 || password.length > 15) {
    passwordResult.errors.push("Password should be between 5 and 15 characters long");
  }

  if (!pattern1.test(password)) {
    passwordResult.errors.push("Password should contain atleast 1 digit");
  }

  if (!pattern2.test(password)) {
    passwordResult.errors.push("Password should contain at least one upper case letter");
  }
  //assuming user enters correct password  
  if (passwordResult.errors.length == 0 && password == password) {
    passwordResult.isValid = true;
  } 
  
  return passwordResult;
}