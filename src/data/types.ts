import type { Category } from "./categories";

export interface Skill {
  slug: string;
  name: string;
  author_github: string;
  description: string;
  long_description: string;
  tags: string[];
  category: Category;
  github_url: string;
  view_count?: number;
  skill_md_preview: string;
}

import skillsData from "./skills.json";
export const SKILLS: Skill[] = skillsData as Skill[];

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}
