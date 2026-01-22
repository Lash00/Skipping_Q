import Lottie from "lottie-react";
import starsAnimation from "../../assets/lottie/Talk.json";
import { useState } from "react";

export default function TalkingCharacter() {
  let [talk, setTalk] = useState(true);
  function handelSettalk() {
    setTalk((isTalk) => !isTalk);
  }
  return (
    <div className="floating-lottie" onClick={handelSettalk}>
      <Lottie
        animationData={starsAnimation}
        loop={talk} // Animation will loop
        autoplay={talk} // Animation starts automatically
        //style={{ height: 300, width: 300 }} // Size of animation
      />
    </div>
  );
}
