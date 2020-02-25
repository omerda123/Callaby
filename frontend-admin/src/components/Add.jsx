import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';
import Enterprises from './Enterprises';


export default function Edit() {
    const { add } = useParams();
    const { datasource } = useParams();
    const input = useRef(null);

    const [enterprise, setEnterprise] = useState({});


    useEffect(() => {
        const requestOptions = {
            method: 'OPTIONS',
        };
        fetch(`/api/${datasource}/`, requestOptions)
            .then((enterprise) => enterprise.json())
            .then((enterprise) => enterprise.actions.POST)
            .then((enterprise) => setEnterprise(enterprise));
    }, []);

    const handleChange = (t) => (e) => {
        if (t === 'file') {
            e.preventDefault();
            console.log(input.current.files[0]);
            return;
        }

        const temp = { ...enterprise };
        temp.name = e.target.value;
        setEnterprise(temp);
    };

    const sendForm = (e) => {
        const formdata = new FormData();
        if (input.current.files.length > 0) {
            const image = input.current.files[0];
            formdata.append('image', image);
        }
        formdata.append('name', enterprise.name);
        formdata.append('price', 123);
        formdata.append('enterprise', 'Nespresso');

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        };

        fetch('/api/products/', requestOptions)
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
                                            {
                                                key === 'image'

                                                    ? <input type="file" ref={input} name={key} onChange={handleChange('file')} />
                                                    : <input type="text" name={key} onChange={handleChange('text')} />
                                            }
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
