import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
const Home = (props) => {
    const {name, id, image} = props.vehicle;
    console.log(props.vehicle)
    return (
        <div>        
            <Card className="text-center">
                <div className="vehicle-logo">
                    <Card.Img variant="top" src={image} />
                </div>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Link to={`destination/${name}`}>
                        <Button  variant="danger">Ride</Button>
                    </Link>                
                </Card.Body>
            </Card>
        </div>
    );
};

export default Home;