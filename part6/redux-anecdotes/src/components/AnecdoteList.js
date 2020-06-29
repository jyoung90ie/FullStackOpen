import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
    setNotification,
    removeNotification
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = ({ id, content }) => {
        // add user vote
        dispatch(addVote(id))
        // user feedback message
        dispatch(setNotification(`You voted for '${content}'`))
        // remove notification after set time
        setTimeout(() => dispatch(removeNotification()), 5000)
    }

    return (
        <div>
            {
                anecdotes
                    .sort((a, b) => b.votes - a.votes)
                    .map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => vote(anecdote)}>vote</button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default AnecdoteList