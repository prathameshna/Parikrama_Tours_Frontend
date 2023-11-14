import React, { useEffect, useState } from "react";
import "./shimmer.css";

const ShimmerTourDetails = () => {
  const [showTextCenter, setShowTextCenter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTextCenter(true);
    }, 5000); // 5 seconds in milliseconds

    return () => clearTimeout(timer);
  }, []); // Run effect only once on mount

  return (
    <>
      <section
        className={`tour-section-header ${showTextCenter ? "visible" : ""}`}
      >
        {showTextCenter && (
          <div className="text-center">
            <h1 className="tour-heading">
              Please wait tours details are loading
            </h1>
            <p>
              Your patience is greatly appreciated as we initiate our backend
              server on the render.com platform. <br /> It might take a brief
              moment for it to be up and running. <br /> Thank you for your
              understanding.
            </p>
          </div>
        )}
      </section>
      <section className="tour-section-description"></section>
    </>
  );
};

export default ShimmerTourDetails;
