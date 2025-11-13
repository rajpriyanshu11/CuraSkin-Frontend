
// import { useLocation } from "react-router-dom";
// import "./Prediction.css";

// function Prediction() {
//   const location = useLocation();
//   // preference: use state from navigation (fast), fallback to sessionStorage
//   const resultFromState = location.state?.result;
//   const stored = sessionStorage.getItem("lastPrediction");
//   const result = resultFromState || (stored ? JSON.parse(stored) : null);

//   if (!result) {
//     return (
//       <div className="prediction-container">
//         <h2>No prediction available</h2>
//         <p>Please upload an image first.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="prediction-container">
//       <h2>Prediction Result</h2>
//       <div className="prediction-card">
//         <p><strong>Predicted:</strong> {result.prediction}</p>
//         <p><strong>Confidence:</strong> {result.confidence}%</p>
//         <p><strong>Summary:</strong> {result.summary}</p>
//         <p><strong>Remedies:</strong> {result.remedies}</p>
//       </div>
//     </div>
//   );
// }

// export default Prediction;

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Prediction.css";

function Prediction() {
  const location = useLocation();
  const resultFromState = location.state?.result;
  const stored = sessionStorage.getItem("lastPrediction");
  const result = resultFromState || (stored ? JSON.parse(stored) : null);

  const [selectedTreatment, setSelectedTreatment] = useState("");

  useEffect(() => {
    if (resultFromState) {
      sessionStorage.setItem("lastPrediction", JSON.stringify(resultFromState));
    }
  }, [resultFromState]);

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
      <h2 className="prediction-heading">Prediction Result</h2>

      <div className="prediction-card">
        <p><strong>Predicted:</strong> {result.prediction}</p>
        <p><strong>Confidence:</strong> {result.confidence}%</p>
        <p><strong>Summary:</strong> {result.summary}</p>
      </div>

      <div className="treatment-section">
        <h3 className="treatment-heading">Treatment Recommendations</h3>

        <div className="button-group">
          <button
            className={`treatment-btn ${selectedTreatment === "allopathy" ? "active" : ""}`}
            onClick={() => setSelectedTreatment("allopathy")}
          >
            Allopathy
          </button>
          <button
            className={`treatment-btn ${selectedTreatment === "homeopathy" ? "active" : ""}`}
            onClick={() => setSelectedTreatment("homeopathy")}
          >
            Homeopathy
          </button>
        </div>

        {selectedTreatment === "allopathy" && (
          <div className="remedy-box">
            <p>Allopathy remedies will be displayed here from backend.</p>
          </div>
        )}

        {selectedTreatment === "homeopathy" && (
          <div className="remedy-box">
            <p>Homeopathy remedies will be displayed here from backend.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prediction;
