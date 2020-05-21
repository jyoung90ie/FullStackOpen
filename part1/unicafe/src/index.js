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

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad

    // return total amount of feedback
    const totalFeedback = () => good + neutral + bad

    // assign scores and return average score of feedback
    const feedbackAverage = () => {
        // total feedback
        const total = totalFeedback()

        if (total === 0) {
            return 0
        }

        // assigns scores to determine average
        const goodScore = good * 1
        const neutralScore = neutral * 0
        const badScore = bad * -1
        // calculate average
        const avgScore = (goodScore + neutralScore + badScore) / total

        return avgScore
    }

    // return % of feedback that is positive
    const positiveFeedback = () => {
        if (good === 0) {
            return 0
        }
        const total = totalFeedback()

        return (good / total) * 100 + ' %'
    }

    // check whether feedback has been submitted

    if (totalFeedback() === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <>
            <Header text="statistics" />
            <Feedback text="good" value={good} />
            <Feedback text="neutral" value={neutral} />
            <Feedback text="bad" value={bad} />
            <Feedback text="all" value={totalFeedback()} />
            <Feedback text="average" value={feedbackAverage()} />
            <Feedback text="positive" value={positiveFeedback()} />
        </>
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
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
