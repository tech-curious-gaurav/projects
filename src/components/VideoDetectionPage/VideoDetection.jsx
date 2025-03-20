// // import { useState } from "react";
// // import "./VideoDetection.css";

// // const VideoDetection = () => {
// //   const [videoFile, setVideoFile] = useState(null);
// //   const [detectedImages, setDetectedImages] = useState([]);

// //   const handleVideoUpload = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       setVideoFile(URL.createObjectURL(file));
// //     }
// //   };

// //   const extractWeaponFrames = () => {
// //     // Simulating weapon detection from video
// //     const dummyImages = [
// //       "/images/detected1.jpg",
// //       "/images/detected2.jpg",
// //       "/images/detected3.jpg",
// //       "/images/detected4.jpg",
// //       "/images/detected5.jpg",
// //     ];
// //     setDetectedImages(dummyImages);
// //   };

// //   return (
// //     <div className="video-detection-container">
// //       <h1>Upload Video for Weapon Detection</h1>
// //       <div className="video-upload-section">
// //         <input type="text/file" accept="video/*" onChange={handleVideoUpload} />
// //         <button onClick={extractWeaponFrames}>→</button>
// //       </div>
// //       {videoFile && (
// //         <video src={videoFile} controls className="uploaded-video" />
// //       )}
// //       <div className="image-display-section">
// //         {detectedImages.map((img, index) => (
// //           <img
// //             key={index}
// //             src={img}
// //             alt={`Detected ${index + 1}`}
// //             className="detected-image"
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default VideoDetection;

// import React, { useState } from "react";
// import "./VideoDetection.css";
// import elevateImage from "../../assets/image/elevateImage.png";
// import inputImage from "../../assets/image/inputImage.gif";
// const VideoUpload = ({ onProcess }) => {
//   const [videoFile, setVideoFile] = useState(null);
//   const fileInputRef = React.useRef(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith("video/")) {
//       setVideoFile(file);
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     if (file && file.type.startsWith("video/")) {
//       setVideoFile(file);
//     }
//   };

//   return (
//     <div className="video-upload-container">
//       <div className="video-item-one">
//         <img src={elevateImage} alt="" />
//         <button> ? </button>
//       </div>
//       <div className="custom-input">
//         <img src={inputImage} alt="" />
//         <span onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
//           {videoFile ? videoFile.name : "Drop video here or click to upload"}
//           <button className="process-btn" onClick={() => onProcess(videoFile)}>
//             ➜
//           </button>
//         </span>
//       </div>
//       <div>
//         <p>© 2025 ElevateTrust.Ai.All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default VideoUpload;





// src/components/VideoDetectionPage/VideoDetection.jsx

import React, { useState } from 'react';
import './VideoDetection.css';

const VideoDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a video file first');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // Send the video for detection
      const response = await fetch('http://localhost:5000/api/detect-video', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to process video');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error detecting weapons:', err);
      setError(err.message || 'An error occurred during detection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-detection-container">
      <h2>Weapon Detection in Video</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="file-upload-container">
          <label htmlFor="video-upload" className="file-upload-label">
            {selectedFile ? 'Change Video' : 'Upload Video'}
          </label>
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>

        {previewUrl && (
          <div className="video-preview">
            <h3>Preview:</h3>
            <video 
              src={previewUrl} 
              controls 
              className="preview-video"
              width="100%"
              height="auto" 
            />
          </div>
        )}

        <button 
          type="submit" 
          className="detect-button"
          disabled={loading || !selectedFile}
        >
          {loading ? 'Processing...' : 'Detect Weapons'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {results && (
        <div className="results-container">
          <h3>Detection Results:</h3>
          
          {results.detection_count > 0 ? (
            <div>
              <p className="alert-message">
                ⚠️ Weapons detected in the video! ({results.detection_count} detections)
              </p>
              
              <div className="detections-summary">
                <h4>Detected Items:</h4>
                <ul className="detections-list">
                  {results.detections.slice(0, 10).map((detection, index) => (
                    <li key={index}>
                      {detection.class}: {Math.round(detection.confidence * 100)}% confidence
                      {detection.timestamp && ` at ${detection.timestamp}`}
                    </li>
                  ))}
                  {results.detections.length > 10 && (
                    <li>...and {results.detections.length - 10} more detections</li>
                  )}
                </ul>
              </div>
              
              {results.detection_image_path && (
                <div className="detection-image">
                  <h4>Detection Sample:</h4>
                  <img 
                    src={`http://localhost:5000/api/detections/${results.detection_image_path.split('/').pop()}`}
                    alt="Weapon detection" 
                    className="result-image"
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="safe-message">
              ✓ No weapons detected in this video
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoDetection;