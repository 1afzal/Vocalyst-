import React from "react";
import { EncryptedText } from "./ui/encrypted-text";
import { PointerHighlight } from "./ui/pointer-highlight";
import { PointerHighlightDemo } from "./PointerHighlight";
import { ThreeDCardDemo } from "./ThreeDCard";
import { ContainerScroll } from "./ui/container-scroll-animation";
import vocalystDemo from "../assets/vocalyst-demo.png";
import { useNavigate } from "react-router-dom";
import NavigationMenu from "./ui/navigation-menu";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import InfiniteMovingCardsDemo from "./MovingCards";
import ChatApp from "./ChatBot";
import { WobbleCardDemo } from "./WobbleCardDemo";
import { CardStack } from "./ui/card-stack";
import { CardStackDemo } from "./CardStackDemo";

function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="w-full min-h-[60vh]  flex items-center justify-center py-5 mt-20">
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-10 md:gap-24">
          {/* Left content */}
          <div className="flex flex-col gap-8 max-w-xl flex-1">
            <PointerHighlightDemo />
            <div className="flex gap-5">
            <button
              onClick={() => {
                navigate("/vocalyst");
              }}
              className="mt-2 w-fit rounded-full items-center justify-center text-white bg-black border border-black text-lg md:text-xl font-bold px-7 py-3 transition hover:bg-gray-900 hover:scale-105 shadow-lg"
            >
              Try Vocalyst
            </button>
            <button
              onClick={() => {
                navigate("/chat");
              }}
              className="mt-2 w-fit rounded-full items-center justify-center text-black bg-white border border-black text-lg md:text-xl font-bold px-7 py-3 transition hover:bg-white hover:scale-105 shadow-lg"
            >
              Resolve doubts
            </button>
            </div>
          </div>
          {/* Right content */}
          <div className=" max-w-lg text-black text-lg md:text-xl font-medium leading-relaxed text-left mt-0">
            <ThreeDCardDemo />
          </div>
        </div>
      </section>
      <ContainerScroll
        titleComponent={
          <h1 className="text-8xl font-bold m-5">Break language barrier.</h1>
        }
      >
        <img
          src={vocalystDemo}
          alt="Product demo"
          className="w-full h-full rounded-lg"
        />
      </ContainerScroll>

      <div className="flex flex-col md:flex-row justify-between items-center gap-12 px-6 md:px-16 py-12 ">
  {/* Text Section */}
  <div className="md:w-1/2 space-y-6 ">
    <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
  AI-driven learning solution, compatible with over 29 languages, integrated note generation and immediate doubt solving.
    </h1>

    <div className="space-y-4 text-gray-700 leading-relaxed">
      <p>
        <span className="font-semibold"> Support 29+ languages:</span> Upload your ePub or PDF, pick your characters, direct
        the delivery, and publish high-quality multi-voice audiobooks.
      </p>
      <p>
        <span className="font-semibold">Notes generation:</span> Select the ideal voice or clone your own. Generate ads,
        shorts, or films with our AI voice generator.
      </p>
      <p>
        <span className="font-semibold">AI chatbot</span> Translate into 30+ languages while preserving the speaker’s voice.
        Dub with one click or use the Dubbing Studio for full control.
      </p>
    </div>
  </div>

  {/* Card Stack Section */}
  <div className="md:w-1/2 flex justify-center">
    <CardStackDemo />
  </div>
</div>

    </div>
  );
}

export default Landing;
