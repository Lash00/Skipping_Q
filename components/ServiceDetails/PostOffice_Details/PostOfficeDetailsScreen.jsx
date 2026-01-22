'use client'

import ServiceCard from '@/components/reuse_components/ServiceCard'
import SimpleMap from '@/components/reuse_components/SimpleMap'

/**
 * PostOfficeDetailsScreen Component
 * Displays available postal services with icons
 */
export default function PostOfficeDetailsScreen({ branchData = {}, onBack }) {
  const services = [
    { icon: '✉️', name: 'Sending Mail', description: 'Send letters and documents' },
    { icon: '📦', name: 'Receiving Parcels', description: 'Collect your packages' },
    { icon: '💸', name: 'Money Transfer', description: 'Transfer money securely' },
    { icon: '🧾', name: 'Bill Payment', description: 'Pay your utility bills' },
    { icon: '🔍', name: 'Postal Tracking', description: 'Track your shipment' },
  ]

  const workingHours = '09:00 AM - 05:00 PM'
  const queueLength = 5

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
          📮 Post Office Services
        </h1>
        <p style={{ color: '#9db6a7' }}>Explore our postal and mail services</p>
      </div>

      {/* Working Hours */}
      <ServiceCard title="Working Hours" icon="⏰" backgroundColor="#e8f4f8">
        <div className="flex items-center gap-4">
          <div className="text-3xl">🕐</div>
          <div>
            <p style={{ color: '#9db6a7' }} className="text-sm">
              Operating Hours
            </p>
            <p className="text-2xl font-bold" style={{ color: '#36e27b' }}>
              {workingHours}
            </p>
          </div>
        </div>
        <p style={{ color: '#9db6a7' }} className="text-sm mt-4">
          Currently: <span style={{ color: '#36e27b', fontWeight: '600' }}>Open</span>
        </p>
      </ServiceCard>

      {/* Queue Length */}
      <div className="my-6">
        <div className="inline-flex items-center gap-3 rounded-lg px-4 py-3" style={{ backgroundColor: '#e8f4f8' }}>
          <div className="text-2xl">👥</div>
          <div>
            <p className="text-sm" style={{ color: '#9db6a7' }}>
              People waiting
            </p>
            <p className="text-2xl font-bold" style={{ color: '#36e27b' }}>
              {queueLength}
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#36e27b' }}>
        Available Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, idx) => (
          <ServiceCard key={idx} title={service.name} icon={service.icon} backgroundColor="#e8f4f8">
            <p style={{ color: '#9db6a7' }}>{service.description}</p>
          </ServiceCard>
        ))}
      </div>

      {/* Location */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#36e27b' }}>
          📍 Location
        </h2>
        <SimpleMap latitude={30.05} longitude={31.23} label="Post Office Location" />
      </div>
    </div>
  )
}
