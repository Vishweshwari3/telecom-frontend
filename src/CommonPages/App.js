// App.js
import './Styling_Components/App.css';
import { Outlet, Link } from "react-router-dom";

function App({ isLoggedIn, onLogout }) {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          {!isLoggedIn ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/user/subscribed-services">My Services</Link>
              </li>
              <li>
                <Link to="/user/deactivate-internet-service">Deactivate Internet Service</Link>
              </li>
              <li>
                <Link to="/user/deactivate-tv-service">Deactivate TV Service</Link>
              </li>
              <li>
                <button onClick={onLogout} className="logout-button">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
