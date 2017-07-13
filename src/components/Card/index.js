import React from 'react'
import {formatDate} from '../../utils'

const Card = (props) => {
    const {data} = props

    return (
        <div className="card">

            <div className="card__title">{data.title}</div>
            <div className="card__description">{data.description}</div>

            <div className="card__time meta">
                Created: {formatDate(data.createdAt)}
                <br />
                Edited: {formatDate(data.updatedAt)}
            </div>
        </div>
    )
}
export default Card