import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import '../style/ViewProfile.css'; 

const ViewProfile = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});

  useEffect(() => {
    api.get('/user/viewprofile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        alert("Can't view this profile");
      });
  }, [token]);

  return (
  <div className="viewprofile">
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        {user.image && (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${user.image}`}
            alt="Profile"
            className="profile-image"
          />
        )}
        <div className="profile-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
        <Link to="/editprofile">
          <button className="edit-button">Edit Profile</button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default ViewProfile;
