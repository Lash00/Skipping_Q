'use client'

import ServiceCard from '@/components/reuse_components/ServiceCard'
import SimpleMap from '@/components/reuse_components/SimpleMap'

/**
 * RealEstateDetailsScreen Component
 * Displays property registration and related services
 */
export default function RealEstateDetailsScreen({ branchData = {}, onBack }) {
  const services = [
    { icon: '📝', name: 'Property Registration', desc: 'Register your property legally' },
    { icon: '🔄', name: 'Ownership Transfer', desc: 'Transfer property ownership' },
    { icon: '✅', name: 'Document Verification', desc: 'Verify property documents' },
    { icon: '💰', name: 'Fee Estimation', desc: 'Calculate registration fees' },
  ]

  const busyLevel = 'Moderate'
  const busyLevelColor = '#d1a220'

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
          🏠 Real Estate Registration Office
        </h1>
        <p style={{ color: '#9db6a7' }}>Property services and registration</p>
      </div>

      {/* Busy Status */}
      <ServiceCard title="Office Status" icon="📊" backgroundColor="#e8f4f8">
        <div className="flex items-center gap-4">
          <div className="text-3xl">📈</div>
          <div>
            <p style={{ color: '#9db6a7', fontSize: '0.875rem' }}>Busy Level</p>
            <p style={{ color: busyLevelColor, fontWeight: '600', fontSize: '1.25rem' }}>
              {busyLevel}
            </p>
          </div>
        </div>
      </ServiceCard>

      {/* Services Grid */}
      <h2 className="text-2xl font-bold my-6" style={{ color: '#36e27b' }}>
        Services Available
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, idx) => (
          <ServiceCard key={idx} title={service.name} icon={service.icon} backgroundColor="#e8f4f8">
            <p style={{ color: '#9db6a7' }}>{service.desc}</p>
          </ServiceCard>
        ))}
      </div>

      {/* Location */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#36e27b' }}>
          📍 Location
        </h2>
        <SimpleMap latitude={30.05} longitude={31.23} label="Real Estate Office Location" />
      </div>
    </div>
  )
}
