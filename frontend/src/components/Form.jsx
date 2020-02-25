import React from 'react';

export default function Form({ formInputHandle }) {
    const form = [
        { label: 'Full name', type: 'text' },
        { label: 'Last name', type: 'text' },
        { label: 'Address', type: 'text' },
        { label: 'Email', type: 'text' },
        { label: 'Age', type: 'number' },
    ];
    return (
        <div className="form">
            {
                form.map((field) => (
                    <div className="form-row">
                        <span className="form-col">
                            {field.label}
                        </span>
                        <span className="form-col">
                            <input type={field.type} placeholder={field.label} onChange={(e) => formInputHandle(e, field.label)} />
                        </span>
                    </div>
                ))
            }
        </div>
    );
}
