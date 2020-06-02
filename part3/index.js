const express = require('express')
const app = express()

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
    // check that id exists, otherwise return 404
    // get id from http request headers, convert to number
    const id = Number(request.params.id)
    // check that id exists within the persons object
    const person = persons.find(person => person.id === id)

    if (person) {
        // if id exists then display contents 
        response.json(person)
    } else {
        // id does not exist, return 404 (not found)
        response.status(404).end()
    }


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