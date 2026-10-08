// Utility to add seconds to a date and return ISO string
export function addSecondsToNow(seconds: number): string {
  const now = new Date();
  now.setSeconds(now.getSeconds() + seconds);
  return now.toISOString();
}

/**
 * Returns a short relative time string (e.g., "now", "5m", "2h", "3d")
 */
export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d`;
}
