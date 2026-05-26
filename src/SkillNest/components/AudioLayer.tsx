import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, staticFile, interpolate } from "remotion";

export const AudioLayer: React.FC = () => {
  // Background music volume callback for a smooth fade-in/fade-out
  const getBgVolume = (f: number) => {
    const totalFrames = 1815;
    const maxVolume = 0.07; // Soft ambient bedding
    const fadeFrames = 60; // 2 seconds fade

    if (f < fadeFrames) {
      return interpolate(f, [0, fadeFrames], [0, maxVolume], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    if (f > totalFrames - fadeFrames) {
      return interpolate(f, [totalFrames - fadeFrames, totalFrames], [maxVolume, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    return maxVolume;
  };

  // ── CUSTOM SFX SEQUENCE GENERATORS ──

  // 1. Accelerating Digital Charger (Scene 3: Quiz processing/count-up build)
  // Generates clicks that occur faster and rise in pitch/speed (exponential capacitor feel)
  const getAcceleratingTicks = () => {
    const startFrame = 515;
    const tickIntervals = [8, 7, 6, 5, 4, 3, 2, 2, 1, 1, 1]; // intervals between clicks in frames
    let currentFrame = startFrame;

    return tickIntervals.map((interval, index) => {
      const triggerFrame = currentFrame;
      currentFrame += interval;
      // Exponentially rise the speed (pitch) of each click
      const rate = 0.95 + index * 0.08;

      return (
        <Sequence key={`acc-tick-${index}`} from={triggerFrame} layout="none">
          <Audio
            src="https://remotion.media/mouse-click.wav"
            volume={() => 0.25}
            playbackRate={rate}
          />
        </Sequence>
      );
    });
  };

  // 2. Realistic Typewriter Keys Clatter for text reveals
  const getTypewriterTicks = () => {
    const tracks = [
      // Scene 1: "SkillNest" Brand name typewriter (frames 40 to 52)
      { start: 40, count: 9, speed: 0.8, volume: 0.22, pitchOffset: 1.1 },
      // Scene 4: Chat User Input "Explain React hooks..." (frames 705 to 749)
      { start: 705, count: 18, speed: 0.5, volume: 0.18, pitchOffset: 1.0 },
      // Scene 4: AI Reply bubble text sweep (frames 740 to 830, ticking every 3 frames)
      { start: 740, count: 28, speed: 0.35, volume: 0.15, pitchOffset: 0.9 }
    ];

    const elements: React.ReactElement[] = [];

    tracks.forEach((track, trackIndex) => {
      for (let i = 0; i < track.count; i++) {
        // Calculate exact frame character appears
        const frame = track.start + Math.floor(i / track.speed);
        // Slightly random pitch to simulate organic typing keys
        const randomPitch = track.pitchOffset + (Math.sin(i * 12.3) * 0.08);

        elements.push(
          <Sequence key={`type-${trackIndex}-${i}`} from={frame} layout="none">
            <Audio
              src="https://remotion.media/mouse-click.wav"
              volume={() => track.volume}
              playbackRate={randomPitch}
            />
          </Sequence>
        );
      }
    });

    return elements;
  };

  // 3. Staggered pitch scaling for quick UI pops (so rapid pops sound like musical instruments/xylophones)
  const getPitchStaggeredClicks = () => {
    const popGroups = [
      // Scene 1: 8 staggered feature icons (frames 76 to 97)
      { startFrames: [76, 79, 82, 85, 88, 91, 94, 97], basePitch: 0.9, step: 0.05, volume: 0.3 },
      // Scene 2: 3 Tag badges (frames 265, 271, 277)
      { startFrames: [265, 271, 277], basePitch: 1.0, step: 0.07, volume: 0.25 },
      // Scene 3: 2 Tag badges (frames 485, 491)
      { startFrames: [485, 491], basePitch: 1.05, step: 0.06, volume: 0.25 },
      // Scene 4: Tag badges & feature items (frames 710, 716, 722, 735, 743, 751)
      { startFrames: [710, 716, 722], basePitch: 0.95, step: 0.05, volume: 0.25 },
      { startFrames: [735, 743, 751], basePitch: 1.05, step: 0.04, volume: 0.25 },
      // Scene 5: Tag badges (frames 930, 936)
      { startFrames: [930, 936], basePitch: 1.0, step: 0.08, volume: 0.25 },
      // Scene 6: Tag badges (frames 1155, 1161, 1167)
      { startFrames: [1155, 1161, 1167], basePitch: 0.98, step: 0.05, volume: 0.25 },
      // Scene 7: Tag badges (frames 1380, 1386, 1455, 1461)
      { startFrames: [1380, 1386], basePitch: 1.0, step: 0.06, volume: 0.25 },
      { startFrames: [1455, 1461], basePitch: 1.08, step: 0.05, volume: 0.25 }
    ];

    const elements: React.ReactElement[] = [];

    popGroups.forEach((group, groupIdx) => {
      group.startFrames.forEach((frame, idx) => {
        const pitch = group.basePitch + idx * group.step;
        elements.push(
          <Sequence key={`stagger-${groupIdx}-${idx}`} from={frame} layout="none">
            <Audio
              src="https://remotion.media/mouse-click.wav"
              volume={() => group.volume}
              playbackRate={pitch}
            />
          </Sequence>
        );
      });
    });

    return elements;
  };

  // Standard scene transition whooshes (8s intervals)
  const transitionFrames = [225, 450, 675, 900, 1125, 1350, 1575];

  // Browser MockUI entrances
  const whipFrames = [240, 455, 685, 910, 1137, 1358, 1585];

  // UI elements appearing (cards, prompts, chat blocks)
  const switchFrames = [
    285,  // Scene 2: GlassCard stats
    515,  // Scene 3: "Test with AI" button
    522,  // Scene 3: "Run Code" button
    540,  // Scene 3: Assessment score GlassCard
    700,  // Scene 4: Chat overlay container
    740,  // Scene 4: AI response chat bubble
    945,  // Scene 5: Retention GlassCard
    1185, // Scene 6: GlassCard detail info
    1392, // Scene 7: Pods community GlassCard
    1610, // Scene 8: Gamified challenges GlassCard
  ];

  return (
    <>
      {/* Background Ambient Music Loop */}
      <Audio
        src={staticFile("bg-music.mp3")}
        volume={getBgVolume}
        loop
      />

      {/* Programmatic SFX Engines */}
      {getAcceleratingTicks()}
      {getTypewriterTicks()}
      {getPitchStaggeredClicks()}

      {/* ── HIGHLIGHT 1: Intro Logo Riser & Sub-Bass Drop ── */}
      {/* Slow 2-second tech riser build as logo scales up */}
      <Sequence from={10} layout="none">
        <Audio
          src="https://remotion.media/whoosh.wav"
          volume={() => 0.45}
          playbackRate={0.7} // Slowed down to stretch the riser duration
        />
      </Sequence>
      {/* Additional high-pitch riser accent layering in */}
      <Sequence from={45} layout="none">
        <Audio
          src="https://remotion.media/whip.wav"
          volume={() => 0.3}
          playbackRate={0.8}
        />
      </Sequence>
      {/* The Beat Drop / Heavy impact precisely at Browser entrance (frame 100) */}
      <Sequence from={100} layout="none">
        <Audio
          src="https://remotion.media/whip.wav"
          volume={() => 0.4}
        />
        <Audio
          src="https://remotion.media/vine-boom.wav"
          volume={() => 0.16} // Blended low-frequency drop
          playbackRate={1.05}
        />
      </Sequence>


      {/* ── HIGHLIGHT 2: Quiz Count-Up & Mastered Chime ── */}
      {/* Countup bar swell build starting at frame 540 */}
      <Sequence from={540} layout="none">
        <Audio
          src="https://remotion.media/whoosh.wav"
          volume={() => 0.4}
          playbackRate={1.25} // Snappy, rapid rise
        />
      </Sequence>
      {/* Rhythmic ding & bass slam drop at frame 575 when score hits 92% */}
      <Sequence from={575} layout="none">
        <Audio
          src="https://remotion.media/ding.wav"
          volume={() => 0.48}
        />
        <Audio
          src="https://remotion.media/vine-boom.wav"
          volume={() => 0.12} // Clean deep impact slam
          playbackRate={1.15}
        />
      </Sequence>


      {/* ── HIGHLIGHT 3: Retention Mastery Rise & Shimmer Slam ── */}
      {/* Futuristic sweep starting as gauge progresses (frame 945) */}
      <Sequence from={945} layout="none">
        <Audio
          src="https://remotion.media/whoosh.wav"
          volume={() => 0.45}
          playbackRate={0.8} // 2-second futuristic riser
        />
      </Sequence>
      {/* Level mastered gold star reveal (absolute frame 1015) */}
      <Sequence from={1015} layout="none">
        <Audio
          src="https://remotion.media/ding.wav"
          volume={() => 0.5}
          playbackRate={0.9} // Slightly deeper shimmer ring
        />
        <Audio
          src="https://remotion.media/vine-boom.wav"
          volume={() => 0.14} // Satisfying bass thump
          playbackRate={1.1}
        />
      </Sequence>


      {/* ── HIGHLIGHT 4: Outro Riser & Outro Impact Slam ── */}
      {/* Rhythmic building risers stacked together starting frame 1610 */}
      <Sequence from={1610} layout="none">
        <Audio
          src="https://remotion.media/whoosh.wav"
          volume={() => 0.4}
          playbackRate={0.65} // Stretched riser 1
        />
      </Sequence>
      <Sequence from={1640} layout="none">
        <Audio
          src="https://remotion.media/whoosh.wav"
          volume={() => 0.45}
          playbackRate={0.9} // Layered riser 2
        />
      </Sequence>
      <Sequence from={1670} layout="none">
        <Audio
          src="https://remotion.media/whip.wav"
          volume={() => 0.35}
          playbackRate={1.25} // Snappy climax riser
        />
      </Sequence>
      {/* The Grand Outro Climax precisely at frame 1690 */}
      <Sequence from={1690} layout="none">
        <Audio
          src="https://remotion.media/ding.wav"
          volume={() => 0.55} // Epic final ring
        />
        <Audio
          src="https://remotion.media/vine-boom.wav"
          volume={() => 0.2} // Maximum low sub impact slam
          playbackRate={0.9} // Deep resonance
        />
      </Sequence>


      {/* Standard Scene Transitions */}
      {transitionFrames.map((frame) => (
        <Sequence key={`trans-${frame}`} from={frame} layout="none">
          <Audio
            src="https://remotion.media/whoosh.wav"
            volume={() => 0.55}
          />
        </Sequence>
      ))}

      {/* Browser MockUI Entrances */}
      {whipFrames.map((frame) => (
        <Sequence key={`whip-${frame}`} from={frame} layout="none">
          <Audio
            src="https://remotion.media/whip.wav"
            volume={() => 0.4}
          />
        </Sequence>
      ))}

      {/* UI Elements Switch SFX */}
      {switchFrames.map((frame) => (
        <Sequence key={`switch-${frame}`} from={frame} layout="none">
          <Audio
            src="https://remotion.media/switch.wav"
            volume={() => 0.35}
          />
        </Sequence>
      ))}
    </>
  );
};
