import { PointerHighlight } from "@/components/ui/pointer-highlight";

export function PointerHighlightDemo() {
  return (
    <div
      className=" text-xl font-bold tracking-tight md:text-7xl">The Best AI Multilingual
            <PointerHighlight
        rectangleClassName="bg-amber-400 dark:bg-yellow-400 dark:border-neutral-600"
        pointerClassName="text-yellow-500">
        <span className="relative z-10">Educational Platform.</span>
      </PointerHighlight>
    </div>
  );
}
