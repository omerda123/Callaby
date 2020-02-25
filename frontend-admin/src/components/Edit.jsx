import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';


export default function Edit() {
    const { id } = useParams();
    const { datasource } = useParams();

    const [enterprise, setEnterprise] = useState({});
    useEffect(() => {
        fetch(`/api/${datasource}/${id}`)
            .then((enterprise) => enterprise.json())
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
            method: 'PUT',
            body: formdata,
            redirect: 'follow',
        };

        fetch(`/api/enterprises/${id}/`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    };

    return (
        <div>
            <h1>Edit</h1>
            <DjangoCSRFToken />
            {
                Object.keys(enterprise).map((key) => (
                    <div className="table-row">
                        <span className="table-col">
                            {key}
                        </span>
                        <span className="table-col">
                            {
                                key === 'id'

                                    ? <input type="text" defaultValue={enterprise[key]} name={key} onChange={handleChange} disabled />
                                    : <input type="text" defaultValue={enterprise[key]} name={key} onChange={handleChange} />
                            }
                        </span>
                    </div>
                ))
            }
            <button onClick={sendForm}> Submit </button>
        </div>
    );
}
