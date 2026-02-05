"use client";

import { useState } from "react";
// import Link from "next/link";
import OrganizationSelector from "@/components/screens/OrganizationSelector/OrganizationSelector";
import BranchSelector from "@/components/screens/BranchSelector/BranchSelector";
import ServiceTypeSelector from "@/components/screens/ServiceTypeSelector/ServiceTypeSelector";
import ATMList from "@/components/screens/ATMList/ATMList";
import BranchDetailsList from "@/components/screens/BranchDetailsList/BranchDetailsList";
import ATMDetailsScreen from "@/components/screens/ATMDetailsScreen/ATMDetailsScreen";
import ServiceBranchDetailsScreen from "@/components/screens/ServiceBranchDetailsScreen/ServiceBranchDetailsScreen";
import BankTypeSelector from "@/components/screens/BankTypeSelector/BankTypeSelector";
import SplashScreen from "@/components/SplashScreen";
import Link from "next/link";
import { useRouter } from "next/router";

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
    adminLogin: "Admin Login",
    signupOrg: "Sign up as Organization",
    menu: "Menu",
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
    adminLogin: "تسجيل دخول المسؤولين",
    signupOrg: "التسجيل كمؤسسة",
    menu: "القائمة",
  },
};

const mockOrganizations = [
  // البنوك الحكومية
  {
    org_id: 2001,
    org_name_ar: "البنك الأهلي المصري",
    org_name_en: "National Bank of Egypt",
    org_abbreviation: "NBE",
    description_ar: "245 ماكينة صراف آلي متاحة",
    description_en: "245 ATMs available",
    latitude: 30.0444,
    longitude: 31.2357,
  },
  {
    org_id: 2002,
    org_name_ar: "بنك مصر",
    org_name_en: "Banque Misr",
    org_abbreviation: "BM",
    description_ar: "198 ماكينة صراف آلي متاحة",
    description_en: "198 ATMs available",
    latitude: 30.0555,
    longitude: 31.245,
  },
  {
    org_id: 2003,
    org_name_ar: "البنك الزراعي المصري",
    org_name_en: "Agricultural Bank of Egypt",
    org_abbreviation: "ABE",
    description_ar: "124 ماكينة صراف آلي متاحة",
    description_en: "124 ATMs available",
    latitude: 30.0333,
    longitude: 31.22,
  },
  {
    org_id: 2004,
    org_name_ar: "بنك القاهرة",
    org_name_en: "Banque du Caire",
    org_abbreviation: "BDC",
    description_ar: "156 ماكينة صراف آلي متاحة",
    description_en: "156 ATMs available",
    latitude: 30.0454,
    longitude: 31.2347,
  },
  // البنوك الخاصة
  {
    org_id: 2005,
    org_name_ar: "بنك الإسكندرية",
    org_name_en: "Bank of Alexandria",
    org_abbreviation: "BOA",
    description_ar: "92 ماكينة صراف آلي متاحة",
    description_en: "92 ATMs available",
    latitude: 30.0464,
    longitude: 31.2367,
  },
  {
    org_id: 2006,
    org_name_ar: "البنك التجاري الدولي",
    org_name_en: "Commercial International Bank",
    org_abbreviation: "CIB",
    description_ar: "185 ماكينة صراف آلي متاحة",
    description_en: "185 ATMs available",
    latitude: 30.0474,
    longitude: 31.2377,
  },
  {
    org_id: 2007,
    org_name_ar: "بنك فيصل الإسلامي",
    org_name_en: "Faisal Islamic Bank",
    org_abbreviation: "FIB",
    description_ar: "110 ماكينة صراف آلي متاحة",
    description_en: "110 ATMs available",
    latitude: 30.0484,
    longitude: 31.2387,
  },
  {
    org_id: 2008,
    org_name_ar: "بنك قطر الوطني الأهلي",
    org_name_en: "QNB Alahli",
    org_abbreviation: "QNB",
    description_ar: "143 ماكينة صراف آلي متاحة",
    description_en: "143 ATMs available",
    latitude: 30.0494,
    longitude: 31.2397,
  },
  {
    org_id: 2009,
    org_name_ar: "بنك كريدي أجريكول",
    org_name_en: "Credit Agricole Egypt",
    org_abbreviation: "CAE",
    description_ar: "78 ماكينة صراف آلي متاحة",
    description_en: "78 ATMs available",
    latitude: 30.0504,
    longitude: 31.2407,
  },
  {
    org_id: 2010,
    org_name_ar: "بنك الإمارات دبي الوطني",
    org_name_en: "Emirates NBD",
    org_abbreviation: "ENBD",
    description_ar: "95 ماكينة صراف آلي متاحة",
    description_en: "95 ATMs available",
    latitude: 30.0514,
    longitude: 31.2417,
  },
  {
    org_id: 2011,
    org_name_ar: "بنك عودة",
    org_name_en: "Bank Audi",
    org_abbreviation: "BA",
    description_ar: "67 ماكينة صراف آلي متاحة",
    description_en: "67 ATMs available",
    latitude: 30.0524,
    longitude: 31.2427,
  },
  {
    org_id: 2012,
    org_name_ar: "بنك المشرق",
    org_name_en: "Mashreq Bank",
    org_abbreviation: "MB",
    description_ar: "54 ماكينة صراف آلي متاحة",
    description_en: "54 ATMs available",
    latitude: 30.0534,
    longitude: 31.2437,
  },
  {
    org_id: 2013,
    org_name_ar: "البنك العربي الأفريقي",
    org_name_en: "Arab African International Bank",
    org_abbreviation: "AAIB",
    description_ar: "89 ماكينة صراف آلي متاحة",
    description_en: "89 ATMs available",
    latitude: 30.0544,
    longitude: 31.2447,
  },
  {
    org_id: 2014,
    org_name_ar: "بنك الاتحاد الوطني",
    org_name_en: "National Bank of Kuwait",
    org_abbreviation: "NBK",
    description_ar: "71 ماكينة صراف آلي متاحة",
    description_en: "71 ATMs available",
    latitude: 30.0554,
    longitude: 31.2457,
  },
  {
    org_id: 2015,
    org_name_ar: "بنك قناة السويس",
    org_name_en: "Suez Canal Bank",
    org_abbreviation: "SCB",
    description_ar: "63 ماكينة صراف آلي متاحة",
    description_en: "63 ATMs available",
    latitude: 30.0564,
    longitude: 31.2467,
  },
  {
    org_id: 2016,
    org_name_ar: "بنك التعمير والإسكان",
    org_name_en: "Housing and Development Bank",
    org_abbreviation: "HDB",
    description_ar: "58 ماكينة صراف آلي متاحة",
    description_en: "58 ATMs available",
    latitude: 30.0574,
    longitude: 31.2477,
  },
  {
    org_id: 2017,
    org_name_ar: "بنك الكويت الوطني",
    org_name_en: "National Bank of Kuwait Egypt",
    org_abbreviation: "NBKE",
    description_ar: "45 ماكينة صراف آلي متاحة",
    description_en: "45 ATMs available",
    latitude: 30.0584,
    longitude: 31.2487,
  },
  {
    org_id: 2018,
    org_name_ar: "بنك أبو ظبي الإسلامي",
    org_name_en: "Abu Dhabi Islamic Bank",
    org_abbreviation: "ADIB",
    description_ar: "52 ماكينة صراف آلي متاحة",
    description_en: "52 ATMs available",
    latitude: 30.0594,
    longitude: 31.2497,
  },
  {
    org_id: 2019,
    org_name_ar: "البنك المصري الخليجي",
    org_name_en: "Egyptian Gulf Bank",
    org_abbreviation: "EGB",
    description_ar: "41 ماكينة صراف آلي متاحة",
    description_en: "41 ATMs available",
    latitude: 30.0604,
    longitude: 31.2507,
  },
  {
    org_id: 2020,
    org_name_ar: "بنك الاستثمار العربي",
    org_name_en: "Arab Investment Bank",
    org_abbreviation: "AIB",
    description_ar: "38 ماكينة صراف آلي متاحة",
    description_en: "38 ATMs available",
    latitude: 30.0614,
    longitude: 31.2517,
  },
  {
    org_id: 2021,
    org_name_ar: "بنك البركة",
    org_name_en: "Al Baraka Bank",
    org_abbreviation: "ABB",
    description_ar: "49 ماكينة صراف آلي متاحة",
    description_en: "49 ATMs available",
    latitude: 30.0624,
    longitude: 31.2527,
  },
  {
    org_id: 2022,
    org_name_ar: "بنك الأهلي المتحد",
    org_name_en: "Ahli United Bank",
    org_abbreviation: "AUB",
    description_ar: "36 ماكينة صراف آلي متاحة",
    description_en: "36 ATMs available",
    latitude: 30.0634,
    longitude: 31.2537,
  },
  {
    org_id: 2023,
    org_name_ar: "بنك HSBC مصر",
    org_name_en: "HSBC Bank Egypt",
    org_abbreviation: "HSBC",
    description_ar: "82 ماكينة صراف آلي متاحة",
    description_en: "82 ATMs available",
    latitude: 30.0644,
    longitude: 31.2547,
  },
  {
    org_id: 2024,
    org_name_ar: "بنك ساب",
    org_name_en: "Sabb Bank",
    org_abbreviation: "SABB",
    description_ar: "31 ماكينة صراف آلي متاحة",
    description_en: "31 ATMs available",
    latitude: 30.0654,
    longitude: 31.2557,
  },
  {
    org_id: 2025,
    org_name_ar: "بنك بلوم مصر",
    org_name_en: "Blom Bank Egypt",
    org_abbreviation: "BBE",
    description_ar: "28 ماكينة صراف آلي متاحة",
    description_en: "28 ATMs available",
    latitude: 30.0664,
    longitude: 31.2567,
  },
  {
    org_id: 2026,
    org_name_ar: "بنك عابر",
    org_name_en: "Aaib Bank",
    org_abbreviation: "AAIB",
    description_ar: "44 ماكينة صراف آلي متاحة",
    description_en: "44 ATMs available",
    latitude: 30.0674,
    longitude: 31.2577,
  },
  {
    org_id: 2027,
    org_name_ar: "بنك المؤسسة العربية المصرفية",
    org_name_en: "Arab Banking Corporation",
    org_abbreviation: "ABC",
    description_ar: "33 ماكينة صراف آلي متاحة",
    description_en: "33 ATMs available",
    latitude: 30.0684,
    longitude: 31.2587,
  },
  {
    org_id: 2028,
    org_name_ar: "بنك المصرف المتحد",
    org_name_en: "United Bank",
    org_abbreviation: "UB",
    description_ar: "29 ماكينة صراف آلي متاحة",
    description_en: "29 ATMs available",
    latitude: 30.0694,
    longitude: 31.2597,
  },
  {
    org_id: 2029,
    org_name_ar: "بنك الشركة المصرفية العربية الدولية",
    org_name_en: "Societe Arabe Internationale de Banque",
    org_abbreviation: "SAIB",
    description_ar: "56 ماكينة صراف آلي متاحة",
    description_en: "56 ATMs available",
    latitude: 30.0704,
    longitude: 31.2607,
  },
  {
    org_id: 2030,
    org_name_ar: "بنك أبو ظبي التجاري",
    org_name_en: "Abu Dhabi Commercial Bank",
    org_abbreviation: "ADCB",
    description_ar: "47 ماكينة صراف آلي متاحة",
    description_en: "47 ATMs available",
    latitude: 30.0714,
    longitude: 31.2617,
  },
];

const mockATMs = {
  2001: [
    {
      atm_id: 5001,
      name_ar: " ميدان التحرير",
      name_en: "Tahrir Square ",
      latitude: 30.0444,
      longitude: 31.2357,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5002,
      name_ar: " مدينة نصر",
      name_en: "Nasr City ",
      latitude: 30.0544,
      longitude: 31.3357,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5003,
      name_ar: " المعادي",
      name_en: "Maadi ",
      latitude: 29.9644,
      longitude: 31.2557,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 1,
      denominations: [100, 50, 20],
    },
    {
      atm_id: 5004,
      name_ar: " الزمالك",
      name_en: "Zamalek ",
      latitude: 30.0644,
      longitude: 31.2157,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 4,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5005,
      name_ar: " مصر الجديدة",
      name_en: "Heliopolis ",
      latitude: 30.0944,
      longitude: 31.3257,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100],
    },
    {
      atm_id: 5006,
      name_ar: " الدقي",
      name_en: "Dokki ",
      latitude: 30.0384,
      longitude: 31.2127,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 5,
      denominations: [100, 50],
    },
    {
      atm_id: 5007,
      name_ar: " المهندسين",
      name_en: "Mohandessin ",
      latitude: 30.0484,
      longitude: 31.2027,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5008,
      name_ar: " مول سيتي ستارز",
      name_en: "City Stars Mall",
      latitude: 30.0744,
      longitude: 31.3457,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 6,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5009,
      name_ar: " الشيخ زايد",
      name_en: "Sheikh Zayed ",
      latitude: 30.0244,
      longitude: 30.9857,
      isActive: false,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 0,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5010,
      name_ar: " التجمع الخامس",
      name_en: "Fifth Settlement ",
      latitude: 30.0284,
      longitude: 31.4357,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50],
    },
  ],
  2002: [
    {
      atm_id: 5011,
      name_ar: " رمسيس",
      name_en: "Ramses ",
      latitude: 30.0555,
      longitude: 31.245,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5012,
      name_ar: " الجيزة",
      name_en: "Giza ",
      latitude: 30.0155,
      longitude: 31.205,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 2,
      denominations: [100, 50],
    },
    {
      atm_id: 5013,
      name_ar: " عابدين",
      name_en: "Abdin ",
      latitude: 30.0455,
      longitude: 31.245,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 4,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5014,
      name_ar: " فيصل",
      name_en: "Faisal ",
      latitude: 30.0055,
      longitude: 31.175,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100],
    },
    {
      atm_id: 5015,
      name_ar: " العباسية",
      name_en: "Abbassia ",
      latitude: 30.0755,
      longitude: 31.285,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 5,
      denominations: [100, 50, 20],
    },
    {
      atm_id: 5016,
      name_ar: " حدائق القبة",
      name_en: "Hadayek El Kobba ",
      latitude: 30.0855,
      longitude: 31.295,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5017,
      name_ar: " شبرا",
      name_en: "Shobra ",
      latitude: 30.0955,
      longitude: 31.255,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5018,
      name_ar: " الهرم",
      name_en: "Haram ",
      latitude: 29.9955,
      longitude: 31.145,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 4,
      denominations: [100, 50],
    },
    {
      atm_id: 5019,
      name_ar: " مدينتي",
      name_en: "Madinaty ",
      latitude: 30.0985,
      longitude: 31.645,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5020,
      name_ar: " 6 أكتوبر",
      name_en: "6th of October ",
      latitude: 29.9555,
      longitude: 30.925,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100],
    },
  ],
  2003: [
    {
      atm_id: 5021,
      name_ar: " شارع الجمهورية",
      name_en: "Gomhoreya Street ",
      latitude: 30.0333,
      longitude: 31.22,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5022,
      name_ar: " العتبة",
      name_en: "Ataba ",
      latitude: 30.0533,
      longitude: 31.25,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 3,
      denominations: [100, 50],
    },
    {
      atm_id: 5023,
      name_ar: " باب اللوق",
      name_en: "Bab El Louk ",
      latitude: 30.0433,
      longitude: 31.23,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5024,
      name_ar: " المنيل",
      name_en: "Manial ",
      latitude: 30.0233,
      longitude: 31.23,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 4,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5025,
      name_ar: " روض الفرج",
      name_en: "Rod El Farag ",
      latitude: 30.0733,
      longitude: 31.24,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 2,
      denominations: [100, 50, 20],
    },
    {
      atm_id: 5026,
      name_ar: " بولاق الدكرور",
      name_en: "Boulaq El Dakrour ",
      latitude: 30.0133,
      longitude: 31.19,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100],
    },
    {
      atm_id: 5027,
      name_ar: " إمبابة",
      name_en: "Imbaba ",
      latitude: 30.0633,
      longitude: 31.21,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 5,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5028,
      name_ar: " العجوزة",
      name_en: "Agouza ",
      latitude: 30.0533,
      longitude: 31.205,
      isActive: false,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 0,
      denominations: [100, 50],
    },
    {
      atm_id: 5029,
      name_ar: " مصر القديمة",
      name_en: "Misr El Qadima ",
      latitude: 30.0083,
      longitude: 31.23,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5030,
      name_ar: " البساتين",
      name_en: "Basateen ",
      latitude: 29.9833,
      longitude: 31.265,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100, 50, 20],
    },
  ],
  2004: [
    {
      atm_id: 5031,
      name_ar: " وسط البلد",
      name_en: "Downtown ",
      latitude: 30.0454,
      longitude: 31.2347,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5032,
      name_ar: " مدينة السلام",
      name_en: "Salam City ",
      latitude: 30.1154,
      longitude: 31.395,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 2,
      denominations: [100, 50],
    },
    {
      atm_id: 5033,
      name_ar: " عين شمس",
      name_en: "Ain Shams ",
      latitude: 30.1254,
      longitude: 31.32,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 4,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5034,
      name_ar: " المطرية",
      name_en: "Matareya ",
      latitude: 30.1354,
      longitude: 31.31,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100],
    },
    {
      atm_id: 5035,
      name_ar: " القاهرة الجديدة",
      name_en: "New Cairo ",
      latitude: 30.0154,
      longitude: 31.465,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 5,
      denominations: [100, 50, 20],
    },
    {
      atm_id: 5036,
      name_ar: " التجمع الأول",
      name_en: "First Settlement ",
      latitude: 30.0254,
      longitude: 31.455,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5037,
      name_ar: " التجمع الثالث",
      name_en: "Third Settlement ",
      latitude: 30.0354,
      longitude: 31.475,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5038,
      name_ar: " الرحاب",
      name_en: "Rehab ",
      latitude: 30.0554,
      longitude: 31.495,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 4,
      denominations: [100, 50],
    },
    {
      atm_id: 5039,
      name_ar: " مول العرب",
      name_en: "Mall of Arabia",
      latitude: 29.9754,
      longitude: 30.935,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 6,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5040,
      name_ar: " كايرو فيستيفال",
      name_en: "Cairo Festival City Mall",
      latitude: 30.0304,
      longitude: 31.405,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100],
    },
  ],
  2005: [
    {
      atm_id: 5041,
      name_ar: " ميدان طلعت حرب",
      name_en: "Talaat Harb Square ",
      latitude: 30.0464,
      longitude: 31.2367,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5042,
      name_ar: " قصر النيل",
      name_en: "Kasr El Nile ",
      latitude: 30.0464,
      longitude: 31.2267,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 3,
      denominations: [100, 50],
    },
    {
      atm_id: 5043,
      name_ar: " جاردن سيتي",
      name_en: "Garden City ",
      latitude: 30.0364,
      longitude: 31.2317,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5044,
      name_ar: " الشيراتون",
      name_en: "Sheraton ",
      latitude: 30.0864,
      longitude: 31.325,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 4,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5045,
      name_ar: " الكوربة",
      name_en: "Korba ",
      latitude: 30.0964,
      longitude: 31.335,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 2,
      denominations: [100, 50, 20],
    },
    {
      atm_id: 5046,
      name_ar: " روكسي",
      name_en: "Roxy ",
      latitude: 30.0964,
      longitude: 31.315,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100],
    },
    {
      atm_id: 5047,
      name_ar: " ألماظة",
      name_en: "Almaza ",
      latitude: 30.0864,
      longitude: 31.345,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 5,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5048,
      name_ar: " مصر والسودان",
      name_en: "Misr Wa Sudan ",
      latitude: 30.0564,
      longitude: 31.235,
      isActive: false,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 0,
      denominations: [100, 50],
    },
    {
      atm_id: 5049,
      name_ar: " بورسعيد",
      name_en: "Port Said Street ",
      latitude: 30.0664,
      longitude: 31.245,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5050,
      name_ar: " السيدة زينب",
      name_en: "Sayeda Zeinab ",
      latitude: 30.0264,
      longitude: 31.235,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100, 50, 20],
    },
  ],
  2006: [
    {
      atm_id: 5051,
      name_ar: " المقطم",
      name_en: "Mokattam ",
      latitude: 30.0074,
      longitude: 31.285,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5052,
      name_ar: " كورنيش النيل",
      name_en: "Nile Corniche ",
      latitude: 30.0474,
      longitude: 31.225,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 2,
      denominations: [100, 50],
    },
    {
      atm_id: 5053,
      name_ar: " أركان مول",
      name_en: "Arkan Mall ",
      latitude: 30.0174,
      longitude: 30.975,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 4,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5054,
      name_ar: " الحصري",
      name_en: "Hossary ",
      latitude: 30.0274,
      longitude: 30.995,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100],
    },
    {
      atm_id: 5055,
      name_ar: " زهراء المعادي",
      name_en: "Zahraa El Maadi ",
      latitude: 29.9574,
      longitude: 31.265,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 5,
      denominations: [100, 50, 20],
    },
    {
      atm_id: 5056,
      name_ar: " دجلة المعادي",
      name_en: "Degla Maadi ",
      latitude: 29.9674,
      longitude: 31.275,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5057,
      name_ar: " سراي القبة",
      name_en: "Saray El Koba ",
      latitude: 30.0874,
      longitude: 31.285,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5058,
      name_ar: " المعراج",
      name_en: "El Meraag ",
      latitude: 30.0974,
      longitude: 31.295,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 4,
      denominations: [100, 50],
    },
    {
      atm_id: 5059,
      name_ar: " الداون تاون",
      name_en: "Downtown Mall ",
      latitude: 30.0324,
      longitude: 31.475,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 6,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5060,
      name_ar: " بوينت 90",
      name_en: "Point 90 Mall",
      latitude: 30.0274,
      longitude: 31.485,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100],
    },
  ],
  2007: [
    {
      atm_id: 5061,
      name_ar: " الدقي الرئيسي",
      name_en: "Dokki Main ",
      latitude: 30.0384,
      longitude: 31.2127,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5062,
      name_ar: " محور 26 يوليو",
      name_en: "26th July Axis ",
      latitude: 30.0484,
      longitude: 31.2227,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 3,
      denominations: [100, 50],
    },
    {
      atm_id: 5063,
      name_ar: " مساكن شيراتون",
      name_en: "Sheraton Heliopolis ",
      latitude: 30.0884,
      longitude: 31.335,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5064,
      name_ar: " النزهة الجديدة",
      name_en: "Nozha El Gedida ",
      latitude: 30.1084,
      longitude: 31.345,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 4,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5065,
      name_ar: " شيراتون المطار",
      name_en: "Airport Sheraton ",
      latitude: 30.1184,
      longitude: 31.405,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 2,
      denominations: [100, 50, 20],
    },
    {
      atm_id: 5066,
      name_ar: " كارفور المعادي",
      name_en: "Carrefour Maadi ",
      latitude: 29.9644,
      longitude: 31.255,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 5,
      denominations: [200, 100],
    },
    {
      atm_id: 5067,
      name_ar: " كارفور الإسكندرية الصحراوي",
      name_en: "Carrefour Alex Road ",
      latitude: 30.0084,
      longitude: 31.185,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5068,
      name_ar: " الحي السابع",
      name_en: "7th District ",
      latitude: 30.0184,
      longitude: 31.445,
      isActive: false,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 0,
      denominations: [100, 50],
    },
    {
      atm_id: 5069,
      name_ar: " الياسمين",
      name_en: "Yasmine ",
      latitude: 30.0384,
      longitude: 31.485,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5070,
      name_ar: " النرجس",
      name_en: "Narges ",
      latitude: 30.0484,
      longitude: 31.495,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100, 50, 20],
    },
  ],
  2008: [
    {
      atm_id: 5071,
      name_ar: " نايل سيتي",
      name_en: "Nile City Towers ",
      latitude: 30.0494,
      longitude: 31.2397,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5072,
      name_ar: " سموحة",
      name_en: "Smouha ",
      latitude: 31.2294,
      longitude: 29.9497,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 2,
      denominations: [100, 50],
    },
    {
      atm_id: 5073,
      name_ar: " ميامي",
      name_en: "Miami ",
      latitude: 31.2594,
      longitude: 29.9897,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 4,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5074,
      name_ar: " سان استيفانو",
      name_en: "San Stefano ",
      latitude: 31.2494,
      longitude: 29.9697,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100],
    },
    {
      atm_id: 5075,
      name_ar: " جرين بلازا",
      name_en: "Green Plaza ",
      latitude: 31.2394,
      longitude: 29.9597,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 5,
      denominations: [100, 50, 20],
    },
    {
      atm_id: 5076,
      name_ar: " كفر عبده",
      name_en: "Kafr Abdo ",
      latitude: 31.2194,
      longitude: 29.9297,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5077,
      name_ar: " لوران",
      name_en: "Laurent ",
      latitude: 31.2094,
      longitude: 29.9197,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5078,
      name_ar: " محطة الرمل",
      name_en: "Raml Station ",
      latitude: 31.1994,
      longitude: 29.9097,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 4,
      denominations: [100, 50],
    },
    {
      atm_id: 5079,
      name_ar: " سيدي جابر",
      name_en: "Sidi Gaber ",
      latitude: 31.2294,
      longitude: 29.9397,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 6,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5080,
      name_ar: " المنتزه",
      name_en: "Montaza ",
      latitude: 31.2694,
      longitude: 30.0097,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100],
    },
  ],
  2009: [
    {
      atm_id: 5081,
      name_ar: " شارع 9",
      name_en: "Street 9 ",
      latitude: 30.0504,
      longitude: 31.2407,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5082,
      name_ar: " شارع النيل",
      name_en: "Nile Street ",
      latitude: 30.0604,
      longitude: 31.2207,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 3,
      denominations: [100, 50],
    },
    {
      atm_id: 5083,
      name_ar: " الأندلس",
      name_en: "Andalus ",
      latitude: 30.0704,
      longitude: 31.2507,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5084,
      name_ar: " المريوطية",
      name_en: "Marioutia ",
      latitude: 30.0004,
      longitude: 31.195,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 4,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5085,
      name_ar: " أوسيم",
      name_en: "Ausim ",
      latitude: 30.1204,
      longitude: 31.125,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 2,
      denominations: [100, 50, 20],
    },
    {
      atm_id: 5086,
      name_ar: " العمرانية",
      name_en: "Omrania ",
      latitude: 30.0304,
      longitude: 31.175,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100],
    },
    {
      atm_id: 5087,
      name_ar: " الوراق",
      name_en: "Warraq ",
      latitude: 30.0404,
      longitude: 31.165,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 5,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5088,
      name_ar: " البراجيل",
      name_en: "Barageel ",
      latitude: 30.0104,
      longitude: 31.185,
      isActive: false,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 0,
      denominations: [100, 50],
    },
    {
      atm_id: 5089,
      name_ar: " الحرانية",
      name_en: "Haraneya ",
      latitude: 29.9304,
      longitude: 31.135,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5090,
      name_ar: " سقارة",
      name_en: "Saqqara ",
      latitude: 29.8704,
      longitude: 31.215,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100, 50, 20],
    },
  ],
  2010: [
    {
      atm_id: 5091,
      name_ar: " صن سيتي مول",
      name_en: "Sun City Mall ",
      latitude: 30.0514,
      longitude: 31.2417,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5092,
      name_ar: " كونكورد",
      name_en: "Concord ",
      latitude: 30.0614,
      longitude: 31.2517,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 2,
      denominations: [100, 50],
    },
    {
      atm_id: 5093,
      name_ar: " مول مصر",
      name_en: "Mall of Egypt ",
      latitude: 30.0014,
      longitude: 30.955,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 4,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5094,
      name_ar: " هايبر وان",
      name_en: "Hyper One ",
      latitude: 30.0414,
      longitude: 31.4117,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 1,
      denominations: [200, 100],
    },
    {
      atm_id: 5095,
      name_ar: " كايرو فيستيفال",
      name_en: "Cairo Festival ",
      latitude: 30.0314,
      longitude: 31.4017,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 5,
      denominations: [100, 50, 20],
    },
    {
      atm_id: 5096,
      name_ar: " جنينة مول",
      name_en: "Genena Mall ",
      latitude: 30.0714,
      longitude: 31.3417,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100, 50],
    },
    {
      atm_id: 5097,
      name_ar: " طنطاوي",
      name_en: "Tantawy ",
      latitude: 30.0114,
      longitude: 31.465,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 2,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5098,
      name_ar: " فاميلي مول",
      name_en: "Family Mall ",
      latitude: 30.0214,
      longitude: 31.455,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: false,
      queue: 4,
      denominations: [100, 50],
    },
    {
      atm_id: 5099,
      name_ar: " طيبة مول",
      name_en: "Tiba Mall ",
      latitude: 30.0514,
      longitude: 31.505,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 6,
      denominations: [200, 100, 50, 20],
    },
    {
      atm_id: 5100,
      name_ar: " كايرو كارنيفال",
      name_en: "Cairo Carnival ",
      latitude: 30.0614,
      longitude: 31.515,
      isActive: true,
      allows_withdrawal: true,
      allows_deposit: true,
      queue: 3,
      denominations: [200, 100],
    },
  ],
};

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

const mockServices = [
  {
    service_id: 11,
    name_ar: "البنوك",
    name_en: "Banks",
    type: "bank",
    org_image: "/service_images/Banks.webp",
    description_ar: "ابحث عن أقرب فرع بنك في منطقتك",
    description_en: "Find the nearest bank branch in your area",
  },
  {
    service_id: 7,
    name_ar: "الأحوال المدنية",
    name_en: "Civil Status",
    type: "civil_status",
    org_image: "/service_images/Civil_Registry.jpg",
    description_ar: "خدمات الأحوال المدنية والوثائق الرسمية",
    description_en: "Civil status services and official documents",
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    console.log("Selected Org:", org);
    console.log("ATMs for this org:", mockATMs[org.org_id]);
    setSelectedBranch(org);
    setScreen("atm-list");
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

      {/* Navbar */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto main-shadow p-2 border-15">
        {/* Left side - Desktop buttons
        <div className="hidden md:flex gap-3">
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
          <Link href="/features/auth/admin-login">
            <button
              style={{
                backgroundColor: "#36e27b",
                color: "#111714",
              }}
              className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {t.adminLogin}
            </button>
          </Link>
          <Link href="/features/auth/signup">
            <button
              style={{
                backgroundColor: "#36e27b",
                color: "#111714",
              }}
              className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {t.signupOrg}
            </button>
          </Link>
        </div> */}

        {/* Mobile menu button */}
        {/* <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              backgroundColor: "#36e27b",
              color: "#111714",
            }}
            className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {t.menu} ☰
          </button>
        </div> */}

        {/* Left side - Desktop buttons */}
        <div className="hidden md:flex gap-3">
          {/* Dark Mode Toggle */}
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

          {/* Language Toggle */}
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

          {/* Admin Login */}
          <Link href="/features/auth/admin-login" passHref>
            <button
              style={{
                backgroundColor: "#36e27b",
                color: "#111714",
              }}
              className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {t.adminLogin}
            </button>
          </Link>

          {/* Sign Up */}
          <Link href="/features/auth/signup" passHref>
            <button
              style={{
                backgroundColor: "#36e27b",
                color: "#111714",
              }}
              className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {t.signupOrg}
            </button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              backgroundColor: "#36e27b",
              color: "#111714",
            }}
            className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {t.menu} ☰
          </button>
        </div>

        {/* Right side - Logo */}
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
            <img
              src="/logo-removebg-preview.png"
              alt="logo"
              className="logo"
              style={{ width: "50px" }}
            />
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden mb-4 p-4 rounded-lg max-w-6xl mx-auto"
          style={{
            backgroundColor: darkMode ? "#1a1a1a" : "#f5f5f5",
          }}
        >
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setMobileMenuOpen(false);
              }}
              style={{
                backgroundColor: darkMode ? "#36e27b" : "#e8f4f8",
                color: darkMode ? "#111714" : "#36e27b",
              }}
              className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            <button
              onClick={() => {
                setLanguage(language === "ar" ? "en" : "ar");
                setMobileMenuOpen(false);
              }}
              style={{
                backgroundColor: "#36e27b",
                color: "#111714",
              }}
              className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {language === "ar" ? "English" : "العربية"}
            </button>
            <Link href="/features/auth/admin-login">
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  backgroundColor: "#36e27b",
                  color: "#111714",
                }}
                className="w-full px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                {t.adminLogin}
              </button>
            </Link>
            <Link href="/features/auth/signup">
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  backgroundColor: "#36e27b",
                  color: "#111714",
                }}
                className="w-full px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                {t.signupOrg}
              </button>
            </Link>
          </div>
        </div>
      )}

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
            atms={mockATMs[selectedOrganization.org_id] || []}
            branchName={getOrgName(selectedOrganization)}
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
