// import React from "react";
// import Dialogs from "./Dialogs";
// import { updateNewMessageTextActionCreator, addMessageCreator } from "../../Redux/dialogs-reducer.js";
// import StoreContext from "../../StoreContext";
// import { connect } from "react-redux";


// const DialogsContainer = (props) => {

//     return <StoreContext.Consumer> 
//         {
//             (store) => {
//                 let state = store.getState().dialogPage;

//                 let onSendMessageClick = () => {
//                     store.dispatch(addMessageCreator())
//                 }

//                 let onMessageChange = (messageText) => {
//                     store.dispatch(updateNewMessageTextActionCreator(messageText))
//                 }


//                 return <Dialogs  updateNewMessageText={onMessageChange}
//                     sendMessage={onSendMessageClick} dialogPage={state} />
//             }
//         }
//         </StoreContext.Consumer>
// }

// let mapStateToProps = (state) => {
//     return {
//         dialogPage: state.dialogPage
//     }
// }

// let mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewMessageText: () => {
//             dispatch(addMessageCreator());
//         },
//         sendMessage: (messageText) => {
//             dispatch(updateNewMessageTextActionCreator(messageText));
//         }
//     }
// }

// const altDialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);

// export default DialogsContainer;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from "react";
// import Dialogs from "./Dialogs";
// import { updateNewMessageTextCreator, addMessageCreator } from "../../Redux/dialogs-reducer.js";
// import { connect } from "react-redux";

// let mapStateToProps = (state) => {
//     return {
//         dialogPage: state.dialogPage
//     }
// }

// let mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessage: () => {
//             dispatch(addMessageCreator());
//         },
//         updateNewMessageText: (messageText) => {
//             dispatch(updateNewMessageTextCreator(messageText));
//         }
//     }
// }

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

// export default DialogsContainer;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import Dialogs from "./Dialogs";
import { addMessage } from "../../Redux/dialogs-reducer.ts";
import { connect } from "react-redux";
import { compose } from 'redux';
import { AppStateType } from "../../Redux/redux-store";
import actions from "redux-form/lib/actions";
// import { withAuthRedirect } from "../hoc/withAuthRedirect";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogPage: state.dialogPage,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageText) => {
            dispatch(actions.addMessage(newMessageText));
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions})//,
    // withAuthRedirect
)(Dialogs);

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

// export default DialogsContainer;