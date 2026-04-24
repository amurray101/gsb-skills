import { useEffect, useState } from "react";
import { fetchGithubUser, type GithubUser } from "@/lib/github";

interface Props {
  handle: string;
  size?: "sm" | "md";
  showName?: boolean;
}

export default function AuthorBadge({ handle, size = "sm", showName = true }: Props) {
  const [user, setUser] = useState<GithubUser | null>(null);

  useEffect(() => {
    let active = true;
    fetchGithubUser(handle).then((u) => {
      if (active) setUser(u);
    });
    return () => {
      active = false;
    };
  }, [handle]);

  const dim = size === "md" ? "h-9 w-9" : "h-6 w-6";
  const avatarUrl = user?.avatar_url ?? `https://github.com/${handle}.png`;
  const displayName = user?.name ?? handle;

  return (
    <a
      href={user?.html_url ?? `https://github.com/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#8C1515]"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={avatarUrl}
        alt={displayName}
        className={`${dim} rounded-full border border-border object-cover`}
        loading="lazy"
      />
      {showName && (
        <span className="font-medium text-foreground">
          {displayName}
          <span className="ml-1 font-normal text-muted-foreground">@{handle}</span>
        </span>
      )}
    </a>
  );
}
