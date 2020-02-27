import React, { useState, useEffect } from 'react';
import Widget from './Widget';
import Chart from './chart';

export default function Main() {
    const [graphStats, setGraphStats] = useState({});
    const [stats, setStats] = useState({});
    const [orders, setOrders] = useState({});
    useEffect(() => {
        Promise.all([
            fetch('/api/statistics/')
                .then((stat) => stat.json()),
            fetch('/api/daily/')
                .then((daily) => daily.json()),
            fetch('/api/daily-orders/')
                .then((order) => order.json()),
        ]).then(([stat, daily , order]) => { setStats(stat); setGraphStats(daily);setOrders(order); });
    }, []);



    const data = [
        {
            label: 'Logged in agents',
            amount: stats.number_Of_agents,
        },
        {
            label: 'Configured enterprises',
            amount: stats.number_Of_enterprises,
        },
        {
            label: 'Active sessions',
            amount: 2,
        },
        {
            label: 'Daily chats',
            amount: graphStats.today,
        },
        {
            label: 'Daily orders',
            amount: orders.today,
        },


    ];
    return (
        <div>
            <div className="widgets-header">
                {data.map((widget) => (<Widget label={widget.label} amount={widget.amount} />))}
            </div>
            <div>
                <Chart daily={graphStats} orders={orders} />
            </div>
            <div className="graph-index">
                <div className="index-chat"></div> <div>Number of chats</div>
                <div className="index-orders"></div> <div>Number of orders</div>
            </div>
        </div>
    );
}
