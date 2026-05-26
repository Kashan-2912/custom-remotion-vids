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
import { colors } from "../theme";
import {
  ease,
  fadeIn,
  slideInFromBottom,
  zoomIn,
  panX,
  staggerDelay,
} from "../animations";

const REASONS = [
  { emoji: "😴", label: "Tired", color: colors.blue },
  { emoji: "☕", label: "Need a break", color: colors.orange },
  { emoji: "🔥", label: "Burnout", color: colors.pink },
  { emoji: "🧘", label: "Taking it slow", color: colors.teal },
];

export const Scene06LearnLater: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const zoom = zoomIn(frame, 0, 240, 1, 1.04);
  const pan = panX(frame, 0, 240, -5, 5);

  // Topic card slide animation
  const cardSlideX = interpolate(
    frame,
    [75, 100],
    [0, 350],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );
  const cardOpacity = interpolate(
    frame,
    [75, 95],
    [1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Bookmark icon animation
  const bookmarkScale = interpolate(
    frame,
    [95, 110],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.pop },
  );

  // Calendar visualization
  const calendarOpacity = fadeIn(frame, 105, 20);

  return (
    <AbsoluteFill>
      <Background />

      <AbsoluteFill
        style={{
          transform: `scale(${zoom}) translateX(${pan}px)`,
          padding: "60px 80px",
          display: "flex",
          flexDirection: "row",
          gap: 50,
        }}
      >
        {/* Left: Title + reasons */}
        <div
          style={{
            flex: "0 0 420px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <SceneTitle
            title="Learn It Later"
            subtitle="Take breaks without losing progress"
            startFrame={0}
            icon={
              <FeatureIcon
                icon="pause"
                color={colors.orange}
                size={52}
                startFrame={0}
              />
            }
          />

          {/* Reason pills */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              ...slideInFromBottom(frame, 25, 20),
            }}
          >
            {REASONS.map((r, i) => (
              <TagBadge
                key={r.label}
                text={`${r.emoji} ${r.label}`}
                startFrame={staggerDelay(i, 30, 6)}
                color={r.color}
              />
            ))}
          </div>

          {/* Postpone result */}
          <GlassCard startFrame={60} glow>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Topic being postponed */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${colors.border}`,
                  transform: `translateX(${cardSlideX}px)`,
                  opacity: cardOpacity,
                }}
              >
                <span style={{ fontSize: 18 }}>📘</span>
                <div>
                  <div
                    style={{
                      fontFamily: fontHeading,
                      fontSize: 14,
                      fontWeight: 600,
                      color: colors.textPrimary,
                    }}
                  >
                    Advanced TypeScript Generics
                  </div>
                  <div
                    style={{
                      fontFamily: fontBody,
                      fontSize: 11,
                      color: colors.textMuted,
                    }}
                  >
                    Chapter 8 · ~45 min
                  </div>
                </div>
              </div>

              {/* Bookmark saved indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: fadeIn(frame, 95, 12),
                  transform: `scale(${bookmarkScale})`,
                }}
              >
                <span style={{ fontSize: 20 }}>🔖</span>
                <span
                  style={{
                    fontFamily: fontBody,
                    fontSize: 13,
                    color: colors.green,
                    fontWeight: 500,
                  }}
                >
                  Saved for later — we'll remind you!
                </span>
              </div>

              {/* Calendar mini */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  opacity: calendarOpacity,
                  marginTop: 4,
                }}
              >
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => {
                  const isScheduled = i === 2;
                  return (
                    <div
                      key={day}
                      style={{
                        flex: 1,
                        padding: "6px 0",
                        borderRadius: 8,
                        background: isScheduled
                          ? `${colors.primary}22`
                          : "rgba(255,255,255,0.04)",
                        border: isScheduled
                          ? `1px solid ${colors.primary}44`
                          : `1px solid ${colors.border}`,
                        textAlign: "center",
                        fontFamily: fontBody,
                        fontSize: 11,
                        color: isScheduled ? colors.primary : colors.textMuted,
                        fontWeight: isScheduled ? 600 : 400,
                      }}
                    >
                      {day}
                      {isScheduled && (
                        <div style={{ fontSize: 8, marginTop: 2 }}>📌</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right: Screenshot */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MockUI
            screenshotSrc="learn-it-later.jpeg"
            startFrame={12}
            width={900}
            height={540}
            title="learn-later"
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
