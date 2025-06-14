import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePicker() {
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="group bg-white border-zinc-200 w-full justify-between px-3 text-sm font-normal outline-offset-0 outline-none focus-visible:outline-[3px] dark:bg-zinc-950 dark:border-zinc-800"
        >
          <CalendarIcon
            size={16}
            className="text-zinc-500/80 -ms-1 shrink-0 transition-colors dark:text-zinc-400/80"
            aria-hidden="true"
          />
          <span className={cn("truncate", !date && "font-medium")}>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{""}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              "Date"
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <Calendar mode="range" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}
