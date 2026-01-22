'use client'

import ServiceCard from '@/components/reuse_components/ServiceCard'
import SimpleMap from '@/components/reuse_components/SimpleMap'

/**
 * HealthInsuranceDetailsScreen Component
 * Displays health insurance plans and policies
 */
export default function HealthInsuranceDetailsScreen({ branchData = {}, onBack }) {
  const services = [
    { icon: '📋', name: 'Policy Renewal', desc: 'Renew your insurance policy' },
    { icon: '👤', name: 'New Member Registration', desc: 'Register for health insurance' },
    { icon: '📊', name: 'Claim Status', desc: 'Check your claim status' },
    { icon: '📑', name: 'Available Plans', desc: 'View our insurance plans' },
  ]

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
          💳 Health Insurance Office
        </h1>
        <p style={{ color: '#9db6a7' }}>Medical coverage and policy management</p>
      </div>

      {/* Quick Info */}
      <ServiceCard title="Coverage Information" icon="🛡️" backgroundColor="#e8f4f8">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span style={{ color: '#9db6a7' }}>Active Policies</span>
            <span style={{ color: '#36e27b', fontWeight: '600', fontSize: '1.25rem' }}>
              2,547
            </span>
          </div>
          <div style={{ borderTop: '1px solid #c8d5ce', paddingTop: '12px' }} className="flex justify-between items-center">
            <span style={{ color: '#9db6a7' }}>Total Members</span>
            <span style={{ color: '#36e27b', fontWeight: '600', fontSize: '1.25rem' }}>
              8,932
            </span>
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
        <SimpleMap latitude={30.05} longitude={31.23} label="Health Insurance Office Location" />
      </div>
    </div>
  )
}
