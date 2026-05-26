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
import { fontHeading, fontBody } from "../fonts";
import { colors, shadows } from "../theme";
import {
  ease,
  fadeIn,
  slideInFromBottom,
  zoomIn,
  progressFill,
} from "../animations";

export const Scene05Retention: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const zoom = zoomIn(frame, 0, 240, 1.03, 1);

  // Memory strength meter
  const memoryStages = [
    { target: 40, start: 55, dur: 20, label: "Learning..." },
    { target: 65, start: 75, dur: 20, label: "Practicing..." },
    { target: 85, start: 95, dur: 20, label: "Revising..." },
    { target: 100, start: 115, dur: 15, label: "Mastered! ⭐" },
  ];

  let memoryValue = 0;
  let memoryLabel = "Starting...";
  for (const stage of memoryStages) {
    if (frame >= stage.start) {
      const prev = memoryValue;
      memoryValue = Math.min(
        stage.target,
        Math.floor(
          progressFill(frame, stage.start, stage.dur, prev, stage.target),
        ),
      );
      memoryLabel = stage.label;
    }
  }

  const isMastered = memoryValue >= 100;

  // Star burst when mastered
  const starScale = isMastered
    ? interpolate(
        frame,
        [130, 142],
        [0, 1.2],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.pop },
      )
    : 0;
  const starOpacity = isMastered ? fadeIn(frame, 130, 8) : 0;

  // Notification cards
  const notifications = [
    { text: "🔔 Time to revise: React Hooks!", delay: 40 },
    { text: "🔔 Spaced review: JavaScript Closures", delay: 55 },
    { text: "🔔 Quick refresh: CSS Grid", delay: 70 },
  ];

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
              screenshotSrc="knowledge-retention.jpeg"
              startFrame={10}
              width={880}
              height={520}
              title="knowledge-retention"
            />

            {/* Notification overlays */}
            <div
              style={{
                position: "absolute",
                top: 60,
                right: -20,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {notifications.map((notif, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    background: "rgba(20,20,20,0.9)",
                    border: `1px solid rgba(229,57,53,0.2)`,
                    color: colors.textPrimary,
                    fontFamily: fontBody,
                    fontSize: 12,
                    boxShadow: shadows.card,
                    opacity: fadeIn(frame, notif.delay, 12),
                    transform: `translateX(${interpolate(
                      frame,
                      [notif.delay, notif.delay + 12],
                      [30, 0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
                    )}px)`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {notif.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Title + meter */}
        <div
          style={{
            flex: "0 0 400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <SceneTitle
            title="Knowledge Retention"
            subtitle="Smart spaced repetition — never forget what you learn"
            startFrame={0}
            icon={
              <FeatureIcon
                icon="memory"
                color={colors.pink}
                size={52}
                startFrame={0}
              />
            }
          />

          <div
            style={{ display: "flex", gap: 8, ...slideInFromBottom(frame, 25, 20) }}
          >
            <TagBadge text="🧠 Spaced Repetition" startFrame={30} color={colors.pink} />
            <TagBadge text="📈 Adaptive" startFrame={36} color={colors.cyan} />
          </div>

          {/* Memory Strength Meter */}
          <GlassCard startFrame={45} glow={isMastered}>
            <div
              style={{
                fontFamily: fontHeading,
                fontSize: 14,
                fontWeight: 600,
                color: colors.textSecondary,
                marginBottom: 12,
              }}
            >
              Memory Strength
            </div>

            {/* Meter bar */}
            <div
              style={{
                width: "100%",
                height: 16,
                borderRadius: 8,
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${memoryValue}%`,
                  height: "100%",
                  borderRadius: 8,
                  background: isMastered
                    ? `linear-gradient(90deg, ${colors.green}, ${colors.cyan}, ${colors.blue})`
                    : `linear-gradient(90deg, ${colors.pink}, ${colors.primary})`,
                  boxShadow: isMastered
                    ? `0 0 20px rgba(102,187,106,0.5)`
                    : `0 0 10px rgba(236,64,122,0.3)`,
                  transition: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontFamily: fontBody,
                  fontSize: 13,
                  color: isMastered ? colors.green : colors.textMuted,
                  fontWeight: isMastered ? 700 : 400,
                }}
              >
                {memoryLabel}
              </span>
              <span
                style={{
                  fontFamily: fontHeading,
                  fontSize: 18,
                  fontWeight: 700,
                  color: isMastered ? colors.green : colors.primary,
                }}
              >
                {memoryValue}%
              </span>
            </div>

            {/* Star burst */}
            {isMastered && (
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  fontSize: 40,
                  transform: `scale(${starScale})`,
                  opacity: starOpacity,
                  filter: `drop-shadow(0 0 10px rgba(255,238,88,0.6))`,
                }}
              >
                ⭐
              </div>
            )}
          </GlassCard>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
