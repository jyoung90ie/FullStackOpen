// import environment variables
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// MongoDB
const Person = require('./models/person.js')

// activate json parser
app.use(express.json())

// serve static files from build
app.use(express.static('build'))

// enable cross origin resource sharing
app.use(cors())

// create custom token for logger
morgan.token('body', (request, response) => JSON.stringify(request.body))

// activate http request logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// get phonebook entries from part 2
let persons = [
    {
        "name": "Ada Lovelace",
        "number": "123123",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Test",
        "number": "999-999-9999",
        "id": 4
    },
    {
        "name": "John",
        "number": "123-456-6788",
        "id": 5
    }
]

// homepage
app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

// return full persons object
app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
})

// display detail view for a single person within the persons object
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
})

// delete entry from persons object
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
})

// add new entries to persons object
app.post('/api/persons', (request, response) => {
    const body = request.body

    // check that user submitted data
    if (!body.name || !body.number) {
        return response.status('400').json({
            error: 'content missing'
        })
    }

    // create new person object for saving
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    // save to DB
    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
            console.log('Person added to DB', savedPerson)
        })

})

// display information relating to persons object
app.get('/info', (request, response) => {
    // get the date and convert to a text string
    const date = new Date().toString()
    // get the number of entries in the persons object
    Person.find({})
        .then(persons => {
            const personsCount = Object.keys(persons).length

            const content = `Phonebook has info for ${personsCount} people
    <br><br>${date}`

            response.send(content)
        })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})