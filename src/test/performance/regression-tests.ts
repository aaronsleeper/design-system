/**
 * Performance Regression Testing Utilities
 *
 * This module provides utilities for detecting performance regressions
 * and maintaining performance baselines
 */

import { PerformanceBenchmark, ComponentBenchmark } from './benchmarks';

export interface PerformanceBaseline {
  version: string;
  timestamp: Date;
  bundleSizes: {
    esm: number;
    umd: number;
    css: number;
  };
  componentBenchmarks: ComponentBenchmark[];
  runtimeMetrics: {
    averageInitTime: number;
    averageEventTime: number;
    memoryUsage: number;
  };
}

export interface RegressionResult {
  hasRegression: boolean;
  regressions: Array<{
    metric: string;
    current: number;
    baseline: number;
    threshold: number;
    severity: 'low' | 'medium' | 'high';
  }>;
  improvements: Array<{
    metric: string;
    current: number;
    baseline: number;
    improvement: number;
  }>;
}

export class PerformanceRegressionTester {
  private baselines: Map<string, PerformanceBaseline> = new Map();

  /**
   * Load performance baselines from storage
   */
  loadBaselines(): void {
    try {
      const stored = localStorage.getItem('performance-baselines');
      if (stored) {
        const data = JSON.parse(stored);
        Object.entries(data).forEach(([version, baseline]) => {
          this.baselines.set(version, {
            ...baseline,
            timestamp: new Date(baseline.timestamp),
          });
        });
      }
    } catch (error) {
      console.warn('Failed to load performance baselines:', error);
    }
  }

  /**
   * Save performance baselines to storage
   */
  saveBaselines(): void {
    try {
      const data = Object.fromEntries(this.baselines);
      localStorage.setItem('performance-baselines', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save performance baselines:', error);
    }
  }

  /**
   * Create a new performance baseline
   */
  async createBaseline(version: string): Promise<PerformanceBaseline> {
    const bundleSizes = {
      esm: await PerformanceBenchmark.getBundleSize(
        'dist/design-system.esm.js'
      ),
      umd: await PerformanceBenchmark.getBundleSize(
        'dist/design-system.umd.js'
      ),
      css: await PerformanceBenchmark.getBundleSize('dist/design-system.css'),
    };

    // Run component benchmarks
    const componentBenchmarks: ComponentBenchmark[] = [];
    const componentTargets = [
      {
        name: 'ds-button-primary',
        size: 5 * 1024,
        initTime: 100,
        eventTime: 16,
      },
      { name: 'ds-input-text', size: 2 * 1024, initTime: 50, eventTime: 8 },
      { name: 'ds-grid', size: 3 * 1024, initTime: 75, eventTime: 16 },
    ];

    for (const target of componentTargets) {
      const benchmark = await PerformanceBenchmark.runComponentBenchmark(
        target.name,
        target.size,
        target.initTime,
        target.eventTime
      );
      componentBenchmarks.push(benchmark);
    }

    // Calculate runtime metrics
    const initTimes = componentBenchmarks.map(b => b.currentInitTime);
    const eventTimes = componentBenchmarks.map(b => b.currentEventTime);
    const runtimeMetrics = {
      averageInitTime: initTimes.reduce((a, b) => a + b, 0) / initTimes.length,
      averageEventTime:
        eventTimes.reduce((a, b) => a + b, 0) / eventTimes.length,
      memoryUsage: PerformanceBenchmark.getMemoryUsage(),
    };

    const baseline: PerformanceBaseline = {
      version,
      timestamp: new Date(),
      bundleSizes,
      componentBenchmarks,
      runtimeMetrics,
    };

    this.baselines.set(version, baseline);
    this.saveBaselines();

    return baseline;
  }

  /**
   * Get the latest baseline
   */
  getLatestBaseline(): PerformanceBaseline | null {
    const versions = Array.from(this.baselines.keys()).sort();
    return versions.length > 0
      ? this.baselines.get(versions[versions.length - 1])!
      : null;
  }

  /**
   * Compare current performance against baseline
   */
  async compareWithBaseline(
    baselineVersion: string
  ): Promise<RegressionResult> {
    const baseline = this.baselines.get(baselineVersion);
    if (!baseline) {
      throw new Error(`Baseline not found for version: ${baselineVersion}`);
    }

    const current = await this.createBaseline('current-comparison');
    const regressions: RegressionResult['regressions'] = [];
    const improvements: RegressionResult['improvements'] = [];

    // Check bundle size regressions
    const bundleThresholds = {
      esm: 0.05, // 5% increase limit
      umd: 0.05, // 5% increase limit
      css: 0.05, // 5% increase limit
    };

    Object.entries(bundleThresholds).forEach(([bundle, threshold]) => {
      const currentSize =
        current.bundleSizes[bundle as keyof typeof current.bundleSizes];
      const baselineSize =
        baseline.bundleSizes[bundle as keyof typeof baseline.bundleSizes];
      const increase = (currentSize - baselineSize) / baselineSize;

      if (increase > threshold) {
        regressions.push({
          metric: `${bundle} bundle size`,
          current: currentSize,
          baseline: baselineSize,
          threshold: threshold * 100,
          severity:
            increase > 0.1 ? 'high' : increase > 0.05 ? 'medium' : 'low',
        });
      } else if (increase < -0.01) {
        improvements.push({
          metric: `${bundle} bundle size`,
          current: currentSize,
          baseline: baselineSize,
          improvement: -increase * 100,
        });
      }
    });

    // Check runtime performance regressions
    const runtimeThresholds = {
      averageInitTime: 0.1, // 10% increase limit
      averageEventTime: 0.1, // 10% increase limit
      memoryUsage: 0.2, // 20% increase limit
    };

    Object.entries(runtimeThresholds).forEach(([metric, threshold]) => {
      const currentValue =
        current.runtimeMetrics[metric as keyof typeof current.runtimeMetrics];
      const baselineValue =
        baseline.runtimeMetrics[metric as keyof typeof baseline.runtimeMetrics];
      const increase = (currentValue - baselineValue) / baselineValue;

      if (increase > threshold) {
        regressions.push({
          metric,
          current: currentValue,
          baseline: baselineValue,
          threshold: threshold * 100,
          severity: increase > 0.2 ? 'high' : increase > 0.1 ? 'medium' : 'low',
        });
      } else if (increase < -0.05) {
        improvements.push({
          metric,
          current: currentValue,
          baseline: baselineValue,
          improvement: -increase * 100,
        });
      }
    });

    // Check component-specific regressions
    for (let i = 0; i < current.componentBenchmarks.length; i++) {
      const currentBenchmark = current.componentBenchmarks[i];
      const baselineBenchmark = baseline.componentBenchmarks[i];

      if (currentBenchmark && baselineBenchmark) {
        // Check initialization time regression
        const initIncrease =
          (currentBenchmark.currentInitTime -
            baselineBenchmark.currentInitTime) /
          baselineBenchmark.currentInitTime;
        if (initIncrease > 0.1) {
          regressions.push({
            metric: `${currentBenchmark.name} initialization time`,
            current: currentBenchmark.currentInitTime,
            baseline: baselineBenchmark.currentInitTime,
            threshold: 10,
            severity: initIncrease > 0.2 ? 'high' : 'medium',
          });
        }

        // Check event time regression
        const eventIncrease =
          (currentBenchmark.currentEventTime -
            baselineBenchmark.currentEventTime) /
          baselineBenchmark.currentEventTime;
        if (eventIncrease > 0.1) {
          regressions.push({
            metric: `${currentBenchmark.name} event time`,
            current: currentBenchmark.currentEventTime,
            baseline: baselineBenchmark.currentEventTime,
            threshold: 10,
            severity: eventIncrease > 0.2 ? 'high' : 'medium',
          });
        }
      }
    }

    return {
      hasRegression: regressions.length > 0,
      regressions,
      improvements,
    };
  }

  /**
   * Generate regression report
   */
  generateRegressionReport(result: RegressionResult): string {
    if (!result.hasRegression && result.improvements.length === 0) {
      return '✅ No performance changes detected';
    }

    let report = 'Performance Regression Report\n';
    report += '============================\n\n';

    if (result.hasRegression) {
      report += '❌ PERFORMANCE REGRESSIONS DETECTED:\n\n';
      result.regressions.forEach(regression => {
        const severity =
          regression.severity === 'high'
            ? '🔴'
            : regression.severity === 'medium'
            ? '🟡'
            : '🟠';
        report += `${severity} ${regression.metric}\n`;
        report += `  Current: ${regression.current.toFixed(2)}\n`;
        report += `  Baseline: ${regression.baseline.toFixed(2)}\n`;
        report += `  Threshold: ${regression.threshold}%\n`;
        report += `  Severity: ${regression.severity.toUpperCase()}\n\n`;
      });
    }

    if (result.improvements.length > 0) {
      report += '✅ PERFORMANCE IMPROVEMENTS:\n\n';
      result.improvements.forEach(improvement => {
        report += `🚀 ${improvement.metric}\n`;
        report += `  Current: ${improvement.current.toFixed(2)}\n`;
        report += `  Baseline: ${improvement.baseline.toFixed(2)}\n`;
        report += `  Improvement: ${improvement.improvement.toFixed(1)}%\n\n`;
      });
    }

    return report;
  }

  /**
   * Run automated regression test
   */
  async runRegressionTest(): Promise<RegressionResult> {
    this.loadBaselines();
    const latestBaseline = this.getLatestBaseline();

    if (!latestBaseline) {
      console.warn('No baseline found. Creating initial baseline...');
      await this.createBaseline('initial');
      return {
        hasRegression: false,
        regressions: [],
        improvements: [],
      };
    }

    const result = await this.compareWithBaseline(latestBaseline.version);
    console.log(this.generateRegressionReport(result));

    return result;
  }
}

/**
 * Bundle Size Monitor
 */
export class BundleSizeMonitor {
  private sizeLimits = {
    esm: 20 * 1024, // 20KB
    umd: 25 * 1024, // 25KB
    css: 20 * 1024, // 20KB
  };

  /**
   * Check if bundle sizes are within limits
   */
  async checkBundleSizes(): Promise<{
    passed: boolean;
    results: Array<{
      bundle: string;
      size: number;
      limit: number;
      passed: boolean;
      percentage: number;
    }>;
  }> {
    const results = [];

    for (const [bundle, limit] of Object.entries(this.sizeLimits)) {
      const size = await PerformanceBenchmark.getBundleSize(
        `dist/design-system.${bundle}.js`
      );
      const passed = size <= limit;
      const percentage = (size / limit) * 100;

      results.push({
        bundle,
        size,
        limit,
        passed,
        percentage,
      });
    }

    const passed = results.every(r => r.passed);

    return { passed, results };
  }

  /**
   * Generate bundle size report
   */
  generateBundleSizeReport(
    results: ReturnType<BundleSizeMonitor['checkBundleSizes']> extends Promise<
      infer T
    >
      ? T
      : never
  ): string {
    let report = 'Bundle Size Report\n';
    report += '=================\n\n';

    results.results.forEach(result => {
      const status = result.passed ? '✅' : '❌';
      const usage = `${result.percentage.toFixed(1)}%`;

      report += `${status} ${result.bundle.toUpperCase()} Bundle\n`;
      report += `  Size: ${(result.size / 1024).toFixed(1)}KB / ${(
        result.limit / 1024
      ).toFixed(1)}KB (${usage})\n\n`;
    });

    const overallStatus = results.passed
      ? '✅ All bundles within limits'
      : '❌ Some bundles exceed limits';
    report += `Overall: ${overallStatus}\n`;

    return report;
  }
}

/**
 * Performance Budget Enforcer
 */
export class PerformanceBudgetEnforcer {
  private budgets = {
    bundleSize: {
      esm: 20 * 1024,
      umd: 25 * 1024,
      css: 20 * 1024,
    },
    runtime: {
      maxInitTime: 100,
      maxEventTime: 16,
      maxMemoryUsage: 10 * 1024 * 1024, // 10MB
    },
    lighting: {
      maxShadowCalculation: 5,
      maxPositionUpdate: 2,
      minFrameRate: 60,
    },
  };

  /**
   * Enforce performance budgets
   */
  async enforceBudgets(): Promise<{
    passed: boolean;
    violations: Array<{
      category: string;
      metric: string;
      value: number;
      limit: number;
      severity: 'low' | 'medium' | 'high';
    }>;
  }> {
    const violations = [];

    // Check bundle size budgets
    for (const [bundle, limit] of Object.entries(this.budgets.bundleSize)) {
      const size = await PerformanceBenchmark.getBundleSize(
        `dist/design-system.${bundle}.js`
      );
      if (size > limit) {
        const severity =
          size > limit * 1.2 ? 'high' : size > limit * 1.1 ? 'medium' : 'low';
        violations.push({
          category: 'bundle-size',
          metric: `${bundle} bundle`,
          value: size,
          limit,
          severity,
        });
      }
    }

    // Check runtime budgets
    const memoryUsage = PerformanceBenchmark.getMemoryUsage();
    if (memoryUsage > this.budgets.runtime.maxMemoryUsage) {
      violations.push({
        category: 'runtime',
        metric: 'memory usage',
        value: memoryUsage,
        limit: this.budgets.runtime.maxMemoryUsage,
        severity:
          memoryUsage > this.budgets.runtime.maxMemoryUsage * 1.5
            ? 'high'
            : 'medium',
      });
    }

    return {
      passed: violations.length === 0,
      violations,
    };
  }

  /**
   * Generate budget enforcement report
   */
  generateBudgetReport(
    result: ReturnType<
      PerformanceBudgetEnforcer['enforceBudgets']
    > extends Promise<infer T>
      ? T
      : never
  ): string {
    if (result.passed) {
      return '✅ All performance budgets met';
    }

    let report = 'Performance Budget Violations\n';
    report += '============================\n\n';

    result.violations.forEach(violation => {
      const severity =
        violation.severity === 'high'
          ? '🔴'
          : violation.severity === 'medium'
          ? '🟡'
          : '🟠';
      report += `${severity} ${violation.category}: ${violation.metric}\n`;
      report += `  Value: ${(violation.value / 1024).toFixed(1)}KB\n`;
      report += `  Limit: ${(violation.limit / 1024).toFixed(1)}KB\n`;
      report += `  Severity: ${violation.severity.toUpperCase()}\n\n`;
    });

    return report;
  }
}

/**
 * Automated Performance Monitor
 */
export class AutomatedPerformanceMonitor {
  private interval: number = 60000; // 1 minute
  private timer: NodeJS.Timeout | null = null;
  private regressionTester: PerformanceRegressionTester;
  private bundleMonitor: BundleSizeMonitor;
  private budgetEnforcer: PerformanceBudgetEnforcer;

  constructor() {
    this.regressionTester = new PerformanceRegressionTester();
    this.bundleMonitor = new BundleSizeMonitor();
    this.budgetEnforcer = new PerformanceBudgetEnforcer();
  }

  /**
   * Start automated monitoring
   */
  startMonitoring(): void {
    if (this.timer) {
      return; // Already monitoring
    }

    this.timer = setInterval(() => {
      this.runPerformanceChecks();
    }, this.interval);

    console.log('Automated performance monitoring started');
  }

  /**
   * Stop automated monitoring
   */
  stopMonitoring(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      console.log('Automated performance monitoring stopped');
    }
  }

  /**
   * Run performance checks
   */
  private async runPerformanceChecks(): Promise<void> {
    try {
      console.log('Running automated performance checks...');

      // Check bundle sizes
      const bundleResults = await this.bundleMonitor.checkBundleSizes();
      if (!bundleResults.passed) {
        console.warn(
          'Bundle size violations detected:',
          this.bundleMonitor.generateBundleSizeReport(bundleResults)
        );
      }

      // Check performance budgets
      const budgetResults = await this.budgetEnforcer.enforceBudgets();
      if (!budgetResults.passed) {
        console.warn(
          'Performance budget violations detected:',
          this.budgetEnforcer.generateBudgetReport(budgetResults)
        );
      }

      // Run regression tests
      const regressionResults = await this.regressionTester.runRegressionTest();
      if (regressionResults.hasRegression) {
        console.warn(
          'Performance regressions detected:',
          this.regressionTester.generateRegressionReport(regressionResults)
        );
      }

      console.log('Performance checks completed');
    } catch (error) {
      console.error('Performance monitoring error:', error);
    }
  }
}

// Export singleton instance
export const performanceMonitor = new AutomatedPerformanceMonitor();
