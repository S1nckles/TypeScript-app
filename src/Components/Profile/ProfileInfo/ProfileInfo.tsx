import {FC, React, useState} from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileType from '../../../types/Types'
// import userPhoto from '../../../assets/img/Find_users_ava.png'

type PropsType = {
    profile: Array<ProfileType>
    status: string
    updateStatus: string
    isOwner: boolean
    savePhoto: any
    saveProfile: any
    onSubmit: (formData: any) => void
}

const ProfileInfo: FC<PropsType>= ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelect = (e: { target: { files: string | any[]; }; }) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: any) => {
        saveProfile(formData).then(
            () => {
                
            }
        )
        // setEditMode(false);
    }

    return (
        <div className={s.content}>
            <div>
                <img className={s.profileImg} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPBHbCwZCIxgehG6esU1abuWQzYETn8RxwhA&usqp=CAU" alt="CS:GO img" />
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile} alt="" />
                {isOwner && <input type={"file"} onChange={onMainPhotoSelect} />}

                {editMode 
                    ? <ProfileDataForm profile={profile} onSubmit={onSubmit} />
                    : <ProfileData goToEditMode={ () => {setEditMode(true)} } profile={profile} isOwner={isOwner} /> }
                
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
        <div><b>Full name</b>: {profile.fullName}</div>
        <div><b>Looking for a job</b>: {profile.lookingForAJob}</div>
        {profile.lookingForAJob &&
            <div><b>My professional skills</b>: {profile.lookingForAJobDescription}</div>
        }
        <div><b>About me</b>: {profile.AboutMe}</div>
        <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
        })}
        </div>
    </div>
}
const ProfileDataForm = ({ profile }) => {
    return <div>

    </div>
}

const Contact = ({ contactTitle, contactValue }) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;

// http://surl.li/aoqwz