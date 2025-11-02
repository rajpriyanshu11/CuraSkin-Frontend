
import { useLocation } from "react-router-dom";
import "./Prediction.css";

function Prediction() {
  const location = useLocation();
  // preference: use state from navigation (fast), fallback to sessionStorage
  const resultFromState = location.state?.result;
  const stored = sessionStorage.getItem("lastPrediction");
  const result = resultFromState || (stored ? JSON.parse(stored) : null);

  if (!result) {
    return (
      <div className="prediction-container">
        <h2>No prediction available</h2>
        <p>Please upload an image first.</p>
      </div>
    );
  }

  return (
    <div className="prediction-container">
      <h2>Prediction Result</h2>
      <div className="prediction-card">
        <p><strong>Predicted:</strong> {result.prediction}</p>
        <p><strong>Confidence:</strong> {result.confidence}%</p>
        <p><strong>Summary:</strong> {result.summary}</p>
        <p><strong>Remedies:</strong> {result.remedies}</p>
      </div>
    </div>
  );
}

export default Prediction;

