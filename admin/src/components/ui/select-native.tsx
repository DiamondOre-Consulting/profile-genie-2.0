import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

const SelectNative = ({ className, children, ...props }: React.ComponentProps<"select">) => {
  return (
    <div className="relative flex">
      <select
        data-slot="select-native"
        className={cn(
          " aria-invalid:ring-red-500/40  inline-flex w-full cursor-pointer appearance-none items-center rounded-md border text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 border-zinc-800 text-zinc-50 bg-[#171717] focus-visible:border-zinc-300 focus-visible:ring-zinc-300/50 has-[option[disabled]:checked]:text-zinc-400  aria-invalid:border-red-900",
          props.multiple ? " py-1 *:px-3 *:py-1 [&_option:checked]:bg-zinc-800" : "h-9 ps-3 pe-8",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {!props.multiple && (
        <span className=" pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center peer-disabled:opacity-50 text-zinc-400/80 peer-aria-invalid:text-red-900/80">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      )}
    </div>
  );
};

export { SelectNative };
