import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { Background } from "../components/Background";
import { SceneTitle } from "../components/SceneTitle";
import { MockUI } from "../components/MockUI";
import { FeatureIcon } from "../components/FeatureIcon";
import { TagBadge } from "../components/TagBadge";
import { GlassCard } from "../components/GlassCard";
import { fontHeading, fontBody, fontMono } from "../fonts";
import { colors, shadows } from "../theme";
import {
  ease,
  fadeIn,
  slideInFromBottom,
  typewriterText,
  typewriterCursorOpacity,
  zoomIn,
  scaleIn,
} from "../animations";

const CODE_SNIPPET = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1)
       + fibonacci(n - 2);
}`;

export const Scene03Quiz: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  // Camera
  const zoom = zoomIn(frame, 50, 190, 1, 1.06);

  // Code typewriter
  const typedCode = typewriterText(frame, CODE_SNIPPET, 25, 0.5);
  const cursor = typewriterCursorOpacity(frame, 16);

  // Buttons entrance
  const btnStyle1 = scaleIn(frame, 65, 15, 0.8);
  const btnStyle2 = scaleIn(frame, 72, 15, 0.8);

  // Results panel
  const resultsOpacity = fadeIn(frame, 95, 20);
  const resultsSlide = interpolate(
    frame,
    [95, 115],
    [40, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );

  // Score counter
  const score = Math.min(
    92,
    Math.floor(
      interpolate(frame, [100, 125], [0, 92], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: ease.out,
      }),
    ),
  );

  return (
    <AbsoluteFill>
      <Background />

      <AbsoluteFill
        style={{
          transform: `scale(${zoom})`,
          padding: "60px 80px",
          display: "flex",
          flexDirection: "row",
          gap: 50,
        }}
      >
        {/* Left: Screenshot */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <MockUI
              screenshotSrc="features.jpeg"
              startFrame={5}
              width={880}
              height={520}
              title="assessment"
            />

            {/* Code overlay on top of screenshot */}
            <div
              style={{
                position: "absolute",
                bottom: 30,
                left: 30,
                right: 200,
                ...slideInFromBottom(frame, 20, 25, 30),
              }}
            >
              <GlassCard startFrame={20} style={{ padding: 16 }}>
                {/* Code block */}
                <pre
                  style={{
                    fontFamily: fontMono,
                    fontSize: 14,
                    color: colors.green,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {typedCode}
                  <span style={{ color: colors.primary, opacity: cursor }}>▌</span>
                </pre>
              </GlassCard>
            </div>

            {/* Buttons overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 40,
                right: 30,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  color: "#fff",
                  fontFamily: fontHeading,
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                  boxShadow: shadows.glow,
                  ...btnStyle1,
                }}
              >
                🧪 Test with AI
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${colors.border}`,
                  color: colors.textPrimary,
                  fontFamily: fontHeading,
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "center",
                  ...btnStyle2,
                }}
              >
                ▶ Run Code
              </div>
            </div>
          </div>
        </div>

        {/* Right: Title + results */}
        <div
          style={{
            flex: "0 0 380px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <SceneTitle
            title="Smart Assessment"
            subtitle="AI evaluates your understanding in real-time"
            startFrame={0}
            icon={
              <FeatureIcon
                icon="code"
                color={colors.green}
                size={52}
                startFrame={0}
              />
            }
          />

          <div
            style={{ display: "flex", gap: 8, ...slideInFromBottom(frame, 30, 20) }}
          >
            <TagBadge text="IDE Built-in" startFrame={35} color={colors.green} />
            <TagBadge text="AI Grading" startFrame={41} color={colors.purple} />
          </div>

          {/* Score result */}
          <GlassCard
            startFrame={90}
            glow
            style={{
              opacity: resultsOpacity,
              transform: `translateY(${resultsSlide}px)`,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: fontHeading,
                  fontSize: 48,
                  fontWeight: 800,
                  color: colors.green,
                  textShadow: `0 0 20px rgba(102,187,106,0.4)`,
                }}
              >
                {score}%
              </div>
              <div
                style={{
                  fontFamily: fontBody,
                  fontSize: 14,
                  color: colors.textSecondary,
                  marginTop: 4,
                }}
              >
                Assessment Score
              </div>
              {/* Progress bar */}
              <div
                style={{
                  width: "100%",
                  height: 6,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.1)",
                  marginTop: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${score}%`,
                    height: "100%",
                    borderRadius: 3,
                    background: `linear-gradient(90deg, ${colors.green}, ${colors.cyan})`,
                    boxShadow: `0 0 10px rgba(102,187,106,0.4)`,
                  }}
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
