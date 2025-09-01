// Lighting Utilities
// Lighting calculation utilities

export function calculateShadowOffset(
  lightX: number,
  lightY: number
): { x: number; y: number } {
  return {
    x: (lightX - 50) / 50,
    y: (lightY - 50) / 50,
  };
}

export function getShadowColor(intensity: number): string {
  return `rgba(0, 0, 0, ${0.1 * intensity})`;
}
