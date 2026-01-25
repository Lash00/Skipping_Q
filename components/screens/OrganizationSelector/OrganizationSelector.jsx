// "use client";

// import Card from "@/components/reuse_components/Card";

// export default function OrganizationSelector({
//   organizations,
//   onSelectOrganization,
//   language,
//   getOrgName,
//   getOrgDesc,
//   darkMode,
// }) {
//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="mb-8 text-start">
//         <h1 style={{ color: "#36e27b" }} className="text-4xl font-bold mb-2">
//           {language === "ar" ? "اختر البنك" : "Select Bank"}
//         </h1>
//         <p style={{ color: "#a8bbb3" }} className="text-lg">
//           {language === "ar"
//             ? "اختر البنك الذي تريد الوصول إلى خدماته"
//             : "Choose the bank you want to access"}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {organizations.map((org) => (
//           <button
//             key={org.org_id}
//             onClick={() => onSelectOrganization(org)}
//             className="text-left transition hover:scale-105 hover:shadow-xl"
//           >
//             <Card darkMode={darkMode}>
//               <div className="flex items-start justify-between mb-4">
//                 <div
//                   style={{
//                     backgroundColor: "#e8f4f8",
//                     color: "#36e27b",
//                     width: "48px",
//                     height: "48px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: "8px",
//                     fontSize: "24px",
//                   }}
//                 >
//                   🏦
//                 </div>
//               </div>

//               <h3
//                 style={{ color: "#36e27b" }}
//                 className="text-2xl font-bold mb-2"
//               >
//                 {getOrgName(org)}
//               </h3>

//               <p style={{ color: "#a8bbb3" }} className="text-sm mb-4">
//                 {getOrgDesc(org)}
//               </p>

//               <div
//                 style={{
//                   backgroundColor: "#36e27b",
//                   color: "#111714",
//                 }}
//                 className="inline-block px-4 py-2 rounded-lg font-semibold text-sm"
//               >
//                 {language === "ar" ? "اختر البنك" : "Select Bank"}
//               </div>
//             </Card>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Card from "@/components/reuse_components/Card";

export default function OrganizationSelector({
  organizations,
  onSelectOrganization,
  language,
  getOrgName,
  getOrgDesc,
  darkMode,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter organizations based on search query
  const filteredOrganizations = organizations.filter((org) => {
    const name = getOrgName(org).toLowerCase();
    const desc = getOrgDesc(org).toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || desc.includes(query);
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-start">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => window.history.back()}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#36e27b",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
            }}
          >
            {language === "ar" ? "›" : "‹"}
          </button>
          <div className="text-start">
            <h1
              style={{ color: darkMode ? "#36e27b" : "#2d3e38" }}
              className="text-4xl font-bold mb-1"
            >
              {language === "ar" ? "ماكينات البنوك" : "Back machines"}
            </h1>
            <p style={{ color: "#6b7b75" }} className="text-sm">
              {language === "ar"
                ? "ماكينات الصراف الآلي - ابحث عن أقرب صراف آلي"
                : "ATM Machines - Find the nearest ATM"}
            </p>
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-6">
          <div
            style={{
              backgroundColor: darkMode ? "#ffffff" : "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: "#9ca3af", fontSize: "18px" }}>🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === "ar" ? "ابحث عن البنوك..." : "Search banks..."
              }
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                width: "100%",
                color: "#374151",
                fontSize: "14px",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  fontSize: "18px",
                  padding: "0",
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrganizations.length > 0 ? (
          filteredOrganizations.map((org) => (
            <button
              key={org.org_id}
              onClick={() => onSelectOrganization(org)}
              style={{
                border: "none",
                background: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
              className="transition hover:scale-105"
            >
              <div
                style={{
                  backgroundColor: darkMode ? "#ffffff" : "#ffffff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 1px 8px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Icon and Title Row */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    style={{
                      backgroundColor: "#e0f2fe",
                      color: "#0ea5e9",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      fontSize: "20px",
                      flexShrink: 0,
                    }}
                  >
                    🏦
                  </div>
                  <h3
                    style={{
                      color: "#1f2937",
                      fontSize: "16px",
                      fontWeight: "600",
                      lineHeight: "1.4",
                      margin: 0,
                    }}
                  >
                    {getOrgName(org)}
                  </h3>
                </div>

                {/* ATMs Available */}
                <div
                  className="flex items-center gap-2"
                  style={{ color: "#6b7280", fontSize: "13px" }}
                >
                  <span>⚡</span>
                  <span>{getOrgDesc(org)}</span>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "40px",
              color: "#6b7280",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "8px" }}>🔍</p>
            <p>
              {language === "ar"
                ? "لم يتم العثور على نتائج"
                : "No results found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
