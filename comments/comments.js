const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    res.status(200).send(commentsByPostId[id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const { content }= req.body;
    const { id } = req.params;
    const commentId = randomBytes(4).toString('hex');
    const comments = commentsByPostId[id] || [];
    comments.push({ id: commentId, content, status: 'pending' });
    commentsByPostId[id] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: { id: commentId, content, postId: id, status: 'pending' }
    });
    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        console.log('COMMENTS - Event received: ', req.body);
        const { id, postId, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        })
        comment.status = status;
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: { id, status, postId, content }
        });
    }
    res.status(200).send({});
});

app.listen(4001, () => {
    console.log('Listening on port 4001')
});
