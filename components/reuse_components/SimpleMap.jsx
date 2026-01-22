/**
 * SimpleMap Component
 * Shows location pin on a simple map view
 */
export default function SimpleMap({ latitude, longitude, label }) {
  return (
    <div
      className="relative w-full h-48 rounded-lg overflow-hidden border"
      style={{
        backgroundColor: '#e8f4f8',
        borderColor: '#c8d5ce',
        background: 'linear-gradient(135deg, #e8f4f8 0%, #f5f9fb 100%)',
      }}
    >
      {/* Map background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📍</div>
          <p style={{ color: '#9db6a7' }} className="text-sm">
            {label || `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`}
          </p>
        </div>
      </div>

      {/* Location indicator animation */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: '#36e27b',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(54, 226, 123, 0.6)',
          animation: 'pulse 2s infinite',
        }}
      />
    </div>
  )
}
