const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
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
    ]
}

const dialogsReducer = (state = initialState, action) => {


    switch (action.type) {
        case ADD_MESSAGE:
            let messageText = action.newMessageText;
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id: 6, message: messageText}]
            };
        default:
            return state;
    }
}

export const addMessageCreator = (newMessageText) => ({type: ADD_MESSAGE, newMessageText})

export default dialogsReducer;