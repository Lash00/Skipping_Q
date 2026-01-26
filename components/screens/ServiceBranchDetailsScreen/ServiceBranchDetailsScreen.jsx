// // "use client";

// // import Card from "@/components/reuse_components/Card";

// // const serviceDetails = {
// //   hospital: {
// //     icon: "🏥",
// //     details: [
// //       { label: "الأقساm", value: "الطوارئ، القلب، الأشعات، الجراحة" },
// //       { label: "الأطباء المتاحين", value: "12 طبيب" },
// //       { label: "وقت الانتظار", value: "45 دقيقة" },
// //       { label: "الحالات الطارئة", value: "✅ متاح 24/7" },
// //     ],
// //   },
// //   post_office: {
// //     icon: "📮",
// //     details: [
// //       {
// //         label: "الخدمات",
// //         value: "إرسال الطرود، التحويلات المالية، دفع الفواتير، البريد",
// //       },
// //       { label: "ساعات العمل", value: "8 صباحاً - 6 مساءً" },
// //       { label: "أيام العمل", value: "السبت - الخميس" },
// //       { label: "رسوم التحويل", value: "تختلف حسب المبلغ" },
// //     ],
// //   },
// //   telecom: {
// //     icon: "📱",
// //     details: [
// //       {
// //         label: "الخدمات",
// //         value: "بدل الشرائح، دفع الفواتير، ترقية الخطة، إصلاح الأجهزة",
// //       },
// //       { label: "دعم العملاء", value: "✅ دردشة مباشرة متاحة" },
// //       { label: "ساعات العمل", value: "9 صباحاً - 9 مساءً" },
// //       { label: "الأجهزة المدعومة", value: "جميع الأجهزة" },
// //     ],
// //   },
// //   traffic: {
// //     icon: "🚗",
// //     details: [
// //       {
// //         label: "الخدمات",
// //         value: "تجديد الرخص، تسجيل السيارات، دفع المخالفات، الفحص الدوري",
// //       },
// //       { label: "عدد الشبابيك", value: "4 شبابيك متاحة" },
// //       { label: "المستندات المطلوبة", value: "الهوية، الرخصة، الفحص الطبي" },
// //       { label: "رسوم التجديد", value: "200 جنيه" },
// //     ],
// //   },
// //   real_estate: {
// //     icon: "🏠",
// //     details: [
// //       {
// //         label: "الخدمات",
// //         value: "تسجيل العقارات، تحويل الملكية، التحقق من الملفات",
// //       },
// //       { label: "الرسوm", value: "2% من قيمة العقار" },
// //       { label: "وقت الإجراء", value: "3 - 5 أيام عمل" },
// //       { label: "المستندات المطلوبة", value: "عقد الشراء، الهوية، الحجة" },
// //     ],
// //   },
// //   health_insurance: {
// //     icon: "💳",
// //     details: [
// //       {
// //         label: "الخدمات",
// //         value: "تجديد البوليصات، عضويات جديدة، تسويات الدعاوى",
// //       },
// //       { label: "الخطط المتاحة", value: "5 خطط مختلفة" },
// //       { label: "التغطية", value: "الفحوصات الطبية والعمليات" },
// //       { label: "الخصومات", value: "حتى 30% للمجموعات" },
// //     ],
// //   },
// //   civil_status: {
// //     icon: "🧾",
// //     details: [
// //       {
// //         label: "الخدمات",
// //         value: "شهادات الميلاد، شهادات الزواج، تعديل البيانات",
// //       },
// //       { label: "وقت الانتظار", value: "30 دقيقة" },
// //       { label: "رسوم الشهادة", value: "10 جنيه" },
// //       { label: "صلاحية الشهادة", value: "دائمة" },
// //     ],
// //   },
// //   immigration: {
// //     icon: "🌍",
// //     details: [
// //       {
// //         label: "الخدمات",
// //         value: "تأشيرات الدخول، تجديد الإقامة، حجز المواعيد",
// //       },
// //       { label: "أنواع الإقامة", value: "سياحية، عمل، دراسة" },
// //       { label: "المدة المعالجة", value: "5 - 10 أيام عمل" },
// //       { label: "الرسوm", value: "تختلف حسب نوع التأشيرة" },
// //     ],
// //   },
// //   gas_station: {
// //     icon: "⛽",
// //     details: [
// //       { label: "أنواع الوقود", value: "بنزين 92، بنزين 95، ديزل" },
// //       { label: "التوفر", value: "متاح الآن" },
// //       { label: "الطابور", value: "سيارتان في الانتظار" },
// //       { label: "السعر الحالي", value: "10.25 جنيه / لتر" },
// //     ],
// //   },
// //   passport: {
// //     icon: "🛂",
// //     details: [
// //       { label: "الخدمات", value: "جوازات جديدة، تجديد، استخراج مكرر" },
// //       { label: "المواعيد المتاحة", value: "15 موعد اليوm" },
// //       { label: "المدة", value: "يوم عمل واحد" },
// //       { label: "الرسوm", value: "150 جنيه للجواز الجديد" },
// //     ],
// //   },
// // };

// // export default function ServiceBranchDetailsScreen({
// //   branch,
// //   serviceType,
// //   serviceName,
// //   language,
// //   darkMode,
// // }) {
// //   const details = serviceDetails[serviceType] || {};

// //   return (
// //     <div className="max-w-4xl mx-auto">
// //       <div className="mb-8">
// //         <h1 style={{ color: "#36e27b" }} className="text-4xl font-bold mb-2">
// //           {branch.name}
// //         </h1>
// //         <p style={{ color: "#a8bbb3" }} className="text-lg">
// //           {serviceName}
// //         </p>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <Card darkMode={darkMode}>
// //           <div className="flex items-start gap-6 mb-8">
// //             <div
// //               style={{
// //                 backgroundColor: "#e8f4f8",
// //                 color: "#36e27b",
// //                 width: "64px",
// //                 height: "64px",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 borderRadius: "8px",
// //                 fontSize: "36px",
// //               }}
// //             >
// //               {details.icon}
// //             </div>

// //             <div className="flex-1">
// //               <h2
// //                 style={{ color: "#36e27b" }}
// //                 className="text-2xl font-bold mb-1"
// //               >
// //                 {branch.name}
// //               </h2>
// //               <p style={{ color: "#a8bbb3" }} className="text-sm">
// //                 📍 {branch.latitude.toFixed(4)}, {branch.longitude.toFixed(4)}
// //               </p>
// //             </div>
// //           </div>

// //           <div
// //             style={{ backgroundColor: "#e8f4f8", borderRadius: "8px" }}
// //             className="p-4 space-y-3"
// //           >
// //             {details.details &&
// //               details.details.map((item, idx) => (
// //                 <div key={idx}>
// //                   <p
// //                     style={{ color: "#18472b" }}
// //                     className="text-sm font-semibold mb-1"
// //                   >
// //                     {item.label}
// //                   </p>
// //                   <p style={{ color: "#111714" }} className="text-sm">
// //                     {item.value}
// //                   </p>
// //                 </div>
// //               ))}
// //           </div>
// //         </Card>

// //         <Card darkMode={darkMode}>
// //           <h3 style={{ color: "#36e27b" }} className="text-2xl font-bold mb-6">
// //             معلومات الاتصال
// //           </h3>

// //           <div className="space-y-4">
// //             <div
// //               style={{
// //                 backgroundColor: "#e8f4f8",
// //                 borderRadius: "8px",
// //               }}
// //               className="p-4"
// //             >
// //               <p
// //                 style={{ color: "#18472b" }}
// //                 className="text-sm font-semibold mb-2"
// //               >
// //                 ☎️ الهاتف
// //               </p>
// //               <p style={{ color: "#111714" }} className="font-mono">
// //                 +20 2 25671234
// //               </p>
// //             </div>

// //             <div
// //               style={{
// //                 backgroundColor: "#e8f4f8",
// //                 borderRadius: "8px",
// //               }}
// //               className="p-4"
// //             >
// //               <p
// //                 style={{ color: "#18472b" }}
// //                 className="text-sm font-semibold mb-2"
// //               >
// //                 ⏰ ساعات العمل
// //               </p>
// //               <p style={{ color: "#111714" }}>
// //                 الأحد - الخميس: 8 صباحاً - 6 مساءً
// //               </p>
// //               <p style={{ color: "#111714" }}>الجمعة و السبت: مغلق</p>
// //             </div>

// //             <div
// //               style={{
// //                 backgroundColor: "#e8f4f8",
// //                 borderRadius: "8px",
// //               }}
// //               className="p-4"
// //             >
// //               <p
// //                 style={{ color: "#18472b" }}
// //                 className="text-sm font-semibold mb-2"
// //               >
// //                 📧 البريد الإلكتروني
// //               </p>
// //               <p style={{ color: "#111714" }}>info@service.eg</p>
// //             </div>

// //             <button
// //               style={{
// //                 backgroundColor: "#36e27b",
// //                 color: "#111714",
// //               }}
// //               className="w-full px-4 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition mt-6"
// //             >
// //               🗺️ فتح على الخريطة
// //             </button>

// //             <button
// //               style={{
// //                 backgroundColor: "#e8f4f8",
// //                 color: "#36e27b",
// //                 border: "2px solid #36e27b",
// //               }}
// //               className="w-full px-4 py-3 rounded-lg font-semibold text-lg hover:bg-green-50 transition"
// //             >
// //               ☎️ اتصل الآن
// //             </button>
// //           </div>
// //         </Card>
// //       </div>

// //       <Card darkMode={darkMode} className="mt-6">
// //         <h3 style={{ color: "#36e27b" }} className="text-2xl font-bold mb-4">
// //           📍 الموقع على الخريطة
// //         </h3>
// //         <div
// //           style={{
// //             width: "100%",
// //             height: "400px",
// //             backgroundColor: "#f5f5f5",
// //             borderRadius: "8px",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             border: "2px dashed #d4e0db",
// //           }}
// //         >
// //           <div className="text-center">
// //             <p style={{ color: "#36e27b" }} className="text-5xl mb-4">
// //               📍
// //             </p>
// //             <p
// //               style={{ color: "#a8bbb3" }}
// //               className="font-semibold text-lg mb-2"
// //             >
// //               {branch.name}
// //             </p>
// //             <p style={{ color: "#a8bbb3" }} className="font-mono text-sm">
// //               {branch.latitude.toFixed(6)}, {branch.longitude.toFixed(6)}
// //             </p>
// //           </div>
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";

// // خدمات السجل المدني في مصر فقط
// const civilStatusServices = [
//   {
//     id: 1,
//     name: "استخراج شهادة ميلاد",
//     nameEn: "Birth Certificate",
//     waiting: 4,
//     windowRange: "1-3",
//     estimatedTime: "~8m",
//     available: true,
//     icon: "👶",
//     color: "bg-green-50 border-green-200",
//   },
//   {
//     id: 2,
//     name: "استخراج شهادة وفاة",
//     nameEn: "Death Certificate",
//     waiting: 2,
//     windowRange: "5-6",
//     estimatedTime: "~4m",
//     available: true,
//     icon: "🕊️",
//     color: "bg-green-50 border-green-200",
//   },
//   {
//     id: 3,
//     name: "استخراج شهادة زواج",
//     nameEn: "Marriage Certificate",
//     waiting: 7,
//     windowRange: "4-6",
//     estimatedTime: "~15m",
//     available: false, // غير متاح
//     icon: "💍",
//     color: "bg-orange-50 border-orange-200",
//   },
//   {
//     id: 4,
//     name: "تعديل بيانات البطاقة",
//     nameEn: "ID Data Correction",
//     waiting: 5,
//     windowRange: "7",
//     estimatedTime: "~10m",
//     available: true,
//     icon: "📝",
//     color: "bg-green-50 border-green-200",
//   },
//   {
//     id: 5,
//     name: "استخراج بطاقة رقم قومي",
//     nameEn: "National ID",
//     waiting: 12,
//     windowRange: "8-10",
//     estimatedTime: "~25m",
//     available: true,
//     icon: "🪪",
//     color: "bg-green-50 border-green-200",
//   },
//   {
//     id: 6,
//     name: "تجديد بطاقة الرقم القومي",
//     nameEn: "ID Renewal",
//     waiting: 8,
//     windowRange: "8-10",
//     estimatedTime: "~18m",
//     available: true,
//     icon: "🔄",
//     color: "bg-green-50 border-green-200",
//   },
//   {
//     id: 7,
//     name: "استخراج شهادة طلاق",
//     nameEn: "Divorce Certificate",
//     waiting: 3,
//     windowRange: "11",
//     estimatedTime: "~6m",
//     available: false, // غير متاح
//     icon: "📄",
//     color: "bg-orange-50 border-orange-200",
//   },
//   {
//     id: 8,
//     name: "إضافة مولود للبطاقة العائلية",
//     nameEn: "Add Child to Family ID",
//     waiting: 6,
//     windowRange: "12-13",
//     estimatedTime: "~12m",
//     available: true,
//     icon: "👨‍👩‍👧‍👦",
//     color: "bg-green-50 border-green-200",
//   },
//   {
//     id: 9,
//     name: "استخراج قسيمة زواج",
//     nameEn: "Marriage License",
//     waiting: 9,
//     windowRange: "14",
//     estimatedTime: "~20m",
//     available: true,
//     icon: "💐",
//     color: "bg-green-50 border-green-200",
//   },
//   {
//     id: 10,
//     name: "تصحيح اسم في الشهادة",
//     nameEn: "Name Correction",
//     waiting: 4,
//     windowRange: "15",
//     estimatedTime: "~9m",
//     available: false, // غير متاح
//     icon: "✏️",
//     color: "bg-orange-50 border-orange-200",
//   },
// ];

// export default function ServiceBranchDetailsScreen({
//   branch,
//   serviceType,
//   serviceName,
//   language = "ar",
//   darkMode,
// }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedService, setSelectedService] = useState(null);

//   // فلترة الخدمات حسب البحث
//   const filteredServices = civilStatusServices.filter(
//     (service) =>
//       service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       service.nameEn.toLowerCase().includes(searchQuery.toLowerCase()),
//   );

//   return (
//     <div className="min-h-screen  from-gray-50 to-gray-100 p-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header with Back Button */}
//         <div className="mb-6">
//           <button className="text-gray-600 hover:text-gray-900 mb-4 flex items-center text-lg">
//             {/* <span className="mr-2 text-2xl">‹</span> */}
//             <span
//               className="font-medium"
//               style={{ color: darkMode ? "white" : "lightgreen" }}
//             >
//               {branch.name} /{" "}
//               {language === "ar" ? "السجل المدني" : "Civil Status Office"}
//             </span>
//           </button>
//         </div>

//         {/* Map Section */}
//         <MapComponent
//           branchLat={branch.latitude}
//           branchLng={branch.longitude}
//           branchName={branch.name}
//           branchArea={branch.area}
//         />
//         {/* <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
//           <div className="relative w-full h-80 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mb-4">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
//                 <span className="text-white text-2xl">📍</span>
//               </div>
//               <p className="text-sm text-gray-600 font-medium">
//                 {branch.area || "Cairo Downtown, Egypt"}
//               </p>
//             </div>
//           </div>
//         </div> */}

//         {/* Search Services */}
//         <div className="mb-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder={
//                 language === "ar" ? "ابحث عن الخدمات..." : "Search services..."
//               }
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 shadow-sm"
//             />
//             <span className="absolute left-4 top-3.5 text-gray-400 text-xl">
//               🔍
//             </span>
//           </div>
//         </div>

//         {/* Services List */}
//         <div className="space-y-4">
//           {filteredServices.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
//               <p className="text-gray-500">
//                 {language === "ar"
//                   ? "لا توجد خدمات متاحة"
//                   : "No services found"}
//               </p>
//             </div>
//           ) : (
//             filteredServices.map((service) => (
//               <div
//                 key={service.id}
//                 className={`${service.color} rounded-2xl shadow-sm border-2 p-3 transition-all duration-200 hover:shadow-md ${
//                   service.available ? "" : "opacity-75"
//                 }`}
//               >
//                 <div className="flex items-start justify-between mb-1">
//                   <div className="flex-1">
//                     <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
//                       <span className="text-2xl">{service.icon}</span>
//                       {service.name}
//                     </h3>

//                     <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
//                       <div className="flex items-center gap-1 text-danger fw-bold fs-3">
//                         <span>👥</span>
//                         <span className="text-start ms-1 ">
//                           {service.available ? service.waiting : 0}
//                         </span>
//                         <span>
//                           {language === "ar" ? "في الانتظار" : "waiting"}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <span>⏱️</span>
//                         <span className="font-medium">
//                           {service.estimatedTime}
//                         </span>
//                       </div>
//                     </div>
//                     {/*
//                     <div className="text-xs text-gray-500 text-start font-larg">
//                       {language === "ar" ? "الشباك" : "Window"}{" "}
//                       {service.windowRange}
//                     </div> */}
//                   </div>

//                   {service.available ? (
//                     <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
//                       <span className="text-white text-lg">✓</span>
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full">
//                       <span className="text-white text-lg">⚠</span>
//                     </div>
//                   )}
//                 </div>
//                 {/*
//                 <button
//                   onClick={() => setSelectedService(service)}
//                   disabled={!service.available}
//                   className={`w-full ${
//                     service.available
//                       ? "bg-blue-500 hover:bg-blue-600"
//                       : "bg-gray-400 cursor-not-allowed"
//                   } text-white font-semibold py-3 rounded-xl transition-colors shadow-sm`}
//                 >
//                   {service.available
//                     ? language === "ar"
//                       ? "اختيار الخدمة"
//                       : "Select Service"
//                     : language === "ar"
//                       ? "غير متاح حالياً"
//                       : "Currently Unavailable"}
//                 </button> */}
//               </div>
//             ))
//           )}
//         </div>

//         {/* No Results Message */}
//         {filteredServices.length === 0 && searchQuery && (
//           <div className="text-center py-8">
//             <button
//               onClick={() => setSearchQuery("")}
//               className="text-blue-500 hover:text-blue-600 font-medium"
//             >
//               {language === "ar" ? "مسح البحث" : "Clear Search"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Import Map Component dynamically (important for Next.js + Leaflet)
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
      <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-2">⏳</div>
          <p className="text-gray-500">جاري تحميل الخريطة...</p>
        </div>
      </div>
    </div>
  ),
});

// خدمات السجل المدني في مصر فقط
const civilStatusServices = [
  {
    id: 1,
    name: "استخراج شهادة ميلاد",
    nameEn: "Birth Certificate",
    waiting: 4,
    windowRange: "1-3",
    estimatedTime: "~8م",
    available: true,
    icon: "👶",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 2,
    name: "استخراج شهادة وفاة",
    nameEn: "Death Certificate",
    waiting: 2,
    windowRange: "5-6",
    estimatedTime: "~4م",
    available: true,
    icon: "🕊️",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 3,
    name: "استخراج شهادة زواج",
    nameEn: "Marriage Certificate",
    waiting: 7,
    windowRange: "4-6",
    estimatedTime: "~15م",
    available: false,
    icon: "💍",
    color: "bg-orange-50 border-orange-200",
  },
  {
    id: 4,
    name: "تعديل بيانات البطاقة",
    nameEn: "ID Data Correction",
    waiting: 5,
    windowRange: "7",
    estimatedTime: "~10م",
    available: true,
    icon: "📝",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 5,
    name: "استخراج بطاقة رقم قومي",
    nameEn: "National ID",
    waiting: 12,
    windowRange: "8-10",
    estimatedTime: "~25م",
    available: true,
    icon: "🪪",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 6,
    name: "تجديد بطاقة الرقم القومي",
    nameEn: "ID Renewal",
    waiting: 8,
    windowRange: "8-10",
    estimatedTime: "~18م",
    available: true,
    icon: "🔄",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 7,
    name: "استخراج شهادة طلاق",
    nameEn: "Divorce Certificate",
    waiting: 3,
    windowRange: "11",
    estimatedTime: "~6م",
    available: false,
    icon: "📄",
    color: "bg-orange-50 border-orange-200",
  },
  {
    id: 8,
    name: "إضافة مولود للبطاقة العائلية",
    nameEn: "Add Child to Family ID",
    waiting: 6,
    windowRange: "12-13",
    estimatedTime: "~12م",
    available: true,
    icon: "👨‍👩‍👧‍👦",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 9,
    name: "استخراج قسيمة زواج",
    nameEn: "Marriage License",
    waiting: 9,
    windowRange: "14",
    estimatedTime: "~20م",
    available: true,
    icon: "💐",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 10,
    name: "تصحيح اسم في الشهادة",
    nameEn: "Name Correction",
    waiting: 4,
    windowRange: "15",
    estimatedTime: "~9م",
    available: false,
    icon: "✏️",
    color: "bg-orange-50 border-orange-200",
  },
];

export default function ServiceBranchDetailsScreen({
  branch,
  serviceType,
  serviceName,
  language = "ar",
  darkMode,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  // فلترة الخدمات حسب البحث
  const filteredServices = civilStatusServices.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.nameEn.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button className="text-gray-600 hover:text-gray-900 mb-4 flex items-center text-lg">
            <span
              className="font-medium"
              style={{ color: darkMode ? "white" : "lightgreen" }}
            >
              {branch.name} /{" "}
              {language === "ar" ? "السجل المدني" : "Civil Status Office"}
            </span>
          </button>
        </div>

        {/* Map Component */}
        <MapComponent
          branchLat={branch.latitude}
          branchLng={branch.longitude}
          branchName={branch.name}
          branchArea={branch.area}
        />

        {/* Search Services */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder={
                language === "ar" ? "ابحث عن الخدمات..." : "Search services..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 shadow-sm"
            />
            <span className="absolute left-4 top-3.5 text-gray-400 text-xl">
              🔍
            </span>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <p className="text-gray-500">
                {language === "ar"
                  ? "لا توجد خدمات متاحة"
                  : "No services found"}
              </p>
            </div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className={`${service.color} rounded-2xl shadow-sm border-2 p-3 transition-all duration-200 hover:shadow-md ${
                  service.available ? "" : "opacity-75"
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <span className="text-2xl">{service.icon}</span>
                      {service.name}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                      <div className="flex items-center gap-1">
                        <span>👥</span>
                        <span className="font-medium">
                          {service.available ? service.waiting : 0}
                        </span>
                        <span>
                          {language === "ar" ? "في الانتظار" : "waiting"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span className="font-medium">
                          {service.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {service.available ? (
                    <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full">
                      <span className="text-white text-lg">⚠</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* No Results Message */}
        {filteredServices.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              {language === "ar" ? "مسح البحث" : "Clear Search"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
