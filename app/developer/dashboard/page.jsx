"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BranchManagerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // حماية الصفحة
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) {
      router.replace("/features/auth/admin-login"); // عدل المسار لو اللوجن عندك مختلف
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/features/auth/admin-login"); // نفس مسار صفحة اللوجن
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Branch Manager Dashboard
        </h1>

        <p className="mb-2 text-gray-700">
          👤 Logged in as:
          <span className="font-semibold"> {user.name}</span>
        </p>

        <p className="mb-6 text-gray-700">
          🛡 Role:
          <span className="font-semibold text-green-600">Developer</span>
        </p>

        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
