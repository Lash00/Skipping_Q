'use client';

import Card from '@/components/reuse_components/Card';

export default function OrganizationSelector({ organizations, onSelectOrganization, language, getOrgName, getOrgDesc, darkMode }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 style={{ color: '#36e27b' }} className="text-4xl font-bold mb-2">
          {language === 'ar' ? 'اختر البنك' : 'Select Bank'}
        </h1>
        <p style={{ color: '#a8bbb3' }} className="text-lg">
          {language === 'ar' ? 'اختر البنك الذي تريد الوصول إلى خدماته' : 'Choose the bank you want to access'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <button
            key={org.org_id}
            onClick={() => onSelectOrganization(org)}
            className="text-left transition hover:scale-105 hover:shadow-xl"
          >
            <Card darkMode={darkMode}>
              <div className="flex items-start justify-between mb-4">
                <div
                  style={{
                    backgroundColor: '#e8f4f8',
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
                  🏦
                </div>
              </div>

              <h3 style={{ color: '#36e27b' }} className="text-2xl font-bold mb-2">
                {getOrgName(org)}
              </h3>

              <p style={{ color: '#a8bbb3' }} className="text-sm mb-4">
                {getOrgDesc(org)}
              </p>

              <div
                style={{
                  backgroundColor: '#36e27b',
                  color: '#111714',
                }}
                className="inline-block px-4 py-2 rounded-lg font-semibold text-sm"
              >
                {language === 'ar' ? 'اختر البنك' : 'Select Bank'}
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
