"use client";

import Card from "@/components/reuse_components/Card";
import StatusBadge from "@/components/reuse_components/StatusBadge";
import DistanceCalculator from "@/components/reuse_components/DistanceCalculator";
import { useState } from "react";

export default function ATMList({
  atms,
  branchName,
  onSelectATM,
  userLocation,
  language,
  getATMName,
  darkMode,
}) {
  const [sortBy, setSortBy] = useState("distance");
  const [distanceFilter, setDistanceFilter] = useState(5000); // 500 متر

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // تحويل إلى متر
  };

  const filteredATMs = atms.filter((atm) => {
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      atm.latitude,
      atm.longitude,
    );
    return distance <= distanceFilter;
  });

  const sortedATMs = [...filteredATMs].sort((a, b) => {
    if (sortBy === "distance") {
      const distA = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        a.latitude,
        a.longitude,
      );
      const distB = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        b.latitude,
        b.longitude,
      );
      return distA - distB;
    } else if (sortBy === "queue") {
      return a.queue - b.queue;
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: "#36e27b" }} className="text-4xl font-bold mb-2">
          {language === "ar" ? "ماكينات الصراف الآلي" : "ATM Machines"}
        </h1>
        <p style={{ color: "#a8bbb3" }} className="text-lg">
          {language === "ar" ? `فرع ${branchName}` : `Branch: ${branchName}`}
        </p>
        <p style={{ color: "#36e27b" }} className="text-sm mt-2 font-semibold">
          {language === "ar"
            ? `عدد الماكينات: ${sortedATMs.length} من ${atms.length}`
            : `ATMs: ${sortedATMs.length} of ${atms.length}`}
        </p>
      </div>

      {/* Distance Filter */}
      <div
        className="mb-6"
        style={{
          backgroundColor: darkMode ? "#1a1a1a" : "#f9fafb",
          padding: "24px",
          borderRadius: "12px",
          border: darkMode ? "1px solid #2a2a2a" : "1px solid #e5e7eb",
        }}
      >
        <label
          style={{ color: "#36e27b" }}
          className="block text-lg font-semibold mb-4"
        >
          {language === "ar" ? "أقصى مسافة (متر)" : "Maximum Distance (meters)"}
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="10000"
            step="1000"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(Number(e.target.value))}
            className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundColor: darkMode ? "#2a2a2a" : "#e5e7eb",
              accentColor: "#36e27b",
            }}
          />
          <span
            style={{
              color: "#36e27b",
              backgroundColor: darkMode ? "#2a2a2a" : "#e8f4f8",
              padding: "8px 16px",
              borderRadius: "8px",
              minWidth: "90px",
              textAlign: "center",
            }}
            className="font-bold text-lg"
          >
            {distanceFilter} {language === "ar" ? "م" : "m"}
          </span>
        </div>
      </div>

      {/* Sort Buttons */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <button
          onClick={() => setSortBy("distance")}
          style={{
            backgroundColor:
              sortBy === "distance"
                ? "#36e27b"
                : darkMode
                  ? "#2a2a2a"
                  : "#f3f4f6",
            color: sortBy === "distance" ? "#111714" : "#36e27b",
            border:
              sortBy === "distance"
                ? "none"
                : `2px solid ${darkMode ? "#3a3a3a" : "#e5e7eb"}`,
          }}
          className="px-6 py-3 rounded-lg font-semibold transition hover:scale-105"
        >
          📍 {language === "ar" ? "ترتيب حسب المسافة" : "Sort by Distance"}
        </button>
        <button
          onClick={() => setSortBy("queue")}
          style={{
            backgroundColor:
              sortBy === "queue" ? "#36e27b" : darkMode ? "#2a2a2a" : "#f3f4f6",
            color: sortBy === "queue" ? "#111714" : "#36e27b",
            border:
              sortBy === "queue"
                ? "none"
                : `2px solid ${darkMode ? "#3a3a3a" : "#e5e7eb"}`,
          }}
          className="px-6 py-3 rounded-lg font-semibold transition hover:scale-105"
        >
          ⏳ {language === "ar" ? "ترتيب حسب الطابور" : "Sort by Queue"}
        </button>
      </div>

      {/* ATMs List */}
      {sortedATMs.length === 0 ? (
        <div
          className="text-center py-16"
          style={{
            backgroundColor: darkMode ? "#1a1a1a" : "#f9fafb",
            borderRadius: "12px",
            border: darkMode ? "1px solid #2a2a2a" : "1px solid #e5e7eb",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <p style={{ color: "#a8bbb3" }} className="text-lg font-semibold">
            {language === "ar"
              ? "لا توجد ماكينات في هذه المسافة"
              : "No ATMs in this distance range"}
          </p>
          <p style={{ color: "#6b7280" }} className="text-sm mt-2">
            {language === "ar"
              ? "جرب زيادة المسافة"
              : "Try increasing the distance"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedATMs.map((atm) => {
            const distanceInMeters = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              atm.latitude,
              atm.longitude,
            );
            const distanceInKm = (distanceInMeters / 1000).toFixed(1);

            return (
              <button
                key={atm.atm_id}
                onClick={() => onSelectATM(atm)}
                style={{
                  width: "100%",
                  textAlign: language === "ar" ? "right" : "left",
                  border: "none",
                  background: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
                className="transition hover:scale-[1.02]"
              >
                <div
                  style={{
                    backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: darkMode
                      ? "0 4px 13px rgba(0, 0, 0, 0.3)"
                      : "0 2px 15px rgba(0, 0, 0, 0.08)",
                    border: darkMode
                      ? "1px solid #2a2a2a"
                      : "1px solid #f0f0f0",
                    transition: "all 0.3s ease",
                  }}
                  className="mb-3"
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div className="flex items-center gap-3">
                      {/* <div
                        style={{
                          backgroundColor: atm.isActive ? "#e0f2fe" : "#fee2e2",
                          color: atm.isActive ? "#0ea5e9" : "#ef4444",
                          width: "56px",
                          height: "56px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "12px",
                          fontSize: "28px",
                          flexShrink: 0,
                        }}
                      ></div> */}
                      <div>
                        <h3
                          style={{ color: "#36e27b" }}
                          className="text-xl font-bold mb-1"
                        >
                          {getATMName(atm)}
                        </h3>
                        <div
                          className="flex items-center gap-2 text-sm"
                          style={{ color: "#a8bbb3" }}
                        >
                          <span>📍</span>
                          <span>
                            {distanceInKm} {language === "ar" ? "كم" : "km"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <StatusBadge isActive={atm.isActive} language={language} />
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Queue Info */}
                    <div
                      style={{
                        backgroundColor: darkMode ? "#2a2a2a" : "#f9fafb",
                        padding: "16px",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ fontSize: "20px" }}>⏳</span>
                        <span
                          style={{
                            color: "#a8bbb3",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {language === "ar" ? "الطابور" : "Queue"}
                        </span>
                      </div>
                      <div
                        style={{ color: darkMode ? "#ffffff" : "#111714" }}
                        className="font-bold text-lg"
                      >
                        {atm.queue} {language === "ar" ? "أشخاص" : "people"}
                      </div>
                    </div>

                    {/* Services */}
                    <div
                      style={{
                        backgroundColor: darkMode ? "#2a2a2a" : "#f9fafb",
                        padding: "16px",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ fontSize: "20px" }}>💳</span>
                        <span
                          style={{
                            color: "#a8bbb3",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {language === "ar" ? "الخدمات" : "Services"}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {atm.allows_withdrawal && (
                          <span
                            style={{
                              backgroundColor: "#dcfce7",
                              color: "#16a34a",
                              padding: "4px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            💵 {language === "ar" ? "سحب" : "Withdraw"}
                          </span>
                        )}
                        {atm.allows_deposit && (
                          <span
                            style={{
                              backgroundColor: "#dbeafe",
                              color: "#2563eb",
                              padding: "4px 12px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "600",
                            }}
                          >
                            💰 {language === "ar" ? "إيداع" : "Deposit"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Denominations */}
                    <div
                      style={{
                        backgroundColor: darkMode ? "#2a2a2a" : "#f9fafb",
                        padding: "16px",
                        borderRadius: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ fontSize: "20px" }}>💵</span>
                        <span
                          style={{
                            color: "#a8bbb3",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {language === "ar" ? "الفئات" : "Bills"}
                        </span>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {atm.denominations &&
                          atm.denominations.slice(0, 4).map((denom, idx) => (
                            <span
                              key={idx}
                              style={{
                                color: "#36e27b",
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            >
                              {denom}
                              {idx < atm.denominations.slice(0, 4).length - 1
                                ? ","
                                : ""}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div
                    style={{
                      backgroundColor: "#36e27b",
                      color: "#111714",
                      padding: "14px",
                      borderRadius: "10px",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {language === "ar"
                      ? "عرض التفاصيل والموقع"
                      : "View Details & Location"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
