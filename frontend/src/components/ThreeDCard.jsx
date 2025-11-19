"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-green-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-white dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl overflow-hidden border">
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full h-full"
        >
          <video
            src="https://dynamic.heygen.ai/www/Home%20-%20Page%20-%20Rebrand/video_translator_avatar.mp4?updatedAt=1757984236000"
            className="w-full h-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
            autoPlay
            loop
            muted
            playsInline
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}