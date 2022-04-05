import React, { MouseEvent } from "react";
import Header from "./Header.tsx";
import { connect } from "react-redux";
import {logOut} from "../../Redux/auth-reducer.ts";
import { AppStateType } from "../../Redux/redux-store";
// import { AuthAPI } from "../../api/api";

type MapStateProps = {
    isAuth: any
    login: any
}

class HeaderContainer extends React.Component {
    render() {
        return <Header login={false} 
                       logOut={function (event: MouseEvent<HTMLButtonElement, MouseEvent>): 
                       void { throw new Error("Function not implemented.");
        } } isAuth={false} {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): MapStateProps => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {logOut})(HeaderContainer);