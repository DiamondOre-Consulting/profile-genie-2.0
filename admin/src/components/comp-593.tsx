import { BookmarkIcon, HomeIcon } from "lucide-react"

import DatePicker from "@/components/date-picker"
import Filters from "@/components/filters"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <HomeIcon size={16} aria-hidden="true" />
                <span className="sr-only">Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Reports</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Date picker */}
          <DatePicker />
          {/* Filters */}
          <Filters />
          {/* Saved button */}
          <Button
            size="sm"
            variant="outline"
            className="aspect-square text-sm max-sm:p-0"
          >
            <BookmarkIcon
              className="text-zinc-500/80 sm:-ms-1 dark:text-zinc-400/80"
              size={16}
              aria-hidden="true"
            />
            <span className="max-sm:sr-only">Saved</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
