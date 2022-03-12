import React from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators.js";

const Dialogs = (props) => {

    let state = props.dialogPage;

    let dialogsElements = state.dialogs.map(d => (<DialogItem name={d.name} key={d.id} id={d.id} />));
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
    // let newMessageText = state.newMessageText;

    let addNewMassage = (values) => {                    ////   
        props.sendMessage(values.newMessageText);
        alert(values.newMessageText)
    }


    if (!props.isAuth === false) return <Navigate to="/login" />;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>

                {dialogsElements}

            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>

            </div>
            <AddMessageFormRedux onSubmit={addNewMassage} />
        </div>
    )
}

const maxLength50 = maxLengthCreator(50);


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newMessageText" placeholder="Enter you message" component={Textarea} validate={[required, maxLength50]} />
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;