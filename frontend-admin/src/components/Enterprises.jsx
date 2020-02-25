import React, { useState, useEffect } from 'react';
import Table from './Table';


export default function Enterprises(props) {
    const [enterprises, setEnterprises] = useState({ enterprises: [] });

    useEffect(() => {
        fetch('/api/enterprises/')
            .then((enterprises) => enterprises.json())
            .then((enterprises) => enterprises.results)
            .then((enterprises) => setEnterprises({ enterprises }));
        console.log((enterprises));
    }, []);
    console.log((enterprises.enterprises));


    return (

        <div>
            <Table data={enterprises.enterprises} urlSuffix="enterprises" />
        </div>
    );
}
