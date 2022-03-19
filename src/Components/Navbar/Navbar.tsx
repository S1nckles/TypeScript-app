import React from "react";
// @ts-ignore
import s from "./Navbar.module.css";
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return(
        <div className={s.nav}>
            <div className={`${s.item} ${s.active}`}><NavLink to='/profile'>Profile</NavLink></div>
            <div className={`${s.item} ${s.active}`}><NavLink to='/dialogs'>Messages</NavLink></div>
            <div className={s.item}><a href='#s'>News</a></div>
            <div className={s.item}><a href='#s'>Music</a></div>

            <div className={`${s.nav__settings} ${s.active}`}> <NavLink to='/users'> Find users </NavLink> </div>

            <div className={s.nav__settings}><a href='#s'>Settings</a></div>

            <div className={s.friends}>
                <h2>Friends</h2>
                    <a href="#s"><img src="https://websait.ua/wp-content/uploads/2015/05/avatar.png" alt="avatar" /></a>
                    <a href="#s"><img src="https://websait.ua/wp-content/uploads/2015/05/avatar.png" alt="avatar" /></a>
                    <a href="#s"><img src="https://websait.ua/wp-content/uploads/2015/05/avatar.png" alt="avatar" /></a>
                <div className={s.friends__item}>
                    <a href="#s">Mike</a>
                    <a href="#s">Solomon</a>
                    <a href="#s">Anna</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar;