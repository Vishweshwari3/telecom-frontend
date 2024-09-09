import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './Styling_Components/UserDashboard.css';
import Services from './Services';

const UserDashboard = () => {
  const navigate = useNavigate();

  // Handle logout and redirect to the home page
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear auth tokens, etc.)
    
    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="user-dashboard">
      <header className="user-dashboard-navbar">
        <nav>
          <ul className="dashboard-nav-links">
            {/* Remove the Services link */}
            <li>
              <Link to="subscribed-services">My Services</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Directly render the Services component */}
       
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
