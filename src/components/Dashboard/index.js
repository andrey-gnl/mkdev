import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import * as actions from '../../actions'
import Column from '../Column'
import Card from '../Card'
import Loader from '../Loader'

@connect(state => ({
  tasks: state.dashboardReducers.tasks,
  error: state.dashboardReducers.error,
  pending: state.dashboardReducers.pending,
  columns: state.columns
}), actions)

class Dashboard extends Component {

  getColumns = () => {
    const {tasks, columns} = this.props
    const allCols = columns.map((col) => col.status)
    const filledCols = tasks.map((task) => task.status)
    const emptyCols = _.xor(allCols, filledCols)

    const isEmptyCol = (col) => emptyCols.indexOf(col) > -1

    return (
      <div className="row">
        {columns.map((col, i) => (
          <Column key={i} title={col.name} isEmpty={isEmptyCol(col.status)}>
            {
              tasks.filter((task) => task.status === col.status).map((el, i) =>
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
    this.props.fetchTasks()
  }

  render() {
    const {tasks, pending, error} = this.props

    return (
      <div>
        {pending && <Loader />}
        {this.getColumns()}
        {error && <span>{error.message}</span>}
      </div>
    )
  }
}
export default Dashboard
