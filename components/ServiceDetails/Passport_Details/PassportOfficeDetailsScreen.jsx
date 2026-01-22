'use client'

import ServiceCard from '@/components/reuse_components/ServiceCard'
import SimpleMap from '@/components/reuse_components/SimpleMap'

/**
 * PassportOfficeDetailsScreen Component
 * Displays passport and travel document services
 */
export default function PassportOfficeDetailsScreen({ branchData = {}, onBack }) {
  const services = [
    { icon: '📄', name: 'New Passport Application', desc: 'Apply for a new passport' },
    { icon: '🔄', name: 'Passport Renewal', desc: 'Renew your existing passport' },
    { icon: '📅', name: 'Appointment Booking', desc: 'Schedule your appointment' },
    { icon: '📦', name: 'Pickup Status', desc: 'Track your passport pickup' },
  ]

  const appointmentsDayAvailable = 12

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
          🛂 Passport Office
        </h1>
        <p style={{ color: '#9db6a7' }}>Travel document services</p>
      </div>

      {/* Appointments Available */}
      <ServiceCard title="Available Appointments" icon="📅" backgroundColor="#e8f4f8">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📋</div>
          <div>
            <p style={{ color: '#9db6a7', fontSize: '0.875rem' }}>Today</p>
            <p className="text-3xl font-bold" style={{ color: '#36e27b' }}>
              {appointmentsDayAvailable}
            </p>
          </div>
        </div>
        <p style={{ color: '#9db6a7', fontSize: '0.875rem', marginTop: '12px' }}>
          Time slots available
        </p>
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
        <SimpleMap latitude={30.05} longitude={31.23} label="Passport Office Location" />
      </div>
    </div>
  )
}
