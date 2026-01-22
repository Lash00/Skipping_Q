'use client';

import Card from '@/components/reuse_components/Card';
import StatusBadge from '@/components/reuse_components/StatusBadge';
import DistanceCalculator from '@/components/reuse_components/DistanceCalculator';
import { useState } from 'react';

export default function ATMList({ atms, branchName, onSelectATM, userLocation, language, getATMName, darkMode }) {
  const [sortBy, setSortBy] = useState('distance');
  const [distanceFilter, setDistanceFilter] = useState(50);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredATMs = atms.filter((atm) => {
    const distance = calculateDistance(userLocation.latitude, userLocation.longitude, atm.latitude, atm.longitude);
    return distance <= distanceFilter;
  });

  const sortedATMs = [...filteredATMs].sort((a, b) => {
    if (sortBy === 'distance') {
      const distA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
      const distB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
      return distA - distB;
    } else if (sortBy === 'queue') {
      return a.queue - b.queue;
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 style={{ color: '#36e27b' }} className="text-4xl font-bold mb-2">
          {language === 'ar' ? 'ماكينات الصراف الآلي' : 'ATM Machines'}
        </h1>
        <p style={{ color: '#a8bbb3' }} className="text-lg">
          {language === 'ar' ? `فرع ${branchName}` : `Branch: ${branchName}`}
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

      <div className="mb-6 flex gap-4 flex-wrap">
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
        <button
          onClick={() => setSortBy('queue')}
          style={{
            backgroundColor: sortBy === 'queue' ? '#36e27b' : '#e8f4f8',
            color: sortBy === 'queue' ? '#111714' : '#36e27b',
          }}
          className="px-6 py-2 rounded-lg font-semibold transition"
        >
          {language === 'ar' ? 'ترتيب حسب الطابور' : 'Sort by Queue'}
        </button>
      </div>

      {sortedATMs.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: '#a8bbb3' }} className="text-lg">
            {language === 'ar' ? 'لا توجد ماكينات في هذه المسافة' : 'No ATMs in this distance range'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedATMs.map((atm) => (
            <button
              key={atm.atm_id}
              onClick={() => onSelectATM(atm)}
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
                    🏧
                  </div>
                  <StatusBadge isActive={atm.isActive} language={language} />
                </div>

                <h3 style={{ color: '#36e27b' }} className="text-xl font-bold mb-3">
                  {getATMName(atm)}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#d1a220' }}>⏳</span>
                    <span style={{ color: '#111714' }} className="font-semibold">
                      {language === 'ar' ? `${atm.queue} أشخاص في الطابور` : `${atm.queue} people in queue`}
                    </span>
                  </div>

                  <div style={{ color: '#a8bbb3' }} className="text-sm font-semibold">
                    📍 {calculateDistance(userLocation.latitude, userLocation.longitude, atm.latitude, atm.longitude).toFixed(2)} km
                  </div>

                  <div className="flex gap-2">
                    {atm.allows_withdrawal && (
                      <span style={{ color: '#36e27b' }} className="text-sm font-semibold">
                        💵 {language === 'ar' ? 'سحب' : 'Withdraw'}
                      </span>
                    )}
                    {atm.allows_deposit && (
                      <span style={{ color: '#36e27b' }} className="text-sm font-semibold">
                        💰 {language === 'ar' ? 'إيداع' : 'Deposit'}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#36e27b',
                    color: '#111714',
                  }}
                  className="inline-block px-4 py-2 rounded-lg font-semibold text-sm w-full text-center"
                >
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
