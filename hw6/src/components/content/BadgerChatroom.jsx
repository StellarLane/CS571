import React, { useEffect, useState } from "react"
import { Container, Col, Row, Card, Pagination, Form, Button } from "react-bootstrap"

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const ITEMS_PER_PAGE = 10;


    const loadMessages = () => {
        fetch(`https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}&page=1`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    const getPageMessage = (pageNum) => {
        const startIndex = (pageNum - 1) * ITEMS_PER_PAGE;
        const endIndex = messages.length < pageNum * ITEMS_PER_PAGE ? messages.length : pageNum * ITEMS_PER_PAGE;
        return messages.slice(startIndex, endIndex);
    }

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props]);
    const thisPageMessage = getPageMessage(page);
    const pageCount = Math.ceil(messages.length / ITEMS_PER_PAGE)

    const handlePost = () => {
        fetch(`https://cs571.org/rest/f24/hw6/messages?chatroom=${props.name}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-CS571-ID': CS571.getBadgerId(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": postTitle,
                "content": postContent
            })
        })
            .then(res => {
                if (res.status == 200) {
                    alert("successfully posted!");
                } else if (res.status == 400) {
                    alert('your post has empty title/content');
                } else if (res.status == 401) {
                    alert("please login first!");
                } else if (res.status == 404) {
                    alert("your are posting in a chatroom that doesn't exist");
                } else if (res.status == 413) {
                    alert("post title must be less than 128 characters and content must be less than 1024 characters");
                }
            }
        )
    }

    const handleDelete = (messageID) =>
    {
        console.log(messageID);
        console.log("delete");
        fetch(`https://cs571.org/rest/f24/hw6/messages?id=${messageID}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'X-CS571-ID': CS571.getBadgerId(),
            }
        })
            .then(res => {
                if (res.status == 200) {
                    alert('delete successful!');
                } else if (res.status == 401) {
                    alert("you have to be logged in to delete posts, or you are deleting others' posts");
                } else if (res.status == 404) {
                    alert("the message doesn't exist already")
            }
        })
    }
 
    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO Allow an authenticated user to create a post. */
            sessionStorage.getItem('LoggedIn') ?
                <>
                    <p style={{marginLeft: '2rem'}}>Post something as {sessionStorage.getItem('username')}</p>
                    <Form style={{ margin: '2rem'}}>
                        <Form.Group>
                            <Form.Label>TItle</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="your post title..."
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contents</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="write something..."
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Button onClick={handlePost} style={{ marginLeft: "2rem"}}>Post</Button>
                </>
                :
                <>
                Login to post
                </>
            
        }
        <hr/>
        {
            messages.length > 0 ?
                <Container>
                    <Row>
                        {
                            thisPageMessage.map(message => {
                                return <Col xs={12} sm={6} md={4} lg={3} key={message.id}>
                                    <Card style={{ margin: "0.5rem"}}>
                                        <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>{message.title}</div>
                                            {
                                                sessionStorage.getItem("LoggedIn") && sessionStorage.getItem("username") == message.poster ?
                                                    <Button variant="danger" size="sm" onClick={() => handleDelete(message.id)}>Delete</Button>
                                                    :
                                                    <></>
                                            }
                                        </Card.Header>
                                        <Card.Body>
                                            {message.content}
                                        </Card.Body>
                                        <Card.Footer className="small">
                                            By {message.poster}<br />
                                            {message.created}
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            })
                        }
                    </Row>
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => setPage(page-1)} disabled={page == 1}
                        />
                        {
                            
                            Array.from({ length: pageCount }, (_, i) => i + 1).map(num => {
                                return <Pagination.Item key={num} active={num == page} onClick={() => setPage(num)}>
                                    {num}
                                </Pagination.Item>
                            })
                        }
                        <Pagination.Next
                            onClick={() => setPage(page+1)} disabled={page == pageCount}
                        />
                    </Pagination>
                </Container>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
    </>
}
