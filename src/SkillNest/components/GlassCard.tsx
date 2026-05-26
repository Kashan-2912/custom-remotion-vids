import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { colors, shadows } from "../theme";
import { ease, fadeIn } from "../animations";
import { fontBody } from "../fonts";

interface GlassCardProps {
  children: React.ReactNode;
  startFrame?: number;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  glow?: boolean;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  startFrame = 0,
  width,
  height,
  style,
  glow = false,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const start = startFrame + delay;

  const opacity = fadeIn(frame, start, 18);
  const scale = interpolate(
    frame,
    [start, start + 18],
    [0.92, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );
  const translateY = interpolate(
    frame,
    [start, start + 18],
    [15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );

  const glowIntensity = glow
    ? interpolate(
        frame % 90,
        [0, 45, 90],
        [0.5, 1, 0.5],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      )
    : 0;

  return (
    <div
      style={{
        width,
        height,
        padding: 24,
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: glow
          ? `1px solid rgba(229,57,53,${0.2 + glowIntensity * 0.15})`
          : `1px solid rgba(255,255,255,0.08)`,
        boxShadow: glow
          ? `${shadows.card}, 0 0 ${20 * glowIntensity}px rgba(229,57,53,${0.15 * glowIntensity})`
          : shadows.card,
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        fontFamily: fontBody,
        color: colors.textPrimary,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
