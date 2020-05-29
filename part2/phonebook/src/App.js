import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const Persons = ({ data, deletePerson }) => {
    return data.map(person => {
        return (
            <div key={person.name}>{person.name} {person.number}
                <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>
        )
    })
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    // get data from server
    useEffect(() => {
        // retrieve data from db and store in persons variable
        personsService.getAll()
            .then(data => setPersons(data))
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
            const confirmation = window.confirm(`${newName} is already part of the phonebook. Would you like to replace the existing number with a the one provided?`)

            // if user selects cancel, then stop 
            if (!confirmation) {
                return
            }
            // get existing person object
            const existingObject = persons.filter(person => {
                return person.name.toLowerCase() === nameLowerCase
            })[0]

            // store id of personObject to be updated
            const id = existingObject.id

            // create new object for this person which has updated number
            const newObject = {
                ...existingObject,
                number: newNumber
            }

            // send PUT request to update db
            personsService.update(id, newObject)
                .then(updatedPerson => {
                    // update was successful, take response data and update state variable
                    const updatedPersons = persons.map(person =>
                        person.id === id ? updatedPerson : person)
                    setPersons(updatedPersons)

                    // reset form inputs
                    setNewName('')
                    setNewNumber('')
                })
            // prevent application from executing any further
            return
        }

        // create object with user inputs for creating new db entry
        const personObject = {
            name: newName,
            number: newNumber
        }

        // sendPOST request to db, so user data is retained across sessions
        personsService.create(personObject)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                // empty input field values
                setNewName('')
                setNewNumber('')
            })
    }

    const deletePerson = (id) => {
        // find out index by creating array of id's, then searching for id passed through
        const index = persons.map(person => person.id).indexOf(id)
        const confirmation = window.confirm(`Do you want to delete ${persons[index].name}?`)

        // if user cancels prompt, do nothing
        if (!confirmation) {
            return
        }

        // send HTTP DELETE request to db, handle errors
        personsService.remove(id)
            .then(response => {
                // make sure that the delete was successful before updating persons variable
                if (response.status === 200) {
                    setPersons(persons.filter(person => person.id !== id))
                }
            })
            .catch(error => {
                alert(`${persons[index].name} was already deleted from the server`)
                setPersons(persons.filter(person => person.id !== id))
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
            <Persons data={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default App