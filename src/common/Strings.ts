export function removeTrailingSlash(s: string) {
  return s.lastIndexOf("/") === s.length - 1 ? s.substr(0, s.length - 1) : s;
}
