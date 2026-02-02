// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function AdminLogin() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [darkMode, setDarkMode] = useState(false);
//   const [isFocused, setIsFocused] = useState({ email: false, password: false });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     // TODO: استبدل هذا بـ API endpoint الخاص بك
//     const API_ENDPOINT = "YOUR_API_ENDPOINT_HERE"; // مثال: "https://api.example.com/auth/login"

//     try {
//       // طريقة 1: استخدام API حقيقي (قم بإزالة التعليق عند الاستخدام)
//       /*
//       const response = await fetch(API_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "فشل تسجيل الدخول");
//       }

//       // تخزين التوكن والبيانات
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("userRole", data.role_id);
//       localStorage.setItem("userData", JSON.stringify(data.user));

//       // التوجيه حسب الدور والمنظمة
//       redirectByRoleAndOrg(data.user);
//       */

//       // طريقة 2: محاكاة تسجيل الدخول باستخدام JSON المحلي (للتطوير فقط)
//       const simulationData = await fetch("/simulationData.json").then((res) =>
//         res.json(),
//       );

//       // البحث عن المستخدم
//       const account = simulationData.accounts.find(
//         (acc) => acc.email === email,
//       );

//       if (!account) {
//         throw new Error("البريد الإلكتروني غير موجود");
//       }

//       // في بيئة حقيقية، يجب التحقق من كلمة المرور عبر الـ API
//       // هنا نستخدم محاكاة بسيطة
//       if (password !== "password123") {
//         // كلمة مرور تجريبية
//         throw new Error("كلمة المرور غير صحيحة");
//       }

//       // الحصول على بيانات المستخدم
//       const user = simulationData.users.find(
//         (u) => u.account_id === account.account_id,
//       );

//       if (!user) {
//         throw new Error("بيانات المستخدم غير موجودة");
//       }

//       // الحصول على بيانات المنظمة
//       const organization = simulationData.organization.find(
//         (org) => org.org_id === user.org_id,
//       );

//       // تخزين البيانات في localStorage
//       localStorage.setItem("authToken", "simulated-token-" + Date.now());
//       localStorage.setItem("userRole", user.role_id.toString());
//       localStorage.setItem("accountType", account.type_id.toString());
//       localStorage.setItem(
//         "userData",
//         JSON.stringify({
//           user_id: user.user_id,
//           name: user.name,
//           name_ar: user.name_ar,
//           email: account.email,
//           role_id: user.role_id,
//           type_id: account.type_id,
//           org_id: user.org_id,
//           branch_id: user.branch_id,
//         }),
//       );

//       // التوجيه حسب الدور والمنظمة
//       redirectByRoleAndOrg(user, organization);
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "حدث خطأ أثناء تسجيل الدخول");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const redirectByRoleAndOrg = (user, organization = null) => {
//     switch (user.role_id) {
//       case 1: // Organization Super Admin
//         router.push("/super-admin/dashboard");
//         break;
//       case 2: // Developer
//         router.push("/developer/dashboard");
//         break;
//       case 3: // Branch Manager
//         router.push("/branch-manager/dashboard");
//         break;
//       default:
//         router.push("/dashboard");
//     }
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
//         className="w-full max-w-md p-10 rounded-2xl shadow-2xl transition-all duration-500 backdrop-blur-sm"
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
//               Admin Portal
//             </h1>
//             <p
//               className="text-sm"
//               style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
//             >
//               Organization Dashboard Access
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

//         {/* Error Message */}
//         {error && (
//           <div
//             className="mb-6 p-4 rounded-xl"
//             style={{
//               backgroundColor: darkMode
//                 ? "rgba(239, 68, 68, 0.1)"
//                 : "rgba(239, 68, 68, 0.05)",
//               border: "1px solid rgba(239, 68, 68, 0.3)",
//               color: darkMode ? "#fca5a5" : "#dc2626",
//             }}
//           >
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               className="block mb-2 font-semibold text-sm tracking-wide"
//               style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onFocus={() => setIsFocused({ ...isFocused, email: true })}
//               onBlur={() => setIsFocused({ ...isFocused, email: false })}
//               required
//               disabled={isLoading}
//               placeholder="admin@example.com"
//               className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none disabled:opacity-50"
//               style={{
//                 backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
//                 borderColor: isFocused.email
//                   ? "#36e27b"
//                   : darkMode
//                     ? "rgba(54, 226, 123, 0.2)"
//                     : "rgba(54, 226, 123, 0.3)",
//                 color: darkMode ? "#ffffff" : "#111714",
//                 boxShadow: isFocused.email
//                   ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
//                   : "none",
//               }}
//             />
//           </div>

//           <div>
//             <label
//               className="block mb-2 font-semibold text-sm tracking-wide"
//               style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onFocus={() => setIsFocused({ ...isFocused, password: true })}
//               onBlur={() => setIsFocused({ ...isFocused, password: false })}
//               required
//               disabled={isLoading}
//               placeholder="••••••••"
//               className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none disabled:opacity-50"
//               style={{
//                 backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
//                 borderColor: isFocused.password
//                   ? "#36e27b"
//                   : darkMode
//                     ? "rgba(54, 226, 123, 0.2)"
//                     : "rgba(54, 226, 123, 0.3)",
//                 color: darkMode ? "#ffffff" : "#111714",
//                 boxShadow: isFocused.password
//                   ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
//                   : "none",
//               }}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full px-4 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
//             style={{
//               backgroundColor: "#36e27b",
//               color: "#0a0f0d",
//               boxShadow: "0 4px 14px rgba(54, 226, 123, 0.4)",
//             }}
//           >
//             {isLoading ? "جاري تسجيل الدخول..." : "Sign In →"}
//           </button>
//         </form>

//         {/* Test Credentials Info */}
//         <div
//           className="mt-6 p-4 rounded-xl text-sm"
//           style={{
//             backgroundColor: darkMode
//               ? "rgba(54, 226, 123, 0.05)"
//               : "rgba(54, 226, 123, 0.08)",
//             border: "1px solid rgba(54, 226, 123, 0.2)",
//             color: darkMode ? "#a0a0a0" : "#666666",
//           }}
//         >
//           <p className="font-semibold mb-2" style={{ color: "#36e27b" }}>
//             🔒 Test Credentials:
//           </p>
//           <div className="space-y-1 text-xs">
//             <p className="font-bold">Organization Admins:</p>
//             <p>• Civil Registry: admin@civilregistry.gov.eg</p>
//             <p>• NBE Bank: admin@nbe.com.eg</p>
//             <p>• Banque Misr: admin@banquemisr.com</p>
//             <p>• CIB Bank: admin@cib.com.eg</p>
//             <p className="mt-2 font-bold">Branch Managers:</p>
//             <p>• Tahrir (Civil): manager.tahrir@civilregistry.gov.eg</p>
//             <p>• Tahrir (NBE): manager.tahrir@nbe.com.eg</p>
//             <p className="mt-1 font-semibold">Password: password123</p>
//           </div>
//         </div>

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
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // TODO: استبدل هذا بـ API endpoint الخاص بك
    const API_ENDPOINT = "YOUR_API_ENDPOINT_HERE";

    try {
      // TODO: استخدام API حقيقي (قم بإزالة التعليق عند الاستخدام)
      /*
      const response = await fetch(API_ENDPOINT + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "فشل تسجيل الدخول");
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.role_id);
      localStorage.setItem("userData", JSON.stringify(data.user));

      redirectByRoleAndOrg(data.user);
      */

      // محاكاة تسجيل الدخول باستخدام JSON المحلي
      const simulationData = await fetch("/simulationData.json").then((res) =>
        res.json(),
      );

      const account = simulationData.accounts.find(
        (acc) => acc.email === email,
      );

      if (!account) {
        throw new Error("البريد الإلكتروني غير موجود");
      }

      if (password !== "password123") {
        throw new Error("كلمة المرور غير صحيحة");
      }

      const user = simulationData.users.find(
        (u) => u.account_id === account.account_id,
      );

      if (!user) {
        throw new Error("بيانات المستخدم غير موجودة");
      }

      const organization = simulationData.organization.find(
        (org) => org.org_id === user.org_id,
      );

      localStorage.setItem("authToken", "simulated-token-" + Date.now());
      localStorage.setItem("userRole", user.role_id.toString());
      localStorage.setItem("accountType", account.type_id.toString());
      localStorage.setItem(
        "userData",
        JSON.stringify({
          user_id: user.user_id,
          name: user.name,
          name_ar: user.name_ar,
          email: account.email,
          role_id: user.role_id,
          type_id: account.type_id,
          org_id: user.org_id,
          branch_id: user.branch_id,
        }),
      );

      redirectByRoleAndOrg(user, organization);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  const redirectByRoleAndOrg = (user, organization = null) => {
    switch (user.role_id) {
      case 1: // Organization Super Admin
        router.push("/super-admin/dashboard");
        break;
      case 2: // Developer
        router.push("/developer/dashboard");
        break;
      case 3: // Branch Manager
        router.push("/branch-manager/dashboard");
        break;
      default:
        router.push("/dashboard");
    }
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
        className="w-full max-w-md p-10 rounded-2xl shadow-2xl transition-all duration-500 backdrop-blur-sm"
        style={{
          backgroundColor: darkMode
            ? "rgba(17, 23, 20, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          border: `2px solid ${
            darkMode ? "rgba(54, 226, 123, 0.3)" : "rgba(54, 226, 123, 0.2)"
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
              Admin Portal
            </h1>
            <p
              className="text-sm"
              style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
            >
              Organization Dashboard Access
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

        {/* Error Message */}
        {error && (
          <div
            className="mb-6 p-4 rounded-xl animate-pulse"
            style={{
              backgroundColor: darkMode
                ? "rgba(239, 68, 68, 0.1)"
                : "rgba(239, 68, 68, 0.05)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: darkMode ? "#fca5a5" : "#dc2626",
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block mb-2 font-semibold text-sm tracking-wide"
              style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, email: true })}
              onBlur={() => setIsFocused({ ...isFocused, email: false })}
              required
              disabled={isLoading}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none disabled:opacity-50"
              style={{
                backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
                borderColor: isFocused.email
                  ? "#36e27b"
                  : darkMode
                    ? "rgba(54, 226, 123, 0.2)"
                    : "rgba(54, 226, 123, 0.3)",
                color: darkMode ? "#ffffff" : "#111714",
                boxShadow: isFocused.email
                  ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
                  : "none",
              }}
            />
          </div>

          <div>
            <label
              className="block mb-2 font-semibold text-sm tracking-wide"
              style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, password: true })}
              onBlur={() => setIsFocused({ ...isFocused, password: false })}
              required
              disabled={isLoading}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none disabled:opacity-50"
              style={{
                backgroundColor: darkMode ? "#0a0f0d" : "#ffffff",
                borderColor: isFocused.password
                  ? "#36e27b"
                  : darkMode
                    ? "rgba(54, 226, 123, 0.2)"
                    : "rgba(54, 226, 123, 0.3)",
                color: darkMode ? "#ffffff" : "#111714",
                boxShadow: isFocused.password
                  ? "0 0 0 3px rgba(54, 226, 123, 0.1)"
                  : "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "#36e27b",
              color: "#0a0f0d",
              boxShadow: "0 4px 14px rgba(54, 226, 123, 0.4)",
            }}
          >
            {isLoading ? "جاري تسجيل الدخول..." : "Sign In →"}
          </button>
        </form>

        {/* Test Credentials Info */}
        <div
          className="mt-6 p-4 rounded-xl text-sm max-h-80 overflow-y-auto"
          style={{
            backgroundColor: darkMode
              ? "rgba(54, 226, 123, 0.05)"
              : "rgba(54, 226, 123, 0.08)",
            border: "1px solid rgba(54, 226, 123, 0.2)",
            color: darkMode ? "#a0a0a0" : "#666666",
          }}
        >
          <p className="font-semibold mb-2" style={{ color: "#36e27b" }}>
            🔒 Test Credentials:
          </p>
          <div className="space-y-1 text-xs">
            <p className="font-bold" style={{ color: "#36e27b" }}>
              Organization Admins:
            </p>
            <p>• Civil Registry: admin@civilregistry.gov.eg</p>
            <p>• NBE Bank: admin@nbe.com.eg</p>
            <p>• Banque Misr: admin@banquemisr.com</p>
            <p>• CIB Bank: admin@cib.com.eg</p>

            <p className="mt-3 font-bold" style={{ color: "#36e27b" }}>
              Civil Registry Branch Managers:
            </p>
            <p>• Tahrir: manager.tahrir@civilregistry.gov.eg</p>
            <p>• Nasr City: manager.nasrcity@civilregistry.gov.eg</p>
            <p>• Mansoura: manager.mansoura@civilregistry.gov.eg</p>
            <p>• Alexandria: manager.alexandria@civilregistry.gov.eg</p>

            <p className="mt-3 font-bold" style={{ color: "#36e27b" }}>
              Bank Branch Managers:
            </p>
            <p>• NBE Tahrir: manager.tahrir@nbe.com.eg</p>
            <p>• NBE Nasr City: manager.nasrcity@nbe.com.eg</p>
            <p>• Banque Misr Dokki: manager.dokki@banquemisr.com</p>
            <p>• Banque Misr 6 October: manager.6october@banquemisr.com</p>

            <p className="mt-2 font-semibold" style={{ color: "#36e27b" }}>
              Password: password123
            </p>
          </div>
        </div>

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
