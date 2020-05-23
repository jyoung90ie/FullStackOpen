import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            id: 1
        }
    ])
    const [newName, setNewName] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        // stop form from refreshing page
        event.preventDefault()
        const personObject = {
            name: newName,
            id: persons.length + 1
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
                <div key={person.id}>{person.name}</div>
            )}
        </div>
    )
}

export default App