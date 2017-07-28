import React, {Component} from 'react'
import { DropTarget } from 'react-dnd'
import {TYPES} from '../../constants'
import ColumnClean from './columClean'

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
    const {connectDropTarget, ...rest} = this.props
    return connectDropTarget(
      <div className="column-wrap">
        <ColumnClean {...rest} />
      </div>
    )
  }
}