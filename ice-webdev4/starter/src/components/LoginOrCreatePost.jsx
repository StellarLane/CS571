import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function LoginOrCreatePost(props) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const commentRef = useRef();
    
    // Note! You should use this in combination with sessionStorage.
    // Otherwise, when the user refreshes the page, it will go away!
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLoginSubmit(e) {
        // console.log(usernameRef.current.value);
        // console.log(passwordRef.current.value);
        e?.preventDefault();// prevents default form submit action
        fetch("https://cs571.org/rest/f24/ice/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CS571-ID': CS571.getBadgerId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            })
        })
            .then(res => {
                if (res.status == 200) {
                    setIsLoggedIn(true);
                } else {
                    alert("You entered the wrong password/username!");
            }
        })
    }

    function handleCommentSubmit(e) {
        e?.preventDefault(); // prevents default form submit action
        fetch("https://cs571.org/rest/f24/ice/comments", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CS571-ID': CS571.getBadgerId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: commentRef.current.value
            })
                .then(res => {
                    if (res.status == 200) {
                        alert("Comment successful");
                        props.refreshComments();
                    } else {
                        alert("did you provide a comment?");
                }
            })
        })
    }

    function handleLogout() {
        fetch("https://cs571.org/rest/f24/ice/logout", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CS571-ID': CS571.getBadgerId(),
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status == 200) {
                alert("Logout success");
                setIsLoggedIn(false);
            }
        })
    }

    if (isLoggedIn) {
        return <>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
            <Form onSubmit={handleCommentSubmit}>
                <Form.Label htmlFor="commentInput">Your Comment</Form.Label>
                <Form.Control id="commentInput" ref={commentRef}></Form.Control>
                <br/>
                <Button type="submit" onClick={handleCommentSubmit}>Post Comment</Button>
            </Form>
        </>
    } else {
        return <Form onSubmit={handleLoginSubmit}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" ref={passwordRef}></Form.Control>
            <br/>
            <Button type="submit" onClick={handleLoginSubmit}>Login</Button>
        </Form>
    }
}