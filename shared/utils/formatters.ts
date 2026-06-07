// uppercase first letter of each word in a string
export function capFirst(str: string): string {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}
