'use client'

import ServiceCard from '@/components/reuse_components/ServiceCard'
import SimpleMap from '@/components/reuse_components/SimpleMap'

/**
 * ImmigrationDetailsScreen Component
 * Displays immigration and visa services
 */
export default function ImmigrationDetailsScreen({ branchData = {}, onBack }) {
  const services = [
    { icon: '✈️', name: 'Visa Application', desc: 'Apply for travel visas' },
    { icon: '🏠', name: 'Residency Renewal', desc: 'Renew your residency' },
    { icon: '📅', name: 'Appointment Scheduling', desc: 'Book your appointment' },
    { icon: '📊', name: 'Queue Status', desc: 'Check current queue' },
  ]

  const queueCount = 18

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
          🌍 Immigration Office
        </h1>
        <p style={{ color: '#9db6a7' }}>Visa and residency services</p>
      </div>

      {/* Queue Status */}
      <ServiceCard title="Current Queue" icon="👥" backgroundColor="#e8f4f8">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📊</div>
          <div>
            <p style={{ color: '#9db6a7', fontSize: '0.875rem' }}>Total in Queue</p>
            <p className="text-3xl font-bold" style={{ color: '#36e27b' }}>
              {queueCount}
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
        <SimpleMap latitude={30.05} longitude={31.23} label="Immigration Office Location" />
      </div>
    </div>
  )
}
