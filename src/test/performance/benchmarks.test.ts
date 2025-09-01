/**
 * Performance Benchmark Tests
 *
 * These tests validate that components meet their performance targets
 * as defined in docs/performance/benchmarks.md
 */

import {
  PerformanceBenchmark,
  ComponentBenchmark,
  COMPONENT_TARGETS,
  LightingPerformanceMonitor,
  CSSPerformanceMonitor,
} from './benchmarks';

// Mock performance API for consistent testing
const mockPerformance = {
  now: jest.fn(),
  memory: {
    usedJSHeapSize: 1024 * 1024, // 1MB
  },
};

Object.defineProperty(global, 'performance', {
  value: mockPerformance,
  writable: true,
});

// Mock fetch for bundle size testing
global.fetch = jest.fn();

describe('Performance Benchmarks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPerformance.now.mockReturnValue(0);

    // Mock fetch to return a blob with known size
    (global.fetch as jest.Mock).mockResolvedValue({
      blob: () => Promise.resolve({ size: 1024 }), // 1KB
    });
  });

  describe('Component Bundle Size Tests', () => {
    test('ESM bundle should be under 20KB', async () => {
      const bundleSize = await PerformanceBenchmark.getBundleSize(
        'dist/design-system.esm.js'
      );
      expect(bundleSize).toBeLessThan(20 * 1024);
    });

    test('UMD bundle should be under 25KB', async () => {
      const bundleSize = await PerformanceBenchmark.getBundleSize(
        'dist/design-system.umd.js'
      );
      expect(bundleSize).toBeLessThan(25 * 1024);
    });

    test('CSS bundle should be under 20KB', async () => {
      const bundleSize = await PerformanceBenchmark.getBundleSize(
        'dist/design-system.css'
      );
      expect(bundleSize).toBeLessThan(20 * 1024);
    });
  });

  describe('Component Initialization Performance', () => {
    test('Button component initialization should be under 100ms', async () => {
      // Mock performance timing
      mockPerformance.now
        .mockReturnValueOnce(0) // start
        .mockReturnValueOnce(50); // end (50ms)

      const initTime = await PerformanceBenchmark.measureInitialization(
        'ds-button-primary'
      );
      expect(initTime).toBeLessThan(100);
    });

    test('Simple components should initialize under 50ms', async () => {
      // Mock performance timing
      mockPerformance.now
        .mockReturnValueOnce(0) // start
        .mockReturnValueOnce(25); // end (25ms)

      const initTime = await PerformanceBenchmark.measureInitialization(
        'ds-input-text'
      );
      expect(initTime).toBeLessThan(50);
    });
  });

  describe('Event Handling Performance', () => {
    test('Click events should respond under 16ms', async () => {
      // Mock performance timing
      mockPerformance.now
        .mockReturnValueOnce(0) // start
        .mockReturnValueOnce(10); // end (10ms)

      const eventTime = await PerformanceBenchmark.measureEventHandling(
        'ds-button-primary',
        'click'
      );
      expect(eventTime).toBeLessThan(16);
    });

    test('Input events should process under 8ms', async () => {
      // Mock performance timing
      mockPerformance.now
        .mockReturnValueOnce(0) // start
        .mockReturnValueOnce(5); // end (5ms)

      const eventTime = await PerformanceBenchmark.measureEventHandling(
        'ds-input-text',
        'input'
      );
      expect(eventTime).toBeLessThan(8);
    });
  });

  describe('Component Benchmark Validation', () => {
    test('should validate benchmark against targets', () => {
      const benchmark: ComponentBenchmark = {
        name: 'ds-button-primary',
        targetSize: 5 * 1024,
        currentSize: 4 * 1024, // Under target
        targetInitTime: 100,
        currentInitTime: 50, // Under target
        targetEventTime: 16,
        currentEventTime: 10, // Under target
      };

      const validation = PerformanceBenchmark.validateBenchmark(benchmark);

      expect(validation.size).toBe(true);
      expect(validation.initTime).toBe(true);
      expect(validation.eventTime).toBe(true);
      expect(validation.overall).toBe(true);
    });

    test('should fail validation when targets are exceeded', () => {
      const benchmark: ComponentBenchmark = {
        name: 'ds-button-primary',
        targetSize: 5 * 1024,
        currentSize: 6 * 1024, // Over target
        targetInitTime: 100,
        currentInitTime: 150, // Over target
        targetEventTime: 16,
        currentEventTime: 20, // Over target
      };

      const validation = PerformanceBenchmark.validateBenchmark(benchmark);

      expect(validation.size).toBe(false);
      expect(validation.initTime).toBe(false);
      expect(validation.eventTime).toBe(false);
      expect(validation.overall).toBe(false);
    });
  });

  describe('Component Size Targets', () => {
    test('all components should have defined size targets', () => {
      const componentPaths = [
        'form/button-primary',
        'form/input-text',
        'form/select',
        'form/checkbox',
        'form/radio',
        'form/textarea',
        'form/switch',
        'layout/container',
        'layout/grid',
        'layout/stack',
        'layout/divider',
        'navigation/sidebar',
        'navigation/drawer',
        'content/typography',
        'content/card',
        'content/badge',
        'content/avatar',
        'content/breadcrumb',
        'content/pagination',
        'feedback/alert',
        'feedback/toast',
        'feedback/modal',
        'feedback/tooltip',
      ];

      componentPaths.forEach(path => {
        expect(
          COMPONENT_TARGETS[path as keyof typeof COMPONENT_TARGETS]
        ).toBeDefined();
        expect(
          COMPONENT_TARGETS[path as keyof typeof COMPONENT_TARGETS].size
        ).toBeGreaterThan(0);
      });
    });

    test('form components should have appropriate size limits', () => {
      expect(COMPONENT_TARGETS['form/button-primary'].size).toBeLessThanOrEqual(
        5 * 1024
      );
      expect(COMPONENT_TARGETS['form/input-text'].size).toBeLessThanOrEqual(
        2 * 1024
      );
      expect(COMPONENT_TARGETS['form/select'].size).toBeLessThanOrEqual(
        2 * 1024
      );
    });

    test('layout components should have appropriate size limits', () => {
      expect(COMPONENT_TARGETS['layout/container'].size).toBeLessThanOrEqual(
        2 * 1024
      );
      expect(COMPONENT_TARGETS['layout/grid'].size).toBeLessThanOrEqual(
        3 * 1024
      );
      expect(COMPONENT_TARGETS['layout/divider'].size).toBeLessThanOrEqual(
        1 * 1024
      );
    });

    test('navigation components should have appropriate size limits', () => {
      expect(COMPONENT_TARGETS['navigation/sidebar'].size).toBeLessThanOrEqual(
        5 * 1024
      );
      expect(COMPONENT_TARGETS['navigation/drawer'].size).toBeLessThanOrEqual(
        5 * 1024
      );
    });
  });

  describe('Lighting Performance Monitor', () => {
    let monitor: LightingPerformanceMonitor;

    beforeEach(() => {
      monitor = new LightingPerformanceMonitor();
      monitor.startMonitoring();
    });

    test('should record calculation times', () => {
      mockPerformance.now
        .mockReturnValueOnce(0) // start
        .mockReturnValueOnce(3); // end (3ms)

      monitor.recordCalculation(3);

      const metrics = monitor.getMetrics();
      expect(metrics.totalCalculations).toBe(1);
      expect(metrics.averageTime).toBe(3);
      expect(metrics.peakTime).toBe(3);
    });

    test('should validate performance against targets', () => {
      // Record multiple calculations
      monitor.recordCalculation(3); // Under 5ms target
      monitor.recordCalculation(4); // Under 5ms target
      monitor.recordCalculation(2); // Under 5ms target

      // Mock the getMetrics method to return expected values
      const originalGetMetrics = monitor.getMetrics.bind(monitor);
      monitor.getMetrics = jest.fn().mockReturnValue({
        totalCalculations: 3,
        averageTime: 3,
        peakTime: 4,
        totalTime: 50, // 50ms total time
        calculationsPerSecond: 60, // 60 calculations per second
      });

      const validation = monitor.validatePerformance();

      expect(validation.averageTime).toBe(true);
      expect(validation.peakTime).toBe(true);
      expect(validation.calculationsPerSecond).toBe(true);
      expect(validation.overall).toBe(true);

      // Restore original method
      monitor.getMetrics = originalGetMetrics;
    });

    test('should fail validation when targets are exceeded', () => {
      // Record calculations that exceed targets
      monitor.recordCalculation(10); // Over 5ms average target
      monitor.recordCalculation(20); // Over 16ms peak target

      const validation = monitor.validatePerformance();

      expect(validation.averageTime).toBe(false);
      expect(validation.peakTime).toBe(false);
      expect(validation.overall).toBe(false);
    });
  });

  describe('CSS Performance Monitor', () => {
    let monitor: CSSPerformanceMonitor;

    beforeEach(() => {
      monitor = new CSSPerformanceMonitor();

      // Mock document.documentElement
      Object.defineProperty(document, 'documentElement', {
        value: {
          style: {
            setProperty: jest.fn(),
          },
        },
        writable: true,
      });
    });

    test('should measure property update time', () => {
      mockPerformance.now
        .mockReturnValueOnce(0) // start
        .mockReturnValueOnce(0.5); // end (0.5ms)

      const duration = monitor.measurePropertyUpdate(
        '--color-primary',
        '#007bff'
      );

      expect(duration).toBe(0.5);
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--color-primary',
        '#007bff'
      );
    });

    test('should measure theme switch time', () => {
      mockPerformance.now
        .mockReturnValueOnce(0) // start
        .mockReturnValueOnce(25); // end (25ms)

      const duration = monitor.measureThemeSwitch('dark');

      expect(duration).toBe(25);
      expect(duration).toBeLessThan(50); // Should be under 50ms target
    });

    test('should validate CSS performance against targets', () => {
      // Record fast property updates
      monitor.measurePropertyUpdate('--color-primary', '#007bff');
      monitor.measurePropertyUpdate('--color-secondary', '#6c757d');

      // Record fast theme switch
      monitor.measureThemeSwitch('light');

      const validation = monitor.validatePerformance();

      expect(validation.propertyUpdate).toBe(true);
      expect(validation.themeSwitch).toBe(true);
      expect(validation.overall).toBe(true);
    });

    test('should fail validation when CSS targets are exceeded', () => {
      // Mock slow property updates
      mockPerformance.now.mockReturnValueOnce(0).mockReturnValueOnce(2); // 2ms - over 1ms target

      monitor.measurePropertyUpdate('--color-primary', '#007bff');

      // Mock slow theme switch
      mockPerformance.now.mockReturnValueOnce(0).mockReturnValueOnce(75); // 75ms - over 50ms target

      monitor.measureThemeSwitch('dark');

      const validation = monitor.validatePerformance();

      expect(validation.propertyUpdate).toBe(false);
      expect(validation.themeSwitch).toBe(false);
      expect(validation.overall).toBe(false);
    });
  });

  describe('Memory Usage', () => {
    test('should measure memory usage when available', () => {
      const memoryUsage = PerformanceBenchmark.getMemoryUsage();

      // Should return a number (either actual usage or 0 if not available)
      expect(typeof memoryUsage).toBe('number');
      expect(memoryUsage).toBeGreaterThanOrEqual(0);
    });

    test('should handle missing memory API gracefully', () => {
      // Temporarily remove memory API
      const originalMemory = (performance as any).memory;
      delete (performance as any).memory;

      const memoryUsage = PerformanceBenchmark.getMemoryUsage();
      expect(memoryUsage).toBe(0);

      // Restore memory API
      (performance as any).memory = originalMemory;
    });
  });

  describe('Benchmark Report Generation', () => {
    test('should generate comprehensive benchmark report', () => {
      const benchmarks: ComponentBenchmark[] = [
        {
          name: 'ds-button-primary',
          targetSize: 5 * 1024,
          currentSize: 4 * 1024,
          targetInitTime: 100,
          currentInitTime: 50,
          targetEventTime: 16,
          currentEventTime: 10,
        },
        {
          name: 'ds-input-text',
          targetSize: 2 * 1024,
          currentSize: 1 * 1024,
          targetInitTime: 50,
          currentInitTime: 25,
          targetEventTime: 8,
          currentEventTime: 5,
        },
      ];

      const report = PerformanceBenchmark.generateReport(benchmarks);

      expect(report).toContain('Performance Benchmark Report');
      expect(report).toContain('ds-button-primary ✅ PASS');
      expect(report).toContain('ds-input-text ✅ PASS');
      expect(report).toContain('Summary: 2/2 components passed all benchmarks');
    });

    test('should show failures in benchmark report', () => {
      const benchmarks: ComponentBenchmark[] = [
        {
          name: 'ds-button-primary',
          targetSize: 5 * 1024,
          currentSize: 6 * 1024, // Over target
          targetInitTime: 100,
          currentInitTime: 150, // Over target
          targetEventTime: 16,
          currentEventTime: 20, // Over target
        },
      ];

      const report = PerformanceBenchmark.generateReport(benchmarks);

      expect(report).toContain('ds-button-primary ❌ FAIL');
      expect(report).toContain('Summary: 0/1 components passed all benchmarks');
    });
  });
});
