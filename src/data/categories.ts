export type Category =
  | "school"
  | "social"
  | "networking"
  | "case-prep"
  | "other";

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "school", label: "School" },
  { id: "social", label: "Social" },
  { id: "networking", label: "Networking" },
];

export const CATEGORY_LABEL: Record<Category, string> = {
  school: "School",
  social: "Social",
  networking: "Networking",
  "case-prep": "Case Prep",
  other: "Other",
};
