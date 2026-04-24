import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { SKILLS } from "@/data/types";

export default function Trending() {
  const top = [...SKILLS]
    .filter((s) => (s.view_count ?? 0) > 0)
    .sort((a, b) => (b.view_count ?? 0) - (a.view_count ?? 0))
    .slice(0, 10);

  return (
    <div className="h-full border border-border border-t-2 border-t-[#8C1515] bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Flame className="h-4 w-4 text-[#8C1515]" />
        <h3 className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-[#8C1515]">
          Trending skills
        </h3>
      </div>

      <ol className="space-y-2.5">
        {top.map((s, i) => (
          <li key={s.slug} className="flex items-center gap-3">
            <div className="w-5 shrink-0 font-mono text-sm tabular-nums text-muted-foreground">
              {i + 1}
            </div>
            <Link
              to={`/skills/${s.slug}`}
              className="min-w-0 flex-1 truncate text-sm font-medium text-foreground hover:text-[#8C1515]"
            >
              {s.name}
            </Link>
            <div className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {formatCount(s.view_count ?? 0)} views
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function formatCount(n: number): string {
  if (n < 1000) return String(n);
  return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
}
