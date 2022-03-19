import axios from 'axios';
import { ProfileType } from '../types/Types';

//~~~~~~enum~~~~~~//

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeWithCaptcha {
    CaptchaIsRequired = 10,
}

//~~~~~~type~~~~~~//

type LoginResponseType = {
    data: {
        id: number,
        email: string, 
        login: string
    }
    resultCode: ResultCodesEnum | ResultCodeWithCaptcha
    messages: Array<string>
}

type LogOutResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

type GetIdType = {
    userId: number
}

type UpdateType = {
    status: string
    resultCode: ResultCodesEnum 
}

type SavePhotoType = {
    photoFile: any
    resultCode: ResultCodesEnum
}

//~~~~~~~~~~~~~~~~~//

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "61e23f5e-bfd8-41ee-a0fb-4b7831f35a4d"
    }
})
export const UsersAPI = {
    getUsers(currentpage: number, pagesize: number) {
        return instance.get(`users?page=${currentpage}&count=${pagesize}`)
            .then(response => {
                return response.data;
            });
    },
    delFollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    getFollow(userId: number) {
        return instance.get(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    getProfile(userId: number) {
        console.warn('dadadadad')
        return ProfileAPI.getProfile(userId);
    }
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<GetIdType>(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get<GetIdType>(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put<UpdateType>(`profile/status`, {status: status});
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<SavePhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: Array<ProfileType>) {
        return instance.put(`profile`, profile);
    }
}



export const AuthAPI = {
    me() {
        return instance.get<LoginResponseType>(`auth/me`).then(res => res.data); 
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha});
    },
    logOut() {
        return instance.delete<LogOutResponseType>(`auth/login`);
    }
}

export const SecurityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`); 
    }
}
