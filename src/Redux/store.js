import profileReducer from './profile-reducer.js';
import dialogsReducer from './dialogs-reducer.js';
import sidePanelReducer from './sidePanel-reducer';
import usersReducer from './users-reducer';


let store = {
    _state: {
        profilePage: {
            posts: [{
                    id: 1,
                    message: 'Hello',
                    likesCount: 10
                },
                {
                    id: 2,
                    message: 'Wellcome to Navi',
                    likesCount: 4
                }
            ],
            profile: null,
            newPostText: []
        },
        dialogPage: {
            dialogs: ([{
                    id: 1,
                    name: 'Andrew'
                },
                {
                    id: 2,
                    name: 'Ivanna'
                },
                {
                    id: 3,
                    name: 'Mike'
                },
                {
                    id: 4,
                    name: 'Solomon'
                },
                {
                    id: 5,
                    name: 'Sasha'
                },
                {
                    id: 6,
                    name: 'Anna'
                }
            ]),
            messages: [{
                    id: 1,
                    message: 'Hi'
                },
                {
                    id: 2,
                    message: 'how do you do?'
                },
                {
                    id: 3,
                    message: 'I like CS:GO'
                },
                {
                    id: 4,
                    message: 'Nice'
                },
                {
                    id: 5,
                    message: 'OMG'
                },
                {
                    id: 6,
                    message: 'Punch'
                }
            ],

            newMessageText: ''
        },
        // usersPage: {
        //     users: [{
        //             id: 1,
        //             photos: '',
        //             followed: true,
        //             name: '',
        //             status: '',
        //             location: {
        //                 city: '',
        //                 country: ''
        //             }
        //         }],
        //     pageSize: 10,
        //     totalUsersCount: 0,
        //     currentPage: 1,
        //     isFetching: true,
        //     followingInProgress: []
        // },
        // auth: {
        //     userId: null,
        //     email: null,
        //     login: null,
        //     isAuth: false
        // },
        // app: {
        //     initialized: false
        // },

        sidePanel: {}

    },
    _callSubscriber() {

    }, //Рендер state.js

    getState() {
        return this._state;
    },
    subscribe(observer) {
        store._callSubscriber = observer; // observer - Наблюдатель; помог убрать зациклинность.
    },

    dispatch: (action) => {
        this.getState()._state.profilePage = profileReducer(this.getState()._state.profilePage, action);
        this.getState().dialogPage = dialogsReducer(this.getState().dialogPage, action);
        this.getState().sidePanel = sidePanelReducer(this.getState().sidePanel, action);
        this.getState().usersPage = usersReducer(this.getState().usersPage, action);

        store._callSubscriber(store._state);
    } //Dispatch - Отправлять, action - объект.
    //В объекта должен объязательно быть { type: //'ADD-POST' } , который должна иметь текстовый тип.
}
window.store = store;
// store - OOP




// users: [{
//     id: 1,
//     photoUrl: 'https://imsg2.freepng.ru/20180331/khw/kisspng-computer-icons-user-clip-art-user-5abf13d4b67e20.4808850915224718927475.jpg',
//     followed: true,
//     fullName: 'Andrew',
//     status: 'I Milliarder',
//     location: {
//         city: 'Lviv',
//         country: 'Ukraine'
//     }
// },
// {
//     id: 1,
//     photoUrl: 'https://imgs2.freepng.ru/20180331/khw/kisspng-computer-icons-user-clip-art-user-5abf13d4b67e20.4808850915224718927475.jpg',
//     followed: false,
//     fullName: 'Mike',
//     status: 'Free Fire',
//     location: {
//         city: 'Kopengagen',
//         country: 'DenMark'
//     }
// },
// {
//     id: 1,
//     photoUrl: 'https://imgs2.freepng.ru/20180331/khw/kisspng-computer-icons-user-clip-art-user-5abf13d4b67e20.4808850915224718927475.jpg',
//     followed: false,
//     fullName: 'Sensey',
//     status: 'Nihao',
//     location: {
//         city: 'Tokyo',
//         country: 'Japan'
//     }
// }
// ],