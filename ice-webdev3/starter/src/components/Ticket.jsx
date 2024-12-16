import { Button, Card } from "react-bootstrap";
import "../index.css"

const Ticket = (props) => {

    const changeTodo = () => {
        props.move(props.data['id'], props.lane, 'todo');
    }

    const changeInProgress = () => {
        props.move(props.data['id'], props.lane, 'inprogress');
    }
    
    const changeDone = () => {
        props.move(props.data['id'], props.lane, 'done');
    }

    return <Card>
        <h4 style={{ textAlign:"center" }}>{props['data']['name']}</h4>
        <p style={{ textAlign: "right", fontSize: "16px", marginRight:"8px" }}>{props['data']['author']}</p>
        <p style={{ fontWeight: "lighter", margin:"4px" }}>{props['data']['description']}</p>
        <Button
            style={{ marginLeft: "2rem", marginRight: "2rem", marginBottom: "4px", backgroundColor: "lightgray", borderColor: "lightgray" }}
            onClick={changeTodo}>to do</Button>
        <Button
            style={{ marginLeft: "2rem", marginRight: "2rem", marginBottom: "4px", backgroundColor: "lightblue", borderColor: "lightblue" }}
            onClick={changeInProgress}>in progress</Button>
        <Button
            style={{ marginLeft: "2rem", marginRight: "2rem", marginBottom: "4px", backgroundColor: "lightpink", borderColor: "lightpink" }}
            onClick={changeDone}>done</Button>     
    </Card>
    

}

export default Ticket;