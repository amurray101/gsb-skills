import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="relative min-h-[560px] w-full"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(30,10,10,0) 0%, rgba(30,10,10,0.25) 100%), url('/gsb-hero.jpg'), linear-gradient(135deg, #A8202A 0%, #8C1515 60%, #771111 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Rotated card stack — decorative, hints at the content below */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-40px] top-20 hidden lg:block"
        >
          <MockCard
            rotate={-6}
            offset="right-24 top-0"
            title="coffee-chat-prep"
            tag="networking"
            opacity={0.55}
          />
          <MockCard
            rotate={4}
            offset="right-0 top-10"
            title="weekly-homework-planner"
            tag="school"
            opacity={0.85}
          />
          <MockCard
            rotate={-2}
            offset="right-10 top-52"
            title="section-social-planner"
            tag="social"
            opacity={1}
            featured
          />
        </div>

        <div className="container relative mx-auto flex min-h-[560px] flex-col justify-end pb-14 pt-28 lg:pb-20">
          <div className="max-w-3xl">
            <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[9rem]">
              GSB Skills<span className="text-white/60">.</span>
            </h1>
            <p className="mt-6 max-w-sm text-sm uppercase tracking-[0.18em] text-white/75">
              A directory of Claude skills built by GSB students, for GSB students.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="rounded-none bg-white px-7 text-[#8C1515] hover:bg-white/90"
              >
                <Link to="/build-your-own-agent">Build your own →</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MockCard({
  rotate,
  offset,
  title,
  tag,
  opacity,
  featured = false,
}: {
  rotate: number;
  offset: string;
  title: string;
  tag: string;
  opacity: number;
  featured?: boolean;
}) {
  return (
    <div
      className={`absolute ${offset}`}
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
    >
      <div
        className={
          "w-64 border border-black/10 bg-white p-4 shadow-xl " +
          (featured ? "ring-2 ring-[#E8E2D5]/60" : "")
        }
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C1515]">
            {tag}
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-[#8C1515]" />
        </div>
        <div className="font-display text-base font-semibold text-[#2E2D29]">
          {title}
        </div>
        <div className="mt-2 h-1.5 w-4/5 rounded bg-[#2E2D29]/10" />
        <div className="mt-1.5 h-1.5 w-3/5 rounded bg-[#2E2D29]/10" />
      </div>
    </div>
  );
}
