export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "restaurant";
}

export function uid(prefix: string = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
