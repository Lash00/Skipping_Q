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
  const [editedAtm, setEditedAtm] = useState(null);

  // Branch editing states
  const [editingBranch, setEditingBranch] = useState(false);
  const [editedBranch, setEditedBranch] = useState(null);

  // Password change states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Camera states
  const [cameraConfigs, setCameraConfigs] = useState([]);
  const [cameraViews, setCameraViews] = useState([]);
  const [viewTargets, setViewTargets] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [editingCamera, setEditingCamera] = useState(null);
  const [editedCameraConfig, setEditedCameraConfig] = useState(null);

  // Camera-Service mapping (only for non-bank)
  const [cameraServiceMappings, setCameraServiceMappings] = useState({});

  // Camera-ATM mapping (only for bank)
  const [cameraAtmMappings, setCameraAtmMappings] = useState({});

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
      cameraManagement: "Camera Management",
      cameras: "Cameras",
      edit: "Edit",
      save: "Save",
      cancel: "Cancel",
      update: "Update",
      branchCode: "Branch Code",
      branchName: "Branch Name",
      phone: "Phone",
      email: "Email",
      workingHours: "Working Hours",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      available: "Available",
      unavailable: "Unavailable",
      atmCode: "ATM Code",
      manufacturer: "Manufacturer",
      model: "Model",
      serialNumber: "Serial Number",
      allowsWithdrawal: "Allows Withdrawal",
      allowsDeposit: "Allows Deposit",
      yes: "Yes",
      no: "No",
      backToATMs: "Back to ATMs",
      backToCameras: "Back to Cameras",
      noAtms: "No ATMs found",
      noCameras: "No cameras configured",
      serviceManagement: "Service Management",
      atmManagement: "ATM Management",
      statistics: "Statistics",
      totalServices: "Total Services",
      activeServices: "Active Services",
      totalATMs: "Total ATMs",
      totalCameras: "Total Cameras",
      civilRegistry: "Civil Registry",
      bank: "Bank",
      updateSuccess: "Updated successfully!",
      updateError: "Update failed. Please try again.",
      cameraSystem: "Camera System",
      ipAddress: "IP Address",
      username: "Username",
      cameraViews: "Camera Views",
      waitingCount: "Queue",
      assignedServices: "Assigned Services",
      availableServices: "Available Services",
      removeService: "Remove",
      noServicesAssigned: "No services assigned",
      selectCamera: "Select a camera to manage",
      cameraDetails: "Camera Details",
      manageServices: "Manage Services",
      manageATMs: "Manage ATMs",
      assignedATMs: "Assigned ATMs",
      availableATMs: "Available ATMs",
      noATMsAssigned: "No ATMs assigned",
      distributeServices: "Auto-Distribute Services",
      servicesDistributed: "Services distributed across cameras",
      address: "Address",
      governorate: "Governorate",
      location: "Location",
      editBranch: "Edit Branch",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      passwordsDontMatch: "Passwords don't match",
      passwordTooShort: "Password must be at least 6 characters",
      fillAllFields: "Please fill all fields",
      passwordChanged: "Password changed successfully!",
      passwordChangeFailed:
        "Password change failed. Please check your current password.",
    },
    ar: {
      dashboard: "لوحة تحكم مدير الفرع",
      welcome: "مرحباً",
      logout: "تسجيل الخروج",
      branchDetails: "تفاصيل الفرع",
      services: "الخدمات",
      atms: "أجهزة الصراف الآلي",
      atmDetails: "تفاصيل الصراف الآلي",
      cameraManagement: "إدارة الكاميرات",
      cameras: "الكاميرات",
      edit: "تعديل",
      save: "حفظ",
      cancel: "إلغاء",
      update: "تحديث",
      branchCode: "كود الفرع",
      branchName: "اسم الفرع",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      workingHours: "ساعات العمل",
      status: "الحالة",
      active: "نشط",
      inactive: "غير نشط",
      available: "متاح",
      unavailable: "غير متاح",
      atmCode: "كود الجهاز",
      manufacturer: "الشركة المصنعة",
      model: "الموديل",
      serialNumber: "الرقم التسلسلي",
      allowsWithdrawal: "يسمح بالسحب",
      allowsDeposit: "يسمح بالإيداع",
      yes: "نعم",
      no: "لا",
      backToATMs: "العودة للأجهزة",
      backToCameras: "العودة للكاميرات",
      noAtms: "لا توجد أجهزة صراف",
      noCameras: "لا توجد كاميرات",
      serviceManagement: "إدارة الخدمات",
      atmManagement: "إدارة أجهزة الصراف",
      statistics: "الإحصائيات",
      totalServices: "إجمالي الخدمات",
      activeServices: "الخدمات النشطة",
      totalATMs: "إجمالي الأجهزة",
      totalCameras: "إجمالي الكاميرات",
      civilRegistry: "السجل المدني",
      bank: "بنك",
      updateSuccess: "تم التحديث بنجاح!",
      updateError: "فشل التحديث. حاول مرة أخرى.",
      cameraSystem: "نظام الكاميرات",
      ipAddress: "عنوان IP",
      username: "اسم المستخدم",
      cameraViews: "عروض الكاميرا",
      waitingCount: "الطابور",
      assignedServices: "الخدمات المعينة",
      availableServices: "الخدمات المتاحة",
      removeService: "إزالة",
      noServicesAssigned: "لا توجد خدمات معينة",
      selectCamera: "اختر كاميرا للإدارة",
      cameraDetails: "تفاصيل الكاميرا",
      manageServices: "إدارة الخدمات",
      manageATMs: "إدارة أجهزة الصراف",
      assignedATMs: "الأجهزة المعينة",
      availableATMs: "الأجهزة المتاحة",
      noATMsAssigned: "لا توجد أجهزة معينة",
      distributeServices: "توزيع الخدمات تلقائياً",
      servicesDistributed: "تم توزيع الخدمات على الكاميرات",
      address: "العنوان",
      governorate: "المحافظة",
      location: "الموقع",
      editBranch: "تعديل الفرع",
      changePassword: "تغيير كلمة المرور",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      passwordsDontMatch: "كلمات المرور غير متطابقة",
      passwordTooShort: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
      fillAllFields: "يرجى ملء جميع الحقول",
      passwordChanged: "تم تغيير كلمة المرور بنجاح!",
      passwordChangeFailed:
        "فشل تغيير كلمة المرور. تحقق من كلمة المرور الحالية.",
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

      const response = await fetch("/simulationData.json");
      const data = await response.json();

      const branch = data.branch.find((b) => b.branch_id === user.branch_id);
      if (!branch) {
        console.error("Branch not found");
        return;
      }

      const location = data.location.find(
        (l) => l.location_id === branch.location_id,
      );
      const governorate = data.governorate.find(
        (g) => g.governorate_id === location.governorate_id,
      );

      setBranchData({ ...branch, location, governorate });

      const org = data.organization.find((o) => o.org_id === user.org_id);
      setOrganizationData(org);

      const orgServices = data.services.filter(
        (s) =>
          s.service_category ===
          (org.org_type === "bank" ? "bank" : "civil_registry"),
      );
      setAllServices(orgServices);

      const branchSvcs = data.branchServices.filter(
        (bs) => bs.branch_id === user.branch_id,
      );
      setBranchServices(branchSvcs);

      if (org.org_type === "bank") {
        const branchAtms = data.atm.filter(
          (atm) => atm.branch_id === user.branch_id,
        );
        setAtms(branchAtms);
      }

      // Load camera configurations
      const branchCameraConfigs = data.cameraConfiguration.filter(
        (cc) => cc.branch_id === user.branch_id,
      );
      setCameraConfigs(branchCameraConfigs);
      setCameraViews(data.cameraView || []);
      setViewTargets(data.viewTarget || []);

      // Initialize mappings based on org type
      if (org.org_type === "bank") {
        // Bank: cameras monitor ATMs only
        const atmMappings = {};
        branchCameraConfigs.forEach((camera) => {
          atmMappings[camera.camera_config_id] = [];
        });
        setCameraAtmMappings(atmMappings);
      } else {
        // Civil Registry: cameras monitor services only
        const serviceMappings = {};
        branchCameraConfigs.forEach((camera, index) => {
          const servicesPerCamera = Math.ceil(
            orgServices.length / Math.max(branchCameraConfigs.length, 1),
          );
          const startIdx = index * servicesPerCamera;
          serviceMappings[camera.camera_config_id] = orgServices
            .slice(startIdx, startIdx + servicesPerCamera)
            .map((s) => s.service_id);
        });
        setCameraServiceMappings(serviceMappings);
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
      setBranchData(editedBranch);
      setEditingBranch(false);
      alert(t[language].updateSuccess);
    } catch (error) {
      console.error("Error updating branch:", error);
      alert(t[language].updateError);
    }
  };

  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert(t[language].fillAllFields);
      return;
    }

    if (newPassword.length < 6) {
      alert(t[language].passwordTooShort);
      return;
    }

    if (newPassword !== confirmPassword) {
      alert(t[language].passwordsDontMatch);
      return;
    }

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          user_id: userData.user_id,
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        alert(t[language].passwordChanged);
        setShowPasswordModal(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(t[language].passwordChangeFailed);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert(t[language].passwordChangeFailed);
    }
  };

  const handleAtmUpdate = async () => {
    try {
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

  const handleCameraUpdate = async () => {
    try {
      const updatedConfigs = cameraConfigs.map((cc) =>
        cc.camera_config_id === editedCameraConfig.camera_config_id
          ? editedCameraConfig
          : cc,
      );
      setCameraConfigs(updatedConfigs);
      setEditingCamera(null);
      alert(t[language].updateSuccess);
    } catch (error) {
      console.error("Error updating camera:", error);
      alert(t[language].updateError);
    }
  };

  const handleAssignService = (cameraId, serviceId) => {
    setCameraServiceMappings((prev) => ({
      ...prev,
      [cameraId]: [...(prev[cameraId] || []), serviceId],
    }));
  };

  const handleRemoveService = (cameraId, serviceId) => {
    setCameraServiceMappings((prev) => ({
      ...prev,
      [cameraId]: (prev[cameraId] || []).filter((id) => id !== serviceId),
    }));
  };

  const handleAssignATM = (cameraId, atmId) => {
    setCameraAtmMappings((prev) => ({
      ...prev,
      [cameraId]: [...(prev[cameraId] || []), atmId],
    }));
  };

  const handleRemoveATM = (cameraId, atmId) => {
    setCameraAtmMappings((prev) => ({
      ...prev,
      [cameraId]: (prev[cameraId] || []).filter((id) => id !== atmId),
    }));
  };

  const handleDistributeServices = () => {
    if (cameraConfigs.length === 0 || organizationData?.org_type === "bank")
      return;

    const newMappings = {};
    const servicesPerCamera = Math.ceil(
      allServices.length / cameraConfigs.length,
    );

    cameraConfigs.forEach((camera, index) => {
      const startIdx = index * servicesPerCamera;
      newMappings[camera.camera_config_id] = allServices
        .slice(startIdx, startIdx + servicesPerCamera)
        .map((s) => s.service_id);
    });

    setCameraServiceMappings((prev) => ({ ...prev, ...newMappings }));
    alert(t[language].servicesDistributed);
  };

  const isBank = organizationData?.org_type === "bank";

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: darkMode ? "#0a0f0d" : "#f8fafb",
        }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-[#36e27b] border-r-transparent border-b-[#36e27b] border-l-transparent mb-3"></div>
          <div className="text-xl font-bold" style={{ color: "#36e27b" }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

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
        className="rounded-2xl p-5 mb-6 shadow-lg border"
        style={{
          background: darkMode
            ? "rgba(17, 23, 20, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          borderColor: darkMode
            ? "rgba(54, 226, 123, 0.2)"
            : "rgba(54, 226, 123, 0.15)",
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{
                background: darkMode
                  ? "white"
                  : "linear-gradient(135deg, #d7ffe7 0%, #95ffc3 100%)",
                // background: "black",
              }}
            >
              {/* <span className="text-3xl">🏪</span> */}
              <img
                src="/logo-removebg-preview.png"
                alt="logo"
                className="logo"
                style={{ width: "100px" }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#36e27b" }}>
                {language === "ar"
                  ? branchData?.branch_name_ar
                  : branchData?.branch_name_en}
              </h1>
              <p
                className="text-sm"
                style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
              >
                {t[language].welcome},{" "}
                <span className="font-semibold">
                  {language === "ar" ? userData?.name_ar : userData?.name}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(54, 226, 123, 0.15)",
                color: "#36e27b",
                border: "1px solid rgba(54, 226, 123, 0.3)",
              }}
            >
              🔒
            </button>

            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(54, 226, 123, 0.15)",
                color: "#36e27b",
                border: "1px solid rgba(54, 226, 123, 0.3)",
              }}
            >
              {language === "en" ? "ع" : "EN"}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(54, 226, 123, 0.15)",
                color: "#36e27b",
                border: "1px solid rgba(54, 226, 123, 0.3)",
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "white",
              }}
            >
              {t[language].logout}
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {!isBank && (
          <>
            <StatCard
              title={t[language].totalServices}
              value={branchServices.length}
              darkMode={darkMode}
            />
            <StatCard
              title={t[language].activeServices}
              value={activeServicesCount}
              darkMode={darkMode}
            />
          </>
        )}
        {isBank && (
          <>
            <StatCard
              title={t[language].totalATMs}
              value={atms.length}
              darkMode={darkMode}
            />
            <StatCard
              title={t[language].active + " " + t[language].atms}
              value={activeAtmsCount}
              darkMode={darkMode}
            />
          </>
        )}
        <StatCard
          title={t[language].totalCameras}
          value={cameraConfigs.length}
          darkMode={darkMode}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div
          className="lg:col-span-2 rounded-2xl p-5 shadow-lg border"
          style={{
            background: darkMode
              ? "rgba(17, 23, 20, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            borderColor: darkMode
              ? "rgba(54, 226, 123, 0.2)"
              : "rgba(54, 226, 123, 0.15)",
          }}
        >
          {!selectedCamera && !selectedAtm && (
            <>
              {/* Branch Details Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: "#36e27b" }}
                  >
                    {t[language].branchDetails}
                  </h2>
                  {!editingBranch ? (
                    <button
                      onClick={() => {
                        setEditingBranch(true);
                        setEditedBranch({ ...branchData });
                      }}
                      className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                        color: "white",
                      }}
                    >
                      {t[language].edit}
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleBranchUpdate}
                        className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                        style={{
                          background:
                            "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                          color: "white",
                        }}
                      >
                        {t[language].save}
                      </button>
                      <button
                        onClick={() => {
                          setEditingBranch(false);
                          setEditedBranch(null);
                        }}
                        className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                        style={{
                          background:
                            "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                          color: "white",
                        }}
                      >
                        {t[language].cancel}
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(54, 226, 123, 0.05)",
                    border: "1px solid rgba(54, 226, 123, 0.2)",
                  }}
                >
                  {editingBranch ? (
                    <div className="space-y-3">
                      <EditField
                        label={t[language].branchName + " (EN)"}
                        value={editedBranch.branch_name_en}
                        onChange={(value) =>
                          setEditedBranch({
                            ...editedBranch,
                            branch_name_en: value,
                          })
                        }
                        darkMode={darkMode}
                      />
                      <EditField
                        label={t[language].branchName + " (AR)"}
                        value={editedBranch.branch_name_ar}
                        onChange={(value) =>
                          setEditedBranch({
                            ...editedBranch,
                            branch_name_ar: value,
                          })
                        }
                        darkMode={darkMode}
                      />
                      <EditField
                        label={t[language].phone}
                        value={editedBranch.phone}
                        onChange={(value) =>
                          setEditedBranch({ ...editedBranch, phone: value })
                        }
                        darkMode={darkMode}
                      />
                      <EditField
                        label={t[language].email}
                        value={editedBranch.email}
                        onChange={(value) =>
                          setEditedBranch({ ...editedBranch, email: value })
                        }
                        darkMode={darkMode}
                      />
                      <EditField
                        label={t[language].workingHours}
                        value={editedBranch.working_hours}
                        onChange={(value) =>
                          setEditedBranch({
                            ...editedBranch,
                            working_hours: value,
                          })
                        }
                        darkMode={darkMode}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <DetailRow
                        label={t[language].branchCode}
                        value={branchData?.branch_code}
                        darkMode={darkMode}
                      />
                      <DetailRow
                        label={t[language].branchName}
                        value={
                          language === "ar"
                            ? branchData?.branch_name_ar
                            : branchData?.branch_name_en
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
                        label={t[language].governorate}
                        value={
                          language === "ar"
                            ? branchData?.governorate?.governorate_name_ar
                            : branchData?.governorate?.governorate_name_en
                        }
                        darkMode={darkMode}
                      />
                      <DetailRow
                        label={t[language].location}
                        value={
                          language === "ar"
                            ? branchData?.location?.location_name_ar
                            : branchData?.location?.location_name_en
                        }
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
                        valueColor={
                          branchData?.isActive ? "#36e27b" : "#ef4444"
                        }
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Cameras Section */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold" style={{ color: "#36e27b" }}>
                  {t[language].cameras}
                </h2>
                {!isBank && (
                  <button
                    onClick={handleDistributeServices}
                    className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105 text-sm"
                    style={{
                      background: "rgba(54, 226, 123, 0.15)",
                      color: "#36e27b",
                      border: "1px solid rgba(54, 226, 123, 0.3)",
                    }}
                  >
                    {t[language].distributeServices}
                  </button>
                )}
              </div>

              {cameraConfigs.length === 0 ? (
                <div
                  className="text-center py-12 mb-8"
                  style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                >
                  <div className="text-5xl mb-3">📹</div>
                  <div className="text-lg">{t[language].noCameras}</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {cameraConfigs.map((camera, index) => {
                    const configViews = cameraViews.filter(
                      (cv) => cv.camera_config_id === camera.camera_config_id,
                    );
                    const assignedServices = !isBank
                      ? cameraServiceMappings[camera.camera_config_id] || []
                      : [];
                    const assignedATMs = isBank
                      ? cameraAtmMappings[camera.camera_config_id] || []
                      : [];

                    return (
                      <button
                        key={camera.camera_config_id}
                        onClick={() => setSelectedCamera(camera)}
                        className="p-4 rounded-xl transition-all hover:scale-105 text-left"
                        style={{
                          background: "rgba(54, 226, 123, 0.1)",
                          border: "1px solid rgba(54, 226, 123, 0.3)",
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{
                                background:
                                  "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                              }}
                            >
                              <span className="text-xl">📹</span>
                            </div>
                            <div>
                              <div
                                className="font-bold"
                                style={{
                                  color: darkMode ? "#e0e0e0" : "#333333",
                                }}
                              >
                                {t[language].cameraSystem} {index + 1}
                              </div>
                              <div
                                className="text-xs"
                                style={{
                                  color: darkMode ? "#a0a0a0" : "#666666",
                                }}
                              >
                                {camera.ipAddress}
                              </div>
                            </div>
                          </div>
                          <div
                            className="px-2 py-1 rounded-lg text-xs font-bold"
                            style={{
                              background: camera.isActive
                                ? "rgba(54, 226, 123, 0.2)"
                                : "rgba(239, 68, 68, 0.2)",
                              color: camera.isActive ? "#36e27b" : "#ef4444",
                            }}
                          >
                            {camera.isActive
                              ? t[language].active
                              : t[language].inactive}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div
                            className="p-2 rounded-lg text-center"
                            style={{
                              background: darkMode
                                ? "rgba(0, 0, 0, 0.2)"
                                : "rgba(255, 255, 255, 0.5)",
                            }}
                          >
                            <div
                              className="text-xs"
                              style={{
                                color: darkMode ? "#a0a0a0" : "#666666",
                              }}
                            >
                              Views
                            </div>
                            <div
                              className="text-lg font-bold"
                              style={{ color: "#36e27b" }}
                            >
                              {configViews.length}
                            </div>
                          </div>
                          {!isBank && (
                            <div
                              className="p-2 rounded-lg text-center"
                              style={{
                                background: darkMode
                                  ? "rgba(0, 0, 0, 0.2)"
                                  : "rgba(255, 255, 255, 0.5)",
                              }}
                            >
                              <div
                                className="text-xs"
                                style={{
                                  color: darkMode ? "#a0a0a0" : "#666666",
                                }}
                              >
                                Services
                              </div>
                              <div
                                className="text-lg font-bold"
                                style={{ color: "#36e27b" }}
                              >
                                {assignedServices.length}
                              </div>
                            </div>
                          )}
                          {isBank && (
                            <div
                              className="p-2 rounded-lg text-center"
                              style={{
                                background: darkMode
                                  ? "rgba(0, 0, 0, 0.2)"
                                  : "rgba(255, 255, 255, 0.5)",
                              }}
                            >
                              <div
                                className="text-xs"
                                style={{
                                  color: darkMode ? "#a0a0a0" : "#666666",
                                }}
                              >
                                ATMs
                              </div>
                              <div
                                className="text-lg font-bold"
                                style={{ color: "#36e27b" }}
                              >
                                {assignedATMs.length}
                              </div>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ATMs Section (Bank Only) */}
              {isBank && (
                <>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "#36e27b" }}
                  >
                    {t[language].atmManagement}
                  </h3>

                  {atms.length === 0 ? (
                    <div
                      className="text-center py-10"
                      style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                    >
                      <div className="text-4xl mb-2">🏧</div>
                      <div className="text-base">{t[language].noAtms}</div>
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
                          className="p-4 rounded-xl transition-all hover:scale-105 text-left"
                          style={{
                            background: "rgba(54, 226, 123, 0.1)",
                            border: "1px solid rgba(54, 226, 123, 0.3)",
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className="font-bold text-base"
                              style={{
                                color: darkMode ? "#e0e0e0" : "#333333",
                              }}
                            >
                              {atm.atm_code}
                            </div>
                            <span
                              className="px-2 py-1 rounded-lg text-xs font-bold"
                              style={{
                                background: atm.isActive
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
          )}

          {selectedCamera && (
            <>
              <button
                onClick={() => {
                  setSelectedCamera(null);
                  setEditingCamera(null);
                }}
                className="mb-4 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: "rgba(54, 226, 123, 0.15)",
                  color: "#36e27b",
                  border: "1px solid rgba(54, 226, 123, 0.3)",
                }}
              >
                ← {t[language].backToCameras}
              </button>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold" style={{ color: "#36e27b" }}>
                  {t[language].cameraDetails}
                </h2>
                {!editingCamera ? (
                  <button
                    onClick={() => {
                      setEditingCamera(selectedCamera.camera_config_id);
                      setEditedCameraConfig({ ...selectedCamera });
                    }}
                    className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                      color: "white",
                    }}
                  >
                    {t[language].edit}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCameraUpdate}
                      className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                        color: "white",
                      }}
                    >
                      {t[language].save}
                    </button>
                    <button
                      onClick={() => {
                        setEditingCamera(null);
                        setEditedCameraConfig(null);
                      }}
                      className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                        color: "white",
                      }}
                    >
                      {t[language].cancel}
                    </button>
                  </div>
                )}
              </div>

              <div
                className="p-4 rounded-xl mb-4"
                style={{
                  background: "rgba(54, 226, 123, 0.05)",
                  border: "1px solid rgba(54, 226, 123, 0.2)",
                }}
              >
                {editingCamera ? (
                  <div className="space-y-3">
                    <EditField
                      label={t[language].ipAddress}
                      value={editedCameraConfig.ipAddress}
                      onChange={(value) =>
                        setEditedCameraConfig({
                          ...editedCameraConfig,
                          ipAddress: value,
                        })
                      }
                      darkMode={darkMode}
                    />
                    <EditField
                      label={t[language].username}
                      value={editedCameraConfig.username}
                      onChange={(value) =>
                        setEditedCameraConfig({
                          ...editedCameraConfig,
                          username: value,
                        })
                      }
                      darkMode={darkMode}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <DetailRow
                      label={t[language].ipAddress}
                      value={selectedCamera.ipAddress}
                      darkMode={darkMode}
                    />
                    <DetailRow
                      label={t[language].username}
                      value={selectedCamera.username}
                      darkMode={darkMode}
                    />
                    <DetailRow
                      label={t[language].status}
                      value={
                        selectedCamera.isActive
                          ? t[language].active
                          : t[language].inactive
                      }
                      darkMode={darkMode}
                      valueColor={
                        selectedCamera.isActive ? "#36e27b" : "#ef4444"
                      }
                    />
                  </div>
                )}
              </div>

              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "#36e27b" }}
              >
                {t[language].cameraViews}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {cameraViews
                  .filter(
                    (cv) =>
                      cv.camera_config_id === selectedCamera.camera_config_id,
                  )
                  .map((view) => {
                    const target = viewTargets.find(
                      (vt) => vt.target_id === view.target_id,
                    );
                    return (
                      <div
                        key={view.camera_view_id}
                        className="p-3 rounded-xl"
                        style={{
                          background: darkMode
                            ? "rgba(0, 0, 0, 0.3)"
                            : "rgba(255, 255, 255, 0.7)",
                          border: "1px solid rgba(54, 226, 123, 0.2)",
                        }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className="font-bold text-sm"
                            style={{ color: "#36e27b" }}
                          >
                            {target?.target_name || `Ch ${view.channel_number}`}
                          </span>
                          <span
                            className="text-xs px-2 py-1 rounded-lg font-bold"
                            style={{
                              background: view.isActive
                                ? "rgba(54, 226, 123, 0.2)"
                                : "rgba(239, 68, 68, 0.2)",
                              color: view.isActive ? "#36e27b" : "#ef4444",
                            }}
                          >
                            {view.isActive
                              ? t[language].active
                              : t[language].inactive}
                          </span>
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                        >
                          {t[language].waitingCount}:{" "}
                          {view.waitingPeopleCount || 0}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          )}

          {selectedAtm && (
            <>
              <button
                onClick={() => setSelectedAtm(null)}
                className="mb-4 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: "rgba(54, 226, 123, 0.15)",
                  color: "#36e27b",
                  border: "1px solid rgba(54, 226, 123, 0.3)",
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
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(54, 226, 123, 0.05)",
                  border: "1px solid rgba(54, 226, 123, 0.2)",
                }}
              >
                <div className="space-y-2 mb-4">
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
                </div>

                <div
                  className="flex items-center justify-between py-3 border-t border-b border-opacity-20 mb-3"
                  style={{ borderColor: "#36e27b" }}
                >
                  <span
                    className="font-bold text-sm"
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
                    <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#36e27b] peer-checked:to-[#2bc46d]"></div>
                  </label>
                </div>

                <div
                  className="flex items-center justify-between py-3 border-b border-opacity-20 mb-4"
                  style={{ borderColor: "#36e27b" }}
                >
                  <span
                    className="font-bold text-sm"
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
                    <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#36e27b] peer-checked:to-[#2bc46d]"></div>
                  </label>
                </div>

                <button
                  onClick={handleAtmUpdate}
                  className="w-full px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                    color: "white",
                  }}
                >
                  {t[language].update}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Service OR ATM Management (based on org type) */}
        <div
          className="rounded-2xl p-5 shadow-lg border max-h-[800px] overflow-y-auto"
          style={{
            background: darkMode
              ? "rgba(17, 23, 20, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            borderColor: darkMode
              ? "rgba(54, 226, 123, 0.2)"
              : "rgba(54, 226, 123, 0.15)",
          }}
        >
          <h2 className="text-2xl font-bold mb-5" style={{ color: "#36e27b" }}>
            {isBank ? t[language].manageATMs : t[language].manageServices}
          </h2>

          {!selectedCamera ? (
            <div
              className="text-center py-12"
              style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
            >
              <div className="text-5xl mb-3">🎯</div>
              <div className="text-lg">{t[language].selectCamera}</div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Services Management (Non-Bank Only) */}
              {!isBank && (
                <>
                  <div>
                    <h3
                      className="text-lg font-bold mb-3"
                      style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                    >
                      ✅ {t[language].assignedServices}
                    </h3>
                    <div className="space-y-2">
                      {(
                        cameraServiceMappings[
                          selectedCamera.camera_config_id
                        ] || []
                      ).length === 0 ? (
                        <div
                          className="text-center py-6 rounded-xl"
                          style={{
                            background: darkMode
                              ? "rgba(0, 0, 0, 0.2)"
                              : "rgba(255, 255, 255, 0.5)",
                            color: darkMode ? "#a0a0a0" : "#666666",
                          }}
                        >
                          {t[language].noServicesAssigned}
                        </div>
                      ) : (
                        (
                          cameraServiceMappings[
                            selectedCamera.camera_config_id
                          ] || []
                        ).map((serviceId) => {
                          const service = allServices.find(
                            (s) => s.service_id === serviceId,
                          );
                          if (!service) return null;

                          return (
                            <div
                              key={serviceId}
                              className="p-3 rounded-xl transition-all hover:scale-[1.02]"
                              style={{
                                background: "rgba(54, 226, 123, 0.1)",
                                border: "1px solid rgba(54, 226, 123, 0.3)",
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div
                                    className="font-bold text-sm"
                                    style={{
                                      color: darkMode ? "#e0e0e0" : "#333333",
                                    }}
                                  >
                                    {language === "ar"
                                      ? service.service_name_ar
                                      : service.service_name_en}
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    handleRemoveService(
                                      selectedCamera.camera_config_id,
                                      serviceId,
                                    )
                                  }
                                  className="px-3 py-1 rounded-lg font-bold transition-all hover:scale-105 text-sm"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                                    color: "white",
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div>
                    <h3
                      className="text-lg font-bold mb-3"
                      style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                    >
                      ➕ {t[language].availableServices}
                    </h3>
                    <div className="space-y-2">
                      {allServices
                        .filter(
                          (service) =>
                            !(
                              cameraServiceMappings[
                                selectedCamera.camera_config_id
                              ] || []
                            ).includes(service.service_id),
                        )
                        .map((service) => (
                          <div
                            key={service.service_id}
                            className="p-3 rounded-xl transition-all hover:scale-[1.02]"
                            style={{
                              background: "rgba(128, 128, 128, 0.1)",
                              border: "1px solid rgba(128, 128, 128, 0.3)",
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div
                                  className="font-bold text-sm"
                                  style={{
                                    color: darkMode ? "#e0e0e0" : "#333333",
                                  }}
                                >
                                  {language === "ar"
                                    ? service.service_name_ar
                                    : service.service_name_en}
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleAssignService(
                                    selectedCamera.camera_config_id,
                                    service.service_id,
                                  )
                                }
                                className="px-3 py-1 rounded-lg font-bold transition-all hover:scale-105 text-sm"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                                  color: "white",
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}

              {/* ATM Management (Bank Only) */}
              {isBank && atms.length > 0 && (
                <>
                  <div>
                    <h3
                      className="text-lg font-bold mb-3"
                      style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                    >
                      🏧 {t[language].assignedATMs}
                    </h3>
                    <div className="space-y-2">
                      {(
                        cameraAtmMappings[selectedCamera.camera_config_id] || []
                      ).length === 0 ? (
                        <div
                          className="text-center py-6 rounded-xl"
                          style={{
                            background: darkMode
                              ? "rgba(0, 0, 0, 0.2)"
                              : "rgba(255, 255, 255, 0.5)",
                            color: darkMode ? "#a0a0a0" : "#666666",
                          }}
                        >
                          {t[language].noATMsAssigned}
                        </div>
                      ) : (
                        (
                          cameraAtmMappings[selectedCamera.camera_config_id] ||
                          []
                        ).map((atmId) => {
                          const atm = atms.find((a) => a.atm_id === atmId);
                          if (!atm) return null;

                          return (
                            <div
                              key={atmId}
                              className="p-3 rounded-xl transition-all hover:scale-[1.02]"
                              style={{
                                background: "rgba(54, 226, 123, 0.1)",
                                border: "1px solid rgba(54, 226, 123, 0.3)",
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div
                                    className="font-bold text-sm"
                                    style={{
                                      color: darkMode ? "#e0e0e0" : "#333333",
                                    }}
                                  >
                                    {atm.atm_code}
                                  </div>
                                  <div
                                    className="text-xs"
                                    style={{
                                      color: darkMode ? "#a0a0a0" : "#666666",
                                    }}
                                  >
                                    {atm.manufacturer} - {atm.model}
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    handleRemoveATM(
                                      selectedCamera.camera_config_id,
                                      atmId,
                                    )
                                  }
                                  className="px-3 py-1 rounded-lg font-bold transition-all hover:scale-105 text-sm"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                                    color: "white",
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div>
                    <h3
                      className="text-lg font-bold mb-3"
                      style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                    >
                      ➕ {t[language].availableATMs}
                    </h3>
                    <div className="space-y-2">
                      {atms
                        .filter(
                          (atm) =>
                            !(
                              cameraAtmMappings[
                                selectedCamera.camera_config_id
                              ] || []
                            ).includes(atm.atm_id),
                        )
                        .map((atm) => (
                          <div
                            key={atm.atm_id}
                            className="p-3 rounded-xl transition-all hover:scale-[1.02]"
                            style={{
                              background: "rgba(128, 128, 128, 0.1)",
                              border: "1px solid rgba(128, 128, 128, 0.3)",
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div
                                  className="font-bold text-sm"
                                  style={{
                                    color: darkMode ? "#e0e0e0" : "#333333",
                                  }}
                                >
                                  {atm.atm_code}
                                </div>
                                <div
                                  className="text-xs"
                                  style={{
                                    color: darkMode ? "#a0a0a0" : "#666666",
                                  }}
                                >
                                  {atm.manufacturer} - {atm.model}
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleAssignATM(
                                    selectedCamera.camera_config_id,
                                    atm.atm_id,
                                  )
                                }
                                className="px-3 py-1 rounded-lg font-bold transition-all hover:scale-105 text-sm"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                                  color: "white",
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            style={{
              background: darkMode
                ? "rgba(17, 23, 20, 0.98)"
                : "rgba(255, 255, 255, 0.98)",
              border: darkMode
                ? "2px solid rgba(54, 226, 123, 0.3)"
                : "2px solid rgba(54, 226, 123, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold" style={{ color: "#36e27b" }}>
                {t[language].changePassword}
              </h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-2xl font-bold transition-all hover:scale-110"
                style={{ color: "#ef4444" }}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-bold mb-2"
                  style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                >
                  {t[language].currentPassword}
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl transition-all focus:ring-2 focus:ring-green-300 font-semibold"
                  style={{
                    background: "rgba(54, 226, 123, 0.1)",
                    border: "1px solid rgba(54, 226, 123, 0.3)",
                    color: darkMode ? "#e0e0e0" : "#333333",
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-bold mb-2"
                  style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                >
                  {t[language].newPassword}
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl transition-all focus:ring-2 focus:ring-green-300 font-semibold"
                  style={{
                    background: "rgba(54, 226, 123, 0.1)",
                    border: "1px solid rgba(54, 226, 123, 0.3)",
                    color: darkMode ? "#e0e0e0" : "#333333",
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-bold mb-2"
                  style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                >
                  {t[language].confirmPassword}
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl transition-all focus:ring-2 focus:ring-green-300 font-semibold"
                  style={{
                    background: "rgba(54, 226, 123, 0.1)",
                    border: "1px solid rgba(54, 226, 123, 0.3)",
                    color: darkMode ? "#e0e0e0" : "#333333",
                  }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                    color: "white",
                  }}
                >
                  {t[language].save}
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className="flex-1 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "white",
                  }}
                >
                  {t[language].cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function StatCard({ title, value, darkMode }) {
  return (
    <div
      className="p-4 rounded-xl shadow-lg transition-all hover:scale-105 border"
      style={{
        background: darkMode
          ? "rgba(17, 23, 20, 0.95)"
          : "rgba(255, 255, 255, 0.95)",
        borderColor: darkMode
          ? "rgba(54, 226, 123, 0.2)"
          : "rgba(54, 226, 123, 0.15)",
      }}
    >
      <p
        className="text-xs mb-1 font-semibold"
        style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
      >
        {title}
      </p>
      <p className="text-3xl font-bold" style={{ color: "#36e27b" }}>
        {value}
      </p>
    </div>
  );
}

function DetailRow({ label, value, darkMode, valueColor }) {
  return (
    <div
      className="flex justify-between items-center py-2 border-b border-opacity-20"
      style={{ borderColor: "#36e27b" }}
    >
      <span
        className="text-sm font-semibold"
        style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
      >
        {label}
      </span>
      <span
        className="text-sm font-bold"
        style={{ color: valueColor || "#36e27b" }}
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
        className="text-sm font-bold"
        style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-lg transition-all focus:ring-2 focus:ring-green-300 font-semibold"
        style={{
          background: "rgba(54, 226, 123, 0.1)",
          border: "1px solid rgba(54, 226, 123, 0.3)",
          color: darkMode ? "#e0e0e0" : "#333333",
        }}
      />
    </div>
  );
}
