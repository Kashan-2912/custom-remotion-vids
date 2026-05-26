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
  slideInFromRight,
  typewriterText,
  zoomIn,
  panY,
  staggerDelay,
} from "../animations";

const USER_MSG = "Explain React hooks with examples";
const AI_RESPONSE =
  "React Hooks let you use state and lifecycle features in functional components. The most common hooks are useState and useEffect...";

export const Scene04Mentor: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  // Camera
  const zoom = zoomIn(frame, 0, 240, 1, 1.04);
  const pan = panY(frame, 40, 110, 5, -5);

  // User message typewriter
  const typedUser = typewriterText(frame, USER_MSG, 30, 0.7);
  const typedAI = typewriterText(frame, AI_RESPONSE, 65, 0.6);

  // Typing indicator dots
  const dot1 = interpolate(frame % 20, [0, 10, 20], [0.3, 1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dot2 = interpolate((frame + 7) % 20, [0, 10, 20], [0.3, 1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dot3 = interpolate((frame + 14) % 20, [0, 10, 20], [0.3, 1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showTypingIndicator = frame >= 55 && frame < 65;

  return (
    <AbsoluteFill>
      <Background />

      <AbsoluteFill
        style={{
          transform: `scale(${zoom}) translateY(${pan}px)`,
          padding: "60px 80px",
          display: "flex",
          flexDirection: "row",
          gap: 50,
        }}
      >
        {/* Left: Title + info */}
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
            title="AI Mentor"
            subtitle="Your personal AI tutor, context-aware and platform-specific"
            startFrame={0}
            icon={
              <FeatureIcon
                icon="brain"
                color={colors.purple}
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
              ...slideInFromBottom(frame, 30, 20),
            }}
          >
            <TagBadge text="🧠 RAG Powered" startFrame={35} color={colors.purple} />
            <TagBadge text="🎯 Context Aware" startFrame={41} color={colors.cyan} />
            <TagBadge text="🔒 Platform Only" startFrame={47} color={colors.orange} />
          </div>

          {/* Feature highlights */}
          <GlassCard startFrame={55} style={{ marginTop: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { emoji: "💡", text: "Understands your learning context" },
                { emoji: "📚", text: "Limited to platform knowledge" },
                { emoji: "⚡", text: "Instant, accurate responses" },
              ].map((item, i) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    opacity: fadeIn(frame, staggerDelay(i, 60, 8), 15),
                    transform: `translateX(${interpolate(
                      frame,
                      [staggerDelay(i, 60, 8), staggerDelay(i, 60, 8) + 15],
                      [-15, 0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
                    )}px)`,
                  }}
                >
                  <span style={{ fontSize: 18 }}>{item.emoji}</span>
                  <span
                    style={{
                      fontFamily: fontBody,
                      fontSize: 14,
                      color: colors.textSecondary,
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right: Screenshot + Chat overlay */}
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
              screenshotSrc="ai-mentor.jpeg"
              startFrame={10}
              width={900}
              height={540}
              title="ai-mentor"
            />

            {/* Chat overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                right: 24,
                width: 340,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                ...slideInFromRight(frame, 25, 25, 40),
              }}
            >
              {/* User message bubble */}
              <div
                style={{
                  alignSelf: "flex-end",
                  maxWidth: 280,
                  padding: "10px 16px",
                  borderRadius: "16px 16px 4px 16px",
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  color: "#fff",
                  fontFamily: fontBody,
                  fontSize: 13,
                  lineHeight: 1.5,
                  opacity: fadeIn(frame, 28, 12),
                }}
              >
                {typedUser}
              </div>

              {/* Typing indicator */}
              {showTypingIndicator && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    padding: "10px 16px",
                    borderRadius: "16px 16px 16px 4px",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    gap: 4,
                  }}
                >
                  {[dot1, dot2, dot3].map((d, i) => (
                    <div
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: colors.purple,
                        opacity: d,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* AI response bubble */}
              {frame >= 65 && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    maxWidth: 300,
                    padding: "10px 16px",
                    borderRadius: "16px 16px 16px 4px",
                    background: "rgba(255,255,255,0.08)",
                    border: `1px solid rgba(171,71,188,0.2)`,
                    color: colors.textPrimary,
                    fontFamily: fontBody,
                    fontSize: 13,
                    lineHeight: 1.5,
                    opacity: fadeIn(frame, 65, 12),
                    boxShadow: `0 0 15px rgba(171,71,188,0.1)`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 12 }}>🤖</span>
                    <span
                      style={{
                        fontSize: 11,
                        color: colors.purple,
                        fontWeight: 600,
                        fontFamily: fontHeading,
                      }}
                    >
                      SkillNest AI
                    </span>
                  </div>
                  {typedAI}
                </div>
              )}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
