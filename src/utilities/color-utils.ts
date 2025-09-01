// Color Utilities
// Color manipulation utilities

export function mixColors(
  color1: string,
  color2: string,
  weight: number
): string {
  return `color-mix(${color1} ${weight}%, ${color2} ${100 - weight}%)`;
}

export function getContrastColor(backgroundColor: string): string {
  // Simple contrast calculation
  return backgroundColor.includes('dark') ? '#ffffff' : '#000000';
}
