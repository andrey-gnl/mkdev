import React, {Component} from 'react'
import { DragSource } from 'react-dnd'
import {formatDate} from '../../utils'
import {TYPES} from '../../constants'

const cardSource = {
  beginDrag(props) {
    const {id, status} = props.data
    return {id, status}
  },
  canDrag(props) {
    const {pendingStatus, pendingRemove} = props.data

    return !(pendingStatus || pendingRemove)
  }
}
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(TYPES.CARD, cardSource, collect)

export default class Card extends Component {
  render() {
    const {data, handleClick, isDragging, connectDragSource } = this.props
    let cardClass = 'card'
    const taskIsPendingRemove = data.pendingRemove
    const taskIsPendingStatus = data.pendingStatus
    taskIsPendingRemove && (cardClass += ' disabled')
    taskIsPendingStatus && (cardClass += ' waiting')
    console.log('data.pendingStatus', data.pendingStatus);
    return connectDragSource(
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
}
