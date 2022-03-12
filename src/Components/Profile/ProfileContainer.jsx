import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from '../Profile/Profile.jsx';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../Redux/profile-reducer.js';
import { withRouter } from "react-router-dom";
// import { withAuthRedirect } from '../hoc/withAuthRedirect.js';
import { compose } from 'redux';

const ProfileContainer = (props) => {

    const refreshProfile = (props) => {
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
                savePhoto={props.savePhoto} />
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
