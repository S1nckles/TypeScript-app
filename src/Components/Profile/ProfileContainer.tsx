import React, { useState, useEffect, FC } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile.tsx';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../Redux/profile-reducer.js';
//@ts-ignore
import { withRouter } from "react-router-dom";
// import { withAuthRedirect } from '../hoc/withAuthRedirect.js';
import { compose } from 'redux';
import ProfileType from "../../types";

type PropsType = {
    match: { params: { userId: any } } 
    profile: Array<ProfileType>
    status: string
    updateStatus: string
    savePhoto: boolean 
    authorizedUserId: any
    getUserProfile: () => {userId: any}
    getStatus: () => void
}

const ProfileContainer: FC<PropsType> = (props) => {
    debugger;

    const refreshProfile: FC<PropsType> = (props) => {
        debugger;
        let userId = props.match.params.userId;
        if (!userId) {
            userId = props.authorizedUserId;
        }
        props.getUserProfile(userId);
        props.getStatus(userId);
    }

    useEffect(() => {
        debugger;
        if (props.match.params.userId !== useState.match.params.userId) {
            refreshProfile();
        }
    })

    // componentDidMount() {
    //     this.refreshProfile();
    // }

    // componentDidUpdate(prevState, prevProps, snapshot) {
    //     if (this.props.match.params.userId !== prevProps.match.params.userId) {
    //         this.refreshProfile();
    //     }

    // }

    // render() {
        return (
            <Profile 
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isOwner={!props.match.params.userId}
                savePhoto={props.savePhoto} saveProfile={undefined} />
        )
    // }
}

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// if (!this.props.isAuth === false) return <Navigate to="/login" />;
// return <ProfileContainer {...props} />

// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter //,
    // withAuthRedirect

)(ProfileContainer);
