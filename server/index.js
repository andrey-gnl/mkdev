const express = require('express');
const app = express();

let tickets = require('./data/tickets.mock.json');

const port = 3000;

app.get('/api/tickets', (req, res) => {
    setTimeout(() => res.send(tickets), 750)
});

app.delete('/api/tickets/:id', (req, res) => {
    const id = Number(req.params.id);
    tickets = tickets.filter((el) => el.id !== id);
    setTimeout(() => res.send({ status: 'ok'}), 500);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

