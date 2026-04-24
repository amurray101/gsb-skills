import { cn } from "@/lib/utils";
import { CATEGORIES, type Category } from "@/data/categories";

export type FilterValue = Category | "all";

interface Props {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}

export default function FilterBar({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-center gap-x-8 gap-y-2 border-b border-border">
      {CATEGORIES.map((c) => {
        const active = value === c.id;
        return (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            className={cn(
              "relative -mb-px pb-3 pt-1 text-base font-medium transition-colors focus-visible:outline-none",
              active
                ? "text-[#8C1515]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {c.label}
            {active && (
              <span className="absolute inset-x-0 -bottom-px h-[2px] bg-[#8C1515]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
