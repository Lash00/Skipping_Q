import Lottie from "lottie-react";
import waitingQueue from "@/assets/lottie/Waiting.json";
// import { useEffect, useState } from "react";
export default function LandingSection() {
  // const [index, setIndex] = useState(0);
  const texts = [
    "Escape Q helps you find the quietest times and hidden gems, so you can spend less time waiting and more time enjoying. Plan your day efficiently and make every moment count.",

    // "يساعدك تطبيق Escape Q في العثور على أهدأ الأوقات وأفضل الأماكن الخفية، لتتمكن من قضاء وقت أقل في الانتظار ووقت أطول في الاستمتاع. خطط ليومك بكفاءة واجعل كل لحظة ذات قيمة.",
  ];
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % texts.length);
  //   }, 4000); // كل 4 ثواني يتغير النص
  //   return () => clearInterval(interval);
  // }, [texts.length]);
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-lg-6 col-xl-6 col-md-6 col-12">
          {/* this is how to use the lottie file ya zoz  */}

          {/* <div style={{ textAlign: "center" }}> */}
          <Lottie
            animationData={waitingQueue}
            loop={true} // Animation will loop
            autoplay={true} // Animation starts automatically
            //style={{ height: 300, width: 300 }} // Size of animation
          />
        </div>

        <div className="col-lg-6 col-xl-6 col-md-6 col-12 d-flex flex-column justify-content-center">
          <h1 className="main-text-color ms-0 text-start">
            {" "}
            <span style={{ color: "lightgreen" }}>Skip</span> the Line, and Make
            Every Moment Count
          </h1>
          <p className="sub-text-color fade-text">{texts[0]}</p>
          <div className="text-start">
            {" "}
            <button className="btn rounded-4 px-3 text-center w-25  fw-bolder bg-light-green">
              <a
                href="#go_to_servieces"
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                Go to Servieces
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
