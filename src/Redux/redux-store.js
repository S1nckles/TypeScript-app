
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { createStore, applyMiddleware } from 'redux';

// const store = createStore(reducer, composeWithDevTools(
//     applyMiddleware(...middleware),
// ));

// export default store;

import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import authReducer from './auth-reducer';
import profileReducer from './profile-reducer';
import dialogsReducer from './profile-reducer';
import sidePanelReducer from './profile-reducer';
import usersReducer from './users-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidePanel: sidePanelReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window._store_ = store;

export default store;