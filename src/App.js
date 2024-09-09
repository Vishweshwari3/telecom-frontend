import './Styling_Components/App.css';
import { Outlet, Link } from "react-router-dom";

function App(){
  return (
    <>
      <nav class="navbar">
        <ul class="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
      </>
  );
};

export default App;
