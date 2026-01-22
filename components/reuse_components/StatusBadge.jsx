export default function StatusBadge({ status, isActive, language }) {
  if (!isActive) {
    return (
      <div
        style={{
          backgroundColor: '#c93d3c',
          color: '#ffffff',
        }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold"
      >
        <span className="w-2 h-2 rounded-full bg-white"></span>
        {language === 'ar' ? 'غير متاح' : 'Unavailable'}
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#36e27b',
        color: '#111714',
      }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold"
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#111714' }}></span>
      {language === 'ar' ? 'متاح' : 'Available'}
    </div>
  );
}
