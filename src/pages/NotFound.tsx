import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="font-display text-6xl font-bold text-[#8C1515]">404</div>
        <h1 className="mt-3 font-display text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The thing you're looking for isn't here.
        </p>
        <Button asChild className="mt-6 bg-[#8C1515] hover:bg-[#6e1010]">
          <Link to="/">Back to directory</Link>
        </Button>
      </div>
    </div>
  );
}
