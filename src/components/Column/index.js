import React from 'react'
import PropTypes from 'prop-types'

const Column = (props) => {
    const {title, isEmpty} = props
    return (
        <div className="column">
            <div className="column__inner">
                <h2 className="column__title">{title}</h2>
                <div className="column__body">
                    {props.children}
                    {isEmpty && <div className="column__empty">Is empty...</div>}
                </div>
            </div>
        </div>
    )
}
export default Column