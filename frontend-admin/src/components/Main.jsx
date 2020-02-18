import React from 'react'
import Widget from './Widget'
import Chart from './chart'

export default function Main() {
    const data = [
        {
            label: 'Logged in agents',
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
        {
            label: 'Logged in agents',
            amount: 2,
        },
        {
            label: 'Logged in agents',
            amount: 2,
        },




    ]
    return (
        <div>
            <div className="widgets-header">
                {data.map((widget) => {
                    return (<Widget label={widget.label} amount={widget.amount} />)
                })}
            </div>
            <div>
                <Chart></Chart>
            </div>
            </div>
    )
}
