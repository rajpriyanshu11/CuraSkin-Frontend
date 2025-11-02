import "./About.css";


function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About <span>CuraSkin AI</span></h1>
      <p className="about-intro">
        CuraSkin AI is an intelligent skin disease detection platform powered by 
        advanced deep learning technology. Our goal is to make early skin 
        analysis quick, accessible, and accurate — right from your device.
      </p>

      <div className="about-content">
        <div className="about-card">
          <h2>🌿 Our Mission</h2>
          <p>
            To empower individuals with AI-driven insights that promote early 
            detection and better understanding of skin health.
          </p>
        </div>

        <div className="about-card">
          <h2>🧠 How It Works</h2>
          <p>
            Simply upload an image of your skin lesion. Our AI model analyzes 
            the pattern and predicts the possible skin condition in seconds.
          </p>
        </div>

        <div className="about-card">
          <h2>🤝 Our Vision</h2>
          <p>
            To bridge the gap between medical expertise and technology, making 
            dermatological care more accessible for everyone.
          </p>
        </div>
      </div>

      
    </div>
  );
}

export default About;
