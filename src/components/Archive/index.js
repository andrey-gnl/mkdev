import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import Column from '../Column/columClean'
import Card from '../Card/cardClean'
import Loader from '../Loader'

@connect(state => ({
  tasks: state.archiveReducers.tasks,
  error: state.archiveReducers.error,
  pendingTasks: state.archiveReducers.pendingTasks,
}), actions)

class Archive extends Component {

  getTickets = () => {
    const {tasks} = this.props

    return tasks.map((el, i) =>
      (<Card key={i} data={el} handleClick={this.handleClick} canDrag={false} />)
    )
  }

  handleClick = (id) => {
    this.props.removeTask(id)
  }

  componentDidMount() {
    this.props.fetchTasksByStatus(5)
  }

  render() {
    const {pendingTasks, error, tasks} = this.props

    return (
      <div className="row">
        {pendingTasks && <Loader />}

        {!pendingTasks && <Column title="Archived" isEmpty={!!(!tasks.length)}>
          {this.getTickets()}
        </Column>}



        {error && <span>{error.message}</span>}
      </div>
    )
  }
}
export default Archive
