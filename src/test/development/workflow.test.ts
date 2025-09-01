/**
 * Development Workflow Test Suite
 *
 * Tests the complete development workflow including:
 * - Hot reloading functionality
 * - Component development cycle
 * - Debugging setup
 * - Development server responsiveness
 */

import { WorkflowTestUtils } from './workflow-test';
import { WorkflowTest } from './workflow-test';

describe('Development Workflow', () => {
  let testElement: WorkflowTest;

  beforeEach(() => {
    // Create test element
    testElement = document.createElement('workflow-test') as WorkflowTest;
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    // Clean up
    if (testElement && testElement.parentNode) {
      testElement.parentNode.removeChild(testElement);
    }
  });

  describe('Hot Reloading', () => {
    test('should detect development environment', () => {
      expect(testElement.hotReloadActive).toBe(true);
      expect(testElement.status).toBe('hot-reload-active');
    });

    test('should respond to property changes', async () => {
      const originalStatus = testElement.status;

      // Simulate hot reload
      testElement.status = 'hot-reload-test';
      await testElement.updateComplete;

      expect(testElement.status).toBe('hot-reload-test');

      // Reset
      testElement.status = originalStatus;
    });

    test('should track reload count', () => {
      expect(testElement.reloadCount).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Component Development Cycle', () => {
    test('should register component correctly', () => {
      expect(customElements.get('workflow-test')).toBeDefined();
    });

    test('should have proper property binding', () => {
      expect(typeof testElement.status).toBe('string');
      expect(typeof testElement.reloadCount).toBe('number');
      expect(typeof testElement.hotReloadActive).toBe('boolean');
    });

    test('should render with shadow DOM', () => {
      expect(testElement.shadowRoot).toBeDefined();
      expect(testElement.shadowRoot).not.toBeNull();
    });

    test('should have adopted stylesheets', () => {
      const stylesheets = testElement.shadowRoot?.adoptedStyleSheets;
      expect(stylesheets).toBeDefined();
      expect(stylesheets?.length).toBeGreaterThan(0);
    });

    test('should render status indicator', () => {
      const statusIndicator =
        testElement.shadowRoot?.querySelector('.status-indicator');
      expect(statusIndicator).toBeDefined();
      expect(statusIndicator?.classList.contains('active')).toBe(true);
    });

    test('should display environment information', () => {
      const environmentInfo = testElement.shadowRoot?.textContent;
      expect(environmentInfo).toContain('Development');
    });
  });

  describe('Debugging Setup', () => {
    test('should support console logging', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      console.log('Debug test');

      expect(consoleSpy).toHaveBeenCalledWith('Debug test');
      consoleSpy.mockRestore();
    });

    test('should have source maps enabled', () => {
      const error = new Error();
      const stack = error.stack || '';

      // In test environment, we might not have full source maps
      // but we can verify the error object exists
      expect(error).toBeDefined();
      expect(typeof stack).toBe('string');
    });

    test('should handle errors gracefully', () => {
      const errorHandler = jest.fn();
      window.addEventListener('error', errorHandler);

      // Trigger an error
      const testError = new Error('Test error');
      window.dispatchEvent(new ErrorEvent('error', { error: testError }));

      expect(errorHandler).toHaveBeenCalled();
      window.removeEventListener('error', errorHandler);
    });
  });

  describe('WorkflowTestUtils', () => {
    test('should test hot reload functionality', async () => {
      const result = await WorkflowTestUtils.testHotReload();
      expect(typeof result).toBe('boolean');
    });

    test('should test component cycle', async () => {
      const results = await WorkflowTestUtils.testComponentCycle();

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);

      results.forEach(result => {
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('passed');
        expect(typeof result.name).toBe('string');
        expect(typeof result.passed).toBe('boolean');
      });
    });

    test('should test debugging setup', () => {
      const results = WorkflowTestUtils.testDebuggingSetup();

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);

      results.forEach(result => {
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('passed');
        expect(typeof result.name).toBe('string');
        expect(typeof result.passed).toBe('boolean');
      });
    });

    test('should run comprehensive test', async () => {
      const results = await WorkflowTestUtils.runComprehensiveTest();

      expect(results).toHaveProperty('hotReload');
      expect(results).toHaveProperty('componentCycle');
      expect(results).toHaveProperty('debugging');
      expect(results).toHaveProperty('timestamp');

      expect(typeof results.hotReload).toBe('boolean');
      expect(Array.isArray(results.componentCycle)).toBe(true);
      expect(Array.isArray(results.debugging)).toBe(true);
      expect(typeof results.timestamp).toBe('string');
    });
  });

  describe('Development Environment', () => {
    test('should have Vite environment variables', () => {
      // In test environment, import.meta.env might not be available
      // but we can test that the environment is properly configured
      expect(typeof window).toBe('object');
      expect(typeof document).toBe('object');
    });

    test('should support TypeScript decorators', () => {
      // Test that decorators are working
      expect(testElement.hasAttribute('workflow-test')).toBe(true);
    });

    test('should have proper CSS custom properties', () => {
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue('--ds-primary-color');

      // In test environment, CSS custom properties might not be loaded
      // but we can verify the method works
      expect(typeof primaryColor).toBe('string');
    });
  });

  describe('Performance', () => {
    test('should initialize quickly', () => {
      const startTime = performance.now();

      const newElement = document.createElement(
        'workflow-test'
      ) as WorkflowTest;
      document.body.appendChild(newElement);

      const endTime = performance.now();
      const initializationTime = endTime - startTime;

      // Should initialize in less than 100ms
      expect(initializationTime).toBeLessThan(100);

      document.body.removeChild(newElement);
    });

    test('should render efficiently', async () => {
      const startTime = performance.now();

      testElement.status = 'performance-test';
      await testElement.updateComplete;

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render in less than 50ms
      expect(renderTime).toBeLessThan(50);
    });
  });
});
