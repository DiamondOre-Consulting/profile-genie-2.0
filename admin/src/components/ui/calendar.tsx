"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-4",
    month: "w-full",
    month_caption:
      "relative mx-10 mb-1 flex h-9 items-center justify-center z-20",
    caption_label: "text-sm font-medium",
    nav: "absolute top-0 flex w-full justify-between z-10",
    button_previous: cn(
      buttonVariants({ variant: "ghost" }),
      "size-9 text-zinc-500/80 hover:text-zinc-950 p-0 dark:text-zinc-400/80 dark:hover:text-zinc-50"
    ),
    button_next: cn(
      buttonVariants({ variant: "ghost" }),
      "size-9 text-zinc-500/80 hover:text-zinc-950 p-0 dark:text-zinc-400/80 dark:hover:text-zinc-50"
    ),
    weekday: "size-9 p-0 text-xs font-medium text-zinc-500/80 dark:text-zinc-400/80",
    day_button:
      "relative flex size-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-zinc-950 group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 group-data-disabled:pointer-events-none focus-visible:z-10 hover:not-in-data-selected:bg-zinc-100 group-data-selected:bg-zinc-900 hover:not-in-data-selected:text-zinc-950 group-data-selected:text-zinc-50 group-data-disabled:text-zinc-950/30 group-data-disabled:line-through group-data-outside:text-zinc-950/30 group-data-selected:group-data-outside:text-zinc-50 outline-none focus-visible:ring-zinc-950/50 focus-visible:ring-[3px] group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-[.range-middle]:group-data-selected:bg-zinc-100 group-[.range-middle]:group-data-selected:text-zinc-950 dark:text-zinc-50 dark:hover:not-in-data-selected:bg-zinc-800 dark:group-data-selected:bg-zinc-50 dark:hover:not-in-data-selected:text-zinc-50 dark:group-data-selected:text-zinc-900 dark:group-data-disabled:text-zinc-50/30 dark:group-data-outside:text-zinc-50/30 dark:group-data-selected:group-data-outside:text-zinc-900 dark:focus-visible:ring-zinc-300/50 dark:group-[.range-middle]:group-data-selected:bg-zinc-800 dark:group-[.range-middle]:group-data-selected:text-zinc-50",
    day: "group size-9 px-0 py-px text-sm",
    range_start: "range-start",
    range_end: "range-end",
    range_middle: "range-middle",
    today:
      "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-zinc-900 [&[data-selected]:not(.range-middle)>*]:after:bg-white [&[data-disabled]>*]:after:bg-zinc-950/30 *:after:transition-colors dark:*:after:bg-zinc-50 dark:[&[data-selected]:not(.range-middle)>*]:after:bg-zinc-950 dark:[&[data-disabled]>*]:after:bg-zinc-50/30",
    outside:
      "text-zinc-500 data-selected:bg-zinc-100/50 data-selected:text-zinc-500 dark:text-zinc-400 dark:data-selected:bg-zinc-800/50 dark:data-selected:text-zinc-400",
    hidden: "invisible",
    week_number: "size-9 p-0 text-xs font-medium text-zinc-500/80 dark:text-zinc-400/80",
  }

  const mergedClassNames: typeof defaultClassNames = Object.keys(
    defaultClassNames
  ).reduce(
    (acc, key) => ({
      ...acc,
      [key]: classNames?.[key as keyof typeof classNames]
        ? cn(
            defaultClassNames[key as keyof typeof defaultClassNames],
            classNames[key as keyof typeof classNames]
          )
        : defaultClassNames[key as keyof typeof defaultClassNames],
    }),
    {} as typeof defaultClassNames
  )

  const defaultComponents = {
    Chevron: (props: {
      className?: string
      size?: number
      disabled?: boolean
      orientation?: "left" | "right" | "up" | "down"
    }) => {
      if (props.orientation === "left") {
        return <ChevronLeftIcon size={16} {...props} aria-hidden="true" />
      }
      return <ChevronRightIcon size={16} {...props} aria-hidden="true" />
    },
  }

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-fit", className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      {...props}
    />
  )
}

export { Calendar }
