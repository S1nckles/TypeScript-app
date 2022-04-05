import React, { FC } from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer.tsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
//@ts-ignore
import ProfileType from "../../types";

type PropsType = {
    savePhoto: boolean 
    isOwner: boolean
    profile: Array<ProfileType> 
    status: string | null
    updateStatus: string | null
    saveProfile: any
}

const Profile: FC<PropsType> = (props) => {
    debugger;
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                saveProfile={props.saveProfile}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;