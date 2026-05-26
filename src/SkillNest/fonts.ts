import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadFiraCode } from "@remotion/google-fonts/FiraCode";

const { fontFamily: fontHeading } = loadPoppins("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const { fontFamily: fontBody } = loadInter("normal", {
  weights: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const { fontFamily: fontMono } = loadFiraCode("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

export { fontHeading, fontBody, fontMono };
