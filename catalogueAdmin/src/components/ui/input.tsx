import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded border border-zinc-300 bg-neutral-100 px-3 py-2 text-sm text-black shadow-sm shadow-black/5 transition-shadow outline-none placeholder:text-zinc-500/70  disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" &&
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
          "p-0 pr-3 italic text-zinc-500/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-zinc-200 file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-zinc-950",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
