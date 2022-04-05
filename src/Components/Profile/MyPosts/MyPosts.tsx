import React, { FC } from "react";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../../common/FormsControls/FormsControls.tsx";
import { maxLengthCreator, required } from "../../../utils/validators/validators.ts";
import s from './MyPosts.module.css';
import Post from "./Post/Post.tsx";

type PropsType = {
    addPost: any
    posts: any
    newPostText: string
    handleSubmit: any
}

const MyPosts: FC<PropsType>= React.memo(props => {
    
    

    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

    // let newPostElement = React.createRef();

    let addNewPost = (values: any) => {                 
        props.addPost(values.newPostText);
        alert(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <div>
                My posts
            </div>
            <div>
                New post
            </div>

            <AddMessageFormRedux onSubmit={addNewPost} />
                
            <div className={s.posts}>
                {postsElements}
            </div>
                
        </div>
    )
});


const AddPostForm: FC<PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newPostText"
                validate={[required, maxLengthCreator(10)]} />    
            </div>
            <div>
                <button>add post</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'profileAddPostForm' })(AddPostForm);

export default MyPosts;