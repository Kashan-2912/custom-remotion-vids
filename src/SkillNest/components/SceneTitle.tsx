import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { fontHeading } from "../fonts";
import { colors, shadows } from "../theme";
import { ease, fadeIn } from "../animations";

interface SceneTitleProps {
  title: string;
  subtitle?: string;
  startFrame?: number;
  align?: "left" | "center";
  icon?: React.ReactNode;
}

/**
 * Animated scene heading with word-by-word reveal and red accent underline.
 */
export const SceneTitle: React.FC<SceneTitleProps> = ({
  title,
  subtitle,
  startFrame = 0,
  align = "left",
  icon,
}) => {
  const frame = useCurrentFrame();

  // Title word-by-word reveal
  const words = title.split(" ");

  // Underline draw
  const underlineWidth = interpolate(
    frame,
    [startFrame + 15, startFrame + 40],
    [0, 80],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );

  // Subtitle fade
  const subtitleStyle = subtitle
    ? {
        opacity: fadeIn(frame, startFrame + 20, 20),
        transform: `translateY(${interpolate(
          frame,
          [startFrame + 20, startFrame + 40],
          [10, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
        )}px)`,
      }
    : {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        gap: 12,
      }}
    >
      {/* Icon + Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {icon && (
          <div
            style={{
              opacity: fadeIn(frame, startFrame, 15),
              transform: `scale(${interpolate(
                frame,
                [startFrame, startFrame + 15],
                [0.5, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.pop },
              )})`,
            }}
          >
            {icon}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {words.map((word, i) => {
            const delay = startFrame + i * 4;
            const wordOpacity = fadeIn(frame, delay, 12);
            const wordY = interpolate(
              frame,
              [delay, delay + 12],
              [20, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
            );

            return (
              <span
                key={i}
                style={{
                  fontFamily: fontHeading,
                  fontSize: 52,
                  fontWeight: 700,
                  color: colors.textPrimary,
                  textShadow: shadows.text,
                  opacity: wordOpacity,
                  transform: `translateY(${wordY}px)`,
                  display: "inline-block",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Red accent underline */}
      <div
        style={{
          width: underlineWidth,
          height: 3,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
          boxShadow: `0 0 12px rgba(229,57,53,0.35)`,
          alignSelf: align === "center" ? "center" : "flex-start",
          marginLeft: icon ? 60 : 0,
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            fontFamily: fontHeading,
            fontSize: 22,
            fontWeight: 400,
            color: colors.textSecondary,
            margin: 0,
            marginLeft: icon ? 60 : 0,
            ...subtitleStyle,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
