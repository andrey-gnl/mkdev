import React from 'react'
import {formatDate} from '../../utils'

const Card = (props) => {
  const {data, handleClick} = props
  let cardClass = 'card'
  const taskIsPending = data.pending
  taskIsPending && (cardClass += ' disabled')

  return (
    <div className={cardClass}>
      <button
        type="button"
        className="card__button"
        onClick={() => handleClick(data.id)}
        disabled={taskIsPending}
      >
        <i className="fa fa-times"/>
      </button>

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