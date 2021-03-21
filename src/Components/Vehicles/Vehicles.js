import React, { useEffect, useState } from 'react';
import vehicleData from '../../data/data.json'
import Home from '../Home/Home';
import './Vehicles.css'
const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        setVehicles(vehicleData);
    },[])
    return (
        <div className="background">
            <div className="row vehicles-container m-auto">
                {
                    vehicles.map(vehicle =><div className="col-lg-3 col-md-6 col-sm-12">
                    <Home
                        vehicle={vehicle}
                        key={vehicle.id}
                    ></Home>
                </div> )
                }
            </div>
        </div>
    );
};

export default Vehicles;