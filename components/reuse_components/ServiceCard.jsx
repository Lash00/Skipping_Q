/**
 * ServiceCard Component
 * A 3D-style card for displaying service information
 * Used across all service detail pages
 * Props: title, children, icon, backgroundColor (optional)
 */
export default function ServiceCard({ title, children, icon, backgroundColor = 'white' }) {
  return (
    <div
      className="rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
      style={{
        backgroundColor,
        border: '1px solid #c8d5ce',
        boxShadow: '0 4px 15px rgba(54, 226, 123, 0.15)',
        background: `linear-gradient(135deg, ${backgroundColor} 0%, rgba(232, 244, 248, 0.5) 100%)`,
      }}
    >
      {(title || icon) && (
        <div className="mb-4 flex items-center gap-3">
          {icon && <span className="text-3xl">{icon}</span>}
          {title && (
            <h3 className="text-lg font-semibold" style={{ color: '#36e27b' }}>
              {title}
            </h3>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
