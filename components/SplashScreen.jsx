import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 2000);
    const finishTimer = setTimeout(() => onFinish(), 3500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="splash">
      <div className="logo-row">
        <img src="/logo.jpg" alt="logo" className="splach-logo" />
        {showText && <h1 className="brand-name">Welcome in Skip Q</h1>}
      </div>
    </div>
  );
}
