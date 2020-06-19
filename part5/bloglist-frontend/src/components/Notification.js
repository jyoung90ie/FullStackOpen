import React from 'react'

const Notification = ({ message, className }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={className}>
            <p>{message}</p>
        </div>
    )
}

export default Notification