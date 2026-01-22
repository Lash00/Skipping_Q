'use client'

import ServiceCard from '@/components/reuse_components/ServiceCard'
import SimpleMap from '@/components/reuse_components/SimpleMap'

/**
 * GasStationDetailsScreen Component
 * Displays fuel types, availability, and queue information
 */
export default function GasStationDetailsScreen({ branchData = {}, onBack }) {
  const fuelTypes = [
    { type: '92 Octane', available: true, icon: '🛢️' },
    { type: '95 Octane', available: true, icon: '🛢️' },
    { type: 'Diesel', available: false, icon: '🛢️' },
  ]

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
          ⛽ Gas Station
        </h1>
        <p style={{ color: '#9db6a7' }}>Fuel availability and services</p>
      </div>

      {/* Queue Info */}
      <ServiceCard title="Queue Status" icon="📊" backgroundColor="#e8f4f8">
        <div className="flex items-center gap-4">
          <div className="text-3xl">🚗</div>
          <div>
            <p style={{ color: '#9db6a7', fontSize: '0.875rem' }}>Cars in Queue</p>
            <p className="text-2xl font-bold" style={{ color: '#36e27b' }}>
              {queueLength}
            </p>
          </div>
        </div>
      </ServiceCard>

      {/* Fuel Types */}
      <h2 className="text-2xl font-bold my-6" style={{ color: '#36e27b' }}>
        Available Fuel Types
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {fuelTypes.map((fuel, idx) => (
          <ServiceCard
            key={idx}
            title={fuel.type}
            icon={fuel.icon}
            backgroundColor={fuel.available ? '#e8f4f8' : 'rgba(201, 61, 60, 0.05)'}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: fuel.available ? 'rgba(54, 226, 123, 0.1)' : 'rgba(201, 61, 60, 0.1)',
              }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: fuel.available ? '#36e27b' : '#c93d3c',
                }}
              />
              <span style={{ color: fuel.available ? '#36e27b' : '#c93d3c', fontWeight: '600', fontSize: '0.875rem' }}>
                {fuel.available ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </ServiceCard>
        ))}
      </div>

      {/* Animated Pump Icon */}
      <ServiceCard title="Fuel Pump Status" icon="⛽" backgroundColor="#e8f4f8">
        <p style={{ color: '#9db6a7' }} className="mb-4">
          All pumps operational and ready
        </p>
        <div
          className="inline-flex items-center gap-2"
          style={{
            animation: 'pulse 2s infinite',
          }}
        >
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#36e27b' }} />
          <span style={{ color: '#36e27b', fontWeight: '600' }}>Active</span>
        </div>
      </ServiceCard>

      {/* Location */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#36e27b' }}>
          📍 Location
        </h2>
        <SimpleMap latitude={30.05} longitude={31.23} label="Gas Station Location" />
      </div>
    </div>
  )
}
