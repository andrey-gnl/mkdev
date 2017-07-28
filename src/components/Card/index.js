import React, {Component} from 'react'
import { DragSource } from 'react-dnd'
import {formatDate} from '../../utils'
import {TYPES} from '../../constants'
import Card from './cardClean'

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

export default class CardDnd extends Component {
  render() {
    const {connectDragSource, ...rest } = this.props

    return connectDragSource(
      <div className="card-wrap">
        <Card {...rest}/>
      </div>
    )
  }
}
