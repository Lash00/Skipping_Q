'use client'

import { useState } from 'react'
import ServiceCard from '@/components/reuse_components/ServiceCard'
import StatusIndicator from '@/components/reuse_components/StatusIndicator'
import QueueIndicator from '@/components/reuse_components/QueueIndicator'
import SimpleMap from '@/components/reuse_components/SimpleMap'
import DenominationBox from '@/components/reuse_components/DenominationBox'
import OperationButton from '@/components/reuse_components/OperationButton'

/**
 * ATMDetailsScreen Component
 * Displays detailed information about an ATM including:
 * - ATM status (Active/Offline)
 * - Available operations (Withdrawal/Deposit)
 * - Cash denominations
 * - Queue length
 * - Withdrawal amount validation
 * - Location map
 */
export default function ATMDetailsScreen({ atmData = {}, onBack }) {
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [amountStatus, setAmountStatus] = useState(null)

  const atm = atmData || {
    atm_id: 5001,
    isActive: true,
    allows_withdrawal: true,
    allows_deposit: true,
    Latitude: 30.051,
    Longitude: 31.231,
  }

  const denominations = [200, 100, 50, 20]
  const queueLength = 7

  const handleAmountCheck = () => {
    if (!withdrawalAmount) {
      setAmountStatus(null)
      return
    }

    const amount = parseInt(withdrawalAmount)
    const isValid = denominations.some((d) => amount % d === 0) && amount > 0

    setAmountStatus(isValid)
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#ffffff' }}>
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
          style={{ backgroundColor: '#e8f4f8', color: '#36e27b' }}
        >
          ← Back
        </button>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#36e27b' }}>
          🏧 ATM Machine Details
        </h1>
        <p style={{ color: '#9db6a7' }}>Manage your cash withdrawals and deposits</p>
      </div>

      {/* Main Status Card */}
      <ServiceCard icon="🏧" title="ATM Status" backgroundColor="#e8f4f8">
        <div className="space-y-4">
          <StatusIndicator status={atm.isActive} label={atm.isActive ? 'Active' : 'Offline'} />

          {/* Operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {atm.allows_withdrawal && (
              <OperationButton icon="💵" label="Withdrawal" onClick={() => {}} />
            )}
            {atm.allows_deposit && <OperationButton icon="💰" label="Deposit" onClick={() => {}} />}
          </div>
        </div>
      </ServiceCard>

      {/* Denominations Section */}
      <ServiceCard title="Available Denominations" icon="💷" backgroundColor="#ffffff">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {denominations.map((denom) => (
            <DenominationBox key={denom} amount={denom} />
          ))}
        </div>
      </ServiceCard>

      {/* Queue Information */}
      <div className="my-6">
        <QueueIndicator count={queueLength} />
      </div>

      {/* Amount Check Section */}
      <ServiceCard title="Check Withdrawal Amount" icon="🔍" backgroundColor="#e8f4f8">
        <div className="space-y-4">
          <div>
            <label style={{ color: '#18472b', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
              Enter amount (EGP):
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                placeholder="e.g., 100, 200, 500"
                className="flex-1 px-4 py-2 rounded-lg border"
                style={{
                  borderColor: '#c8d5ce',
                  backgroundColor: '#ffffff',
                  color: '#111714',
                }}
              />
              <button
                onClick={handleAmountCheck}
                className="px-6 py-2 rounded-lg font-semibold transition-all hover:shadow-lg"
                style={{
                  backgroundColor: '#36e27b',
                  color: '#111714',
                  cursor: 'pointer',
                }}
              >
                Check
              </button>
            </div>
          </div>

          {/* Amount Status Message */}
          {amountStatus !== null && (
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: amountStatus ? 'rgba(54, 226, 123, 0.1)' : 'rgba(201, 61, 60, 0.1)',
              }}
            >
              {amountStatus ? (
                <p style={{ color: '#36e27b', fontWeight: '600' }}>
                  ✅ Amount available. You can proceed.
                </p>
              ) : (
                <p style={{ color: '#c93d3c', fontWeight: '600' }}>
                  ❌ This amount is not available in this ATM.
                </p>
              )}
            </div>
          )}
        </div>
      </ServiceCard>

      {/* Location Map */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#36e27b' }}>
          📍 Location
        </h2>
        <SimpleMap latitude={atm.Latitude} longitude={atm.Longitude} label="ATM Location" />
      </div>
    </div>
  )
}
