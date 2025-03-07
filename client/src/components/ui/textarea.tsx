import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-zinc-700 text-white placeholder:text-zinc-500/70  aria-invalid:ring-red-500/20 aria-invalid:border-red-500 flex min-h-19.5 w-full rounded-md border bg-neutral-900 p-1 text-sm shadow-xs transition-[color,box-shadow] outline-none  disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
Textarea.displayName = "Textarea";

export { Textarea };
