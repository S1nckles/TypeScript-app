import { AppStateType } from './redux-store';
import { stopSubmit } from "redux-form";
import { AuthAPI, ResultCodesEnum, ResultCodeWithCaptcha, SecurityAPI } from "../api/api";
import { ThunkAction } from 'redux-thunk';

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


type ActionsTypes = GetCaptchaUrlSuccessActionType | SetAuthUserDataActionType

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

export const getAuthUserData = ()
            : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch, getState) => {
    let meData = await AuthAPI.me()

    if (meData.resultCode === ResultCodesEnum.Success ) {
        let { id, login, email } = meData.data;
        dispatch(setAuthUserData(id, login, email, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string)
            : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch, getState) => {
    let data = await AuthAPI.login(email, password, rememberMe, captcha);

    if (data.data.resultCode === ResultCodesEnum.Success) {

        dispatch(getAuthUserData())
    } else {
        if (data.data.resultCode === ResultCodeWithCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        
        let message = data.data.messages.length > 0 ? data.data.messages[0] : "Some error";
        // @ts-ignore
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const logOut = ()
            : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch, getState) => {
    let data = await AuthAPI.logOut();

    if (data.data.resultCode === ResultCodesEnum.Success) {
       dispatch(getAuthUserData());
    }
}

export const getCaptchaUrl = ()
            : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch, getState) => {
    const response = await SecurityAPI.getCaptcha();
    const captchaUrl = response.data.url  
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;