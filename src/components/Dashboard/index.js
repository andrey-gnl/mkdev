import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Column from '../Column';
import Card from '../Card';

@connect(state => ({
    tasks: state.dashboardReducers.tasks,
    error: state.dashboardReducers.error,
    pending: state.dashboardReducers.pending
}), actions)

class Dashboard extends Component {

    getBody = () => {
        const {tasks} = this.props;
        if (!tasks.length) return 'Loading...';

        const cardsSotrtedByStatus = {};
        tasks.forEach((el) => {
            if (!cardsSotrtedByStatus[el.status]) cardsSotrtedByStatus[el.status] = [];
            cardsSotrtedByStatus[el.status].push(el);
        });

        const columns = Object.keys(cardsSotrtedByStatus).map((key, i) => {
            const cards = (cardsSotrtedByStatus[key].map((el, i) => <Card key={i} data={el}/>));
            return <Column key={i}>{cards}</Column>
        });

        return <div className="row">{columns}</div>
    };

    componentWillMount() {
        this.props.fetchTasks();
    }

    render() {
        return (
            <div>{this.getBody()}</div>
        );
    }
}
export default Dashboard;
