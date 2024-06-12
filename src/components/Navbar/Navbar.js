import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';
import './Navbar.scss';
import userIcon from '../../assets/user-icon.png';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.user.login);
    const { userInfo } = userLogin || {};

    const [showDropdown, setShowDropdown] = useState(false);

    const logoutHandler = () => {
        dispatch(logoutUser());
        navigate('/login');
        setShowDropdown(false);
    };

    const handleUserDetails = () => {
        navigate('/user-details');
        setShowDropdown(false);
    }

    const handleUserPreferences = () => {
        navigate('/user-preferences');
        setShowDropdown(false);
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar__brand">NewsApp</Link>
            <div className="navbar__links">
                {userInfo ? (
                    <div className="navbar__user">
                        <button onClick={toggleDropdown} className="navbar__user-button">
                            <img src={userIcon} alt="User" className="navbar__user-icon" />
                        </button>
                        {showDropdown && (
                            <ul className="navbar__dropdown">
                                <li onClick={handleUserDetails} className="navbar__link">User Details</li>
                                <li onClick={handleUserPreferences} className="navbar__link">User Preferences</li>
                                <li onClick={logoutHandler} className="navbar__link">Logout</li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="navbar__link">Login</Link>
                        <Link to="/signup" className="navbar__link">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
