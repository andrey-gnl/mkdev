import React from 'react'
import PropTypes from 'prop-types'

const Column = (props) => {
    return (
        <div className="column">
            <div className="column__inner">
                <h2 className="column__title">{props.title}</h2>
                {props.children}
            </div>
        </div>
    )
}
export default Column