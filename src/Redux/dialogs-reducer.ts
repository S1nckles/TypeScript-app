const ADD_MESSAGE = 'ADD-MESSAGE';

// export type InitialStateType = {
//     dialogs: ([{
//         id: number,
//         name: string
//     },
//     {
   
//         id: number,
//         name: string
    
//     },
//     {
   
//         id: number,
//         name: string
    
//     },
//     {
   
//         id: number,
//         name: string
    
//     },
//     {
   
//         id: number,
//         name: string
    
//     },
//     {
   
//         id: number,
//         name: string
    
//     }
//     ]),
//     messages: [ {
   
//         id: number,
//         message: string
    
//     },
//     {
   
//         id: number,
//         message: string
    
//     },
//     {
   
//         id: number,
//         message: string
    
//     },
//     {
   
//         id: number,
//         message: string
    
//     },
//     {
   
//         id: number,
//         message: string
    
//     },
//     {
   
//         id: number,
//         message: string
    
//     }
//     ]
// }


type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [{
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
    ] as Array<DialogType> ,
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
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any) => {


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

type addMessageCreatorActionType = {
    type: typeof ADD_MESSAGE, 
    newMessageText: string
}

export const addMessageCreator = (newMessageText: string): addMessageCreatorActionType => ({type: ADD_MESSAGE, newMessageText})

export default dialogsReducer;