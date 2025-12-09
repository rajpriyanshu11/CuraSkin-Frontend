import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Prediction.css";

const severityMap = {
  acne: "Low",
  vitiligo: "Low",
  eczema: "Moderate",
  fungal_infection: "Moderate",
  melanoma: "High",
  cell_carcinoma: "High",
};


function Prediction() {
  const location = useLocation();

  const resultFromState = location.state?.result;
  const imageFromState = location.state?.imageUrl;

  const storedResult = sessionStorage.getItem("lastPrediction");
  const storedImage = sessionStorage.getItem("lastImage");

  const result = resultFromState || (storedResult ? JSON.parse(storedResult) : null);
  const imageUrl = imageFromState || storedImage || null;


  const [selectedTreatment, setSelectedTreatment] = useState("");

  const diseaseKey = result?.prediction?.toLowerCase();
  const severityLevel = severityMap[diseaseKey] || "Not available";


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
        <p><strong>Predicted Disease:</strong> {result.prediction}</p>
        <p><strong>Confidence Level:</strong> {result.confidence}%</p>
        <p><strong>Severity Level:</strong> {severityLevel}</p>
        {/* <p><strong>Symptoms:</strong> {result.symptoms}</p> */}
        <p className="section-title"><strong>Common Symptoms:</strong></p>
        {/* <ul>
          {result.symptoms?.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
        </ul> */}
        <ul className="symptom-list">
           {result.symptoms?.map((symptom, index) => (
           <li key={index}>{symptom}</li>
            ))}
        </ul>

        
              {imageUrl && (
        <div className="uploaded-image-section">
          <p><strong>Uploaded Image:</strong></p>
          <img
            src={imageUrl}
            alt="Uploaded skin condition"
            className="uploaded-image"
          />
        </div>
      )}
      </div>




      <div className="treatment-section">
        <h3 className="treatment-heading">Treatment Options</h3>

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
            <h4>Allopathic Treatment:</h4>
            <ul>
              {result.allopathy?.recommendations?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          <h4>Nearby Hospitals:</h4>
          <ul>
            {result.allopathy?.hospitals?.map((item, index) => (
              <li key={index}>
                {typeof item === "string" ? (
                  item
                ) : (
                  <a
                    href={item.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
          </div>
        )}

        {selectedTreatment === "homeopathy" && (
          <div className="remedy-box">
            <h4>Homeopathic Treatment:</h4>
            <ul>
              {result.homeopathy?.recommendations?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          <h4>Nearby Clinics:</h4>
          <ul>
            {result.homeopathy?.clinics?.map((item, index) => (
              <li key={index}>
                {typeof item === "string" ? (
                  item
                ) : (
                  <a
                    href={item.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>

          </div>
        )}
      </div>
    </div>
  );
}

export default Prediction;
