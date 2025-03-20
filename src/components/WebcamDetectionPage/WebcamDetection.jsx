// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import elevateImage from "../../assets/image/elevateImage.png";
// import "./WebcamDetection.css";

// const WebcamDetection = () => {
//   const webcamRef = useRef(null);
//   const [isWebcamOn, setIsWebcamOn] = useState(false);
//   const [mainImage, setMainImage] = useState(null);
//   const [detectedImages, setDetectedImages] = useState([]);

//   // Start Webcam
//   const startWebcam = () => {
//     setIsWebcamOn(true);
//   };

//   // Stop Webcam
//   const stopWebcam = () => {
//     setIsWebcamOn(false);
//   };

//   // Capture Image and Add to Detected List
//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       const updatedImages = [imageSrc, ...detectedImages].slice(0, 5);
//       setDetectedImages(updatedImages);
//       if (!mainImage) {
//         setMainImage(imageSrc);
//       }
//     }
//   };

//   // Handle Click on Smaller Images
//   const handleImageClick = (index) => {
//     const newMainImage = detectedImages[index];
//     const updatedImages = [...detectedImages];
//     updatedImages[index] = mainImage;
//     setMainImage(newMainImage);
//     setDetectedImages(updatedImages);
//   };

//   return (
//     <div className="webcam-container">
//       <div className="webcam-item-one">
//         {/* Yahan apne imported image ko use kar rahe hain */}
//         <img src={elevateImage} alt="Elevate-image" />
//         <button> ? </button>
//       </div>
//       <div className="webcam-item-two">
//         <div className="controls">
//           {!isWebcamOn ? (
//             <button onClick={startWebcam}>Start Webcam</button>
//           ) : (
//             <button onClick={stopWebcam}>Stop Webcam</button>
//           )}

//           {isWebcamOn && <button onClick={captureImage}>Capture Image</button>}
//         </div>
//         <div className="web-contoler">
//           {isWebcamOn && (
//             <div className="webcam-box">
//               <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
//             </div>
//           )}

//           <div className="image-section">
//             {/* Main Image Container */}
//             {mainImage && (
//               <img className="main-image" src={mainImage} alt="Main Capture" />
//             )}
//           </div>
//           {/* Five Smaller Image Containers */}
//           <div className="image-list">
//             {detectedImages.map((img, index) => (
//               <img
//                 key={index}
//                 width={"100vmin"}
//                 src={img}
//                 alt={`Detected ${index + 1}`}
//                 onClick={() => handleImageClick(index)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="webcam-item-three">
//         <p>© 2025 ElevateTrust.Ai.All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default WebcamDetection;

// // import React, { useRef, useState } from "react";

// // const WebcamDetection = () => {
// //   const [stream, setStream] = useState(null); // Store the webcam stream
// //   const [isWebcamOn, setIsWebcamOn] = useState(false); // Track webcam state (on/off)
// //   const videoRef = useRef(null);

// //   // Start webcam stream
// //   const startWebcam = async () => {
// //     try {
// //       const mediaStream = await navigator.mediaDevices.getUserMedia({
// //         video: true,
// //       });
// //       setStream(mediaStream); // Store the media stream in state
// //       videoRef.current.srcObject = mediaStream; // Set the video source to the webcam stream
// //       setIsWebcamOn(true); // Webcam is on
// //     } catch (error) {
// //       console.error("Error accessing webcam:", error);
// //       alert("Could not access webcam.");
// //     }
// //   };

// //   // Stop webcam stream
// //   const stopWebcam = () => {
// //     if (stream) {
// //       const tracks = stream.getTracks();
// //       tracks.forEach((track) => track.stop()); // Stop all media tracks (webcam)
// //       setStream(null); // Clear the stream from state
// //       setIsWebcamOn(false); // Webcam is off
// //     }
// //   };

// //   return (
// //     <div className="webcam-container">
// //       <div>
// //         <img src="" alt="" />
// //         <button>help</button>
// //       </div>
// //       <div>
// //       <p>WEAPON DETECTION WEBCAM</p>
// //         {isWebcamOn ? (
// //           <button onClick={stopWebcam}>Turn Off Webcam</button>
// //         ) : (
// //           <button onClick={startWebcam}>Turn On Webcam</button>
// //         )}
// //         <video
// //           ref={videoRef}
// //           autoPlay
// //           playsInline
// //           style={{ width: "50%", height: "auto" }}
// //         ></video>
// //         <img src="" alt="" />
// //       </div>

// //     </div>
// //   );
// // };

// // export default WebcamDetection;

// // import React from "react";
// // import isWebcamActive from "react-webcam";

// // function WebcamDetection() {
// //   return <div>WebcamDetection</div>;
// // }

// // export default WebcamDetection;

// src/components/WebcamDetectionPage/WebcamDetection.jsx

// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import './WebcamDetection.css';

// const WebcamDetection = () => {
//   const webcamRef = useRef(null);
//   const wsRef = useRef(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [detectionActive, setDetectionActive] = useState(false);
//   const [detectionResults, setDetectionResults] = useState(null);
//   const [error, setError] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const mediaRecorderRef = useRef(null);

//   // Connect to WebSocket when detection becomes active
//   useEffect(() => {
//     if (detectionActive) {
//       connectWebSocket();
//     } else {
//       disconnectWebSocket();
//     }

//     return () => {
//       disconnectWebSocket();
//     };
//   }, [detectionActive]);

//   const connectWebSocket = () => {
//     try {
//       wsRef.current = new WebSocket('ws://localhost:5000/ws/detect');

//       wsRef.current.onopen = () => {
//         console.log('WebSocket connection established');
//         setIsConnected(true);
//         setError(null);
//       };

//       wsRef.current.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);

//           if (data.error) {
//             console.error('Server error:', data.error);
//             setError(`Server error: ${data.error}`);
//             return;
//           }

//           setDetectionResults(data);

//           // Show alert if weapons detected
//           if (data.detections && data.detections.length > 0) {
//             console.log('WEAPON DETECTED!', data.detections);
//           }
//         } catch (e) {
//           console.error('Error parsing WebSocket message', e);
//           setError('Error processing detection results');
//         }
//       };

//       wsRef.current.onerror = (error) => {
//         console.error('WebSocket error:', error);
//         setError('Connection error. Please check if the server is running.');
//         setIsConnected(false);
//         setDetectionActive(false);
//       };

//       wsRef.current.onclose = () => {
//         console.log('WebSocket connection closed');
//         setIsConnected(false);
//       };
//     } catch (err) {
//       console.error('Failed to connect to WebSocket:', err);
//       setError('Failed to connect to detection server');
//       setDetectionActive(false);
//     }
//   };

//   const disconnectWebSocket = () => {
//     if (wsRef.current && [WebSocket.OPEN, WebSocket.CONNECTING].includes(wsRef.current.readyState)) {
//       wsRef.current.close();
//     }
//   };

//   const sendFrameToServer = useCallback(() => {
//     if (
//       webcamRef.current &&
//       webcamRef.current.getScreenshot &&
//       detectionActive &&
//       wsRef.current &&
//       wsRef.current.readyState === WebSocket.OPEN
//     ) {
//       try {
//         const screenshot = webcamRef.current.getScreenshot();
//         if (screenshot) {
//           // Send only the base64 data part without the prefix
//           const base64Data = screenshot.split(',')[1];
//           wsRef.current.send(JSON.stringify({
//             image_data: base64Data,
//             timestamp: new Date().toISOString()
//           }));
//         }
//       } catch (err) {
//         console.error('Error sending frame:', err);
//       }
//     }
//   }, [detectionActive]);

//   // Send frames at regular intervals when detection is active
//   useEffect(() => {
//     let interval;

//     if (detectionActive && isConnected) {
//       interval = setInterval(sendFrameToServer, 200); // 5 frames per second
//     }

//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [detectionActive, isConnected, sendFrameToServer]);

//   // Start/stop recording functionality
//   const handleStartRecording = useCallback(() => {
//     if (!webcamRef.current || !webcamRef.current.stream) {
//       setError('Cannot access webcam stream');
//       return;
//     }

//     setRecordedChunks([]);
//     setIsRecording(true);

//     try {
//       mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
//         mimeType: 'video/webm'
//       });

//       mediaRecorderRef.current.addEventListener('dataavailable', ({ data }) => {
//         if (data.size > 0) {
//           setRecordedChunks((prev) => [...prev, data]);
//         }
//       });

//       mediaRecorderRef.current.start();
//     } catch (err) {
//       console.error('Error starting recording:', err);
//       setError('Failed to start recording');
//       setIsRecording(false);
//     }
//   }, [webcamRef]);

//   const handleStopRecording = useCallback(() => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
//       mediaRecorderRef.current.stop();
//     }
//     setIsRecording(false);
//   }, [mediaRecorderRef]);

//   const handleDownload = useCallback(() => {
//     if (recordedChunks.length === 0) {
//       setError('No recording available to download');
//       return;
//     }

//     try {
//       const blob = new Blob(recordedChunks, {
//         type: 'video/webm'
//       });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       document.body.appendChild(a);
//       a.style = 'display: none';
//       a.href = url;
//       a.download = `weapon-detection-recording-${new Date().toISOString().split('T')[0]}.webm`;
//       a.click();

//       setTimeout(() => {
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//       }, 100);
//     } catch (err) {
//       console.error('Error downloading recording:', err);
//       setError('Failed to download recording');
//     }
//   }, [recordedChunks]);

//   const toggleDetection = () => {
//     setDetectionActive(!detectionActive);
//     if (detectionActive) {
//       setDetectionResults(null);
//     }
//   };

//   return (
//     <div className="webcam-detection-container">
//       <h2>Live Weapon Detection</h2>

//       <div className="webcam-wrapper">
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           width={640}
//           height={480}
//           className={`webcam ${detectionResults && detectionResults.detections && detectionResults.detections.length > 0 ? 'detection-alert' : ''}`}
//         />

//         {detectionResults && detectionResults.detections && detectionResults.detections.length > 0 && (
//           <div className="detection-overlay">
//             <div className="alert-badge">
//               ⚠️ WEAPON DETECTED
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="connection-status">
//         Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
//       </div>

//       <div className="controls">
//         <button
//           onClick={toggleDetection}
//           className={`detection-toggle ${detectionActive ? 'active' : ''}`}
//           disabled={isRecording}
//         >
//           {detectionActive ? 'Stop Detection' : 'Start Detection'}
//         </button>

//         {!isRecording ? (
//           <button
//             onClick={handleStartRecording}
//             className="record-button"
//             disabled={!webcamRef.current || !webcamRef.current.stream}
//           >
//             Start Recording
//           </button>
//         ) : (
//           <button
//             onClick={handleStopRecording}
//             className="stop-button"
//           >
//             Stop Recording
//           </button>
//         )}

//         {recordedChunks.length > 0 && (
//           <button
//             onClick={handleDownload}
//             className="download-button"
//           >
//             Download Recording
//           </button>
//         )}
//       </div>

//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}

//       {detectionResults && (
//         <div className="results-panel">
//           <h3>Detection Status:</h3>
//           {detectionResults.detections && detectionResults.detections.length > 0 ? (
//             <>
//               <p className="detection-alert">⚠️ Weapons detected!</p>
//               <ul className="detection-list">
//                 {detectionResults.detections.map((detection, index) => (
//                   <li key={index}>
//                     {detection.class}: {Math.round(detection.confidence * 100)}% confidence
//                   </li>
//                 ))}
//               </ul>

//               {detectionResults.detection_image_path && (
//                 <div className="detection-image">
//                   <h4>Detection Image:</h4>
//                   <img
//                     src={`http://localhost:5000/api/detections/${detectionResults.detection_image_path.split('/').pop()}`}
//                     alt="Detection result"
//                     className="result-image"
//                   />
//                 </div>
//               )}
//             </>
//           ) : (
//             <p className="no-detection">No weapons detected</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebcamDetection;

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import Webcam from "react-webcam";
// import elevateImage from "../../assets/image/elevateImage.png";
// import "./WebcamDetection.css";

// const WebcamDetection = () => {
//   const webcamRef = useRef(null);
//   const wsRef = useRef(null);
//   const [isWebcamOn, setIsWebcamOn] = useState(false);
//   const [mainImage, setMainImage] = useState(null);
//   const [detectedImages, setDetectedImages] = useState([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const [detectionActive, setDetectionActive] = useState(false);
//   const [detectionResults, setDetectionResults] = useState(null);

//   useEffect(() => {
//     if (detectionActive) {
//       connectWebSocket();
//     } else {
//       disconnectWebSocket();
//     }
//     return () => disconnectWebSocket();
//   }, [detectionActive]);

//   const connectWebSocket = () => {
//     wsRef.current = new WebSocket("ws://localhost:5000/ws/detect");

//     wsRef.current.onopen = () => setIsConnected(true);
//     wsRef.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setDetectionResults(data);
//       if (data.detections?.length > 0) {
//         console.log("WEAPON DETECTED!", data.detections);
//       }
//     };
//     wsRef.current.onerror = () => setIsConnected(false);
//     wsRef.current.onclose = () => setIsConnected(false);
//   };

//   const disconnectWebSocket = () => {
//     if (wsRef.current) wsRef.current.close();
//   };

//   const sendFrameToServer = useCallback(() => {
//     if (webcamRef.current && detectionActive && isConnected) {
//       const screenshot = webcamRef.current.getScreenshot();
//       if (screenshot) {
//         wsRef.current.send(
//           JSON.stringify({ image_data: screenshot.split(",")[1] })
//         );
//       }
//     }
//   }, [detectionActive, isConnected]);

//   useEffect(() => {
//     if (detectionActive && isConnected) {
//       const interval = setInterval(sendFrameToServer, 200);
//       return () => clearInterval(interval);
//     }
//   }, [detectionActive, isConnected, sendFrameToServer]);

//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       const updatedImages = [imageSrc, ...detectedImages].slice(0, 5);
//       setDetectedImages(updatedImages);
//       if (!mainImage) setMainImage(imageSrc);
//     }
//   };

//   return (
//     <div className="webcam-container">
//       <div className="webcam-item-one">
//         <img src={elevateImage} alt="Elevate Image" />
//         <button> ? </button>
//       </div>
//       <div className="webcam-item-two">
//         <div className="controls">
//           {!isWebcamOn ? (
//             <button onClick={() => setIsWebcamOn(true)}>Start Webcam</button>
//           ) : (
//             <button onClick={() => setIsWebcamOn(false)}>Stop Webcam</button>
//           )}
//           {isWebcamOn && <button onClick={captureImage}>Capture Image</button>}
//           <button onClick={() => setDetectionActive(!detectionActive)}>
//             {detectionActive ? "Stop Detection" : "Start Detection"}
//           </button>
//         </div>
//         <div className="web-contoler">
//           {isWebcamOn && (
//             <div className="webcam-box">
//               <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
//             </div>
//           )}
//           <div className="image-section">
//             {mainImage && <img className="main-image" src={mainImage} alt="Main Capture" />}
//           </div>
//           <div className="image-list">
//             {detectedImages.map((img, index) => (
//               <img
//                 key={index}
//                 width={"100vmin"}
//                 src={img}
//                 alt={`Detected ${index + 1}`}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="webcam-item-three">
//         <p>© 2025 ElevateTrust.Ai. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default WebcamDetection;

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import Webcam from "react-webcam";
// import elevateImage from "../../assets/image/elevateImage.png";
// import "./WebcamDetection.css";

// const WebcamDetection = () => {
//   const webcamRef = useRef(null);
//   const wsRef = useRef(null);
//   const [isWebcamOn, setIsWebcamOn] = useState(false);
//   const [mainImage, setMainImage] = useState(null);
//   const [detectedImages, setDetectedImages] = useState([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const [detectionActive, setDetectionActive] = useState(false);
//   const [detectionResults, setDetectionResults] = useState(null);

//   useEffect(() => {
//     if (detectionActive) {
//       connectWebSocket();
//     } else {
//       disconnectWebSocket();
//     }
//     return () => disconnectWebSocket();
//   }, [detectionActive]);

//   const connectWebSocket = () => {
//     wsRef.current = new WebSocket("ws://localhost:5000/ws/detect");

//     wsRef.current.onopen = () => setIsConnected(true);
//     wsRef.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setDetectionResults(data);
//     };
//     wsRef.current.onerror = () => setIsConnected(false);
//     wsRef.current.onclose = () => setIsConnected(false);
//   };

//   const disconnectWebSocket = () => {
//     if (wsRef.current) wsRef.current.close();
//   };

//   const sendFrameToServer = useCallback(() => {
//     if (webcamRef.current && detectionActive && isConnected) {
//       const screenshot = webcamRef.current.getScreenshot();
//       if (screenshot) {
//         wsRef.current.send(
//           JSON.stringify({ image_data: screenshot.split(",")[1] })
//         );
//       }
//     }
//   }, [detectionActive, isConnected]);

//   useEffect(() => {
//     if (detectionActive && isConnected) {
//       const interval = setInterval(sendFrameToServer, 200);
//       return () => clearInterval(interval);
//     }
//   }, [detectionActive, isConnected, sendFrameToServer]);

//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       const updatedImages = [imageSrc, ...detectedImages].slice(0, 5);
//       setDetectedImages(updatedImages);
//       if (!mainImage) setMainImage(imageSrc);
//     }
//   };

//   const drawBoundingBox = (ctx, detections) => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     detections.forEach(({ x, y, w, h }) => {
//       ctx.strokeStyle = "red";
//       ctx.lineWidth = 2;
//       ctx.strokeRect(x, y, w, h);
//     });
//   };

//   useEffect(() => {
//     if (detectionResults) {
//       const canvas = document.getElementById("overlayCanvas");
//       const ctx = canvas.getContext("2d");
//       drawBoundingBox(ctx, detectionResults.detections);
//     }
//   }, [detectionResults]);

//   return (
//     <div className="webcam-container">
//       <div className="webcam-item-one">
//         <img src={elevateImage} alt="Elevate Image" />
//         <button> ? </button>
//       </div>
//       <div className="webcam-item-two">
//         <div className="controls">
//           {!isWebcamOn ? (
//             <button onClick={() => setIsWebcamOn(true)}>Start Webcam</button>
//           ) : (
//             <button onClick={() => setIsWebcamOn(false)}>Stop Webcam</button>
//           )}
//           {isWebcamOn && <button onClick={captureImage}>Capture Image</button>}
//           <button onClick={() => setDetectionActive(!detectionActive)}>
//             {detectionActive ? "Stop Detection" : "Start Detection"}
//           </button>
//         </div>
//         <div className="web-contoler">
//           {isWebcamOn && (
//             <div className="webcam-box" style={{ position: "relative" }}>
//               <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
//               <canvas
//                 id="overlayCanvas"
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: "100%",
//                   pointerEvents: "none",
//                 }}
//               />
//             </div>
//           )}
//           <div className="image-section">
//             {mainImage && (
//               <img className="main-image" src={mainImage} alt="Main Capture" />
//             )}
//           </div>
//           <div className="image-list">
//             {detectedImages.map((img, index) => (
//               <img
//                 key={index}
//                 width={"100vmin"}
//                 src={img}
//                 alt={`Detected ${index + 1}`}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="webcam-item-three">
//         <p>© 2025 ElevateTrust.Ai. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default WebcamDetection;

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import Webcam from "react-webcam";
// import elevateImage from "../../assets/image/elevateImage.png";
// import "./WebcamDetection.css";

// const WebcamDetection = () => {
//   const webcamRef = useRef(null);
//   const wsRef = useRef(null);
//   const [isWebcamOn, setIsWebcamOn] = useState(false);
//   const [mainImage, setMainImage] = useState(null);
//   const [detectedImages, setDetectedImages] = useState([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const [detectionActive, setDetectionActive] = useState(false);
//   const [detectionResults, setDetectionResults] = useState(null);

//   useEffect(() => {
//     if (detectionActive) {
//       connectWebSocket();
//     } else {
//       disconnectWebSocket();
//     }
//     return () => disconnectWebSocket();
//   }, [detectionActive]);

//   const connectWebSocket = () => {
//     wsRef.current = new WebSocket("ws://localhost:5000/ws/detect");

//     wsRef.current.onopen = () => setIsConnected(true);
//     wsRef.current.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setDetectionResults(data);
//     };
//     wsRef.current.onerror = () => setIsConnected(false);
//     wsRef.current.onclose = () => setIsConnected(false);
//   };

//   const disconnectWebSocket = () => {
//     if (wsRef.current) wsRef.current.close();
//   };

//   const sendFrameToServer = useCallback(() => {
//     if (webcamRef.current && detectionActive && isConnected) {
//       const screenshot = webcamRef.current.getScreenshot();
//       if (screenshot) {
//         wsRef.current.send(
//           JSON.stringify({ image_data: screenshot.split(",")[1] })
//         );
//       }
//     }
//   }, [detectionActive, isConnected]);

//   useEffect(() => {
//     if (detectionActive && isConnected) {
//       const interval = setInterval(sendFrameToServer, 200);
//       return () => clearInterval(interval);
//     }
//   }, [detectionActive, isConnected, sendFrameToServer]);

//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       const updatedImages = [imageSrc, ...detectedImages].slice(0, 5);
//       setDetectedImages(updatedImages);
//       if (!mainImage) setMainImage(imageSrc);
//     }
//   };

//   useEffect(() => {
//     if (detectionResults) {
//       const canvas = document.getElementById("overlayCanvas");
//       const ctx = canvas.getContext("2d");
//       ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//       detectionResults.detections.forEach(({ x, y, w, h }) => {
//         ctx.strokeStyle = "red";
//         ctx.lineWidth = 2;
//         ctx.strokeRect(x, y, w, h);
//       });
//     }
//   }, [detectionResults]);

//   return (
//     <div className="webcam-container">
//       <div className="webcam-item-one">
//         <img src={elevateImage} alt="Elevate" />
//         <button> ? </button>
//       </div>
//       <div className="webcam-item-two">
//         <div className="controls">
//           {!isWebcamOn ? (
//             <button onClick={() => setIsWebcamOn(true)}>Start Webcam</button>
//           ) : (
//             <button onClick={() => setIsWebcamOn(false)}>Stop Webcam</button>
//           )}
//           {isWebcamOn && <button onClick={captureImage}>Capture Image</button>}
//           <button onClick={() => setDetectionActive(!detectionActive)}>
//             {detectionActive ? "Stop Detection" : "Start Detection"}
//           </button>
//         </div>
//         <div className="web-contoler">
//           {isWebcamOn && (
//             <div className="webcam-box" style={{ position: "relative" }}>
//               <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
//               <canvas
//                 id="overlayCanvas"
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: "100%",
//                   pointerEvents: "none",
//                 }}
//               />
//             </div>
//           )}
//           <div className="image-section">
//             {mainImage && (
//               <img className="main-image" src={mainImage} alt="Main Capture" />
//             )}
//           </div>
//           <div className="image-list">
//             {detectedImages.map((img, index) => (
//               <img
//                 key={index}
//                 width={"100vmin"}
//                 src={img}
//                 alt={`Detected ${index + 1}`}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="webcam-item-three">
//         <p>© 2025 ElevateTrust.Ai. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default WebcamDetection;

import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import elevateImage from "../../assets/image/elevateImage.png";
import "./WebcamDetection.css";

const WebcamDetection = () => {
  const webcamRef = useRef(null);
  const wsRef = useRef(null);
  const canvasRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [detectedImages, setDetectedImages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [detectionActive, setDetectionActive] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);

  useEffect(() => {
    if (detectionActive) {
      connectWebSocket();
    } else {
      disconnectWebSocket();
    }
    return () => disconnectWebSocket();
  }, [detectionActive]);

  const connectWebSocket = () => {
    wsRef.current = new WebSocket("ws://localhost:5000/ws/detect");

    wsRef.current.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
    };
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket Data Received:", data); // Log received data
        setDetectionResults(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    wsRef.current.onerror = () => setIsConnected(false);
    wsRef.current.onclose = () => setIsConnected(false);
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) wsRef.current.close();
  };

  const sendFrameToServer = useCallback(() => {
    if (webcamRef.current && detectionActive && isConnected) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        console.log("Sending frame to server");
        wsRef.current.send(
          JSON.stringify({ image_data: screenshot.split(",")[1] })
        );
      }
    }
  }, [detectionActive, isConnected]);

  useEffect(() => {
    if (detectionActive && isConnected) {
      const interval = setInterval(sendFrameToServer, 100);
      return () => clearInterval(interval);
    }
  }, [detectionActive, isConnected, sendFrameToServer]);

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const updatedImages = [imageSrc, ...detectedImages].slice(0, 5);
      setDetectedImages(updatedImages);
      if (!mainImage) setMainImage(imageSrc);
    }
  };

  const drawBoundingBoxes = useCallback((detections) => {
    if (!canvasRef.current || !detections || detections.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((detection) => {
      const { x1, y1, x2, y2 } = detection.bbox;
      const class_name = detection.class || "unknown"; // Fallback for undefined class
      const confidence = detection.confidence || 0; // Fallback for undefined confidence

      // Draw bounding box
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

      // Draw label background
      ctx.fillStyle = "red";
      const text = `${class_name} ${(confidence * 100).toFixed(1)}%`;
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(x1 - 2, y1 - 25, textWidth + 4, 20);

      // Draw label text
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText(text, x1, y1 - 8);
    });
  }, []);

  useEffect(() => {
    if (detectionResults?.detections?.length > 0) {
      console.log("Detection Results:", detectionResults.detections);
      drawBoundingBoxes(detectionResults.detections);
    } else if (canvasRef.current) {
      console.log("No detections found, clearing canvas.");
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [detectionResults, drawBoundingBoxes]);

  return (
    <div className="webcam-container">
      <div className="webcam-item-one">
        <img src={elevateImage} alt="Elevate Image" />
        <button> ? </button>
      </div>
      <div className="webcam-item-two">
        <div className="controls">
          {!isWebcamOn ? (
            <button onClick={() => setIsWebcamOn(true)}>Start Webcam</button>
          ) : (
            <button onClick={() => setIsWebcamOn(false)}>Stop Webcam</button>
          )}
          {isWebcamOn && <button onClick={captureImage}>Capture Image</button>}
          <button onClick={() => setDetectionActive(!detectionActive)}>
            {detectionActive ? "Stop Detection" : "Start Detection"}
          </button>
        </div>
        <div className="web-contoler">
          {isWebcamOn && (
            <div className="webcam-box" style={{ position: "relative" }}>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
                style={{ width: 320, height: 240 }}
              />
              <canvas
                ref={canvasRef}
                width={320}
                height={240}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "256px",
                  height: "256px",
                  pointerEvents: "none",
                }}
              />
            </div>
          )}
          <div className="image-section">
            {mainImage && (
              <img className="main-image" src={mainImage} alt="Main Capture" />
            )}
          </div>
          <div className="image-list">
            {detectedImages.map((img, index) => (
              <img
                key={index}
                width={"100vmin"}
                src={img}
                alt={`Detected ${index + 1}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="webcam-item-three">
        <p>© 2025 ElevateTrust.Ai. All rights reserved.</p>
      </div>
    </div>
  );
};

export default WebcamDetection;

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import Webcam from "react-webcam";
// import elevateImage from "../../assets/image/elevateImage.png";
// import "./WebcamDetection.css";

// const WebcamDetection = () => {
//   const webcamRef = useRef(null);
//   const wsRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [isWebcamOn, setIsWebcamOn] = useState(false);
//   const [mainImage, setMainImage] = useState(null);
//   const [detectedImages, setDetectedImages] = useState([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const [detectionActive, setDetectionActive] = useState(false);
//   const [detectionResults, setDetectionResults] = useState(null);

//   useEffect(() => {
//     if (detectionActive) {
//       connectWebSocket();
//     } else {
//       disconnectWebSocket();
//     }
//     return () => disconnectWebSocket();
//   }, [detectionActive]);

//   const connectWebSocket = () => {
//     wsRef.current = new WebSocket("ws://localhost:5000/ws/detect");

//     wsRef.current.onopen = () => {
//       console.log("WebSocket connection established");
//       setIsConnected(true);
//     };
//     wsRef.current.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log("WebSocket Data Received:", data); // Log received data
//         setDetectionResults(data);
//       } catch (error) {
//         console.error("Error parsing WebSocket message:", error);
//       }
//     };
//     wsRef.current.onerror = () => setIsConnected(false);
//     wsRef.current.onclose = () => setIsConnected(false);
//   };

//   const disconnectWebSocket = () => {
//     if (wsRef.current) wsRef.current.close();
//   };

//   const sendFrameToServer = useCallback(() => {
//     if (webcamRef.current && detectionActive && isConnected) {
//       const screenshot = webcamRef.current.getScreenshot();
//       if (screenshot) {
//         console.log("Sending frame to server");
//         wsRef.current.send(
//           JSON.stringify({ image_data: screenshot.split(",")[1] })
//         );
//       }
//     }
//   }, [detectionActive, isConnected]);

//   useEffect(() => {
//     if (detectionActive && isConnected) {
//       const interval = setInterval(sendFrameToServer, 200);
//       return () => clearInterval(interval);
//     }
//   }, [detectionActive, isConnected, sendFrameToServer]);

//   const captureImage = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       const updatedImages = [imageSrc, ...detectedImages].slice(0, 5);
//       setDetectedImages(updatedImages);
//       if (!mainImage) setMainImage(imageSrc);
//     }
//   };

//   const drawBoundingBoxes = useCallback((detections) => {
//     if (!canvasRef.current || !detections || detections.length === 0) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     detections.forEach((detection) => {
//       const { x1, y1, x2, y2 } = detection.bbox;
//       const class_name = detection.class || "unknown"; // Fallback for undefined class
//       const confidence = detection.confidence || 0; // Fallback for undefined confidence

//       // Draw bounding box
//       ctx.strokeStyle = "red";
//       ctx.lineWidth = 3;
//       ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

//       // Draw label background
//       ctx.fillStyle = "red";
//       const text = `${class_name} ${(confidence * 100).toFixed(1)}%`;
//       const textWidth = ctx.measureText(text).width;
//       ctx.fillRect(x1 - 2, y1 - 25, textWidth + 4, 20);

//       // Draw label text
//       ctx.fillStyle = "white";
//       ctx.font = "16px Arial";
//       ctx.fillText(text, x1, y1 - 8);
//     });
//   }, []);

//   useEffect(() => {
//     if (detectionResults?.detections?.length > 0) {
//       console.log("Detection Results:", detectionResults.detections);
//       drawBoundingBoxes(detectionResults.detections);
//     } else if (canvasRef.current) {
//       console.log("No detections found, clearing canvas.");
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     }
//   }, [detectionResults, drawBoundingBoxes]);

//   return (
//     <div className="webcam-container">
//       <div className="webcam-item-one">
//         <img src={elevateImage} alt="Elevate Image" />
//         <button> ? </button>
//       </div>
//       <div className="webcam-item-two">
//         <div className="controls">
//           {!isWebcamOn ? (
//             <button onClick={() => setIsWebcamOn(true)}>Start Webcam</button>
//           ) : (
//             <button onClick={() => setIsWebcamOn(false)}>Stop Webcam</button>
//           )}
//           {isWebcamOn && <button onClick={captureImage}>Capture Image</button>}
//           <button onClick={() => setDetectionActive(!detectionActive)}>
//             {detectionActive ? "Stop Detection" : "Start Detection"}
//           </button>
//         </div>
//         <div className="web-contoler">
//           {isWebcamOn && (
//             <div className="webcam-box" style={{ position: "relative" }}>
//               <Webcam
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 width={640}
//                 height={480}
//                 style={{ width: 640, height: 480 }}
//               />
//               <canvas
//                 ref={canvasRef}
//                 width={640}
//                 height={480}
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   width: "640px",
//                   height: "480px",
//                   pointerEvents: "none",
//                 }}
//               />
//             </div>
//           )}
//           <div className="image-section">
//             {mainImage && (
//               <img className="main-image" src={mainImage} alt="Main Capture" />
//             )}
//           </div>
//           <div className="image-list">
//             {detectedImages.map((img, index) => (
//               <img
//                 key={index}
//                 width={"100vmin"}
//                 src={img}
//                 alt={`Detected ${index + 1}`}
//                 onClick={() => setMainImage(img)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="webcam-item-three">
//         <p>© 2025 ElevateTrust.Ai. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default WebcamDetection;
