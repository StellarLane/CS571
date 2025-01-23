import React, { useContext, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    const usernameRef = useRef();
    const pinRef = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus, username, setUsername] = useContext(BadgerLoginStatusContext);
    // TODO Create the login component.
    const handleLogin = (e) => {
        console.log(usernameRef.current.value);
        console.log(pinRef.current.value)
        fetch("https://cs571.org/rest/f24/hw6/login", {
            method: 'POST', 
            credentials: 'include', 
            headers: {
                'X-CS571-ID': CS571.getBadgerId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': usernameRef.current.value,
                'pin': pinRef.current.value
            })
        })
            .then(res => {
                if (res.status == 200) {
                    alert("authentication successful");
                    sessionStorage.setItem('LoggedIn', true);
                    sessionStorage.setItem('username', usernameRef.current.value)
                    setLoginStatus(true);
                    setUsername(usernameRef.current.value);
                    navigate('/');
                } else if (res.status == 400) {
                    alert("missing username/pin")
                } else if (res.status == 401) {
                    alert("wrong username/pin")
                }
        })
    }

    return <>
        <h1>Login</h1>
        <Form style={{ margin: "1rem" }}>
            <Form.Label>Username</Form.Label>
            <Form.Control
                type='text'
                placeholder='enter your username'
                ref={usernameRef}
            />
        </Form>
        <Form style={{ margin: "1rem" }}>
            <Form.Label>Pin</Form.Label>
            <Form.Control
                type='password'
                placeholder='enter your pin'
                ref={pinRef}
            />
        </Form>
        <Button style={{ margin: '1rem'}} onClick={handleLogin}>Login</Button>
    </>
}
