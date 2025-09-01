/**
 * Web Vitals Performance Monitoring
 *
 * This module provides utilities for monitoring Core Web Vitals
 * and other performance metrics in real-world scenarios
 */

export interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
  timestamp: number;
}

export interface WebVitalsTargets {
  CLS: number; // Cumulative Layout Shift
  FID: number; // First Input Delay
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  TTFB: number; // Time to First Byte
}

export interface WebVitalsReport {
  metrics: WebVitalsMetric[];
  targets: WebVitalsTargets;
  passed: boolean;
  violations: Array<{
    metric: string;
    value: number;
    target: number;
    severity: 'low' | 'medium' | 'high';
  }>;
}

export class WebVitalsMonitor {
  private metrics: WebVitalsMetric[] = [];
  private targets: WebVitalsTargets = {
    CLS: 0.1, // Good: ≤ 0.1, Needs Improvement: 0.1-0.25, Poor: > 0.25
    FID: 100, // Good: ≤ 100ms, Needs Improvement: 100-300ms, Poor: > 300ms
    FCP: 1800, // Good: ≤ 1.8s, Needs Improvement: 1.8-3.0s, Poor: > 3.0s
    LCP: 2500, // Good: ≤ 2.5s, Needs Improvement: 2.5-4.0s, Poor: > 4.0s
    TTFB: 800, // Good: ≤ 800ms, Needs Improvement: 800-1800ms, Poor: > 1800ms
  };

  /**
   * Start monitoring Web Vitals
   */
  startMonitoring(): void {
    // Monitor Core Web Vitals
    this.monitorCLS();
    this.monitorFID();
    this.monitorFCP();
    this.monitorLCP();
    this.monitorTTFB();

    console.log('Web Vitals monitoring started');
  }

  /**
   * Monitor Cumulative Layout Shift (CLS)
   */
  private monitorCLS(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(list => {
          let clsValue = 0;
          let sessionValue = 0;
          let sessionEntries: PerformanceEntry[] = [];
          let lastSessionTime = 0;

          for (const entry of list.getEntries()) {
            // Only count layout shifts without recent user input
            if (!(entry as any).hadRecentInput) {
              const firstSessionEntry = sessionEntries[0];

              // If the entry occurred less than 1 second after the previous entry
              // and less than 5 seconds after the first entry in the session,
              // include the entry in the current session. Otherwise, start a new session.
              if (
                sessionValue &&
                entry.startTime - lastSessionTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000
              ) {
                sessionValue += (entry as any).value;
                sessionEntries.push(entry);
              } else {
                sessionValue = (entry as any).value;
                sessionEntries = [entry];
              }

              // If the current session value is larger than the current CLS value,
              // update CLS and its associated entries.
              if (sessionValue > clsValue) {
                clsValue = sessionValue;
              }

              lastSessionTime = entry.startTime;
            }
          }

          this.recordMetric({
            name: 'CLS',
            value: clsValue,
            delta: clsValue,
            id: `cls-${Date.now()}`,
            navigationType: 'navigate',
            timestamp: Date.now(),
          });
        });

        observer.observe({ type: 'layout-shift', buffered: true });
      } catch (error) {
        console.warn('CLS monitoring not supported:', error);
      }
    }
  }

  /**
   * Monitor First Input Delay (FID)
   */
  private monitorFID(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            const fid = (entry as any).processingStart - entry.startTime;

            this.recordMetric({
              name: 'FID',
              value: fid,
              delta: fid,
              id: `fid-${Date.now()}`,
              navigationType: 'navigate',
              timestamp: Date.now(),
            });
          }
        });

        observer.observe({ type: 'first-input', buffered: true });
      } catch (error) {
        console.warn('FID monitoring not supported:', error);
      }
    }
  }

  /**
   * Monitor First Contentful Paint (FCP)
   */
  private monitorFCP(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.recordMetric({
                name: 'FCP',
                value: entry.startTime,
                delta: entry.startTime,
                id: `fcp-${Date.now()}`,
                navigationType: 'navigate',
                timestamp: Date.now(),
              });
            }
          }
        });

        observer.observe({ type: 'paint', buffered: true });
      } catch (error) {
        console.warn('FCP monitoring not supported:', error);
      }
    }
  }

  /**
   * Monitor Largest Contentful Paint (LCP)
   */
  private monitorLCP(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          this.recordMetric({
            name: 'LCP',
            value: lastEntry.startTime,
            delta: lastEntry.startTime,
            id: `lcp-${Date.now()}`,
            navigationType: 'navigate',
            timestamp: Date.now(),
          });
        });

        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (error) {
        console.warn('LCP monitoring not supported:', error);
      }
    }
  }

  /**
   * Monitor Time to First Byte (TTFB)
   */
  private monitorTTFB(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navigationEntry = entry as PerformanceNavigationTiming;
              const ttfb =
                navigationEntry.responseStart - navigationEntry.requestStart;

              this.recordMetric({
                name: 'TTFB',
                value: ttfb,
                delta: ttfb,
                id: `ttfb-${Date.now()}`,
                navigationType: 'navigate',
                timestamp: Date.now(),
              });
            }
          }
        });

        observer.observe({ type: 'navigation', buffered: true });
      } catch (error) {
        console.warn('TTFB monitoring not supported:', error);
      }
    }
  }

  /**
   * Record a Web Vitals metric
   */
  private recordMetric(metric: WebVitalsMetric): void {
    this.metrics.push(metric);
    this.validateMetric(metric);
  }

  /**
   * Validate metric against targets
   */
  private validateMetric(metric: WebVitalsMetric): void {
    const target = this.targets[metric.name as keyof WebVitalsTargets];
    if (target && metric.value > target) {
      const severity = this.getSeverity(metric.name, metric.value, target);
      console.warn(`Web Vitals target exceeded for ${metric.name}:`, {
        value: metric.value,
        target,
        severity,
      });
    }
  }

  /**
   * Get severity level for a metric
   */
  private getSeverity(
    metricName: string,
    value: number,
    target: number
  ): 'low' | 'medium' | 'high' {
    const ratio = value / target;

    if (ratio > 2) return 'high';
    if (ratio > 1.5) return 'medium';
    return 'low';
  }

  /**
   * Get current Web Vitals report
   */
  getReport(): WebVitalsReport {
    const violations: WebVitalsReport['violations'] = [];

    // Group metrics by name and get the latest value for each
    const latestMetrics = new Map<string, WebVitalsMetric>();
    this.metrics.forEach(metric => {
      latestMetrics.set(metric.name, metric);
    });

    // Check each metric against targets
    latestMetrics.forEach((metric, name) => {
      const target = this.targets[name as keyof WebVitalsTargets];
      if (target && metric.value > target) {
        const severity = this.getSeverity(name, metric.value, target);
        violations.push({
          metric: name,
          value: metric.value,
          target,
          severity,
        });
      }
    });

    return {
      metrics: Array.from(latestMetrics.values()),
      targets: this.targets,
      passed: violations.length === 0,
      violations,
    };
  }

  /**
   * Generate Web Vitals report
   */
  generateReport(): string {
    const report = this.getReport();

    let output = 'Web Vitals Report\n';
    output += '================\n\n';

    if (report.passed) {
      output += '✅ All Web Vitals targets met\n\n';
    } else {
      output += '❌ Web Vitals targets exceeded\n\n';
    }

    // Show current metrics
    output += 'Current Metrics:\n';
    report.metrics.forEach(metric => {
      const target = this.targets[metric.name as keyof WebVitalsTargets];
      const status = target && metric.value <= target ? '✅' : '❌';
      const unit = metric.name === 'CLS' ? '' : 'ms';

      output += `  ${status} ${metric.name}: ${metric.value.toFixed(
        2
      )}${unit}\n`;
    });

    // Show violations
    if (report.violations.length > 0) {
      output += '\nViolations:\n';
      report.violations.forEach(violation => {
        const severity =
          violation.severity === 'high'
            ? '🔴'
            : violation.severity === 'medium'
            ? '🟡'
            : '🟠';
        const unit = violation.metric === 'CLS' ? '' : 'ms';

        output += `  ${severity} ${violation.metric}: ${violation.value.toFixed(
          2
        )}${unit} (target: ${violation.target}${unit})\n`;
      });
    }

    return output;
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
  }

  /**
   * Set custom targets
   */
  setTargets(targets: Partial<WebVitalsTargets>): void {
    this.targets = { ...this.targets, ...targets };
  }
}

/**
 * Real User Monitoring (RUM) Utilities
 */
export class RealUserMonitor {
  private webVitalsMonitor: WebVitalsMonitor;
  private customMetrics: Map<string, number[]> = new Map();
  private sessionId: string;

  constructor() {
    this.webVitalsMonitor = new WebVitalsMonitor();
    this.sessionId = this.generateSessionId();
  }

  /**
   * Start real user monitoring
   */
  startMonitoring(): void {
    this.webVitalsMonitor.startMonitoring();
    this.monitorCustomMetrics();
    this.trackUserInteractions();

    console.log('Real User Monitoring started');
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Monitor custom performance metrics
   */
  private monitorCustomMetrics(): void {
    // Monitor component initialization times
    this.monitorComponentPerformance();

    // Monitor event handling performance
    this.monitorEventPerformance();

    // Monitor memory usage
    this.monitorMemoryUsage();
  }

  /**
   * Monitor component performance
   */
  private monitorComponentPerformance(): void {
    const originalCreateElement = document.createElement;
    document.createElement = function (tagName: string) {
      const start = performance.now();
      const element = originalCreateElement.call(this, tagName);

      // If it's a design system component, measure initialization
      if (tagName.startsWith('ds-')) {
        requestAnimationFrame(() => {
          const end = performance.now();
          const initTime = end - start;

          // Record the metric
          const metrics = this.customMetrics.get('component-init-time') || [];
          metrics.push(initTime);
          this.customMetrics.set('component-init-time', metrics);
        });
      }

      return element;
    }.bind(this);
  }

  /**
   * Monitor event handling performance
   */
  private monitorEventPerformance(): void {
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: any,
      options?: any
    ) {
      const wrappedListener = function (event: Event) {
        const start = performance.now();
        const result = listener.call(this, event);
        const end = performance.now();

        const eventTime = end - start;
        const metrics = this.customMetrics.get('event-handling-time') || [];
        metrics.push(eventTime);
        this.customMetrics.set('event-handling-time', metrics);

        return result;
      }.bind(this);

      return originalAddEventListener.call(
        this,
        type,
        wrappedListener,
        options
      );
    };
  }

  /**
   * Monitor memory usage
   */
  private monitorMemoryUsage(): void {
    setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMemory = memory.usedJSHeapSize;

        const metrics = this.customMetrics.get('memory-usage') || [];
        metrics.push(usedMemory);
        this.customMetrics.set('memory-usage', metrics);
      }
    }, 5000); // Check every 5 seconds
  }

  /**
   * Track user interactions
   */
  private trackUserInteractions(): void {
    const interactionTypes = ['click', 'keydown', 'scroll', 'resize'];

    interactionTypes.forEach(type => {
      document.addEventListener(type, event => {
        const interaction = {
          type,
          timestamp: Date.now(),
          sessionId: this.sessionId,
          target: (event.target as Element)?.tagName || 'unknown',
        };

        // Send interaction data to analytics (placeholder)
        this.sendToAnalytics('user-interaction', interaction);
      });
    });
  }

  /**
   * Send data to analytics (placeholder implementation)
   */
  private sendToAnalytics(event: string, data: any): void {
    // In a real implementation, this would send data to an analytics service
    console.log('Analytics event:', event, data);
  }

  /**
   * Get custom metrics summary
   */
  getCustomMetricsSummary(): Record<
    string,
    {
      count: number;
      average: number;
      min: number;
      max: number;
      p95: number;
    }
  > {
    const summary: Record<string, any> = {};

    this.customMetrics.forEach((values, metricName) => {
      if (values.length === 0) return;

      const sorted = values.sort((a, b) => a - b);
      const count = values.length;
      const average = values.reduce((a, b) => a + b, 0) / count;
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      const p95Index = Math.floor(count * 0.95);
      const p95 = sorted[p95Index];

      summary[metricName] = {
        count,
        average: Math.round(average * 100) / 100,
        min: Math.round(min * 100) / 100,
        max: Math.round(max * 100) / 100,
        p95: Math.round(p95 * 100) / 100,
      };
    });

    return summary;
  }

  /**
   * Get comprehensive RUM report
   */
  getRUMReport(): string {
    const webVitalsReport = this.webVitalsMonitor.generateReport();
    const customMetrics = this.getCustomMetricsSummary();

    let report = 'Real User Monitoring Report\n';
    report += '===========================\n\n';

    report += webVitalsReport;
    report += '\n\n';

    if (Object.keys(customMetrics).length > 0) {
      report += 'Custom Metrics:\n';
      report += '==============\n\n';

      Object.entries(customMetrics).forEach(([metric, stats]) => {
        report += `${metric}:\n`;
        report += `  Count: ${stats.count}\n`;
        report += `  Average: ${stats.average}ms\n`;
        report += `  Min: ${stats.min}ms\n`;
        report += `  Max: ${stats.max}ms\n`;
        report += `  P95: ${stats.p95}ms\n\n`;
      });
    }

    report += `Session ID: ${this.sessionId}\n`;
    report += `Report generated: ${new Date().toISOString()}\n`;

    return report;
  }
}

// Export singleton instances
export const webVitalsMonitor = new WebVitalsMonitor();
export const realUserMonitor = new RealUserMonitor();
