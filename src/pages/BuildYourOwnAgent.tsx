import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BuilderForm from "@/components/BuilderForm";
import SiteFooter from "@/components/SiteFooter";

export default function BuildYourOwnAgent() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
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

      <section
        className="text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #A8202A 0%, #8C1515 60%, #771111 100%)",
        }}
      >
        <div className="container mx-auto py-12 md:py-16">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Build your own Claude skill
            </h1>
            <p className="mt-4 text-lg text-white/85">
              Describe what your skill should do — we'll turn it into a prompt you
              can paste into Claude Code. The{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm">
                skill-creator
              </code>{" "}
              skill takes it from there and scaffolds a real, portable SKILL.md.
            </p>
            <div className="mt-6">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href="https://docs.claude.com/en/docs/claude-code/skills"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  What's a skill?
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <section className="container mx-auto py-12 md:py-14">
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
            <Step
              n={1}
              title="Describe the outcome"
              body="Fill in the form below — picture yourself running it. What should it produce? How would you know it worked?"
            />
            <Step
              n={2}
              title="Paste into Claude Code"
              body="Copy the generated prompt and paste it into Claude Code. The skill-creator takes it from there."
            />
            <Step
              n={3}
              title="Claude writes & installs it"
              body={
                <>
                  Claude scaffolds a <code className="rounded bg-secondary px-1 py-0.5 font-mono text-[11px]">SKILL.md</code> and drops it into <code className="rounded bg-secondary px-1 py-0.5 font-mono text-[11px]">~/.claude/skills/</code> for you.
                </>
              }
            />
          </div>
        </section>

        <section className="container mx-auto pb-16">
          <div className="mx-auto max-w-4xl">
            <BuilderForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: ReactNode;
}) {
  return (
    <div className="rounded-md border border-border bg-white p-6">
      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#8C1515]/10 font-display text-sm font-semibold text-[#8C1515]">
        {n}
      </div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
