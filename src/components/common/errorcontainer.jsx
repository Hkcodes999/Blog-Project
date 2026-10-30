import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// --- SVG Illustrations (Precision Glassmorphism & Architectural Tech Style) ---
const svgMap = {
  // Lock - Unauthorized (Biometric Cyber-Lock & Credential Shield)
  unauthorized: (
    <svg
      viewBox="0 0 260 200"
      className="h-full w-auto drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="auth-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6F3A" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#FF6F3A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="auth-card" x1="80" y1="26" x2="180" y2="174" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="auth-coral" x1="110" y1="96" x2="150" y2="136" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF8554" />
          <stop offset="100%" stopColor="#E6531E" />
        </linearGradient>
        <linearGradient id="auth-scan" x1="80" y1="0" x2="180" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6F3A" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF6F3A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF6F3A" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="30" cy="30" r="1.5" fill="#E2E8F0" />
      <circle cx="230" cy="30" r="1.5" fill="#E2E8F0" />
      <circle cx="30" cy="170" r="1.5" fill="#E2E8F0" />
      <circle cx="230" cy="170" r="1.5" fill="#E2E8F0" />

      <ellipse cx="130" cy="170" rx="75" ry="12" fill="url(#auth-glow)" />

      <rect x="85" y="30" width="90" height="140" rx="16" fill="#1E293B" opacity="0.04" />
      <rect x="85" y="26" width="90" height="140" rx="16" fill="url(#auth-card)" stroke="#E2E8F0" strokeWidth="1.5" />

      <rect x="114" y="42" width="32" height="22" rx="5" fill="#FFF2EC" stroke="#FF6F3A" strokeWidth="1.2" />
      <line x1="114" y1="49" x2="124" y2="49" stroke="#FF6F3A" strokeWidth="1" />
      <line x1="114" y1="56" x2="124" y2="56" stroke="#FF6F3A" strokeWidth="1" />
      <line x1="136" y1="49" x2="146" y2="49" stroke="#FF6F3A" strokeWidth="1" />
      <line x1="136" y1="56" x2="146" y2="56" stroke="#FF6F3A" strokeWidth="1" />

      <path d="M 112 86 A 22 22 0 0 1 148 86" stroke="#FF8554" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" fill="none" />
      <path d="M 117 92 A 15 15 0 0 1 143 92" stroke="#FF8554" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" fill="none" />
      <path d="M 122 98 A 9 9 0 0 1 138 98" stroke="#FF6F3A" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      <path d="M 122 116 V 105 C 122 100 138 100 138 105 V 116" stroke="#64748B" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="114" y="114" width="32" height="26" rx="6" fill="url(#auth-coral)" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="130" cy="125" r="3" fill="white" />
      <path d="M 128.5 126 L 130 133 L 131.5 126 Z" fill="white" />

      <line x1="85" y1="90" x2="175" y2="90" stroke="url(#auth-scan)" strokeWidth="1.5" />
      <circle cx="130" cy="90" r="2" fill="#FF6F3A" />

      <g transform="translate(75, 148)">
        <rect width="110" height="20" rx="10" fill="white" stroke="#FFE4D6" strokeWidth="1" />
        <circle cx="12" cy="10" r="3" fill="#FF6F3A" />
        <text x="62" y="14" textAnchor="middle" fill="#FF6F3A" fontSize="8.5" fontWeight="700" letterSpacing="0.05em" fontFamily="sans-serif">
          AUTH // RESTRICTED
        </text>
      </g>
    </svg>
  ),

  // Astronaut / Radar - Not Found (Precision Radar & Astronomical Locus)
  notFound: (
    <svg
      viewBox="0 0 260 200"
      className="h-full w-auto drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="nf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6F3A" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#FF6F3A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nf-lens" x1="100" y1="70" x2="160" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFF1EB" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="nf-sweep" x1="130" y1="100" x2="200" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6F3A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF6F3A" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="30" cy="30" r="1.5" fill="#E2E8F0" />
      <circle cx="230" cy="30" r="1.5" fill="#E2E8F0" />
      <circle cx="30" cy="170" r="1.5" fill="#E2E8F0" />
      <circle cx="230" cy="170" r="1.5" fill="#E2E8F0" />

      <path d="M 24 30 H 36 M 30 24 V 36" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M 224 30 H 236 M 230 24 V 36" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M 24 170 H 36 M 30 164 V 176" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M 224 170 H 236 M 230 164 V 176" stroke="#CBD5E1" strokeWidth="1" />

      <ellipse cx="130" cy="100" rx="85" ry="55" fill="url(#nf-glow)" />

      <circle cx="130" cy="100" r="76" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 5" />
      <circle cx="130" cy="100" r="54" stroke="#FFE4D6" strokeWidth="1.5" />
      <circle cx="130" cy="100" r="34" stroke="#FF6F3A" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />

      <line x1="50" y1="100" x2="210" y2="100" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 4" />
      <line x1="130" y1="20" x2="130" y2="180" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 4" />

      <path d="M 130 100 L 196 62 A 76 76 0 0 0 130 24 Z" fill="url(#nf-sweep)" />

      <circle cx="130" cy="100" r="32" fill="url(#nf-lens)" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="130" cy="100" r="32" stroke="#FF8554" strokeWidth="1" opacity="0.3" />

      <path d="M 118 92 H 114 V 96" stroke="#FF6F3A" strokeWidth="2" strokeLinecap="round" />
      <path d="M 142 92 H 146 V 96" stroke="#FF6F3A" strokeWidth="2" strokeLinecap="round" />
      <path d="M 114 104 V 108 H 118" stroke="#FF6F3A" strokeWidth="2" strokeLinecap="round" />
      <path d="M 146 104 V 108 H 142" stroke="#FF6F3A" strokeWidth="2" strokeLinecap="round" />

      <circle cx="130" cy="100" r="9" stroke="#FF6F3A" strokeWidth="1.5" opacity="0.4" />
      <circle cx="130" cy="100" r="4" fill="#FF6F3A" />

      <g transform="translate(86, 14)">
        <rect width="88" height="20" rx="10" fill="white" stroke="#FFE4D6" strokeWidth="1" />
        <circle cx="12" cy="10" r="3" fill="#FF6F3A" />
        <text x="50" y="14" textAnchor="middle" fill="#FF6F3A" fontSize="9" fontWeight="700" letterSpacing="0.05em" fontFamily="sans-serif">
          LOCUS // 404
        </text>
      </g>

      <g transform="translate(164, 148)">
        <rect width="78" height="18" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
        <text x="39" y="12.5" textAnchor="middle" fill="#64748B" fontSize="8.5" fontWeight="600" letterSpacing="0.05em" fontFamily="sans-serif">
          NOT_FOUND
        </text>
      </g>
    </svg>
  ),

  // Vault door - Forbidden (Encrypted Perimeter Barrier)
  forbidden: (
    <svg
      viewBox="0 0 260 200"
      className="h-full w-auto drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="fb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6F3A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF6F3A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fb-hex" x1="70" y1="30" x2="190" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
        <linearGradient id="fb-core" x1="105" y1="75" x2="155" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF8554" />
          <stop offset="100%" stopColor="#E6531E" />
        </linearGradient>
      </defs>

      <circle cx="30" cy="30" r="1.5" fill="#E2E8F0" />
      <circle cx="230" cy="30" r="1.5" fill="#E2E8F0" />
      <circle cx="30" cy="170" r="1.5" fill="#E2E8F0" />
      <circle cx="230" cy="170" r="1.5" fill="#E2E8F0" />

      <ellipse cx="130" cy="170" rx="75" ry="12" fill="url(#fb-glow)" />

      <path
        d="M 130 32 L 182 62 V 122 L 130 152 L 78 122 V 62 Z"
        fill="url(#fb-hex)"
        stroke="#E2E8F0"
        strokeWidth="2"
      />

      <circle cx="130" cy="92" r="44" stroke="#FFE4D6" strokeWidth="1.5" />
      <circle cx="130" cy="92" r="44" stroke="#FF6F3A" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />

      <line x1="96" y1="68" x2="164" y2="116" stroke="#FF8554" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <line x1="96" y1="116" x2="164" y2="68" stroke="#FF8554" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

      <circle cx="130" cy="92" r="26" fill="url(#fb-core)" stroke="white" strokeWidth="2" />
      <circle cx="130" cy="92" r="15" stroke="white" strokeWidth="3" fill="none" />
      <line x1="119" y1="81" x2="141" y2="103" stroke="white" strokeWidth="3" strokeLinecap="round" />

      <rect x="128" y="44" width="4" height="6" rx="2" fill="#64748B" />
      <rect x="128" y="134" width="4" height="6" rx="2" fill="#64748B" />
      <rect x="82" y="90" width="6" height="4" rx="2" fill="#64748B" />
      <rect x="172" y="90" width="6" height="4" rx="2" fill="#64748B" />

      <g transform="translate(85, 144)">
        <rect width="90" height="20" rx="10" fill="white" stroke="#FFE4D6" strokeWidth="1" />
        <circle cx="12" cy="10" r="3" fill="#FF6F3A" />
        <text x="52" y="14" textAnchor="middle" fill="#FF6F3A" fontSize="8.5" fontWeight="700" letterSpacing="0.05em" fontFamily="sans-serif">
          GATE // 403_DENIED
        </text>
      </g>
    </svg>
  ),

  // Envelope with paper - Empty (Architectural Editorial Folio & Stylus)
  empty: (
    <svg
      viewBox="0 0 260 200"
      className="h-full w-auto drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="emp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6F3A" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FF6F3A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="emp-card" x1="80" y1="20" x2="180" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>
        <linearGradient id="emp-pen" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF8554" />
          <stop offset="100%" stopColor="#E6531E" />
        </linearGradient>
      </defs>

      <circle cx="30" cy="30" r="1.5" fill="#E2E8F0" />
      <circle cx="230" cy="30" r="1.5" fill="#E2E8F0" />
      <circle cx="30" cy="170" r="1.5" fill="#E2E8F0" />
      <circle cx="230" cy="170" r="1.5" fill="#E2E8F0" />

      <ellipse cx="130" cy="170" rx="75" ry="12" fill="url(#emp-glow)" />

      <rect
        x="80"
        y="26"
        width="100"
        height="136"
        rx="14"
        fill="#FFF2EC"
        stroke="#FFE4D6"
        strokeWidth="1.2"
        transform="rotate(-4 130 94)"
      />

      <rect x="85" y="24" width="96" height="138" rx="14" fill="url(#emp-card)" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="99" y="38" width="34" height="8" rx="4" fill="#FF6F3A" />
      <rect x="99" y="52" width="58" height="6" rx="3" fill="#1E293B" opacity="0.65" />

      <line x1="99" y1="68" x2="167" y2="68" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="99" y1="78" x2="159" y2="78" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="99" y1="88" x2="163" y2="88" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />

      <rect x="99" y="100" width="68" height="34" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="115" cy="114" r="3.5" fill="#CBD5E1" />
      <path d="M 123 124 L 131 114 L 139 124 Z" fill="#CBD5E1" />
      <path d="M 135 124 L 141 118 L 147 124 Z" fill="#94A3B8" />

      <g transform="translate(178, 56) rotate(35)">
        <rect x="0" y="0" width="10" height="36" rx="5" fill="#1E293B" />
        <rect x="0" y="8" width="10" height="5" fill="#FF6F3A" />
        <path d="M 0 34 L 5 44 L 10 34 Z" fill="url(#emp-pen)" />
        <circle cx="5" cy="38" r="1.5" fill="white" />
      </g>

      <circle cx="188" cy="100" r="4" stroke="#FF6F3A" strokeWidth="1" opacity="0.5" />
      <circle cx="188" cy="100" r="1.5" fill="#FF6F3A" />

      <g transform="translate(85, 144)">
        <rect width="90" height="20" rx="10" fill="white" stroke="#FFE4D6" strokeWidth="1" />
        <circle cx="12" cy="10" r="3" fill="#FF6F3A" />
        <text x="52" y="14" textAnchor="middle" fill="#FF6F3A" fontSize="8.5" fontWeight="700" letterSpacing="0.05em" fontFamily="sans-serif">
          CANVAS // 0_POSTS
        </text>
      </g>
    </svg>
  ),

  // Server rack with lightning - Error (Modular Blade & Signal Wave Anomaly)
  error: (
    <svg
      viewBox="0 0 260 200"
      className="h-full w-auto drop-shadow-sm select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="err-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6F3A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF6F3A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="err-chassis" x1="60" y1="40" x2="200" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
        <linearGradient id="err-wave" x1="50" y1="0" x2="210" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6F3A" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#FF6F3A" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      <circle cx="30" cy="30" r="1.5" fill="#E2E8F0" />
      <circle cx="230" cy="30" r="1.5" fill="#E2E8F0" />
      <circle cx="30" cy="170" r="1.5" fill="#E2E8F0" />
      <circle cx="230" cy="170" r="1.5" fill="#E2E8F0" />

      <ellipse cx="130" cy="170" rx="75" ry="12" fill="url(#err-glow)" />

      <rect x="62" y="48" width="136" height="38" rx="10" fill="url(#err-chassis)" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="76" cy="67" r="3.5" fill="#FF6F3A" />
      <circle cx="86" cy="67" r="3" fill="#CBD5E1" />
      <circle cx="94" cy="67" r="3" fill="#CBD5E1" />
      <line x1="110" y1="67" x2="150" y2="67" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="166" y="58" width="22" height="18" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

      <rect x="62" y="96" width="136" height="38" rx="10" fill="url(#err-chassis)" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="76" cy="115" r="3.5" fill="#EF4444" />
      <circle cx="86" cy="115" r="3" fill="#CBD5E1" />
      <circle cx="94" cy="115" r="3" fill="#CBD5E1" />
      <line x1="110" y1="115" x2="150" y2="115" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="166" y="106" width="22" height="18" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

      <path
        d="M 50 91 H 105 L 115 75 L 125 107 L 135 83 L 143 91 H 210"
        stroke="url(#err-wave)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <g transform="translate(135, 68)">
        <polygon points="8,0 16,8 8,16 0,8" fill="#FF6F3A" />
        <circle cx="8" cy="8" r="1.5" fill="white" />
      </g>

      <g transform="translate(85, 146)">
        <rect width="90" height="20" rx="10" fill="white" stroke="#FFE4D6" strokeWidth="1" />
        <circle cx="12" cy="10" r="3" fill="#FF6F3A" />
        <text x="52" y="14" textAnchor="middle" fill="#FF6F3A" fontSize="8.5" fontWeight="700" letterSpacing="0.05em" fontFamily="sans-serif">
          SYSTEM // 500_FAULT
        </text>
      </g>
    </svg>
  ),
};

const Errorcontainer = ({
  children,
  error = false,
  notFound = false,
  unauthorized = false,
  empty = false,
  message,
  description,
  badge,
  className = "text-3xl md:text-4xl text-gray-900 font-[font1] font-semibold tracking-tight",
  button = true,
  ButtonMessage,
  buttonClassName = "bg-[#FF6F3A] hover:bg-[#e35d2b] text-white text-base font-medium rounded-xl px-6 py-2.5 transition-all duration-300 shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 cursor-pointer font-[font1]",
  to,
  icon = null,
  goBack = false,
  onRetry,
}) => {
  const containerRef = useRef();
  const navigate = useNavigate();

  // Helper to extract a human-readable message from various error types
  const getErrorMessage = (err) => {
    if (!err || typeof err === "boolean") return null;
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;
    if (typeof err === "object") {
      return err.message || err.error || err.statusText || null;
    }
    return String(err);
  };

  const isError = Boolean(error);
  const isNotFound = Boolean(notFound);
  const isUnauthorized = Boolean(unauthorized);
  const isEmpty = Boolean(empty);

  // If used as a wrapper around children, only display container when an error/state is active.
  // If used standalone without children, always render the container according to props.
  const hasTrigger = isError || isNotFound || isUnauthorized || isEmpty;
  const shouldRenderContainer = !children || hasTrigger;

  useGSAP(
    () => {
      if (!containerRef.current || !shouldRenderContainer) return;
      gsap.from(containerRef.current.children, {
        autoAlpha: 0,
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        filter: "blur(4px)",
      });
    },
    { scope: containerRef, dependencies: [isError, isNotFound, isUnauthorized, isEmpty, shouldRenderContainer] }
  );

  // If wrapped around children and no error state is active, render children normally
  if (!shouldRenderContainer) {
    return children;
  }

  const extractedErrorText = getErrorMessage(error);

  // Determine state priority: error -> notFound -> empty -> unauthorized
  const activeIcon =
    icon ||
    (isError
      ? "error"
      : isNotFound
      ? "notFound"
      : isEmpty
      ? "empty"
      : isUnauthorized
      ? "unauthorized"
      : "error");

  const activeBadge =
    badge ||
    (isError
      ? "SYSTEM // 500_FAULT"
      : isNotFound
      ? "404 // NOT FOUND"
      : isEmpty
      ? "CANVAS // 0_POSTS"
      : isUnauthorized
      ? "ACCESS CONTROL"
      : null);

  const activeMessage =
    message ||
    (isError
      ? "Something went wrong"
      : isNotFound
      ? "Post not found"
      : isEmpty
      ? "No posts available"
      : isUnauthorized
      ? "Sign in to continue"
      : "Notice");

  const activeDesc =
    description ||
    (isError
      ? extractedErrorText ||
        "An unexpected error occurred while loading this page. Please try again."
      : isNotFound
      ? "The article you are looking for doesn't exist, may have been removed, or the link is broken."
      : isEmpty
      ? "There are currently no articles published in this section."
      : isUnauthorized
      ? "This page is reserved for members. Log in or create an account to access the full experience."
      : "");

  const handleRetry =
    typeof onRetry === "function"
      ? onRetry
      : onRetry === true
      ? () => window.location.reload()
      : null;

  const activeBtnMsg =
    ButtonMessage ||
    (handleRetry
      ? "Try again"
      : isError
      ? "Return home"
      : isNotFound
      ? "Browse all posts"
      : isEmpty
      ? "Browse posts"
      : isUnauthorized
      ? "Go to login"
      : "Go to home");

  const activeTo =
    to ||
    (isError
      ? "/"
      : isNotFound
      ? "/all-posts"
      : isEmpty
      ? "/all-posts"
      : isUnauthorized
      ? "/auth/login"
      : "/");

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center min-h-[68vh] w-full gap-4 flex-col px-4 text-center select-none py-12"
    >
      {/* Custom Badge if provided */}
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-50 text-[#FF6F3A] border border-orange-200/60 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F3A] animate-pulse" />
          {badge}
        </span>
      )}

      {/* Illustration Frame */}
      {activeIcon && svgMap[activeIcon] && (
        <div className="h-[22vh] max-h-[220px] flex items-center justify-center transition-transform duration-500 hover:scale-105 my-1">
          {svgMap[activeIcon]}
        </div>
      )}

      {/* Headlines */}
      <div className="flex flex-col gap-2 max-w-[500px]">
        <h2 className={className}>{activeMessage}</h2>
        <p className="text-gray-500 font-[font1] text-base leading-relaxed">
          {activeDesc}
        </p>

        {/* Technical Error Detail Callout if both custom description and error text exist */}
        {isError && extractedErrorText && description && (
          <div className="mt-2 px-3.5 py-1.5 rounded-lg bg-red-50/80 border border-red-200/60 text-xs font-mono text-red-600 max-w-[460px] mx-auto break-all select-all">
            <span className="font-semibold text-red-700">Error: </span>
            {extractedErrorText}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
        {goBack && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 text-base font-[font1] text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-200 cursor-pointer bg-white/80 hover:bg-gray-50 shadow-xs"
          >
            Go back
          </button>
        )}

        {button &&
          (handleRetry ? (
            <Button
              type="button"
              onClick={handleRetry}
              textColor="text-white"
              className={buttonClassName}
            >
              {activeBtnMsg}
            </Button>
          ) : (
            <Link to={activeTo}>
              <Button
                textColor="text-white"
                className={buttonClassName}
              >
                {activeBtnMsg}
              </Button>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Errorcontainer;
