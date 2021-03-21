import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
const Header = () => {
    return (
        <div className="header row">
            <div className="header-title col-md-6">
                <h2>Country Traveller</h2>
            </div>
            <div className="header-nav col-md-6 text-center col-sm-12">
                <nav>
                    <Link to="/home">Home</Link>
                    <Link to="/destination">Destination</Link>
                    <Link to="/Contact">Contact</Link>
                    <Link to="/login"><button className="submit-button">Log In</button></Link>
                </nav>
            </div>
        </div>
    );
};

export default Header;