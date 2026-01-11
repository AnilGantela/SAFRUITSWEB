import React from "react";
import Lottie from "lottie-react";

/**
 * Animation component
 * Props:
 * - animationData: JSON file imported from Lottie
 * - width: width of animation (px or %)
 * - height: height of animation (px or %)
 * - loop: boolean, default true
 * - autoplay: boolean, default true
 * - speed: number, default 1
 */
export default function Animation({
  animationData,
  width = 300,
  height = 300,
  loop = true,
  autoplay = true,
  speed = 1,
  style = {},
}) {
  return (
    <div style={{ width, height, ...style }}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
      />
    </div>
  );
}
