import { useParams } from 'react-router';
import vehicleData from '../../data/data.json'
import Map from '../Map/Map';
import './Destination.css'
const Destination = () => {
    const { vehicleName } = useParams();
    const vehicle = vehicleData.find(vh => vh.name === vehicleName);
    console.log(vehicle)
    return (
        <div>
            <hr />
            <div className="row">
                <div className="col-md-5 location-input">
                    <div className="location-area">
                    <label htmlFor="location">
                        Your Location:
                    </label><br />
                    <input placeholder="Your Location" type="text" name="location" />
                    <br />
                    <label htmlFor="destination">
                        Destination:
                    </label><br />
                    <input name="destination" placeholder="Destination" type="text" />
                    </div>
                    <div className="ride-detail">
                        <div className="rider-img">
                            <img src={vehicle.image} alt="" />
                        </div>
                        <p>Cost: {vehicle.cost1}</p>
                    </div>
                    <div className="ride-detail">
                        <div className="rider-img">
                            <img src={vehicle.image2} alt="" />
                        </div>
                        <p>Cost: {vehicle.cost2}</p>
                    </div>
                    <div className="ride-detail">
                        <div className="rider-img">
                            <img src={vehicle.image3} alt="" />
                        </div>
                        <p>Cost: {vehicle.cost3}</p>
                    </div>

                    <div className="col-md-7">
                        <Map></Map>
                    </div>
                </div>    
            </div>
        </div>
    );
};

export default Destination;