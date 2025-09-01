// Lighting Manager
// Manages global lighting system

export class LightingManager {
  private lightX = 50;
  private lightY = 0;
  private intensity = 1;

  setLightPosition(x: number, y: number): void {
    this.lightX = x;
    this.lightY = y;
    this.updateGlobalLight();
  }

  setIntensity(intensity: number): void {
    this.intensity = intensity;
    this.updateGlobalLight();
  }

  private updateGlobalLight(): void {
    document.documentElement.style.setProperty(
      '--light-source-position-x',
      `${this.lightX}%`
    );
    document.documentElement.style.setProperty(
      '--light-source-position-y',
      `${this.lightY}%`
    );
    document.documentElement.style.setProperty(
      '--light-source-intensity',
      this.intensity.toString()
    );
  }
}
