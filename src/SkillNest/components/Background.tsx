import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { colors, gradients } from "../theme";
import { ease } from "../animations";

/**
 * Animated dark background with floating red glow orbs, grid lines, and particles.
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Slow-moving glow orbs
  const orb1X = interpolate(frame, [0, 300], [width * 0.2, width * 0.35], {
    extrapolateRight: "clamp",
    easing: ease.inOut,
  });
  const orb1Y = interpolate(frame, [0, 400], [height * 0.3, height * 0.5], {
    extrapolateRight: "clamp",
    easing: ease.inOut,
  });
  const orb2X = interpolate(frame, [0, 350], [width * 0.7, width * 0.55], {
    extrapolateRight: "clamp",
    easing: ease.inOut,
  });
  const orb2Y = interpolate(frame, [0, 450], [height * 0.6, height * 0.35], {
    extrapolateRight: "clamp",
    easing: ease.inOut,
  });

  // Pulse
  const pulse = interpolate(
    frame % 90,
    [0, 45, 90],
    [0.6, 1, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.inOut },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        overflow: "hidden",
      }}
    >
      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: gradients.darkVignette,
        }}
      />

      {/* Glow orb 1 */}
      <div
        style={{
          position: "absolute",
          left: orb1X,
          top: orb1Y,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(229,57,53,${0.12 * pulse}) 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />

      {/* Glow orb 2 */}
      <div
        style={{
          position: "absolute",
          left: orb2X,
          top: orb2Y,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(139,26,26,${0.1 * pulse}) 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(50px)",
        }}
      />

      {/* Subtle accent orb (smaller, different position) */}
      <div
        style={{
          position: "absolute",
          left: width * 0.5,
          top: height * 0.2,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(229,57,53,${0.06 * pulse}) 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const seed = i * 137.508;
        const x = ((seed * 7.3) % 100);
        const y = ((seed * 13.7) % 100);
        const size = 2 + (i % 3);
        const speed = 120 + (i % 5) * 30;
        const floatY = interpolate(
          frame % speed,
          [0, speed / 2, speed],
          [0, -(8 + i % 6), 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const particleOpacity = interpolate(
          frame % speed,
          [0, speed / 3, speed],
          [0.15, 0.4, 0.15],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: i % 3 === 0 ? colors.primary : colors.textMuted,
              opacity: particleOpacity,
              transform: `translateY(${floatY}px)`,
            }}
          />
        );
      })}

      {/* Subtle horizontal grid lines */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0, opacity: 0.03 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * (height / 12)}
            x2={width}
            y2={i * (height / 12)}
            stroke="#fff"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * (width / 20)}
            y1={0}
            x2={i * (width / 20)}
            y2={height}
            stroke="#fff"
            strokeWidth={1}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
