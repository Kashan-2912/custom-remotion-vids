import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { colors } from "../theme";
import { ease, fadeIn } from "../animations";
import { fontHeading } from "../fonts";

interface TagBadgeProps {
  text: string;
  startFrame?: number;
  color?: string;
  delay?: number;
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

export const TagBadge: React.FC<TagBadgeProps> = ({
  text,
  startFrame = 0,
  color = colors.primary,
  delay = 0,
  size = "md",
  style,
}) => {
  const frame = useCurrentFrame();
  const start = startFrame + delay;

  const opacity = fadeIn(frame, start, 12);
  const scale = interpolate(
    frame,
    [start, start + 12],
    [0.8, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.pop },
  );

  const fontSize = size === "sm" ? 12 : 14;
  const padding = size === "sm" ? "4px 10px" : "6px 14px";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding,
        borderRadius: 20,
        background: `${color}18`,
        border: `1px solid ${color}33`,
        color,
        fontSize,
        fontWeight: 600,
        fontFamily: fontHeading,
        letterSpacing: 0.3,
        opacity,
        transform: `scale(${scale})`,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {text}
    </span>
  );
};
