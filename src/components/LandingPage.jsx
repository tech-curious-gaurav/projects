import { useNavigate } from "react-router";
import "./LandingPage.css";
import elevateImage from "../assets/image/elevateImage.png";
import weaponVideo from "../assets/video/weaponVideo.mp4";

import React from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="item-one">
        <img src={elevateImage} alt="elevate-Image" />
        <button>help</button>
      </div>
      <div className="item-two">
        <h1>WEAPON DETECTION SYSTEM</h1>
        <p>
          IF YOU ARE CONCERNED ABOUT OUR SECURITY, THEN LIFT YOUR TRUST WITH THE
          ELEVATE
        </p>
        <h6>
          if someone is carrying a weapon, there are two ways to find out who is
          carrying it.
        </h6>
      </div>
      <div className="item-four">
        <div className="webcam-btn">
          <h4>WEAPON DETECTED THROW WEBCAM</h4>
          <button onClick={() => navigate("Webcam-Detection")}>
            LIVE WEAPON DETECTION
          </button>
        </div>
        <video src={weaponVideo} type="video/mp4" controls></video>
      </div>
      <div className="item-five">
        <div className="uploading-btn">
          <h4>WEAPON DETECTED THROW WEBCAM</h4>
          <button onClick={() => navigate("/video-detection")}>
            LIVE WEAPON DETECTION
          </button>
        </div>
        <video src={weaponVideo} type="video/mp4" controls></video>
      </div>
      <div className="item-six">
        <p>© 2025 ElevateTrust.Ai.All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
