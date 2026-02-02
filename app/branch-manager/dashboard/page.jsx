"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BranchManagerDashboard() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [branchData, setBranchData] = useState(null);
  const [organizationData, setOrganizationData] = useState(null);
  const [branchServices, setBranchServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [atms, setAtms] = useState([]);
  const [selectedAtm, setSelectedAtm] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedBranch, setEditedBranch] = useState(null);
  const [editedAtm, setEditedAtm] = useState(null);

  // Translation object
  const t = {
    en: {
      dashboard: "Branch Manager Dashboard",
      welcome: "Welcome",
      logout: "Logout",
      branchDetails: "Branch Details",
      services: "Services",
      atms: "ATMs",
      atmDetails: "ATM Details",
      edit: "Edit",
      save: "Save",
      cancel: "Cancel",
      update: "Update",
      branchCode: "Branch Code",
      branchName: "Branch Name",
      phone: "Phone",
      email: "Email",
      workingHours: "Working Hours",
      address: "Address",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      available: "Available",
      unavailable: "Unavailable",
      atmCode: "ATM Code",
      manufacturer: "Manufacturer",
      model: "Model",
      serialNumber: "Serial Number",
      installationDate: "Installation Date",
      lastMaintenance: "Last Maintenance",
      allowsWithdrawal: "Allows Withdrawal",
      allowsDeposit: "Allows Deposit",
      yes: "Yes",
      no: "No",
      backToATMs: "Back to ATMs",
      noAtms: "This branch has no ATMs",
      serviceManagement: "Service Management",
      toggleService: "Toggle Service",
      atmManagement: "ATM Management",
      branchInformation: "Branch Information",
      statistics: "Statistics",
      totalServices: "Total Services",
      activeServices: "Active Services",
      totalATMs: "Total ATMs",
      activeATMs: "Active ATMs",
      civilRegistry: "Civil Registry",
      bank: "Bank",
      updateSuccess: "Updated successfully!",
      updateError: "Error updating. Please try again.",
      governorate: "Governorate",
      location: "Location",
    },
    ar: {
      dashboard: "لوحة تحكم مدير الفرع",
      welcome: "مرحباً",
      logout: "تسجيل الخروج",
      branchDetails: "تفاصيل الفرع",
      services: "الخدمات",
      atms: "أجهزة الصراف الآلي",
      atmDetails: "تفاصيل الصراف الآلي",
      edit: "تعديل",
      save: "حفظ",
      cancel: "إلغاء",
      update: "تحديث",
      branchCode: "كود الفرع",
      branchName: "اسم الفرع",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      workingHours: "ساعات العمل",
      address: "العنوان",
      status: "الحالة",
      active: "نشط",
      inactive: "غير نشط",
      available: "متاح",
      unavailable: "غير متاح",
      atmCode: "كود الجهاز",
      manufacturer: "الشركة المصنعة",
      model: "الموديل",
      serialNumber: "الرقم التسلسلي",
      installationDate: "تاريخ التركيب",
      lastMaintenance: "آخر صيانة",
      allowsWithdrawal: "يسمح بالسحب",
      allowsDeposit: "يسمح بالإيداع",
      yes: "نعم",
      no: "لا",
      backToATMs: "العودة للأجهزة",
      noAtms: "لا توجد أجهزة صراف في هذا الفرع",
      serviceManagement: "إدارة الخدمات",
      toggleService: "تبديل الخدمة",
      atmManagement: "إدارة أجهزة الصراف",
      branchInformation: "معلومات الفرع",
      statistics: "الإحصائيات",
      totalServices: "إجمالي الخدمات",
      activeServices: "الخدمات النشطة",
      totalATMs: "إجمالي الأجهزة",
      activeATMs: "الأجهزة النشطة",
      civilRegistry: "السجل المدني",
      bank: "بنك",
      updateSuccess: "تم التحديث بنجاح!",
      updateError: "خطأ في التحديث. حاول مرة أخرى.",
      governorate: "المحافظة",
      location: "الموقع",
    },
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userRole = localStorage.getItem("userRole");

      if (!token || userRole !== "3") {
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

      // Load simulation data
      const response = await fetch("/simulationData.json");
      const data = await response.json();

      // Get branch data
      const branch = data.branch.find((b) => b.branch_id === user.branch_id);
      if (!branch) {
        console.error("Branch not found");
        return;
      }

      // Get location data
      const location = data.location.find(
        (l) => l.location_id === branch.location_id,
      );
      const governorate = data.governorate.find(
        (g) => g.governorate_id === location.governorate_id,
      );

      setBranchData({ ...branch, location, governorate });
      setEditedBranch({ ...branch, location, governorate });

      // Get organization data
      const org = data.organization.find((o) => o.org_id === user.org_id);
      setOrganizationData(org);

      // Get all services
      const orgServices = data.services.filter(
        (s) =>
          s.service_category ===
          (org.org_type === "bank" ? "bank" : "civil_registry"),
      );
      setAllServices(orgServices);

      // Get branch services
      const branchSvcs = data.branchServices.filter(
        (bs) => bs.branch_id === user.branch_id,
      );
      setBranchServices(branchSvcs);

      // Get ATMs if bank
      if (org.org_type === "bank") {
        const branchAtms = data.atm.filter(
          (atm) => atm.branch_id === user.branch_id,
        );
        setAtms(branchAtms);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    router.push("/features/auth/admin-login");
  };

  const handleBranchUpdate = async () => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/branches/${branchData.branch_id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(editedBranch)
      // });

      setBranchData(editedBranch);
      setEditMode(false);
      alert(t[language].updateSuccess);
    } catch (error) {
      console.error("Error updating branch:", error);
      alert(t[language].updateError);
    }
  };

  const handleServiceToggle = async (serviceId) => {
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
          branch_id: branchData.branch_id,
          service_id: serviceId,
          isActive: true,
        };
        setBranchServices([...branchServices, newBranchService]);
      }

      // TODO: API call
      // await fetch(`/api/branch-services/${branchData.branch_id}/${serviceId}`, {
      //   method: 'PUT',
      //   body: JSON.stringify({ isActive: !isActive })
      // });
    } catch (error) {
      console.error("Error toggling service:", error);
      alert(t[language].updateError);
    }
  };

  const handleAtmUpdate = async () => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/atms/${selectedAtm.atm_id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(editedAtm)
      // });

      const updatedAtms = atms.map((atm) =>
        atm.atm_id === selectedAtm.atm_id ? editedAtm : atm,
      );
      setAtms(updatedAtms);
      setSelectedAtm(editedAtm);
      alert(t[language].updateSuccess);
    } catch (error) {
      console.error("Error updating ATM:", error);
      alert(t[language].updateError);
    }
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

  const getServiceStatus = (serviceId) => {
    const branchService = branchServices.find(
      (bs) => bs.service_id === serviceId,
    );
    return branchService ? branchService.isActive : false;
  };

  const activeServicesCount = branchServices.filter((bs) => bs.isActive).length;
  const activeAtmsCount = atms.filter((a) => a.isActive).length;

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
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: darkMode ? "white" : "rgba(54, 226, 123, 0.2)",
              }}
            >
              <span className="text-3xl">
                {/* {organizationData?.org_type === "bank" ? "🏦" : "📋"} */}
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
                  ? branchData?.branch_name_ar
                  : branchData?.branch_name_en}
              </h1>
              <p
                className="text-sm mb-1"
                style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
              >
                {t[language].welcome},{" "}
                {language === "ar" ? userData?.name_ar : userData?.name}
              </p>
              <div className="flex items-center gap-2">
                <p
                  className="text-xs px-3 py-1 rounded-full inline-block"
                  style={{
                    backgroundColor: "rgba(54, 226, 123, 0.15)",
                    color: "#36e27b",
                  }}
                >
                  {organizationData?.org_type === "bank"
                    ? t[language].bank
                    : t[language].civilRegistry}
                </p>
                <p
                  className="text-xs px-3 py-1 rounded-full inline-block"
                  style={{
                    backgroundColor: branchData?.isActive
                      ? "rgba(54, 226, 123, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                    color: branchData?.isActive ? "#36e27b" : "#ef4444",
                  }}
                >
                  {branchData?.isActive
                    ? t[language].active
                    : t[language].inactive}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: darkMode
                  ? "rgba(54, 226, 123, 0.15)"
                  : "rgba(54, 226, 123, 0.1)",
                color: "#36e27b",
              }}
            >
              {language === "en" ? "العربية" : "English"}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: darkMode
                  ? "rgba(54, 226, 123, 0.15)"
                  : "rgba(54, 226, 123, 0.1)",
                color: "#36e27b",
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title={t[language].totalServices}
          value={branchServices.length}
          icon="📋"
          darkMode={darkMode}
        />
        <StatCard
          title={t[language].activeServices}
          value={activeServicesCount}
          icon="✅"
          darkMode={darkMode}
        />
        {organizationData?.org_type === "bank" && (
          <>
            <StatCard
              title={t[language].totalATMs}
              value={atms.length}
              icon="🏧"
              darkMode={darkMode}
            />
            <StatCard
              title={t[language].activeATMs}
              value={activeAtmsCount}
              icon="🟢"
              darkMode={darkMode}
            />
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch Information */}
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
          {!selectedAtm ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "#36e27b" }}>
                  {t[language].branchInformation}
                </h2>
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
                    style={{
                      backgroundColor: "#36e27b",
                      color: "#0a0f0d",
                    }}
                  >
                    {t[language].edit}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleBranchUpdate}
                      className="px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
                      style={{
                        backgroundColor: "#36e27b",
                        color: "#0a0f0d",
                      }}
                    >
                      {t[language].save}
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditedBranch(branchData);
                      }}
                      className="px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
                      style={{
                        backgroundColor: "#ef4444",
                        color: "white",
                      }}
                    >
                      {t[language].cancel}
                    </button>
                  </div>
                )}
              </div>

              <div
                className="p-6 rounded-xl mb-6"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(54, 226, 123, 0.05)"
                    : "rgba(54, 226, 123, 0.08)",
                  border: "1px solid rgba(54, 226, 123, 0.2)",
                }}
              >
                {editMode ? (
                  <div className="space-y-4">
                    <EditField
                      label={t[language].branchName}
                      value={
                        language === "ar"
                          ? editedBranch?.branch_name_ar
                          : editedBranch?.branch_name_en
                      }
                      onChange={(value) =>
                        setEditedBranch({
                          ...editedBranch,
                          [language === "ar"
                            ? "branch_name_ar"
                            : "branch_name_en"]: value,
                        })
                      }
                      darkMode={darkMode}
                    />
                    <EditField
                      label={t[language].phone}
                      value={editedBranch?.phone}
                      onChange={(value) =>
                        setEditedBranch({ ...editedBranch, phone: value })
                      }
                      darkMode={darkMode}
                    />
                    <EditField
                      label={t[language].email}
                      value={editedBranch?.email}
                      onChange={(value) =>
                        setEditedBranch({ ...editedBranch, email: value })
                      }
                      darkMode={darkMode}
                    />
                    <EditField
                      label={t[language].workingHours}
                      value={editedBranch?.working_hours}
                      onChange={(value) =>
                        setEditedBranch({
                          ...editedBranch,
                          working_hours: value,
                        })
                      }
                      darkMode={darkMode}
                    />
                    <div className="flex items-center justify-between">
                      <span
                        className="font-semibold"
                        style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                      >
                        {t[language].status}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editedBranch?.isActive}
                          onChange={(e) =>
                            setEditedBranch({
                              ...editedBranch,
                              isActive: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                ) : (
                  <>
                    <DetailRow
                      label={t[language].branchCode}
                      value={branchData?.branch_code}
                      darkMode={darkMode}
                    />
                    <DetailRow
                      label={t[language].governorate}
                      value={
                        language === "ar"
                          ? branchData?.governorate?.governorate_name_ar
                          : branchData?.governorate?.governorate_name_en
                      }
                      darkMode={darkMode}
                    />
                    <DetailRow
                      label={t[language].address}
                      value={
                        language === "ar"
                          ? branchData?.location?.address_details_ar
                          : branchData?.location?.address_details_en
                      }
                      darkMode={darkMode}
                    />
                    <DetailRow
                      label={t[language].phone}
                      value={branchData?.phone}
                      darkMode={darkMode}
                    />
                    <DetailRow
                      label={t[language].email}
                      value={branchData?.email}
                      darkMode={darkMode}
                    />
                    <DetailRow
                      label={t[language].workingHours}
                      value={branchData?.working_hours}
                      darkMode={darkMode}
                    />
                    <DetailRow
                      label={t[language].status}
                      value={
                        branchData?.isActive
                          ? t[language].active
                          : t[language].inactive
                      }
                      darkMode={darkMode}
                      valueColor={branchData?.isActive ? "#36e27b" : "#ef4444"}
                    />
                  </>
                )}
              </div>

              {/* ATMs Section (only for banks) */}
              {organizationData?.org_type === "bank" && (
                <>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "#36e27b" }}
                  >
                    {t[language].atmManagement}
                  </h3>

                  {atms.length === 0 ? (
                    <div
                      className="text-center py-8"
                      style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                    >
                      {t[language].noAtms}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {atms.map((atm) => (
                        <button
                          key={atm.atm_id}
                          onClick={() => {
                            setSelectedAtm(atm);
                            setEditedAtm(atm);
                          }}
                          className="p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] text-left"
                          style={{
                            backgroundColor: darkMode
                              ? "rgba(54, 226, 123, 0.1)"
                              : "rgba(54, 226, 123, 0.08)",
                            border: "2px solid rgba(54, 226, 123, 0.3)",
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className="font-bold text-lg"
                              style={{
                                color: darkMode ? "#e0e0e0" : "#333333",
                              }}
                            >
                              {atm.atm_code}
                            </div>
                            <span
                              className="px-2 py-1 rounded-lg text-xs font-semibold"
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
                            </span>
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                          >
                            {atm.manufacturer} - {atm.model}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => setSelectedAtm(null)}
                className="mb-4 px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
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
                className="text-2xl font-bold mb-6"
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
                <div className="space-y-4">
                  <DetailRow
                    label={t[language].atmCode}
                    value={editedAtm?.atm_code}
                    darkMode={darkMode}
                  />
                  <DetailRow
                    label={t[language].manufacturer}
                    value={editedAtm?.manufacturer}
                    darkMode={darkMode}
                  />
                  <DetailRow
                    label={t[language].model}
                    value={editedAtm?.model}
                    darkMode={darkMode}
                  />
                  <DetailRow
                    label={t[language].serialNumber}
                    value={editedAtm?.serial_number}
                    darkMode={darkMode}
                  />
                  <DetailRow
                    label={t[language].installationDate}
                    value={new Date(
                      editedAtm?.installation_date,
                    ).toLocaleDateString()}
                    darkMode={darkMode}
                  />
                  <DetailRow
                    label={t[language].lastMaintenance}
                    value={new Date(
                      editedAtm?.last_maintenance,
                    ).toLocaleDateString()}
                    darkMode={darkMode}
                  />

                  <div
                    className="flex items-center justify-between pb-3 border-b"
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
                      {t[language].allowsWithdrawal}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editedAtm?.allows_withdrawal}
                        onChange={(e) =>
                          setEditedAtm({
                            ...editedAtm,
                            allows_withdrawal: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div
                    className="flex items-center justify-between pb-3 border-b"
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
                      {t[language].allowsDeposit}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editedAtm?.allows_deposit}
                        onChange={(e) =>
                          setEditedAtm({
                            ...editedAtm,
                            allows_deposit: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="font-semibold"
                      style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                    >
                      {t[language].status}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editedAtm?.isActive}
                        onChange={(e) =>
                          setEditedAtm({
                            ...editedAtm,
                            isActive: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <button
                    onClick={handleAtmUpdate}
                    className="mt-6 w-full px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                    style={{
                      backgroundColor: "#36e27b",
                      color: "#0a0f0d",
                    }}
                  >
                    {t[language].update}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Services Management */}
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
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#36e27b" }}>
            {t[language].serviceManagement}
          </h2>

          <div className="space-y-3">
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
                        className="font-bold text-lg mb-1"
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
                        onChange={() => handleServiceToggle(service.service_id)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              );
            })}
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
      className="p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
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
        {label}
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

function EditField({ label, value, onChange, darkMode }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-semibold text-sm"
        style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-xl transition-all focus:ring-2 focus:ring-green-500"
        style={{
          backgroundColor: darkMode
            ? "rgba(54, 226, 123, 0.1)"
            : "rgba(54, 226, 123, 0.05)",
          border: "1px solid rgba(54, 226, 123, 0.3)",
          color: darkMode ? "#e0e0e0" : "#333333",
        }}
      />
    </div>
  );
}
