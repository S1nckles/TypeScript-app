import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';                                         //, withRouter
import { connect } from 'react-redux';
import { compose } from 'redux';
import {initializeApp} from "./Redux/app-reducer.js";
// import { withSuspense } from './Components/hoc/withSuspense';      //Suspense - Пердохранители
import Login from './Components/Login/Login';
import HeaderContainer from './Components/Header/HeaderContainer';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';
import Profile from './Components/Profile/Profile';
// import Preloader from './Components/common/Preloader/Preloader';


// const Profile = React.lazy(() => import('./Components/Profile/Profile'));  // No working
 
class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();     
    // AuthAPI.me()
    // .then(response => {
    //     if (response.data.resultCode === 0) {
    //         let { id, login, email } = response.data.data;
    //         this.props.setAuthUserData(id, login, email)
    //     }
    // });
  }

  render() {
    // if (!this.props.initialized) {
    //   return <Preloader />
    // }

    return (
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />    
          <div className="app-wrapper-content">
              <Routes>  
                <Route path='/dialogs' element={ <DialogsContainer /> } />  {/* {withSuspense(DialogsContainer)} */}
                <Route path='/profile/:userId' element={ <Profile /> }/>    {/* withSuspense(Profile) */}
                <Route path='/users' element={ <UsersContainer /> } />      {/* withSuspense(UsersContainer) */}
                <Route path='/login' element={ <Login/> } />                {/* withSuspense(Login) */}
              </Routes>
          </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose( 
  connect(mapStateToProps, {initializeApp}),
  // withRouter
)(App);
