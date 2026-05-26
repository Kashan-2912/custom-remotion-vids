import React from "react";
import { AbsoluteFill } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { Scene01Intro } from "./scenes/Scene01Intro";
import { Scene02Roadmap } from "./scenes/Scene02Roadmap";
import { Scene03Quiz } from "./scenes/Scene03Quiz";
import { Scene04Mentor } from "./scenes/Scene04Mentor";
import { Scene05Retention } from "./scenes/Scene05Retention";
import { Scene06LearnLater } from "./scenes/Scene06LearnLater";
import { Scene07PodsCommunity } from "./scenes/Scene07PodsCommunity";
import { Scene08Challenges } from "./scenes/Scene08Challenges";
import { AudioLayer } from "./components/AudioLayer";

const SCENE_DURATION = 240; // 8 seconds at 30fps
const TRANSITION_DURATION = 15; // 0.5 second overlap

// Alternate between fade and slide transitions for variety
const transitions = [
  { presentation: fade(), timing: linearTiming({ durationInFrames: TRANSITION_DURATION }) },
  { presentation: slide({ direction: "from-right" }), timing: linearTiming({ durationInFrames: TRANSITION_DURATION }) },
  { presentation: fade(), timing: linearTiming({ durationInFrames: TRANSITION_DURATION }) },
  { presentation: slide({ direction: "from-bottom" }), timing: linearTiming({ durationInFrames: TRANSITION_DURATION }) },
  { presentation: fade(), timing: linearTiming({ durationInFrames: TRANSITION_DURATION }) },
  { presentation: slide({ direction: "from-left" }), timing: linearTiming({ durationInFrames: TRANSITION_DURATION }) },
  { presentation: fade(), timing: linearTiming({ durationInFrames: TRANSITION_DURATION }) },
];

const scenes = [
  Scene01Intro,
  Scene02Roadmap,
  Scene03Quiz,
  Scene04Mentor,
  Scene05Retention,
  Scene06LearnLater,
  Scene07PodsCommunity,
  Scene08Challenges,
];

/**
 * Main SkillNest Explainer Video composition.
 * 8 scenes × 150 frames, with 7 transitions × 15 frames overlap.
 * Total: (8 × 150) - (7 × 15) = 1095 frames ≈ 36.5 seconds
 */
export const SkillNestVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0D0D0D" }}>
      <AudioLayer />
      <TransitionSeries>
        {scenes.map((SceneComponent, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
              <SceneComponent />
            </TransitionSeries.Sequence>
            {i < scenes.length - 1 && (
              <TransitionSeries.Transition
                presentation={transitions[i].presentation}
                timing={transitions[i].timing}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
