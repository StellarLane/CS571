import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");
    const [studentsMatch, setStudentsMatch] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [page, setPage] = useState(1)
    const studentsPerPage = 24;

    useEffect(() => {
        fetch("https://cs571.org/rest/f24/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllStudents(data)
                setStudentsMatch(data);
        })
    }, [])

    function search(name, major, interest) {
        setStudentsMatch(allStudents);
        if (name) {
            setStudentsMatch(studentsMatch => (
                studentsMatch.filter(student => {
                    return student['name']['first'].toLowerCase().includes(name.toLowerCase());
                }))
            )
        }
        if (major) {
            setStudentsMatch(studentsMatch => (
                studentsMatch.filter(student => {
                    return student['major'].toLowerCase().includes(major.toLowerCase());
                }))
            )
        }
        if (interest) {
            setStudentsMatch(studentsMatch => (
                studentsMatch.filter(student => {
                    for (let i of student['interests']) {
                        if (i.toLowerCase().includes(interest.toLowerCase())) {
                            return true;
                        }
                    }
                    return false;
                })
            ))
        }
    }

    const handleNameSearch = (event) => {
        const value = event.target.value;
        setSearchName(value);
        search(value, searchMajor, searchInterest);
    }
    const handleMajorSearch = (event) => {
        const value = event.target.value;
        setSearchMajor(value);
        search(searchName, value, searchInterest);
    }
    const handleInterestSearch = (event) => {
        const value = event.target.value;
        setSearchInterest(value);
        search(searchName, searchMajor, value);
    }

    function resetSearch() {
        setSearchName("");
        setSearchMajor("");
        setSearchInterest("");
        setStudentsMatch(allStudents);
    }

    function calculatePageList() {
        const num = studentsMatch.length / studentsPerPage + 1;
        const pageArray = Array.from({ length: num }, (_, i) => i + 1);
        return pageArray
    }

    function getStudentsOnPage(pageNum, studentsMatch) {
        const startIndex = studentsPerPage * (pageNum - 1);
        const endIndex = studentsPerPage * pageNum > studentsMatch.length - 1 ? studentsMatch.length - 1 : studentsPerPage * pageNum;
        return studentsMatch.slice(startIndex, endIndex);
    }

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={searchName} onChange={handleNameSearch} />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={searchMajor} onChange={handleMajorSearch} />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={searchInterest} onChange={handleInterestSearch} />
            <br />
            <Button variant="neutral" onClick={resetSearch}>Reset Search</Button>
            <br />
            <p>There are {studentsMatch.length} student(s) matching your search.</p>
        </Form>
        <Container fluid>
            <Row>
                {getStudentsOnPage(page, studentsMatch).map(s => (
                    <Col xs={12} xm={12} md={6} lg={4} xl={3}>
                        <Student {...s} />
                    </Col>     
                ))}
            </Row>
        </Container>
        <Pagination>
            <Button onClick={() => {setPage(page - 1)}} disabled={page == 1 || calculatePageList().length <= 1}>Previous</Button>
            {calculatePageList().map(pageNum => (
                <Pagination.Item active={page == pageNum} onClick={() => {setPage(pageNum)}} >{pageNum}</Pagination.Item>
            ))}
            <Button onClick={() => {setPage(page + 1)}} disabled={page == calculatePageList().length || calculatePageList().length <= 1}>Next</Button>
        </Pagination>
    </div>
    
}

export default Classroom;