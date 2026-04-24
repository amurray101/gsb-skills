import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container mx-auto flex flex-col items-start justify-between gap-3 py-8 md:flex-row md:items-center">
        <div className="text-sm text-muted-foreground">
          Built by students at the Stanford Graduate School of Business.
        </div>
        <div className="flex gap-4 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-[#8C1515]">
            Home
          </Link>
          <Link
            to="/build-your-own-agent"
            className="text-muted-foreground hover:text-[#8C1515]"
          >
            Build your own
          </Link>
        </div>
      </div>
    </footer>
  );
}
