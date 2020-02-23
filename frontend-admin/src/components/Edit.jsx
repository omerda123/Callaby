import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';


export default function Edit() {
    const { id } = useParams();

    const [enterprise, setEnterprise] = useState({ enterprise: {} });
    useEffect(() => {
        fetch(`/api/enterprises/${id}`)
            .then((enterprise) => enterprise.json())
            .then((enterprise) => setEnterprise({ enterprise }));
    }, []);


    return (
        <div>
            <form action={`/api/enterprises/`} method="post">
                <DjangoCSRFToken />
                {
                    Object.keys(enterprise.enterprise).map((key) => (
                        <div className="table-row">
                            <span className="table-col">
                                {key}
                            </span>
                            <span className="table-col">
                                <input type="text" value={enterprise.enterprise[key]} name={key} />
                            </span>
                        </div>
                    ))
                }
                <button> Submit </button>
            </form>
        </div>
    );
}
