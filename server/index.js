const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

let tickets = require('./data/tickets.mock.json')
let statuses = require('./data/statuses.mock.json')

const port = process.env.PORT || 3009
const DELETE_STATUS = 5

app.use(bodyParser.json())

app.get('/api/tickets', (req, res) => {
  const onlyActiveTickets = tickets.filter((el) => Number(el.status) !== Number(DELETE_STATUS))

  setTimeout(() => res.send(onlyActiveTickets), 750)
})

app.get('/api/tickets/archive', (req, res) => {
  const filteredByStatus = tickets.filter((el) => Number(el.status) === 5)

  setTimeout(() => res.send(!!(filteredByStatus.length) ? filteredByStatus : []), 750)
})


app.get('/api/statuses', (req, res) => {
  const visibleStatuses = statuses.filter(s => s.order >= 0)
  setTimeout(() => res.send(visibleStatuses), 750)
})

app.delete('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id)
  const deletedTicket = tickets.find((el) => el.id === Number(id))
  deletedTicket.status = DELETE_STATUS
  deletedTicket.updatedAt = new Date().toISOString()

  setTimeout(() => res.send({status: 'ok'}), 500)
})

app.put('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id)
  const status = Number(req.body.status)
  const statusIsValid = !!statuses.find(s => s.id === status)

  if (statusIsValid) {
    const task = tickets.find(el => el.id === id)
    task.status = status
    task.updatedAt = new Date().toISOString()

    setTimeout(() => res.send({status: 'ok'}), 750)
  } else {
    setTimeout(() => res.send({status: 'error'}), 750)
  }

})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')))
  app.use('/', express.static(path.join(__dirname + '/public')))
}

const server = app.listen(port, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
})
server.on('listening', function () {
  console.log('ok, server is running')
})