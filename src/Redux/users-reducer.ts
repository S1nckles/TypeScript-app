import { updateObjectInArray } from "../utils/validators/object-helpers";
import { UserType } from "../types/Types"
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";
import { UsersAPI } from "../api/api.ts";

export type InitalState = {
    users: Array<string>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<any>
}
let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {

    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }

        case 'SN/USERS/SET_USERS': {
            return { ...state, users: [...state.users, ...action.users] }
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.count }
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return { ...state, toggleIsFetching: action.isFetching }
        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
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

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: string) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setUsersTotalCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

export const requestUsers = (page: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch, getState) => {

        dispatch(actions.setCurrentPage(page));

        let data = await UsersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setUsersTotalCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => {
    return (dispatch) => {
        dispatch = 4;
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