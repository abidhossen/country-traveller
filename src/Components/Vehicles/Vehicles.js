import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './Vehicles.css'
const Vehicles = (props) => {
    const {name, id, image} = props.vehicle;
    console.log(props.vehicle);
    const history = useHistory();
    const handleRide = () => {
        history.push('/destination')
    }
    return (
        <div>        
            <Card className="text-center">
                <div className="vehicle-logo">
                    <Card.Img variant="top" src={image} />
                </div>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>

                    <Link to={`/destination/${name}`}><Button onClick={handleRide} variant="danger">Ride</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Vehicles;