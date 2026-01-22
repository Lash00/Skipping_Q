'use client';

export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ color: '#36e27b' }}
      className="mb-6 flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition"
    >
      ← رجوع
    </button>
  );
}
