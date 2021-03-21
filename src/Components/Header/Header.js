import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'
const Header = () => {
    const [loggedInUser, setLoggedInUser] =useContext(UserContext)
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
                    <Link to="/login"><button className="submit-button">{loggedInUser? 'Log In': 'Sign Out'}</button></Link>
                    {loggedInUser.email}
                </nav>
            </div>
        </div>
    );
};

export default Header;