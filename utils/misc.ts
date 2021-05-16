export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// In production, there will be nice short links to all the pages
// In development, there's no fancy redirections, so everything is absolutely
// addressed
export function getLink(p: string) : string {
  // Blog is a folder
  // TODO: find a better way to do this
  if (p.startsWith("/blog")) {
    return p
  }
  if (process.env.NODE_ENV === "production") {
    return p
  }

  return `${p}.html`
}