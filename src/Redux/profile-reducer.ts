import { ProfileAPI, ResultCodesEnum, UsersAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { PostType, ProfileType, ContactsType, PhotosType  } from "../types/Types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 10},
        {id: 2, message: 'Wellcome to Navi', likesCount: 4},  
        {id: 3, message: 'WOW', likesCount: 21}
    ] as Array<PostType>,
    newPostText: null,
    profile: null as Array<ProfileType> | null,
    status: ''
}

type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_POST: 
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '' 
            }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case DELETE_POST: 
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
        case SAVE_PHOTO_SUCCESS: 
            return { ...state, profile: {...state.profile, photos: action.photos} as ProfileType}

        default:
            return state;
    }
}

type ActionsTypes = addPostActionCreatorType | setUserProfileType | 
                    setStatusType | deletePostType | savePhotoSuccessType

type addPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
}
type setUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
type setStatusType = {
    type: typeof SET_STATUS,
    status: string
}
type deletePostType = {
    type: typeof DELETE_POST,
    postId: number
}
type savePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: string | null
}

export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => ({type: ADD_POST, newPostText})     
export const setUserProfile = (profile: ProfileType): setUserProfileType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): setStatusType => ({type: SET_STATUS, status})
export const deletePost = (postId: number): deletePostType => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos: string | null): savePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId: number)
            : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>=> async (dispatch, getState) => {
    let response = await ProfileAPI.getProfile(userId)    //UsersAPI.getProfile(userId)

    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId: number)
            : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch, getState) => {
    let response = await ProfileAPI.getStatus(userId)
//@ts-ignore
    dispatch(setStatus(response.data));
}
export const updateStatus = (status: string)
            : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch, getState) => {
    let response = await ProfileAPI.updateStatus(status)

    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (photoFile: any)
            : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch, getState) => {
    let response = await ProfileAPI.savePhoto(photoFile)
        
    if (response.data.resultCode === ResultCodesEnum.Success) {
        
        dispatch(savePhotoSuccess(response.data.photos));
    }
}
export const saveProfile = (profile: ProfileType)
            : ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> => async (dispatch, getState) => {
    const userId = initialState.auth.userId;         //const userId = getState().auth.userId;
    const response = await ProfileAPI.saveProfile(profile);
        
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        //@ts-ignore
        dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": response.data.messages[0]} } ));
        return Promise.reject(response.data.messages[0]);
    }
}


export default profileReducer;