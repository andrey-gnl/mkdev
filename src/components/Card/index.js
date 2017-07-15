import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import {formatDate} from '../../utils'

@connect(state => ({
    pending: state.taskReducers.pending,
    error: state.taskReducers.error,
    id: state.taskReducers.id,
}), actions)

class Card extends Component {

    handleClick = (id) => {
        this.props.removeTask(id)
    }

    render() {
        const {data, pending, error, id } = this.props
        let cardClass = 'card';
        const taskIsPending = pending && id === data.id
        taskIsPending && (cardClass += ' disabled')

        return (
            <div className={cardClass}>
                <button
                    type="button"
                    className="card__button"
                    onClick={() => this.handleClick(data.id)}
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
export default Card