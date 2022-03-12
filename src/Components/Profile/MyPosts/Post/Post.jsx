import React from "react";
import s from './Post.module.css';

let Post = (props) => {                          //Надо сделать похожее для компоента Dialogs.jsx
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

// debugger;
// return (
//     <div className={s.posts}>
//         <div className={s.item}> <img src="http://surl.li/aowpa" alt="ava" /> {props.messages}</div>
//         <div><span>like: {props.likesCount}</span></div>
//         <div className={s.item}> <img src="http://surl.li/aowsi" alt="ava" /> {props.messages}</div>
//         <div><span>like: {props.likesCount}</span></div>
//         <div className={s.item}> <img src="http://surl.li/aowpk" alt="ava" /> post 3</div>
//         <div><span>like</span></div>
//         <div className={s.item}> <img src="http://surl.li/aowpp" alt="ava" /> post 4</div>
//         <div><span>like</span></div>
//         <div className={s.item}> <img src="http://surl.li/aowpt" alt="ava" /> post 5</div>
//         <div><span>like</span></div>
//         <div className={s.item}> <img src="http://surl.li/aowpx" alt="ava" /> post 6</div>
//         <div><span>like</span></div>
//      </div>
// )
// }

export default Post;