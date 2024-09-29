export const LOGIN = 'Login'
export const LOGIN_LABEL = 'Sign in'

export const SIGNUP = 'Sign up'
export const SIGNUP_LABEL = 'Register'

export const LOGIN_ERROR = "Such account doesns't exist"
export const SIGNUP_ERROR = "Such account already exist"

export const SIGNUP_HELP_TEXT = "Don't have an account? "
export const LOGIN_HELP_TEXT = "Already have an account? "

export const LOGIN_SUCCESS_MSG = 'You have been successfully signed in!'
export const SIGNUP_SUCCESS_MSG = 'You have been successfully signed up!'


export const USER_CREDENTIALS = {
    email: '',
    password: ''
}
export const USER_CREDENTIALS_ERROR = {
    email: false,
    password: false
}

export const TOAST_TYPE = {
    success: null,
    error: null
}

export const emailValidator = email => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export const passwordValidator = password => {
    return password.trim('').length >= 6
}