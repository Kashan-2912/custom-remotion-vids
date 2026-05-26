import React from "react";
import { useCurrentFrame, interpolate, Img, staticFile, OffthreadVideo } from "remotion";
import { colors, shadows } from "../theme";
import { ease, shinePosition } from "../animations";


interface MockUIProps {
  screenshotSrc?: string;
  videoSrc?: string;
  startFrame?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  /** If true, adds 3D perspective entrance */
  perspective?: boolean;
  /** Browser chrome title */
  title?: string;
}

/**
 * Browser window frame wrapping a product screenshot or video with animated entrance.
 */
export const MockUI: React.FC<MockUIProps> = ({
  screenshotSrc,
  videoSrc,
  startFrame = 0,
  width = 900,
  height = 560,
  style,
  perspective = true,
  title = "SkillNest",
}) => {
  const frame = useCurrentFrame();

  // Entrance animation
  const progress = interpolate(
    frame,
    [startFrame, startFrame + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );

  const perspectiveStyle = perspective
    ? {
        transform: `perspective(1200px) rotateY(${interpolate(progress, [0, 1], [-6, 0])}deg) rotateX(${interpolate(progress, [0, 1], [3, 0])}deg) scale(${interpolate(progress, [0, 1], [0.88, 1])}) translateZ(0)`,
      }
    : {
        transform: `scale(${interpolate(progress, [0, 1], [0.9, 1])}) translateZ(0)`,
      };

  // Shine sweep
  const shineX = shinePosition(frame, startFrame + 25, 50);

  // Glow intensity
  const glowIntensity = interpolate(
    frame,
    [startFrame + 15, startFrame + 40],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );

  return (
    <div
      style={{
        width,
        opacity: progress,
        backfaceVisibility: "hidden",
        ...perspectiveStyle,
        ...style,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          background: "rgba(30, 30, 30, 0.95)",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            marginLeft: 12,
            padding: "5px 14px",
            borderRadius: 6,
            background: "rgba(255,255,255,0.06)",
            fontSize: 12,
            fontFamily: "monospace",
            color: colors.textMuted,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ color: colors.green, fontSize: 10 }}>🔒</span>
          <span>skillnest.app/{title.toLowerCase().replace(/\s+/g, "-")}</span>
        </div>
      </div>

      {/* Screenshot container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height,
          overflow: "hidden",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          background: "#111",
          boxShadow: `${shadows.elevate}, 0 0 ${30 * glowIntensity}px rgba(229,57,53,${0.15 * glowIntensity})`,
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        {videoSrc ? (
          <OffthreadVideo
            src={staticFile(videoSrc)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            muted
            volume={0}
          />
        ) : (
          screenshotSrc && (
            <Img
              src={staticFile(screenshotSrc)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          )
        )}

        {/* Shine sweep overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(60deg, transparent 30%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 52%, transparent 70%)`,
            backgroundSize: "200% 100%",
            backgroundPosition: `${shineX}% 0`,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};
