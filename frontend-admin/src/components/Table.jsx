import React from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Link } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';


export default function Table({ data, urlSuffix }) {
    const deleteEnterprise = (id) => {
        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            'X-CSRF-TOKEN': DjangoCSRFToken,
        };

        fetch(`/api/${urlSuffix}/${id}/`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    };
    return (
        <div className="table">
            {

                data.map((item) => (
                    <div className="table-row">
                        {' '}
                        {Object.keys(item).map((key) => {
                            if (key === 'image') {
                                return (
                                    <span className="table-col">
                                        <img src={item[key]} alt="product-item" />
                                    </span>
                                );
                            } return (
                                <span className="table-col">
                                    {item[key]}
                                </span>
                            );
                        })}
                        <span className="table-col">
                            <Link to={`${urlSuffix}/${item.id}`}>
                                <EditOutlinedIcon />
                            </Link>
                            <DeleteOutlineOutlinedIcon onClick={() => deleteEnterprise(item.id)} />
                        </span>
                    </div>
                ))
            }
            <AddCircleOutlineOutlinedIcon />
        </div>
    );
}
