import Lottie from "lottie-react";
function Feature({ title, description, videoSrc, isReversed }) {
  return (
    <div
      className={`row ${isReversed ? "flex-column-reverse flex-md-row" : ""} `}
    >
      {isReversed ? (
        <>
          <div className="col-lg-6 col-xl-6 col-md-6 col-12 d-flex flex-column justify-content-center ">
            <div className="w-100 w-md-75">
              {" "}
              <h1 className="main-text-color">{title}</h1>
              <p className="sub-text-color ">{description}</p>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-12">
            <div className="w-100 w-md-75">
              {" "}
              <Lottie
                animationData={videoSrc}
                loop={true} // Animation will loop
                autoplay={true} // Animation starts automatically
                //style={{ height: 300, width: 300 }} // Size of animation
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="col-lg-6 col-xl-6 col-md-6 col-12">
            <div className="w-100 w-md-75">
              {" "}
              <Lottie
                animationData={videoSrc}
                loop={true} // Animation will loop
                autoplay={true} // Animation starts automatically
                //style={{ height: 300, width: 300 }} // Size of animation
              />
            </div>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-12 d-flex flex-column justify-content-center">
            <div className="w-100 w-md-75">
              {" "}
              <h1 className="main-text-color">{title}</h1>
              <p className="sub-text-color ">{description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Feature;
