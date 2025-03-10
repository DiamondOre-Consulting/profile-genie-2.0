"use client";

import { cn } from "@/lib/utils";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { ComponentProps } from "react";
import {
  Button,
  CalendarCell as CalendarCellRac,
  CalendarGridBody as CalendarGridBodyRac,
  CalendarGridHeader as CalendarGridHeaderRac,
  CalendarGrid as CalendarGridRac,
  CalendarHeaderCell as CalendarHeaderCellRac,
  Calendar as CalendarRac,
  Heading as HeadingRac,
  RangeCalendar as RangeCalendarRac,
  composeRenderProps,
} from "react-aria-components";

interface BaseCalendarProps {
  className?: string;
}

type CalendarProps = ComponentProps<typeof CalendarRac> & BaseCalendarProps;
type RangeCalendarProps = ComponentProps<typeof RangeCalendarRac> & BaseCalendarProps;

function CalendarHeader() {
  return (
    <header className="flex w-full items-center gap-1 pb-1">
      <Button
        slot="previous"
        className=" flex size-9 items-center bg-zinc-950 justify-center rounded-md transition-[color,box-shadow] outline-none focus-visible:ring-[3px] text-zinc-400/80 hover:bg-zinc-800 hover:text-zinc-50 focus-visible:ring-zinc-300/50"
      >
        <ChevronLeftIcon size={16} />
      </Button>
      <HeadingRac className="grow text-center text-sm font-medium" />
      <Button
        slot="next"
        className=" flex size-9 items-center bg-zinc-950 justify-center rounded-md transition-[color,box-shadow] outline-none focus-visible:ring-[3px] text-zinc-400/80 hover:bg-zinc-800 hover:text-zinc-50 focus-visible:ring-zinc-300/50"
      >
        <ChevronRightIcon size={16} />
      </Button>
    </header>
  );
}

function CalendarGridComponent({ isRange = false }: { isRange?: boolean }) {
  const now = today(getLocalTimeZone());

  return (
    <CalendarGridRac>
      <CalendarGridHeaderRac>
        {(day) => (
          <CalendarHeaderCellRac className=" size-9 rounded-md p-0 text-xs font-medium text-zinc-400/80">
            {day}
          </CalendarHeaderCellRac>
        )}
      </CalendarGridHeaderRac>
      <CalendarGridBodyRac className="[&_td]:px-0 [&_td]:py-px">
        {(date) => (
          <CalendarCellRac
            date={date}
            className={cn(
              " relative flex size-9 items-center justify-center rounded-md p-0 text-sm font-normal whitespace-nowrap [transition-property:color,background-color,border-radius,box-shadow] duration-150 outline-none data-disabled:pointer-events-none data-disabled:opacity-30 data-focus-visible:z-10 data-focus-visible:ring-[3px] data-unavailable:pointer-events-none data-unavailable:line-through data-unavailable:opacity-30 text-zinc-50 data-hovered:bg-zinc-800 data-selected:bg-zinc-50 data-hovered:text-zinc-50 data-selected:text-zinc-900 data-focus-visible:ring-zinc-300/50",
              isRange &&
              " data-selected:rounded-none data-selection-end:rounded-e-md  data-selection-start:rounded-s-md data-invalid:data-selection-start:text-white data-selected:bg-zinc-800 data-selected:text-zinc-50 data-invalid:data-selection-end:bg-red-900 data-invalid:data-selection-start:bg-red-900 data-selection-end:bg-zinc-50 data-selection-start:bg-zinc-50 data-selection-end:text-zinc-900 data-selection-start:text-zinc-900",
              date.compare(now) === 0 &&
              cn(
                " after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-zinc-50",
                isRange
                  ? " data-selection-end:after:bg-zinc-950 data-selection-start:after:bg-zinc-950"
                  : "data-selected:after:bg-zinc-950",
              ),
            )}
          />
        )}
      </CalendarGridBodyRac>
    </CalendarGridRac>
  );
}

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <CalendarRac
      {...props}
      className={composeRenderProps(className, (className) => cn("w-fit bg-zinc-950", className))}
    >
      <CalendarHeader />
      <CalendarGridComponent />
    </CalendarRac>
  );
}

function RangeCalendar({ className, ...props }: RangeCalendarProps) {
  return (
    <RangeCalendarRac
      {...props}
      className={composeRenderProps(className, (className) => cn("w-fit", className))}
    >
      <CalendarHeader />
      <CalendarGridComponent isRange />
    </RangeCalendarRac>
  );
}

export { Calendar, RangeCalendar };
