'use client';

import { useState } from 'react';
import Card from '@/components/reuse_components/Card';

export default function BankServiceTypeSelector({ organization, branches, onSelectBranch, language, getOrgName, getBranchName, userLocation }) {
  const [distanceFilter, setDistanceFilter] = useState(50);

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

  const branchesWithDistance = filteredBranches
    .map((branch) => ({
      ...branch,
      distance: calculateDistance(userLocation.latitude, userLocation.longitude, branch.latitude, branch.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 style={{ color: '#36e27b' }} className="text-4xl font-bold mb-2">
          {language === 'ar' ? `فروع ${getOrgName(organization)}` : `${getOrgName(organization)} Branches`}
        </h1>
        <p style={{ color: '#a8bbb3' }} className="text-lg">
          {language === 'ar' ? 'اختر الفرع لمشاهدة ماكينات الصراف الآلي المتاحة' : 'Select a branch to view available ATMs'}
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

      {branchesWithDistance.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: '#a8bbb3' }} className="text-lg">
            {language === 'ar' ? 'لا توجد فروع في هذه المسافة' : 'No branches in this distance range'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branchesWithDistance.map((branch) => (
            <button
              key={branch.branch_id}
              onClick={() => onSelectBranch(branch)}
              className="text-left transition hover:scale-105 hover:shadow-xl"
            >
              <Card>
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
                    🏢
                  </div>
                </div>

                <h3 style={{ color: '#36e27b' }} className="text-2xl font-bold mb-2">
                  {getBranchName(branch)}
                </h3>

                <div
                  style={{
                    backgroundColor: '#e8f4f8',
                    color: '#36e27b',
                  }}
                  className="inline-block px-3 py-1 rounded-lg font-semibold text-sm mb-4"
                >
                  {branch.distance.toFixed(2)} km
                </div>

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
      )}
    </div>
  );
}
