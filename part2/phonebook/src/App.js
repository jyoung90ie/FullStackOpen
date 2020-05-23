import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '123-456-7890'
        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
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
        // set persons with new object
        setPersons(persons.concat(personObject))
        // reset input value to blank
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
            <h2>Numbers</h2>

            {persons.map(person =>
                <div key={person.name}>{person.name} {person.number}</div>
            )}
        </div>
    )
}

export default App