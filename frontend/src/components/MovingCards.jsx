"use client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "This platform has been a **lifesaver**! I can finally access advanced math lessons in my native Portuguese. The translations are accurate and the explanations are incredibly clear. My grades have improved dramatically.",
    name: "Sofia M.",
    title: "Student, Brazil",
  },
  {
    quote:
      "As an educator, I appreciate the **global reach** this service offers. Providing high-quality, translated science content ensures equity in learning for students who don't have English as a first language. Highly recommended!",
    name: "Dr. Kenji T.",
    title: "High School Physics Teacher, Japan",
  },
  {
    quote:
      "J'ai pu étudier l'histoire de l'art dans un français parfait. L'outil de traduction maintient le contexte culturel, ce qui est crucial. C'est la **meilleure ressource éducative** que j'ai trouvée.",
    name: "Elodie D.",
    title: "University Art Major, France",
  },
 
];