// Shadow Calculator
// Calculates dynamic shadows based on light position

export class ShadowCalculator {
  calculateShadow(lightX: number, lightY: number, intensity: number): string {
    const offsetX = (lightX - 50) / 50;
    const offsetY = (lightY - 50) / 50;
    const blur = 8 * intensity;
    const color = `rgba(0, 0, 0, ${0.1 * intensity})`;

    return `${offsetX}px ${offsetY}px ${blur}px ${color}`;
  }
}
