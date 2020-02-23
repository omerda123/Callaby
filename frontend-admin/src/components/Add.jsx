import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';
import Enterprises from './Enterprises';


export default function Edit() {
    const { add } = useParams();

    const [enterprise, setEnterprise] = useState({});


    useEffect(() => {
        const requestOptions = {
            method: 'OPTIONS',
        };
        fetch('/api/enterprises/', requestOptions)
            .then((enterprise) => enterprise.json())
            .then((enterprise) => enterprise.actions.POST)
            .then((enterprise) => setEnterprise(enterprise));
    }, []);

    const handleChange = (e) => {
        const temp = { ...enterprise };
        temp.name = e.target.value;
        setEnterprise(temp);
    };

    const sendForm = (e) => {
        const formdata = new FormData();
        formdata.append('name', enterprise.name);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        };

        fetch('/api/enterprises/', requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    };

    return (
        <div>
            <h1>Add</h1>
            <DjangoCSRFToken />
            {
                Object.keys(enterprise).map((key) => (
                    <div className="table-row">
                        {
                            key === 'id'
                                ? null
                                : (
                                    <>
                                        <span className="table-col">
                                            {key}
                                        </span>
                                        <span className="table-col">
                                            <input type="text" name={key} onChange={handleChange} />
                                        </span>
                                    </>
                                )
                        }
                    </div>
                ))
            }

            <button onClick={sendForm}> Submit </button>
        </div>
    );
}
