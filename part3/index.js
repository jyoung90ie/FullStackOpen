const express = require('express')
const morgan = require('morgan')

const app = express()

// activate http request logger
app.use(morgan('tiny'))

// activate json parser
app.use(express.json())



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
    response.json(persons)
})

// display detail view for a single person within the persons object
app.get('/api/persons/:id', (request, response) => {
    // get id from http request headers, convert to number
    const id = Number(request.params.id)
    // check that id exists within the persons object
    const person = persons.find(person => person.id === id)

    // check that id exists, otherwise return 404
    if (person) {
        // display contents 
        response.json(person)
    } else {
        // return 404 (not found)
        response.status(404).end()
    }
})

// delete entry from persons object
app.delete('/api/persons/:id', (request, response) => {
    // get id from http request headers, convert to number
    const id = Number(request.params.id)
    // check that id exists within the persons object
    const person = persons.find(person => person.id === id)

    // check that id exists, otherwise return 404
    if (person) {
        // remove the entry and return 204 (Successful, no content required)
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    } else {
        // return 404 (not found)
        response.status(404).end()
    }
})

// create an id for new entries in the persons object
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => person.id))
        : 0

    return maxId + 1
}

// add new entries to persons object
app.post('/api/persons', (request, response) => {
    const body = request.body

    // check that user submitted data
    if (!body.name || !body.number) {
        return response.status('400').json({
            error: 'content missing'
        })
    }

    // check that name does not already exist
    const findPerson = persons.find(person => {
        return person.name.toLowerCase() === body.name.toLowerCase()
    })

    if (findPerson) {
        // name already exists, raise error
        return response.status('400').json({
            error: 'name must be unique'
        })
    }

    // construct person object
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    // add new person to existing persons object
    persons = persons.concat(person)
    // present the new persons object
    response.json(persons)
})

// display information relating to persons object
app.get('/info', (request, response) => {
    // get the date and convert to a text string
    const date = new Date().toString()
    // get the number of entries in the persons object
    const personsCount = Object.keys(persons).length

    const content = `Phonebook has info for ${personsCount} people
    <br><br>${date}`

    response.send(content)
})

const PORT = 3001

app.listen(PORT)
console.log(`Server listening on port ${PORT}`)