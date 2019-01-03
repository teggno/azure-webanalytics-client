export function addDays(date: Date, days: number) {
  return new Date(date.valueOf() + 24 * 60 * 60 * 1000 * days);
}