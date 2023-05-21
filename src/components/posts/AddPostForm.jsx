import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { postAdded } from './postsSlice'

export default function AddPostForm() {

    // Using useState because we only need to use this state in this component. No need to send to global state.
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const dispatch = useDispatch()

    function onSavePostClicked() {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )
            setTitle('')
            setContent('')
        }
    }
    
    const users = useSelector(selectAllUsers)

    function userOptions() {
        return users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
        ))
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId) //checking if all fields have a value
    
    return (
        <section>
            <h2>Add a New Post</h2>

            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value="">--select a user--</option>
                    {userOptions()}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />

                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Post</button>
            </form>
        </section>
    )
}