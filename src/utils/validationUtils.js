const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{4,20}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,20}$/;

const validation = regex => {
  return value => {
    return !value || regex.test(value) ? Promise.resolve() : Promise.reject('Error');
  };
};

export const validationUsername = validation(USER_REGEX);
export const validationEmail = validation(EMAIL_REGEX);
export const validationPassword = validation(PWD_REGEX);
