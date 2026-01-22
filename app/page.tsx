"use client";

import { useState } from "react";
import OrganizationSelector from "@/components/screens/OrganizationSelector/OrganizationSelector";
import BranchSelector from "@/components/screens/BranchSelector/BranchSelector";
import ServiceTypeSelector from "@/components/screens/ServiceTypeSelector/ServiceTypeSelector";
import ATMList from "@/components/screens/ATMList/ATMList";
import BranchDetailsList from "@/components/screens/BranchDetailsList/BranchDetailsList";
import ATMDetailsScreen from "@/components/screens/ATMDetailsScreen/ATMDetailsScreen";
import ServiceBranchDetailsScreen from "@/components/screens/ServiceBranchDetailsScreen/ServiceBranchDetailsScreen";
import BankTypeSelector from "@/components/screens/BankTypeSelector/BankTypeSelector";

import SplashScreen from "@/components/SplashScreen";

const translations = {
  en: {
    serviceTitle: "Find Your Service",
    serviceDesc: "Choose a service to find the nearest location",
    selectBank: "Select Bank",
    selectService: "Select Service",
    banks: "Banks",
    hospitals: "Hospitals",
    post: "Post Offices",
    telecom: "Telecom Centers",
    traffic: "Traffic Department",
    realEstate: "Real Estate",
    healthInsurance: "Health Insurance",
    civilStatus: "Civil Status",
    immigration: "Immigration",
    gas: "Gas Stations",
    passport: "Passport Office",
    back: "Back",
    selectBankType: "Select Bank Type",
    selectATM: "Select ATM",
    orChooseOtherService: "Or Choose Another Service",
  },
  ar: {
    serviceTitle: "اختر الخدمة",
    serviceDesc: "اختر الخدمة التي تريد للبحث عن أقرب موقع",
    selectBank: "اختر البنك",
    selectService: "اختر الخدمة",
    banks: "البنوك",
    hospitals: "المستشفيات",
    post: "مكاتب البريد",
    telecom: "مراكز الاتصالات",
    traffic: "إدارة المرور",
    realEstate: "مكاتب العقارات",
    healthInsurance: "التأمين الصحي",
    civilStatus: "الأحوال المدنية",
    immigration: "مكاتب الهجرة",
    gas: "محطات الوقود",
    passport: "مكاتب الجوازات",
    back: "رجوع",
    selectBankType: "اختر نوع البنك",
    selectATM: "اختر ماكينة الصراف",
    orChooseOtherService: "أو اختر خدمة أخرى",
  },
};

const mockOrganizations = [
  {
    org_id: 2001,
    org_name_ar: "الأهلي",
    org_name_en: "National Bank",
    org_abbreviation: "AB",
    description_ar: "البنك الأهلي المصري",
    description_en: "Egyptian National Bank",
    latitude: 30.0444,
    longitude: 31.2357,
  },
  {
    org_id: 2002,
    org_name_ar: "مصر",
    org_name_en: "Bank of Egypt",
    org_abbreviation: "BM",
    description_ar: "بنك مصر",
    description_en: "Bank of Egypt",
    latitude: 30.0555,
    longitude: 31.245,
  },
  {
    org_id: 2003,
    org_name_ar: "زراعي",
    org_name_en: "Agricultural Bank",
    org_abbreviation: "ACB",
    description_ar: "البنك الزراعي المصري",
    description_en: "Egyptian Agricultural Bank",
    latitude: 30.0333,
    longitude: 31.22,
  },
];

const mockBranches = {
  2001: [
    {
      branch_id: 3001,
      branch_name_ar: "فرع وسط البلد",
      branch_name_en: "Downtown Branch",
      latitude: 30.0486,
      longitude: 31.2386,
      isActive: true,
    },
    {
      branch_id: 3002,
      branch_name_ar: "فرع النيل",
      branch_name_en: "Nile Branch",
      latitude: 30.025,
      longitude: 31.22,
      isActive: true,
    },
    {
      branch_id: 3003,
      branch_name_ar: "فرع الزمالك",
      branch_name_en: "Zamalek Branch",
      latitude: 30.068,
      longitude: 31.195,
      isActive: true,
    },
    {
      branch_id: 3008,
      branch_name_ar: "فرع المعادي",
      branch_name_en: "Maadi Branch",
      latitude: 29.97,
      longitude: 31.32,
      isActive: true,
    },
    {
      branch_id: 3009,
      branch_name_ar: "فرع المنيل",
      branch_name_en: "Manial Branch",
      latitude: 30.035,
      longitude: 31.245,
      isActive: true,
    },
  ],
  2002: [
    {
      branch_id: 3004,
      branch_name_ar: "فرع التحرير",
      branch_name_en: "Tahrir Branch",
      latitude: 30.0333,
      longitude: 31.2333,
      isActive: true,
    },
    {
      branch_id: 3005,
      branch_name_ar: "فرع الزقازيق",
      branch_name_en: "Zagazig Branch",
      latitude: 30.5753,
      longitude: 31.508,
      isActive: true,
    },
    {
      branch_id: 3010,
      branch_name_ar: "فرع الإسكندرية",
      branch_name_en: "Alexandria Branch",
      latitude: 31.2001,
      longitude: 29.9187,
      isActive: true,
    },
  ],
  2003: [
    {
      branch_id: 3006,
      branch_name_ar: "فرع الزراعي الرئيسي",
      branch_name_en: "Agricultural Main",
      latitude: 30.06,
      longitude: 31.255,
      isActive: true,
    },
    {
      branch_id: 3007,
      branch_name_ar: "فرع الزراعي الفيوم",
      branch_name_en: "Fayoum Branch",
      latitude: 29.3084,
      longitude: 30.8424,
      isActive: true,
    },
    {
      branch_id: 3011,
      branch_name_ar: "فرع الشرقية",
      branch_name_en: "Sharkia Branch",
      latitude: 30.8,
      longitude: 31.0,
      isActive: true,
    },
  ],
};

const mockATMs = {
  3001: [
    {
      atm_id: 5001,
      name_ar: "ماكينة وسط البلد 1",
      name_en: "Downtown ATM 1",
      latitude: 30.049,
      longitude: 31.239,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5002,
      name_ar: "ماكينة وسط البلد 2",
      name_en: "Downtown ATM 2",
      latitude: 30.05,
      longitude: 31.24,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 1,
      denominations: [100, 50],
    },
    {
      atm_id: 5003,
      name_ar: "ماكينة الشارع الجانبي",
      name_en: "Side Street ATM",
      latitude: 30.047,
      longitude: 31.237,
      isActive: false,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 0,
      denominations: [200, 100, 50, 20],
    },
  ],
  3002: [
    {
      atm_id: 5004,
      name_ar: "ماكينة النيل",
      name_en: "Nile ATM",
      latitude: 30.0255,
      longitude: 31.2205,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 5,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5012,
      name_ar: "ماكينة النيل 2",
      name_en: "Nile ATM 2",
      latitude: 30.0265,
      longitude: 31.2215,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [100, 50],
    },
  ],
  3003: [
    {
      atm_id: 5005,
      name_ar: "ماكينة الزمالك",
      name_en: "Zamalek ATM",
      latitude: 30.0685,
      longitude: 31.1955,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [100, 50, 20],
    },
  ],
};

const mockServices = [
  {
    service_id: 11,
    name_ar: "البنوك",
    name_en: "Banks",
    type: "bank",
    icon: "🏦",
  },
  {
    service_id: 1,
    name_ar: "المستشفيات",
    name_en: "Hospitals",
    type: "hospital",
    icon: "🏥",
  },
  {
    service_id: 2,
    name_ar: "مكاتب البريد",
    name_en: "Post Offices",
    type: "post_office",
    icon: "📮",
  },
  {
    service_id: 3,
    name_ar: "مراكز الاتصالات",
    name_en: "Telecom Centers",
    type: "telecom",
    icon: "📱",
  },
  {
    service_id: 4,
    name_ar: "إدارة المرور",
    name_en: "Traffic Department",
    type: "traffic",
    icon: "🚗",
  },
  {
    service_id: 5,
    name_ar: "مكاتب العقارات",
    name_en: "Real Estate",
    type: "real_estate",
    icon: "🏠",
  },
  {
    service_id: 6,
    name_ar: "التأمين الصحي",
    name_en: "Health Insurance",
    type: "health_insurance",
    icon: "💳",
  },
  {
    service_id: 7,
    name_ar: "الأحوال المدنية",
    name_en: "Civil Status",
    type: "civil_status",
    icon: "🧾",
  },
  {
    service_id: 8,
    name_ar: "مكاتب الهجرة",
    name_en: "Immigration",
    type: "immigration",
    icon: "🌍",
  },
  {
    service_id: 9,
    name_ar: "محطات الوقود",
    name_en: "Gas Stations",
    type: "gas_station",
    icon: "⛽",
  },
  {
    service_id: 10,
    name_ar: "مكاتب الجوازات",
    name_en: "Passport Office",
    type: "passport",
    icon: "🛂",
  },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState("service-selector");
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedBankType, setSelectedBankType] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedATM, setSelectedATM] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: 30.0444,
    longitude: 31.2357,
  });
  const t = translations[language];

  const getOrgName = (org) =>
    language === "ar" ? org.org_name_ar : org.org_name_en;
  const getOrgDesc = (org) =>
    language === "ar" ? org.description_ar : org.description_en;
  const getBranchName = (branch) =>
    language === "ar" ? branch.branch_name_ar : branch.branch_name_en;
  const getATMName = (atm) => (language === "ar" ? atm.name_ar : atm.name_en);
  const getServiceName = (service) =>
    language === "ar" ? service.name_ar : service.name_en;

  const handleSelectService = (service) => {
    if (service.type === "bank") {
      setSelectedService(service);
      setScreen("organization-selector");
    } else {
      setSelectedService(service);
      setScreen("branch-details-list");
    }
  };

  const handleSelectOrganization = (org) => {
    setSelectedOrganization(org);
    const branches = mockBranches[org.org_id] || [];
    if (branches.length > 0) {
      setSelectedBranch(branches[0]);
      setScreen("atm-list");
    }
  };

  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch);
    setScreen("atm-list");
  };

  const handleSelectATM = (atm) => {
    setSelectedATM(atm);
    setScreen("atm-details");
  };

  const handleSelectServiceBranch = (branch) => {
    setSelectedBranch(branch);
    setScreen("service-branch-details");
  };

  const handleBackClick = () => {
    if (screen === "organization-selector") {
      setScreen("service-selector");
      setSelectedOrganization(null);
    } else if (screen === "atm-list") {
      setScreen("organization-selector");
      setSelectedBranch(null);
    } else if (screen === "atm-details") {
      setScreen("atm-list");
      setSelectedATM(null);
    } else if (screen === "branch-details-list") {
      setScreen("service-selector");
      setSelectedService(null);
    } else if (screen === "service-branch-details") {
      setScreen("branch-details-list");
    }
  };

  const handleSelectBankType = () => {
    // Implement bank type selection logic here
  };

  const bgColor = darkMode ? "#111714" : "#ffffff";
  const textColor = darkMode ? "#ffffff" : "#111714";
  const cardBgColor = darkMode ? "#1a1a1a" : "#ffffff";

  return (
    <main
      style={{ backgroundColor: bgColor, color: textColor }}
      className="min-h-screen p-4 transition-colors duration-300"
    >
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto main-shadow p-2 border-15">
        <div className="flex gap-3">
          {/* <h1 style={{ color: "#36e27b" }} className="text-3xl font-bold">
            {language === "ar" ? "خدمات" : "Services"}
          </h1> */}
          <div
            className="navbar-brand  ms-0 d-flex justify-content-baseline "
            href="#"
          ></div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              backgroundColor: darkMode ? "#36e27b" : "#e8f4f8",
              color: darkMode ? "#111714" : "#36e27b",
            }}
            className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
            style={{
              backgroundColor: "#36e27b",
              color: "#111714",
            }}
            className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {language === "ar" ? "English" : "العربية"}
          </button>
        </div>
        <div className="d-flex">
          <span
            className="Logo-Title mt-2"
            style={!darkMode ? { color: "black" } : {}}
          >
            Skip Q
          </span>
          <div
            className="rounded-circle me-2"
            style={{ backgroundColor: !darkMode ? "#36e27b" : "white" }}
          >
            {" "}
            <img
              src="/logo-removebg-preview.png"
              alt="logo"
              className="logo"
              style={{ width: "50px" }}
            />
          </div>
        </div>
      </div>

      {screen === "service-selector" && (
        <ServiceTypeSelector
          services={mockServices}
          onSelectService={handleSelectService}
          language={language}
          getServiceName={getServiceName}
          darkMode={darkMode}
        />
      )}

      {screen === "organization-selector" &&
        selectedService?.type === "bank" && (
          <>
            <button
              onClick={handleBackClick}
              style={{ color: "#36e27b" }}
              className="mb-6 flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition"
            >
              {language === "ar" ? "← رجوع" : "Back →"}
            </button>
            <OrganizationSelector
              organizations={mockOrganizations}
              onSelectOrganization={handleSelectOrganization}
              language={language}
              getOrgName={getOrgName}
              getOrgDesc={getOrgDesc}
              darkMode={darkMode}
            />
          </>
        )}

      {screen === "atm-list" && selectedBranch && selectedOrganization && (
        <>
          <button
            onClick={handleBackClick}
            style={{ color: "#36e27b" }}
            className="mb-6 flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition"
          >
            {language === "ar" ? "← رجوع" : "Back →"}
          </button>

          <ATMList
            atms={mockATMs[selectedBranch.branch_id] || []}
            branchName={getBranchName(selectedBranch)}
            onSelectATM={handleSelectATM}
            userLocation={userLocation}
            language={language}
            getATMName={getATMName}
            darkMode={darkMode}
          />
        </>
      )}

      {screen === "atm-details" && selectedATM && selectedBranch && (
        <>
          <button
            onClick={handleBackClick}
            style={{ color: "#36e27b" }}
            className="mb-6 flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition"
          >
            {language === "ar" ? "← رجوع" : "Back →"}
          </button>
          <ATMDetailsScreen
            atm={selectedATM}
            branchName={getBranchName(selectedBranch)}
            language={language}
            getATMName={getATMName}
            darkMode={darkMode}
          />
        </>
      )}

      {screen === "branch-details-list" &&
        selectedService &&
        selectedService.type !== "bank" && (
          <>
            <button
              onClick={handleBackClick}
              style={{ color: "#36e27b" }}
              className="mb-6 flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition"
            >
              {language === "ar" ? "← رجوع" : "Back →"}
            </button>
            <BranchDetailsList
              serviceType={selectedService.type}
              serviceName={getServiceName(selectedService)}
              onSelectBranch={handleSelectServiceBranch}
              userLocation={userLocation}
              language={language}
              darkMode={darkMode}
            />
          </>
        )}

      {screen === "service-branch-details" &&
        selectedBranch &&
        selectedService && (
          <>
            <button
              onClick={handleBackClick}
              style={{ color: "#36e27b" }}
              className="mb-6 flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition"
            >
              {language === "ar" ? "← رجوع" : "Back →"}
            </button>
            <ServiceBranchDetailsScreen
              branch={selectedBranch}
              serviceType={selectedService.type}
              serviceName={getServiceName(selectedService)}
              language={language}
              darkMode={darkMode}
            />
          </>
        )}
    </main>
  );
}
