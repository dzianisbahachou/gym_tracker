export const LOGIN = 'Login'
export const SIGNUP = 'Sign up'
export const LOGIN_ERROR = "Such account doesns't exist"
export const SIGNUP_ERROR = "Such account already exist"
export const LOGIN_SUCCESS_MSG = 'You have been successfully signed in!'
export const SIGNUP_SUCCESS_MSG = 'You have been successfully signed up!'

export const emailValidator = email => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export const passwordValidator = password => {
    return password.trim('').length >= 6
}