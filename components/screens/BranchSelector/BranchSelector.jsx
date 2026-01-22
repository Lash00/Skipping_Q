'use client';

import Card from '@/components/reuse_components/Card';
import DistanceCalculator from '@/components/reuse_components/DistanceCalculator';
import { useState } from 'react';

export default function BranchSelector({ branches, organizationName, onSelectBranch, userLocation }) {
  const [sortBy, setSortBy] = useState('distance');

  const sortedBranches = [...branches].sort((a, b) => {
    if (sortBy === 'distance') {
      const distA = Math.sqrt((a.latitude - userLocation.latitude) ** 2 + (a.longitude - userLocation.longitude) ** 2);
      const distB = Math.sqrt((b.latitude - userLocation.latitude) ** 2 + (b.longitude - userLocation.longitude) ** 2);
      return distA - distB;
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 style={{ color: '#36e27b' }} className="text-4xl font-bold mb-2">
          فروع {organizationName}
        </h1>
        <p style={{ color: '#a8bbb3' }} className="text-lg">
          اختر الفرع الأقرب إليك
        </p>
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
          ترتيب حسب المسافة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBranches.map((branch) => (
          <button
            key={branch.branch_id}
            onClick={() => onSelectBranch(branch)}
            className="text-left transition hover:scale-105"
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
                  📍
                </div>
              </div>

              <h3 style={{ color: '#36e27b' }} className="text-xl font-bold mb-3">
                {branch.branch_name}
              </h3>

              <div className="mb-4">
                <DistanceCalculator
                  userLat={userLocation.latitude}
                  userLon={userLocation.longitude}
                  targetLat={branch.latitude}
                  targetLon={branch.longitude}
                />
              </div>

              <div
                style={{
                  backgroundColor: '#36e27b',
                  color: '#111714',
                }}
                className="inline-block px-4 py-2 rounded-lg font-semibold text-sm"
              >
                اختر الفرع
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
