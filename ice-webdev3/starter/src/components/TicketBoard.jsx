import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import TicketLane from './TicketLane'
import Ticket from "./Ticket";

const TicketBoard = (props) => {

    const [ticketLanes, setTicketLanes] = useState({
        todo: [],
        inprogress: [],
        done: [],
    })

    useEffect(() => {
        fetch('https://cs571.org/rest/f24/ice/tickets', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(ticketData => {
            console.log(ticketData);
            setTicketLanes({
                todo: [...ticketData], // TODO Put the tickets in the the todo lane!
                inprogress: [],
                done: []
            });
            // {move("ee85636ed6ce9829ae08c825943580178ef806e88ef2e23d", 'todo', 'inprogress')}
        })
    }, []);

    const move = (ticketID, fromLane, toLane) => {
        console.log("move", ticketID, fromLane, toLane)
        if (fromLane == toLane) {
            return;
        }
        setTicketLanes(prev => {
            console.log(prev);
            const ticketLanesNew = { ...prev };
            const targetTicket = prev[fromLane].find(ticket => {
                return ticket['id'] == ticketID;
            })
            console.log(targetTicket)
            ticketLanesNew[toLane] = [...prev[toLane], targetTicket];
            ticketLanesNew[fromLane] = prev[fromLane].filter(ticket => {
                return ticket['id'] != ticketID;
            })
            console.log(ticketLanesNew)
            return ticketLanesNew;
        })
        console.log(ticketLanes);
    }

    return <div>
        <h1>Ticket Board</h1>
        <Container fluid>
            {
                Object.keys(ticketLanes).map(laneName => {
                    return <TicketLane lane={laneName} tickets={ticketLanes[laneName]} move={move} />
                })
            }
        </Container>
    </div>
}

export default TicketBoard;