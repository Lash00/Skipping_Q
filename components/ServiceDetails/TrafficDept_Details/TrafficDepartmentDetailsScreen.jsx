'use client'

import ServiceCard from '@/components/reuse_components/ServiceCard'
import SimpleMap from '@/components/reuse_components/SimpleMap'

/**
 * TrafficDepartmentDetailsScreen Component
 * Displays vehicle and licensing services
 */
export default function TrafficDepartmentDetailsScreen({ branchData = {}, onBack }) {
  const services = [
    { icon: '🪪', name: "Driver's License Renewal", counters: 3, avgWait: 25 },
    { icon: '🚗', name: 'Car Registration', counters: 4, avgWait: 30 },
    { icon: '🚨', name: 'Fine Payment', counters: 2, avgWait: 15 },
    { icon: '🔧', name: 'Vehicle Inspection Schedule', counters: 2, avgWait: 20 },
  ]

  const totalCustomersWaiting = 12

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
          🚗 Traffic Department
        </h1>
        <p style={{ color: '#9db6a7' }}>Vehicle and licensing services</p>
      </div>

      {/* Customer Counter */}
      <ServiceCard title="Current Queue Status" icon="📊" backgroundColor="#e8f4f8">
        <div className="flex items-center gap-4">
          <div className="text-4xl">👥</div>
          <div>
            <p style={{ color: '#9db6a7', fontSize: '0.875rem' }}>Total Customers Waiting</p>
            <p className="text-3xl font-bold" style={{ color: '#36e27b' }}>
              {totalCustomersWaiting}
            </p>
          </div>
        </div>
      </ServiceCard>

      {/* Services Grid */}
      <h2 className="text-2xl font-bold my-6" style={{ color: '#36e27b' }}>
        Services & Counters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, idx) => (
          <ServiceCard key={idx} title={service.name} icon={service.icon} backgroundColor="#e8f4f8">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span style={{ color: '#9db6a7', fontSize: '0.875rem' }}>Counters Available</span>
                <span className="font-bold" style={{ color: '#36e27b' }}>
                  {service.counters}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2" style={{ borderTop: '1px solid #c8d5ce' }}>
                <span style={{ color: '#9db6a7', fontSize: '0.875rem' }}>Avg. Wait Time</span>
                <span style={{ color: '#d1a220', fontWeight: '600' }}>~{service.avgWait} min</span>
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
        <SimpleMap latitude={30.05} longitude={31.23} label="Traffic Department Location" />
      </div>
    </div>
  )
}
