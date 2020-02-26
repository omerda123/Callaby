import React, { useState, useEffect } from 'react';
import Widget from './Widget';
import Chart from './chart';

export default function Main() {
    const [graphStats, setGraphStats] = useState({});
    const [stats, setStats] = useState({});
    useEffect(() => {
        fetch('/api/statistics/')
            .then((stat) => stat.json())
            .then((stat) => setStats(stat));

            fetch('/api/daily/')
            .then((daily) => daily.json())
            .then((daily) => setGraphStats(daily));
        }, []);
        console.log((stats));
        console.log((graphStats));



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
            label: 'Logged in agents',
            amount: 2,
        },
        {
            label: 'Logged in agents',
            amount: 2,
        },


    ];
    return (
        <div>
            <div className="widgets-header">
                {data.map((widget) => (<Widget label={widget.label} amount={widget.amount} />))}
            </div>
            <div>
                <Chart daily={graphStats} />
            </div>
        </div>
    );
}
