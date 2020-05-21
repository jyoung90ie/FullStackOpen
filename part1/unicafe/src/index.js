import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ text, role }) => {
    return (
        <button onClick={role}>
            {text}
        </button>
    )
}

const Feedback = ({ text, value }) => {
    return (
        <p>{text} {value}</p>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
        <div>
            <Header text="give feedback" />
            <Button text="good" role={() => setGood(good + 1)} />
            <Button text="neutral" role={() => setNeutral(neutral + 1)} />
            <Button text="bad" role={() => setBad(bad + 1)} />
            <Header text="statistics" />
            <Feedback text="good" value={good} />
            <Feedback text="neutral" value={neutral} />
            <Feedback text="bad" value={bad} />

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
