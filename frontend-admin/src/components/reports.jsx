import React, { Component, useState, useEffect } from 'react';
import DataTable from './DataTable';


export default function Reports() {
    const reports = ['Chats', 'Messages', 'Orders'];
    const [active, setActive] = useState('Chats');
    const [chats, setChats] = useState({});
    const [messages, setMessages] = useState({});
    const [orders, setOrders] = useState({});

    const data = {
        'Chats':chats,
        'Messages':messages,
        'Orders': orders,
    };

    const toggleReport = (e) => {
        setActive(e.target.innerHTML);
        console.log(e.target.innerHTML);
        console.log(data)
        console.log(data[e.target.innerHTML]);
    };

    useEffect(() => {
        Promise.all([
            fetch('/api/chats/')
                .then((chat) => chat.json())
                .then((chat) => chat.results),
            fetch('/api/messages/')
                .then((message) => message.json())
                .then((message) => message.results),
            fetch('/api/order/')
                .then((order) => order.json())
                .then((order) => order.results),
        ]).then(([chat, message, order]) => { setChats(chat); setMessages(message); setOrders(order); });
    }, []);

    return (
        <div className="reports">
            <div className="report-header">
                {reports.map((report) => (
                    <div className="report-header-item" onClick={toggleReport}>
                        {report}
                    </div>
                ))}
            </div>
            <DataTable data={data[active]} />
        </div>
    );
}
