'use client';

import Card from '@/components/reuse_components/Card';
import DistanceCalculator from '@/components/reuse_components/DistanceCalculator';
import { useState } from 'react';

// Mock data for different services
const mockServiceBranches = {
  hospital: [
    {
      branch_id: 10001,
      name: 'مستشفى العباسية',
      latitude: 30.0650,
      longitude: 31.2400,
      departments: 'الطوارئ، القلب، الأشعات',
      doctors: 12,
      waitTime: '45 دقيقة',
      emergency: true,
    },
    {
      branch_id: 10002,
      name: 'مستشفى قصر العيني',
      latitude: 30.0400,
      longitude: 31.2300,
      departments: 'الجراحة، النساء، الأطفال',
      doctors: 18,
      waitTime: '60 دقيقة',
      emergency: true,
    },
  ],
  post_office: [
    {
      branch_id: 10003,
      name: 'مكتب البريد المركزي',
      latitude: 30.0500,
      longitude: 31.2350,
      services: '📦 الطرود، 💸 التحويلات، 🧾 الفواتير',
      workingHours: '8 صباحاً - 6 مساءً',
      queue: 8,
    },
    {
      branch_id: 10004,
      name: 'مكتب البريد الفرعي',
      latitude: 30.0600,
      longitude: 31.2500,
      services: '✉️ البريد، 📦 الطرود',
      workingHours: '9 صباحاً - 4 مساءً',
      queue: 3,
    },
  ],
  telecom: [
    {
      branch_id: 10005,
      name: 'مركز الاتصالات الرئيسي',
      latitude: 30.0520,
      longitude: 31.2380,
      services: '📱 الشرائح، 📞 الفواتير، 🔧 الإصلاح',
      hasChat: true,
      queue: 5,
    },
  ],
  traffic: [
    {
      branch_id: 10006,
      name: 'إدارة المرور - فرع الجيزة',
      latitude: 30.0100,
      longitude: 31.2000,
      services: '🚗 تراخيص، 🏎️ فحص، 📋 مخالفات',
      counters: 4,
      queue: 12,
    },
  ],
  real_estate: [
    {
      branch_id: 10007,
      name: 'مكتب التسجيل العقاري',
      latitude: 30.0300,
      longitude: 31.2200,
      services: 'تسجيل العقارات، تحويل الملكية',
      status: 'مشغول نسبياً',
      queue: 6,
    },
  ],
  health_insurance: [
    {
      branch_id: 10008,
      name: 'مكتب التأمين الصحي',
      latitude: 30.0550,
      longitude: 31.2400,
      services: 'تجديد البوليصات، طلبات جديدة',
      plans: 5,
      queue: 4,
    },
  ],
  civil_status: [
    {
      branch_id: 10009,
      name: 'مكتب الأحوال المدنية',
      latitude: 30.0450,
      longitude: 31.2320,
      services: 'شهادات الميلاد، الزواج، التعديلات',
      waitTime: '30 دقيقة',
      queue: 7,
    },
  ],
  immigration: [
    {
      branch_id: 10010,
      name: 'مكتب الهجرة والجوازات',
      latitude: 30.0600,
      longitude: 31.2450,
      services: 'تأشيرات، إقامة، مواعيد',
      queueStatus: '5 أشخاص',
    },
  ],
  gas_station: [
    {
      branch_id: 10011,
      name: 'محطة البنزين - النيل',
      latitude: 30.0280,
      longitude: 31.2280,
      fuelTypes: '⛽ 92، 95، ديزل',
      availability: 'متاح',
      queue: 2,
    },
  ],
  passport: [
    {
      branch_id: 10012,
      name: 'مكتب الجوازات الرئيسي',
      latitude: 30.0480,
      longitude: 31.2410,
      services: 'جوازات جديدة، تجديد، مواعيد',
      appointments: '15 موعد متاح',
    },
  ],
};

export default function BranchDetailsList({ serviceType, serviceName, onSelectBranch, userLocation, language, darkMode }) {
  const [sortBy, setSortBy] = useState('distance');
  const [distanceFilter, setDistanceFilter] = useState(50);

  const branches = mockServiceBranches[serviceType] || [];

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredBranches = branches.filter((branch) => {
    const distance = calculateDistance(userLocation.latitude, userLocation.longitude, branch.latitude, branch.longitude);
    return distance <= distanceFilter;
  });

  const sortedBranches = [...filteredBranches].sort((a, b) => {
    if (sortBy === 'distance') {
      const distA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
      const distB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
      return distA - distB;
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 style={{ color: '#36e27b' }} className="text-4xl font-bold mb-2">
          {language === 'ar' ? `فروع ${serviceName}` : `${serviceName} Branches`}
        </h1>
        <p style={{ color: '#a8bbb3' }} className="text-lg">
          {language === 'ar' ? 'اختر الفرع الأقرب إليك' : 'Choose the nearest branch to you'}
        </p>
      </div>

      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <label style={{ color: '#36e27b' }} className="block text-lg font-semibold mb-2">
          {language === 'ar' ? 'أقصى مسافة (كم)' : 'Maximum Distance (km)'}
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="100"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(Number(e.target.value))}
            className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundColor: '#e8f4f8',
              accentColor: '#36e27b',
            }}
          />
          <span style={{ color: '#111714' }} className="font-bold text-lg min-w-12">
            {distanceFilter} km
          </span>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setSortBy('distance')}
          style={{
            backgroundColor: sortBy === 'distance' ? '#36e27b' : '#e8f4f8',
            color: sortBy === 'distance' ? '#111714' : '#36e27b',
          }}
          className="px-6 py-2 rounded-lg font-semibold transition"
        >
          {language === 'ar' ? 'ترتيب حسب المسافة' : 'Sort by Distance'}
        </button>
      </div>

      {sortedBranches.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: '#a8bbb3' }} className="text-lg">
            {language === 'ar' ? 'لا توجد فروع في هذه المسافة' : 'No branches in this distance range'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBranches.map((branch) => (
            <button
              key={branch.branch_id}
              onClick={() => onSelectBranch(branch)}
              className="text-left transition hover:scale-105 hover:shadow-xl"
            >
              <Card darkMode={darkMode}>
                <div className="mb-4">
                  <h3 style={{ color: '#36e27b' }} className="text-xl font-bold mb-2">
                    {branch.name}
                  </h3>

                  <div style={{ color: '#a8bbb3' }} className="text-sm font-semibold">
                    📍 {calculateDistance(userLocation.latitude, userLocation.longitude, branch.latitude, branch.longitude).toFixed(2)} km
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {branch.departments && (
                    <div>
                      <p style={{ color: '#a8bbb3' }} className="text-sm">
                        {language === 'ar' ? 'الأقسام:' : 'Departments:'} {branch.departments}
                      </p>
                    </div>
                  )}
                  {branch.doctors && (
                    <div>
                      <p style={{ color: '#a8bbb3' }} className="text-sm">
                        {language === 'ar' ? 'الأطباء:' : 'Doctors:'} {branch.doctors}
                      </p>
                    </div>
                  )}
                  {branch.waitTime && (
                    <div className="flex items-center gap-2">
                      <span style={{ color: '#d1a220' }}>⏳</span>
                      <p style={{ color: '#111714' }} className="text-sm font-semibold">
                        {language === 'ar' ? 'وقت الانتظار:' : 'Wait time:'} {branch.waitTime}
                      </p>
                    </div>
                  )}
                  {branch.queue !== undefined && (
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <p style={{ color: '#111714' }} className="text-sm font-semibold">
                        {branch.queue} {language === 'ar' ? 'في الطابور' : 'in queue'}
                      </p>
                    </div>
                  )}
                  {branch.services && (
                    <div>
                      <p style={{ color: '#a8bbb3' }} className="text-sm">
                        {language === 'ar' ? 'الخدمات:' : 'Services:'} {branch.services}
                      </p>
                    </div>
                  )}
                </div>

                <div className="inline-block px-4 py-2 rounded-lg font-semibold text-sm w-full text-center">
                  {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                </div>
              </Card>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
