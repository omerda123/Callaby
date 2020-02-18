import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
export default function Widget(props) {
    return (
        <div className="admin-widget">
            <h2>{props.label}</h2>
            <h1> {props.amount}</h1>
            <div> <AccountCircleIcon fontSize='large'/> </div>
        </div>
    )
}
