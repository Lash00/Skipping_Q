// // 'use client';

// // import Card from '@/components/reuse_components/Card';
// // import DistanceCalculator from '@/components/reuse_components/DistanceCalculator';
// // import { useState } from 'react';

// // // Mock data for different services
// // const mockServiceBranches = {
// //   hospital: [
// //     {
// //       branch_id: 10001,
// //       name: 'مستشفى العباسية',
// //       latitude: 30.0650,
// //       longitude: 31.2400,
// //       departments: 'الطوارئ، القلب، الأشعات',
// //       doctors: 12,
// //       waitTime: '45 دقيقة',
// //       emergency: true,
// //     },
// //     {
// //       branch_id: 10002,
// //       name: 'مستشفى قصر العيني',
// //       latitude: 30.0400,
// //       longitude: 31.2300,
// //       departments: 'الجراحة، النساء، الأطفال',
// //       doctors: 18,
// //       waitTime: '60 دقيقة',
// //       emergency: true,
// //     },
// //   ],
// //   post_office: [
// //     {
// //       branch_id: 10003,
// //       name: 'مكتب البريد المركزي',
// //       latitude: 30.0500,
// //       longitude: 31.2350,
// //       services: '📦 الطرود، 💸 التحويلات، 🧾 الفواتير',
// //       workingHours: '8 صباحاً - 6 مساءً',
// //       queue: 8,
// //     },
// //     {
// //       branch_id: 10004,
// //       name: 'مكتب البريد الفرعي',
// //       latitude: 30.0600,
// //       longitude: 31.2500,
// //       services: '✉️ البريد، 📦 الطرود',
// //       workingHours: '9 صباحاً - 4 مساءً',
// //       queue: 3,
// //     },
// //   ],
// //   telecom: [
// //     {
// //       branch_id: 10005,
// //       name: 'مركز الاتصالات الرئيسي',
// //       latitude: 30.0520,
// //       longitude: 31.2380,
// //       services: '📱 الشرائح، 📞 الفواتير، 🔧 الإصلاح',
// //       hasChat: true,
// //       queue: 5,
// //     },
// //   ],
// //   traffic: [
// //     {
// //       branch_id: 10006,
// //       name: 'إدارة المرور - فرع الجيزة',
// //       latitude: 30.0100,
// //       longitude: 31.2000,
// //       services: '🚗 تراخيص، 🏎️ فحص، 📋 مخالفات',
// //       counters: 4,
// //       queue: 12,
// //     },
// //   ],
// //   real_estate: [
// //     {
// //       branch_id: 10007,
// //       name: 'مكتب التسجيل العقاري',
// //       latitude: 30.0300,
// //       longitude: 31.2200,
// //       services: 'تسجيل العقارات، تحويل الملكية',
// //       status: 'مشغول نسبياً',
// //       queue: 6,
// //     },
// //   ],
// //   health_insurance: [
// //     {
// //       branch_id: 10008,
// //       name: 'مكتب التأمين الصحي',
// //       latitude: 30.0550,
// //       longitude: 31.2400,
// //       services: 'تجديد البوليصات، طلبات جديدة',
// //       plans: 5,
// //       queue: 4,
// //     },
// //   ],
// //   civil_status: [
// //     {
// //       branch_id: 10009,
// //       name: 'مكتب الأحوال المدنية',
// //       latitude: 30.0450,
// //       longitude: 31.2320,
// //       services: 'شهادات الميلاد، الزواج، التعديلات',
// //       waitTime: '30 دقيقة',
// //       queue: 7,
// //     },
// //   ],
// //   immigration: [
// //     {
// //       branch_id: 10010,
// //       name: 'مكتب الهجرة والجوازات',
// //       latitude: 30.0600,
// //       longitude: 31.2450,
// //       services: 'تأشيرات، إقامة، مواعيد',
// //       queueStatus: '5 أشخاص',
// //     },
// //   ],
// //   gas_station: [
// //     {
// //       branch_id: 10011,
// //       name: 'محطة البنزين - النيل',
// //       latitude: 30.0280,
// //       longitude: 31.2280,
// //       fuelTypes: '⛽ 92، 95، ديزل',
// //       availability: 'متاح',
// //       queue: 2,
// //     },
// //   ],
// //   passport: [
// //     {
// //       branch_id: 10012,
// //       name: 'مكتب الجوازات الرئيسي',
// //       latitude: 30.0480,
// //       longitude: 31.2410,
// //       services: 'جوازات جديدة، تجديد، مواعيد',
// //       appointments: '15 موعد متاح',
// //     },
// //   ],
// // };

// // export default function BranchDetailsList({ serviceType, serviceName, onSelectBranch, userLocation, language, darkMode }) {
// //   const [sortBy, setSortBy] = useState('distance');
// //   const [distanceFilter, setDistanceFilter] = useState(50);

// //   const branches = mockServiceBranches[serviceType] || [];

// //   const calculateDistance = (lat1, lon1, lat2, lon2) => {
// //     const R = 6371;
// //     const dLat = ((lat2 - lat1) * Math.PI) / 180;
// //     const dLon = ((lon2 - lon1) * Math.PI) / 180;
// //     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// //     return R * c;
// //   };

// //   const filteredBranches = branches.filter((branch) => {
// //     const distance = calculateDistance(userLocation.latitude, userLocation.longitude, branch.latitude, branch.longitude);
// //     return distance <= distanceFilter;
// //   });

// //   const sortedBranches = [...filteredBranches].sort((a, b) => {
// //     if (sortBy === 'distance') {
// //       const distA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
// //       const distB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
// //       return distA - distB;
// //     }
// //     return 0;
// //   });

// //   return (
// //     <div className="max-w-6xl mx-auto">
// //       <div className="mb-8">
// //         <h1 style={{ color: '#36e27b' }} className="text-4xl font-bold mb-2">
// //           {language === 'ar' ? `فروع ${serviceName}` : `${serviceName} Branches`}
// //         </h1>
// //         <p style={{ color: '#a8bbb3' }} className="text-lg">
// //           {language === 'ar' ? 'اختر الفرع الأقرب إليك' : 'Choose the nearest branch to you'}
// //         </p>
// //       </div>

// //       <div className="mb-8 bg-gray-50 p-6 rounded-lg">
// //         <label style={{ color: '#36e27b' }} className="block text-lg font-semibold mb-2">
// //           {language === 'ar' ? 'أقصى مسافة (كم)' : 'Maximum Distance (km)'}
// //         </label>
// //         <div className="flex items-center gap-4">
// //           <input
// //             type="range"
// //             min="1"
// //             max="100"
// //             value={distanceFilter}
// //             onChange={(e) => setDistanceFilter(Number(e.target.value))}
// //             className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
// //             style={{
// //               backgroundColor: '#e8f4f8',
// //               accentColor: '#36e27b',
// //             }}
// //           />
// //           <span style={{ color: '#111714' }} className="font-bold text-lg min-w-12">
// //             {distanceFilter} km
// //           </span>
// //         </div>
// //       </div>

// //       <div className="mb-6 flex gap-4">
// //         <button
// //           onClick={() => setSortBy('distance')}
// //           style={{
// //             backgroundColor: sortBy === 'distance' ? '#36e27b' : '#e8f4f8',
// //             color: sortBy === 'distance' ? '#111714' : '#36e27b',
// //           }}
// //           className="px-6 py-2 rounded-lg font-semibold transition"
// //         >
// //           {language === 'ar' ? 'ترتيب حسب المسافة' : 'Sort by Distance'}
// //         </button>
// //       </div>

// //       {sortedBranches.length === 0 ? (
// //         <div className="text-center py-12">
// //           <p style={{ color: '#a8bbb3' }} className="text-lg">
// //             {language === 'ar' ? 'لا توجد فروع في هذه المسافة' : 'No branches in this distance range'}
// //           </p>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {sortedBranches.map((branch) => (
// //             <button
// //               key={branch.branch_id}
// //               onClick={() => onSelectBranch(branch)}
// //               className="text-left transition hover:scale-105 hover:shadow-xl"
// //             >
// //               <Card darkMode={darkMode}>
// //                 <div className="mb-4">
// //                   <h3 style={{ color: '#36e27b' }} className="text-xl font-bold mb-2">
// //                     {branch.name}
// //                   </h3>

// //                   <div style={{ color: '#a8bbb3' }} className="text-sm font-semibold">
// //                     📍 {calculateDistance(userLocation.latitude, userLocation.longitude, branch.latitude, branch.longitude).toFixed(2)} km
// //                   </div>
// //                 </div>

// //                 <div className="space-y-3 mb-6">
// //                   {branch.departments && (
// //                     <div>
// //                       <p style={{ color: '#a8bbb3' }} className="text-sm">
// //                         {language === 'ar' ? 'الأقسام:' : 'Departments:'} {branch.departments}
// //                       </p>
// //                     </div>
// //                   )}
// //                   {branch.doctors && (
// //                     <div>
// //                       <p style={{ color: '#a8bbb3' }} className="text-sm">
// //                         {language === 'ar' ? 'الأطباء:' : 'Doctors:'} {branch.doctors}
// //                       </p>
// //                     </div>
// //                   )}
// //                   {branch.waitTime && (
// //                     <div className="flex items-center gap-2">
// //                       <span style={{ color: '#d1a220' }}>⏳</span>
// //                       <p style={{ color: '#111714' }} className="text-sm font-semibold">
// //                         {language === 'ar' ? 'وقت الانتظار:' : 'Wait time:'} {branch.waitTime}
// //                       </p>
// //                     </div>
// //                   )}
// //                   {branch.queue !== undefined && (
// //                     <div className="flex items-center gap-2">
// //                       <span>👥</span>
// //                       <p style={{ color: '#111714' }} className="text-sm font-semibold">
// //                         {branch.queue} {language === 'ar' ? 'في الطابور' : 'in queue'}
// //                       </p>
// //                     </div>
// //                   )}
// //                   {branch.services && (
// //                     <div>
// //                       <p style={{ color: '#a8bbb3' }} className="text-sm">
// //                         {language === 'ar' ? 'الخدمات:' : 'Services:'} {branch.services}
// //                       </p>
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="inline-block px-4 py-2 rounded-lg font-semibold text-sm w-full text-center">
// //                   {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
// //                 </div>
// //               </Card>
// //             </button>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import Card from "@/components/reuse_components/Card";
// import { useState } from "react";

// // Mock data - فروع السجل المدني في مصر
// const mockServiceBranches = {
//   civil_status: [
//     {
//       branch_id: 10001,
//       name: "مكتب السجل المدني - القاهرة الجديدة",
//       latitude: 30.0444,
//       longitude: 31.2357,
//       area: "القاهرة الجديدة",
//       services: "شهادات الميلاد، الزواج، الوفاة، التعديلات",
//       workingHours: "8 صباحاً - 3 مساءً",
//       queue: 7,
//       rating: 4.2,
//       wheelchairAccess: true,
//     },
//     {
//       branch_id: 10002,
//       name: "مكتب السجل المدني - مدينة نصر",
//       latitude: 30.0626,
//       longitude: 31.3549,
//       area: "مدينة نصر",
//       services: "شهادات الميلاد، الزواج، الوفاة",
//       workingHours: "8 صباحاً - 3 مساءً",
//       queue: 12,
//       rating: 3.8,
//       wheelchairAccess: true,
//     },
//     {
//       branch_id: 10003,
//       name: "مكتب السجل المدني - المعادي",
//       latitude: 29.9602,
//       longitude: 31.2569,
//       area: "المعادي",
//       services: "شهادات الميلاد، الزواج، التعديلات",
//       workingHours: "8 صباحاً - 3 مساءً",
//       queue: 5,
//       rating: 4.5,
//       wheelchairAccess: false,
//     },
//     {
//       branch_id: 10004,
//       name: "مكتب السجل المدني - الجيزة",
//       latitude: 30.0131,
//       longitude: 31.2089,
//       area: "الجيزة",
//       services: "شهادات الميلاد، الزواج، الوفاة، التعديلات",
//       workingHours: "8 صباحاً - 3 مساءً",
//       queue: 15,
//       rating: 3.5,
//       wheelchairAccess: true,
//     },
//     {
//       branch_id: 10005,
//       name: "مكتب السجل المدني - المهندسين",
//       latitude: 30.0618,
//       longitude: 31.2,
//       area: "المهندسين",
//       services: "شهادات الميلاد، الزواج، التعديلات",
//       workingHours: "8 صباحاً - 3 مساءً",
//       queue: 8,
//       rating: 4.0,
//       wheelchairAccess: true,
//     },
//     {
//       branch_id: 10006,
//       name: "مكتب السجل المدني - الإسكندرية",
//       latitude: 31.2001,
//       longitude: 29.9187,
//       area: "الإسكندرية",
//       services: "شهادات الميلاد، الزواج، الوفاة، التعديلات",
//       workingHours: "8 صباحاً - 3 مساءً",
//       queue: 10,
//       rating: 4.1,
//       wheelchairAccess: false,
//     },
//     {
//       branch_id: 10007,
//       name: "مكتب السجل المدني - الزمالك",
//       latitude: 30.0594,
//       longitude: 31.2218,
//       area: "الزمالك",
//       services: "شهادات الميلاد، الزواج، التعديلات",
//       workingHours: "8 صباحاً - 3 مساءً",
//       queue: 6,
//       rating: 4.3,
//       wheelchairAccess: true,
//     },
//     {
//       branch_id: 10008,
//       name: "مكتب السجل المدني - حلوان",
//       latitude: 29.842,
//       longitude: 31.3343,
//       area: "حلوان",
//       services: "شهادات الميلاد، الزواج، الوفاة",
//       workingHours: "8 صباحاً - 3 مساءً",
//       queue: 9,
//       rating: 3.7,
//       wheelchairAccess: false,
//     },
//     {
//       branch_id: 10009,
//       name: "مكتب السجل المدني - الشروق",
//       latitude: 30.1218,
//       longitude: 31.6096,
//       area: "الشروق",
//       services: "شهادات الميلاد، الزواج، التعديلات",
//       workingHours: "8 صباحاً - 3 مساءً",
//       queue: 4,
//       rating: 4.4,
//       wheelchairAccess: true,
//     },
//     {
//       branch_id: 10010,
//       name: "مكتب السجل المدني - 6 أكتوبر",
//       latitude: 29.9668,
//       longitude: 30.9276,
//       area: "6 أكتوبر",
//       services: "شهادات الميلاد، الزواج، الوفاة، التعديلات",
//       workingHours: "8 صباحاً - 3 مساءً",
//       queue: 11,
//       rating: 3.9,
//       wheelchairAccess: true,
//     },
//   ],
// };

// export default function BranchDetailsList({
//   serviceType,
//   serviceName,
//   onSelectBranch,
//   userLocation,
//   language,
//   darkMode,
// }) {
//   const [sortBy, setSortBy] = useState("nearest");
//   const [maxDistance, setMaxDistance] = useState(10000); // بالمتر
//   const [wheelchairAccess, setWheelchairAccess] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const branches = mockServiceBranches[serviceType] || [];

//   // حساب المسافة بين نقطتين
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // نصف قطر الأرض بالكيلومتر
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c * 1000; // تحويل لمتر
//     return distance;
//   };

//   // فلترة وترتيب الفروع
//   const filteredAndSortedBranches = branches
//     .map((branch) => ({
//       ...branch,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         branch.latitude,
//         branch.longitude,
//       ),
//     }))
//     .filter((branch) => {
//       const withinDistance = branch.distance <= maxDistance;
//       const matchesWheelchair = !wheelchairAccess || branch.wheelchairAccess;
//       const matchesSearch =
//         searchQuery === "" ||
//         branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         branch.area.toLowerCase().includes(searchQuery.toLowerCase());
//       return withinDistance && matchesWheelchair && matchesSearch;
//     })
//     .sort((a, b) => {
//       if (sortBy === "nearest") {
//         return a.distance - b.distance;
//       }
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <button className="text-gray-600 hover:text-gray-900 mb-4 flex items-center">
//             <span className="mr-2">←</span>
//             {language === "ar" ? "رجوع" : "Back"}
//           </button>
//           <h1 className="text-3xl font-bold text-gray-900">
//             {language === "ar" ? "السجل المدني" : "Civil Status Office"}
//           </h1>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder={
//                 language === "ar"
//                   ? "ابحث عن فرع أو منطقة..."
//                   : "Search for branch or area..."
//               }
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
//             />
//             <span className="absolute left-4 top-3.5 text-gray-400 text-xl">
//               🔍
//             </span>
//           </div>
//         </div>

//         {/* Filters Card */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="grid grid-cols-1  gap-6">
//             {/* Distance Slider */}
//             <div>
//               <label className="flex items-center text-sm text-gray-600 mb-3">
//                 <span className="mr-2">📍</span>
//                 {language === "ar"
//                   ? `المسافة: ${maxDistance}م`
//                   : `Distance: ${maxDistance}m`}
//               </label>
//               <input
//                 type="range"
//                 min="100"
//                 max="10000"
//                 step="100"
//                 value={maxDistance}
//                 onChange={(e) => setMaxDistance(Number(e.target.value))}
//                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
//               />
//               <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>100م</span>
//                 <span>10000م</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Branches Grid */}
//         {filteredAndSortedBranches.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">
//               {language === "ar"
//                 ? "لا توجد فروع متاحة بناءً على الفلاتر المحددة"
//                 : "No branches found matching your filters"}
//             </p>
//             <button
//               onClick={() => {
//                 setMaxDistance(10000);
//                 setWheelchairAccess(false);
//                 setSearchQuery("");
//               }}
//               className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
//             >
//               {language === "ar" ? "إعادة تعيين الفلاتر" : "Reset filters"}
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredAndSortedBranches.map((branch) => (
//               <div
//                 key={branch.branch_id}
//                 className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
//               >
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {branch.name}
//                 </h3>

//                 <div className="flex items-center text-sm text-gray-600 mb-4">
//                   <span className="mr-1">📍</span>
//                   <span>{branch.area}</span>
//                 </div>

//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-sm text-gray-600">
//                     {language === "ar" ? "المسافة:" : "Distance:"}
//                   </span>
//                   <span className="text-sm font-semibold text-gray-900">
//                     {branch.distance >= 1000
//                       ? `${(branch.distance / 1000).toFixed(1)} كم`
//                       : `${Math.round(branch.distance)} م`}
//                   </span>
//                 </div>

//                 {branch.queue !== undefined && (
//                   <div className="flex items-center justify-between mb-4 text-sm">
//                     <span className="text-gray-600">
//                       {language === "ar" ? "في الطابور:" : "In Queue:"}
//                     </span>
//                     <span className="font-semibold text-gray-900">
//                       {branch.queue}
//                     </span>
//                   </div>
//                 )}

//                 <button
//                   onClick={() => onSelectBranch(branch)}
//                   className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
//                 >
//                   {language === "ar" ? "عرض التفاصيل" : "View Details"}
//                 </button>

//                 {branch.rating && (
//                   <div className="flex items-center justify-end mt-3 text-sm">
//                     <span className="text-yellow-500 mr-1">⭐</span>
//                     <span className="font-semibold text-gray-700">
//                       {branch.rating}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

// Mock data - فروع السجل المدني في مصر
const mockServiceBranches = {
  civil_status: [
    {
      branch_id: 10001,
      name: "مكتب السجل المدني - القاهرة الجديدة",
      latitude: 30.0444,
      longitude: 31.2357,
      area: "القاهرة الجديدة",
      services: "شهادات الميلاد، الزواج، الوفاة، التعديلات",
      workingHours: "8 صباحاً - 3 مساءً",
      queue: 7,
      rating: 4.2,
      wheelchairAccess: true,
    },
    {
      branch_id: 10002,
      name: "مكتب السجل المدني - مدينة نصر",
      latitude: 30.0626,
      longitude: 31.3549,
      area: "مدينة نصر",
      services: "شهادات الميلاد، الزواج، الوفاة",
      workingHours: "8 صباحاً - 3 مساءً",
      queue: 12,
      rating: 3.8,
      wheelchairAccess: true,
    },
    {
      branch_id: 10003,
      name: "مكتب السجل المدني - المعادي",
      latitude: 29.9602,
      longitude: 31.2569,
      area: "المعادي",
      services: "شهادات الميلاد، الزواج، التعديلات",
      workingHours: "8 صباحاً - 3 مساءً",
      queue: 5,
      rating: 4.5,
      wheelchairAccess: false,
    },
    {
      branch_id: 10004,
      name: "مكتب السجل المدني - الجيزة",
      latitude: 30.0131,
      longitude: 31.2089,
      area: "الجيزة",
      services: "شهادات الميلاد، الزواج، الوفاة، التعديلات",
      workingHours: "8 صباحاً - 3 مساءً",
      queue: 15,
      rating: 3.5,
      wheelchairAccess: true,
    },
    {
      branch_id: 10005,
      name: "مكتب السجل المدني - المهندسين",
      latitude: 30.0618,
      longitude: 31.2,
      area: "المهندسين",
      services: "شهادات الميلاد، الزواج، التعديلات",
      workingHours: "8 صباحاً - 3 مساءً",
      queue: 8,
      rating: 4.0,
      wheelchairAccess: true,
    },
    {
      branch_id: 10006,
      name: "مكتب السجل المدني - الإسكندرية",
      latitude: 31.2001,
      longitude: 29.9187,
      area: "الإسكندرية",
      services: "شهادات الميلاد، الزواج، الوفاة، التعديلات",
      workingHours: "8 صباحاً - 3 مساءً",
      queue: 10,
      rating: 4.1,
      wheelchairAccess: false,
    },
    {
      branch_id: 10007,
      name: "مكتب السجل المدني - الزمالك",
      latitude: 30.0594,
      longitude: 31.2218,
      area: "الزمالك",
      services: "شهادات الميلاد، الزواج، التعديلات",
      workingHours: "8 صباحاً - 3 مساءً",
      queue: 6,
      rating: 4.3,
      wheelchairAccess: true,
    },
    {
      branch_id: 10008,
      name: "مكتب السجل المدني - حلوان",
      latitude: 29.842,
      longitude: 31.3343,
      area: "حلوان",
      services: "شهادات الميلاد، الزواج، الوفاة",
      workingHours: "8 صباحاً - 3 مساءً",
      queue: 9,
      rating: 3.7,
      wheelchairAccess: false,
    },
    {
      branch_id: 10009,
      name: "مكتب السجل المدني - الشروق",
      latitude: 30.1218,
      longitude: 31.6096,
      area: "الشروق",
      services: "شهادات الميلاد، الزواج، التعديلات",
      workingHours: "8 صباحاً - 3 مساءً",
      queue: 4,
      rating: 4.4,
      wheelchairAccess: true,
    },
    {
      branch_id: 10010,
      name: "مكتب السجل المدني - 6 أكتوبر",
      latitude: 29.9668,
      longitude: 30.9276,
      area: "6 أكتوبر",
      services: "شهادات الميلاد، الزواج، الوفاة، التعديلات",
      workingHours: "8 صباحاً - 3 مساءً",
      queue: 11,
      rating: 3.9,
      wheelchairAccess: true,
    },
  ],
};

export default function BranchDetailsList({
  serviceType,
  serviceName,
  onSelectBranch,
  userLocation,
  language = "ar",
  darkMode,
}) {
  const [sortBy, setSortBy] = useState("nearest");
  const [maxDistance, setMaxDistance] = useState(2000); // بالمتر
  const [wheelchairAccess, setWheelchairAccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const branches = mockServiceBranches[serviceType] || [];

  // حساب المسافة بين نقطتين
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // تحويل لمتر
    return distance;
  };

  // فلترة وترتيب الفروع
  const filteredAndSortedBranches = branches
    .map((branch) => ({
      ...branch,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        branch.latitude,
        branch.longitude,
      ),
    }))
    .filter((branch) => {
      const withinDistance = branch.distance <= maxDistance;
      const matchesWheelchair = !wheelchairAccess || branch.wheelchairAccess;
      const matchesSearch =
        searchQuery === "" ||
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.area.toLowerCase().includes(searchQuery.toLowerCase());
      return withinDistance && matchesWheelchair && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "nearest") {
        return a.distance - b.distance;
      }
      return 0;
    });

  return (
    <div className="min-h-screen  from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button className="text-gray-600 hover:text-gray-900 mb-4 flex items-center text-lg">
            <span className="mr-2">‹</span>
          </button>
          <h1
            className="text-3xl font-bold text-gray-800"
            style={{ color: darkMode ? "white" : "lightgreen" }}
          >
            {language === "ar" ? "السجل المدني" : "Civil Status Office"}
          </h1>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Distance Slider */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-600 mb-3">
                <span className="mr-2">📍</span>
                {language === "ar"
                  ? `المسافة: ${maxDistance}م`
                  : `Distance: ${maxDistance}m`}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                style={{
                  background: `linear-gradient(to left, #3b82f6 0%, #3b82f6 ${((maxDistance - 100) / 4900) * 100}%, #e5e7eb ${(maxDistance / 5000) * 100}%, #e5e7eb 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0m</span>
                <span>5000m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Branches Grid */}
        {filteredAndSortedBranches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === "ar"
                ? "لا توجد فروع متاحة بناءً على الفلاتر المحددة"
                : "No branches found matching your filters"}
            </p>
            <button
              onClick={() => {
                setMaxDistance(2000);
                setWheelchairAccess(false);
                setSearchQuery("");
              }}
              className="mt-4 text-blue-500 hover:text-blue-600 font-medium"
            >
              {language === "ar" ? "إعادة تعيين الفلاتر" : "Reset filters"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedBranches.map((branch) => (
              <div
                key={branch.branch_id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {branch.name}
                    </h3>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="mr-1">📍</span>
                      <span>{branch.area}</span>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      <span className="font-medium">
                        {language === "ar" ? "المسافة: " : "Distance: "}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {branch.distance >= 1000
                          ? `${(branch.distance / 1000).toFixed(1)}كم`
                          : `${Math.round(branch.distance)}م`}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectBranch(branch)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm"
                    >
                      {language === "ar" ? "عرض التفاصيل" : "View Details"}
                    </button>
                  </div>

                  {/* {branch.rating && (
                    <div className="flex items-center text-sm ml-4">
                      <span className="text-yellow-400 mr-1 text-base">⭐</span>
                      <span className="font-bold text-gray-800">
                        {branch.rating}
                      </span>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
