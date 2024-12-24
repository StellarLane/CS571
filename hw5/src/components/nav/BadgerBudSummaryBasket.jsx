import { Button, Card } from "react-bootstrap";

export default function BadgerBudSummaryBasket(props) {

    const handleAdopt = () => {
        const adoptedCats = JSON.parse(sessionStorage.getItem("adoptedId")) || [];
        if (adoptedCats.includes(props.data.id)) { return };
        sessionStorage.setItem("adoptedId", JSON.stringify([...adoptedCats, props.data.id]));
        props.updateBasket();
        alert(`Thank you for adopting ${props.data.name}`)
    }

    const handelUnselect = () => {
        console.log('unselect')
        const savedId = JSON.parse(sessionStorage.getItem("savedId")) || [];
        const newSavedId = savedId.filter(id => id != props.data.id);
        console.log("savedId", savedId);
        console.log(props.data.id);
        console.log(savedId.filter(id => { return id != props.data.id; }))
        if (!savedId.includes(props.data.id)) { return };
        sessionStorage.setItem("savedId", JSON.stringify(newSavedId));
        props.updateBasket();
    }

    return <Card>
        <Card.Header>
            <img 
                src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${props.data.imgIds[0]}`} 
                alt={props.data.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
            <h5 style={{ textAlign: "center" }}>{props.data.name}</h5>
        </Card.Header>
        {console.log('card')}
        <Card.Footer style={{display:'flex', justifyContent:'space-between'}}>
            <Button style={{ backgroundColor:'grey', borderColor:'grey' }} onClick={handelUnselect}>
                😿Unselect
            </Button>
            <Button style={{backgroundColor:'green', borderColor:'green'}} onClick={handleAdopt}>
                😻Adopt!
            </Button>
        </Card.Footer>
    </Card>
}