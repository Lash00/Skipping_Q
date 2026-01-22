export default function DistanceCalculator({ userLat, userLon, targetLat, targetLon }) {
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(1);
  };

  const distance = calculateDistance(userLat, userLon, targetLat, targetLon);

  return (
    <div className="flex items-center gap-2 text-sm" style={{ color: '#a8bbb3' }}>
      <span>📍</span>
      <span>{distance} كم</span>
    </div>
  );
}
