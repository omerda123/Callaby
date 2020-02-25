import React, { useState, useEffect } from 'react';

export default function FormList(props) {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        fetch('/api/forms/')
            .then((forms) => forms.json())
            .then((forms) => forms.results)
            .then((forms) => setForms(forms));
        console.log((forms));
    }, []);

    return (
        <div>
            {
                forms.map((form) => (
                    <div onClick={() => props.onFormPress(form.id)} key={form.id} className = "form-list-item">
                        {form.name}
                    </div>
                ))
            }
        </div>
    );
}
