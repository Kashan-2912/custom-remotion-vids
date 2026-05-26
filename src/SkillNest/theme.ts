// ── SkillNest Brand Theme ──────────────────────────────────────────
// All color values, spacing, shadows, and reusable style objects.

export const colors = {
  // Brand
  primary: "#E53935", // vivid bright red
  primaryLight: "#FF5252",
  accent: "#8B1A1A", // deep red
  accentLight: "#B71C1C",

  // Backgrounds
  bg: "#0D0D0D",
  bgLight: "#1A1A1A",
  bgCard: "rgba(255, 255, 255, 0.04)",
  bgCardHover: "rgba(255, 255, 255, 0.08)",
  bgGlass: "rgba(255, 255, 255, 0.06)",

  // Text
  textPrimary: "#FAFAFA",
  textSecondary: "#B3B3B3",
  textMuted: "#666666",

  // System
  border: "rgba(255, 255, 255, 0.08)",
  borderGlow: "rgba(229, 57, 53, 0.4)",

  // Feature colors (for icons)
  blue: "#4FC3F7",
  green: "#66BB6A",
  purple: "#AB47BC",
  orange: "#FFA726",
  cyan: "#26C6DA",
  pink: "#EC407A",
  yellow: "#FFEE58",
  teal: "#26A69A",
} as const;

export const shadows = {
  glow: `0 0 20px rgba(229,57,53,0.3), 0 0 40px rgba(229,57,53,0.15)`,
  glowStrong: `0 0 30px rgba(229,57,53,0.5), 0 0 60px rgba(229,57,53,0.25), 0 0 100px rgba(229,57,53,0.1)`,
  glowSubtle: `0 0 10px rgba(229,57,53,0.2), 0 0 20px rgba(229,57,53,0.1)`,
  card: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)`,
  cardGlow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(229,57,53,0.2), 0 0 20px rgba(229,57,53,0.15)`,
  neon: `0 0 0 1px rgba(229,57,53,0.4), 0 0 22px rgba(229,57,53,0.32)`,
  text: `0 0 40px rgba(229,57,53,0.3)`,
  elevate: `0 8px 32px rgba(0,0,0,0.6)`,
} as const;

export const glassCard: React.CSSProperties = {
  background: colors.bgGlass,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
};

export const glassCardGlow: React.CSSProperties = {
  ...glassCard,
  border: `1px solid rgba(229,57,53,0.2)`,
  boxShadow: shadows.cardGlow,
};

export const gradients = {
  redRadial: `radial-gradient(circle at 50% 50%, rgba(229,57,53,0.15) 0%, transparent 70%)`,
  redLinear: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
  redToTransparent: `linear-gradient(180deg, rgba(229,57,53,0.08) 0%, transparent 100%)`,
  darkVignette: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)`,
  shine: `linear-gradient(60deg, transparent 20%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 60%, transparent 80%)`,
} as const;
