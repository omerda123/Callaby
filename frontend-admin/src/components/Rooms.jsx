import React from 'react'
import Room from './Room';
import { useState } from 'react';

export default function Rooms() {

    const [rooms, setRooms] = useState()

    const wsUrl = 'ws://localhost:8000/ws/chat/';
    const chatSocket = new WebSocket(wsUrl);
    chatSocket.onopen = (e) => {
        console.log(e);
    }
    chatSocket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(e.data);   
        if (data.type === "admin_stat"){
            setRooms(data.body)
            console.log(rooms);
            
        }
    }


    return (
        <div>
            {
            rooms ? 
            Object.keys(rooms).map( (room)=> 
            <Room room={room} customer={rooms[room][0]} agent={rooms[room][1]}  />):
            null
            }
         
        </div>
    )
}
