'use client';

import Card from '@/components/reuse_components/Card';

export default function BankTypeSelector({ organization, onSelectBankType, language, getOrgName, darkMode }) {
  const bankTypes = [
    { id: 1, name_ar: 'حسابات جارية', name_en: 'Current Accounts', icon: '💼' },
    { id: 2, name_ar: 'حسابات التوفير', name_en: 'Savings Accounts', icon: '🏦' },
    { id: 3, name_ar: 'القروض', name_en: 'Loans', icon: '💳' },
    { id: 4, name_ar: 'خدمات الاستثمار', name_en: 'Investment Services', icon: '📈' },
    { id: 5, name_ar: 'التحويلات الدولية', name_en: 'International Transfers', icon: '🌍' },
    { id: 6, name_ar: 'خدمات الصرافة', name_en: 'Currency Exchange', icon: '💱' },
  ];

  const getTypeName = (type) => language === 'ar' ? type.name_ar : type.name_en;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 style={{ color: '#36e27b' }} className="text-3xl font-bold mb-2">
          {getOrgName(organization)}
        </h2>
        <h1 style={{ color: '#36e27b' }} className="text-4xl font-bold mb-2">
          {language === 'ar' ? 'اختر نوع الخدمة' : 'Select Service Type'}
        </h1>
        <p style={{ color: '#a8bbb3' }} className="text-lg">
          {language === 'ar' ? 'اختر نوع الخدمة البنكية التي تريدها' : 'Choose the banking service you need'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bankTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelectBankType(type)}
            className="text-left transition hover:scale-105 hover:shadow-xl"
          >
            <Card darkMode={darkMode}>
              <div className="flex items-start justify-between mb-4">
                <div
                  style={{
                    backgroundColor: darkMode ? '#2a2a2a' : '#e8f4f8',
                    color: '#36e27b',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    fontSize: '24px',
                  }}
                >
                  {type.icon}
                </div>
              </div>

              <h3 style={{ color: '#36e27b' }} className="text-xl font-bold mb-3">
                {getTypeName(type)}
              </h3>

              <div
                style={{
                  backgroundColor: '#36e27b',
                  color: '#111714',
                }}
                className="inline-block px-4 py-2 rounded-lg font-semibold text-sm w-full text-center"
              >
                {language === 'ar' ? 'اختر' : 'Select'}
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
