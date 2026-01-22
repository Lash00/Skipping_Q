'use client'

import ServiceCard from '@/components/reuse_components/ServiceCard'
import SimpleMap from '@/components/reuse_components/SimpleMap'

/**
 * CivilStatusOfficeDetailsScreen Component
 * Displays civil status and vital documents services
 */
export default function CivilStatusOfficeDetailsScreen({ branchData = {}, onBack }) {
  const services = [
    { icon: '🪪', name: 'National ID Issuance', desc: 'Apply for a national ID' },
    { icon: '👶', name: 'Birth Certificate', desc: 'Get your birth certificate' },
    { icon: '💍', name: 'Marriage Certificate', desc: 'Register your marriage' },
    { icon: '✏️', name: 'Record Update', desc: 'Update personal records' },
  ]

  const averageWaitTime = 20
  const counterNumber = 5

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
          🧾 Civil Status Office
        </h1>
        <p style={{ color: '#9db6a7' }}>Vital documents and records management</p>
      </div>

      {/* Wait Time & Counter Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ServiceCard title="Estimated Wait Time" icon="⏱️" backgroundColor="#e8f4f8">
          <p className="text-4xl font-bold" style={{ color: '#36e27b' }}>
            {averageWaitTime}
          </p>
          <p style={{ color: '#9db6a7' }} className="text-sm">
            minutes
          </p>
        </ServiceCard>
        <ServiceCard title="Current Counter Number" icon="🔔" backgroundColor="#e8f4f8">
          <p className="text-4xl font-bold" style={{ color: '#d1a220' }}>
            {counterNumber}
          </p>
          <p style={{ color: '#9db6a7' }} className="text-sm">
            Active counters
          </p>
        </ServiceCard>
      </div>

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
        <SimpleMap latitude={30.05} longitude={31.23} label="Civil Status Office Location" />
      </div>
    </div>
  )
}
