import React from "react";
import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hello', likesCount: 10},
        {id: 2, message: 'Wellcome to Navi', likesCount: 4},
        {id: 3, message: 'Hello', likesCount: 10},
        {id: 4, message: "It's IT sphere", likesCount: 4}
    ]      
};

it('length of post should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator("It's IT sphere");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(5);
});

it("message of new post should be `It's IT sphere`", () => {
    // 1. test data
    let action = addPostActionCreator("It's IT sphere");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[3].message).toBe("It's IT sphere");
});

it('after deleting length of message should be decrement', () => {
    // 1. test data
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);
});
