import React, { useEffect, useState } from "react";
import "./shimmer.css";

const ShimmerHome = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000); // 5 seconds in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="">
      <div className="shimmerHome-card-container">
        <div className={`shimmerHome-card ${showContent ? "visible" : ""}`}>
          <div className="text-center-mobile">
            {showContent && (
              <>
                <h1 className="sr-only">
                  Please wait tours are loading &nbsp;
                </h1>
                <p style={{ fontSize: "1.5rem" }}>
                  Your patience is greatly appreciated as we initiate our
                  backend server on the render.com platform. <br /> It might
                  take a brief moment for it to be up and running. <br /> Thank
                  you for your understanding.
                </p>
              </>
            )}
          </div>
        </div>
        <div className={`shimmerHome-card ${showContent ? "visible" : ""}`}>
          <div className="text-center-desktop">
            {showContent && (
              <>
                <h1 className="sr-only">
                  Please wait tours are loading &nbsp;
                </h1>
                <p style={{ fontSize: "2rem" }}>
                  Your patience is greatly appreciated as we initiate our
                  backend server on the render.com platform. <br /> It might
                  take a brief moment for it to be up and running. <br /> Thank
                  you for your understanding.
                </p>
              </>
            )}
          </div>
        </div>
        <div className="shimmerHome-card"></div>
        <div className="shimmerHome-card"></div>
        <div className="shimmerHome-card"></div>
        <div className="shimmerHome-card"></div>
      </div>
    </div>
  );
};

export default ShimmerHome;
