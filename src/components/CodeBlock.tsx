import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface Props {
  code: string;
  filename?: string;
}

export default function CodeBlock({ code, filename = "SKILL.md" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[#1E1E1E]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-wider text-white/60">
          {filename}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={copy}
          className="h-7 gap-1.5 text-white/70 hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-[#e6e6e6]">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
