import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ text, func }) => {
    return (
        <button onClick={func}>
            {text}
        </button>
    )
}

const Header = ({ text }) => {
    return (
        <h1>
            {text}
        </h1>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

    const getRandom = () => {
        // get length of array
        // note: array starts at 0, so length will always be > array final index
        const numberOfAnecdotes = props.anecdotes.length

        // return a random number between 0 and numberOfAnecdotes
        const randomNumber = Math.floor(Math.random() * numberOfAnecdotes)
        return randomNumber
    }

    // used to update votes for specified anecdote
    const updateVotes = () => {
        // copy the votes array
        const newVotes = [...votes]
        // increment specified anecdotes, using state variable, 'selected'
        newVotes[selected] += 1
        // set state to newVotes
        setVotes(newVotes)
        // test
        mostVotesAnecdote()
    }

    // return the index of the array value with the most votes
    const mostVotesAnecdote = () => {
        // get max value contained in array
        const maxValue = Math.max(...votes)

        // return the array index of the max value
        const mostVotesIndex = votes.indexOf(maxValue)

        return mostVotesIndex
    }

    const indexMostVotes = mostVotesAnecdote()

    return (
        <div>
            <Header text="Anecdote of the day" />
            {props.anecdotes[selected]}<br />
            has {votes[selected]} votes<br />
            <Button text="vote" func={() => updateVotes()} />
            <Button text="next anecdote" func={() => setSelected(getRandom())} />

            <Header text="Anecdote with most votes" />
            {props.anecdotes[indexMostVotes]}<br />
            has {votes[indexMostVotes]} votes
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)