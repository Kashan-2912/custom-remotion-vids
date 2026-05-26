import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  staticFile,
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
  fadeOut,
  slideInFromBottom,
  zoomIn,
  glowPulse,
  typewriterText,
  shinePosition,
  staggerDelay,
} from "../animations";

const TECH_STACK = [
  { name: "React", color: "#61DAFB" },
  { name: "Node.js", color: "#68A063" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Docker", color: "#2496ED" },
  { name: "Redis", color: "#DC382D" },
];

const CHALLENGE_DESC =
  "Build a real-time collaborative code editor with live cursors, syntax highlighting, and WebSocket sync...";

export const Scene08Challenges: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  // Phase 1 (0-140): Challenge showcase
  // Phase 2 (140-240): Zoom out to logo finale + CTA
  const isOutro = frame >= 140;

  // Camera for phase 1
  const zoom1 = zoomIn(frame, 0, 130, 1, 1.05);
  // Camera for phase 2 (zoom out)
  const zoom2 = isOutro
    ? interpolate(frame, [140, 180], [1.05, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease.out,
    })
    : 1;

  const finalZoom = isOutro ? zoom2 : zoom1;

  // Phase 1 opacity (everything scales down)
  const phase1Opacity = isOutro
    ? fadeOut(frame, 140, 20)
    : 1;
  const phase1Scale = isOutro
    ? interpolate(frame, [140, 165], [1, 0.85], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease.in,
    })
    : 1;

  // Phase 2 entrance
  const outroOpacity = isOutro ? fadeIn(frame, 155, 20) : 0;
  const outroScale = isOutro
    ? interpolate(frame, [155, 180], [0.8, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease.pop,
    })
    : 0.8;

  // Challenge description typewriter
  const typedChallenge = typewriterText(frame, CHALLENGE_DESC, 45, 0.5);

  // Logo shine for outro
  const outroShine = shinePosition(frame, 175, 40);

  // Final glow pulse
  const finalGlow = isOutro ? glowPulse(frame, 40, 0.3, 1) : 0;

  return (
    <AbsoluteFill>
      <Background />

      <AbsoluteFill
        style={{
          transform: `scale(${finalZoom})`,
        }}
      >
        {/* ─── Phase 1: Challenge Content ─── */}
        <AbsoluteFill
          style={{
            padding: "60px 80px",
            display: "flex",
            flexDirection: "row",
            gap: 50,
            opacity: phase1Opacity,
            transform: `scale(${phase1Scale})`,
          }}
        >
          {/* Left: Title + challenge card */}
          <div
            style={{
              flex: "0 0 440px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 24,
            }}
          >
            <SceneTitle
              title="Real-World Challenges"
              subtitle="Complex, production-grade challenges for your roadmap"
              startFrame={0}
              icon={
                <FeatureIcon
                  icon="trophy"
                  color={colors.yellow}
                  size={52}
                  startFrame={0}
                />
              }
            />

            {/* Tech stack row */}
            <div
              style={{
                display: "flex",
                gap: 10,
                ...slideInFromBottom(frame, 25, 20),
              }}
            >
              {TECH_STACK.map((tech, i) => (
                <div
                  key={tech.name}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: `${tech.color}18`,
                    border: `1px solid ${tech.color}33`,
                    fontFamily: fontHeading,
                    fontSize: 12,
                    fontWeight: 600,
                    color: tech.color,
                    opacity: fadeIn(frame, staggerDelay(i, 28, 4), 10),
                    transform: `scale(${interpolate(
                      frame,
                      [staggerDelay(i, 28, 4), staggerDelay(i, 28, 4) + 10],
                      [0.7, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.pop },
                    )})`,
                  }}
                >
                  {tech.name}
                </div>
              ))}
            </div>

            {/* Challenge card */}
            <GlassCard startFrame={35} glow>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: fontHeading,
                      fontSize: 16,
                      fontWeight: 700,
                      color: colors.textPrimary,
                    }}
                  >
                    🏆 Collaborative Code Editor
                  </span>
                  <TagBadge
                    text="🔥 Hard"
                    startFrame={42}
                    color={colors.primary}
                    size="sm"
                  />
                </div>

                <p
                  style={{
                    fontFamily: fontBody,
                    fontSize: 13,
                    color: colors.textSecondary,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {typedChallenge}
                </p>

                {/* XP reward */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    opacity: fadeIn(frame, 70, 12),
                  }}
                >
                  <span style={{ fontSize: 14 }}>⚡</span>
                  <span
                    style={{
                      fontFamily: fontHeading,
                      fontSize: 13,
                      color: colors.yellow,
                      fontWeight: 600,
                    }}
                  >
                    +500 XP
                  </span>
                  <span
                    style={{
                      fontFamily: fontBody,
                      fontSize: 12,
                      color: colors.textMuted,
                    }}
                  >
                    · Estimated 4h
                  </span>
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
              screenshotSrc="challeneges.jpeg"
              startFrame={10}
              width={860}
              height={520}
              title="challenges"
            />
          </div>
        </AbsoluteFill>

        {/* ─── Phase 2: Outro / CTA ─── */}
        {isOutro && (
          <AbsoluteFill
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: outroOpacity,
              transform: `scale(${outroScale})`,
            }}
          >
            {/* Logo with glow */}
            <div
              style={{
                position: "relative",
                width: 100,
                height: 100,
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: `0 0 ${50 * finalGlow}px rgba(229,57,53,${0.4 * finalGlow}), 0 0 ${100 * finalGlow}px rgba(229,57,53,${0.2 * finalGlow})`,
              }}
            >
              <Img
                src={staticFile("skillnest-logo.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: 20,
                }}
              />
              {/* Shine */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(60deg, transparent 20%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 80%)`,
                  backgroundSize: "200% 100%",
                  backgroundPosition: `${outroShine}% 0`,
                  borderRadius: 20,
                }}
              />
            </div>

            {/* Brand name */}
            <div
              style={{
                fontFamily: fontHeading,
                fontSize: 56,
                fontWeight: 800,
                color: colors.textPrimary,
                marginTop: 20,
                letterSpacing: -1,
                textShadow: shadows.text,
                opacity: fadeIn(frame, 165, 15),
              }}
            >
              SkillNest
            </div>

            {/* CTA tagline */}
            <div
              style={{
                fontFamily: fontBody,
                fontSize: 22,
                color: colors.textSecondary,
                marginTop: 8,
                opacity: fadeIn(frame, 175, 15),
                transform: `translateY(${interpolate(
                  frame,
                  [175, 195],
                  [15, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
                )}px)`,
              }}
            >
              Start your learning journey today
            </div>

            {/* URL */}
            <div
              style={{
                fontFamily: fontBody,
                fontSize: 16,
                color: colors.primary,
                marginTop: 16,
                fontWeight: 600,
                letterSpacing: 1,
                opacity: fadeIn(frame, 190, 15),
                textShadow: `0 0 20px rgba(229,57,53,0.3)`,
              }}
            >
              skillnest-xi.vercel.app
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
