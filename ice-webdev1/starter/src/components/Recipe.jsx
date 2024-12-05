import { useState } from "react";
import { Button, Card } from "react-bootstrap";

export default function Recipe(props) {

    const [likes, setLikes] = useState(0);

    function handleClick() {
        setLikes(likes => likes + 1);
        console.log(likes)
    }

    return <Card style={{ margin: "auto", marginTop: "1rem", maxWidth: "40rem" }}>
        {
            Object.keys(props).length > 0 ? <>
                <img src={props.img.location} />
                <h3>{props.name}</h3>
                <p>{props.author} | {likes} likes</p>
                <p style={{ fontStyle: "italic" }}>{props.keywords.join(", ")}</p>
                <Button onClick={handleClick}>Like me!</Button>
            </> : <p>loading...</p>
        }
    </Card>
}