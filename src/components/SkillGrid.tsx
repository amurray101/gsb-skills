import type { Skill } from "@/data/types";
import SkillCard from "./SkillCard";

interface Props {
  skills: Skill[];
}

export default function SkillGrid({ skills }: Props) {
  if (skills.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-white/50 p-10 text-center text-muted-foreground">
        No skills in this category yet. Be the first to build one.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((s) => (
        <SkillCard key={s.slug} skill={s} />
      ))}
    </div>
  );
}
