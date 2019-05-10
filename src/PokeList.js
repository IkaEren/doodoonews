import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PokeList = () => {
    const [pokemons, setPokemons] = useState(
        { 
            count: null,
            next: null,
            previous: null,
            results: []
        });

    const [number, setNumber] = useState(10);

    useEffect(() => {
        const fetchPokemons = async () => {
            const result = await axios(
                `https://pokeapi.co/api/v2/pokemon?limit=${number}`
            );
            setPokemons(result.data);
        };
        fetchPokemons();
    }, [number]);

    const setNumberofPokemons = (number) => {
        setNumber(number);
        console.log(number);
    }
    return (
        <div>
            <Dropdown onSelect={(eventKey) => setNumberofPokemons(eventKey)}>
                <Dropdown.Toggle variant="info">Number of pokemons</Dropdown.Toggle>

                <Dropdown.Menu >
                    <Dropdown.Item eventKey='10'>10</Dropdown.Item>
                    <Dropdown.Item eventKey='25'>25</Dropdown.Item>
                    <Dropdown.Item>50</Dropdown.Item>
                    <Dropdown.Item>75</Dropdown.Item>
                    <Dropdown.Item>100</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
                {pokemons.results.map((item,index) => 
                    <Container>
                        <Row key={index} >
                            <Col md="2">
                                <Card>
                                    <Card.Img variant="top" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" 
                                                    + ++index + ".png"} />
                                    <Card.Body>{item.name}</Card.Body>
                                    <Card.Link href={item.url}>{item.name} Link</Card.Link>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                )}
        </div>
    )
}

export default PokeList;

// {pokemons.pokemon_entries.map(item => {
//     return (
//         <div>
//             <h1>testing123</h1>
//             {
//                 item.pokemon_species.map((pokemon) => {
//                     return (
//                         <Card key={item.entry_number}>
//                             <Card.Body>{pokemon.name}</Card.Body>
//                             <Card.Link href={pokemon.url}>{pokemon.name} Link</Card.Link>
//                         </Card>
//                     )
//                 })
//             }
//         </div>
//     )
// }
// )}