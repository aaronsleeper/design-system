/**
 * Performance Benchmark Testing Utilities
 *
 * This module provides utilities for testing and monitoring performance benchmarks
 * defined in docs/performance/benchmarks.md
 */

export interface PerformanceMetrics {
  bundleSize: number;
  initializationTime: number;
  eventResponseTime: number;
  memoryUsage: number;
  shadowCalculationTime?: number;
}

export interface ComponentBenchmark {
  name: string;
  targetSize: number;
  currentSize: number;
  targetInitTime: number;
  currentInitTime: number;
  targetEventTime: number;
  currentEventTime: number;
}

export class PerformanceBenchmark {
  /**
   * Measure component initialization time
   */
  static measureInitialization(componentName: string): Promise<number> {
    return new Promise(resolve => {
      const start = performance.now();

      // Create component and measure initialization
      const component = document.createElement(componentName);
      document.body.appendChild(component);

      // Wait for next frame to ensure rendering is complete
      requestAnimationFrame(() => {
        const end = performance.now();
        const duration = end - start;

        // Clean up
        document.body.removeChild(component);
        resolve(duration);
      });
    });
  }

  /**
   * Measure event handling performance
   */
  static measureEventHandling(
    componentName: string,
    eventType: string = 'click'
  ): Promise<number> {
    return new Promise(resolve => {
      const component = document.createElement(componentName);
      document.body.appendChild(component);

      // Wait for component to be ready
      requestAnimationFrame(() => {
        const start = performance.now();

        // Trigger event
        if (eventType === 'click') {
          component.click();
        } else if (eventType === 'input') {
          const input = component.querySelector('input') || component;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }

        const end = performance.now();
        const duration = end - start;

        // Clean up
        document.body.removeChild(component);
        resolve(duration);
      });
    });
  }

  /**
   * Get bundle size for a file
   */
  static async getBundleSize(filePath: string): Promise<number> {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
      return blob.size;
    } catch (error) {
      console.warn(`Could not measure bundle size for ${filePath}:`, error);
      return 0;
    }
  }

  /**
   * Get memory usage for a component
   */
  static getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * Run comprehensive benchmark for a component
   */
  static async runComponentBenchmark(
    componentName: string,
    targetSize: number,
    targetInitTime: number,
    targetEventTime: number
  ): Promise<ComponentBenchmark> {
    const bundleSize = await this.getBundleSize(
      `dist/components/${componentName}.js`
    );
    const initTime = await this.measureInitialization(componentName);
    const eventTime = await this.measureEventHandling(componentName);

    return {
      name: componentName,
      targetSize,
      currentSize: bundleSize,
      targetInitTime,
      currentInitTime: initTime,
      targetEventTime,
      currentEventTime: eventTime,
    };
  }

  /**
   * Validate benchmark against targets
   */
  static validateBenchmark(benchmark: ComponentBenchmark): {
    size: boolean;
    initTime: boolean;
    eventTime: boolean;
    overall: boolean;
  } {
    const size = benchmark.currentSize <= benchmark.targetSize;
    const initTime = benchmark.currentInitTime <= benchmark.targetInitTime;
    const eventTime = benchmark.currentEventTime <= benchmark.targetEventTime;
    const overall = size && initTime && eventTime;

    return { size, initTime, eventTime, overall };
  }

  /**
   * Generate benchmark report
   */
  static generateReport(benchmarks: ComponentBenchmark[]): string {
    const results = benchmarks.map(benchmark => {
      const validation = this.validateBenchmark(benchmark);
      const status = validation.overall ? '✅ PASS' : '❌ FAIL';

      return `
${benchmark.name} ${status}
  Bundle Size: ${benchmark.currentSize}B / ${benchmark.targetSize}B ${
        validation.size ? '✅' : '❌'
      }
  Init Time: ${benchmark.currentInitTime.toFixed(2)}ms / ${
        benchmark.targetInitTime
      }ms ${validation.initTime ? '✅' : '❌'}
  Event Time: ${benchmark.currentEventTime.toFixed(2)}ms / ${
        benchmark.targetEventTime
      }ms ${validation.eventTime ? '✅' : '❌'}
      `.trim();
    });

    const passed = benchmarks.filter(
      b => this.validateBenchmark(b).overall
    ).length;
    const total = benchmarks.length;

    return `
Performance Benchmark Report
============================

${results.join('\n\n')}

Summary: ${passed}/${total} components passed all benchmarks
    `.trim();
  }
}

/**
 * Component-specific benchmark targets
 */
export const COMPONENT_TARGETS = {
  // Form Components
  'form/button-primary': { size: 5 * 1024, initTime: 100, eventTime: 16 },
  'form/input-text': { size: 2 * 1024, initTime: 50, eventTime: 8 },
  'form/select': { size: 2 * 1024, initTime: 50, eventTime: 8 },
  'form/checkbox': { size: 2 * 1024, initTime: 50, eventTime: 8 },
  'form/radio': { size: 2 * 1024, initTime: 50, eventTime: 8 },
  'form/textarea': { size: 2 * 1024, initTime: 50, eventTime: 8 },
  'form/switch': { size: 2 * 1024, initTime: 50, eventTime: 8 },

  // Layout Components
  'layout/container': { size: 2 * 1024, initTime: 50, eventTime: 16 },
  'layout/grid': { size: 3 * 1024, initTime: 75, eventTime: 16 },
  'layout/stack': { size: 2 * 1024, initTime: 50, eventTime: 16 },
  'layout/divider': { size: 1 * 1024, initTime: 25, eventTime: 16 },

  // Navigation Components
  'navigation/sidebar': { size: 5 * 1024, initTime: 150, eventTime: 16 },
  'navigation/drawer': { size: 5 * 1024, initTime: 150, eventTime: 16 },

  // Content Components
  'content/typography': { size: 2 * 1024, initTime: 50, eventTime: 16 },
  'content/card': { size: 3 * 1024, initTime: 75, eventTime: 16 },
  'content/badge': { size: 2 * 1024, initTime: 50, eventTime: 16 },
  'content/avatar': { size: 2 * 1024, initTime: 50, eventTime: 16 },
  'content/breadcrumb': { size: 3 * 1024, initTime: 75, eventTime: 16 },
  'content/pagination': { size: 4 * 1024, initTime: 100, eventTime: 16 },

  // Feedback Components
  'feedback/alert': { size: 3 * 1024, initTime: 75, eventTime: 16 },
  'feedback/toast': { size: 3 * 1024, initTime: 75, eventTime: 16 },
  'feedback/modal': { size: 5 * 1024, initTime: 150, eventTime: 16 },
  'feedback/tooltip': { size: 3 * 1024, initTime: 75, eventTime: 16 },
} as const;

/**
 * Run all component benchmarks
 */
export async function runAllBenchmarks(): Promise<string> {
  const benchmarks: ComponentBenchmark[] = [];

  for (const [componentPath, targets] of Object.entries(COMPONENT_TARGETS)) {
    const componentName = componentPath.replace('/', '-');
    const benchmark = await PerformanceBenchmark.runComponentBenchmark(
      `ds-${componentName}`,
      targets.size,
      targets.initTime,
      targets.eventTime
    );
    benchmarks.push(benchmark);
  }

  return PerformanceBenchmark.generateReport(benchmarks);
}

/**
 * Monitor lighting system performance
 */
export class LightingPerformanceMonitor {
  private calculations: number[] = [];
  private startTime: number = 0;

  startMonitoring(): void {
    this.startTime = performance.now();
    this.calculations = [];
  }

  recordCalculation(duration: number): void {
    this.calculations.push(duration);
  }

  getMetrics(): {
    totalCalculations: number;
    averageTime: number;
    peakTime: number;
    totalTime: number;
    calculationsPerSecond: number;
  } {
    if (this.calculations.length === 0) {
      return {
        totalCalculations: 0,
        averageTime: 0,
        peakTime: 0,
        totalTime: 0,
        calculationsPerSecond: 0,
      };
    }

    const totalTime = performance.now() - this.startTime;
    const averageTime =
      this.calculations.reduce((a, b) => a + b, 0) / this.calculations.length;
    const peakTime = Math.max(...this.calculations);

    return {
      totalCalculations: this.calculations.length,
      averageTime,
      peakTime,
      totalTime,
      calculationsPerSecond: (this.calculations.length / totalTime) * 1000,
    };
  }

  validatePerformance(): {
    averageTime: boolean;
    peakTime: boolean;
    calculationsPerSecond: boolean;
    overall: boolean;
  } {
    const metrics = this.getMetrics();

    const averageTime = metrics.averageTime <= 5; // ≤ 5ms target
    const peakTime = metrics.peakTime <= 16; // ≤ 16ms target (60fps)
    const calculationsPerSecond = metrics.calculationsPerSecond >= 60; // ≥ 60fps target
    const overall = averageTime && peakTime && calculationsPerSecond;

    return { averageTime, peakTime, calculationsPerSecond, overall };
  }
}

/**
 * CSS Performance Monitor
 */
export class CSSPerformanceMonitor {
  private propertyUpdates: number[] = [];
  private themeSwitchTime: number = 0;

  measurePropertyUpdate(propertyName: string, value: string): number {
    const start = performance.now();
    document.documentElement.style.setProperty(propertyName, value);
    const end = performance.now();
    const duration = end - start;

    this.propertyUpdates.push(duration);
    return duration;
  }

  measureThemeSwitch(_themeName: string): number {
    const start = performance.now();

    // Simulate theme switch by updating multiple properties
    const properties = [
      '--color-primary',
      '--color-secondary',
      '--color-background',
      '--color-text-primary',
      '--color-border',
    ];

    properties.forEach(prop => {
      document.documentElement.style.setProperty(prop, 'var(--color-gray-500)');
    });

    const end = performance.now();
    this.themeSwitchTime = end - start;
    return this.themeSwitchTime;
  }

  getMetrics(): {
    averagePropertyUpdate: number;
    peakPropertyUpdate: number;
    themeSwitchTime: number;
    totalUpdates: number;
  } {
    if (this.propertyUpdates.length === 0) {
      return {
        averagePropertyUpdate: 0,
        peakPropertyUpdate: 0,
        themeSwitchTime: this.themeSwitchTime,
        totalUpdates: 0,
      };
    }

    return {
      averagePropertyUpdate:
        this.propertyUpdates.reduce((a, b) => a + b, 0) /
        this.propertyUpdates.length,
      peakPropertyUpdate: Math.max(...this.propertyUpdates),
      themeSwitchTime: this.themeSwitchTime,
      totalUpdates: this.propertyUpdates.length,
    };
  }

  validatePerformance(): {
    propertyUpdate: boolean;
    themeSwitch: boolean;
    overall: boolean;
  } {
    const metrics = this.getMetrics();

    const propertyUpdate = metrics.averagePropertyUpdate <= 1; // ≤ 1ms target
    const themeSwitch = metrics.themeSwitchTime <= 50; // ≤ 50ms target
    const overall = propertyUpdate && themeSwitch;

    return { propertyUpdate, themeSwitch, overall };
  }
}
