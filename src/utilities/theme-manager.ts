/**
 * Theme Manager Utility
 *
 * Handles theme switching with performance monitoring and RTL support.
 * Provides utilities for managing CSS custom properties and theme transitions.
 */

export interface ThemeConfig {
  name: string;
  class: string;
  color: string;
  direction?: 'ltr' | 'rtl';
}

export interface ThemeSwitchOptions {
  animate?: boolean;
  duration?: number;
  onComplete?: () => void;
}

export class ThemeManager {
  private currentTheme: string = 'light';
  private themes: Map<string, ThemeConfig> = new Map();
  private performanceMetrics: {
    switchTimes: number[];
    averageSwitchTime: number;
    lastSwitchTime: number;
  } = {
    switchTimes: [],
    averageSwitchTime: 0,
    lastSwitchTime: 0,
  };

  constructor() {
    this.initializeThemes();
  }

  /**
   * Initialize default themes
   */
  private initializeThemes(): void {
    this.addTheme({
      name: 'light',
      class: 'theme-light',
      color: '#ffffff',
      direction: 'ltr',
    });

    this.addTheme({
      name: 'dark',
      class: 'theme-dark',
      color: '#1a1a1a',
      direction: 'ltr',
    });

    this.addTheme({
      name: 'high-contrast',
      class: 'theme-high-contrast',
      color: '#000000',
      direction: 'ltr',
    });
  }

  /**
   * Add a new theme configuration
   */
  addTheme(theme: ThemeConfig): void {
    this.themes.set(theme.name, theme);
  }

  /**
   * Get theme configuration by name
   */
  getTheme(name: string): ThemeConfig | undefined {
    return this.themes.get(name);
  }

  /**
   * Get all available themes
   */
  getAllThemes(): ThemeConfig[] {
    return Array.from(this.themes.values());
  }

  /**
   * Get current theme name
   */
  getCurrentTheme(): string {
    return this.currentTheme;
  }

  /**
   * Switch to a specific theme
   */
  switchTheme(
    themeName: string,
    options: ThemeSwitchOptions = {}
  ): Promise<void> {
    return new Promise(resolve => {
      const theme = this.themes.get(themeName);
      if (!theme) {
        throw new Error(`Theme "${themeName}" not found`);
      }

      const startTime = performance.now();

      // Remove all theme classes
      this.removeAllThemeClasses();

      // Add new theme class
      document.documentElement.classList.add(theme.class);

      // Set direction if specified
      if (theme.direction) {
        document.documentElement.setAttribute('dir', theme.direction);
      }

      // Update current theme
      this.currentTheme = themeName;

      // Measure performance
      const endTime = performance.now();
      const switchTime = endTime - startTime;

      this.recordSwitchTime(switchTime);

      // Handle animation if requested
      if (options.animate && options.duration) {
        this.animateThemeTransition(options.duration, () => {
          if (options.onComplete) options.onComplete();
          resolve();
        });
      } else {
        if (options.onComplete) options.onComplete();
        resolve();
      }
    });
  }

  /**
   * Remove all theme classes from document
   */
  private removeAllThemeClasses(): void {
    const root = document.documentElement;
    this.themes.forEach(theme => {
      root.classList.remove(theme.class);
    });
  }

  /**
   * Record theme switch performance metrics
   */
  private recordSwitchTime(switchTime: number): void {
    this.performanceMetrics.switchTimes.push(switchTime);
    this.performanceMetrics.lastSwitchTime = switchTime;

    // Keep only last 100 measurements
    if (this.performanceMetrics.switchTimes.length > 100) {
      this.performanceMetrics.switchTimes.shift();
    }

    // Calculate average
    this.performanceMetrics.averageSwitchTime =
      this.performanceMetrics.switchTimes.reduce((a, b) => a + b, 0) /
      this.performanceMetrics.switchTimes.length;
  }

  /**
   * Animate theme transition
   */
  private animateThemeTransition(
    duration: number,
    onComplete: () => void
  ): void {
    const root = document.documentElement;

    // Add transition class
    root.classList.add('theme-transitioning');
    root.style.setProperty('--theme-transition-duration', `${duration}ms`);

    // Remove transition class after animation completes
    setTimeout(() => {
      root.classList.remove('theme-transitioning');
      root.style.removeProperty('--theme-transition-duration');
      onComplete();
    }, duration);
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): typeof this.performanceMetrics {
    return { ...this.performanceMetrics };
  }

  /**
   * Check if theme switching meets performance targets
   */
  validatePerformance(): {
    averageTime: boolean;
    peakTime: boolean;
    overall: boolean;
  } {
    const { averageSwitchTime, switchTimes } = this.performanceMetrics;
    const maxTime = Math.max(...switchTimes);

    const averageTime = averageSwitchTime < 5; // Target: < 5ms average
    const peakTime = maxTime < 16; // Target: < 16ms peak (60fps)
    const overall = averageTime && peakTime;

    return { averageTime, peakTime, overall };
  }

  /**
   * Set CSS custom property with performance monitoring
   */
  setCSSProperty(propertyName: string, value: string): number {
    const startTime = performance.now();
    document.documentElement.style.setProperty(propertyName, value);
    const endTime = performance.now();
    return endTime - startTime;
  }

  /**
   * Get CSS custom property value
   */
  getCSSProperty(propertyName: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(
      propertyName
    );
  }

  /**
   * Set multiple CSS properties efficiently
   */
  setMultipleCSSProperties(properties: Record<string, string>): number {
    const startTime = performance.now();

    Object.entries(properties).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });

    const endTime = performance.now();
    return endTime - startTime;
  }

  /**
   * Check if CSS custom properties are supported
   */
  static supportsCSSVars(): boolean {
    return CSS.supports('--custom-property', 'value');
  }

  /**
   * Check if color-mix() function is supported
   */
  static supportsColorMix(): boolean {
    return CSS.supports('color', 'color-mix(in srgb, red, blue)');
  }

  /**
   * Check if logical properties are supported
   */
  static supportsLogicalProperties(): boolean {
    return CSS.supports('margin-block-start', '1rem');
  }

  /**
   * Get browser feature support status
   */
  static getFeatureSupport(): {
    cssVars: boolean;
    colorMix: boolean;
    logicalProps: boolean;
  } {
    return {
      cssVars: this.supportsCSSVars(),
      colorMix: this.supportsColorMix(),
      logicalProps: this.supportsLogicalProperties(),
    };
  }
}

// Export singleton instance
export const themeManager = new ThemeManager();
