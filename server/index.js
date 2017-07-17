const express = require('express')
const app = express()
const path = require('path')
let tickets = require('./data/tickets.mock.json')

// const port = 3000

app.get('/api/tickets', (req, res) => {
  setTimeout(() => res.send(tickets), 750)
})

app.delete('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id)
  tickets = tickets.filter((el) => el.id !== id)
  setTimeout(() => res.send({status: 'ok'}), 500)
})

// Define the port to run on
app.set('port', 3000)

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', express.static(path.join(__dirname + '/public')))
// Listen for requests
const server = app.listen(app.get('port'), function () {
  const port = server.address().port
  console.log('Magic happens on port ' + port)
})
