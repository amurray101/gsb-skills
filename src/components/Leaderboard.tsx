import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { SKILLS } from "@/data/types";
import { fetchGithubUser, type GithubUser } from "@/lib/github";

interface Row {
  handle: string;
  count: number;
  user: GithubUser | null;
}

function buildRanking() {
  const counts = new Map<string, number>();
  for (const s of SKILLS) {
    counts.set(s.author_github, (counts.get(s.author_github) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([handle, count]) => ({ handle, count }));
}

export default function Leaderboard() {
  const [rows, setRows] = useState<Row[]>(() =>
    buildRanking().map((r) => ({ ...r, user: null })),
  );

  useEffect(() => {
    let active = true;
    (async () => {
      const base = buildRanking();
      const withUsers = await Promise.all(
        base.map(async (r) => ({
          ...r,
          user: await fetchGithubUser(r.handle),
        })),
      );
      if (active) setRows(withUsers);
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="h-full border border-border border-t-2 border-t-[#8C1515] bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-4 w-4 text-[#8C1515]" />
        <h3 className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-[#8C1515]">
          Top builders
        </h3>
      </div>

      <ol className="space-y-3">
        {rows.map((r, i) => {
          const avatar = r.user?.avatar_url ?? `https://github.com/${r.handle}.png`;
          const name = r.user?.name ?? r.handle;
          return (
            <li key={r.handle} className="flex items-center gap-3">
              <div className="w-5 shrink-0 font-mono text-sm tabular-nums text-muted-foreground">
                {i + 1}
              </div>
              <img
                src={avatar}
                alt={name}
                loading="lazy"
                className="h-8 w-8 shrink-0 rounded-full border border-border object-cover"
              />
              <div className="min-w-0 flex-1">
                <a
                  href={r.user?.html_url ?? `https://github.com/${r.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-sm font-medium text-foreground hover:text-[#8C1515]"
                >
                  {name}
                </a>
                <div className="truncate text-xs text-muted-foreground">
                  @{r.handle}
                </div>
              </div>
              <div className="shrink-0 text-sm font-semibold text-[#8C1515]">
                {r.count}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  {r.count === 1 ? "skill" : "skills"}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
