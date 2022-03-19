
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { createStore, applyMiddleware } from 'redux';

// const store = createStore(reducer, composeWithDevTools(
//     applyMiddleware(...middleware),
// ));

// export default store;

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
//@
import authReducer from './auth-reducer.ts';
import profileReducer from './profile-reducer.ts';
import dialogsReducer from './profile-reducer.ts';
import sidePanelReducer from './profile-reducer.ts';
import usersReducer from './users-reducer.ts';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer.ts';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidePanel: sidePanelReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window._store_ = store;

export default store;