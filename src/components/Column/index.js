import React, {Component} from 'react'
import { DropTarget } from 'react-dnd'
import {TYPES} from '../../constants'

const columnTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();

    if(Number(item.status) !== Number(props.status)) {
      props.onDrop(item.id, props.status)
    }

  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

@DropTarget(TYPES.CARD, columnTarget, collect)

export default class Column extends Component {

  render() {
    const {title, isEmpty, connectDropTarget, isOver, children} = this.props
    return connectDropTarget(
      <div className={`column ${isOver ? 'is-over' : ''}`}>
        <div className="column__inner">
          <h2 className="column__title">{title}</h2>
          <div className="column__body">
            {children}
            {isEmpty && <div className="column__empty">Is empty...</div>}
          </div>
        </div>
      </div>
    )
  }
}