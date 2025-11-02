import { Link } from 'react-router-dom';
import doctor from '../assets/doctor.jpg';
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
     

      <div className="home-content">
        <div className="home-text">
          <h2>Smart skincare made simple for you.</h2>
          <p>Upload your skin image to detect possible skin conditions using AI.</p>
          <Link to="/upload">
            <button className="home-btn">Start Prediction</button>
          </Link>
        </div>

        <img src={doctor} alt="Doctor" className="home-image" />
      </div>
    </div>
  );
}

export default Home;

