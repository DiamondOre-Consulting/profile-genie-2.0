import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const SelectNative = ({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) => {
  return (
    <div className="relative flex">
      <select
        data-slot="select-native"
        className={cn(
          "peer border-input text-foreground  has-[option[disabled]:checked]:text-muted-foreground  aria-invalid:border-destructive inline-flex w-full cursor-pointer appearance-none items-center rounded border text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50",
          props.multiple
            ? "[&_option:checked]:bg-accent py-1 *:px-3 *:py-1"
            : "h-9 ps-3 pe-8",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {!props.multiple && (
        <span className="absolute inset-y-0 flex items-center justify-center h-full pointer-events-none text-muted-foreground/80 peer-aria-invalid:text-destructive/80 end-0 w-9 peer-disabled:opacity-50">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      )}
    </div>
  );
};

export { SelectNative };
