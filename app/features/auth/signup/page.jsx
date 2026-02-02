// "use client";

// import { useState } from "react";
// import Link from "next/link";

// export default function SignupOrganization() {
//   const [formData, setFormData] = useState({
//     org_name: "",
//     org_abbreviation: "",
//     org_social_link: "",
//     org_description: "",
//     org_picture: null,
//     account_id: "", // سيتم ربطه بالحساب بعد التسجيل
//     location_id: "", // يمكن إضافة حقل اختيار الموقع
//   });
//   const [darkMode, setDarkMode] = useState(false);
//   const [isFocused, setIsFocused] = useState({});
//   const [previewImage, setPreviewImage] = useState(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         org_picture: file,
//       });
//       // عرض preview للصورة
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // إنشاء FormData لإرسال البيانات مع الصورة
//     const formDataToSend = new FormData();
//     formDataToSend.append("org_name", formData.org_name);
//     formDataToSend.append("org_abbreviation", formData.org_abbreviation);
//     formDataToSend.append("org_social_link", formData.org_social_link);
//     formDataToSend.append("org_description", formData.org_description);
//     formDataToSend.append("location_id", formData.location_id);
//     formDataToSend.append("account_id", formData.account_id);
//     if (formData.org_picture) {
//       formDataToSend.append("org_picture", formData.org_picture);
//     }

//     // TODO: استبدل الرابط التالي برابط الـ API الخاص بك
//     /*
//     try {
//       const response = await fetch("YOUR_API_ENDPOINT_HERE", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("تم تسجيل المنظمة بنجاح!");
//         // إعادة توجيه أو إعادة تعيين النموذج
//       } else {
//         alert("حدث خطأ: " + data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("حدث خطأ في الاتصال بالخادم");
//     }
//     */

//     // للتجربة فقط - احذف هذا السطر عند تفعيل الـ API
//     console.log("Organization Signup:", Object.fromEntries(formDataToSend));
//   };

//   const handleFocus = (field) => {
//     setIsFocused({ ...isFocused, [field]: true });
//   };

//   const handleBlur = (field) => {
//     setIsFocused({ ...isFocused, [field]: false });
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500"
//       style={{
//         backgroundColor: darkMode ? "#0a0f0d" : "#f8fafb",
//         backgroundImage: darkMode
//           ? "radial-gradient(circle at 20% 50%, rgba(54, 226, 123, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(54, 226, 123, 0.05) 0%, transparent 50%)"
//           : "radial-gradient(circle at 20% 50%, rgba(54, 226, 123, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(54, 226, 123, 0.08) 0%, transparent 50%)",
//       }}
//     >
//       <div
//         className="w-full max-w-4xl p-10 rounded-2xl shadow-2xl transition-all duration-500 backdrop-blur-sm"
//         style={{
//           backgroundColor: darkMode
//             ? "rgba(17, 23, 20, 0.95)"
//             : "rgba(255, 255, 255, 0.95)",
//           border: `1px solid ${
//             darkMode ? "rgba(54, 226, 123, 0.2)" : "rgba(54, 226, 123, 0.1)"
//           }`,
//         }}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1
//               className="text-4xl font-bold mb-1"
//               style={{ color: "#36e27b" }}
//             >
//               Organization Registration
//             </h1>
//             <p
//               className="text-sm"
//               style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
//             >
//               Create your organization profile
//             </p>
//           </div>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className="p-3 rounded-xl font-semibold transition-all duration-300 hover:scale-110"
//             style={{
//               backgroundColor: darkMode
//                 ? "rgba(54, 226, 123, 0.15)"
//                 : "rgba(54, 226, 123, 0.1)",
//               color: "#36e27b",
//             }}
//           >
//             {darkMode ? "☀️" : "🌙"}
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Organization Picture Upload */}
//           <div className="flex justify-center mb-6">
//             <div className="text-center">
//               <label
//                 className="block mb-3 font-semibold text-sm tracking-wide"
//                 style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
//               >
//                 Organization Logo
//               </label>
//               <div className="relative">
//                 <div
//                   className="w-32 h-32 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden border-4 transition-all duration-300"
//                   style={{
//                     borderColor: previewImage
//                       ? "#36e27b"
//                       : darkMode
//                         ? "rgba(54, 226, 123, 0.2)"
//                         : "rgba(54, 226, 123, 0.3)",
//                     backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
//                   }}
//                 >
//                   {previewImage ? (
//                     <img
//                       src={previewImage}
//                       alt="Preview"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span
//                       style={{
//                         color: darkMode ? "#666" : "#999",
//                         fontSize: "48px",
//                       }}
//                     >
//                       🏢
//                     </span>
//                   )}
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                   id="org-picture"
//                 />
//                 <label
//                   htmlFor="org-picture"
//                   className="inline-block px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
//                   style={{
//                     backgroundColor: "#36e27b",
//                     color: "#0a0f0d",
//                   }}
//                 >
//                   Upload Logo
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Two Column Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Organization Name */}
//             <div>
//               <label
//                 className="block mb-2 font-semibold text-sm tracking-wide"
//                 style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
//               >
//                 Organization Name *
//               </label>
//               <input
//                 type="text"
//                 name="org_name"
//                 value={formData.org_name}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus("org_name")}
//                 onBlur={() => handleBlur("org_name")}
//                 required
//                 placeholder="Enter organization name"
//                 className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none"
//                 style={{
//                   backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
//                   borderColor: isFocused.org_name
//                     ? "#36e27b"
//                     : darkMode
//                       ? "rgba(54, 226, 123, 0.2)"
//                       : "rgba(54, 226, 123, 0.3)",
//                   color: darkMode ? "#ffffff" : "#111714",
//                   boxShadow: isFocused.org_name
//                     ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
//                     : "none",
//                 }}
//               />
//             </div>

//             {/* Organization Abbreviation */}
//             <div>
//               <label
//                 className="block mb-2 font-semibold text-sm tracking-wide"
//                 style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
//               >
//                 Abbreviation *
//               </label>
//               <input
//                 type="text"
//                 name="org_abbreviation"
//                 value={formData.org_abbreviation}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus("org_abbreviation")}
//                 onBlur={() => handleBlur("org_abbreviation")}
//                 required
//                 placeholder="e.g., WHO, UN"
//                 className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none"
//                 style={{
//                   backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
//                   borderColor: isFocused.org_abbreviation
//                     ? "#36e27b"
//                     : darkMode
//                       ? "rgba(54, 226, 123, 0.2)"
//                       : "rgba(54, 226, 123, 0.3)",
//                   color: darkMode ? "#ffffff" : "#111714",
//                   boxShadow: isFocused.org_abbreviation
//                     ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
//                     : "none",
//                 }}
//               />
//             </div>

//             {/* Social Link */}
//             <div>
//               <label
//                 className="block mb-2 font-semibold text-sm tracking-wide"
//                 style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
//               >
//                 Social Media Link
//               </label>
//               <input
//                 type="url"
//                 name="org_social_link"
//                 value={formData.org_social_link}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus("org_social_link")}
//                 onBlur={() => handleBlur("org_social_link")}
//                 placeholder="https://example.com"
//                 className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none"
//                 style={{
//                   backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
//                   borderColor: isFocused.org_social_link
//                     ? "#36e27b"
//                     : darkMode
//                       ? "rgba(54, 226, 123, 0.2)"
//                       : "rgba(54, 226, 123, 0.3)",
//                   color: darkMode ? "#ffffff" : "#111714",
//                   boxShadow: isFocused.org_social_link
//                     ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
//                     : "none",
//                 }}
//               />
//             </div>

//             {/* Location ID */}
//             <div>
//               <label
//                 className="block mb-2 font-semibold text-sm tracking-wide"
//                 style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
//               >
//                 Location ID *
//               </label>
//               <input
//                 type="number"
//                 name="location_id"
//                 value={formData.location_id}
//                 onChange={handleChange}
//                 onFocus={() => handleFocus("location_id")}
//                 onBlur={() => handleBlur("location_id")}
//                 required
//                 placeholder="Enter location ID"
//                 className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none"
//                 style={{
//                   backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
//                   borderColor: isFocused.location_id
//                     ? "#36e27b"
//                     : darkMode
//                       ? "rgba(54, 226, 123, 0.2)"
//                       : "rgba(54, 226, 123, 0.3)",
//                   color: darkMode ? "#ffffff" : "#111714",
//                   boxShadow: isFocused.location_id
//                     ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
//                     : "none",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Organization Description - Full Width */}
//           <div>
//             <label
//               className="block mb-2 font-semibold text-sm tracking-wide"
//               style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
//             >
//               Organization Description *
//             </label>
//             <textarea
//               name="org_description"
//               value={formData.org_description}
//               onChange={handleChange}
//               onFocus={() => handleFocus("org_description")}
//               onBlur={() => handleBlur("org_description")}
//               required
//               rows="4"
//               placeholder="Describe your organization's mission and goals..."
//               className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none"
//               style={{
//                 backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
//                 borderColor: isFocused.org_description
//                   ? "#36e27b"
//                   : darkMode
//                     ? "rgba(54, 226, 123, 0.2)"
//                     : "rgba(54, 226, 123, 0.3)",
//                 color: darkMode ? "#ffffff" : "#111714",
//                 boxShadow: isFocused.org_description
//                   ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
//                   : "none",
//               }}
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full px-4 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-8"
//             style={{
//               backgroundColor: "#36e27b",
//               color: "#0a0f0d",
//               boxShadow: "0 4px 14px rgba(54, 226, 123, 0.4)",
//             }}
//           >
//             Create Organization →
//           </button>
//         </form>

//         {/* Footer */}
//         <div
//           className="mt-8 pt-6 border-t"
//           style={{
//             borderColor: darkMode
//               ? "rgba(54, 226, 123, 0.1)"
//               : "rgba(54, 226, 123, 0.15)",
//           }}
//         >
//           <div className="text-center">
//             <Link
//               href="/"
//               className="inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3"
//               style={{ color: "#36e27b" }}
//             >
//               <span>←</span>
//               <span>Back to Home</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupOrganization() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    org_name: "",
    org_abbreviation: "",
    org_social_link: "",
    org_description: "",
    org_picture: null,
    account_id: "", // سيتم ربطه بالحساب بعد التسجيل
    location_id: "", // يمكن إضافة حقل اختيار الموقع
  });
  const [darkMode, setDarkMode] = useState(false);
  const [isFocused, setIsFocused] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

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
      // عرض preview للصورة
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // إنشاء FormData لإرسال البيانات مع الصورة
    const formDataToSend = new FormData();
    formDataToSend.append("org_name", formData.org_name);
    formDataToSend.append("org_abbreviation", formData.org_abbreviation);
    formDataToSend.append("org_social_link", formData.org_social_link);
    formDataToSend.append("org_description", formData.org_description);
    formDataToSend.append("location_id", formData.location_id);
    formDataToSend.append("account_id", formData.account_id);
    if (formData.org_picture) {
      formDataToSend.append("org_picture", formData.org_picture);
    }

    // TODO: استبدل الرابط التالي برابط الـ API الخاص بك
    /*
    try {
      const response = await fetch("YOUR_API_ENDPOINT_HERE", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to success page
        router.push("/features/auth/signup/success");
      } else {
        alert("حدث خطأ: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ في الاتصال بالخادم");
    }
    */

    // للتجربة فقط - احذف هذا السطر عند تفعيل الـ API
    console.log("Organization Signup:", Object.fromEntries(formDataToSend));

    // Navigate to success page (for demo)
    router.push("/features/auth/signup/success");
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500"
      style={{
        backgroundColor: darkMode ? "#0a0f0d" : "#f8fafb",
        backgroundImage: darkMode
          ? "radial-gradient(circle at 20% 50%, rgba(54, 226, 123, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(54, 226, 123, 0.05) 0%, transparent 50%)"
          : "radial-gradient(circle at 20% 50%, rgba(54, 226, 123, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(54, 226, 123, 0.08) 0%, transparent 50%)",
      }}
    >
      <div
        className="w-full max-w-4xl p-10 rounded-2xl shadow-2xl transition-all duration-500 backdrop-blur-sm"
        style={{
          backgroundColor: darkMode
            ? "rgba(17, 23, 20, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          border: `1px solid ${
            darkMode ? "rgba(54, 226, 123, 0.2)" : "rgba(54, 226, 123, 0.1)"
          }`,
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1
              className="text-4xl font-bold mb-1"
              style={{ color: "#36e27b" }}
            >
              Organization Registration
            </h1>
            <p
              className="text-sm"
              style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
            >
              Create your organization profile
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-xl font-semibold transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: darkMode
                ? "rgba(54, 226, 123, 0.15)"
                : "rgba(54, 226, 123, 0.1)",
              color: "#36e27b",
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Picture Upload */}
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <label
                className="block mb-3 font-semibold text-sm tracking-wide"
                style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
              >
                Organization Logo
              </label>
              <div className="relative">
                <div
                  className="w-32 h-32 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden border-4 transition-all duration-300"
                  style={{
                    borderColor: previewImage
                      ? "#36e27b"
                      : darkMode
                        ? "rgba(54, 226, 123, 0.2)"
                        : "rgba(54, 226, 123, 0.3)",
                    backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
                  }}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      style={{
                        color: darkMode ? "#666" : "#999",
                        fontSize: "48px",
                      }}
                    >
                      🏢
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="org-picture"
                />
                <label
                  htmlFor="org-picture"
                  className="inline-block px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "#36e27b",
                    color: "#0a0f0d",
                  }}
                >
                  Upload Logo
                </label>
              </div>
            </div>
          </div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organization Name */}
            <div>
              <label
                className="block mb-2 font-semibold text-sm tracking-wide"
                style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
              >
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
                placeholder="Enter organization name"
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
                  borderColor: isFocused.org_name
                    ? "#36e27b"
                    : darkMode
                      ? "rgba(54, 226, 123, 0.2)"
                      : "rgba(54, 226, 123, 0.3)",
                  color: darkMode ? "#ffffff" : "#111714",
                  boxShadow: isFocused.org_name
                    ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
                    : "none",
                }}
              />
            </div>

            {/* Organization Abbreviation */}
            <div>
              <label
                className="block mb-2 font-semibold text-sm tracking-wide"
                style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
              >
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
                placeholder="e.g., WHO, UN"
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
                  borderColor: isFocused.org_abbreviation
                    ? "#36e27b"
                    : darkMode
                      ? "rgba(54, 226, 123, 0.2)"
                      : "rgba(54, 226, 123, 0.3)",
                  color: darkMode ? "#ffffff" : "#111714",
                  boxShadow: isFocused.org_abbreviation
                    ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
                    : "none",
                }}
              />
            </div>

            {/* Social Link */}
            <div>
              <label
                className="block mb-2 font-semibold text-sm tracking-wide"
                style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
              >
                Social Media Link
              </label>
              <input
                type="url"
                name="org_social_link"
                value={formData.org_social_link}
                onChange={handleChange}
                onFocus={() => handleFocus("org_social_link")}
                onBlur={() => handleBlur("org_social_link")}
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
                  borderColor: isFocused.org_social_link
                    ? "#36e27b"
                    : darkMode
                      ? "rgba(54, 226, 123, 0.2)"
                      : "rgba(54, 226, 123, 0.3)",
                  color: darkMode ? "#ffffff" : "#111714",
                  boxShadow: isFocused.org_social_link
                    ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
                    : "none",
                }}
              />
            </div>

            {/* Location ID */}
            <div>
              <label
                className="block mb-2 font-semibold text-sm tracking-wide"
                style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
              >
                Location ID *
              </label>
              <input
                type="number"
                name="location_id"
                value={formData.location_id}
                onChange={handleChange}
                onFocus={() => handleFocus("location_id")}
                onBlur={() => handleBlur("location_id")}
                required
                placeholder="Enter location ID"
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
                  borderColor: isFocused.location_id
                    ? "#36e27b"
                    : darkMode
                      ? "rgba(54, 226, 123, 0.2)"
                      : "rgba(54, 226, 123, 0.3)",
                  color: darkMode ? "#ffffff" : "#111714",
                  boxShadow: isFocused.location_id
                    ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
                    : "none",
                }}
              />
            </div>
          </div>

          {/* Organization Description - Full Width */}
          <div>
            <label
              className="block mb-2 font-semibold text-sm tracking-wide"
              style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
            >
              Organization Description *
            </label>
            <textarea
              name="org_description"
              value={formData.org_description}
              onChange={handleChange}
              onFocus={() => handleFocus("org_description")}
              onBlur={() => handleBlur("org_description")}
              required
              rows="4"
              placeholder="Describe your organization's mission and goals..."
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none"
              style={{
                backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
                borderColor: isFocused.org_description
                  ? "#36e27b"
                  : darkMode
                    ? "rgba(54, 226, 123, 0.2)"
                    : "rgba(54, 226, 123, 0.3)",
                color: darkMode ? "#ffffff" : "#111714",
                boxShadow: isFocused.org_description
                  ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
                  : "none",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-8"
            style={{
              backgroundColor: "#36e27b",
              color: "#0a0f0d",
              boxShadow: "0 4px 14px rgba(54, 226, 123, 0.4)",
            }}
          >
            Create Organization →
          </button>
        </form>

        {/* Footer */}
        <div
          className="mt-8 pt-6 border-t"
          style={{
            borderColor: darkMode
              ? "rgba(54, 226, 123, 0.1)"
              : "rgba(54, 226, 123, 0.15)",
          }}
        >
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3"
              style={{ color: "#36e27b" }}
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
