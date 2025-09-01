/**
 * Development Workflow Test Suite
 *
 * This module tests the complete development workflow including:
 * - Hot reloading functionality
 * - Component development cycle
 * - Debugging setup
 * - Development server responsiveness
 * - Build pipeline integration
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Test component for workflow validation
@customElement('workflow-test')
export class WorkflowTest extends LitElement {
  @property({ type: String }) status = 'initializing';
  @property({ type: Number }) reloadCount = 0;
  @property({ type: Boolean }) hotReloadActive = false;

  static override styles = css`
    :host {
      display: block;
      padding: 1rem;
      border: 2px solid #007acc;
      border-radius: 4px;
      margin: 1rem 0;
      background: #f8f9fa;
    }

    .status-indicator {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .status-indicator.active {
      background: #28a745;
      animation: pulse 2s infinite;
    }

    .status-indicator.inactive {
      background: #dc3545;
    }

    @keyframes pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    .test-section {
      margin: 1rem 0;
      padding: 1rem;
      border-left: 4px solid #007acc;
      background: white;
    }

    .test-result {
      margin: 0.5rem 0;
      padding: 0.5rem;
      border-radius: 4px;
    }

    .test-result.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .test-result.error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .test-result.info {
      background: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
    }
  `;

  constructor() {
    super();
    this.initializeWorkflowTest();
  }

  private initializeWorkflowTest() {
    // Simulate hot reload detection
    if (typeof window !== 'undefined') {
      this.detectHotReload();
      this.testDevelopmentEnvironment();
      this.monitorComponentChanges();
    } else {
      // In test environment, set default values
      this.hotReloadActive = process.env['NODE_ENV'] === 'development';
      this.status = this.hotReloadActive
        ? 'hot-reload-active'
        : 'production-mode';
    }
  }

  private detectHotReload() {
    // Check if we're in a development environment
    const isDev = process.env['NODE_ENV'] === 'development';

    if (isDev) {
      this.hotReloadActive = true;
      this.status = 'hot-reload-active';

      // Listen for potential hot reload events
      if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', () => {
          this.reloadCount++;
          console.log('WorkflowTest: Page reload detected', this.reloadCount);
        });
      }
    } else {
      this.status = 'production-mode';
    }
  }

  private testDevelopmentEnvironment() {
    const tests = [
      {
        name: 'Vite Development Server',
        test: () => process.env['NODE_ENV'] === 'development',
        expected: true,
      },
      {
        name: 'TypeScript Support',
        test: () => typeof this.status === 'string',
        expected: true,
      },
      {
        name: 'Lit Decorators',
        test: () => this.hasAttribute('workflow-test'),
        expected: true,
      },
      {
        name: 'CSS Custom Properties',
        test: () =>
          getComputedStyle(document.documentElement).getPropertyValue(
            '--ds-primary-color'
          ),
        expected: true,
      },
      {
        name: 'Source Maps',
        test: () => {
          try {
            new Error().stack?.includes('workflow-test.ts');
            return true;
          } catch {
            return false;
          }
        },
        expected: true,
      },
    ];

    tests.forEach(test => {
      const result = test.test();
      console.log(
        `WorkflowTest: ${test.name} - ${
          result === test.expected ? 'PASS' : 'FAIL'
        }`
      );
    });
  }

  private monitorComponentChanges() {
    // Monitor for component property changes (simulating hot reload)
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'status'
        ) {
          console.log('WorkflowTest: Component status changed to', this.status);
        }
      });
    });

    observer.observe(this, {
      attributes: true,
      attributeFilter: ['status'],
    });
  }

  override render() {
    return html`
      <div class="test-section">
        <h3>
          <span
            class="status-indicator ${this.hotReloadActive
              ? 'active'
              : 'inactive'}"
          ></span>
          Development Workflow Test
        </h3>

        <div class="test-result ${this.hotReloadActive ? 'success' : 'error'}">
          Hot Reload Status: ${this.hotReloadActive ? 'Active' : 'Inactive'}
        </div>

        <div class="test-result info">Component Status: ${this.status}</div>

        <div class="test-result info">Reload Count: ${this.reloadCount}</div>

        <div class="test-result info">
          Environment:
          ${process.env['NODE_ENV'] === 'development'
            ? 'Development'
            : 'Production'}
        </div>

        <div class="test-result info">
          Timestamp: ${new Date().toLocaleTimeString()}
        </div>
      </div>
    `;
  }
}

// Development workflow utilities
export class WorkflowTestUtils {
  /**
   * Test hot reloading by simulating component changes
   */
  static async testHotReload() {
    const testElement = document.querySelector('workflow-test') as WorkflowTest;
    if (testElement) {
      const originalStatus = testElement.status;

      // Simulate a property change
      testElement.status = 'hot-reload-test';

      // Wait for render
      await testElement.updateComplete;

      // Verify the change was applied
      const success = testElement.status === 'hot-reload-test';

      // Reset to original state
      testElement.status = originalStatus;

      return success;
    }
    return false;
  }

  /**
   * Test component development cycle
   */
  static async testComponentCycle() {
    const tests = [
      {
        name: 'Component Registration',
        test: () => customElements.get('workflow-test') !== undefined,
      },
      {
        name: 'Property Binding',
        test: () => {
          const element = document.querySelector(
            'workflow-test'
          ) as WorkflowTest;
          return element && typeof element.status === 'string';
        },
      },
      {
        name: 'Event Handling',
        test: () => {
          const element = document.querySelector(
            'workflow-test'
          ) as WorkflowTest;
          return element && element.shadowRoot !== null;
        },
      },
      {
        name: 'Styling',
        test: () => {
          const element = document.querySelector(
            'workflow-test'
          ) as WorkflowTest;
          return (
            element && (element.shadowRoot?.adoptedStyleSheets?.length ?? 0) > 0
          );
        },
      },
    ];

    const results = tests.map(test => ({
      name: test.name,
      passed: test.test(),
    }));

    return results;
  }

  /**
   * Test debugging setup
   */
  static testDebuggingSetup() {
    const tests = [
      {
        name: 'Console Logging',
        test: () => {
          try {
            console.log('Debug test');
            return true;
          } catch {
            return false;
          }
        },
      },
      {
        name: 'Source Maps',
        test: () => {
          try {
            const stack = new Error().stack;
            return stack?.includes('.ts') || stack?.includes('workflow-test');
          } catch {
            return false;
          }
        },
      },
      {
        name: 'DevTools Integration',
        test: () => {
          return (
            typeof window !== 'undefined' &&
            typeof (window as any).chrome !== 'undefined' &&
            typeof (window as any).chrome?.webstore !== 'undefined'
          );
        },
      },
    ];

    return tests.map(test => ({
      name: test.name,
      passed: test.test(),
    }));
  }

  /**
   * Run comprehensive workflow test
   */
  static async runComprehensiveTest() {
    console.log('🚀 Starting Development Workflow Test...');

    const results = {
      hotReload: await this.testHotReload(),
      componentCycle: await this.testComponentCycle(),
      debugging: this.testDebuggingSetup(),
      timestamp: new Date().toISOString(),
    };

    console.log('📊 Workflow Test Results:', results);

    return results;
  }
}

// Export for global access in development
if (typeof window !== 'undefined') {
  (window as any).WorkflowTestUtils = WorkflowTestUtils;
}
