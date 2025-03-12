import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useId } from "react";

function StatusDot({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 8"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

export default function Filter({ setFilterValue }: { setFilterValue: (value: string) => void }) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Select onValueChange={(val) => {
        setFilterValue(val === "1" ? "" : val === "2" ? "active" : val === "3" ? "inactive" : "unpaid")
      }} defaultValue="1">
        <SelectTrigger
          id={id}
          className="[&>span]:flex [&>span]:items-center border-neutral-700 bg-neutral-950 h-10 text-white [&>span]:gap-2 [&>span_svg]:shrink-0"
        >
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span>svg]:text-zinc-500/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0 dark:[&_*[role=option]>span>svg]:text-zinc-400/80">
          <SelectItem value="1" >
            <span className="flex items-center gap-2">
              <StatusDot className="text-emerald-600" />
              <span className="truncate">All</span>
            </span>
          </SelectItem>
          <SelectItem value="2" >
            <span className="flex items-center gap-2">
              <StatusDot className="text-emerald-600" />
              <span className="truncate">Active</span>
            </span>
          </SelectItem>
          <SelectItem value="3" >
            <span className="flex items-center gap-2">
              <StatusDot className="text-blue-500" />
              <span className="truncate">Inactive</span>
            </span>
          </SelectItem>
          {/* <SelectItem value="3">
            <span className="flex items-center gap-2">
              <StatusDot className="text-amber-500" />
              <span className="truncate">Paid + Inactive</span>
            </span>
          </SelectItem> */}
          <SelectItem value="4" >
            <span className="flex items-center gap-2">
              <StatusDot className="text-gray-500" />
              <span className="truncate">Unpaid</span>
            </span>
          </SelectItem>
          {/* <SelectItem value="5">
            <span className="flex items-center gap-2">
              <StatusDot className="text-red-500" />
              <span className="truncate">Failed</span>
            </span>
          </SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
}
