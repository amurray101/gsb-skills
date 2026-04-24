import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy } from "lucide-react";

interface FormState {
  name: string;
  scope: string;
  outcome: string;
  criteria: string;
  guardrails: string;
}

const DEFAULTS: FormState = {
  name: "morning-briefing",
  scope:
    "Give me a one-screen morning briefing every weekday so I can start my day without opening five apps.",
  outcome:
    "A one-screen summary I can read in 30 seconds before my day starts. Plain markdown, under 300 words, no greeting or signoff. It tells me what the weather's doing so I know how to dress, what's on my calendar today (including any prep I need), any messages from the last 12 hours that look urgent and haven't been replied to, and the one thing I should probably tackle first.",
  criteria:
    "I know how to dress based on the weather\nI know what's on my calendar today\nI don't have to open Slack or Gmail to feel caught up",
  guardrails:
    "Never include contents from channels marked private or sensitive\nDon't pull from personal email — work only\nIf a data source is unavailable, say so explicitly. Never fabricate",
};

const STORAGE = "gsb-skill-builder:v1";

function renderPrompt(s: FormState) {
  const name = s.name.trim() || "my-skill";
  return `I want to build a Claude Code Skill. Use the skill-creator skill to generate it.

**Skill name:** ${name}

**Scope (one-sentence):**
${s.scope.trim()}

**What a great run produces:**
${s.outcome.trim()}

**Success criteria (one per line):**
${s.criteria.trim()}

**Guardrails (one per line):**
${s.guardrails.trim()}

Please produce a SKILL.md with a frontmatter (name, description) and the instructions Claude should follow at runtime. Keep it tight. Ask me clarifying questions only if something above is actually ambiguous.`;
}

export default function BuilderForm() {
  const [form, setForm] = useState<FormState>(DEFAULTS);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE);
      if (saved) setForm({ ...DEFAULTS, ...JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE, JSON.stringify(form));
    } catch {}
  }, [form]);

  const prompt = useMemo(() => renderPrompt(form), [form]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-white p-6 shadow-sm md:p-10">
      <div className="grid min-w-0 gap-6 [&>*]:min-w-0">
        <div className="grid gap-1.5">
          <Label htmlFor="bld-name">Skill name</Label>
          <Input
            id="bld-name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="morning-briefing"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="bld-scope">Your skill's one job</Label>
          <p className="text-xs text-muted-foreground">
            One sentence. What should it do for you?
          </p>
          <Textarea
            id="bld-scope"
            value={form.scope}
            onChange={(e) => update("scope", e.target.value)}
            rows={2}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="bld-outcome">What a great run produces</Label>
          <p className="text-xs text-muted-foreground">
            Concrete — format, length, what it tells you. Skip the word "useful".
          </p>
          <Textarea
            id="bld-outcome"
            value={form.outcome}
            onChange={(e) => update("outcome", e.target.value)}
            rows={5}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="bld-criteria">Success criteria (one per line)</Label>
          <Textarea
            id="bld-criteria"
            value={form.criteria}
            onChange={(e) => update("criteria", e.target.value)}
            rows={4}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="bld-guardrails">Guardrails (one per line)</Label>
          <p className="text-xs text-muted-foreground">
            The most important section. What should it never do?
          </p>
          <Textarea
            id="bld-guardrails"
            value={form.guardrails}
            onChange={(e) => update("guardrails", e.target.value)}
            rows={4}
          />
        </div>

        <div className="mt-2 border-t border-border pt-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Next steps
          </div>

          <div className="mt-4 space-y-5">
            <CommandBlock
              n="A"
              label="Paste this into Claude Code"
              hint="Updates live as you type."
              body={prompt}
            />

            <CommandBlock
              n="B"
              label="Restart Claude Code"
              hint="Claude only picks up new skills on launch. Quit with ⌘Q and reopen, or run the command below."
              body={`osascript -e 'quit app "Claude"' && open -a Claude`}
              lang="shell"
            />

            <CommandBlock
              n="C"
              label="Run your skill"
              hint="Either invoke it in plain text, or use the slash command."
              body={`Run my ${form.name.trim() || "my-skill"} skill`}
              alt={`/${form.name.trim() || "my-skill"}`}
              altLabel="Or as a slash command"
            />
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            One-click generate + install via Claude is on the way. For now, the
            three steps above get you there.
          </p>
        </div>
      </div>
    </div>
  );
}

function CommandBlock({
  n,
  label,
  hint,
  body,
  alt,
  altLabel,
  lang,
}: {
  n: string;
  label: string;
  hint: string;
  body: string;
  alt?: string;
  altLabel?: string;
  lang?: "shell";
}) {
  const [copied, setCopied] = useState(false);
  const [copiedAlt, setCopiedAlt] = useState(false);

  async function doCopy(text: string, which: "main" | "alt") {
    try {
      await navigator.clipboard.writeText(text);
      if (which === "main") {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      } else {
        setCopiedAlt(true);
        setTimeout(() => setCopiedAlt(false), 1400);
      }
    } catch {}
  }

  return (
    <div>
      <div className="mb-2 flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8C1515]/10 font-mono text-xs font-semibold text-[#8C1515]">
          {n}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold">{label}</div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => doCopy(body, "main")}
              className="h-7 gap-1.5"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>
        </div>
      </div>
      <pre
        className={
          "max-h-[420px] w-full overflow-auto whitespace-pre-wrap break-words rounded-md border border-border bg-[#1E1E1E] p-4 font-mono leading-relaxed text-[#e6e6e6] " +
          (lang === "shell" ? "text-[12px]" : "text-[12px]")
        }
      >
        {body}
      </pre>

      {alt && (
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {altLabel ?? "Alternative"}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => doCopy(alt, "alt")}
              className="h-7 gap-1.5"
            >
              {copiedAlt ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedAlt ? "Copied" : "Copy"}
            </Button>
          </div>
          <pre className="w-full overflow-auto whitespace-pre-wrap break-words rounded-md border border-border bg-[#1E1E1E] p-4 font-mono text-[12px] leading-relaxed text-[#e6e6e6]">
            {alt}
          </pre>
        </div>
      )}
    </div>
  );
}
