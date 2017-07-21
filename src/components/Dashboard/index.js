import React, {Component} from 'react'
import {connect} from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import * as actions from '../../actions'
import Column from '../Column'
import Card from '../Card'
import Loader from '../Loader'

@DragDropContext(HTML5Backend)
@connect(state => ({
  tasks: state.dashboardReducers.tasks,
  error: state.dashboardReducers.error,
  pendingTasks: state.dashboardReducers.pendingTasks,
  pendingStatuses: state.dashboardReducers.pendingStatuses,
  statuses: state.dashboardReducers.statuses
}), actions)

class Dashboard extends Component {

  getColumns = () => {
    const {tasks, statuses} = this.props

    const isEmptyCol = (status) => !tasks.find((task) => task.status === status)

    return (
      <div className="row">
        {statuses.map((status, i) => (
          <Column key={i} title={status.name} status={status.id} isEmpty={isEmptyCol(status.id)}>
            {
              tasks.filter((task) => task.status === status.id).map((el, i) =>
                (<Card key={i} data={el} handleClick={this.handleClick}/>)
              )
            }
          </Column>
        ))}
      </div>)
  }

  handleClick = (id) => {
    this.props.removeTask(id)
  }

  componentDidMount() {
    this.props.fetchStatuses()
    this.props.fetchTasks()
  }

  render() {
    const {pendingTasks, pendingStatuses, error} = this.props
    
    return (
      <div>
        {(pendingTasks || pendingStatuses) && <Loader />}
        {this.getColumns()}
        {error && <span>{error.message}</span>}
      </div>
    )
  }
}
export default Dashboard
