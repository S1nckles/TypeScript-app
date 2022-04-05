import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar.tsx';
import {Route, Routes} from 'react-router-dom';                                         //, withRouter
import { connect } from 'react-redux';
import { compose } from 'redux';
import {initializeApp} from "./Redux/app-reducer.ts";
// import { withSuspense } from './Components/hoc/withSuspense';      //Suspense - Пердохранители
import Login from './Components/Login/Login.tsx';
import HeaderContainer from './Components/Header/HeaderContainer.tsx';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer.tsx';
import Profile from './Components/Profile/Profile.tsx';
// import Preloader from './Components/common/Preloader/Preloader';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

// const Profile = React.lazy(() => import('./Components/Profile/Profile'));  // No working
 
class App extends Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);    
    // AuthAPI.me()
    // .then(response => {
    //     if (response.data.resultCode === 0) {
    //         let { id, login, email } = response.data.data;
    //         this.props.setAuthUserData(id, login, email)
    //     }
    // });
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
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
