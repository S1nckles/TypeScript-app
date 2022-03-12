import React from 'react';
import { reduxForm } from "redux-form";
import s from './ProfileInfo.module.css';
import { createField, Textarea, Input } from "../../common/FormsControls/FormsControls";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div><button>Save</button></div>
        {error && <div className={s.formSummaryError}>
            {error}
        </div>
        }
        <div><b>Full name</b>: {createField("Full name", "fullname", [], Input)}</div>
        <div><b>Looking for a job</b>: {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}</div>
        {profile.lookingForAJob &&
            <div><b>My professional skills</b>: {createField("My professional skills", "lookongForAJobDescription", [], Textarea)}</div>
        }
        <div><b>About me</b>: {createField("About me", "aboutMe", [], Textarea)}</div>
        <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataForm;