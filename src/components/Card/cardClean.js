import React from 'react'
import { formatDate } from '../../utils'

const Card = (props) => {
  const { data, handleClick, isDragging } = props
  let cardClass = 'card'
  const taskIsPendingRemove = data.pendingRemove
  const taskIsPendingStatus = data.pendingStatus
  taskIsPendingRemove && (cardClass += ' disabled')
  taskIsPendingStatus && (cardClass += ' waiting')

  return (
    <div className={`${cardClass} ${isDragging ? 'waiting' : ''}`}>
      <button
        type="button"
        className="card__button"
        onClick={() => handleClick(data.id)}
        disabled={taskIsPendingRemove || taskIsPendingStatus || isDragging}
      >
        <i className="fa fa-times" />
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
