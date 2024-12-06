import { useState } from "react"
import { Card, Button, Table } from "react-bootstrap"

export default function FeaturedItem(props) {

    const [showHide, setShowHide] = useState(true)

    function handleClick() {
        setShowHide(showHide => !showHide)
    }

    return <Card style={{ margin: "auto", marginTop: "1rem", maxWidth: "30rem" }}>
        <img src={props['img']} alt={props['description']} />
        <h3>{props['name']}</h3>
        <h4>price: ${props['price']} per unit</h4>
        <p>{props['description']}</p>
        <Button onClick={handleClick} style={{backgroundColor: "pink", borderColor: "pink", color:"black", margin: "1rem"}}>
            {showHide ? "show nutrition facts" : "hide nutrition facts"}
        </Button>
        {!showHide && (
            <Table striped size='sm' style={{textAlign: "center"}}>
                <thead>
                    <tr>
                        <th>Calories</th>
                        <th>Fat</th>
                        <th>Carbohydrates</th>
                        <th>Protein</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props['nutrition']['calories'] ? props['nutrition']['calories'] : 0}</td>
                        <td>{props['nutrition']['fat'] ? props['nutrition']['fat'] : 0}</td>
                        <td>{props['nutrition']['carbohydrates'] ? props['nutrition']['carbohydrates'] : 0}</td>
                        <td>{props['nutrition']['protein'] ? props['nutrition']['protein'] : 0}</td>
                    </tr>
                </tbody>
            </Table>
        )}
    </Card>
}