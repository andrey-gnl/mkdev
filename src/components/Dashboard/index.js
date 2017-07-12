import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTasks} from '../../actions';
import Column from '../Column';
import Card from '../Card';

class Dashboard extends Component {

    getBody = () => {
        const {tasks} = this.state;
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
export default connect((state) => {
    return {
        tickets: state.tickets,
        error: state.error,
        pending: state.pending
    }
}, {fetchTasks})(Dashboard);
