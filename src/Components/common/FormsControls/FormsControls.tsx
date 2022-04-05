import {FC, React, ReactNode} from "react";
import s from './FormsControls.module.css';

type FormControlPropsType = {
    meta: {
        touched: boolean
        error: string
    }
}

export const FormControls: FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={s.formsControl + " " + (hasError ? s.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = ({...props}) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControls meta={{
        touched: false,
        error: ""
    }} {...props}><textarea {...input} {...restProps} /></FormControls>  //{...props} может быть
}


export const Input = ({...props}) => {
    const {input, meta, child, ...restProps} = props; 
    return <FormControls meta={{
        touched: false,
        error: ""
    }} {...props}><input {...input} {...restProps} /></FormControls>
}