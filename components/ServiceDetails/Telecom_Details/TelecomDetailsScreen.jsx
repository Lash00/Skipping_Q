'use client'

import ServiceCard from '@/components/reuse_components/ServiceCard'
import SimpleMap from '@/components/reuse_components/SimpleMap'

/**
 * TelecomDetailsScreen Component
 * Displays telecom services with chat support option
 */
export default function TelecomDetailsScreen({ branchData = {}, onBack }) {
  const services = [
    { icon: '🔄', name: 'SIM Replacement', desc: 'Get a replacement SIM card' },
    { icon: '📱', name: 'Bill Payment', desc: 'Pay your monthly bills' },
    { icon: '✨', name: 'New Subscription', desc: 'Activate new mobile plans' },
    { icon: '🚀', name: 'Internet Plan Upgrade', desc: 'Upgrade your data plan' },
    { icon: '🔧', name: 'Device Repair', desc: 'Fix your mobile device' },
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
          📱 Telecom Service Center
        </h1>
        <p style={{ color: '#9db6a7' }}>Mobile and internet services</p>
      </div>

      {/* Chat Support Button */}
      <ServiceCard icon="💬" title="Customer Support" backgroundColor="#e8f4f8">
        <p style={{ color: '#9db6a7' }} className="mb-4">
          Get instant help from our support team
        </p>
        <button
          className="w-full py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
          style={{
            backgroundColor: '#36e27b',
            color: '#111714',
            cursor: 'pointer',
          }}
        >
          💬 Start Chat with Assistant
        </button>
      </ServiceCard>

      {/* Services Grid */}
      <h2 className="text-2xl font-bold my-6" style={{ color: '#36e27b' }}>
        Our Services
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
        <SimpleMap latitude={30.05} longitude={31.23} label="Telecom Center Location" />
      </div>
    </div>
  )
}
