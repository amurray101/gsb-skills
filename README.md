# GSB Skills

A directory of Claude skills built by Stanford GSB students.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Add a skill

Edit `src/data/skills.json` and add a new entry:

```json
{
  "slug": "my-skill",
  "name": "My Skill",
  "author_github": "your-github-handle",
  "description": "One-line pitch shown on the card.",
  "long_description": "Longer paragraph shown on the detail page.",
  "tags": ["networking", "school"],
  "category": "networking",
  "github_url": "https://github.com/you/my-skill",
  "skill_md_preview": "---\nname: my-skill\n---\n# My Skill\n..."
}
```

Categories: `school`, `social`, `networking`, `case-prep`, `other`.

Author name + avatar are pulled live from the GitHub API using `author_github`.

## Hero image

Drop a GSB photo at `public/gsb-hero.jpg` and it will render behind the hero
headline. Until you do, the hero shows a cardinal-red gradient fallback.

## Project layout

- `src/pages/` — `Landing`, `SkillDetail` (`/skills/:slug`), `BuildYourOwnAgent`, `NotFound`
- `src/components/` — `Hero`, `FilterBar`, `SkillCard`, `SkillGrid`, `BuilderModal`, etc.
- `src/data/` — the `skills.json` registry plus `categories.ts`
- `src/lib/github.ts` — GitHub user lookup with `sessionStorage` cache

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Roadmap

- [ ] Live skill generation: wire the disabled "Generate with Claude" button in
      `BuilderModal` to a small server proxy (same pattern as
      `touchyfeely-ai/server/claudeProxy.js`).
- [ ] Markdown rendering for `long_description`.
- [ ] Submission flow so classmates don't have to open a PR to add a skill.
