import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';


export default function chart({ daily }) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const today = now.getDay();

    const data = [{
        name: weekdays[today - 4], uv: daily['today-4'], pv: 1, amt: 50,
    }, {
        name: weekdays[today - 3], uv: daily['today-3'], pv: 2, amt: 50,
    }, {
        name: weekdays[today - 2], uv: daily['today-2'], pv: 3, amt: 50,
    }, {
        name: weekdays[today - 1], uv: daily['today-1'], pv: 4, amt: 50,
    }, {
        name: 'today', uv: daily.today, pv: 5, amt: 50,
    }];
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
    );
}
