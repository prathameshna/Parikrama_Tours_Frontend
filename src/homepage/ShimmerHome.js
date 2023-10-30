import "./ShimmerHome.css";

const ShimmerHome = () => {
  return (
    <div className="">
      <div className="shimmerHome-card-container">
        <div className="shimmerHome-card">
          <div className="text-center" style={{ margin: "5rem" }}>
            <h1 className="sr-only">Please wait tours are loading &nbsp;</h1>
            <p style={{ fontSize: "2rem" }}>
              Your patience is greatly appreciated as we initiate our backend
              server on the render.com platform. <br /> It might take a brief
              moment for it to be up and running. Thank you for your
              understanding.
            </p>
          </div>
        </div>
        <div className="shimmerHome-card"></div>
        <div className="shimmerHome-card"></div>
        <div className="shimmerHome-card"></div>
        <div className="shimmerHome-card"></div>
        <div className="shimmerHome-card"></div>
      </div>
    </div>
  );
};

export default ShimmerHome;
