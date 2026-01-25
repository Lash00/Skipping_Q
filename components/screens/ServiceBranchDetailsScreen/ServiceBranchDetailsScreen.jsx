"use client";

import Card from "@/components/reuse_components/Card";

const serviceDetails = {
  hospital: {
    icon: "🏥",
    details: [
      { label: "الأقسام", value: "الطوارئ، القلب، الأشعات، الجراحة" },
      { label: "الأطباء المتاحين", value: "12 طبيب" },
      { label: "وقت الانتظار", value: "45 دقيقة" },
      { label: "الحالات الطارئة", value: "✅ متاح 24/7" },
    ],
  },
  post_office: {
    icon: "📮",
    details: [
      {
        label: "الخدمات",
        value: "إرسال الطرود، التحويلات المالية، دفع الفواتير، البريد",
      },
      { label: "ساعات العمل", value: "8 صباحاً - 6 مساءً" },
      { label: "أيام العمل", value: "السبت - الخميس" },
      { label: "رسوم التحويل", value: "تختلف حسب المبلغ" },
    ],
  },
  telecom: {
    icon: "📱",
    details: [
      {
        label: "الخدمات",
        value: "بدل الشرائح، دفع الفواتير، ترقية الخطة، إصلاح الأجهزة",
      },
      { label: "دعم العملاء", value: "✅ دردشة مباشرة متاحة" },
      { label: "ساعات العمل", value: "9 صباحاً - 9 مساءً" },
      { label: "الأجهزة المدعومة", value: "جميع الأجهزة" },
    ],
  },
  traffic: {
    icon: "🚗",
    details: [
      {
        label: "الخدمات",
        value: "تجديد الرخص، تسجيل السيارات، دفع المخالفات، الفحص الدوري",
      },
      { label: "عدد الشبابيك", value: "4 شبابيك متاحة" },
      { label: "المستندات المطلوبة", value: "الهوية، الرخصة، الفحص الطبي" },
      { label: "رسوم التجديد", value: "200 جنيه" },
    ],
  },
  real_estate: {
    icon: "🏠",
    details: [
      {
        label: "الخدمات",
        value: "تسجيل العقارات، تحويل الملكية، التحقق من الملفات",
      },
      { label: "الرسوم", value: "2% من قيمة العقار" },
      { label: "وقت الإجراء", value: "3 - 5 أيام عمل" },
      { label: "المستندات المطلوبة", value: "عقد الشراء، الهوية، الحجة" },
    ],
  },
  health_insurance: {
    icon: "💳",
    details: [
      {
        label: "الخدمات",
        value: "تجديد البوليصات، عضويات جديدة، تسويات الدعاوى",
      },
      { label: "الخطط المتاحة", value: "5 خطط مختلفة" },
      { label: "التغطية", value: "الفحوصات الطبية والعمليات" },
      { label: "الخصومات", value: "حتى 30% للمجموعات" },
    ],
  },
  civil_status: {
    icon: "🧾",
    details: [
      {
        label: "الخدمات",
        value: "شهادات الميلاد، شهادات الزواج، تعديل البيانات",
      },
      { label: "وقت الانتظار", value: "30 دقيقة" },
      { label: "رسوم الشهادة", value: "10 جنيه" },
      { label: "صلاحية الشهادة", value: "دائمة" },
    ],
  },
  immigration: {
    icon: "🌍",
    details: [
      {
        label: "الخدمات",
        value: "تأشيرات الدخول، تجديد الإقامة، حجز المواعيد",
      },
      { label: "أنواع الإقامة", value: "سياحية، عمل، دراسة" },
      { label: "المدة المعالجة", value: "5 - 10 أيام عمل" },
      { label: "الرسوم", value: "تختلف حسب نوع التأشيرة" },
    ],
  },
  gas_station: {
    icon: "⛽",
    details: [
      { label: "أنواع الوقود", value: "بنزين 92، بنزين 95، ديزل" },
      { label: "التوفر", value: "متاح الآن" },
      { label: "الطابور", value: "سيارتان في الانتظار" },
      { label: "السعر الحالي", value: "10.25 جنيه / لتر" },
    ],
  },
  passport: {
    icon: "🛂",
    details: [
      { label: "الخدمات", value: "جوازات جديدة، تجديد، استخراج مكرر" },
      { label: "المواعيد المتاحة", value: "15 موعد اليوم" },
      { label: "المدة", value: "يوم عمل واحد" },
      { label: "الرسوم", value: "150 جنيه للجواز الجديد" },
    ],
  },
};

export default function ServiceBranchDetailsScreen({
  branch,
  serviceType,
  serviceName,
  language,
  darkMode,
}) {
  const details = serviceDetails[serviceType] || {};

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 style={{ color: "#36e27b" }} className="text-4xl font-bold mb-2">
          {branch.name}
        </h1>
        <p style={{ color: "#a8bbb3" }} className="text-lg">
          {serviceName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card darkMode={darkMode}>
          <div className="flex items-start gap-6 mb-8">
            <div
              style={{
                backgroundColor: "#e8f4f8",
                color: "#36e27b",
                width: "64px",
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                fontSize: "36px",
              }}
            >
              {details.icon}
            </div>

            <div className="flex-1">
              <h2
                style={{ color: "#36e27b" }}
                className="text-2xl font-bold mb-1"
              >
                {branch.name}
              </h2>
              <p style={{ color: "#a8bbb3" }} className="text-sm">
                📍 {branch.latitude.toFixed(4)}, {branch.longitude.toFixed(4)}
              </p>
            </div>
          </div>

          <div
            style={{ backgroundColor: "#e8f4f8", borderRadius: "8px" }}
            className="p-4 space-y-3"
          >
            {details.details &&
              details.details.map((item, idx) => (
                <div key={idx}>
                  <p
                    style={{ color: "#18472b" }}
                    className="text-sm font-semibold mb-1"
                  >
                    {item.label}
                  </p>
                  <p style={{ color: "#111714" }} className="text-sm">
                    {item.value}
                  </p>
                </div>
              ))}
          </div>
        </Card>

        <Card darkMode={darkMode}>
          <h3 style={{ color: "#36e27b" }} className="text-2xl font-bold mb-6">
            معلومات الاتصال
          </h3>

          <div className="space-y-4">
            <div
              style={{
                backgroundColor: "#e8f4f8",
                borderRadius: "8px",
              }}
              className="p-4"
            >
              <p
                style={{ color: "#18472b" }}
                className="text-sm font-semibold mb-2"
              >
                ☎️ الهاتف
              </p>
              <p style={{ color: "#111714" }} className="font-mono">
                +20 2 25671234
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#e8f4f8",
                borderRadius: "8px",
              }}
              className="p-4"
            >
              <p
                style={{ color: "#18472b" }}
                className="text-sm font-semibold mb-2"
              >
                ⏰ ساعات العمل
              </p>
              <p style={{ color: "#111714" }}>
                الأحد - الخميس: 8 صباحاً - 6 مساءً
              </p>
              <p style={{ color: "#111714" }}>الجمعة و السبت: مغلق</p>
            </div>

            <div
              style={{
                backgroundColor: "#e8f4f8",
                borderRadius: "8px",
              }}
              className="p-4"
            >
              <p
                style={{ color: "#18472b" }}
                className="text-sm font-semibold mb-2"
              >
                📧 البريد الإلكتروني
              </p>
              <p style={{ color: "#111714" }}>info@service.eg</p>
            </div>

            <button
              style={{
                backgroundColor: "#36e27b",
                color: "#111714",
              }}
              className="w-full px-4 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition mt-6"
            >
              🗺️ فتح على الخريطة
            </button>

            <button
              style={{
                backgroundColor: "#e8f4f8",
                color: "#36e27b",
                border: "2px solid #36e27b",
              }}
              className="w-full px-4 py-3 rounded-lg font-semibold text-lg hover:bg-green-50 transition"
            >
              ☎️ اتصل الآن
            </button>
          </div>
        </Card>
      </div>

      <Card darkMode={darkMode} className="mt-6">
        <h3 style={{ color: "#36e27b" }} className="text-2xl font-bold mb-4">
          📍 الموقع على الخريطة
        </h3>
        <div
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #d4e0db",
          }}
        >
          <div className="text-center">
            <p style={{ color: "#36e27b" }} className="text-5xl mb-4">
              📍
            </p>
            <p
              style={{ color: "#a8bbb3" }}
              className="font-semibold text-lg mb-2"
            >
              {branch.name}
            </p>
            <p style={{ color: "#a8bbb3" }} className="font-mono text-sm">
              {branch.latitude.toFixed(6)}, {branch.longitude.toFixed(6)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
