import React, { Component } from 'react';
import Column from '../Column';
import Card from '../Card';


export default class Dashboard extends Component {
    state = {
        data: []
    };

    getBody = () => {
        const {data} = this.state;
        if (!data.length) return 'Loading...';

        const cardsSotrtedByStatus = {};
        data.forEach((el) => {
            if(!cardsSotrtedByStatus[el.status])  cardsSotrtedByStatus[el.status] = [];
            cardsSotrtedByStatus[el.status].push(el) ;
        });

        const columns = Object.keys(cardsSotrtedByStatus).map((key, i) => {
            const cards = (cardsSotrtedByStatus[key].map((el, i) => <Card key={i} data={el} />));
            return <Column key={i}>{cards}</Column>
        });

        return <div className="row">{columns}</div>
    };

    componentWillMount() {
        fetch('http://localhost:3000/api/tickets/')
            .then((response) => response.json())
            .then((data) => {
                this.setState({data})
            })
    }

    render() {
        return (
            <div>{this.getBody()}</div>
        );
    }
}
