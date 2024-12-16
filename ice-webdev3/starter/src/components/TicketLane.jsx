import { Row, Col } from "react-bootstrap"
import Ticket from "./Ticket";

const TicketLane = (props) => {
    return <Row>
            <h2>{props['lane']} tickets</h2>
            {console.log(props['tickets'])}
            {
                props['tickets'].length == 0 ? <p>there are no tickets for this lane for now!</p> :
                props['tickets'].map(ticket => {
                    return <Col xs={6} md={4} lg={3} xl={2}><Ticket data={ticket} move={props.move} lane={props.lane} /></Col>
                })
            }
        </Row> 

}

export default TicketLane;