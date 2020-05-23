import React from 'react';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ parts }) => {
    // use map to create new array containing ONLY exercise values
    // use reduce to sum each value
    const total = parts.map(parts => +parts.exercises)
        .reduce((s, p) => s + p)

    return (
        <strong>total of {total} exercises</strong>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course