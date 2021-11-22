const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.post('/posts/create', async (req, res) => {
    const { title }= req.body;
    const id = randomBytes(4).toString('hex');
    posts[id] = { id, title };

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: posts[id]
    })
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    const { type }  = req.body;
    if (type === 'PostCreated') {
        console.log('POSTS - Event received: ', req.body);
    }
    res.status(200).send({});
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
