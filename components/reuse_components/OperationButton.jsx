'use client';

/**
 * OperationButton Component
 * Shows available operations with icon
 */
export default function OperationButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 text-center font-semibold"
      style={{
        backgroundColor: '#e8f4f8',
        border: '1px solid #c8d5ce',
        color: '#36e27b',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(54, 226, 123, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#e8f4f8';
      }}
    >
      <div className="text-2xl mb-2">{icon}</div>
      {label}
    </button>
  )
}
