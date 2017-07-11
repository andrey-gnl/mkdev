const express = require('express');
const app = express();

const tickets = require('./data/tickets.mock.json');

const port = 3000;

app.get('/api/tickets', (req, res) => {
    res.send(tickets);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});