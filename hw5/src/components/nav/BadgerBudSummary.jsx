import { useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";

export default function BadgerBudSummary(props) {
    const [more, setMore] = useState(true)

    const showDetails = () => {
        return (
            <div style={{marginLeft: "1rem", marginRight: "1rem"}}>
                <p>{props.data.gender}</p>
                <p>{props.data.breed}</p>
                <p>{props.data.age}</p>
                <p>{props.data.description}</p>
            </div>
        )
    }

    const handleClick = () => {
        const savedCats = JSON.parse(sessionStorage.getItem('savedId')) || [];
        if (savedCats.includes(props.data.id)) { return; }
        console.log(savedCats)
        sessionStorage.setItem('savedId', JSON.stringify([...savedCats, props.data.id]));
        props.updateAvailableBuds();
        alert(`${props.data.name} has been added to your basket!`);
    }

    const showOnePic = () => {
        return <div>
             <img 
                src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${props.data.imgIds[0]}`} 
                alt={props.data.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
            <h5 style={{ textAlign: "center" }}>{props.data.name}</h5>
        </div>
    }

    const showMorePic = () => {
        return <Carousel>
            {props.data.imgIds.map(id => (
                <Carousel.Item>
                    <img
                        src={`https://raw.githubusercontent.com/CS571-F24/hw5-api-static-content/main/cats/${id}`}
                        alt={props.data.name}
                        style={{width: '100%', height: 'auto', objectFit: 'cover'}}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    }
    
    return <Card>
        <Card.Header>
            {!more ? showMorePic() : showOnePic()}
        </Card.Header>
        {!more && showDetails()}
        <Card.Footer style={{ display: 'flex', justifyContent:'space-between' }}>
            <Button 
                style={{fontSize:'14px', backgroundColor:'lightblue', borderColor:'lightblue', height:'3rem'}}
                onClick={() => setMore(prev => {
                    console.log(prev);
                    return !prev;
                })}
            >
                show {more ? "more" : "less"}
            </Button>
            <Button
                style={{ fontSize: '14px', backgroundColor: 'pink', borderColor: 'pink', height: '3rem' }}
                onClick={handleClick}
            >
                😽save
            </Button>
        </Card.Footer>
    </Card>
}