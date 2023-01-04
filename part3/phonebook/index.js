require('dotenv').config()
const express = require('express')
const app = express()

let morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan("tiny"))

const Person = require('./models/person')

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

// app.get('/info', (request, response) => {
//     const date = new Date()
//   response.send(`<p>Phonebook has info for ${persons.length} people<br />${date}
//   </p>`)
// })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
})

app.delete('/api/persons/:id', (request, res) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

// const generateRandomId = () => {
//     const id = Math.floor(Math.random() * 100000)
//     return id
// }

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    // } else {
    //   Person.find({ name: body.name }).then(result => {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    //   })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})