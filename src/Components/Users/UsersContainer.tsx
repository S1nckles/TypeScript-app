import React from "react";
import { connect } from "react-redux";
import { follow, setUsers, unfollow, setUsersTotalCount, 
         toggleIsFetching, toggleIsFollowingProgress, requestUsers } from '../../Redux/users-reducer.ts';
import Users from "./Users.tsx";
import Preloader from "../common/Preloader/Preloader";
import { UsersAPI } from "../../api/api";
// import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgres, getUsers, getIsFetching, 
         getPageSize, getTotalUsersCount } from "../../Redux/users-selectors.ts";
import { AppStateType } from "../../Redux/redux-store.ts";
// @ts-ignore  
import { UserType } from "../../types/Types";

type MapStatePropsType = {
    isFetching: boolean
    currentPage: number
    pageSize: number
    setUsers: any
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type OwnPropsType = {}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        UsersAPI.getUsers(currentPage, pageSize);

        // UsersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //         this.props.toggleIsFetching(true);
        //         this.props.setUsers(data.items);
        //     });
    }
    
    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        UsersAPI.getUsers(pageNumber, pageSize)
    }

    render() {
        debugger;
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                toggleIsFollowingProgress={this.props.toggleIsFollowingProgres}
                followingInProgress={this.props.followingInProgress} />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgres(state)
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {follow, unfollow, getUsers: requestUsers})//,
    // withAuthRedirect
)(UsersContainer);
    
    
    