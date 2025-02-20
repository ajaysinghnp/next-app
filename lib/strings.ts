export const initials = (name: string) => {
  if (!name) return null;
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};
