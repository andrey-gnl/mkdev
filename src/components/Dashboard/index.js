import React, {Component} from 'react'
import {connect} from 'react-redux'
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

        return(
            <div className="row">
                {columns.map((col, i) => (
                    <Column key={i} title={col.name}>
                        {tasks.filter((task) => task.status === col.status).map((el, i) =>
                            (<Card key={i} data={el} handleClick={this.handleClick} />)
                        )}
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
                {!!tasks.length && this.getColumns()}
                {error && <span>{error.message}</span>}
            </div>
        )
    }
}
export default Dashboard
