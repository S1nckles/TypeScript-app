import React, { FC } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
//@ts-ignore
import { Input } from "../common/FormsControls/FormsControls.tsx";
//@ts-ignore
import { required } from "../../utils/validators/validators.ts";
import {connect} from "react-redux";
// @ts-ignore
import {login} from "../../Redux/auth-reducer.ts";
// @ts-ignore
import s from "../common/FormsControls/FormsControls.module.css";
// import { Navigate } from "react-router-dom";
// @ts-ignore
import AppStateType from "../../types/Types"
import { Navigate } from "react-router-dom";

type LoginFormOwnProps = {
    captchaUrl: string
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    debugger;
    return (
        <form onSubmit={handleSubmit}>
            <Field placeholder={"Login"} name={"login"} component={Input} validate={[required]} />
            <Field type={"password"} name={"password"} placeholder={"Password"} component={Input} validate={[required]} />
            <Field type={"checkbox"} name={"rememberMe"} component={Input} /> remember me

            {captchaUrl && <img src={captchaUrl} alt='12' />}
            {captchaUrl && <Field name={"captcha"} placeholder={"Symbol from img"} component={Input} validate={[required]} /> }

            { error && <div className={s.formSummaryError}>
                {error}
            </div> 
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

type LoginFormPropetiesType = "captcha" | "rememberMe"

const ReduxLoginForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    email: string
    password: string
}

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} /> 
    }

    return <div>
        <h1>LOGIN</h1>
        <ReduxLoginForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);