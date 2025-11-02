import { Link } from 'react-router-dom';
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="nav-bar">
      <h1 className="navbar-logo">CuraSkin AI</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/upload">Predict</Link>
        
      </div>
    </nav>
  );
}
export default Navbar;
