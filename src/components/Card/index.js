import React, {Component} from 'react'
import { DragSource } from 'react-dnd'
import {formatDate} from '../../utils'
import {TYPES} from '../../constants'

const cardSource = {
  beginDrag(props) {
    return {id: props.data.id}
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
    const taskIsPending = data.pending
    taskIsPending && (cardClass += ' disabled')

    return connectDragSource(
      <div className={cardClass} style={{
        opacity: isDragging ? 0.5 : 1
      }}>
        <button
          type="button"
          className="card__button"
          onClick={() => handleClick(data.id)}
          disabled={taskIsPending}
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
