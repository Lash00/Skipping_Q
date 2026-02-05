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
      windwo: "3 & 5",
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
      windwo: "3 & 5",
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

      window: "4 & 2",
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
      windwo: "3 & 5",
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
      windwo: "3 & 5",
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

      window: "4 & 2",
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
      windwo: "3 & 5",
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

      window: "4 & 2",
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
      windwo: "3 & 5",
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
      windwo: "3 & 5",
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
                        {branch.window}
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
