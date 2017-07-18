const express = require('express')
const app = express()
const path = require('path')

let tickets = require('./data/tickets.mock.json')

const port = process.env.PORT || 3003
app.set('port', port)

app.get('/api/tickets', (req, res) => {
  setTimeout(() => res.send(tickets), 750)
})

app.delete('/api/tickets/:id', (req, res) => {
  const id = Number(req.params.id)
  tickets = tickets.filter((el) => el.id !== id)
  setTimeout(() => res.send({status: 'ok'}), 500)
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')))
  app.use('/', express.static(path.join(__dirname + '/public')))
}

const server = app.listen(app.get('port'), () => {
  console.log('API server starts on port ' + port)
})