"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupOrganization() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    org_name: "",
    org_abbreviation: "",
    chief_name: "",
    email: "",
    org_description: "",
    org_social_link: "",
    latitude: "",
    longitude: "",
    governorate: "",
    org_picture: null,
  });
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? false);
  });
  const [isFocused, setIsFocused] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        org_picture: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get current location using Geolocation API
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
        setIsGettingLocation(false);
        alert(
          `Location captured!\nLatitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`,
        );
      },
      (error) => {
        setIsGettingLocation(false);
        alert("Unable to get your location. Please try again.");
        console.error("Geolocation error:", error);
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // إنشاء FormData لإرسال البيانات مع الصورة
    const formDataToSend = new FormData();
    formDataToSend.append("org_name", formData.org_name);
    formDataToSend.append("org_abbreviation", formData.org_abbreviation);
    formDataToSend.append("chief_name", formData.chief_name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("org_social_link", formData.org_social_link);
    formDataToSend.append("org_description", formData.org_description);

    // إرسال الـ location كـ object
    const location = {
      latitude: formData.latitude,
      longitude: formData.longitude,
      governorate: formData.governorate,
    };
    formDataToSend.append("location", JSON.stringify(location));

    if (formData.org_picture) {
      formDataToSend.append("org_picture", formData.org_picture);
    }

    // ============================================================
    // TODO: عند تشغيل الـ API، شيل الكومنت من الكود التالي وامسح الكود المؤقت تحته
    // ============================================================
    /*
    try {
      const response = await fetch("YOUR_API_ENDPOINT_HERE", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        // النافيجيشن للصفحة بتاعت السكسيس
        router.push("/features/auth/signup/success");
      } else {
        // عرض رسالة الخطأ من الـ API
        alert("حدث خطأ: " + (data.message || "فشل التسجيل"));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ في الاتصال بالخادم. برجاء المحاولة مرة أخرى.");
      setIsSubmitting(false);
    }
    */

    // ============================================================
    // كود مؤقت للتجربة - امسح هذا الجزء عند تشغيل الـ API
    // ============================================================
    try {
      // محاكاة API call
      console.log("Organization Data to Send:");
      console.log("================================");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      // انتظار 1.5 ثانية لمحاكاة وقت الإرسال
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // النافيجيشن للصفحة بتاعت السكسيس
      router.push("/features/auth/signup/success");
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
    }
    // ============================================================
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  return (
    <div
      className="min-h-screen transition-colors duration-700 relative overflow-hidden"
      style={{
        backgroundColor: darkMode ? "#0a0f0d" : "#f5f7fa",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: darkMode
              ? "radial-gradient(circle, #36e27b 0%, transparent 70%)"
              : "radial-gradient(circle, #36e27b 0%, transparent 70%)",
            top: "-10%",
            left: "-5%",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{
            background: darkMode
              ? "radial-gradient(circle, #1e9e5a 0%, transparent 70%)"
              : "radial-gradient(circle, #1e9e5a 0%, transparent 70%)",
            bottom: "-10%",
            right: "-5%",
            animation: "float 8s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Dark Mode Toggle - Fixed Position */}
      <button
        onClick={() =>
          setDarkMode((prev) => {
            localStorage.setItem("isDark", JSON.stringify(!prev));
            return !prev;
          })
        }
        className="fixed top-8 right-8 p-4 rounded-2xl font-bold transition-all duration-300 hover:scale-110 shadow-2xl backdrop-blur-md z-50"
        style={{
          backgroundColor: darkMode
            ? "rgba(54, 226, 123, 0.2)"
            : "rgba(54, 226, 123, 0.15)",
          color: "#36e27b",
          border: `2px solid ${darkMode ? "rgba(54, 226, 123, 0.3)" : "rgba(54, 226, 123, 0.2)"}`,
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-12">
        <div
          className="w-full max-w-5xl rounded-3xl shadow-2xl transition-all duration-700 overflow-hidden"
          style={{
            backgroundColor: darkMode
              ? "rgba(17, 23, 20, 0.98)"
              : "rgba(255, 255, 255, 0.98)",
            border: `2px solid ${
              darkMode ? "rgba(54, 226, 123, 0.2)" : "rgba(54, 226, 123, 0.15)"
            }`,
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Organization Logo Section */}
          <div className="relative w-full h-72 overflow-hidden">
            {/* Background Pattern */}
            <div
              className="absolute inset-0 logo-background"
              style={{
                backgroundImage: previewImage
                  ? `linear-gradient(to bottom, ${darkMode ? "rgba(10, 15, 13, 0.3)" : "rgba(255, 255, 255, 0.3)"} 0%, ${darkMode ? "rgba(10, 15, 13, 0.7)" : "rgba(255, 255, 255, 0.7)"} 100%), url(${previewImage})`
                  : darkMode
                    ? "linear-gradient(135deg, #1a2e23 0%, #0a0f0d 50%, #1e3a2e 100%)"
                    : "linear-gradient(135deg, #e8f5e9 0%, #f5f7fa 50%, #e0f2e9 100%)",
              }}
            >
              {/* Decorative Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-10 pattern-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, ${darkMode ? "#36e27b" : "#1e9e5a"} 1px, transparent 0)`,
                }}
              />
            </div>

            {/* Logo Display Area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Organization Logo"
                      className="w-40 h-40 rounded-3xl object-cover shadow-2xl border-4 mx-auto"
                      style={{
                        borderColor: "#36e27b",
                        boxShadow: "0 20px 60px rgba(54, 226, 123, 0.4)",
                      }}
                    />
                    <div className="mt-6">
                      <label
                        htmlFor="org-picture"
                        className="inline-block px-6 py-3 rounded-xl font-bold cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
                        style={{
                          backgroundColor: "#36e27b",
                          color: "#0a0f0d",
                        }}
                      >
                        🔄 Change Logo
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      className="text-9xl mb-6 transition-all duration-300"
                      style={{
                        filter:
                          "drop-shadow(0 8px 30px rgba(54, 226, 123, 0.4))",
                      }}
                    >
                      🏢
                    </div>
                    <label
                      htmlFor="org-picture"
                      className="inline-block px-8 py-4 rounded-2xl font-black text-lg cursor-pointer transition-all duration-300 hover:scale-105 shadow-2xl"
                      style={{
                        backgroundColor: "#36e27b",
                        color: "#0a0f0d",
                      }}
                    >
                      📸 Upload Organization Logo *
                    </label>
                    <p
                      className="mt-4 text-sm font-semibold opacity-60"
                      style={{ color: darkMode ? "#36e27b" : "#1e9e5a" }}
                    >
                      Click to select your organization's logo
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="org-picture"
              required
            />
          </div>

          {/* Form Content */}
          <div className="p-10 md:p-12">
            {/* Header */}
            <div className="mb-10 text-center">
              <h1
                className="text-5xl font-black mb-3 tracking-tight"
                style={{
                  color: "#36e27b",
                  textShadow: darkMode
                    ? "0 0 30px rgba(54, 226, 123, 0.3)"
                    : "none",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Create Your Organization
              </h1>
              <p
                className="text-lg font-medium"
                style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
              >
                Join our community and start making an impact
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Three Column Grid for Main Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Organization Name */}
                <div className="md:col-span-2">
                  <label
                    className="flex items-center gap-2 mb-3 font-bold text-sm tracking-wider"
                    style={{ color: darkMode ? "#36e27b" : "#1e9e5a" }}
                  >
                    <span className="text-lg">🏛️</span>
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    name="org_name"
                    value={formData.org_name}
                    onChange={handleChange}
                    onFocus={() => handleFocus("org_name")}
                    onBlur={() => handleBlur("org_name")}
                    required
                    placeholder="Enter full organization name"
                    className="w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none font-medium shadow-sm"
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(15, 22, 18, 0.8)"
                        : "#ffffff",
                      borderColor: isFocused.org_name
                        ? "#36e27b"
                        : darkMode
                          ? "rgba(54, 226, 123, 0.25)"
                          : "rgba(54, 226, 123, 0.3)",
                      color: darkMode ? "#ffffff" : "#111714",
                      boxShadow: isFocused.org_name
                        ? "0 0 0 3px rgba(54, 226, 123, 0.2), 0 4px 12px rgba(54, 226, 123, 0.15)"
                        : darkMode
                          ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                          : "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>

                {/* Organization Abbreviation */}
                <div>
                  <label
                    className="flex items-center gap-2 mb-3 font-bold text-sm tracking-wider"
                    style={{ color: darkMode ? "#36e27b" : "#1e9e5a" }}
                  >
                    <span className="text-lg">🔤</span>
                    Abbreviation *
                  </label>
                  <input
                    type="text"
                    name="org_abbreviation"
                    value={formData.org_abbreviation}
                    onChange={handleChange}
                    onFocus={() => handleFocus("org_abbreviation")}
                    onBlur={() => handleBlur("org_abbreviation")}
                    required
                    placeholder="e.g., WHO"
                    className="w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none font-bold uppercase shadow-sm"
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(15, 22, 18, 0.8)"
                        : "#ffffff",
                      borderColor: isFocused.org_abbreviation
                        ? "#36e27b"
                        : darkMode
                          ? "rgba(54, 226, 123, 0.25)"
                          : "rgba(54, 226, 123, 0.3)",
                      color: darkMode ? "#ffffff" : "#111714",
                      boxShadow: isFocused.org_abbreviation
                        ? "0 0 0 3px rgba(54, 226, 123, 0.2), 0 4px 12px rgba(54, 226, 123, 0.15)"
                        : darkMode
                          ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                          : "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>
              </div>

              {/* Two Column Grid for Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Chief Name */}
                <div>
                  <label
                    className="flex items-center gap-2 mb-3 font-bold text-sm tracking-wider"
                    style={{ color: darkMode ? "#36e27b" : "#1e9e5a" }}
                  >
                    <span className="text-lg">👤</span>
                    Chief Name *
                  </label>
                  <input
                    type="text"
                    name="chief_name"
                    value={formData.chief_name}
                    onChange={handleChange}
                    onFocus={() => handleFocus("chief_name")}
                    onBlur={() => handleBlur("chief_name")}
                    required
                    placeholder="Full name of organization head"
                    className="w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none font-medium shadow-sm"
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(15, 22, 18, 0.8)"
                        : "#ffffff",
                      borderColor: isFocused.chief_name
                        ? "#36e27b"
                        : darkMode
                          ? "rgba(54, 226, 123, 0.25)"
                          : "rgba(54, 226, 123, 0.3)",
                      color: darkMode ? "#ffffff" : "#111714",
                      boxShadow: isFocused.chief_name
                        ? "0 0 0 3px rgba(54, 226, 123, 0.2), 0 4px 12px rgba(54, 226, 123, 0.15)"
                        : darkMode
                          ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                          : "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    className="flex items-center gap-2 mb-3 font-bold text-sm tracking-wider"
                    style={{ color: darkMode ? "#36e27b" : "#1e9e5a" }}
                  >
                    <span className="text-lg">📧</span>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    required
                    placeholder="official@organization.com"
                    className="w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none font-medium shadow-sm"
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(15, 22, 18, 0.8)"
                        : "#ffffff",
                      borderColor: isFocused.email
                        ? "#36e27b"
                        : darkMode
                          ? "rgba(54, 226, 123, 0.25)"
                          : "rgba(54, 226, 123, 0.3)",
                      color: darkMode ? "#ffffff" : "#111714",
                      boxShadow: isFocused.email
                        ? "0 0 0 3px rgba(54, 226, 123, 0.2), 0 4px 12px rgba(54, 226, 123, 0.15)"
                        : darkMode
                          ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                          : "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>
              </div>

              {/* Website Link - Full Width */}
              <div>
                <label
                  className="flex items-center gap-2 mb-3 font-bold text-sm tracking-wider"
                  style={{ color: darkMode ? "#36e27b" : "#1e9e5a" }}
                >
                  <span className="text-lg">🌐</span>
                  Website Link
                </label>
                <input
                  type="url"
                  name="org_social_link"
                  value={formData.org_social_link}
                  onChange={handleChange}
                  onFocus={() => handleFocus("org_social_link")}
                  onBlur={() => handleBlur("org_social_link")}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none font-medium shadow-sm"
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(15, 22, 18, 0.8)"
                      : "#ffffff",
                    borderColor: isFocused.org_social_link
                      ? "#36e27b"
                      : darkMode
                        ? "rgba(54, 226, 123, 0.25)"
                        : "rgba(54, 226, 123, 0.3)",
                    color: darkMode ? "#ffffff" : "#111714",
                    boxShadow: isFocused.org_social_link
                      ? "0 0 0 3px rgba(54, 226, 123, 0.2), 0 4px 12px rgba(54, 226, 123, 0.15)"
                      : darkMode
                        ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                        : "0 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                />
              </div>

              {/* Organization Location with Geolocation */}
              <div>
                <label
                  className="flex items-center gap-2 mb-3 font-bold text-sm tracking-wider"
                  style={{ color: darkMode ? "#36e27b" : "#1e9e5a" }}
                >
                  <span className="text-lg">📍</span>
                  Organization Location *
                </label>

                {/* Get Location Button */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isGettingLocation}
                    className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      backgroundColor: "#36e27b",
                      color: "#0a0f0d",
                    }}
                  >
                    {isGettingLocation ? (
                      <>
                        <span className="animate-spin inline-block mr-2">
                          ⏳
                        </span>
                        Getting Location...
                      </>
                    ) : (
                      <>📍 Get My Current Location</>
                    )}
                  </button>
                </div>

                {/* Governorate Input - محافظة */}
                <div>
                  <label
                    className="flex items-center gap-2 mb-3 font-bold text-sm tracking-wider"
                    style={{ color: darkMode ? "#36e27b" : "#1e9e5a" }}
                  >
                    <span className="text-lg">🏙️</span>
                    Governorate / المحافظة *
                  </label>
                  <input
                    type="text"
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleChange}
                    onFocus={() => handleFocus("governorate")}
                    onBlur={() => handleBlur("governorate")}
                    required
                    placeholder="e.g., Cairo, القاهرة"
                    className="w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none font-medium shadow-sm"
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(15, 22, 18, 0.8)"
                        : "#ffffff",
                      borderColor: isFocused.governorate
                        ? "#36e27b"
                        : darkMode
                          ? "rgba(54, 226, 123, 0.25)"
                          : "rgba(54, 226, 123, 0.3)",
                      color: darkMode ? "#ffffff" : "#111714",
                      boxShadow: isFocused.governorate
                        ? "0 0 0 3px rgba(54, 226, 123, 0.2), 0 4px 12px rgba(54, 226, 123, 0.15)"
                        : darkMode
                          ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                          : "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                </div>
              </div>

              {/* Organization Description - Full Width */}
              <div>
                <label
                  className="flex items-center gap-2 mb-3 font-bold text-sm tracking-wider"
                  style={{ color: darkMode ? "#36e27b" : "#1e9e5a" }}
                >
                  <span className="text-lg">📝</span>
                  Organization Description *
                </label>
                <textarea
                  name="org_description"
                  value={formData.org_description}
                  onChange={handleChange}
                  onFocus={() => handleFocus("org_description")}
                  onBlur={() => handleBlur("org_description")}
                  required
                  rows="5"
                  placeholder="Tell us about your organization's mission, values, and impact..."
                  className="w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none font-medium leading-relaxed shadow-sm"
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(15, 22, 18, 0.8)"
                      : "#ffffff",
                    borderColor: isFocused.org_description
                      ? "#36e27b"
                      : darkMode
                        ? "rgba(54, 226, 123, 0.25)"
                        : "rgba(54, 226, 123, 0.3)",
                    color: darkMode ? "#ffffff" : "#111714",
                    boxShadow: isFocused.org_description
                      ? "0 0 0 3px rgba(54, 226, 123, 0.2), 0 4px 12px rgba(54, 226, 123, 0.15)"
                      : darkMode
                        ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                        : "0 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-5 rounded-xl font-black text-xl tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] transform relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    backgroundColor: "#36e27b",
                    color: "#0a0f0d",
                    boxShadow: "0 10px 40px rgba(54, 226, 123, 0.4)",
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Creating Organization...
                      </>
                    ) : (
                      <>
                        ✨ Create Organization
                        <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
                          →
                        </span>
                      </>
                    )}
                  </span>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      transform: "translateX(-100%)",
                    }}
                  />
                </button>
              </div>
            </form>

            {/* Footer */}
            <div
              className="mt-10 pt-8 border-t-2"
              style={{
                borderColor: darkMode
                  ? "rgba(54, 226, 123, 0.15)"
                  : "rgba(54, 226, 123, 0.2)",
              }}
            >
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 font-bold text-lg transition-all duration-300 hover:gap-4 group"
                  style={{ color: "#36e27b" }}
                >
                  <span className="text-2xl group-hover:-translate-x-1 transition-transform duration-300">
                    ←
                  </span>
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap");

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        * {
          font-family: "Poppins", sans-serif;
        }

        .logo-background {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .pattern-overlay {
          background-size: 40px 40px;
          background-repeat: repeat;
        }
      `}</style>
    </div>
  );
}
