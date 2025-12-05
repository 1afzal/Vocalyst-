"use client";
import { CardStack } from "./ui/card-stack";
import { cn } from "@/lib/utils";
export function CardStackDemo() {
  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack  items={CARDS} />
    </div>
  );
}

export const Highlight = ({
  children,
  className
}) => {
  return (
    <span
      className={cn(
        "font-bold text-black bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}>
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Afzal Ali Ahmed",
    designation: "Fullstack developer",
    content: (
      <p>
        The automatic dubbing is <Highlight>revolutionary! </Highlight> Being able to understand lectures in my regional language(Hindi) immediately breaks down the biggest learning barrier
      </p>
    ),
  },
  {
    id: 1,
    name: "Amratha D Kamath",
    designation: "Senior Research engineer",
    content: (
      <p>
        
        <Highlight>Fantastic first version!</Highlight> I hope they add more regional dialects and the live lecture feature.
      </p>
    ),
  },
  {
    id: 2,
    name: "Diya V shetty",
    designation: "Xtransmatrix CEO",
    content: (
      <p>
        
        <Highlight>Dubbing sounds natural</Highlight> 
        Better synchronization would make it perfect.
      </p>
    ),
  },
  {
    id: 3,
    name: "Bhoomika",
    designation: "Xtransmatrix ",
    content: (
      <p>
        
        <Highlight>Excellent work, easier accessibitlity of content in regional languages.</Highlight> 
      </p>
    ),
  },
];
