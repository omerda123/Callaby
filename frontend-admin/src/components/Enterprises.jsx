import React, { useState, useEffect } from "react";


export default function Enterprises(props) {

    const [enterprises, setEnterprises] = useState({enterprises:[]});
    useEffect(() => {
        fetch("/api/enterprises/")
        .then(enterprises => enterprises.json())
        .then(enterprises => enterprises.results)
        .then(enterprises => setEnterprises( {enterprises }))
        console.log((enterprises));
        
    } , [])
    console.log((enterprises.enterprises));


    return (

        <div>

                    {enterprises.enterprises.map(enterprise => <div className="table"> <span> {enterprise.id} </span> <span>{enterprise.name} </span></div>)}
        </div>
    )

}
