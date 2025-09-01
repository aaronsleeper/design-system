// Spacing Utilities
// Spacing calculation utilities

export function calculateSpacing(multiplier: number): string {
  return `${multiplier * 4}px`;
}

export function getSpacingTokenValue(multiplier: number): string {
  return `var(--spacing-${multiplier})`;
}
