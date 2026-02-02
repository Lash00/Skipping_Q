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
                      {/* <span className="text-2xl">{service.icon}</span> */}
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
                      {/* <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span className="font-medium">
                          {service.estimatedTime}
                        </span>
                      </div> */}
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
