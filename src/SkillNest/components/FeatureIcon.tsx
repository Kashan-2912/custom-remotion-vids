import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { colors } from "../theme";
import { ease, fadeIn, float, floatingRotate } from "../animations";

interface FeatureIconProps {
  /** SVG path or emoji */
  icon: string;
  color?: string;
  size?: number;
  startFrame?: number;
  /** Enable 3D floating rotation */
  animate3D?: boolean;
  style?: React.CSSProperties;
}

/** SVG icon paths for each feature */
export const ICONS = {
  // Roadmap / path
  roadmap:
    "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  // Quiz / code
  code: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  // AI Brain
  brain:
    "M12 2a7 7 0 017 7c0 2.5-1.5 4.5-3 6-1 1-2 2.5-2 4h-4c0-1.5-1-3-2-4-1.5-1.5-3-3.5-3-6a7 7 0 017-7zm-2 19h4m-3-1v1m2-1v1",
  // Retention / memory
  memory:
    "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  // Clock / timer
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  // Users / group
  users:
    "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  // Community / globe
  globe:
    "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  // Trophy / challenge
  trophy:
    "M5 3h14M5 3a2 2 0 00-2 2v1a4 4 0 004 4h0M5 3v4a4 4 0 004 4m10-8a2 2 0 012 2v1a4 4 0 01-4 4h0m0 0a4 4 0 01-4-4V3m4 8v2a4 4 0 01-4 4H9a4 4 0 01-4-4v-2m4 8h2",
  // Star
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  // Chat
  chat: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  // Pause
  pause: "M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z",
  // Lightning
  lightning: "M13 10V3L4 14h7v7l9-11h-7z",
  // Bookmark
  bookmark: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
} as const;

/**
 * Animated feature icon with glow ring, 3D rotation, and scale-in entrance.
 */
export const FeatureIcon: React.FC<FeatureIconProps> = ({
  icon,
  color = colors.primary,
  size = 56,
  startFrame = 0,
  animate3D = true,
  style,
}) => {
  const frame = useCurrentFrame();

  // Entrance
  const opacity = fadeIn(frame, startFrame, 15);
  const scale = interpolate(
    frame,
    [startFrame, startFrame + 18],
    [0.3, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.pop },
  );

  // 3D float
  const rotY = animate3D ? floatingRotate(frame, 150, 10, "Y") : "rotateY(0deg)";
  const floatY = animate3D ? float(frame, 120, 5) : 0;

  // Glow ring pulse
  const glowScale = interpolate(
    frame % 90,
    [0, 45, 90],
    [1, 1.15, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const glowOpacity = interpolate(
    frame % 90,
    [0, 45, 90],
    [0.2, 0.5, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const iconPath = ICONS[icon as keyof typeof ICONS] || icon;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale}) translateY(${floatY}px) ${rotY}`,
        ...style,
      }}
    >
      {/* Glow ring behind */}
      <div
        style={{
          position: "absolute",
          inset: -8,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          transform: `scale(${glowScale})`,
          opacity: glowOpacity,
        }}
      />

      {/* Icon container */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 14,
          background: `${color}18`,
          border: `1px solid ${color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 15px ${color}22`,
        }}
      >
        <svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={iconPath} />
        </svg>
      </div>
    </div>
  );
};
