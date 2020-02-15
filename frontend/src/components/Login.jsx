import React from 'react';


export default function Login(props) {
    return (
        <div className="login-wrapper">
            <div className="login-form">
                <div className="login-logo">
                    <h1>Callaby</h1>
                </div>
                <div>
                    <h2>USER LOGIN</h2>
                </div>
                <div><input type="text" name="username" id="username" placeholder="Username" /></div>
                <div><input type="password" name="password" id="password" placeholder="Password" /></div>
                <div>
                    <button className="login-submit" onClick={props.to}> Submit</button>
                </div>
            </div>
        </div>
    );
}
