import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 1,
        title: 'First Post!',
        content: 'Hello World!',
    },
    {
        id: 2,
        title: 'Second Post!',
        content: 'More text',
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            // prepare is a function that lets us define the action object's contents, it comes before the reducer
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId
                    }
                }   
            },
            reducer(state, action) {
                //not mutating the state directly, this only works because of redux toolkit immerjs inside createSlice
                state.push(action.payload)
                console.log("Post created!")
                console.log(action.payload);
            },
        },
    }
})

export const selectAllPosts = state => state.posts;
export const { postAdded } = postsSlice.actions;    
export default postsSlice.reducer