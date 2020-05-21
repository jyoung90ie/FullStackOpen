import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const App = (props) => {
    const [selected, setSelected] = useState(0)

    const getRandom = () => {
        // get length of array
        // note: array starts at 0, so length will always be > array final index
        const numberOfAnecdotes = props.anecdotes.length

        // return a random number between 0 and numberOfAnecdotes
        const randomNumber = Math.floor(Math.random() * numberOfAnecdotes)
        return randomNumber
    }

    return (
        <div>
            {props.anecdotes[selected]}
            <br />
            <br />
            <button onClick={() => setSelected(getRandom())}>
                Randomise
            </button>
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