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

        const arr = {};
        data.forEach((el) => {
            if(!arr[el.status])  arr[el.status] = [];
            arr[el.status].push(el) ;
        });

        const columns = Object.keys(arr).map((key, i) => {
            const cards = (arr[key].map((el, i) => <Card key={i} data={el} />));
            return <Column key={i}>{cards}</Column>
        });

        return <div className="row">{columns}</div>
    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        fetch('http://localhost:3000/api/tickets/')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data[0].id);
                this.setState({data})
            })
    }

    render() {
        const { data } = this.state;
        return (
            <div>{this.getBody()}</div>

        );
    }
}
