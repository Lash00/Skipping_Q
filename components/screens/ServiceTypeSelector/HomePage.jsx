import Branding from "../Components/Home/Branding";
import Features from "../Components/Home/Features";
import LandingSection from "../Components/Home/Landing";
import Footer from "../Components/Reuseable_component/Footer";
import Header from "../Components/Reuseable_component/Header";
import TalkingCharacter from "../Components/Reuseable_component/TalkingCharacter";

function HomePage() {
  return (
    <div className="home-container p-2 text-center text-md-start ">
      <TalkingCharacter />
      <Header />
      <LandingSection />
      <Features />
      <Branding />
      <Footer />
    </div>
  );
}

export default HomePage;
