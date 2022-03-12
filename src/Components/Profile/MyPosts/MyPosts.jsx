import React from "react";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../../common/FormsControls/FormsControls.jsx";
import { maxLengthCreator, required } from "../../../utils/validators/validators.js";
import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = React.memo(props => {
    debugger;
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

    // let newPostElement = React.createRef();

    let addNewPost = (values) => {                 
        props.addPost(values.newPostText);
        alert(values.newPostText);
    }
        
        // let onPostAdd = () => {
        //     props.addPost();
        // }

        // let onPostChange = () => {
        //     let text = newPostElement.current.value;
        //     props.updateNewPostText(text);
        // }
    
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
// const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newPostText"
                validate={[required, maxLengthCreator(10)]} />          {/*maxLength10*/}
            </div>
            {/* <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} /> */}
            <div>
                <button>add post</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'profileAddPostForm' })(AddPostForm);

export default MyPosts;