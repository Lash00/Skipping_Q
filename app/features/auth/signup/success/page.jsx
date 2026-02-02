"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistrationSuccess() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setIsVisible(true), 100);

    // Countdown timer (for demo purposes - should be calculated from server timestamp)
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const handleCancelRequest = () => {
    // TODO: Implement cancellation API call
    if (confirm("Are you sure you want to cancel your registration request?")) {
      // API call here
      alert("Registration cancelled successfully!");
      router.push("/");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500"
      style={{
        backgroundColor: darkMode ? "#0a0f0d" : "#f8fafb",
        backgroundImage: darkMode
          ? "radial-gradient(circle at 20% 50%, rgba(54, 226, 123, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(54, 226, 123, 0.05) 0%, transparent 50%)"
          : "radial-gradient(circle at 20% 50%, rgba(54, 226, 123, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(54, 226, 123, 0.08) 0%, transparent 50%)",
      }}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 right-6 p-3 rounded-xl font-semibold transition-all duration-300 hover:scale-110 z-50"
        style={{
          backgroundColor: darkMode
            ? "rgba(54, 226, 123, 0.15)"
            : "rgba(54, 226, 123, 0.1)",
          color: "#36e27b",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Success Box */}
      <div
        className={`w-full max-w-2xl transition-all duration-700 transform ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div
          className="p-10 rounded-3xl backdrop-blur-sm relative overflow-hidden"
          style={{
            backgroundColor: darkMode
              ? "rgba(17, 23, 20, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            border: `2px solid ${
              darkMode ? "rgba(54, 226, 123, 0.3)" : "rgba(54, 226, 123, 0.2)"
            }`,
            boxShadow: darkMode
              ? "0 20px 60px rgba(54, 226, 123, 0.2), 0 0 100px rgba(54, 226, 123, 0.05)"
              : "0 20px 60px rgba(54, 226, 123, 0.15), 0 0 100px rgba(54, 226, 123, 0.08)",
          }}
        >
          {/* Animated Background Gradient */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #36e27b 0%, transparent 70%)",
              animation: "pulse 3s ease-in-out infinite",
            }}
          />

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="relative"
              style={{
                animation: "bounce-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center relative"
                style={{
                  backgroundColor: "rgba(54, 226, 123, 0.15)",
                  border: "3px solid #36e27b",
                }}
              >
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="#36e27b"
                  viewBox="0 0 24 24"
                  style={{
                    animation: "check-draw 0.5s ease-in-out 0.3s forwards",
                    strokeDasharray: 50,
                    strokeDashoffset: 50,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              {/* Pulsing rings */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px solid #36e27b",
                  animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px solid #36e27b",
                  animation:
                    "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.3s",
                  opacity: 0.4,
                }}
              />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold mb-3"
              style={{
                color: "#36e27b",
                animation: "fade-in-up 0.6s ease-out 0.2s both",
              }}
            >
              Registration Submitted! 🎉
            </h1>
            <p
              className="text-lg mb-2"
              style={{
                color: darkMode ? "#e0e0e0" : "#333333",
                animation: "fade-in-up 0.6s ease-out 0.3s both",
              }}
            >
              Your organization registration has been successfully submitted.
            </p>
            <p
              className="text-sm"
              style={{
                color: darkMode ? "#a0a0a0" : "#666666",
                animation: "fade-in-up 0.6s ease-out 0.4s both",
              }}
            >
              Our team will review your application and get back to you soon.
            </p>
          </div>

          {/* Cancellation Notice */}
          <div
            className="p-6 rounded-2xl mb-6 relative overflow-hidden"
            style={{
              backgroundColor: darkMode
                ? "rgba(54, 226, 123, 0.08)"
                : "rgba(54, 226, 123, 0.1)",
              border: `2px solid ${
                darkMode ? "rgba(54, 226, 123, 0.2)" : "rgba(54, 226, 123, 0.3)"
              }`,
              animation: "fade-in-up 0.6s ease-out 0.5s both",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="text-3xl"
                style={{
                  animation: "wiggle 2s ease-in-out infinite",
                }}
              >
                ⏰
              </div>
              <div className="flex-1">
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: darkMode ? "#e0e0e0" : "#333333" }}
                >
                  24-Hour Cancellation Period
                </h3>
                <p
                  className="text-sm mb-3"
                  style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
                >
                  You have 24 hours to cancel your registration request if you
                  change your mind. After this period, your request will be
                  processed.
                </p>

                {/* Countdown Timer */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="px-3 py-2 rounded-lg font-bold text-center min-w-[60px]"
                      style={{
                        backgroundColor: darkMode
                          ? "rgba(54, 226, 123, 0.15)"
                          : "rgba(54, 226, 123, 0.2)",
                        color: "#36e27b",
                      }}
                    >
                      <div className="text-2xl">{timeLeft.hours}</div>
                      <div className="text-xs opacity-70">Hours</div>
                    </div>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "#36e27b" }}
                    >
                      :
                    </span>
                    <div
                      className="px-3 py-2 rounded-lg font-bold text-center min-w-[60px]"
                      style={{
                        backgroundColor: darkMode
                          ? "rgba(54, 226, 123, 0.15)"
                          : "rgba(54, 226, 123, 0.2)",
                        color: "#36e27b",
                      }}
                    >
                      <div className="text-2xl">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </div>
                      <div className="text-xs opacity-70">Minutes</div>
                    </div>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: "#36e27b" }}
                    >
                      :
                    </span>
                    <div
                      className="px-3 py-2 rounded-lg font-bold text-center min-w-[60px]"
                      style={{
                        backgroundColor: darkMode
                          ? "rgba(54, 226, 123, 0.15)"
                          : "rgba(54, 226, 123, 0.2)",
                        color: "#36e27b",
                      }}
                    >
                      <div className="text-2xl">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </div>
                      <div className="text-xs opacity-70">Seconds</div>
                    </div>
                  </div>
                </div>

                {/* Cancel Button */}
                <button
                  onClick={handleCancelRequest}
                  className="px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(239, 68, 68, 0.15)"
                      : "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    border: "2px solid rgba(239, 68, 68, 0.3)",
                  }}
                >
                  Cancel Registration Request
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              animation: "fade-in-up 0.6s ease-out 0.6s both",
            }}
          >
            <Link
              href="/"
              className="flex-1 px-6 py-4 rounded-xl font-bold text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "#36e27b",
                color: "#0a0f0d",
                boxShadow: "0 4px 14px rgba(54, 226, 123, 0.4)",
              }}
            >
              Return to Home →
            </Link>

            <Link
              href="/features/auth/admin-login"
              className="flex-1 px-6 py-4 rounded-xl font-bold text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: darkMode
                  ? "rgba(54, 226, 123, 0.15)"
                  : "rgba(54, 226, 123, 0.1)",
                color: "#36e27b",
                border: "2px solid rgba(54, 226, 123, 0.3)",
              }}
            >
              Go to Login
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-green-600 opacity-10 blur-3xl" />
        </div>

        {/* Help Text */}
        <div
          className="text-center mt-6"
          style={{
            animation: "fade-in 0.6s ease-out 0.8s both",
          }}
        >
          <p
            className="text-sm"
            style={{ color: darkMode ? "#a0a0a0" : "#666666" }}
          >
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="font-semibold transition-colors duration-300"
              style={{ color: "#36e27b" }}
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes check-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes ping {
          75%,
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.05;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
