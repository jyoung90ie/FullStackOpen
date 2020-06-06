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

// homepage
app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

// return full persons object
app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

// display detail view for a single person within the persons object
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

// delete entry from persons object
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// add new entries to persons object
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    // check that user submitted data
    if (!body.name || !body.number) {
        return response.status(400).send({ error: 'content missing' })
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
        .catch(error => next(error))

})

// used to update phone numbers for existing entries
app.patch('/api/persons/:id', (request, response, next) => {
    const body = request.body

    if (!body.number) {
        return response.status(400).send({ error: 'number missing' })
    }

    const person = {
        number: body.number
    }

    const updateOptions = {
        new: true,              // true = return the updated object
        runValidators: true     // enable schema validators for updates
    }

    // send update to DB
    Person.findByIdAndUpdate(request.params.id, person, updateOptions)
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

// display information relating to persons object
app.get('/info', (request, response, next) => {
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
        .catch(error => next(error))
})


// error handling middleware
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Invalid ID format' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)


// app runtime configuration
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})