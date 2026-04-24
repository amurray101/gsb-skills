import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AuthorBadge from "./AuthorBadge";
import { CATEGORY_LABEL } from "@/data/categories";
import type { Skill } from "@/data/types";

interface Props {
  skill: Skill;
}

export default function SkillCard({ skill }: Props) {
  return (
    <Link to={`/skills/${skill.slug}`} className="group block">
      <Card className="flex h-full flex-col gap-4 rounded-md border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#8C1515]/40 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-snug text-foreground group-hover:text-[#8C1515]">
            {skill.name}
          </h3>
          <Badge
            variant="outline"
            className="shrink-0 border-[#8C1515]/20 bg-[#8C1515]/5 text-xs font-medium text-[#8C1515]"
          >
            {CATEGORY_LABEL[skill.category]}
          </Badge>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {skill.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {skill.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="border-t border-border pt-3">
          <AuthorBadge handle={skill.author_github} size="sm" />
        </div>
      </Card>
    </Link>
  );
}
