import { useId } from "react"
import { ListFilterIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Component() {
  const id = useId()
  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="text-sm">
            <ListFilterIcon
              size={16}
              className="text-zinc-500/80 -ms-1 dark:text-zinc-400/80"
              aria-hidden="true"
            />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-36 p-3">
          <div className="space-y-3">
            <div className="text-xs font-medium">Filters</div>
            <form>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox id={`${id}-1`} />
                  <Label htmlFor={`${id}-1`} className="font-normal">
                    Real Time
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id={`${id}-2`} />
                  <Label htmlFor={`${id}-2`} className="font-normal">
                    Top Channels
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id={`${id}-3`} />
                  <Label htmlFor={`${id}-3`} className="font-normal">
                    Last Orders
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id={`${id}-4`} />
                  <Label htmlFor={`${id}-4`} className="font-normal">
                    Total Spent
                  </Label>
                </div>
              </div>
              <div
                role="separator"
                aria-orientation="horizontal"
                className="bg-zinc-200 -mx-3 my-3 h-px dark:bg-zinc-800"
              ></div>
              <div className="flex justify-between gap-2">
                <Button size="sm" variant="outline" className="h-7 px-2">
                  Clear
                </Button>
                <Button size="sm" className="h-7 px-2">
                  Apply
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
