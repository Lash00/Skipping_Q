/**
 * StatusIndicator Component
 * Displays status with color-coded visual indicator
 * Used in multiple service detail pages
 */
export default function StatusIndicator({ status, label = '' }) {
  const isActive = status === 'Active' || status === true;
  const backgroundColor = isActive ? '#36e27b' : '#c93d3c';
  const bgColor = isActive ? 'rgba(54, 226, 123, 0.1)' : 'rgba(201, 61, 60, 0.1)';

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-2"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="h-3 w-3 rounded-full"
        style={{
          backgroundColor,
          boxShadow: `0 0 10px ${backgroundColor}`,
        }}
      />
      <span style={{ color: backgroundColor, fontWeight: '600' }}>
        {label || status}
      </span>
    </div>
  )
}
