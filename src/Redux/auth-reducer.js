import { stopSubmit } from "redux-form";
import { AuthAPI, SecurityAPI } from "../api/api";

let SET_USER_DATA = 'SET_USER_DATA';
let GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_USER_DATA:
            case GET_CAPTCHA_URL_SUCCESS:
                return {
                    ...state,
                    ...action.payload
                }

        default:
            return state;
    }
}

export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: captchaUrl })
export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {id, email, login, isAuth} })
export const getAuthUserData = () => (dispatch) => {
    AuthAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let { id, login, email } = response.data.data;
                dispatch(setAuthUserData(id, login, email, true))
            }
        });
}

export const login = (email, password, rememberMe, captcha) => (dispatch) => {
    AuthAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
               dispatch(getAuthUserData())
            } else {
                dispatch(getCaptchaUrl());

                let message = response.data.message.length > 0 ? response.data.message[0] : "Some error";
                dispatch(stopSubmit("login", {_error: message}));
            }
        });
}

export const logOut = () => (dispatch) => {
    AuthAPI.loginOut()
        .then(response => {
            if (response.data.resultCode === 0) {
               dispatch(getAuthUserData(null, null, null, false));
            }
        });
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url  
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;