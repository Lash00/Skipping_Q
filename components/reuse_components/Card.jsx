// export default function Card({
//   children,
//   className = "",
//   style = {},
//   darkMode = false,
// }) {
//   const gradientBg = darkMode
//     ? "linear-gradient(135deg, #111714 0%, #1a3a2a 50%, #0f2818 100%)"
//     : "linear-gradient(135deg,  #36e27b 0%, #1a3a2a 50%, #0f2818 100%)";

//   return (
//     <div
//       style={{
//         background: gradientBg,
//         fontWeight: "bolder",
//         border: `1px solid ${darkMode ? "#2a4a3a" : "#d4e0db"}`,
//         boxShadow: darkMode
//           ? "0 4px 15px rgba(54, 226, 123, 0.15)"
//           : "0 4px 15px rgba(54, 226, 123, 0.1)",
//         ...style,
//       }}
//       className={`rounded-lg p-2 transition hover:shadow-lg ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

export default function Card({
  children,
  className = "",
  style = {},
  darkMode = false,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        boxShadow:
          "5px 10px 3px rgba(0, 0, 0, 0.1),-5px -10px 3px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
      className={`rounded-xl p-6 transition hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
