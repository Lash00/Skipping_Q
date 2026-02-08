"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrganizationAdminDashboard() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("isDark") ?? false);
  });
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
  const [editedAtm, setEditedAtm] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [branchServices, setBranchServices] = useState([]);

  // Camera states
  const [cameraConfigs, setCameraConfigs] = useState([]);
  const [cameraViews, setCameraViews] = useState([]);
  const [viewTargets, setViewTargets] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [editingCamera, setEditingCamera] = useState(null);
  const [editedCameraConfig, setEditedCameraConfig] = useState(null);

  // ATM management for cameras
  const [cameraAtmMappings, setCameraAtmMappings] = useState({});

  // Camera-Service mapping
  const [cameraServiceMappings, setCameraServiceMappings] = useState({});

  // Branch editing
  const [editingBranch, setEditingBranch] = useState(false);
  const [editedBranch, setEditedBranch] = useState(null);

  // Branch Manager Creation
  // const [showCreateManager, setShowCreateManager] = useState(false);
  // const [newManager, setNewManager] = useState({
  //   name: "",
  //   name_ar: "",
  //   email: "",
  //   password: "",
  //   branch_id: null,
  // });

  const [showCreateManager, setShowCreateManager] = useState(false);
  const [creationMode, setCreationMode] = useState("single"); // "single" or "bulk"

  // Single user creation
  const [newManager, setNewManager] = useState({
    name: "",
    name_ar: "",
    email: "",
    password: "",
    governorate_id: null,
    branch_id: null,
  });

  // Bulk upload states
  const [excelFile, setExcelFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState(null);

  // Filtered branches for selected governorate
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [allBranches, setAllBranches] = useState([]);

  // Translation object
  // Translation object - ENHANCED (Replace lines 52-134)
  const t = {
    en: {
      dashboard: "Organization Dashboard",
      welcome: "Welcome",
      logout: "Logout",
      selectGovernorate: "Select Governorate",
      branches: "Branches",
      branchDetails: "Branch Details",
      branchSettings: "Branch Settings",
      cameraManagement: "Camera Management",
      cameras: "Cameras",
      statistics: "Statistics",
      totalBranches: "Total Branches",
      totalATMs: "Total ATMs",
      services: "Services",
      serviceManagement: "Service Management",
      available: "Available",
      unavailable: "Unavailable",
      totalServices: "Total Services",
      activeServices: "Active Services",
      totalCameras: "Total Cameras",
      atmCode: "ATM Code",
      status: "Status",
      active: "Active",
      inactive: "Inactive",
      update: "Update",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      branchCode: "Branch Code",
      phone: "Phone",
      email: "Email",
      workingHours: "Working Hours",
      address: "Address",
      backToBranches: "Back to Branches",
      backToGovernorates: "Back to Governorates",
      backToCameras: "Back to Cameras",
      backToATMs: "Back to ATMs",
      noBranches: "No branches found",
      noCameras: "No cameras configured",
      civilRegistry: "Civil Registry",
      bank: "Bank",
      cameraSystem: "Camera System",
      ipAddress: "IP Address",
      username: "Username",
      cameraViews: "Camera Views",
      waitingCount: "Queue",
      updateSuccess: "Updated successfully!",
      updateError: "Update failed. Please try again.",
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
      branchName: "Branch Name",
      distributeServices: "Auto-Distribute Services",
      servicesDistributed: "Services distributed across cameras",
      atmManagement: "ATM Management",
      createBranchManager: "Create Branch Manager",
      managerName: "Manager Name",
      managerNameAr: "Manager Name (Arabic)",
      password: "Password",
      selectBranch: "Select Branch",
      create: "Create",
      atmDetails: "ATM Details",
      manufacturer: "Manufacturer",
      model: "Model",
      serialNumber: "Serial Number",
      allowsWithdrawal: "Allows Withdrawal",
      allowsDeposit: "Allows Deposit",
      yes: "Yes",
      no: "No",
      managerCreated: "Branch Manager created successfully!",
      managerError: "Failed to create Branch Manager",
      // NEW TRANSLATIONS
      singleUser: "Single User",
      bulkUpload: "Bulk Upload",
      uploadExcel: "Upload Excel File",
      downloadTemplate: "Download Template",
      dragDropExcel: "Drag & drop Excel file here or click to browse",
      processing: "Processing...",
      uploadSuccess: "Upload successful!",
      uploadFailed: "Upload failed",
      created: "Created",
      failed: "Failed",
      total: "Total",
      selectGovernorateFirst: "Select governorate first",
      noBranchesInGovernorate: "No branches in this governorate",
    },
    ar: {
      dashboard: "لوحة التحكم الرئيسية",
      welcome: "مرحباً",
      logout: "تسجيل الخروج",
      selectGovernorate: "اختر المحافظة",
      branches: "الفروع",
      branchDetails: "تفاصيل الفرع",
      branchSettings: "إعدادات الفرع",
      cameraManagement: "إدارة الكاميرات",
      cameras: "الكاميرات",
      statistics: "الإحصائيات",
      totalBranches: "إجمالي الفروع",
      totalATMs: "إجمالي أجهزة الصراف",
      services: "الخدمات",
      serviceManagement: "إدارة الخدمات",
      available: "متاح",
      unavailable: "غير متاح",
      totalServices: "إجمالي الخدمات",
      activeServices: "الخدمات النشطة",
      totalCameras: "إجمالي الكاميرات",
      atmCode: "كود الجهاز",
      status: "الحالة",
      active: "نشط",
      inactive: "غير نشط",
      update: "تحديث",
      save: "حفظ",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      add: "إضافة",
      branchCode: "كود الفرع",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      workingHours: "ساعات العمل",
      address: "العنوان",
      backToBranches: "العودة للفروع",
      backToGovernorates: "العودة للمحافظات",
      backToCameras: "العودة للكاميرات",
      backToATMs: "العودة للأجهزة",
      noBranches: "لا توجد فروع",
      noCameras: "لا توجد كاميرات",
      civilRegistry: "السجل المدني",
      bank: "بنك",
      cameraSystem: "نظام الكاميرات",
      ipAddress: "عنوان IP",
      username: "اسم المستخدم",
      cameraViews: "عروض الكاميرا",
      waitingCount: "الطابور",
      updateSuccess: "تم التحديث بنجاح!",
      updateError: "فشل التحديث. حاول مرة أخرى.",
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
      branchName: "اسم الفرع",
      distributeServices: "توزيع الخدمات تلقائياً",
      servicesDistributed: "تم توزيع الخدمات على الكاميرات",
      atmManagement: "إدارة أجهزة الصراف",
      createBranchManager: "إنشاء مدير فرع",
      managerName: "اسم المدير",
      managerNameAr: "اسم المدير (عربي)",
      password: "كلمة المرور",
      selectBranch: "اختر الفرع",
      create: "إنشاء",
      atmDetails: "تفاصيل الصراف",
      manufacturer: "الشركة المصنعة",
      model: "الموديل",
      serialNumber: "الرقم التسلسلي",
      allowsWithdrawal: "يسمح بالسحب",
      allowsDeposit: "يسمح بالإيداع",
      yes: "نعم",
      no: "لا",
      managerCreated: "تم إنشاء مدير الفرع بنجاح!",
      managerError: "فشل إنشاء مدير الفرع",
      // NEW TRANSLATIONS
      singleUser: "مستخدم واحد",
      bulkUpload: "رفع ملف",
      uploadExcel: "رفع ملف إكسيل",
      downloadTemplate: "تحميل النموذج",
      dragDropExcel: "اسحب وأفلت ملف الإكسيل هنا أو اضغط للتصفح",
      processing: "جاري المعالجة...",
      uploadSuccess: "تم الرفع بنجاح!",
      uploadFailed: "فشل الرفع",
      created: "تم إنشاء",
      failed: "فشل",
      total: "الإجمالي",
      selectGovernorateFirst: "اختر المحافظة أولاً",
      noBranchesInGovernorate: "لا توجد فروع في هذه المحافظة",
    },
  };

  // const enrichedBranches = orgBranches.map((branch) => {
  //   const location = data.location.find(
  //     (loc) => loc.location_id === branch.location_id,
  //   );
  //   return { ...branch, location };
  // });
  // setAllBranches(enrichedBranches);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userRole = localStorage.getItem("userRole");
      // const orgBranches = data.branch.filter(
      //   (branch) => branch.org_id === user.org_id,
      // );

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

      const userOrg = data.organization.find(
        (org) => org.org_id === user.org_id,
      );
      setUserOrganization(userOrg);

      const orgBranches = data.branch.filter(
        (branch) => branch.org_id === user.org_id,
      );
      // Add these 2 lines before setLoading(false) - around line 208
      const enrichedBranches = orgBranches.map((branch) => {
        const location = data.location.find(
          (loc) => loc.location_id === branch.location_id,
        );
        return { ...branch, location };
      });
      setAllBranches(enrichedBranches);
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

      const orgServices = data.services.filter(
        (s) =>
          s.service_category ===
          (userOrg.org_type === "bank" ? "bank" : "civil_registry"),
      );
      setAllServices(orgServices);

      const orgCameraConfigs = data.cameraConfiguration.filter((cc) => {
        const branch = data.branch.find((b) => b.branch_id === cc.branch_id);
        return branch && branch.org_id === user.org_id;
      });
      setCameraConfigs(orgCameraConfigs);
      setCameraViews(data.cameraView || []);
      setViewTargets(data.viewTarget || []);

      const serviceMappings = {};
      orgCameraConfigs.forEach((camera, index) => {
        const servicesPerCamera = Math.ceil(
          orgServices.length / Math.max(orgCameraConfigs.length, 1),
        );
        const startIdx = index * servicesPerCamera;
        serviceMappings[camera.camera_config_id] = orgServices
          .slice(startIdx, startIdx + servicesPerCamera)
          .map((s) => s.service_id);
      });
      setCameraServiceMappings(serviceMappings);

      const atmMappings = {};
      orgCameraConfigs.forEach((camera) => {
        atmMappings[camera.camera_config_id] = [];
      });
      setCameraAtmMappings(atmMappings);

      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  const handleGovernorateSelect = async (gov) => {
    setSelectedGovernorate(gov);
    setSelectedBranch(null);
    setSelectedCamera(null);
    setSelectedAtm(null);

    try {
      const response = await fetch("/simulationData.json");
      const data = await response.json();

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
    setEditedBranch({ ...branch });
    setSelectedCamera(null);
    setSelectedAtm(null);

    try {
      const response = await fetch("/simulationData.json");
      const data = await response.json();

      const branchSvcs = data.branchServices.filter(
        (bs) => bs.branch_id === branch.branch_id,
      );
      setBranchServices(branchSvcs);

      if (userOrganization?.org_type === "bank") {
        const branchAtms = data.atm.filter(
          (atm) => atm.branch_id === branch.branch_id,
        );
        setAtms(branchAtms);

        const branchCameras = cameraConfigs.filter(
          (cc) => cc.branch_id === branch.branch_id,
        );
        const atmMappings = {};
        branchCameras.forEach((camera, index) => {
          const atmsPerCamera = Math.ceil(
            branchAtms.length / Math.max(branchCameras.length, 1),
          );
          const startIdx = index * atmsPerCamera;
          atmMappings[camera.camera_config_id] = branchAtms
            .slice(startIdx, startIdx + atmsPerCamera)
            .map((a) => a.atm_id);
        });
        setCameraAtmMappings((prev) => ({ ...prev, ...atmMappings }));
      } else {
        setAtms([]);
      }
    } catch (error) {
      console.error("Error loading branch data:", error);
    }
  };

  const handleBranchUpdate = async () => {
    try {
      const updatedBranches = branches.map((b) =>
        b.branch_id === editedBranch.branch_id ? editedBranch : b,
      );
      setBranches(updatedBranches);
      setSelectedBranch(editedBranch);
      setEditingBranch(false);
      alert(t[language].updateSuccess);
    } catch (error) {
      console.error("Error updating branch:", error);
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

  const handleAtmUpdate = async () => {
    try {
      // TODO: Call your API here
      // await fetch('/api/atm/update', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editedAtm)
      // });

      const updatedAtms = atms.map((atm) =>
        atm.atm_id === editedAtm.atm_id ? editedAtm : atm,
      );
      setAtms(updatedAtms);
      setSelectedAtm(editedAtm);
      alert(t[language].updateSuccess);
    } catch (error) {
      console.error("Error updating ATM:", error);
      alert(t[language].updateError);
    }
  };

  // ===== NEW HANDLERS (Replace handleCreateBranchManager - lines 375-402) =====

  // Handle Governorate Change in Modal
  const handleManagerGovernorateChange = (governorateId) => {
    setNewManager({
      ...newManager,
      governorate_id: governorateId,
      branch_id: null,
    });

    const filtered = allBranches.filter(
      (branch) => branch.location?.governorate_id === parseInt(governorateId),
    );
    setFilteredBranches(filtered);
  };

  // Single User Creation
  const handleCreateBranchManager = async () => {
    try {
      if (
        !newManager.name ||
        !newManager.email ||
        !newManager.password ||
        !newManager.branch_id
      ) {
        alert("Please fill all fields");
        return;
      }
      // lash lash  here where we will use the api for the creation

      // const response = await fetch("../../../public/simulationData.json", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      //   },
      //   body: JSON.stringify({
      //     name: newManager.name,
      //     name_ar: newManager.name_ar,
      //     email: newManager.email,
      //     password: newManager.password,
      //     branch_id: newManager.branch_id,
      //     role_id: 3,
      //     org_id: userData.org_id,
      //     account_id: userData.account_id,
      //   }),
      // });

      // const result = await response.json();
      /*
  if (response.ok)  will be   if (true )
  to handell some error ,dont forget change it later lash lash lash 

*/
      if (true) {
        alert(t[language].managerCreated);
        setShowCreateManager(false);
        setNewManager({
          name: "",
          name_ar: "",
          email: "",
          password: "",
          governorate_id: null,
          branch_id: null,
        });
        setFilteredBranches([]);
      } else {
        alert(result.message || t[language].managerError);
      }
    } catch (error) {
      console.error("Error creating manager:", error);
      alert(t[language].managerError);
    }
  };

  // Bulk Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".csv"))) {
      setExcelFile(file);
      setUploadResults(null);
    } else {
      alert("Please upload a valid Excel file (.xlsx or .csv)");
    }
  };

  const handleBulkUpload = async () => {
    if (!excelFile) {
      alert("Please select a file first");
      return;
    }

    setUploadProgress(10);

    try {
      const formData = new FormData();
      formData.append("file", excelFile);
      formData.append("org_id", userData.org_id);
      formData.append("account_id", userData.account_id);
      formData.append("role_id", 3);

      setUploadProgress(30);

      const response = await fetch("/api/users/create-bulk", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });

      setUploadProgress(70);

      const result = await response.json();

      setUploadProgress(100);

      if (response.ok) {
        setUploadResults({
          success: true,
          created: result.created || 0,
          failed: result.failed || 0,
          total: result.total || 0,
          errors: result.errors || [],
        });
      } else {
        setUploadResults({
          success: false,
          message: result.message || t[language].uploadFailed,
        });
      }

      setTimeout(() => setUploadProgress(0), 2000);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadResults({
        success: false,
        message: t[language].uploadFailed,
      });
      setUploadProgress(0);
    }
  };

  const downloadTemplate = () => {
    const template = `Name,Name Arabic,Email,Password,Governorate,Branch Code
John Doe,جون دو,john@example.com,password123,Cairo,BR001
Jane Smith,جين سميث,jane@example.com,password456,Alexandria,BR002`;

    const blob = new Blob([template], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "branch_managers_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
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
    const branchCameras = cameraConfigs.filter(
      (cc) => cc.branch_id === selectedBranch?.branch_id,
    );

    if (branchCameras.length === 0) return;

    const newMappings = {};
    const servicesPerCamera = Math.ceil(
      allServices.length / branchCameras.length,
    );

    branchCameras.forEach((camera, index) => {
      const startIdx = index * servicesPerCamera;
      newMappings[camera.camera_config_id] = allServices
        .slice(startIdx, startIdx + servicesPerCamera)
        .map((s) => s.service_id);
    });

    setCameraServiceMappings((prev) => ({ ...prev, ...newMappings }));
    alert(t[language].servicesDistributed);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    router.push("/features/auth/admin-login");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: darkMode ? "#0a0f0d" : "#f8fafb" }}
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
  const branchCameraConfigs = cameraConfigs.filter(
    (cc) => cc.branch_id === selectedBranch?.branch_id,
  );

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
                  ? userOrganization?.org_name_ar
                  : userOrganization?.org_name_en}
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
              onClick={() => setShowCreateManager(true)}
              className="px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                color: "white",
              }}
            >
              + {t[language].createBranchManager}
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
              onClick={() =>
                setDarkMode((prev) => {
                  localStorage.setItem("isDark", JSON.stringify(!prev));
                  return !prev;
                })
              }
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

      {/* Create Branch Manager Modal */}

      {showCreateManager && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0, 0, 0, 0.7)" }}
          onClick={() => {
            setShowCreateManager(false);
            setCreationMode("single");
            setExcelFile(null);
            setUploadResults(null);
            setUploadProgress(0); // ⭐ ضيف ده
            setFilteredBranches([]);
            setNewManager({
              name: "",
              name_ar: "",
              email: "",
              password: "",
              governorate_id: null,
              branch_id: null,
            });
          }}
        >
          <div
            className="rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            style={{
              background: darkMode ? "#111714" : "#ffffff",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: "#36e27b" }}
            >
              {t[language].createBranchManager}
            </h2>

            {/* MODE TABS */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => {
                  setCreationMode("single");
                  setUploadResults(null);
                }}
                className="flex-1 px-4 py-3 rounded-xl font-bold transition-all"
                style={{
                  background:
                    creationMode === "single"
                      ? "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)"
                      : "rgba(54, 226, 123, 0.1)",
                  color: creationMode === "single" ? "white" : "#36e27b",
                  border: "1px solid rgba(54, 226, 123, 0.3)",
                }}
              >
                👤 {t[language].singleUser}
              </button>
              <button
                onClick={() => {
                  setCreationMode("bulk");
                  setNewManager({
                    name: "",
                    name_ar: "",
                    email: "",
                    password: "",
                    governorate_id: null,
                    branch_id: null,
                  });
                }}
                className="flex-1 px-4 py-3 rounded-xl font-bold transition-all"
                style={{
                  background:
                    creationMode === "bulk"
                      ? "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)"
                      : "rgba(54, 226, 123, 0.1)",
                  color: creationMode === "bulk" ? "white" : "#36e27b",
                  border: "1px solid rgba(54, 226, 123, 0.3)",
                }}
              >
                📄 {t[language].bulkUpload}
              </button>
            </div>

            {/* SINGLE USER MODE */}
            {creationMode === "single" && (
              <div className="space-y-4">
                <EditField
                  label={t[language].managerName}
                  value={newManager.name}
                  onChange={(value) =>
                    setNewManager({ ...newManager, name: value })
                  }
                  darkMode={darkMode}
                />

                <EditField
                  label={t[language].managerNameAr}
                  value={newManager.name_ar}
                  onChange={(value) =>
                    setNewManager({ ...newManager, name_ar: value })
                  }
                  darkMode={darkMode}
                />

                <EditField
                  label={t[language].email}
                  value={newManager.email}
                  onChange={(value) =>
                    setNewManager({ ...newManager, email: value })
                  }
                  darkMode={darkMode}
                />

                <EditField
                  label={t[language].password}
                  value={newManager.password}
                  onChange={(value) =>
                    setNewManager({ ...newManager, password: value })
                  }
                  darkMode={darkMode}
                  type="password"
                />

                {/* GOVERNORATE DROPDOWN */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-bold"
                    style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                  >
                    {t[language].selectGovernorate}
                  </label>
                  <select
                    value={newManager.governorate_id || ""}
                    onChange={(e) =>
                      handleManagerGovernorateChange(e.target.value)
                    }
                    className="px-3 py-2 rounded-lg transition-all focus:ring-2 focus:ring-green-300 font-semibold"
                    style={{
                      background: "rgba(54, 226, 123, 0.1)",
                      border: "1px solid rgba(54, 226, 123, 0.3)",
                      color: darkMode ? "#e0e0e0" : "#333333",
                    }}
                  >
                    <option value="">
                      -- {t[language].selectGovernorate} --
                    </option>
                    {governorates.map((gov) => (
                      <option
                        key={gov.governorate_id}
                        value={gov.governorate_id}
                      >
                        {language === "ar"
                          ? gov.governorate_name_ar
                          : gov.governorate_name_en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* BRANCH DROPDOWN */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-bold"
                    style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                  >
                    {t[language].selectBranch}
                  </label>
                  <select
                    value={newManager.branch_id || ""}
                    onChange={(e) =>
                      setNewManager({
                        ...newManager,
                        branch_id: parseInt(e.target.value),
                      })
                    }
                    disabled={!newManager.governorate_id}
                    className="px-3 py-2 rounded-lg transition-all focus:ring-2 focus:ring-green-300 font-semibold"
                    style={{
                      background: "rgba(54, 226, 123, 0.1)",
                      border: "1px solid rgba(54, 226, 123, 0.3)",
                      color: darkMode ? "#e0e0e0" : "#333333",
                      opacity: !newManager.governorate_id ? 0.5 : 1,
                    }}
                  >
                    <option value="">
                      {!newManager.governorate_id
                        ? `-- ${t[language].selectGovernorateFirst} --`
                        : filteredBranches.length === 0
                          ? `-- ${t[language].noBranchesInGovernorate} --`
                          : `-- ${t[language].selectBranch} --`}
                    </option>
                    {filteredBranches.map((branch) => (
                      <option key={branch.branch_id} value={branch.branch_id}>
                        {language === "ar"
                          ? branch.branch_name_ar
                          : branch.branch_name_en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCreateBranchManager}
                    className="flex-1 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                      color: "white",
                    }}
                  >
                    {t[language].create}
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateManager(false);
                      setFilteredBranches([]);
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
            )}

            {/* BULK UPLOAD MODE */}
            {creationMode === "bulk" && (
              <div className="space-y-4">
                <button
                  onClick={downloadTemplate}
                  className="w-full px-4 py-3 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: "rgba(54, 226, 123, 0.15)",
                    color: "#36e27b",
                    border: "1px solid rgba(54, 226, 123, 0.3)",
                  }}
                >
                  ⬇️ {t[language].downloadTemplate}
                </button>

                <div
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all hover:border-green-400"
                  style={{
                    borderColor: darkMode
                      ? "rgba(54, 226, 123, 0.3)"
                      : "rgba(54, 226, 123, 0.5)",
                    background: darkMode
                      ? "rgba(0, 0, 0, 0.2)"
                      : "rgba(255, 255, 255, 0.5)",
                  }}
                  onClick={() =>
                    document.getElementById("excel-upload").click()
                  }
                >
                  <input
                    id="excel-upload"
                    type="file"
                    accept=".xlsx,.csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="text-5xl mb-3">📁</div>
                  <div
                    className="font-bold mb-2"
                    style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                  >
                    {excelFile ? excelFile.name : t[language].dragDropExcel}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                  >
                    .xlsx or .csv files only
                  </div>
                </div>

                {uploadProgress > 0 && (
                  <div className="w-full">
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "rgba(54, 226, 123, 0.2)" }}
                    >
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: `${uploadProgress}%`,
                          background:
                            "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                        }}
                      ></div>
                    </div>
                    <div
                      className="text-center text-sm mt-2"
                      style={{ color: "#36e27b" }}
                    >
                      {uploadProgress}% {t[language].processing}
                    </div>
                  </div>
                )}

                {uploadResults && (
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      background: uploadResults.success
                        ? "rgba(54, 226, 123, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                      border: uploadResults.success
                        ? "1px solid rgba(54, 226, 123, 0.3)"
                        : "1px solid rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    <div
                      className="font-bold mb-2"
                      style={{
                        color: uploadResults.success ? "#36e27b" : "#ef4444",
                      }}
                    >
                      {uploadResults.success
                        ? `✅ ${t[language].uploadSuccess}`
                        : `❌ ${t[language].uploadFailed}`}
                    </div>
                    {uploadResults.success && (
                      <div
                        className="text-sm space-y-1"
                        style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                      >
                        <div>
                          {t[language].created}: {uploadResults.created}
                        </div>
                        <div>
                          {t[language].failed}: {uploadResults.failed}
                        </div>
                        <div>
                          {t[language].total}: {uploadResults.total}
                        </div>
                        {uploadResults.errors &&
                          uploadResults.errors.length > 0 && (
                            <div className="mt-2">
                              <div className="font-bold mb-1">Errors:</div>
                              <ul className="list-disc list-inside">
                                {uploadResults.errors.map((error, idx) => (
                                  <li key={idx} className="text-xs">
                                    {error}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    )}
                    {!uploadResults.success && uploadResults.message && (
                      <div
                        className="text-sm"
                        style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                      >
                        {uploadResults.message}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleBulkUpload}
                    disabled={!excelFile || uploadProgress > 0}
                    className="flex-1 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                    style={{
                      background:
                        !excelFile || uploadProgress > 0
                          ? "rgba(128, 128, 128, 0.3)"
                          : "linear-gradient(135deg, #36e27b 0%, #2bc46d 100%)",
                      color: "white",
                      cursor:
                        !excelFile || uploadProgress > 0
                          ? "not-allowed"
                          : "pointer",
                      opacity: !excelFile || uploadProgress > 0 ? 0.5 : 1,
                    }}
                  >
                    📤 {t[language].uploadExcel}
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateManager(false);
                      setExcelFile(null);
                      setUploadResults(null);
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
            )}
          </div>
        </div>
      )}

      {/* Statistics */}
      {selectedGovernorate && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title={t[language].totalBranches}
            value={branches.length}
            darkMode={darkMode}
          />
          {selectedBranch && (
            <>
              {userOrganization?.org_type !== "bank" && (
                <>
                  <StatCard
                    title={t[language].totalServices}
                    value={allServices.length}
                    darkMode={darkMode}
                  />
                  <StatCard
                    title={t[language].activeServices}
                    value={activeServicesCount}
                    darkMode={darkMode}
                  />
                </>
              )}
              <StatCard
                title={t[language].totalCameras}
                value={branchCameraConfigs.length}
                darkMode={darkMode}
              />
              {userOrganization?.org_type === "bank" && (
                <StatCard
                  title={t[language].totalATMs}
                  value={atms.length}
                  darkMode={darkMode}
                />
              )}
            </>
          )}
        </div>
      )}

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
          {!selectedGovernorate && (
            <>
              <h2
                className="text-2xl font-bold mb-5"
                style={{ color: "#36e27b" }}
              >
                {t[language].selectGovernorate}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {governorates.map((gov) => (
                  <button
                    key={gov.governorate_id}
                    onClick={() => handleGovernorateSelect(gov)}
                    className="p-4 rounded-xl transition-all hover:scale-105"
                    style={{
                      background: "rgba(54, 226, 123, 0.1)",
                      border: "1px solid rgba(54, 226, 123, 0.3)",
                    }}
                  >
                    <div
                      className="font-bold text-lg"
                      style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                    >
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
                className="mb-4 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: "rgba(54, 226, 123, 0.15)",
                  color: "#36e27b",
                  border: "1px solid rgba(54, 226, 123, 0.3)",
                }}
              >
                ← {t[language].backToGovernorates}
              </button>

              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#36e27b" }}
              >
                {t[language].branches}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {branches.map((branch) => (
                  <button
                    key={branch.branch_id}
                    onClick={() => handleBranchSelect(branch)}
                    className="p-4 rounded-xl transition-all hover:scale-105 text-left"
                    style={{
                      background: "rgba(54, 226, 123, 0.1)",
                      border: "1px solid rgba(54, 226, 123, 0.3)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="font-bold text-lg"
                        style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                      >
                        {language === "ar"
                          ? branch.branch_name_ar
                          : branch.branch_name_en}
                      </div>
                      <div
                        className="px-3 py-1 rounded-lg text-xs font-bold"
                        style={{
                          background: branch.isActive
                            ? "rgba(54, 226, 123, 0.2)"
                            : "rgba(239, 68, 68, 0.2)",
                          color: branch.isActive ? "#36e27b" : "#ef4444",
                        }}
                      >
                        {branch.isActive
                          ? t[language].active
                          : t[language].inactive}
                      </div>
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                    >
                      {branch.branch_code}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedBranch && !selectedCamera && !selectedAtm && (
            <>
              <button
                onClick={() => {
                  setSelectedBranch(null);
                  setBranchServices([]);
                  setAtms([]);
                }}
                className="mb-4 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: "rgba(54, 226, 123, 0.15)",
                  color: "#36e27b",
                  border: "1px solid rgba(54, 226, 123, 0.3)",
                }}
              >
                ← {t[language].backToBranches}
              </button>

              {/* Branch Settings */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: "#36e27b" }}
                  >
                    {t[language].branchSettings}
                  </h2>
                  {!editingBranch ? (
                    <button
                      onClick={() => setEditingBranch(true)}
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
                          setEditedBranch({ ...selectedBranch });
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
                        label={t[language].branchName}
                        value={editedBranch?.branch_name_en || ""}
                        onChange={(value) =>
                          setEditedBranch({
                            ...editedBranch,
                            branch_name_en: value,
                          })
                        }
                        darkMode={darkMode}
                      />
                      <EditField
                        label={t[language].phone}
                        value={editedBranch?.phone || ""}
                        onChange={(value) =>
                          setEditedBranch({ ...editedBranch, phone: value })
                        }
                        darkMode={darkMode}
                      />
                      <EditField
                        label={t[language].email}
                        value={editedBranch?.email || ""}
                        onChange={(value) =>
                          setEditedBranch({ ...editedBranch, email: value })
                        }
                        darkMode={darkMode}
                      />
                      <EditField
                        label={t[language].workingHours}
                        value={editedBranch?.working_hours || ""}
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
                        value={selectedBranch?.branch_code}
                        darkMode={darkMode}
                      />
                      <DetailRow
                        label={t[language].phone}
                        value={selectedBranch?.phone}
                        darkMode={darkMode}
                      />
                      <DetailRow
                        label={t[language].email}
                        value={selectedBranch?.email}
                        darkMode={darkMode}
                      />
                      <DetailRow
                        label={t[language].workingHours}
                        value={selectedBranch?.working_hours}
                        darkMode={darkMode}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* ATM Management Section - Only for Banks */}
              {userOrganization?.org_type === "bank" && (
                <div className="mb-6">
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: "#36e27b" }}
                  >
                    {t[language].atmManagement}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {atms.map((atm) => (
                      <button
                        key={atm.atm_id}
                        onClick={() => {
                          setSelectedAtm(atm);
                          setEditedAtm({ ...atm });
                        }}
                        className="p-4 rounded-xl transition-all hover:scale-105 text-left"
                        style={{
                          background: "rgba(54, 226, 123, 0.1)",
                          border: "1px solid rgba(54, 226, 123, 0.3)",
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-bold">{atm.atm_code}</div>
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
                </div>
              )}

              {/* Cameras Section */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold" style={{ color: "#36e27b" }}>
                  {t[language].cameras}
                </h2>
                {userOrganization?.org_type !== "bank" && (
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {branchCameraConfigs.map((camera, index) => {
                  const configViews = cameraViews.filter(
                    (cv) => cv.camera_config_id === camera.camera_config_id,
                  );
                  const assignedServices =
                    cameraServiceMappings[camera.camera_config_id] || [];
                  const assignedATMs =
                    cameraAtmMappings[camera.camera_config_id] || [];

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

                      {userOrganization?.org_type === "bank" ? (
                        <div className="grid grid-cols-2 gap-2 mb-3">
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
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 mb-3">
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
                        </div>
                      )}

                      {userOrganization?.org_type === "bank" ? (
                        <div className="flex flex-wrap gap-1">
                          {assignedATMs.slice(0, 2).map((atmId) => {
                            const atm = atms.find((a) => a.atm_id === atmId);
                            return atm ? (
                              <span
                                key={atmId}
                                className="text-xs px-2 py-1 rounded-lg font-semibold"
                                style={{
                                  background: "rgba(54, 226, 123, 0.2)",
                                  color: "#36e27b",
                                }}
                              >
                                {atm.atm_code}
                              </span>
                            ) : null;
                          })}
                          {assignedATMs.length > 2 && (
                            <span
                              className="text-xs px-2 py-1 rounded-lg font-semibold"
                              style={{
                                background: "rgba(54, 226, 123, 0.1)",
                                color: "#36e27b",
                              }}
                            >
                              +{assignedATMs.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {assignedServices.slice(0, 2).map((serviceId) => {
                            const service = allServices.find(
                              (s) => s.service_id === serviceId,
                            );
                            return service ? (
                              <span
                                key={serviceId}
                                className="text-xs px-2 py-1 rounded-lg font-semibold"
                                style={{
                                  background: "rgba(54, 226, 123, 0.2)",
                                  color: "#36e27b",
                                }}
                              >
                                {language === "ar"
                                  ? service.service_name_ar
                                  : service.service_name_en}
                              </span>
                            ) : null;
                          })}
                          {assignedServices.length > 2 && (
                            <span
                              className="text-xs px-2 py-1 rounded-lg font-semibold"
                              style={{
                                background: "rgba(54, 226, 123, 0.1)",
                                color: "#36e27b",
                              }}
                            >
                              +{assignedServices.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ATM Details View */}
          {selectedAtm && (
            <>
              <button
                onClick={() => {
                  setSelectedAtm(null);
                  setEditedAtm(null);
                }}
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
                <div className="space-y-3 mb-4">
                  <EditField
                    label={t[language].atmCode}
                    value={editedAtm?.atm_code || ""}
                    onChange={(value) =>
                      setEditedAtm({ ...editedAtm, atm_code: value })
                    }
                    darkMode={darkMode}
                  />
                  <EditField
                    label={t[language].manufacturer}
                    value={editedAtm?.manufacturer || ""}
                    onChange={(value) =>
                      setEditedAtm({ ...editedAtm, manufacturer: value })
                    }
                    darkMode={darkMode}
                  />
                  <EditField
                    label={t[language].model}
                    value={editedAtm?.model || ""}
                    onChange={(value) =>
                      setEditedAtm({ ...editedAtm, model: value })
                    }
                    darkMode={darkMode}
                  />
                  <EditField
                    label={t[language].serialNumber}
                    value={editedAtm?.serial_number || ""}
                    onChange={(value) =>
                      setEditedAtm({ ...editedAtm, serial_number: value })
                    }
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
                      checked={editedAtm?.allows_withdrawal || false}
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
                      checked={editedAtm?.allows_deposit || false}
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
              <div className="grid grid-cols-2 gap-3 mb-4">
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
        </div>

        {/* Right Panel */}
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
            {userOrganization?.org_type === "bank"
              ? t[language].manageATMs
              : t[language].manageServices}
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
              {userOrganization?.org_type === "bank" ? (
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
              ) : (
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
            </div>
          )}
        </div>
      </div>
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

function EditField({ label, value, onChange, darkMode, type = "text" }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm font-bold"
        style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
      >
        {label}
      </label>
      <input
        type={type}
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
