"use client";

import { Input } from "@/components/ui/input";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function Search({
  setDebouncedSearchValue,
}: {
  setDebouncedSearchValue: (value: string) => void;
}) {
  const id = useId();
  const [searchValue, setSearchValue] = useState('')

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedValue = useDebounce(searchValue, 800);

  useEffect(() => {
    setIsLoading(true);
  }, [searchValue]);

  useEffect(() => {
    if (debouncedValue === searchValue) {
      setIsLoading(false);
    }
    setDebouncedSearchValue(debouncedValue);
  }, [debouncedValue, searchValue, setDebouncedSearchValue]);

  return (
    <div className="*:not-first:mt-2 w-full">
      <div className="relative">
        <Input
          id={id}
          className="peer ps-9 border-neutral-700 rounded-md w-full bg-neutral-950 h-10 text-white pe-9"
          placeholder="Search..."
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 text-zinc-400/80">
          {isLoading ? (
            <LoaderCircleIcon
              className="animate-spin"
              size={16}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <SearchIcon size={16} aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
