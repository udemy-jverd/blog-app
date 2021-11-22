const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data }  = req.body;

    if (type === 'CommentCreated') {
        console.log('COMMENTS - Event received: ', req.body);
        const { id, postId, content } = data;
        const status = content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: { id, postId, status, content }
        });
    }
    res.status(200).send({});
});

app.listen(4003, () => {
    console.log('Listening on port 4003')
});
