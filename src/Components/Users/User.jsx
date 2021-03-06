import React from "react";
import s from "./Users.module.css";
import userFindPhoto from '../../assets/img/Find_users_ava.png';
import { NavLink } from 'react-router-dom';
import Paginator from "./Paginator/Paginator.tsx";

let Users = ({currentPage, onPageChanged, pageSize, totalUsersCount, ...props}) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {/* <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.selectedPage} onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
            })}
        </div> */}

       <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize} totalUsersCount={totalUsersCount}/> 

        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div className={s.userPhoto}>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userFindPhoto} className={s.userPhoto} alt='Images' />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress
                                .some(id => id === u.id)}
                                onClick={() => { props.unfollow(u.id)}}>Unfollow</button>
                                        // props.toggleIsFollowingProgress(true, u.id);
                                        // UsersAPI.delFollow(u.id)
                                        //     .then(data => {
                                        //         if (data.data.resultCode === 0) {                                              
                                        //             props.unfollow(u.id)
                                        //         }
                                        //         props.toggleIsFollowingProgress(false, u.id);
                                        //     });
                            : <button disabled={props.followingInProgress
                                .some(id => id === u.id)} 
                                onClick={() => { props.follow(u.id)}}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                    </span>
                </span>
            </div>)
        }

    </div>
}

export default Users;