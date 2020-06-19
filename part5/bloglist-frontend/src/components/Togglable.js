import React, { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    const toggleVisbility = () => {
        setVisible(!visible)
    }



    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisbility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisbility}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable