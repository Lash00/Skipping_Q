// "use client";

// import { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix for default marker icons in Next.js
// if (typeof window !== "undefined") {
//   delete L.Icon.Default.prototype._getIconUrl;
//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//     iconUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   });
// }

// // Custom icon for branch location
// const branchIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
//   popupAnchor: [0, -40],
// });

// // Custom icon for user location
// const userIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131546.png",
//   iconSize: [35, 35],
//   iconAnchor: [17, 35],
//   popupAnchor: [0, -35],
// });

// // Component to update map view
// function ChangeMapView({ center, zoom }) {
//   const map = useMap();
//   useEffect(() => {
//     if (center) {
//       map.setView(center, zoom);
//     }
//   }, [center, zoom, map]);
//   return null;
// }

// export default function MapComponent({
//   branchLat,
//   branchLng,
//   branchName,
//   branchArea,
// }) {
//   const [userLocation, setUserLocation] = useState(null);
//   const [showRoute, setShowRoute] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // جلب موقع المستخدم
//   const getUserLocation = () => {
//     setLoading(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userPos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setUserLocation(userPos);
//           setShowRoute(true);
//           setLoading(false);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           alert("لم نتمكن من الحصول على موقعك. تأكد من تفعيل خدمات الموقع.");
//           setLoading(false);
//         },
//       );
//     } else {
//       alert("متصفحك لا يدعم خدمات الموقع");
//       setLoading(false);
//     }
//   };

//   // حساب المسافة بين نقطتين
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // نصف قطر الأرض بالكيلومتر
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return (R * c).toFixed(2);
//   };

//   // الخط الأزرق بين المستخدم والفرع
//   const routePositions = userLocation
//     ? [
//         [userLocation.lat, userLocation.lng],
//         [branchLat, branchLng],
//       ]
//     : [];

//   const distance = userLocation
//     ? calculateDistance(
//         userLocation.lat,
//         userLocation.lng,
//         branchLat,
//         branchLng,
//       )
//     : null;

//   return (
//     <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
//       <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4">
//         <MapContainer
//           center={[branchLat, branchLng]}
//           zoom={13}
//           style={{ height: "100%", width: "100%", borderRadius: "12px" }}
//           scrollWheelZoom={false}
//         >
//           {/* OpenStreetMap Tiles (مجانية) */}
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* Branch Marker */}
//           <Marker position={[branchLat, branchLng]} icon={branchIcon}>
//             <Popup>
//               <div className="text-center">
//                 <h3 className="font-bold text-gray-900">{branchName}</h3>
//                 <p className="text-sm text-gray-600">{branchArea}</p>
//               </div>
//             </Popup>
//           </Marker>

//           {/* User Location Marker */}
//           {userLocation && (
//             <Marker
//               position={[userLocation.lat, userLocation.lng]}
//               icon={userIcon}
//             >
//               <Popup>
//                 <div className="text-center">
//                   <h3 className="font-bold text-blue-600">موقعك الحالي</h3>
//                   <p className="text-xs text-gray-500">
//                     {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
//                   </p>
//                 </div>
//               </Popup>
//             </Marker>
//           )}

//           {/* Blue Route Line */}
//           {showRoute && userLocation && (
//             <Polyline
//               positions={routePositions}
//               color="#3b82f6"
//               weight={4}
//               opacity={0.7}
//               dashArray="10, 10"
//             />
//           )}

//           {/* Update map view when user location is set */}
//           {userLocation && (
//             <ChangeMapView
//               center={[
//                 (userLocation.lat + branchLat) / 2,
//                 (userLocation.lng + branchLng) / 2,
//               ]}
//               zoom={12}
//             />
//           )}
//         </MapContainer>
//       </div>

//       {/* Get Location Button */}
//       <button
//         onClick={getUserLocation}
//         disabled={loading}
//         className={`w-full ${
//           loading
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-blue-500 hover:bg-blue-600"
//         } text-white font-semibold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2`}
//       >
//         {loading ? (
//           <>
//             <span className="animate-spin">⏳</span>
//             جاري تحديد الموقع...
//           </>
//         ) : (
//           <>
//             <span>📍</span>
//             {userLocation ? "إعادة تحديد موقعي" : "احصل على موقعي الحالي"}
//           </>
//         )}
//       </button>

//       {/* Distance Info */}
//       {distance && (
//         <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-gray-700">
//               المسافة إلى الفرع:
//             </span>
//             <span className="text-lg font-bold text-blue-600">
//               {distance} كم
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Next.js
if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

// Custom icon for branch location
const branchIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131546.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Component to update map view
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent({
  branchLat,
  branchLng,
  branchName,
  branchArea,
}) {
  const [userLocation, setUserLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // جلب موقع المستخدم - يتم استدعاؤه في كل مرة يضغط فيها المستخدم على الزرار
  const getUserLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("متصفحك لا يدعم خدمات الموقع");
      setLoading(false);
      return;
    }

    // استخدام getCurrentPosition مع خيارات محسّنة
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("User location retrieved:", userPos);
        setUserLocation(userPos);
        setShowRoute(true);
        setLoading(false);
        setError("");
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "تم رفض الإذن. يرجى السماح بالوصول إلى موقعك في إعدادات المتصفح.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "معلومات الموقع غير متاحة حالياً.";
            break;
          case error.TIMEOUT:
            errorMessage = "انتهت مهلة طلب الموقع.";
            break;
          default:
            errorMessage = "حدث خطأ غير معروف.";
        }

        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true, // دقة عالية
        timeout: 10000, // 10 ثواني timeout
        maximumAge: 0, // عدم استخدام cache - جلب موقع جديد في كل مرة
      },
    );
  };

  // حساب المسافة بين نقطتين
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  // الخط الأزرق بين المستخدم والفرع
  const routePositions = userLocation
    ? [
        [userLocation.lat, userLocation.lng],
        [branchLat, branchLng],
      ]
    : [];

  const distance = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        branchLat,
        branchLng,
      )
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6">
      <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4">
        <MapContainer
          center={[branchLat, branchLng]}
          zoom={13}
          style={{ height: "100%", width: "100%", borderRadius: "12px" }}
          scrollWheelZoom={false}
        >
          {/* OpenStreetMap Tiles (مجانية) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Branch Marker */}
          <Marker position={[branchLat, branchLng]} icon={branchIcon}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-gray-900">{branchName}</h3>
                <p className="text-sm text-gray-600">{branchArea}</p>
              </div>
            </Popup>
          </Marker>

          {/* User Location Marker */}
          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={userIcon}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-blue-600">موقعك الحالي</h3>
                  <p className="text-xs text-gray-500">
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Blue Route Line */}
          {showRoute && userLocation && (
            <Polyline
              positions={routePositions}
              color="#3b82f6"
              weight={4}
              opacity={0.7}
              dashArray="10, 10"
            />
          )}

          {/* Update map view when user location is set */}
          {userLocation && (
            <ChangeMapView
              center={[
                (userLocation.lat + branchLat) / 2,
                (userLocation.lng + branchLng) / 2,
              ]}
              zoom={12}
            />
          )}
        </MapContainer>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 rounded-xl border border-red-200">
          <p className="text-sm text-red-700 text-center">{error}</p>
        </div>
      )}

      {/* Get Location Button */}
      <button
        onClick={getUserLocation}
        disabled={loading}
        className={`w-full ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-semibold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2`}
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            جاري تحديد الموقع...
          </>
        ) : (
          <>
            <span>📍</span>
            {userLocation ? "تحديث موقعي" : "احصل على موقعي الحالي"}
          </>
        )}
      </button>

      {/* Distance Info */}
      {distance && (
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              المسافة إلى الفرع:
            </span>
            <span className="text-lg font-bold text-blue-600">
              {distance} كم
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
