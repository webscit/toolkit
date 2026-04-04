/** Minimal className joiner. No tailwind-merge needed. */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
