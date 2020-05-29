import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchTerm, handleSearchChange }) => {
    return (
        <div>
            filter shown with <input value={searchTerm}
                onChange={handleSearchChange} />
        </div>
    )
}

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({ data }) => {
    return data.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>)
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    // get data from server
    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                console.log(response)
                setPersons(response.data)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const addPerson = (event) => {
        // stop form from refreshing page
        event.preventDefault()

        // check that both name and number are populated
        if (newName === '' || newNumber === '') {
            alert('You must provide values for name and number')
            return
        }

        // check that the name is not already in the list
        // (name is used for key, cannot be duplicated)
        const listOfNames = persons.map(person => person.name.toLowerCase())
        const nameLowerCase = newName.toLowerCase()

        if (listOfNames.includes(nameLowerCase)) {
            alert(`${newName} is already added to the phonebook`)
            return
        }

        const personObject = {
            name: newName,
            number: newNumber
        }
        // post new personObject to json server, so it is retained
        axios.post('http://localhost:3001/persons', personObject)
            .then(response => {
                // create new persons object which includes new addition
                // then set this to the persons variable
                setPersons(persons.concat(response.data))
                // reset input value to blank
                setNewName('')
                setNewNumber('')
            })
            .catch(error => {
                console.log('error occured adding new person object', error)
            })
    }

    // filter array
    // only include names that match string inputted - case is ignored
    const personsToShow = persons.filter(
        person => person.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName}
                newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons data={personsToShow} />
        </div>
    )
}

export default App