import React from "react";
import { connect } from "react-redux";
import { follow, setUsers, unfollow, setCurrentPage, setUsersTotalCount, toggleIsFetching, toggleIsFollowingProgress } from '../../Redux/users-reducer';
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { UsersAPI } from "../../api/api";
// import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgres, getUsers, getIsFetching, getPageSize, getTotalUsersCount } from "../../Redux/users-selectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        // this.props.getUsers(this.props.currentPage, this.props.pageSize);                            /// Не работает

        this.props.toggleIsFetching(true);
        UsersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setUsersTotalCount(data.totalCount);
        });

        // UsersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //         this.props.toggleIsFetching(true);
        //         this.props.setUsers(data.items);
        //     });
    }
    
    onPageChanged = (pageNumber) => {
        // this.props.getUsers(pageNumber, this.props.pageSize);                            /// Не работает 
         
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        UsersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
                this.props.toggleIsFetching(true);
                this.props.setUsers(data.items);
                this.props.setUsersTotalCount(data.totalCount);
            });
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

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,

//     }
// }


let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgres(state)
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }


export default compose(
    connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount,
    toggleIsFetching, toggleIsFollowingProgress, getUsers})//,
    // withAuthRedirect
)(UsersContainer);
    
    
    