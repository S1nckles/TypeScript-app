import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "61e23f5e-bfd8-41ee-a0fb-4b7831f35a4d"
    }
})
export const UsersAPI = {
    getUsers(currentpage, pagesize) {
        return instance.get(`users?page=${currentpage}&count=${pagesize}`)
            .then(response => {
                return response.data;
            });
    },
    delFollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    getFollow(userId) {
        return instance.get(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },
    getProfile(userId) {
        console.warn('dadadadad')
        return ProfileAPI.getProfile(userId);
    }
}

export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    }
}

export const AuthAPI = {
    me() {
        return instance.get(`auth/me`); 
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`profile/login`, {email, password, rememberMe, captcha});
    },
    logOut() {
        return instance.delete(`profile/login`);
    }
}

export const SecurityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`); 
    }
}
