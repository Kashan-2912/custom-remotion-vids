import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, staticFile, interpolate } from "remotion";

export const AudioLayer: React.FC = () => {
  // Background music volume callback for a smooth fade-in/fade-out
  const getBgVolume = (f: number) => {
    const totalFrames = 1815;
    const maxVolume = 0.08; // Subtle background ambience
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

  // Sound effect triggers based on exact frames in the timeline
  
  // 1. Scene transitions (soft sweeps)
  const transitionFrames = [225, 450, 675, 900, 1125, 1350, 1575];

  // 2. MockUI slide-in/entrances (quick, energetic whips)
  const whipFrames = [100, 240, 455, 685, 910, 1137, 1358, 1585];

  // 3. Tactile click sounds for smaller tags/icons popping up staggered
  const clickFrames = [
    // Scene 1: 8 staggered feature icons
    76, 79, 82, 85, 88, 91, 94, 97,
    // Scene 2: Tag badges
    265, 271, 277,
    // Scene 3: Tag badges
    485, 491,
    // Scene 4: Tag badges & feature check items
    710, 716, 722, 735, 743, 751,
    // Scene 5: Tag badges
    930, 936,
    // Scene 6: Staggered tag badges
    1155, 1161, 1167,
    // Scene 7: Tag badges
    1380, 1386, 1455, 1461,
    // Scene 8: Tag badge
    1617
  ];

  // 4. Clean interface switch sounds for cards, chats, or buttons appearing
  const switchFrames = [
    10,   // Scene 1: logo entrance scale
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

  // 5. High success/reveal chimes (dings)
  const dingFrames = [
    575,  // Scene 3: Quiz score reaches 92%
    1690, // Scene 8: Final Call-To-Action details slide in
  ];

  return (
    <>
      {/* Background Ambient Music Loop */}
      <Audio
        src={staticFile("bg-music.mp3")}
        volume={getBgVolume}
        loop
      />

      {/* Scene Transitions SFX */}
      {transitionFrames.map((frame) => (
        <Sequence key={`trans-${frame}`} from={frame} layout="none">
          <Audio
            src="https://remotion.media/whoosh.wav"
            volume={0.6}
          />
        </Sequence>
      ))}

      {/* Browser MockUI Entrance SFX */}
      {whipFrames.map((frame) => (
        <Sequence key={`whip-${frame}`} from={frame} layout="none">
          <Audio
            src="https://remotion.media/whip.wav"
            volume={0.45}
          />
        </Sequence>
      ))}

      {/* Staggered Click SFX */}
      {clickFrames.map((frame) => (
        <Sequence key={`click-${frame}`} from={frame} layout="none">
          <Audio
            src="https://remotion.media/mouse-click.wav"
            volume={0.3}
          />
        </Sequence>
      ))}

      {/* UI Interface Switch SFX */}
      {switchFrames.map((frame) => (
        <Sequence key={`switch-${frame}`} from={frame} layout="none">
          <Audio
            src="https://remotion.media/switch.wav"
            volume={0.4}
          />
        </Sequence>
      ))}

      {/* Chimes / Accents SFX */}
      {dingFrames.map((frame) => (
        <Sequence key={`ding-${frame}`} from={frame} layout="none">
          <Audio
            src="https://remotion.media/ding.wav"
            volume={0.5}
          />
        </Sequence>
      ))}
    </>
  );
};
