import { stopSubmit } from "redux-form";
import { AuthAPI, SecurityAPI } from "../api/api";

let SET_USER_DATA = 'SET_USER_DATA';
let GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType = {
    userId: null | number,
    email: null | string,
    login: null | string,
    isAuth: true | false,
    captchaUrl: string
};

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action: any): InitialStateType => {
    
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

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string | null} 
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: {
    id: number | null, 
    email: string | null, 
    login: string | null,  
    isAuth: boolean}
}

export const getCaptchaUrlSuccess = (captchaUrl: string | null): GetCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} })
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({ type: SET_USER_DATA, payload: {id, email, login, isAuth} })
export const getAuthUserData = () => (dispatch: any) => {
    AuthAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let { id, login, email } = response.data.data;
                dispatch(setAuthUserData(id, login, email, true))
            }
        });
}

export const login = (email, password, rememberMe, captcha) => (dispatch: any) => {
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

export const logOut = () => (dispatch: any) => {
    AuthAPI.loginOut()
        .then(response => {
            if (response.data.resultCode === 0) {
               dispatch(getAuthUserData());
            }
        });
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url  
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;