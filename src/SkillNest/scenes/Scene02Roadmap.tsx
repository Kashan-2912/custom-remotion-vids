import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
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
  slideInFromBottom,
  zoomIn,
  panX,
} from "../animations";



export const Scene02Roadmap: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  // Camera
  const zoom = zoomIn(frame, 0, 240, 1.02, 1);
  const pan = panX(frame, 0, 240, 5, -5);

  return (
    <AbsoluteFill>
      <Background />

      <AbsoluteFill
        style={{
          transform: `scale(${zoom}) translateX(${pan}px)`,
          padding: "60px 80px",
          display: "flex",
          flexDirection: "row",
          gap: 60,
        }}
      >
        {/* Left side: Title + tags */}
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
            title="AI-Powered Roadmaps"
            subtitle="Personalized learning paths that adapt to your pace"
            startFrame={0}
            icon={
              <FeatureIcon
                icon="roadmap"
                color={colors.blue}
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
              marginTop: 16,
              ...slideInFromBottom(frame, 35, 20, 20),
            }}
          >
            <TagBadge text="🤖 AI Generated" startFrame={40} color={colors.blue} />
            <TagBadge text="📊 Adaptive Pace" startFrame={46} color={colors.green} />
            <TagBadge text="🎯 Skill-Based" startFrame={52} color={colors.purple} />
          </div>

          {/* Stats card */}
          <GlassCard startFrame={60} glow>
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { label: "Topics", value: "24" },
                { label: "Completed", value: "18" },
                { label: "Hours", value: "46" },
              ].map((stat, i) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: fontHeading,
                      fontSize: 28,
                      fontWeight: 700,
                      color: colors.primary,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: fontBody,
                      fontSize: 13,
                      color: colors.textMuted,
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right side: Screenshot in browser frame */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MockUI
            videoSrc="roadmap.mp4"
            startFrame={15}
            width={920}
            height={496}
            title="roadmap"
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
