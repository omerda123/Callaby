import React from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Link } from 'react-router-dom';
import DjangoCSRFToken from 'django-react-csrftoken';


export default function Table({ data, urlSuffix }) {
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    const csrftoken = getCookie('csrftoken');

    const deleteEnterprise = (id) => {
        const result = window.confirm('Are you sure you want to delete this item?');
        if (result) {
            const requestOptions = {
                method: 'DELETE',
                // redirect: 'follow',
                'X-CSRFToken': csrftoken,
            };

            fetch(`/api/${urlSuffix}/${id}/`, requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error));
        }
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
                            <Link to={`/${urlSuffix}/${item.id}`}>
                                <EditOutlinedIcon />
                            </Link>
                            <DeleteOutlineOutlinedIcon onClick={() => deleteEnterprise(item.id)} />
                        </span>
                    </div>
                ))
            }
            <Link to={`/${urlSuffix}/add/`}>
                <AddCircleOutlineOutlinedIcon />
            </Link>
        </div>
    );
}
