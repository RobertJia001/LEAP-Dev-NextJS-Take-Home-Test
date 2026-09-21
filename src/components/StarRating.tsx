"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  className?: string;
}

export default function StarRating({
  value,
  onChange,
  max = 5,
  readOnly = false,
  className,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const interactive = !readOnly && !!onChange;
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  if (!interactive) {
    return (
      <div
        className={cn("inline-flex items-center gap-0.5", className)}
        role="img"
        aria-label={`Rated ${value} out of ${max} stars`}
      >
        {stars.map((starValue) => (
          <Star
            key={starValue}
            className={cn(
              "size-4 text-muted-foreground",
              starValue <= Math.round(value) &&
                "fill-amber-400 text-amber-400"
            )}
          />
        ))}
      </div>
    );
  }

  const displayValue = hoverValue ?? value;

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="group"
      aria-label="Rating"
      onMouseLeave={() => setHoverValue(undefined)}
    >
      {stars.map((starValue) => (
        <button
          key={starValue}
          type="button"
          aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
          aria-pressed={starValue <= value}
          className="rounded-sm text-muted-foreground transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          onMouseEnter={() => setHoverValue(starValue)}
          onClick={() => onChange?.(starValue)}
        >
          <Star
            className={cn(
              "size-5",
              starValue <= Math.round(displayValue) &&
                "fill-amber-400 text-amber-400"
            )}
          />
        </button>
      ))}
    </div>
  );
}
