// Escape a user-supplied string so it can be used as a literal inside a MongoDB
// $regex without allowing regex metacharacters (prevents ReDoS / unintended
// matches from search input).
export function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Format a Date as YYYY-MM-DD in LOCAL time. Using toISOString() here would use
// UTC and roll the date over near midnight for users east of UTC (e.g. IST),
// causing an off-by-one-day in check-in/out pickers.
export function toLocalDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
