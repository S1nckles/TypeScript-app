import { UsersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/validators/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

export type initalStateType = {
    users: Array<string>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<any>
}
export let initalState: initalStateType = {
    users: [ ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initalState, action: any): initalStateType => {

    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray( state.users, action.userId, "id", {followed: true} )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray( state.users, action.userId, "id", {followed: false} )
            }
        
        case SET_USERS:{
            return {...state, users: [...state.users, ...action.users]}
        }
        case SET_CURRENT_PAGE:{
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, toggleIsFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return{
                ...state,
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

type followSuccessType = {
    type: typeof FOLLOW, 
    userId: number
}
type unfollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number
}
type setUsersType = {
    type: typeof SET_USERS, 
    users: string
}
type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE, 
    currentPage: number
}
type setUsersTotalCountType = {
    type: typeof SET_TOTAL_USERS_COUNT, 
    count: number
}
type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING, 
    isFetching: boolean
}
type toggleIsFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, 
    isFetching: boolean,
    userId: number
}
export const followSuccess = (userId: number): followSuccessType => ({type: FOLLOW, userId})     
export const unfollowSuccess = (userId: number): unfollowSuccessType => ({type: UNFOLLOW, userId})
export const setUsers = (users: string): setUsersType => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})  
export const setUsersTotalCount = (totalUsersCount: number): setUsersTotalCountType => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching}) 
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): toggleIsFollowingProgressType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}) 

export const requestUsers = (page: number, pageSize: number, UsersAPI: any) => {
    return (dispatch: any) => {

        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        UsersAPI.getUsers(page, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setUsersTotalCount(data.totalCount));
        });
    }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }   
    dispatch(toggleIsFollowingProgress(false, userId));
}

export const follow = (userId: number) => {
    return (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, UsersAPI.follow.bind(UsersAPI), followSuccess);
    }
}

export const unfollow = (userId: number) => {
    debugger;
    return (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, UsersAPI.unFollow.bind(UsersAPI), unfollowSuccess);
    }
}

export default usersReducer;