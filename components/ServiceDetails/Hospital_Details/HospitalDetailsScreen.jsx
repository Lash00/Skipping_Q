'use client'

import ServiceCard from '@/components/reuse_components/ServiceCard'
import SimpleMap from '@/components/reuse_components/SimpleMap'
import StatusIndicator from '@/components/reuse_components/StatusIndicator'

/**
 * HospitalDetailsScreen Component
 * Displays hospital departments, doctors, waiting times
 */
export default function HospitalDetailsScreen({ branchData = {}, onBack }) {
  const departments = [
    { icon: '🚑', name: 'Emergency', doctors: 8, waitTime: 15 },
    { icon: '📡', name: 'Radiology', doctors: 4, waitTime: 25 },
    { icon: '❤️', name: 'Cardiology', doctors: 6, waitTime: 35 },
    { icon: '🦷', name: 'Dentistry', doctors: 5, waitTime: 20 },
    { icon: '👶', name: 'Pediatrics', doctors: 3, waitTime: 30 },
    { icon: '🧬', name: 'General Surgery', doctors: 4, waitTime: 40 },
  ]

  const emergencyStatus = 'Operational'

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#ffffff' }}>
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
          style={{ backgroundColor: '#e8f4f8', color: '#36e27b' }}
        >
          ← Back
        </button>
      )}

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#36e27b' }}>
          🏥 Hospital Services
        </h1>
        <p style={{ color: '#9db6a7' }}>Healthcare departments and specialists</p>
      </div>

      {/* Emergency Status */}
      <ServiceCard title="Emergency Status" icon="🚨" backgroundColor="#e8f4f8">
        <StatusIndicator status={emergencyStatus} label="Operational" />
        <p style={{ color: '#9db6a7' }} className="text-sm mt-4">
          24/7 Emergency services available
        </p>
      </ServiceCard>

      {/* Departments */}
      <h2 className="text-2xl font-bold my-6" style={{ color: '#36e27b' }}>
        Departments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept, idx) => (
          <ServiceCard key={idx} title={dept.name} icon={dept.icon} backgroundColor="#e8f4f8">
            <div className="space-y-3">
              <div>
                <p style={{ color: '#9db6a7', fontSize: '0.875rem' }}>Available Doctors</p>
                <p className="text-2xl font-bold" style={{ color: '#36e27b' }}>
                  {dept.doctors}
                </p>
              </div>
              <div className="pt-2" style={{ borderTop: '1px solid #c8d5ce' }}>
                <p style={{ color: '#9db6a7', fontSize: '0.875rem' }}>Waiting Time</p>
                <p style={{ color: '#d1a220', fontWeight: '600' }}>~{dept.waitTime} minutes</p>
              </div>
            </div>
          </ServiceCard>
        ))}
      </div>

      {/* Location */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#36e27b' }}>
          📍 Location
        </h2>
        <SimpleMap latitude={30.05} longitude={31.23} label="Hospital Location" />
      </div>
    </div>
  )
}
