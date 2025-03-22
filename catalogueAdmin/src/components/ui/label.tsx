"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-[0.8rem]  tracking-wide leading-4 text-zinc-850 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ",
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = "Label";

export { Label };
