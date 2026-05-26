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
  float,
  staggerDelay,
} from "../animations";

// Avatar colors for pod members
const AVATARS = [
  { initials: "AK", color: colors.blue },
  { initials: "SJ", color: colors.green },
  { initials: "MR", color: colors.purple },
  { initials: "LP", color: colors.pink },
  { initials: "DW", color: colors.orange },
];

const FEATURES_LIST = [
  { emoji: "💬", label: "Group Chat" },
  { emoji: "📁", label: "File Sharing" },
  { emoji: "🎥", label: "Video Calls" },
  { emoji: "🎙️", label: "Voice Chat" },
  { emoji: "📱", label: "Mobile & Web" },
];

export const Scene07PodsCommunity: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  // Camera: start zoomed in on pods, zoom out to community
  const zoom = interpolate(
    frame,
    [0, 60, 180, 240],
    [1.06, 1, 1, 0.96],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.inOut },
  );

  // Avatar clustering animation
  const clusterProgress = interpolate(
    frame,
    [15, 45],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );

  // Community expansion (pods merge outward)
  const communityExpand = interpolate(
    frame,
    [80, 110],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
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
        {/* Left: Screenshots stacked */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Pods screenshot */}
          <div style={{ position: "relative" }}>
            <MockUI
              screenshotSrc="pods.jpeg"
              startFrame={8}
              width={500}
              height={340}
              title="learning-pods"
              style={{ position: "relative", zIndex: 2 }}
            />

            {/* Community screenshot behind/overlapping */}
            <div
              style={{
                position: "absolute",
                top: 120,
                left: 280,
                opacity: fadeIn(frame, 60, 25),
                transform: `scale(${interpolate(
                  frame,
                  [60, 85],
                  [0.85, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
                )})`,
                zIndex: 3,
              }}
            >
              <MockUI
                screenshotSrc="community.jpeg"
                startFrame={65}
                width={480}
                height={320}
                title="community"
              />
            </div>
          </div>

          {/* Floating avatar bubbles around screenshots */}
          {AVATARS.map((avatar, i) => {
            const angle = (i / AVATARS.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 40 + clusterProgress * 60;
            const cx = 380 + Math.cos(angle) * radius * (1 + communityExpand * 1.5);
            const cy = 200 + Math.sin(angle) * radius * (1 + communityExpand * 1.2);
            const avatarFloat = float(frame + i * 20, 100 + i * 10, 4);

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: cx,
                  top: cy + avatarFloat,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${avatar.color}88, ${avatar.color}44)`,
                  border: `2px solid ${avatar.color}66`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fontHeading,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#fff",
                  opacity: fadeIn(frame, staggerDelay(i, 15, 5), 12),
                  transform: `scale(${interpolate(
                    frame,
                    [staggerDelay(i, 15, 5), staggerDelay(i, 15, 5) + 12],
                    [0.3, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.pop },
                  )})`,
                  boxShadow: `0 0 10px ${avatar.color}33`,
                  zIndex: 10,
                }}
              >
                {avatar.initials}
              </div>
            );
          })}
        </div>

        {/* Right: Title + features */}
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
            title="Pods & Community"
            subtitle="Learn together, grow together"
            startFrame={0}
            icon={
              <FeatureIcon
                icon="users"
                color={colors.cyan}
                size={52}
                startFrame={0}
              />
            }
          />

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              ...slideInFromBottom(frame, 25, 20),
            }}
          >
            <TagBadge text="👥 Small Groups" startFrame={30} color={colors.cyan} />
            <TagBadge text="🌐 Full Community" startFrame={36} color={colors.teal} />
          </div>

          {/* Feature list */}
          <GlassCard startFrame={42}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FEATURES_LIST.map((feat, i) => (
                <div
                  key={feat.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 10px",
                    borderRadius: 8,
                    background:
                      i === 0 ? "rgba(255,255,255,0.04)" : "transparent",
                    opacity: fadeIn(frame, staggerDelay(i, 45, 7), 12),
                    transform: `translateX(${interpolate(
                      frame,
                      [staggerDelay(i, 45, 7), staggerDelay(i, 45, 7) + 12],
                      [-20, 0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
                    )}px)`,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{feat.emoji}</span>
                  <span
                    style={{
                      fontFamily: fontBody,
                      fontSize: 14,
                      color: colors.textSecondary,
                    }}
                  >
                    {feat.label}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Community badge */}
          <div
            style={{
              display: "flex",
              gap: 8,
              ...slideInFromBottom(frame, 100, 15),
            }}
          >
            <TagBadge text="🖥️ Web Community" startFrame={105} color={colors.blue} />
            <TagBadge text="📱 Mobile App" startFrame={111} color={colors.green} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
