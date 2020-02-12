import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

const data = [{ name: 'Page A', uv: 200, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 600, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 1500, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },];


export default function chart() {
    return (
        <div>
            <LineChart width={950} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}
