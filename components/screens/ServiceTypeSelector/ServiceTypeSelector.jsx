// "use client";

// import Card from "@/components/reuse_components/Card";
// import TalkingCharacter from "@/components/reuse_components/TalkingCharacter";
// import Header from "@/components/screens/ServiceTypeSelector/Header";
// import LandingSection from "@/components/screens/ServiceTypeSelector/Landing";
// import Features from "@/components/screens/ServiceTypeSelector/Features";
// import Footer from "@/components/screens/ServiceTypeSelector/Footer";
// import "@/styles/main.css";
// import "@/styles/bootstrap.css";
// // import "@/styles/bootstrap.css.map";
// export default function ServiceTypeSelector({
//   services,
//   onSelectService,
//   language,
//   getServiceName,
//   darkMode,
// }) {
//   return (
//     <div className="max-w-6xl mx-auto">
//       <TalkingCharacter />
//       {/* <Header /> */}
//       <LandingSection />
//       <Features />
//       <hr />
//       {/* <Branding /> */}

//       <div className="mb-8 text-start">
//         <h1 style={{ color: "#36e27b" }} className="text-4xl font-bold mb-2">
//           {language === "ar" ? "اختر الخدمة" : "Choose a Service"}
//         </h1>
//         <p style={{ color: "#a8bbb3" }} className="text-lg">
//           {language === "ar"
//             ? "اختر الخدمة التي تريدها للبحث عن الفروع"
//             : "Select a service to find nearby branches"}
//         </p>
//       </div>
//       {/* lash note :::: ==> white it become only to serviese make  lg:grid-cols-3  ==> to be >> lg:grid-cols-2  */}
//       <div
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
//         id="go_to_servieces"
//       >
//         {services.map((service) => (
//           <button
//             key={service.service_id}
//             onClick={() => onSelectService(service)}
//             className="text-left transition hover:scale-105 hover:shadow-xl"
//           >
//             <Card darkMode={darkMode}>
//               <div className="flex items-start justify-between mb-4">
//                 <div
//                   style={{
//                     backgroundColor: darkMode ? "#2a2a2a" : "#e8f4f8",
//                     color: "#36e27b",
//                     width: "48px",
//                     height: "48px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: "8px",
//                     fontSize: "28px",
//                   }}
//                 >
//                   {service.icon || "🏢"}
//                 </div>
//               </div>

//               <h3
//                 style={{ color: "#36e27b" }}
//                 className="text-xl font-bold mb-3"
//               >
//                 {getServiceName(service)}
//               </h3>

//               <div
//                 style={{
//                   backgroundColor: "#36e27b",
//                   color: "#111714",
//                 }}
//                 className="inline-block px-4 py-2 rounded-lg font-semibold text-sm"
//               >
//                 {language === "ar" ? "عرض الفروع" : "View Branches"}
//               </div>
//             </Card>
//           </button>
//         ))}
//       </div>
//       <hr style={{ marginTop: "20px" }} />
//       <Footer />
//     </div>
//   );
// }
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
        {services.map((service) => (
          <button
            key={service.service_id}
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
                className="text-2xl font-bold mb-4"
              >
                {getServiceName(service)}
              </h3>

              {/* Service Description */}
              <p
                style={{ color: "#a8bbb3" }}
                className="text-sm mb-2 text-white-50"
                style={
                  {
                    // lineHeight: "1.6",
                  }
                }
              >
                {getServiceDescription(service)}
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
