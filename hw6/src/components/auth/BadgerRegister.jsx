import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router';

export default function BadgerRegister() {

    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [confPin, setConfPin] = useState("")
    const navigate = useNavigate();


    // TODO Create the register component.
    const handleSubmit = () => {
        if (pin != confPin) {
            alert("pin and confirmation pin can't match");
            return;
        }
        const pinRegex = /^\d{7}$/;
        if (!pinRegex.test(pin)) {
            alert("pin must be 7 digits long");
            return;
        }
        fetch("https://cs571.org/rest/f24/hw6/register", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CS571-ID': CS571.getBadgerId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "pin": pin
            })
        })
            .then(res => {
                if (res.status == 200) {
                    alert("registration complete");
                    navigate('/login');
                } else if (res.status == 400) {
                    alert("empty username/pin")
                } else if (res.status == 409) {
                    alert("The username have been registered")
                } else if (res.status == 413) {
                    alert("The username must be less than 64 characters")
                }
            }
        )
    }

    return <>
        <h1>Register</h1>
        <Form style={{ margin: "1rem"}}>
            <Form.Label>Username</Form.Label>
            <Form.Control
                type='text'
                placeholder='enter your username'
                value={username}
                onChange={(e) => {
                    console.log(e.target.value)
                    setUsername(e.target.value)
                }}
            />
        </Form>
        <Form style={{ margin: "1rem"}}>
            <Form.Label>7-Digit-Pin</Form.Label>
            <Form.Control
                type='password'
                placeholder='enter a pin'
                value={pin}
                onChange={(e) => {setPin(e.target.value)}}
            />
        </Form>
        <Form style={{ margin: "1rem"}}>
            <Form.Label>Confirmation</Form.Label>
            <Form.Control
                type='password'
                placeholder='re-enter your pin'
                value={confPin}
                onChange={(e) => {setConfPin(e.target.value)}}
            />
        </Form>
        <Button style={{ margin: "1rem"}} onClick={handleSubmit}>Register!</Button>
    </>
}
