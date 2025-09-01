// Typography Utilities
// Typography calculation utilities

export function getFontSize(level: number): string {
  return `var(--font-size-${level})`;
}

export function getLineHeight(
  type: 'tight' | 'normal' | 'relaxed' | 'loose'
): string {
  return `var(--line-height-${type})`;
}
