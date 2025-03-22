"use client";

import { Label } from "@/components/ui/label";
import { Tag, TagInput } from "emblor";
import { useId, useState } from "react";

const tags = [
  {
    id: "1",
    text: "Sport",
  },
  {
    id: "2",
    text: "Coding",
  },
  {
    id: "3",
    text: "Travel",
  },
];

export default function Component() {
  const id = useId();
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Input with tags</Label>
      <TagInput
        id={id}
        tags={exampleTags}
        setTags={(newTags) => {
          setExampleTags(newTags);
        }}
        placeholder="Add a tag"
        styleClasses={{
          tagList: {
            container: "gap-1",
          },
          input:
            "rounded-md transition-[color,box-shadow] placeholder:text-zinc-500/70 focus-visible:border-zinc-950 outline-none focus-visible:ring-[3px] focus-visible:ring-zinc-950/50 dark:placeholder:text-zinc-400/70 dark:focus-visible:border-zinc-300 dark:focus-visible:ring-zinc-300/50",
          tag: {
            body: "relative h-7 bg-white border border-zinc-200 hover:bg-white rounded-md font-medium text-xs ps-2 pe-7 dark:bg-zinc-950 dark:border-zinc-800 dark:hover:bg-zinc-950",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-zinc-950 focus-visible:ring-zinc-950/50 focus-visible:ring-[3px] text-zinc-500/80 hover:text-zinc-950 dark:focus-visible:border-zinc-300 dark:focus-visible:ring-zinc-300/50 dark:text-zinc-400/80 dark:hover:text-zinc-50",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="top"
      />
      <p className="text-zinc-500 mt-2 text-xs dark:text-zinc-400" role="region" aria-live="polite">
        Built with{""}
        <a
          className="hover:text-zinc-950 underline dark:hover:text-zinc-50"
          href="https://github.com/JaleelB/emblor"
          target="_blank"
          rel="noopener nofollow"
        >
          emblor
        </a>
      </p>
    </div>
  );
}
