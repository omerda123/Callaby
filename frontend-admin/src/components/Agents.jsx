import React, { useState, useEffect } from 'react'
import Table from './Table';

export default function Agents(props) {

    const [agents, setAgents] = useState({agents:[]});
    useEffect(() => {
        fetch("/api/agents/")
        .then(agents => agents.json())
        .then(agents => agents.results)
        .then(agents => setAgents( {agents }))
        console.log((agents));
    } , [])

    return (
        <div>
            <Table data={agents.agents}/>
        </div>
    )
}
