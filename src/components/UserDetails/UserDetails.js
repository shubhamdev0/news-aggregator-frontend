import React from 'react';
import { useSelector } from 'react-redux';
import './UserDetails.scss';

const UserDetails = () => {
    const userLogin = useSelector((state) => state.user.login);
    const { userInfo } = userLogin || {};

    return (
        <div className="user-details">
            <h2>User Details</h2>
            <hr/>
            {userInfo ? (
                <div className="user-details__info">
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                </div>
            ) : (
                <p>You need to log in to view your details.</p>
            )}
        </div>
    );
};

export default UserDetails;
