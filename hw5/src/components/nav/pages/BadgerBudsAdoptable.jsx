import { Row, Col, Container } from "react-bootstrap";
import BadgerBudSummary from "../BadgerBudSummary";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import { useContext, useState, useEffect } from "react";

export default function BadgerBudsAdoptable() {
    const allBuds = useContext(BadgerBudsDataContext);
    const savedCats = JSON.parse(sessionStorage.getItem('savedId')) || [];

    const [availableBuds, setAvailableBuds] = useState(allBuds.filter(cat => {
        return !savedCats.includes(cat.id);
    }));


    const updateAvailableBuds = () => {
        const savedCats = JSON.parse(sessionStorage.getItem('savedId')) || [];
        setAvailableBuds(allBuds.filter(cat => !savedCats.includes(cat.id)));
    };
    
    return (
        <div>
            {console.log(availableBuds)}
            <h1>Available Badger Buds</h1>
            <Container fluid>
                <Row>
                    {availableBuds.length > 0 ? (
                        availableBuds.map(cat => {
                            return <Col xs={12} sm={6} md={4} lg={3} key={cat.id}>
                                <BadgerBudSummary data={cat} updateAvailableBuds={updateAvailableBuds} />
                            </Col>
                        })
                    ) : (
                        <p>No buds are available for adoption!</p>
                    )}
                </Row>
            </Container>
            <p>The following cats are looking for a loving home! Could you help?</p>
        </div>
    );
}