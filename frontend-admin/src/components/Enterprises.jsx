import React, { useState, useEffect } from "react";


export default function Enterprises(props) {

    const [enterprises, setEnterprises] = useState({});

    useEffect(() => {
        fetch("/api/enterprises/")
        .then(res => res.json())
        .then(res => setEnterprises( {enterprises: res.results }))
    } , [])


    return (

        <div>
            {
                // JSON.stringify(enterprises['enterprises'])
                
                // JSON.parse(enterprises).map(enterprise => <div> enterprise.name </div>)
            }
            <div> 
                <span> </span>
            </div>
        </div>
    )

}
