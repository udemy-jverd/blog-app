const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);

    axios.post('http://posts-srv:4000/events', event)
        .catch((e) => console.log(`4000: ${e.message}`));
    axios.post('http://comments-srv:4001/events', event)
        .catch((e) => console.log(`4001: ${e.message}`));
    axios.post('http://query-srv:4002/events', event)
        .catch((e) => console.log(`4002: ${e.message}`));
    axios.post('http://moderation-srv:4003/events', event)
        .catch((e) => console.log(`4003: ${e.message}`));

    res.status(200).send({ status: 'Ok' });
});

app.get('/events', (req, res) => {
    res.status(200).send(events);
});

app.listen(4005, () => {
    console.log('Listening on port 4005')
});
