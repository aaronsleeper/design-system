/**
 * Performance Testing Module
 *
 * This module provides comprehensive performance testing utilities for the design system.
 * It includes benchmarking, regression testing, monitoring, and reporting capabilities.
 */

// Core performance testing utilities
export {
  PerformanceBenchmark,
  ComponentBenchmark,
  COMPONENT_TARGETS,
  LightingPerformanceMonitor,
  CSSPerformanceMonitor,
  runAllBenchmarks,
} from './benchmarks';

// Performance regression testing
export {
  PerformanceRegressionTester,
  BundleSizeMonitor,
  PerformanceBudgetEnforcer,
  AutomatedPerformanceMonitor,
  performanceMonitor,
} from './regression-tests';

// Web Vitals and real user monitoring
export {
  WebVitalsMonitor,
  RealUserMonitor,
  webVitalsMonitor,
  realUserMonitor,
} from './web-vitals-monitor';

// Performance configuration management
export {
  PerformanceConfigManager,
  DEFAULT_PERFORMANCE_CONFIG,
  COMPONENT_PERFORMANCE_TARGETS,
  PERFORMANCE_TEST_ENVIRONMENTS,
  PERFORMANCE_TEST_SCENARIOS,
  PerformanceTestUtils,
  performanceConfigManager,
} from './performance-config';

// Re-export types for convenience
export type { PerformanceMetrics, ComponentBenchmark } from './benchmarks';

export type { PerformanceBaseline, RegressionResult } from './regression-tests';

export type {
  WebVitalsMetric,
  WebVitalsTargets,
  WebVitalsReport,
} from './web-vitals-monitor';

export type { PerformanceConfig } from './performance-config';

/**
 * Performance Testing API
 *
 * This class provides a unified interface for all performance testing functionality.
 */
export class PerformanceTestingAPI {
  private regressionTester: PerformanceRegressionTester;
  private bundleMonitor: BundleSizeMonitor;
  private budgetEnforcer: PerformanceBudgetEnforcer;
  private webVitalsMonitor: WebVitalsMonitor;
  private realUserMonitor: RealUserMonitor;
  private configManager: PerformanceConfigManager;

  constructor() {
    this.regressionTester = new PerformanceRegressionTester();
    this.bundleMonitor = new BundleSizeMonitor();
    this.budgetEnforcer = new PerformanceBudgetEnforcer();
    this.webVitalsMonitor = new WebVitalsMonitor();
    this.realUserMonitor = new RealUserMonitor();
    this.configManager = performanceConfigManager;
  }

  /**
   * Run comprehensive performance test suite
   */
  async runFullTestSuite(): Promise<{
    benchmarks: string;
    regression: any;
    bundleSize: any;
    budgets: any;
    webVitals: string;
    rum: string;
  }> {
    console.log('Starting comprehensive performance test suite...');

    // Run component benchmarks
    const benchmarks = await runAllBenchmarks();

    // Run regression tests
    const regression = await this.regressionTester.runRegressionTest();

    // Check bundle sizes
    const bundleSize = await this.bundleMonitor.checkBundleSizes();

    // Enforce performance budgets
    const budgets = await this.budgetEnforcer.enforceBudgets();

    // Get Web Vitals report
    const webVitals = this.webVitalsMonitor.generateReport();

    // Get RUM report
    const rum = this.realUserMonitor.getRUMReport();

    console.log('Performance test suite completed');

    return {
      benchmarks,
      regression,
      bundleSize,
      budgets,
      webVitals,
      rum,
    };
  }

  /**
   * Start all monitoring
   */
  startAllMonitoring(): void {
    this.webVitalsMonitor.startMonitoring();
    this.realUserMonitor.startMonitoring();
    performanceMonitor.startMonitoring();
    console.log('All performance monitoring started');
  }

  /**
   * Stop all monitoring
   */
  stopAllMonitoring(): void {
    this.webVitalsMonitor.clearMetrics();
    performanceMonitor.stopMonitoring();
    console.log('All performance monitoring stopped');
  }

  /**
   * Get comprehensive performance report
   */
  async getComprehensiveReport(): Promise<string> {
    const testResults = await this.runFullTestSuite();

    let report = 'Comprehensive Performance Report\n';
    report += '================================\n\n';

    report += `Generated: ${new Date().toISOString()}\n`;
    report += `Environment: ${PerformanceTestUtils.getCurrentEnvironment()}\n\n`;

    report += 'Component Benchmarks:\n';
    report += '====================\n';
    report += testResults.benchmarks + '\n\n';

    report += 'Regression Test Results:\n';
    report += '=======================\n';
    report +=
      this.regressionTester.generateRegressionReport(testResults.regression) +
      '\n\n';

    report += 'Bundle Size Report:\n';
    report += '==================\n';
    report +=
      this.bundleMonitor.generateBundleSizeReport(testResults.bundleSize) +
      '\n\n';

    report += 'Performance Budget Report:\n';
    report += '=========================\n';
    report +=
      this.budgetEnforcer.generateBudgetReport(testResults.budgets) + '\n\n';

    report += 'Web Vitals Report:\n';
    report += '==================\n';
    report += testResults.webVitals + '\n\n';

    report += 'Real User Monitoring Report:\n';
    report += '============================\n';
    report += testResults.rum + '\n';

    return report;
  }

  /**
   * Create performance baseline
   */
  async createBaseline(version: string): Promise<void> {
    await this.regressionTester.createBaseline(version);
    console.log(`Performance baseline created for version: ${version}`);
  }

  /**
   * Get performance configuration
   */
  getConfig(): PerformanceConfig {
    return this.configManager.getConfig();
  }

  /**
   * Update performance configuration
   */
  updateConfig(updates: Partial<PerformanceConfig>): void {
    this.configManager.updateConfig(updates);
    console.log('Performance configuration updated');
  }
}

// Export singleton instance
export const performanceTestingAPI = new PerformanceTestingAPI();

/**
 * Convenience functions for common performance testing tasks
 */

/**
 * Run quick performance check
 */
export async function quickPerformanceCheck(): Promise<boolean> {
  try {
    const bundleResults = await new BundleSizeMonitor().checkBundleSizes();
    const budgetResults =
      await new PerformanceBudgetEnforcer().enforceBudgets();

    return bundleResults.passed && budgetResults.passed;
  } catch (error) {
    console.error('Quick performance check failed:', error);
    return false;
  }
}

/**
 * Run performance regression test
 */
export async function runPerformanceRegressionTest(): Promise<boolean> {
  try {
    const regressionTester = new PerformanceRegressionTester();
    const result = await regressionTester.runRegressionTest();

    console.log(regressionTester.generateRegressionReport(result));
    return !result.hasRegression;
  } catch (error) {
    console.error('Performance regression test failed:', error);
    return false;
  }
}

/**
 * Start performance monitoring
 */
export function startPerformanceMonitoring(): void {
  performanceTestingAPI.startAllMonitoring();
}

/**
 * Stop performance monitoring
 */
export function stopPerformanceMonitoring(): void {
  performanceTestingAPI.stopAllMonitoring();
}

/**
 * Get performance report
 */
export async function getPerformanceReport(): Promise<string> {
  return await performanceTestingAPI.getComprehensiveReport();
}

/**
 * Create performance baseline
 */
export async function createPerformanceBaseline(
  version: string
): Promise<void> {
  await performanceTestingAPI.createBaseline(version);
}

/**
 * Check if performance testing is enabled
 */
export function isPerformanceTestingEnabled(): boolean {
  return PerformanceTestUtils.isPerformanceTestingEnabled();
}

/**
 * Get performance configuration
 */
export function getPerformanceConfig(): PerformanceConfig {
  return performanceConfigManager.getConfig();
}

/**
 * Update performance configuration
 */
export function updatePerformanceConfig(
  updates: Partial<PerformanceConfig>
): void {
  performanceConfigManager.updateConfig(updates);
}
