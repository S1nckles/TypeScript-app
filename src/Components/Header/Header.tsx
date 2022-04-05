import React, { FC, MouseEventHandler } from "react";
//@ts-ignore
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';

type PropsType = {
    login: boolean
    logOut: MouseEventHandler<HTMLButtonElement>
    isAuth: boolean
}

const Header: FC<PropsType> = (props) => {
    return (
        <header className={s.header}>
            <div>
                <a href="#s" target="_blank"><img src="https://v.od.ua/uploads/92/logo.png" alt="Logo"/></a>
            </div>

            <div className={s.loginBlock}>
                { props.isAuth 
                    ? <div>{props.login} - <button onClick={props.logOut}>Log out</button> </div>
                    : <NavLink to={'/login'}><b>Login</b></NavLink>}
            </div>
        </header>
    )
}

export default Header;