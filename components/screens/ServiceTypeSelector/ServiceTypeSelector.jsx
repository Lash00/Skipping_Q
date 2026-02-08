"use client";

import Card from "@/components/reuse_components/Card";
import TalkingCharacter from "@/components/reuse_components/TalkingCharacter";
import Header from "@/components/screens/ServiceTypeSelector/Header";
import LandingSection from "@/components/screens/ServiceTypeSelector/Landing";
import Features from "@/components/screens/ServiceTypeSelector/Features";
import Footer from "@/components/screens/ServiceTypeSelector/Footer";
import "@/styles/main.css";
import "@/styles/bootstrap.css";
// import "@/styles/bootstrap.css.map";

export default function ServiceTypeSelector({
  services,
  onSelectService,
  language,
  getServiceName,
  darkMode,
}) {
  // دالة للحصول على الوصف
  const getServiceDescription = (service) => {
    return language === "ar"
      ? service.description_ar || "ابحث عن أقرب فرع في منطقتك"
      : service.description_en || "Find the nearest branch in your area";
  };
  // services = services.filter((serv) => serv.id != 19);
  let images = [
    "/service_images/1.webp",
    "/service_images/Civil_Registry.jpg",
    "/service_images/Banks.webp",
    "/service_images/4.webp",
  ];
  return (
    <div className="max-w-6xl mx-auto">
      <TalkingCharacter />
      {/* <Header /> */}
      <LandingSection />
      <Features />
      <hr />
      {/* <Branding /> */}

      <div className="mb-8 text-start">
        <h1 style={{ color: "#36e27b" }} className="text-4xl font-bold mb-2">
          {language === "ar" ? "اختر الخدمة" : "Choose a Service"}
        </h1>
        <p style={{ color: "#a8bbb3" }} className="text-lg">
          {language === "ar"
            ? "اختر الخدمة التي تريدها للبحث عن الفروع"
            : "Select a service to find nearby branches"}
        </p>
      </div>

      <div
        // lash
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        id="go_to_servieces"
      >
        {services.map((service, i) => (
          <button
            // key={service.service_id}
            key={service.org_id}
            onClick={() => onSelectService(service)}
            className={`${language === "ar" ? "text-right" : "text-left"} transition hover:scale-105 hover:shadow-xl`}
            style={{
              border: "none",
              background: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <Card darkMode={darkMode}>
              {/* Service Image */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={service.org_image}
                  // Lash Lash gasseer
                  // src={images.at(i)}
                  alt={getServiceName(service)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Service+Image";
                  }}
                />
              </div>

              {/* Service Name */}
              <h3
                style={{ color: "#36e27b" }}
                className="text-2xl font-bold mb-2"
              >
                {getServiceName(service)}
                {/* // Lash Lash gasseer  */}
                {/* {service.org_name} */}
              </h3>

              {/* Service Description */}
              <p style={{ color: "#555756" }} className="text-sm mb-3 ">
                {getServiceDescription(service)}
                {/* // Lash Lash gasseer  */}
                {/* {service.org_description} */}
              </p>

              {/* Action Button */}
              <div
                style={{
                  backgroundColor: "#36e27b",
                  color: "#111714",
                }}
                className="inline-block px-4 py-2 rounded-lg font-semibold text-sm"
              >
                {language === "ar" ? "عرض الفروع" : "View Branches"}
              </div>
            </Card>
          </button>
        ))}
      </div>

      <hr style={{ marginTop: "20px" }} />
      <Footer />
    </div>
  );
}
