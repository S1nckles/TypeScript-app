import React, { FC } from 'react';
import Paginator from "./Paginator/Paginator.tsx";
import User from "./User.jsx"
// @ts-ignore  
import { UserType } from "../../types/Types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: FC<PropsType> = ({currentPage, onPageChanged, pageSize, totalUsersCount, users, ...props}) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   pageSize={pageSize} totalItemsCount={totalUsersCount} />
        <div>
            {
                users.map(u => <User user={u}
                    followingInProgress={props.followingInProgress}
                    key={u.id}
                    unfollow={props.unfollow}
                    follow={props.follow} 
                    currentPage={undefined} 
                    onPageChanged={undefined} 
                    pageSize={undefined} totalUsersCount={undefined}                    />
                )
            }             
        </div>
    </div>
}

export default Users;