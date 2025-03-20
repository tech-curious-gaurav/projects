import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import VideoUploadPage from "./components/VideoDetectionPage/VideoDetection";
import WebcamDetectionPage from "./components/WebcamDetectionPage/WebcamDetection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/video-detection" element={<VideoUploadPage />} />
      <Route path="/webcam-detection" element={<WebcamDetectionPage />} />
    </Routes>
  );
}

export default App;
