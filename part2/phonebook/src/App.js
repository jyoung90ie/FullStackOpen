import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas'
        }
    ])
    const [newName, setNewName] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        // stop form from refreshing page
        event.preventDefault()

        // check that the name is not already in the list
        // (name is used for key, cannot be duplicated)
        const listOfNames = persons.map(person => person.name.toLowerCase())

        const nameLowerCase = newName.toLowerCase()

        if (listOfNames.includes(nameLowerCase)) {
            alert(`${newName} is already added to the phonebook`)
            return
        }

        const personObject = {
            name: newName
        }
        // set persons with new object
        setPersons(persons.concat(personObject))
        // reset input value to blank
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>

            {persons.map(person =>
                <div key={person.name}>{person.name}</div>
            )}
        </div>
    )
}

export default App