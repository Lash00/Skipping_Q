// "use client";

// import { useState } from "react";
// import Card from "@/components/reuse_components/Card";
// import StatusBadge from "@/components/reuse_components/StatusBadge";

// export default function ATMDetailsScreen({
//   atm,
//   branchName,
//   language,
//   getATMName,
//   darkMode,
// }) {
//   const [withdrawalAmount, setWithdrawalAmount] = useState("");
//   const [validationMessage, setValidationMessage] = useState("");
//   const [validationStatus, setValidationStatus] = useState("");

//   const handleAmountChange = (e) => {
//     const value = e.target.value;
//     setWithdrawalAmount(value);

//     if (!value) {
//       setValidationMessage("");
//       setValidationStatus("");
//       return;
//     }

//     const amount = parseInt(value);
//     const availableDenominations = atm.denominations || [200, 100, 50, 20];

//     let canMakeAmount = false;
//     if (availableDenominations.includes(amount)) {
//       canMakeAmount = true;
//     }

//     // Check if amount can be made from combinations
//     // for (let i = 0; i < availableDenominations.length && !canMakeAmount; i++) {
//     //   for (let j = i; j < availableDenominations.length; j++) {
//     //     if (
//     //       availableDenominations[i] * 2 === amount ||
//     //       availableDenominations[i] + availableDenominations[j] === amount
//     //     ) {
//     //       canMakeAmount = true;
//     //       break;
//     //     }
//     //   }
//     // }
//     if (withdrawalAmount > 0 && withdrawalAmount <= 8000) {
//       canMakeAmount = true;
//     }

//     if (canMakeAmount && atm.isActive) {
//       setValidationStatus("success");
//       setValidationMessage(
//         language === "ar"
//           ? "✅ المبلغ متاح. يمكنك المتابعة"
//           : "✅ Amount available. You can proceed",
//       );
//     } else {
//       setValidationStatus("error");
//       setValidationMessage(
//         language === "ar"
//           ? "❌ هذا المبلغ غير متاح في هذه الماكينة"
//           : "❌ This amount is not available",
//       );
//     }
//   };

//   const handleProceed = () => {
//     if (validationStatus === "success") {
//       alert(
//         language === "ar"
//           ? `جاري سحب ${withdrawalAmount} جنيه...`
//           : `Withdrawing ${withdrawalAmount} EGP...`,
//       );
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="mb-8">
//         <h1
//           style={{ color: darkMode ? "#ffffff" : "#1f2937" }}
//           className="text-4xl font-bold mb-2"
//         >
//           {language === "ar" ? "تفاصيل ماكينة الصراف" : "ATM Details"}
//         </h1>
//         <p style={{ color: "#6b7280" }} className="text-lg">
//           {branchName}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Side - Map */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Map Card */}
//           <div
//             style={{
//               backgroundColor: darkMode ? "#1f2937" : "#f3f4f6",
//               borderRadius: "16px",
//               padding: "24px",
//               border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
//             }}
//           >
//             <div
//               style={{
//                 width: "100%",
//                 height: "400px",
//                 backgroundColor: darkMode ? "#111827" : "#e5e7eb",
//                 borderRadius: "12px",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 border: `2px dashed ${darkMode ? "#4b5563" : "#d1d5db"}`,
//               }}
//             >
//               <div className="text-center mb-4">
//                 <div
//                   style={{
//                     width: "80px",
//                     height: "80px",
//                     backgroundColor: "#3b82f6",
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     margin: "0 auto",
//                     boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
//                   }}
//                 >
//                   <span style={{ fontSize: "40px" }}>📍</span>
//                 </div>
//               </div>
//               <p
//                 style={{
//                   color: "#6b7280",
//                   fontSize: "16px",
//                   fontWeight: "600",
//                 }}
//               >
//                 {language === "ar"
//                   ? "القاهرة، وسط البلد، مصر"
//                   : "Cairo Downtown, Egypt"}
//               </p>
//             </div>

//             {/* Action Buttons */}
//             {/* <div className="flex gap-3 mt-6">
//               <button
//                 style={{
//                   backgroundColor: "transparent",
//                   border: "2px solid #e5e7eb",
//                   color: darkMode ? "#ffffff" : "#374151",
//                   padding: "12px 24px",
//                   borderRadius: "12px",
//                   fontWeight: "600",
//                   fontSize: "14px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "8px",
//                   flex: 1,
//                   justifyContent: "center",
//                 }}
//                 className="hover:bg-gray-100 transition"
//               >
//                 <span>🧭</span>
//                 {language === "ar" ? "الاتجاهات" : "Directions"}
//               </button>
//               <button
//                 style={{
//                   backgroundColor: "#3b82f6",
//                   color: "#ffffff",
//                   padding: "12px 24px",
//                   borderRadius: "12px",
//                   fontWeight: "600",
//                   fontSize: "14px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "8px",
//                   flex: 1,
//                   justifyContent: "center",
//                   border: "none",
//                 }}
//                 className="hover:bg-blue-600 transition"
//               >
//                 <span>📞</span>
//                 {language === "ar" ? "اتصال" : "Call"}
//               </button>
//             </div> */}
//           </div>

//           {/* Withdraw Cash Card - Below Map */}
//           <div
//             style={{
//               backgroundColor: darkMode ? "#1f2937" : "#ffffff",
//               borderRadius: "16px",
//               padding: "32px",
//               border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
//             }}
//           >
//             <h3
//               style={{ color: darkMode ? "#ffffff" : "#1f2937" }}
//               className="text-2xl font-bold mb-6"
//             >
//               {language === "ar" ? "سحب نقدي" : "Withdraw Cash"}
//             </h3>

//             <div className="mb-6">
//               <label
//                 style={{ color: "#6b7280" }}
//                 className="block text-sm font-semibold mb-3"
//               >
//                 {language === "ar" ? "المبلغ (جنيه مصري)" : "Amount (EGP)"}
//               </label>
//               <div className="relative">
//                 <span
//                   style={{ color: "#9ca3af" }}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl"
//                 ></span>
//                 <input
//                   type="number"
//                   value={withdrawalAmount}
//                   onChange={handleAmountChange}
//                   placeholder={
//                     language === "ar" ? "أدخل المبلغ" : "Enter amount"
//                   }
//                   style={{
//                     border: "2px solid #e5e7eb",
//                     backgroundColor: darkMode ? "#111827" : "#f9fafb",
//                     color: darkMode ? "#ffffff" : "#111827",
//                     paddingLeft: "48px",
//                     paddingRight: "48px",
//                     width: "100%",
//                     padding: "14px",
//                     borderRadius: "12px",
//                     fontSize: "16px",
//                   }}
//                   className="focus:outline-none focus:border-blue-500 transition"
//                 />
//                 <span
//                   style={{
//                     position: "absolute",
//                     right: "16px",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     color: "#9ca3af",
//                     cursor: "pointer",
//                   }}
//                 ></span>
//               </div>
//             </div>

//             {validationMessage && (
//               <div
//                 style={{
//                   backgroundColor:
//                     validationStatus === "success" ? "#dbeafe" : "#fee2e2",
//                   border: `2px solid ${validationStatus === "success" ? "#3b82f6" : "#ef4444"}`,
//                   color: validationStatus === "success" ? "#1e40af" : "#991b1b",
//                   padding: "12px 16px",
//                   borderRadius: "10px",
//                   marginBottom: "24px",
//                   fontWeight: "600",
//                   textAlign: "center",
//                 }}
//               >
//                 {validationMessage}
//               </div>
//             )}

//             {/* <button
//               onClick={handleProceed}
//               disabled={validationStatus !== "success"}
//               style={{
//                 backgroundColor:
//                   validationStatus === "success" ? "#8b5cf6" : "#d1d5db",
//                 color: "#ffffff",
//                 padding: "16px",
//                 borderRadius: "12px",
//                 fontWeight: "600",
//                 fontSize: "16px",
//                 width: "100%",
//                 border: "none",
//                 cursor:
//                   validationStatus === "success" ? "pointer" : "not-allowed",
//               }}
//               className="transition hover:opacity-90"
//             >
//               {language === "ar" ? "المتابعة للسحب" : "Proceed to Withdrawal"}
//             </button> */}
//           </div>
//         </div>

//         {/* Right Side - Details */}
//         <div className="space-y-6">
//           {/* ATM Info Card */}
//           <div
//             style={{
//               backgroundColor: darkMode ? "#1f2937" : "#ffffff",
//               borderRadius: "16px",
//               padding: "24px",
//               border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
//             }}
//           >
//             <div className="flex justify-between items-start mb-6">
//               <h2
//                 style={{ color: darkMode ? "#ffffff" : "#1f2937" }}
//                 className="text-xl font-bold"
//               >
//                 {getATMName(atm)}
//               </h2>
//               <StatusBadge isActive={atm.isActive} language={language} />
//             </div>

//             {/* Operations */}
//             <div className="mb-6">
//               <p
//                 style={{ color: "#6b7280" }}
//                 className="text-sm font-semibold mb-3"
//               >
//                 {language === "ar" ? "العمليات" : "Operations"}
//               </p>
//               <div className="flex gap-2">
//                 {atm.allows_withdrawal && (
//                   <div
//                     style={{
//                       backgroundColor: "#dbeafe",
//                       color: "#1e40af",
//                       padding: "8px 16px",
//                       borderRadius: "8px",
//                       fontSize: "13px",
//                       fontWeight: "600",
//                     }}
//                   >
//                     {language === "ar" ? "سحب" : "Withdrawal"}
//                   </div>
//                 )}
//                 {atm.allows_deposit && (
//                   <div
//                     style={{
//                       backgroundColor: "#dbeafe",
//                       color: "#1e40af",
//                       padding: "8px 16px",
//                       borderRadius: "8px",
//                       fontSize: "13px",
//                       fontWeight: "600",
//                     }}
//                   >
//                     {language === "ar" ? "إيداع" : "Deposit"}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Denominations */}
//             <div className="mb-6">
//               <p
//                 style={{ color: "#6b7280" }}
//                 className="text-sm font-semibold mb-3"
//               >
//                 {language === "ar" ? "الفئات" : "Denominations"}
//               </p>
//               <div className="grid grid-cols-2 gap-2">
//                 {atm.denominations.map((denom) => (
//                   <button
//                     key={denom}
//                     onClick={() => {
//                       setWithdrawalAmount(denom.toString());
//                       const event = { target: { value: denom.toString() } };
//                       handleAmountChange(event);
//                     }}
//                     style={{
//                       backgroundColor: darkMode ? "#111827" : "#ffffff",
//                       border: "2px solid #e5e7eb",
//                       color: darkMode ? "#ffffff" : "#374151",
//                       padding: "12px",
//                       borderRadius: "8px",
//                       fontWeight: "700",
//                       fontSize: "14px",
//                       textAlign: "center",
//                     }}
//                     className="hover:border-blue-500 transition"
//                   >
//                     {denom} {language === "ar" ? "جنيه" : "EGP"}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Queue Info */}
//             <div
//               style={{
//                 borderTop: "1px solid #e5e7eb",
//                 paddingTop: "16px",
//               }}
//             >
//               <div className="flex items-center gap-3 mb-2">
//                 <span style={{ fontSize: "24px" }}>👥</span>
//                 <div>
//                   <p
//                     style={{
//                       color: "#6b7280",
//                       fontSize: "13px",
//                       fontWeight: "600",
//                     }}
//                   >
//                     {atm.queue}{" "}
//                     {language === "ar" ? "أشخاص في الانتظار" : "people waiting"}
//                   </p>
//                   <p style={{ color: "#9ca3af", fontSize: "12px" }}>
//                     {language === "ar"
//                       ? "وقت الانتظار: ~7 دقائق"
//                       : "Wait time: ~7m"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import StatusBadge from "@/components/reuse_components/StatusBadge";

// Import Map Component dynamically
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "#e5e7eb",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <div className="animate-spin text-4xl mb-2">⏳</div>
          <p className="text-gray-500">جاري تحميل الخريطة...</p>
        </div>
      </div>
    </div>
  ),
});

export default function ATMDetailsScreen({
  atm,
  branchName,
  language,
  getATMName,
  darkMode,
}) {
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [validationStatus, setValidationStatus] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setWithdrawalAmount(value);

    if (!value) {
      setValidationMessage("");
      setValidationStatus("");
      return;
    }

    const amount = parseInt(value);

    if (amount > 0 && amount <= 8000 && atm.isActive) {
      setValidationStatus("success");
      setValidationMessage(
        language === "ar"
          ? "✅ المبلغ متاح. يمكنك المتابعة"
          : "✅ Amount available. You can proceed",
      );
    } else {
      setValidationStatus("error");
      setValidationMessage(
        language === "ar"
          ? "❌ هذا المبلغ غير متاح في هذه الماكينة"
          : "❌ This amount is not available",
      );
    }
  };

  const handleProceed = () => {
    if (validationStatus === "success") {
      alert(
        language === "ar"
          ? `جاري سحب ${withdrawalAmount} جنيه...`
          : `Withdrawing ${withdrawalAmount} EGP...`,
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1
          style={{ color: darkMode ? "#ffffff" : "#1f2937" }}
          className="text-4xl font-bold mb-2"
        >
          {language === "ar" ? "تفاصيل ماكينة الصراف" : "ATM Details"}
        </h1>
        <p style={{ color: "#6b7280" }} className="text-lg">
          {branchName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Map */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map Component */}
          <MapComponent
            branchLat={atm.latitude}
            branchLng={atm.longitude}
            branchName={getATMName(atm)}
            branchArea={branchName || "ATM Location"}
          />

          {/* Withdraw Cash Card - Below Map */}
          <div
            style={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{ color: darkMode ? "#ffffff" : "#1f2937" }}
              className="text-2xl font-bold mb-6"
            >
              {language === "ar" ? "سحب نقدي" : "Withdraw Cash"}
            </h3>

            <div className="mb-6">
              <label
                style={{ color: "#6b7280" }}
                className="block text-sm font-semibold mb-3"
              >
                {language === "ar" ? "المبلغ (جنيه مصري)" : "Amount (EGP)"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={withdrawalAmount}
                  onChange={handleAmountChange}
                  placeholder={
                    language === "ar" ? "أدخل المبلغ" : "Enter amount"
                  }
                  style={{
                    border: "2px solid #e5e7eb",
                    backgroundColor: darkMode ? "#111827" : "#f9fafb",
                    color: darkMode ? "#ffffff" : "#111827",
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    fontSize: "16px",
                  }}
                  className="focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            {validationMessage && (
              <div
                style={{
                  backgroundColor:
                    validationStatus === "success" ? "#dbeafe" : "#fee2e2",
                  border: `2px solid ${validationStatus === "success" ? "#3b82f6" : "#ef4444"}`,
                  color: validationStatus === "success" ? "#1e40af" : "#991b1b",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  marginBottom: "24px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {validationMessage}
              </div>
            )}

            <button
              onClick={handleProceed}
              disabled={validationStatus !== "success"}
              style={{
                backgroundColor:
                  validationStatus === "success" ? "#3b82f6" : "#d1d5db",
                color: "#ffffff",
                padding: "16px",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "16px",
                width: "100%",
                border: "none",
                cursor:
                  validationStatus === "success" ? "pointer" : "not-allowed",
              }}
              className="transition hover:opacity-90"
            >
              {language === "ar" ? "المتابعة للسحب" : "Proceed to Withdrawal"}
            </button>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="space-y-6">
          {/* ATM Info Card */}
          <div
            style={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <h2
                style={{ color: darkMode ? "#ffffff" : "#1f2937" }}
                className="text-xl font-bold"
              >
                {getATMName(atm)}
              </h2>
              <StatusBadge isActive={atm.isActive} language={language} />
            </div>

            {/* Operations */}
            <div className="mb-6">
              <p
                style={{ color: "#6b7280" }}
                className="text-sm font-semibold mb-3"
              >
                {language === "ar" ? "العمليات" : "Operations"}
              </p>
              <div className="flex gap-2">
                {atm.allows_withdrawal && (
                  <div
                    style={{
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {language === "ar" ? "سحب" : "Withdrawal"}
                  </div>
                )}
                {atm.allows_deposit && (
                  <div
                    style={{
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {language === "ar" ? "إيداع" : "Deposit"}
                  </div>
                )}
              </div>
            </div>

            {/* Denominations */}
            <div className="mb-6">
              <p
                style={{ color: "#6b7280" }}
                className="text-sm font-semibold mb-3"
              >
                {language === "ar" ? "الفئات" : "Denominations"}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {atm.denominations?.map((denom) => (
                  <button
                    key={denom}
                    onClick={() => {
                      setWithdrawalAmount(denom.toString());
                      const event = { target: { value: denom.toString() } };
                      handleAmountChange(event);
                    }}
                    style={{
                      backgroundColor: darkMode ? "#111827" : "#ffffff",
                      border: "2px solid #e5e7eb",
                      color: darkMode ? "#ffffff" : "#374151",
                      padding: "12px",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                    className="hover:border-blue-500 transition"
                  >
                    {denom} {language === "ar" ? "جنيه" : "EGP"}
                  </button>
                ))}
              </div>
            </div>

            {/* Queue Info */}
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: "16px",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span style={{ fontSize: "24px" }}>👥</span>
                <div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {atm.queue}{" "}
                    {language === "ar" ? "أشخاص في الانتظار" : "people waiting"}
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: "12px" }}>
                    {language === "ar"
                      ? "وقت الانتظار: ~7 دقائق"
                      : "Wait time: ~7m"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
