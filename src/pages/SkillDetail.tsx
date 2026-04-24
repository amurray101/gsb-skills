import { Link, useParams } from "react-router-dom";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AuthorBadge from "@/components/AuthorBadge";
import CodeBlock from "@/components/CodeBlock";
import SkillCard from "@/components/SkillCard";
import SiteFooter from "@/components/SiteFooter";
import { SKILLS, getSkill } from "@/data/types";
import { CATEGORY_LABEL } from "@/data/categories";

export default function SkillDetail() {
  const { slug } = useParams<{ slug: string }>();
  const skill = slug ? getSkill(slug) : undefined;

  if (!skill) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="font-display text-3xl font-semibold">Skill not found</h1>
        <p className="mt-2 text-muted-foreground">
          We don't have a skill with that slug.
        </p>
        <Button asChild className="mt-6 bg-[#8C1515] hover:bg-[#6e1010]">
          <Link to="/">Back to directory</Link>
        </Button>
      </div>
    );
  }

  const fromSameAuthor = SKILLS.filter(
    (s) => s.author_github === skill.author_github && s.slug !== skill.slug,
  );
  const inSameCategory = SKILLS.filter(
    (s) => s.category === skill.category && s.slug !== skill.slug,
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-white">
        <div className="container mx-auto flex items-center py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#8C1515]"
          >
            <ArrowLeft className="h-4 w-4" />
            All skills
          </Link>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main column */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-[#8C1515]/20 bg-[#8C1515]/5 text-[#8C1515]"
              >
                {CATEGORY_LABEL[skill.category]}
              </Badge>
              {skill.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl font-bold md:text-5xl">
              {skill.name}
            </h1>

            <div className="mt-4">
              <AuthorBadge handle={skill.author_github} size="md" />
            </div>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
              {skill.long_description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-[#8C1515] hover:bg-[#6e1010]"
              >
                <a href={skill.github_url} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-10">
              <h2 className="mb-3 font-display text-xl font-semibold">
                What's inside
              </h2>
              <CodeBlock code={skill.skill_md_preview} filename="SKILL.md" />
            </div>
          </div>

          {/* Side column */}
          <aside className="space-y-8">
            {fromSameAuthor.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  More from {skill.author_github}
                </h3>
                <div className="flex flex-col gap-3">
                  {fromSameAuthor.map((s) => (
                    <SkillCard key={s.slug} skill={s} />
                  ))}
                </div>
              </div>
            )}

            {inSameCategory.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Other {CATEGORY_LABEL[skill.category]} skills
                </h3>
                <div className="flex flex-col gap-3">
                  {inSameCategory.map((s) => (
                    <SkillCard key={s.slug} skill={s} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
