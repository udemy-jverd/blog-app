import axios from 'axios';
import React, { useState } from 'react';

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        });
        setContent('');
    };

    return <div onSubmit={onSubmitHandler}>
        <form>
            <div className='form-group'>
                <label>New comment</label>
                <input
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    className='form-control'>
                </input>
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>;
}

export default CommentCreate;
