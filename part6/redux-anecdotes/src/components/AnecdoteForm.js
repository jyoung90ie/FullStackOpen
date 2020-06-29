import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnecdote = (event) => {
        event.preventDefault()

        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''

        return dispatch(addAnecdote(anecdote))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAddAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )

}

export default AnecdoteForm