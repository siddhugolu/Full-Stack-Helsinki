import React from 'react'

const Notification = ({ message, isFailure }) => {
    if(message === null) {
        return null
    }

    let messageClass = isFailure ? "error" : "success"

    return (
        <div className={messageClass}>
            {message}
        </div>
    )
}

export default Notification