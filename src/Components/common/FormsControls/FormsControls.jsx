import React from "react";
import s from './FormsControls.module.css';

export const FormControls = ({input, meta, child, element, ...props}) => {

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
    const {input, meta, child, ...restProps} = props;
    return <FormControls {...props}><textarea {...input} {...restProps} /></FormControls>  //{...props} может быть
}


export const Input = ({...props}) => {
    const {input, meta, child, ...restProps} = props; 
    return <FormControls {...props}><input {...input} {...restProps} /></FormControls>
}