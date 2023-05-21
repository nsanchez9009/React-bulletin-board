import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    {
        id: 1,
        title: 'First Post!',
        content: 'Hello World!',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
        },
    },
    {
        id: 2,
        title: 'Second Post!',
        content: 'More text',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
        },
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
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0,
                        },
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
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
    
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
    }
})

export const selectAllPosts = state => state.posts;
export const { postAdded, reactionAdded } = postsSlice.actions;    
export default postsSlice.reducer