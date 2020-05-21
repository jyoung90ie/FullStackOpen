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

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad

    // round to decimal places
    const decimals = 1

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

        return avgScore.toFixed(decimals)
    }

    // return % of feedback that is positive
    const positiveFeedback = () => {
        if (good === 0) {
            return 0
        }
        const total = totalFeedback()
        const positivePercentage = (good / total) * 100

        // output percent with % sign appended
        return positivePercentage.toFixed(decimals) + ' %'
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
            <table>
                <tbody>
                    <Statistic text="good" value={good} />
                    <Statistic text="neutral" value={neutral} />
                    <Statistic text="bad" value={bad} />
                    <Statistic text="all" value={totalFeedback()} />
                    <Statistic text="average" value={feedbackAverage()} />
                    <Statistic text="positive" value={positiveFeedback()} />
                </tbody>
            </table>
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
