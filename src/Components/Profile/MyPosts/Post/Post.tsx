import React, { FC } from "react";
// @ts-ignore  
import s from './Post.module.css';

type PropsType = {
    message: string
    likesCount: number
}

let Post: FC<PropsType> = (props) => {                         
    return (
        <div className={s.item}>
            <img src="https://websait.ua/wp-content/uploads/2015/05/avatar.png" alt="avatar" />
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;