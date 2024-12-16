import { useEffect, useState } from "react";
import Recipe from "./Recipe";

import Stopwatch from "../utils/Stopwatch";
import { Row, Container, Col, Pagination } from "react-bootstrap"


Stopwatch.start();

export default function AllRecipes(props) {
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState([]);
    const recipesPerPage = 8

    useEffect(() => {
        fetch("https://cs571.org/rest/f24/ice/all-recipes", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                const times = 6;
                const newList = Array(times).fill(data).flatMap(x => x);
                    setRecipes(newList);
                console.log(data);
        })
    }, []);

    const endIndex = page * recipesPerPage;
    const startIndex = (page - 1) * recipesPerPage;
    const displayRecipes = recipes.slice(startIndex, endIndex);

    return <div>
        <h1>Welcome to the Badger Recipes</h1>
        <Container>
            <Row>
                {displayRecipes.map(r => (
                    <Col xs={12} md={6} lg={3} xl={2}>
                        <Recipe {...r} />
                    </Col>
                ))}
            </Row>
        </Container>
        <Pagination>
            <Pagination.Item active={page == 1} onClick={() => {setPage(1)}}>1</Pagination.Item>
            <Pagination.Item active={page == 2} onClick={() => {setPage(2)}}>2</Pagination.Item>
            <Pagination.Item active={page == 3} onClick={() => {setPage(3)}}>3</Pagination.Item>
            <Pagination.Item active={page == 4} onClick={() => {setPage(4)}}>4</Pagination.Item>
        </Pagination>
        
    </div>
}