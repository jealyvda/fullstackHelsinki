const express = require('express')
const app = express()

let morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan("tiny"))

// app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

// morgan.token('content', (req, res) => {
//   return JSON.stringify(req.body)
// })

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
    const date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people<br />${date}
  </p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, res) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateRandomId = () => {
    const id = Math.floor(Math.random() * 100000)
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    } else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateRandomId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})