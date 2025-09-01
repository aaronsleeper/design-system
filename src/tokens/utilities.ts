// Token Utilities
// Utility functions for design tokens

export function getColorToken(name: string): string {
  return `var(--color-${name})`;
}

export function getSpacingTokenName(multiplier: number): string {
  return `var(--spacing-${multiplier})`;
}

export function getTypographyToken(name: string): string {
  return `var(--font-${name})`;
}
