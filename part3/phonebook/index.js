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
const { response } = require('express')
const { baseModelName } = require('./models/person')

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

app.get('/info', async (request, response) => {
    const date = new Date()
    const count = await Person.count()
  response.send(`<p>Phonebook has info for ${count} people<br />${date}
  </p>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
      response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const generateRandomId = () => {
//     const id = Math.floor(Math.random() * 100000)
//     return id
// }

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    } else {
      Person
      .findOne({ name: body.name })
      .then(person => {       
        if (person) {

        const newPerson = {
          name: body.name,
          number: body.number,
        }

        Person.findByIdAndUpdate(person._id, newPerson, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
          response.json(updatedPerson)
        })
        .catch(error => next(error))

        } else {
          const person = new Person({
            name: body.name,
            number: body.number,
          })

          person.save()
          .then(savedPerson => {
            response.json(savedPerson)
          }).catch(error => next(error))}}) 
    }})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})