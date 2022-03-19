import { createSelector } from 'reselect';
import { AppStateType } from './redux-store';

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})


const getPageSizeSelector = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getPageSize = createSelector(getPageSizeSelector, (pageSize) => {
    return pageSize
})


const getTotalUsersCountSelector = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getTotalUsersCount = createSelector(getTotalUsersCountSelector, (totalUsersCount) => {
    return totalUsersCount
})


const getCurrentPageSelector = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getCurrentPage = createSelector(getCurrentPageSelector, (currentPage) => {
    return currentPage
})


const getIsFetchingSelector = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getIsFetching = createSelector(getIsFetchingSelector, (isFetching) => {
    return isFetching
})


const getFollowingInProgresSelector = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
export const getFollowingInProgres = createSelector(getFollowingInProgresSelector, (followingInProgress) => {
    return followingInProgress
})
