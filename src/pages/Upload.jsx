import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Upload.css";
import upload_image from "../assets/upload.png";

function Upload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image first");

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8080/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error: " + response.statusText);
      }

      const data = await response.json();
      sessionStorage.setItem("lastPrediction", JSON.stringify(data));
      sessionStorage.setItem("lastImage", preview);

        // navigate and also send via state
        navigate("/predict", { state: { result: data, imageUrl: preview } });
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Error while uploading image or connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-heading">Upload Your Skin Image</h2>

      {!preview ? (
        <label className="upload-label">
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
          <img src={upload_image} alt="Upload" className="upload-image" />
          <p>Click or drag file here to upload</p>
        </label>
      ) : (
        <div className="preview-section">
          <img src={preview} alt="Preview" className="preview-image" />
          <button 
            onClick={handleSubmit} 
            className="upload-btn" 
            disabled={loading}
          >
            {loading ? "Predicting..." : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Upload;
