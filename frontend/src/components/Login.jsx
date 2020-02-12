import React from 'react'
import DjangoCSRFToken from 'django-react-csrftoken'


export default function Login(props) {
    return (
        <div className="login-wrapper">
            <div className="login-form">
                <div className="login-logo">
                    <h1>Callaby</h1>
                </div>
                <div> <h2>USER LOGIN</h2></div>
                <form action="/api/authuser/" method="POST">
                <DjangoCSRFToken/>
                <div><input type="text" name="username" id="username" placeholder="Username"/></div>
                <div><input type="password" name="password" id="password" placeholder="Password"/></div>
                <div> <button className="login-submit" type="submit"> Submit</button></div>
                </form>
        </div>
        </div>
    )
}
