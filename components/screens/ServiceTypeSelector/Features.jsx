import Feature from "@/components/screens/ServiceTypeSelector/Feature";

import AllServices from "@/assets/lottie/Services.json";
import SmartQueue from "@/assets/lottie/Waiting_Queue.json";

const featuresData = [
  {
    title: "Smart Queue Management",
    description:
      "See the queue in real time, know the waiting time, and reserve your spot before going, reducing crowding.",
    videoSrc: SmartQueue,
  },

  {
    title: "All Services in One Place",
    description:
      "You can access all services—banks, civil registry, and more—through a single app, without switching between apps.",
    videoSrc: AllServices,
  },

  // {
  //   title: "Clear Services for Each Provider",
  //   description:
  //     "Each provider shows its services simply, like ATMs or official document issuance. Find what you need quickly.",
  //   videoSrc: clearServieces,
  // },
  // {
  //   title: "Easy App Expansion",
  //   description:
  //     "If new providers are added, the app can handle them quickly without any problems.",
  //   videoSrc: EasyApp,
  // },
];

function Features() {
  return (
    <div className="container">
      {featuresData.map((feature, index) => (
        <Feature
          key={index}
          title={feature.title}
          description={feature.description}
          videoSrc={feature.videoSrc}
          isReversed={index % 2 !== 0}
        />
      ))}
    </div>
  );
}

export default Features;
