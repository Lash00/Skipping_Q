"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrganizationAdminDashboard() {
  const router = useRouter();
  const [language, setLanguage] = useState("en"); // 'en' or 'ar'
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userOrganization, setUserOrganization] = useState(null);

  // Data states
  const [governorates, setGovernorates] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [atms, setAtms] = useState([]);
  const [selectedAtm, setSelectedAtm] = useState(null);
  const [logs, setLogs] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [branchServices, setBranchServices] = useState([]);

  // Translation object
  const t = {
    en: {
      dashboard: "Admin Dashboard",
      welcome: "Welcome",
      logout: "Logout",
      selectGovernorate: "Select Governorate",
      branches: "Branches",
      atms: "ATMs",
      atmDetails: "ATM Details",
      branchDetails: "Branch Details",
      systemLogs: "System Logs",
      statistics: "Statistics",
      totalBranches: "Total Branches",
      totalATMs: "Total ATMs",
      activeATMs: "Active ATMs",
      services: "Services",
      serviceManagement: "Service Management",
      available: "Available",
      unavailable: "Unavailable",
      toggleService: "Toggle Service",
      totalServices: "Total Services",
      activeServices: "Active Services",
      recentLogs: "Recent Activity",
      viewAll: "View All",
      atmCode: "ATM Code",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      manufacturer: "Manufacturer",
      model: "Model",
      serialNumber: "Serial Number",
      installationDate: "Installation Date",
      lastMaintenance: "Last Maintenance",
      allowsWithdrawal: "Allows Withdrawal",
      allowsDeposit: "Allows Deposit",
      yes: "Yes",
      no: "No",
      update: "Update",
      branchCode: "Branch Code",
      phone: "Phone",
      email: "Email",
      workingHours: "Working Hours",
      address: "Address",
      action: "Action",
      description: "Description",
      timestamp: "Timestamp",
      level: "Level",
      category: "Category",
      backToBranches: "Back to Branches",
      backToATMs: "Back to ATMs",
      backToGovernorates: "Back to Governorates",
      noBranches: "No branches found in this governorate",
      noAtms: "This branch has no ATMs",
      organizationType: "Organization Type",
      civilRegistry: "Civil Registry",
      bank: "Bank",
    },
    ar: {
      dashboard: "لوحة تحكم المسؤول",
      welcome: "مرحباً",
      logout: "تسجيل الخروج",
      selectGovernorate: "اختر المحافظة",
      branches: "الفروع",
      atms: "أجهزة الصراف الآلي",
      atmDetails: "تفاصيل الصراف الآلي",
      branchDetails: "تفاصيل الفرع",
      systemLogs: "سجلات النظام",
      statistics: "الإحصائيات",
      totalBranches: "إجمالي الفروع",
      totalATMs: "إجمالي أجهزة الصراف",
      activeATMs: "الأجهزة النشطة",
      services: "الخدمات",
      serviceManagement: "إدارة الخدمات",
      available: "متاح",
      unavailable: "غير متاح",
      toggleService: "تبديل الخدمة",
      totalServices: "إجمالي الخدمات",
      activeServices: "الخدمات النشطة",
      recentLogs: "النشاط الأخير",
      viewAll: "عرض الكل",
      atmCode: "كود الجهاز",
      status: "الحالة",
      active: "نشط",
      inactive: "غير نشط",
      manufacturer: "الشركة المصنعة",
      model: "الموديل",
      serialNumber: "الرقم التسلسلي",
      installationDate: "تاريخ التركيب",
      lastMaintenance: "آخر صيانة",
      allowsWithdrawal: "يسمح بالسحب",
      allowsDeposit: "يسمح بالإيداع",
      yes: "نعم",
      no: "لا",
      update: "تحديث",
      branchCode: "كود الفرع",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      workingHours: "ساعات العمل",
      address: "العنوان",
      action: "الإجراء",
      description: "الوصف",
      timestamp: "التوقيت",
      level: "المستوى",
      category: "الفئة",
      backToBranches: "العودة للفروع",
      backToATMs: "العودة للأجهزة",
      backToGovernorates: "العودة للمحافظات",
      noBranches: "لا توجد فروع في هذه المحافظة",
      noAtms: "لا توجد أجهزة صراف في هذا الفرع",
      organizationType: "نوع المؤسسة",
      civilRegistry: "السجل المدني",
      bank: "بنك",
    },
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Check authentication
      const token = localStorage.getItem("authToken");
      const userRole = localStorage.getItem("userRole");

      if (!token || userRole !== "1") {
        router.push("/features/auth/admin-login");
        return;
      }

      const storedUser = localStorage.getItem("userData");
      if (!storedUser) {
        router.push("/features/auth/admin-login");
        return;
      }

      const user = JSON.parse(storedUser);
      setUserData(user);

      const response = await fetch("/simulationData.json");
      const data = await response.json();

      // Get user's organization
      const userOrg = data.organization.find(
        (org) => org.org_id === user.org_id,
      );
      setUserOrganization(userOrg);

      // Get all branches for this organization
      const orgBranches = data.branch.filter(
        (branch) => branch.org_id === user.org_id,
      );

      // Get unique governorates that have branches for this organization
      const branchLocations = orgBranches.map((branch) =>
        data.location.find((loc) => loc.location_id === branch.location_id),
      );

      const uniqueGovernorateIds = [
        ...new Set(branchLocations.map((loc) => loc.governorate_id)),
      ];
      const orgGovernorates = data.governorate.filter((gov) =>
        uniqueGovernorateIds.includes(gov.governorate_id),
      );

      setGovernorates(orgGovernorates);

      // Get logs for this organization only
      const orgLogs = data.systemLogs.filter(
        (log) => !log.metadata?.org_id || log.metadata.org_id === user.org_id,
      );
      setLogs(orgLogs);

      // Load all services for this organization type
      const orgServices = data.services.filter(
        (s) =>
          s.service_category ===
          (userOrg.org_type === "bank" ? "bank" : "civil_registry"),
      );
      setAllServices(orgServices);

      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  const handleGovernorateSelect = async (gov) => {
    setSelectedGovernorate(gov);
    setSelectedBranch(null);
    setSelectedAtm(null);

    // Load branches for this governorate (filtered by organization)
    try {
      const response = await fetch("/simulationData.json");
      const data = await response.json();

      // Filter branches by governorate and user's organization
      const filteredBranches = data.branch.filter((branch) => {
        const location = data.location.find(
          (loc) => loc.location_id === branch.location_id,
        );
        return (
          location &&
          location.governorate_id === gov.governorate_id &&
          branch.org_id === userData.org_id
        );
      });

      // Enrich branches with location data
      const enrichedBranches = filteredBranches.map((branch) => {
        const location = data.location.find(
          (loc) => loc.location_id === branch.location_id,
        );
        return { ...branch, location };
      });

      setBranches(enrichedBranches);
    } catch (error) {
      console.error("Error loading branches:", error);
    }
  };

  const handleBranchSelect = async (branch) => {
    setSelectedBranch(branch);
    setSelectedAtm(null);

    // Load branch services
    try {
      const response = await fetch("/simulationData.json");
      const data = await response.json();

      const branchSvcs = data.branchServices.filter(
        (bs) => bs.branch_id === branch.branch_id,
      );
      setBranchServices(branchSvcs);

      // Load ATMs for this branch (only for banks)
      if (userOrganization?.org_type === "bank") {
        const branchAtms = data.atm.filter(
          (atm) => atm.branch_id === branch.branch_id,
        );
        setAtms(branchAtms);
      } else {
        setAtms([]);
      }
    } catch (error) {
      console.error("Error loading branch data:", error);
    }
  };

  const handleServiceToggle = async (serviceId) => {
    if (!selectedBranch) return;

    try {
      const branchService = branchServices.find(
        (bs) => bs.service_id === serviceId,
      );

      if (branchService) {
        // Update existing service
        const updatedServices = branchServices.map((bs) =>
          bs.service_id === serviceId ? { ...bs, isActive: !bs.isActive } : bs,
        );
        setBranchServices(updatedServices);
      } else {
        // Add new service
        const newBranchService = {
          branch_service_id:
            Math.max(...branchServices.map((bs) => bs.branch_service_id), 0) +
            1,
          branch_id: selectedBranch.branch_id,
          service_id: serviceId,
          isActive: true,
        };
        setBranchServices([...branchServices, newBranchService]);
      }

      // TODO: API call
      alert("Service updated! (This will be connected to API)");
    } catch (error) {
      console.error("Error toggling service:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    router.push("/features/auth/admin-login");
  };

  const handleUpdateAtm = (atmId) => {
    // TODO: Implement ATM update functionality
    console.log("Update ATM:", atmId);
    alert(`Update ATM ${atmId} - This will be implemented with actual API`);
  };

  const handleUpdateBranch = (branchId) => {
    // TODO: Implement branch update functionality
    console.log("Update branch:", branchId);
    alert(
      `Update Branch ${branchId} - This will be implemented with actual API`,
    );
  };

  const getServiceStatus = (serviceId) => {
    const branchService = branchServices.find(
      (bs) => bs.service_id === serviceId,
    );
    return branchService ? branchService.isActive : false;
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: darkMode ? "#0a0f0d" : "#f8fafb" }}
      >
        <div className="text-2xl font-bold" style={{ color: "#36e27b" }}>
          Loading...
        </div>
      </div>
    );
  }

  const activeServicesCount = branchServices.filter((bs) => bs.isActive).length;

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: darkMode ? "#0a0f0d" : "#f8fafb",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      {/* Header */}
      <div
        className="rounded-2xl p-6 mb-6 shadow-lg"
        style={{
          backgroundColor: darkMode
            ? "rgba(17, 23, 20, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          border: `1px solid ${
            darkMode ? "rgba(54, 226, 123, 0.2)" : "rgba(54, 226, 123, 0.1)"
          }`,
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Logo placeholder */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: darkMode ? "white" : "rgba(54, 226, 123, 0.2)",
              }}
            >
              <span className="text-3xl">
                {/* {userOrganization?.org_type === "bank" ? "🏦" : "📋"} */}

                <img
                  src="/logo-removebg-preview.png"
                  alt="logo"
                  className="logo"
                  style={{ width: "100px" }}
                />
              </span>
            </div>
            <div>
              <h1
                className="text-3xl font-bold mb-1"
                style={{ color: "#36e27b" }}
              >
                {language === "ar"
                  ? userOrganization?.org_name_ar
                  : userOrganization?.org_name_en}
              </h1>
              <p
                className="text-sm mb-1"
                style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
              >
                {t[language].welcome},{" "}
                {language === "ar" ? userData?.name_ar : userData?.name}
              </p>
              <p
                className="text-xs px-3 py-1 rounded-full inline-block"
                style={{
                  backgroundColor: "rgba(54, 226, 123, 0.15)",
                  color: "#36e27b",
                }}
              >
                {userOrganization?.org_type === "bank"
                  ? t[language].bank
                  : t[language].civilRegistry}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="px-4 py-2 rounded-xl font-semibold transition-all duration-300"
              style={{
                backgroundColor: darkMode
                  ? "rgba(54, 226, 123, 0.15)"
                  : "rgba(54, 226, 123, 0.1)",
                color: "#36e27b",
              }}
            >
              {language === "en" ? "العربية" : "English"}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-xl font-semibold transition-all duration-300"
              style={{
                backgroundColor: darkMode
                  ? "rgba(54, 226, 123, 0.15)"
                  : "rgba(54, 226, 123, 0.1)",
                color: "#36e27b",
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl font-semibold transition-all duration-300"
              style={{
                backgroundColor: "#ef4444",
                color: "white",
              }}
            >
              {t[language].logout}
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {selectedGovernorate && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title={t[language].totalBranches}
            value={branches.length}
            icon="🏢"
            darkMode={darkMode}
          />
          {selectedBranch && (
            <>
              <StatCard
                title={t[language].totalServices}
                value={allServices.length}
                icon="📋"
                darkMode={darkMode}
              />
              <StatCard
                title={t[language].activeServices}
                value={activeServicesCount}
                icon="✅"
                darkMode={darkMode}
              />
            </>
          )}
          {userOrganization?.org_type === "bank" && selectedBranch && (
            <StatCard
              title={t[language].totalATMs}
              value={atms.length}
              icon="🏧"
              darkMode={darkMode}
            />
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Navigation */}
        <div
          className="lg:col-span-2 rounded-2xl p-6 shadow-lg"
          style={{
            backgroundColor: darkMode
              ? "rgba(17, 23, 20, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            border: `1px solid ${
              darkMode ? "rgba(54, 226, 123, 0.2)" : "rgba(54, 226, 123, 0.1)"
            }`,
          }}
        >
          {!selectedGovernorate && (
            <>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "#36e27b" }}
              >
                {t[language].selectGovernorate}
              </h2>

              {/* Governorates Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {governorates.map((gov) => (
                  <button
                    key={gov.governorate_id}
                    onClick={() => handleGovernorateSelect(gov)}
                    className="p-4 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(54, 226, 123, 0.1)"
                        : "rgba(54, 226, 123, 0.08)",
                      border: "2px solid rgba(54, 226, 123, 0.3)",
                      color: darkMode ? "#e0e0e0" : "#333333",
                    }}
                  >
                    <div className="text-3xl mb-2">📍</div>
                    <div className="font-bold">
                      {language === "ar"
                        ? gov.governorate_name_ar
                        : gov.governorate_name_en}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedGovernorate && !selectedBranch && (
            <>
              <button
                onClick={() => {
                  setSelectedGovernorate(null);
                  setBranches([]);
                }}
                className="mb-4 px-4 py-2 rounded-xl font-semibold transition-all"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(54, 226, 123, 0.15)"
                    : "rgba(54, 226, 123, 0.1)",
                  color: "#36e27b",
                }}
              >
                ← {t[language].backToGovernorates}
              </button>

              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#36e27b" }}
              >
                {t[language].branches} -{" "}
                {language === "ar"
                  ? selectedGovernorate.governorate_name_ar
                  : selectedGovernorate.governorate_name_en}
              </h2>

              {branches.length === 0 ? (
                <div
                  className="text-center py-12"
                  style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                >
                  {t[language].noBranches}
                </div>
              ) : (
                <div className="space-y-3">
                  {branches.map((branch) => (
                    <button
                      key={branch.branch_id}
                      onClick={() => handleBranchSelect(branch)}
                      className="w-full p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] text-left"
                      style={{
                        backgroundColor: darkMode
                          ? "rgba(54, 226, 123, 0.1)"
                          : "rgba(54, 226, 123, 0.08)",
                        border: "2px solid rgba(54, 226, 123, 0.3)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div
                            className="font-bold text-lg mb-1"
                            style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                          >
                            {language === "ar"
                              ? branch.branch_name_ar
                              : branch.branch_name_en}
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                          >
                            {branch.branch_code}
                          </div>
                        </div>
                        <div className="text-3xl">
                          {userOrganization?.org_type === "bank" ? "🏦" : "📋"}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {selectedBranch && !selectedAtm && (
            <>
              <button
                onClick={() => {
                  setSelectedBranch(null);
                  setAtms([]);
                  setBranchServices([]);
                }}
                className="mb-4 px-4 py-2 rounded-xl font-semibold transition-all"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(54, 226, 123, 0.15)"
                    : "rgba(54, 226, 123, 0.1)",
                  color: "#36e27b",
                }}
              >
                ← {t[language].backToBranches}
              </button>

              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#36e27b" }}
              >
                {t[language].branchDetails}
              </h2>

              <div
                className="p-6 rounded-xl mb-6"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(54, 226, 123, 0.05)"
                    : "rgba(54, 226, 123, 0.08)",
                  border: "1px solid rgba(54, 226, 123, 0.2)",
                }}
              >
                <DetailRow
                  label={t[language].branchCode}
                  value={selectedBranch.branch_code}
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].phone}
                  value={selectedBranch.phone}
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].email}
                  value={selectedBranch.email}
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].workingHours}
                  value={selectedBranch.working_hours}
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].address}
                  value={
                    language === "ar"
                      ? selectedBranch.location?.address_details_ar
                      : selectedBranch.location?.address_details_en
                  }
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].status}
                  value={
                    selectedBranch.isActive
                      ? t[language].active
                      : t[language].inactive
                  }
                  darkMode={darkMode}
                  valueColor={selectedBranch.isActive ? "#36e27b" : "#ef4444"}
                />

                <button
                  onClick={() => handleUpdateBranch(selectedBranch.branch_id)}
                  className="mt-4 px-6 py-2 rounded-xl font-semibold transition-all hover:scale-105"
                  style={{
                    backgroundColor: "#36e27b",
                    color: "#0a0f0d",
                  }}
                >
                  {t[language].update}
                </button>
              </div>

              {/* Services Management Section */}
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#36e27b" }}
              >
                {t[language].serviceManagement}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {allServices.map((service) => {
                  const isActive = getServiceStatus(service.service_id);
                  return (
                    <div
                      key={service.service_id}
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: darkMode
                          ? "rgba(54, 226, 123, 0.05)"
                          : "rgba(54, 226, 123, 0.08)",
                        border: `2px solid ${
                          isActive
                            ? "rgba(54, 226, 123, 0.3)"
                            : "rgba(128, 128, 128, 0.2)"
                        }`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div
                            className="font-bold mb-1"
                            style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                          >
                            {language === "ar"
                              ? service.service_name_ar
                              : service.service_name_en}
                          </div>
                          <span
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: isActive
                                ? "rgba(54, 226, 123, 0.2)"
                                : "rgba(128, 128, 128, 0.2)",
                              color: isActive ? "#36e27b" : "#808080",
                            }}
                          >
                            {isActive
                              ? t[language].available
                              : t[language].unavailable}
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() =>
                              handleServiceToggle(service.service_id)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ATMs Section (only for banks) */}
              {userOrganization?.org_type === "bank" && (
                <>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "#36e27b" }}
                  >
                    {t[language].atms}
                  </h3>

                  {atms.length === 0 ? (
                    <div
                      className="text-center py-8"
                      style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                    >
                      {t[language].noAtms}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {atms.map((atm) => (
                        <button
                          key={atm.atm_id}
                          onClick={() => setSelectedAtm(atm)}
                          className="w-full p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] text-left"
                          style={{
                            backgroundColor: darkMode
                              ? "rgba(54, 226, 123, 0.1)"
                              : "rgba(54, 226, 123, 0.08)",
                            border: "2px solid rgba(54, 226, 123, 0.3)",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div
                                className="font-bold text-lg mb-1"
                                style={{
                                  color: darkMode ? "#e0e0e0" : "#333333",
                                }}
                              >
                                {atm.atm_code}
                              </div>
                              <div
                                className="text-sm"
                                style={{
                                  color: darkMode ? "#a0a0a0" : "#666666",
                                }}
                              >
                                {atm.manufacturer} - {atm.model}
                              </div>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-lg text-sm font-semibold`}
                              style={{
                                backgroundColor: atm.isActive
                                  ? "rgba(54, 226, 123, 0.2)"
                                  : "rgba(239, 68, 68, 0.2)",
                                color: atm.isActive ? "#36e27b" : "#ef4444",
                              }}
                            >
                              {atm.isActive
                                ? t[language].active
                                : t[language].inactive}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {selectedAtm && (
            <>
              <button
                onClick={() => setSelectedAtm(null)}
                className="mb-4 px-4 py-2 rounded-xl font-semibold transition-all"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(54, 226, 123, 0.15)"
                    : "rgba(54, 226, 123, 0.1)",
                  color: "#36e27b",
                }}
              >
                ← {t[language].backToATMs}
              </button>

              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#36e27b" }}
              >
                {t[language].atmDetails}
              </h2>

              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(54, 226, 123, 0.05)"
                    : "rgba(54, 226, 123, 0.08)",
                  border: "1px solid rgba(54, 226, 123, 0.2)",
                }}
              >
                <DetailRow
                  label={t[language].atmCode}
                  value={selectedAtm.atm_code}
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].manufacturer}
                  value={selectedAtm.manufacturer}
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].model}
                  value={selectedAtm.model}
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].serialNumber}
                  value={selectedAtm.serial_number}
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].installationDate}
                  value={new Date(
                    selectedAtm.installation_date,
                  ).toLocaleDateString()}
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].lastMaintenance}
                  value={new Date(
                    selectedAtm.last_maintenance,
                  ).toLocaleDateString()}
                  darkMode={darkMode}
                />
                <DetailRow
                  label={t[language].allowsWithdrawal}
                  value={
                    selectedAtm.allows_withdrawal
                      ? t[language].yes
                      : t[language].no
                  }
                  darkMode={darkMode}
                  valueColor={
                    selectedAtm.allows_withdrawal ? "#36e27b" : "#ef4444"
                  }
                />
                <DetailRow
                  label={t[language].allowsDeposit}
                  value={
                    selectedAtm.allows_deposit
                      ? t[language].yes
                      : t[language].no
                  }
                  darkMode={darkMode}
                  valueColor={
                    selectedAtm.allows_deposit ? "#36e27b" : "#ef4444"
                  }
                />
                <DetailRow
                  label={t[language].status}
                  value={
                    selectedAtm.isActive
                      ? t[language].active
                      : t[language].inactive
                  }
                  darkMode={darkMode}
                  valueColor={selectedAtm.isActive ? "#36e27b" : "#ef4444"}
                />

                <button
                  onClick={() => handleUpdateAtm(selectedAtm.atm_id)}
                  className="mt-4 px-6 py-2 rounded-xl font-semibold transition-all hover:scale-105"
                  style={{
                    backgroundColor: "#36e27b",
                    color: "#0a0f0d",
                  }}
                >
                  {t[language].update}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Panel - System Logs */}
        <div
          className="rounded-2xl p-6 shadow-lg max-h-[800px] overflow-y-auto"
          style={{
            backgroundColor: darkMode
              ? "rgba(17, 23, 20, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            border: `1px solid ${
              darkMode ? "rgba(54, 226, 123, 0.2)" : "rgba(54, 226, 123, 0.1)"
            }`,
          }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#36e27b" }}>
            {t[language].recentLogs}
          </h2>

          <div className="space-y-3">
            {logs.slice(0, 20).map((log) => (
              <div
                key={log.log_id}
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(54, 226, 123, 0.05)"
                    : "rgba(54, 226, 123, 0.08)",
                  border: "1px solid rgba(54, 226, 123, 0.2)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-bold"
                    style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                  >
                    {log.action}
                  </span>
                  <span
                    className="px-2 py-1 rounded text-xs font-semibold"
                    style={{
                      backgroundColor:
                        log.level_id === 1
                          ? "rgba(54, 226, 123, 0.2)"
                          : log.level_id === 2
                            ? "rgba(251, 191, 36, 0.2)"
                            : "rgba(239, 68, 68, 0.2)",
                      color:
                        log.level_id === 1
                          ? "#36e27b"
                          : log.level_id === 2
                            ? "#fbbf24"
                            : "#ef4444",
                    }}
                  >
                    {log.level_id === 1
                      ? "INFO"
                      : log.level_id === 2
                        ? "WARNING"
                        : "ERROR"}
                  </span>
                </div>
                <p
                  className="text-sm mb-2"
                  style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                >
                  {log.description}
                </p>
                <p
                  className="text-xs"
                  style={{ color: darkMode ? "#707070" : "#999999" }}
                >
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, icon, darkMode }) {
  return (
    <div
      className="p-6 rounded-2xl shadow-lg"
      style={{
        backgroundColor: darkMode
          ? "rgba(17, 23, 20, 0.95)"
          : "rgba(255, 255, 255, 0.95)",
        border: `1px solid ${
          darkMode ? "rgba(54, 226, 123, 0.2)" : "rgba(54, 226, 123, 0.1)"
        }`,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-sm mb-1"
            style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
          >
            {title}
          </p>
          <p className="text-3xl font-bold" style={{ color: "#36e27b" }}>
            {value}
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, darkMode, valueColor }) {
  return (
    <div
      className="flex justify-between items-center mb-3 pb-3 border-b"
      style={{
        borderColor: darkMode
          ? "rgba(54, 226, 123, 0.1)"
          : "rgba(54, 226, 123, 0.15)",
      }}
    >
      <span
        className="font-semibold"
        style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
      >
        {label}:
      </span>
      <span
        className="font-bold"
        style={{ color: valueColor || (darkMode ? "#e0e0e0" : "#333333") }}
      >
        {value}
      </span>
    </div>
  );
}
