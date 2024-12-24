import { useContext, useState } from "react"
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import BadgerBudSummaryBasket from "../BadgerBudSummaryBasket";
import { Container, Row, Col } from "react-bootstrap";


export default function BadgerBudsBasket(props) {
    const allBuds = useContext(BadgerBudsDataContext);
    const savedId = JSON.parse(sessionStorage.getItem('savedId')) || [];
    const adoptedId = JSON.parse(sessionStorage.getItem('adoptedId')) || [];

    const [savedBuds, setSavedBuds] = useState(allBuds.filter(cat => {
        return savedId.includes(cat.id) && !adoptedId.includes(cat.id);
    }))

    const updateBasket = () => {
        const savedId = JSON.parse(sessionStorage.getItem('savedId')) || [];
        const adoptedId = JSON.parse(sessionStorage.getItem('adoptedId')) || [];
        console.log(savedId);
        console.log(adoptedId);
        setSavedBuds(allBuds.filter(cat => {
            return savedId.includes(cat.id) && !adoptedId.includes(cat.id);
        }))
    }

    return <div>
        <h1>Badger Buds Basket</h1>
        {console.log(savedBuds)}
        {savedBuds.length == 0 ? (
            <p>You have no buds in your basket!</p>
        ) : (
            <Container fluid>
            <Row>
                {savedBuds.map(cat => {
                    return <Col xs={12} sm={6} md={4} lg={3} key={cat.id}>
                        <BadgerBudSummaryBasket data={cat} updateBasket={updateBasket} />
                    </Col>
                })}
            </Row>
            </Container>
        )}
        <p>These cute cats could be all yours!</p>
    </div>
}