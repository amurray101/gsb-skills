import { useMemo, useState } from "react";
import Hero from "@/components/Hero";
import FilterBar, { type FilterValue } from "@/components/FilterBar";
import SkillGrid from "@/components/SkillGrid";
import SiteFooter from "@/components/SiteFooter";
import Leaderboard from "@/components/Leaderboard";
import Trending from "@/components/Trending";
import { SKILLS } from "@/data/types";

export default function Landing() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return SKILLS;
    return SKILLS.filter((s) => s.category === filter);
  }, [filter]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Hero />

      <main className="flex-1">
        <section className="border-b border-border bg-archway py-14 md:py-20">
          <div className="container mx-auto">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8C1515]">
                The class of '26, shipping
              </div>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                Skills from your classmates
              </h2>
              <p className="mt-3 text-muted-foreground">
                Every skill is open-source and ready to drop into Claude Code.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <Trending />
              <Leaderboard />
            </div>
          </div>
        </section>

        <section id="skills" className="container mx-auto py-14 md:py-20">
          <div className="mb-8 flex flex-col items-center gap-3">
            <FilterBar value={filter} onChange={setFilter} />
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "skill" : "skills"}
            </div>
          </div>
          <SkillGrid skills={filtered} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
