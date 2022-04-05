import React, { FC } from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/FormsControls.tsx";
import { maxLengthCreator, required } from "../../utils/validators/validators.ts";
import { InitialStateType } from "../../Redux/dialogs-reducer";

type OwnPropsType = {
    dialogPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageType = {
    newMessageText: string
}

const Dialogs: FC<OwnPropsType> = (props) => {

    let state = props.dialogPage;

    let dialogsElements = state.dialogs.map(d => (<DialogItem name={d.name} key={d.id} id={d.id} />));
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
    // let newMessageText = state.newMessageText;

    let addNewMassage = (values: {newMessageText: string}) => {                    ////   
        props.sendMessage(values.newMessageText);
    }
    
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

type NewMessageFromValuesKeysType = Extract<keyof NewMessageType, string>

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFromValuesKeysType>("Enter you message", 'newMessageText', [required, maxLength50], Textarea)}
            </div>{/*<LoginFormValuesTypeKeys>*/}
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;

function createField(arg0: string, arg1: string, arg2: any[], Textarea: any): React.ReactNode {
    throw new Error("Function not implemented.");
}
