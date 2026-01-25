// 'use client';

// import { useState } from 'react';
// import Card from '@/components/reuse_components/Card';
// import StatusBadge from '@/components/reuse_components/StatusBadge';

// export default function ATMDetailsScreen({ atm, branchName, language, getATMName, darkMode }) {
//   const [withdrawalAmount, setWithdrawalAmount] = useState('');
//   const [validationMessage, setValidationMessage] = useState('');
//   const [validationStatus, setValidationStatus] = useState('');

//   const handleAmountChange = (e) => {
//     const value = e.target.value;
//     setWithdrawalAmount(value);

//     if (!value) {
//       setValidationMessage('');
//       setValidationStatus('');
//       return;
//     }

//     const amount = parseInt(value);
//     const availableDenominations = atm.denominations || [200, 100, 50, 20];

//     let canMakeAmount = false;
//     if (availableDenominations.includes(amount)) {
//       canMakeAmount = true;
//     }

//     // Check if amount can be made from combinations
//     const possibleCombinations = [];
//     for (let i = 0; i < availableDenominations.length && !canMakeAmount; i++) {
//       for (let j = i; j < availableDenominations.length; j++) {
//         if (availableDenominations[i] * 2 === amount || availableDenominations[i] + availableDenominations[j] === amount) {
//           canMakeAmount = true;
//           break;
//         }
//       }
//     }

//     if (canMakeAmount && atm.isActive && atm.allows_withdrawal) {
//       setValidationStatus('success');
//       setValidationMessage(language === 'ar' ? '✅ المبلغ متاح. يمكنك المتابعة' : '✅ Amount available. You can proceed');
//     } else {
//       setValidationStatus('error');
//       setValidationMessage(language === 'ar' ? '❌ هذا المبلغ غير متاح في هذه الماكينة' : '❌ This amount is not available');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-8">
//         <h1 style={{ color: '#36e27b' }} className="text-4xl font-bold mb-2">
//           تفاصيل ماكينة الصراف
//         </h1>
//         <p style={{ color: '#a8bbb3' }} className="text-lg">
//           فرع {branchName}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <Card darkMode={darkMode}>
//           <div className="flex items-start justify-between mb-6">
//             <div
//               style={{
//                 backgroundColor: '#e8f4f8',
//                 color: '#36e27b',
//                 width: '56px',
//                 height: '56px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: '8px',
//                 fontSize: '28px',
//               }}
//             >
//               🏧
//             </div>
//             <StatusBadge isActive={atm.isActive} language={language} />
//           </div>

//           <h2 style={{ color: '#36e27b' }} className="text-2xl font-bold mb-4">
//             {getATMName(atm)}
//           </h2>

//           <div className="space-y-4">
//             <div>
//               <p style={{ color: '#a8bbb3' }} className="text-sm mb-1">
//                 {language === 'ar' ? 'عمليات متاحة' : 'Available Operations'}
//               </p>
//               <div className="flex gap-3">
//                 {atm.allows_withdrawal && (
//                   <div
//                     style={{
//                       backgroundColor: '#e8f4f8',
//                       color: '#36e27b',
//                       borderRadius: '8px',
//                     }}
//                     className="flex items-center gap-2 px-3 py-2"
//                   >
//                     <span>💵</span>
//                     <span className="font-semibold">سحب</span>
//                   </div>
//                 )}
//                 {atm.allows_deposit && (
//                   <div
//                     style={{
//                       backgroundColor: '#e8f4f8',
//                       color: '#36e27b',
//                       borderRadius: '8px',
//                     }}
//                     className="flex items-center gap-2 px-3 py-2"
//                   >
//                     <span>💰</span>
//                     <span className="font-semibold">إيداع</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div
//               style={{ borderTop: '1px solid #d4e0db', paddingTop: '16px' }}
//             >
//               <p style={{ color: '#a8bbb3' }} className="text-sm mb-3">
//                 الفئات المتاحة
//               </p>
//               <div className="flex gap-2 flex-wrap">
//                 {atm.denominations.map((denom) => (
//                   <div
//                     key={denom}
//                     style={{
//                       backgroundColor: '#e8f4f8',
//                       border: '2px solid #36e27b',
//                       color: '#36e27b',
//                       borderRadius: '6px',
//                     }}
//                     className="px-3 py-1 text-sm font-bold"
//                   >
//                     {denom} جنيه
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div
//               style={{ borderTop: '1px solid #d4e0db', paddingTop: '16px' }}
//             >
//               <p style={{ color: '#a8bbb3' }} className="text-sm mb-2">
//                 الطابور الحالي
//               </p>
//               <div className="flex items-center gap-2">
//                 <span style={{ color: '#d1a220' }} className="text-2xl">
//                   ⏳
//                 </span>
//                 <p style={{ color: '#111714' }} className="text-lg font-semibold">
//                   {atm.queue} {atm.queue === 1 ? 'شخص' : 'أشخاص'} في الانتظار
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card>

//         <Card darkMode={darkMode}>
//           <h3 style={{ color: '#36e27b' }} className="text-2xl font-bold mb-6">
//             تحقق من المبلغ
//           </h3>

//           <div className="mb-6">
//             <label style={{ color: '#111714' }} className="block text-sm font-semibold mb-3">
//               أدخل المبلغ (جنيه)
//             </label>
//             <div className="relative">
//               <span
//                 style={{ color: '#36e27b' }}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl"
//               >
//                 💵
//               </span>
//               <input
//                 type="number"
//                 value={withdrawalAmount}
//                 onChange={handleAmountChange}
//                 placeholder="أدخل المبلغ"
//                 style={{
//                   borderColor: '#d4e0db',
//                   backgroundColor: '#e8f4f8',
//                   color: '#111714',
//                   paddingLeft: '44px',
//                 }}
//                 className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-green-500 transition"
//               />
//             </div>
//           </div>

//           {validationMessage && (
//             <div
//               style={{
//                 backgroundColor: validationStatus === 'success' ? '#e8f4f8' : '#fff5f5',
//                 border: `2px solid ${validationStatus === 'success' ? '#36e27b' : '#c93d3c'}`,
//                 color: validationStatus === 'success' ? '#36e27b' : '#c93d3c',
//               }}
//               className="p-4 rounded-lg mb-6 font-semibold text-center"
//             >
//               {validationMessage}
//             </div>
//           )}

//           <div
//             style={{ backgroundColor: '#e8f4f8', borderRadius: '8px' }}
//             className="p-4"
//           >
//             <p style={{ color: '#a8bbb3' }} className="text-sm mb-3">
//               الفئات المتاحة للسحب:
//             </p>
//             <div className="space-y-2">
//               {atm.denominations.map((denom) => (
//                 <button
//                   key={denom}
//                   onClick={() => {
//                     setWithdrawalAmount(denom.toString());
//                     // Trigger validation
//                     const event = {
//                       target: { value: denom.toString() },
//                     };
//                     handleAmountChange(event);
//                   }}
//                   style={{
//                     backgroundColor: '#ffffff',
//                     border: '1px solid #d4e0db',
//                     color: '#111714',
//                   }}
//                   className="w-full px-4 py-2 rounded-lg font-semibold text-left hover:bg-green-50 transition"
//                 >
//                   {denom} جنيه
//                 </button>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </div>

//       <Card darkMode={darkMode}>
//         <div
//           style={{
//             backgroundColor: '#e8f4f8',
//             borderRadius: '8px',
//           }}
//           className="p-6"
//         >
//           <h3 style={{ color: '#36e27b' }} className="text-xl font-bold mb-4">
//             📍 الموقع على الخريطة
//           </h3>
//           <div
//             style={{
//               width: '100%',
//               height: '300px',
//               backgroundColor: '#f5f5f5',
//               borderRadius: '8px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               border: '2px dashed #d4e0db',
//             }}
//           >
//             <div className="text-center">
//               <p style={{ color: '#36e27b' }} className="text-4xl mb-2">
//                 📍
//               </p>
//               <p style={{ color: '#a8bbb3' }} className="font-semibold">
//                 الموقع: {atm.latitude.toFixed(4)}, {atm.longitude.toFixed(4)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Card from "@/components/reuse_components/Card";
import StatusBadge from "@/components/reuse_components/StatusBadge";

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
    const availableDenominations = atm.denominations || [200, 100, 50, 20];

    let canMakeAmount = false;
    if (availableDenominations.includes(amount)) {
      canMakeAmount = true;
    }

    // Check if amount can be made from combinations
    // for (let i = 0; i < availableDenominations.length && !canMakeAmount; i++) {
    //   for (let j = i; j < availableDenominations.length; j++) {
    //     if (
    //       availableDenominations[i] * 2 === amount ||
    //       availableDenominations[i] + availableDenominations[j] === amount
    //     ) {
    //       canMakeAmount = true;
    //       break;
    //     }
    //   }
    // }
    if (withdrawalAmount > 0 && withdrawalAmount <= 8000) {
      canMakeAmount = true;
    }

    if (canMakeAmount && atm.isActive) {
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
          {/* Map Card */}
          <div
            style={{
              backgroundColor: darkMode ? "#1f2937" : "#f3f4f6",
              borderRadius: "16px",
              padding: "24px",
              border: darkMode ? "1px solid #374151" : "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: darkMode ? "#111827" : "#e5e7eb",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: `2px dashed ${darkMode ? "#4b5563" : "#d1d5db"}`,
              }}
            >
              <div className="text-center mb-4">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#3b82f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <span style={{ fontSize: "40px" }}>📍</span>
                </div>
              </div>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {language === "ar"
                  ? "القاهرة، وسط البلد، مصر"
                  : "Cairo Downtown, Egypt"}
              </p>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex gap-3 mt-6">
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid #e5e7eb",
                  color: darkMode ? "#ffffff" : "#374151",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: 1,
                  justifyContent: "center",
                }}
                className="hover:bg-gray-100 transition"
              >
                <span>🧭</span>
                {language === "ar" ? "الاتجاهات" : "Directions"}
              </button>
              <button
                style={{
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flex: 1,
                  justifyContent: "center",
                  border: "none",
                }}
                className="hover:bg-blue-600 transition"
              >
                <span>📞</span>
                {language === "ar" ? "اتصال" : "Call"}
              </button>
            </div> */}
          </div>

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
                <span
                  style={{ color: "#9ca3af" }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl"
                ></span>
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
                    paddingLeft: "48px",
                    paddingRight: "48px",
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    fontSize: "16px",
                  }}
                  className="focus:outline-none focus:border-blue-500 transition"
                />
                <span
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    cursor: "pointer",
                  }}
                ></span>
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

            {/* <button
              onClick={handleProceed}
              disabled={validationStatus !== "success"}
              style={{
                backgroundColor:
                  validationStatus === "success" ? "#8b5cf6" : "#d1d5db",
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
            </button> */}
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
                {atm.denominations.map((denom) => (
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
