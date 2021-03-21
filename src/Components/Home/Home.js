import React from 'react';
import { useEffect, useState } from 'react';
import vehicleData from '../../data/data.json'
import Vehicles from '../Vehicles/Vehicles';
import './Home.css';
const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        setVehicles(vehicleData);
    },[])
    return (
        <div className="background">
            <div className="row vehicles-container m-auto">
                {
                    vehicles.map(vehicle =><div className="col-lg-3 col-md-6 col-sm-12">
                    <Vehicles
                        vehicle={vehicle}
                        key={vehicle.id}
                    ></Vehicles>
                </div> )
                }
            </div>
        </div>
    );
};
export default Home;