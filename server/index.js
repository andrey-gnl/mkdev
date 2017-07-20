const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

let tickets = require('./data/tickets.mock.json')
let statuses = require('./data/statuses.mock.json')

const port = process.env.PORT || 3009

app.use(bodyParser.json());

app.get('/api/tickets', (req, res) => {
  setTimeout(() => res.send(tickets), 750)
})

app.delete('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id)
  tickets = tickets.filter((el) => el.id !== id)
  setTimeout(() => res.send({status: 'ok'}), 500)
});

app.put('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id)
  const status = Number(req.body.status)
  const statusIsValid = !!statuses.find(s => s.id === status)

  if(statusIsValid) {
    const task = tickets.find(el => el.id === id)
    task.status = status

    setTimeout(() => res.send({status: 'ok'}), 5000)
  } else {
    setTimeout(() => res.send({status: 'error'}), 5000)
  }

})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')))
  app.use('/', express.static(path.join(__dirname + '/public')))
}

const server = app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
server.on('listening',function(){
  console.log('ok, server is running');
});