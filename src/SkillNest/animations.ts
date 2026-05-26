// ── SkillNest Animation Utilities ──────────────────────────────────
// All motion is frame-driven via interpolate() — zero CSS animations.
import { interpolate, Easing } from "remotion";

// ── Easing Presets ────────────────────────────────────────────────
export const ease = {
  /** Crisp UI entrance (strong ease-out, no overshoot) */
  out: Easing.bezier(0.16, 1, 0.3, 1),
  /** Smooth ease-in for exits */
  in: Easing.bezier(0.55, 0, 1, 0.45),
  /** Balanced ease-in-out */
  inOut: Easing.bezier(0.45, 0, 0.55, 1),
  /** Playful overshoot pop */
  pop: Easing.bezier(0.34, 1.56, 0.64, 1),
  /** Soft decelerate */
  decel: Easing.bezier(0.0, 0.0, 0.2, 1),
  /** Snappy entrance */
  snappy: Easing.bezier(0.2, 0.8, 0.2, 1),
} as const;

// ── Common Options ────────────────────────────────────────────────
const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

// ── Opacity ───────────────────────────────────────────────────────

export const fadeIn = (
  frame: number,
  start: number,
  duration: number = 20,
) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...CLAMP,
    easing: ease.out,
  });

export const fadeOut = (
  frame: number,
  start: number,
  duration: number = 15,
) =>
  interpolate(frame, [start, start + duration], [1, 0], {
    ...CLAMP,
    easing: ease.in,
  });

export const fadeInOut = (
  frame: number,
  inStart: number,
  inDur: number,
  outStart: number,
  outDur: number,
) => {
  const fi = fadeIn(frame, inStart, inDur);
  const fo = fadeOut(frame, outStart, outDur);
  return Math.min(fi, fo);
};

// ── Slides ────────────────────────────────────────────────────────

export const slideInFromBottom = (
  frame: number,
  start: number,
  duration: number = 25,
  distance: number = 60,
) => ({
  opacity: fadeIn(frame, start, duration),
  transform: `translateY(${interpolate(
    frame,
    [start, start + duration],
    [distance, 0],
    { ...CLAMP, easing: ease.out },
  )}px)`,
});

export const slideInFromTop = (
  frame: number,
  start: number,
  duration: number = 25,
  distance: number = 60,
) => ({
  opacity: fadeIn(frame, start, duration),
  transform: `translateY(${interpolate(
    frame,
    [start, start + duration],
    [-distance, 0],
    { ...CLAMP, easing: ease.out },
  )}px)`,
});

export const slideInFromLeft = (
  frame: number,
  start: number,
  duration: number = 25,
  distance: number = 80,
) => ({
  opacity: fadeIn(frame, start, duration),
  transform: `translateX(${interpolate(
    frame,
    [start, start + duration],
    [-distance, 0],
    { ...CLAMP, easing: ease.out },
  )}px)`,
});

export const slideInFromRight = (
  frame: number,
  start: number,
  duration: number = 25,
  distance: number = 80,
) => ({
  opacity: fadeIn(frame, start, duration),
  transform: `translateX(${interpolate(
    frame,
    [start, start + duration],
    [distance, 0],
    { ...CLAMP, easing: ease.out },
  )}px)`,
});

// ── Scale ─────────────────────────────────────────────────────────

export const scaleIn = (
  frame: number,
  start: number,
  duration: number = 20,
  from: number = 0.7,
) => ({
  opacity: fadeIn(frame, start, duration),
  transform: `scale(${interpolate(
    frame,
    [start, start + duration],
    [from, 1],
    { ...CLAMP, easing: ease.pop },
  )})`,
});

export const scaleInSubtle = (
  frame: number,
  start: number,
  duration: number = 20,
) => ({
  opacity: fadeIn(frame, start, duration),
  transform: `scale(${interpolate(
    frame,
    [start, start + duration],
    [0.92, 1],
    { ...CLAMP, easing: ease.out },
  )})`,
});

// ── Zoom & Pan (Camera) ──────────────────────────────────────────

export const zoomIn = (
  frame: number,
  start: number,
  duration: number = 40,
  fromScale: number = 1,
  toScale: number = 1.15,
) =>
  interpolate(frame, [start, start + duration], [fromScale, toScale], {
    ...CLAMP,
    easing: ease.inOut,
  });

export const zoomOut = (
  frame: number,
  start: number,
  duration: number = 40,
  fromScale: number = 1.15,
  toScale: number = 1,
) =>
  interpolate(frame, [start, start + duration], [fromScale, toScale], {
    ...CLAMP,
    easing: ease.inOut,
  });

export const panX = (
  frame: number,
  start: number,
  duration: number = 60,
  from: number = 0,
  to: number = -30,
) =>
  interpolate(frame, [start, start + duration], [from, to], {
    ...CLAMP,
    easing: ease.inOut,
  });

export const panY = (
  frame: number,
  start: number,
  duration: number = 60,
  from: number = 0,
  to: number = -20,
) =>
  interpolate(frame, [start, start + duration], [from, to], {
    ...CLAMP,
    easing: ease.inOut,
  });

// ── 3D Rotations ─────────────────────────────────────────────────

export const rotate3D = (
  frame: number,
  start: number,
  duration: number = 60,
  fromDeg: number = -15,
  toDeg: number = 15,
  axis: "X" | "Y" | "Z" = "Y",
) => {
  const deg = interpolate(
    frame,
    [start, start + duration],
    [fromDeg, toDeg],
    { ...CLAMP, easing: ease.inOut },
  );
  return `rotate${axis}(${deg}deg)`;
};

export const floatingRotate = (
  frame: number,
  speed: number = 120,
  amplitude: number = 8,
  axis: "X" | "Y" | "Z" = "Y",
) => {
  const deg = interpolate(
    frame % speed,
    [0, speed / 2, speed],
    [-amplitude, amplitude, -amplitude],
    { ...CLAMP, easing: ease.inOut },
  );
  return `rotate${axis}(${deg}deg)`;
};

// ── Glow & Shine ─────────────────────────────────────────────────

export const glowPulse = (
  frame: number,
  speed: number = 60,
  min: number = 0.4,
  max: number = 1,
) =>
  interpolate(
    frame % speed,
    [0, speed / 2, speed],
    [min, max, min],
    CLAMP,
  );

export const shinePosition = (
  frame: number,
  start: number,
  duration: number = 40,
) =>
  interpolate(frame, [start, start + duration], [200, -200], {
    ...CLAMP,
    easing: ease.inOut,
  });

// ── Text ─────────────────────────────────────────────────────────

export const typewriterText = (
  frame: number,
  text: string,
  start: number = 0,
  charsPerFrame: number = 0.6,
) => {
  const elapsed = Math.max(0, frame - start);
  const charCount = Math.min(
    text.length,
    Math.floor(elapsed * charsPerFrame),
  );
  return text.slice(0, charCount);
};

export const typewriterCursorOpacity = (
  frame: number,
  blinkFrames: number = 16,
) =>
  interpolate(
    frame % blinkFrames,
    [0, blinkFrames / 2, blinkFrames],
    [1, 0, 1],
    CLAMP,
  );

// ── Path Drawing (SVG) ──────────────────────────────────────────

export const drawPath = (
  frame: number,
  start: number,
  duration: number,
  totalLength: number,
) => {
  const progress = interpolate(
    frame,
    [start, start + duration],
    [0, 1],
    { ...CLAMP, easing: ease.out },
  );
  return {
    strokeDasharray: totalLength,
    strokeDashoffset: totalLength * (1 - progress),
  };
};

// ── Progress / Fill ──────────────────────────────────────────────

export const progressFill = (
  frame: number,
  start: number,
  duration: number,
  from: number = 0,
  to: number = 100,
) =>
  interpolate(frame, [start, start + duration], [from, to], {
    ...CLAMP,
    easing: ease.out,
  });

// ── Floating / Bobbing ──────────────────────────────────────────

export const float = (
  frame: number,
  speed: number = 90,
  amplitude: number = 8,
) =>
  interpolate(
    frame % speed,
    [0, speed / 2, speed],
    [0, -amplitude, 0],
    { ...CLAMP, easing: ease.inOut },
  );

// ── Stagger helper ──────────────────────────────────────────────

export const staggerDelay = (
  index: number,
  baseDelay: number = 0,
  stagger: number = 6,
) => baseDelay + index * stagger;

// ── Compound transforms ─────────────────────────────────────────

export const screenEnter = (
  frame: number,
  start: number,
  duration: number = 30,
) => {
  const progress = interpolate(
    frame,
    [start, start + duration],
    [0, 1],
    { ...CLAMP, easing: ease.out },
  );
  return {
    opacity: progress,
    transform: `perspective(1200px) rotateY(${interpolate(progress, [0, 1], [-8, 0])}deg) rotateX(${interpolate(progress, [0, 1], [4, 0])}deg) scale(${interpolate(progress, [0, 1], [0.85, 1])})`,
  };
};

export const screenEnterFromRight = (
  frame: number,
  start: number,
  duration: number = 30,
) => {
  const progress = interpolate(
    frame,
    [start, start + duration],
    [0, 1],
    { ...CLAMP, easing: ease.out },
  );
  return {
    opacity: progress,
    transform: `perspective(1200px) translateX(${interpolate(progress, [0, 1], [100, 0])}px) rotateY(${interpolate(progress, [0, 1], [-12, 0])}deg) scale(${interpolate(progress, [0, 1], [0.9, 1])})`,
  };
};
