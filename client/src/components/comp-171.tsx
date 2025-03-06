"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RiStarFill } from "@remixicon/react";
import { useId, useState } from "react";

export default function Component() {
  const id = useId();
  const [hoverRating, setHoverRating] = useState("");
  const [currentRating, setCurrentRating] = useState("");

  return (
    <fieldset className="space-y-4">
      <legend className="text-zinc-950 text-sm leading-none font-medium dark:text-zinc-50">
        Rate your experience
      </legend>
      <RadioGroup className="inline-flex gap-0" onValueChange={setCurrentRating}>
        {["1", "2", "3", "4", "5"].map((value) => (
          <label
            key={value}
            className="group focus-within:border-zinc-950 focus-within:ring-zinc-950/50 relative cursor-pointer rounded p-0.5 outline-none focus-within:ring-[3px] dark:focus-within:border-zinc-300 dark:focus-within:ring-zinc-300/50"
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating("")}
          >
            <RadioGroupItem id={`${id}-${value}`} value={value} className="sr-only" />
            <RiStarFill
              size={24}
              className={`transition-all ${
                (hoverRating || currentRating) >= value ? "text-amber-500" : "text-zinc-200 dark:text-zinc-800"
              } group-hover:scale-110`}
            />
            <span className="sr-only">
              {value} star{value === "1" ? "" : "s"}
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
