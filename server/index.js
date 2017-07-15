const express = require('express');
const app = express();

const tickets = require('./data/tickets.mock.json');

const port = 3000;

app.get('/api/tickets', (req, res) => {
    res.send(tickets);
});

/*
app.delete('/api/tickets/:id', (req, res) => {
    let ticketsParse = JSON.parse(tickets);
    ticketsParse = ticketsParse.filter((el) => el.id !== req.params.id );

    res.send({ status: 'ok'})
});
*/

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

