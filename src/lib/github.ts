export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
}

const CACHE_KEY = (handle: string) => `gh-user:${handle.toLowerCase()}`;

export async function fetchGithubUser(handle: string): Promise<GithubUser | null> {
  if (!handle) return null;

  try {
    const cached = sessionStorage.getItem(CACHE_KEY(handle));
    if (cached) return JSON.parse(cached) as GithubUser;
  } catch {}

  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(handle)}`);
    if (!res.ok) return null;
    const data = await res.json();
    const user: GithubUser = {
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
    };
    try {
      sessionStorage.setItem(CACHE_KEY(handle), JSON.stringify(user));
    } catch {}
    return user;
  } catch {
    return null;
  }
}
