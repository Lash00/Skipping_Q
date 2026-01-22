/**
 * QueueIndicator Component
 * Shows the number of people waiting with animated icon
 * Reusable across service pages
 */
export default function QueueIndicator({ count }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-lg px-4 py-3" style={{ backgroundColor: '#e8f4f8' }}>
      <div className="text-2xl" style={{ animation: 'pulse 2s infinite' }}>
        👥
      </div>
      <div>
        <p className="text-sm" style={{ color: '#9db6a7' }}>
          People waiting
        </p>
        <p className="text-2xl font-bold" style={{ color: '#36e27b' }}>
          {count}
        </p>
      </div>
    </div>
  )
}
