import React, { FC } from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import {connect} from "react-redux";
// @ts-ignore
import {login} from "../../Redux/auth-reducer.ts";
// @ts-ignore
import s from "../common/FormsControls/FormsControls.module.css";
// import { Navigate } from "react-router-dom";
import AppStateType from "../../types/Types"

type PropsType = {
    handleSubmit: string 
    error: boolean
    captchaUrl: string
    login: any
}

const LoginForm: FC<PropsType> = ({handleSubmit, error, captchaUrl}) => {
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

const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm)

const Login: FC<PropsType>= (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl);
    }

    // if (props.isAuth) {
    //     return <Navigate to={"/profile"} />
    // }

    return <div>
        <h1>LOGIN</h1>
        <ReduxLoginForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);