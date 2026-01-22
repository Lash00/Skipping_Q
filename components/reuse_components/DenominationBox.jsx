/**
 * DenominationBox Component
 * Displays available cash denominations
 */
export default function DenominationBox({ amount }) {
  return (
    <div
      className="rounded-lg p-3 text-center font-semibold transition-transform hover:scale-105"
      style={{
        backgroundColor: '#e8f4f8',
        border: '2px solid #36e27b',
        color: '#18472b',
      }}
    >
      {amount}
      <p style={{ color: '#9db6a7', fontSize: '0.75rem', marginTop: '4px' }}>
        EGP
      </p>
    </div>
  )
}
