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
import { fontHeading, fontBody } from "../fonts";
import { colors, shadows } from "../theme";
import {
  ease,
  fadeIn,
  slideInFromBottom,
  glowPulse,
  float,
  typewriterText,
  typewriterCursorOpacity,
  shinePosition,
  staggerDelay,
  screenEnter,
} from "../animations";
import { FeatureIcon } from "../components/FeatureIcon";

const FEATURES = [
  { icon: "roadmap", label: "Roadmaps", color: colors.blue },
  { icon: "code", label: "Quizzes", color: colors.green },
  { icon: "brain", label: "AI Mentor", color: colors.purple },
  { icon: "memory", label: "Retention", color: colors.pink },
  { icon: "clock", label: "Flexible", color: colors.orange },
  { icon: "users", label: "Pods", color: colors.cyan },
  { icon: "globe", label: "Community", color: colors.teal },
  { icon: "trophy", label: "Challenges", color: colors.yellow },
];

export const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  // ── Upper section slides up once hero is ready ──
  const upperSlideUp = interpolate(
    frame,
    [88, 115],
    [0, -100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );

  // ── Logo entrance ──
  const logoScale = interpolate(
    frame,
    [10, 35],
    [0.3, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.pop },
  );
  const logoOpacity = fadeIn(frame, 10, 20);
  const logoFloat = float(frame, 120, 4);

  // Logo glow bloom
  const bloomScale = interpolate(
    frame,
    [15, 45],
    [0.5, 2.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );
  const bloomOpacity = interpolate(
    frame,
    [15, 45, 70],
    [0, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Logo shine sweep
  const shinePosLogo = shinePosition(frame, 30, 45);

  // ── Wordmark ──
  const brandText = "SkillNest";
  const typedBrand = typewriterText(frame, brandText, 40, 0.8);
  const cursorOpacity = typewriterCursorOpacity(frame, 16);
  const brandOpacity = fadeIn(frame, 38, 15);

  // ── Tagline ──
  const tagline = slideInFromBottom(frame, 60, 20, 25);

  // ── Feature icons ──
  const iconsOpacity = fadeIn(frame, 75, 15);
  const iconsScale = interpolate(
    frame,
    [75, 90],
    [0.6, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );

  // ── Hero screenshot entrance ──
  const heroEntrance = screenEnter(frame, 100, 35);
  const heroShine = shinePosition(frame, 115, 30);
  const heroGlow = interpolate(
    frame,
    [100, 130],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.out },
  );

  // ── Camera zoom ──
  const cameraZoom = interpolate(
    frame,
    [0, 50, 200, 240],
    [1.05, 1, 1, 0.97],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease.inOut },
  );

  return (
    <AbsoluteFill>
      <Background />

      <AbsoluteFill
        style={{
          transform: `scale(${cameraZoom})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* ═══ UPPER SECTION: Logo + Title + Tagline + Icons ═══ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateY(${upperSlideUp}px)`,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Logo glow bloom ring */}
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(229,57,53,0.4) 0%, transparent 70%)`,
              transform: `scale(${bloomScale})`,
              opacity: bloomOpacity,
              top: -35,
              left: "50%",
              marginLeft: -100,
              filter: "blur(20px)",
              pointerEvents: "none",
            }}
          />

          {/* Logo container — now uses skillnest-logo.png */}
          <div
            style={{
              position: "relative",
              width: 88,
              height: 88,
              borderRadius: 18,
              overflow: "hidden",
              opacity: logoOpacity,
              transform: `scale(${logoScale}) translateY(${logoFloat}px)`,
              boxShadow: `0 0 ${30 * glowPulse(frame, 90)}px rgba(229,57,53,${0.25 * glowPulse(frame, 90)})`,
            }}
          >
            <Img
              src={staticFile("skillnest-logo.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 18,
              }}
            />
            {/* Shine sweep */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(60deg, transparent 20%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.25) 55%, transparent 80%)`,
                backgroundSize: "200% 100%",
                backgroundPosition: `${shinePosLogo}% 0`,
                borderRadius: 18,
              }}
            />
          </div>

          {/* Brand name — typewriter */}
          <div
            style={{
              marginTop: 10,
              opacity: brandOpacity,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: fontHeading,
                fontSize: 44,
                fontWeight: 800,
                color: colors.textPrimary,
                letterSpacing: -1,
                textShadow: shadows.text,
              }}
            >
              {typedBrand}
            </span>
            <span
              style={{
                fontFamily: fontHeading,
                fontSize: 44,
                fontWeight: 200,
                color: colors.primary,
                opacity: frame > 38 ? cursorOpacity : 0,
                marginLeft: 2,
              }}
            >
              |
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: 4,
              ...tagline,
            }}
          >
            <span
              style={{
                fontFamily: fontBody,
                fontSize: 17,
                fontWeight: 400,
                color: colors.textSecondary,
                letterSpacing: 1.5,
              }}
            >
              AI-Powered Learning Assistant
            </span>
          </div>

          {/* Feature icons row */}
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 16,
              opacity: iconsOpacity,
              transform: `scale(${iconsScale})`,
            }}
          >
            {FEATURES.map((f, i) => (
              <FeatureIcon
                key={f.icon}
                icon={f.icon}
                color={f.color}
                size={65}
                startFrame={staggerDelay(i, 76, 3)}
                animate3D={true}
              />
            ))}
          </div>
        </div>

        {/* ═══ HERO SCREENSHOT — slides in below ═══ */}
        <div
          style={{
            marginTop: -50,
            width: "50%",
            maxWidth: 1500,
            position: "relative",
            zIndex: 1,
            ...heroEntrance,
          }}
        >
          {/* Browser chrome bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              background: "rgba(30, 30, 30, 0.95)",
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
              borderBottom: `1px solid rgba(255,255,255,0.06)`,
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
            </div>
            <div
              style={{
                flex: 1,
                marginLeft: 10,
                padding: "4px 12px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.06)",
                fontSize: 11,
                fontFamily: "monospace",
                color: colors.textMuted,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ color: colors.green, fontSize: 9 }}>🔒</span>
              <span>skillnest.app</span>
            </div>
          </div>

          {/* Screenshot */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 560,
              overflow: "hidden",
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
              background: "#111",
              boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 ${35 * heroGlow}px rgba(229,57,53,${0.18 * heroGlow}), 0 0 ${70 * heroGlow}px rgba(229,57,53,${0.08 * heroGlow})`,
            }}
          >
            <Img
              src={staticFile("hero.jpeg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                objectPosition: "top center",
              }}
            />
            {/* Shine sweep overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(60deg, transparent 30%, rgba(255,255,255,0.06) 48%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 52%, transparent 70%)`,
                backgroundSize: "200% 100%",
                backgroundPosition: `${heroShine}% 0`,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

