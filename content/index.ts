function sitename(url?: string): string {
  if (url === undefined) {
    return "";
  }

  return url.replace(/^https?:\/\//, "");
}

export const config = {
  first: "Reeto",
  last: "Chatterjee",
  sitename: sitename(process.env.URL),
  description: "A CV website for Reeto Chatterjee",
};
