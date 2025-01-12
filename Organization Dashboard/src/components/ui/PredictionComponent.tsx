import React, { useState } from "react";
import axios from "axios";

const PredictComponent = () => {
  const [file, setFile] = useState(null); // State to hold the selected file
  const [result, setResult] = useState(null); // State to hold the prediction result
  const [error, setError] = useState(null); // State to handle errors

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update state when file is selected
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make Axios POST request
      const response = await axios.post(
        '/api/predict',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      

      // Handle successful response
      setResult(response.data);
      setError(null); // Clear any previous error
    } catch (err) {
      // Handle errors
      console.error(err);
      setError(err.response ? err.response.data.message : "An error occurred");
    }
  };

  return (
    <div>
      <h1>Upload an Image for Prediction</h1>

      {/* File Input */}
      <input type="file" onChange={handleFileChange} accept="image/*" />

      {/* Upload Button */}
      <button onClick={handleUpload}>Upload and Predict</button>

      {/* Display Result */}
      {result && (
        <div>
          <h2>Prediction Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {/* Display Error */}
      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default PredictComponent;
