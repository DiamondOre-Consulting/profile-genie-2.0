import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex h-[8rem] w-full rounded border border-zinc-800 bg-neutral-900 px-3 py-2 text-sm text-zinc-950 shadow-sm shadow-black/5 transition-shadow outline-none placeholder:text-zinc-500/70  disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
Textarea.displayName = "Textarea";

export { Textarea };
