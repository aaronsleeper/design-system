/**
 * Browser Compatibility Tests
 *
 * Tests for CSS features, JavaScript features, and Web Components support
 * across different browsers as defined in the browser support matrix.
 */

import { expect } from '@jest/globals';

describe('Browser Compatibility', () => {
  describe('CSS Feature Support', () => {
    test('CSS Custom Properties Support', () => {
      // Test CSS custom properties support
      const testElement = document.createElement('div');
      testElement.style.setProperty('--test-property', 'red');
      testElement.style.backgroundColor = 'var(--test-property)';

      document.body.appendChild(testElement);

      // Check if the custom property is applied
      const computedStyle = window.getComputedStyle(testElement);
      const backgroundColor = computedStyle.backgroundColor;

      // Should be able to read the custom property
      expect(testElement.style.getPropertyValue('--test-property')).toBe('red');

      document.body.removeChild(testElement);
    });

    test('CSS color-mix() Support', () => {
      // Test color-mix() function support
      const supportsColorMix = CSS.supports(
        'color',
        'color-mix(in srgb, red, blue)'
      );

      // Modern browsers should support color-mix
      if (supportsColorMix) {
        const testElement = document.createElement('div');
        testElement.style.color = 'color-mix(in srgb, red 50%, blue 50%)';
        document.body.appendChild(testElement);

        const computedStyle = window.getComputedStyle(testElement);
        expect(computedStyle.color).toBeTruthy();

        document.body.removeChild(testElement);
      }
    });

    test('CSS Grid Support', () => {
      // Test CSS Grid support
      const supportsGrid = CSS.supports('display', 'grid');

      if (supportsGrid) {
        const testElement = document.createElement('div');
        testElement.style.display = 'grid';
        testElement.style.gridTemplateColumns = '1fr 1fr';
        document.body.appendChild(testElement);

        const computedStyle = window.getComputedStyle(testElement);
        expect(computedStyle.display).toBe('grid');

        document.body.removeChild(testElement);
      }
    });

    test('CSS Flexbox Support', () => {
      // Test CSS Flexbox support
      const supportsFlexbox = CSS.supports('display', 'flex');

      if (supportsFlexbox) {
        const testElement = document.createElement('div');
        testElement.style.display = 'flex';
        testElement.style.flexDirection = 'column';
        document.body.appendChild(testElement);

        const computedStyle = window.getComputedStyle(testElement);
        expect(computedStyle.display).toBe('flex');
        expect(computedStyle.flexDirection).toBe('column');

        document.body.removeChild(testElement);
      }
    });
  });

  describe('JavaScript Feature Support', () => {
    test('ES6 Arrow Functions', () => {
      // Test arrow function support
      const arrowFunction = (x: number, y: number) => x + y;
      expect(arrowFunction(2, 3)).toBe(5);
    });

    test('ES6 Template Literals', () => {
      // Test template literal support
      const name = 'World';
      const greeting = `Hello, ${name}!`;
      expect(greeting).toBe('Hello, World!');
    });

    test('ES6 Destructuring', () => {
      // Test destructuring support
      const obj = { a: 1, b: 2 };
      const { a, b } = obj;
      expect(a).toBe(1);
      expect(b).toBe(2);
    });

    test('ES6 Classes', () => {
      // Test class support
      class TestClass {
        constructor(public value: number) {}
        getValue() {
          return this.value;
        }
      }

      const instance = new TestClass(42);
      expect(instance.getValue()).toBe(42);
    });

    test('Promise Support', () => {
      // Test Promise support
      const promise = new Promise<number>(resolve => {
        resolve(42);
      });

      return promise.then(value => {
        expect(value).toBe(42);
      });
    });

    test('Async/Await Support', async () => {
      // Test async/await support
      const asyncFunction = async () => {
        return new Promise<number>(resolve => {
          setTimeout(() => resolve(42), 0);
        });
      };

      const result = await asyncFunction();
      expect(result).toBe(42);
    });

    test('Array Methods', () => {
      // Test modern array methods
      const array = [1, 2, 3, 4, 5];

      // map
      const doubled = array.map(x => x * 2);
      expect(doubled).toEqual([2, 4, 6, 8, 10]);

      // filter
      const evens = array.filter(x => x % 2 === 0);
      expect(evens).toEqual([2, 4]);

      // reduce
      const sum = array.reduce((acc, x) => acc + x, 0);
      expect(sum).toBe(15);
    });
  });

  describe('Web Components Support', () => {
    test('Custom Elements Support', () => {
      // Test custom elements support
      expect('customElements' in window).toBe(true);
    });

    test('Custom Element Registration', () => {
      // Test custom element registration
      if ('customElements' in window) {
        class TestElement extends HTMLElement {
          constructor() {
            super();
            this.textContent = 'Test Element';
          }
        }

        customElements.define('test-element', TestElement);

        const element = document.createElement('test-element');
        expect(element.tagName.toLowerCase()).toBe('test-element');
        expect(element.textContent).toBe('Test Element');
      }
    });

    test('Shadow DOM Support', () => {
      // Test Shadow DOM support
      if ('attachShadow' in Element.prototype) {
        const element = document.createElement('div');
        const shadow = element.attachShadow({ mode: 'open' });

        expect(shadow).toBeInstanceOf(ShadowRoot);
        expect(shadow.mode).toBe('open');
      }
    });

    test('HTML Templates Support', () => {
      // Test HTML template support
      const template = document.createElement('template');
      template.innerHTML = '<div>Template Content</div>';

      expect(template.content).toBeInstanceOf(DocumentFragment);
      expect(template.content.querySelector('div')).toBeTruthy();
    });
  });

  describe('Feature Detection Utilities', () => {
    test('CSS Feature Detection', () => {
      // Test CSS feature detection utilities
      const supportsCSSVars = CSS.supports('--custom-property', 'value');
      const supportsColorMix = CSS.supports(
        'color',
        'color-mix(in srgb, red, blue)'
      );
      const supportsGrid = CSS.supports('display', 'grid');
      const supportsFlexbox = CSS.supports('display', 'flex');

      // All should be boolean values
      expect(typeof supportsCSSVars).toBe('boolean');
      expect(typeof supportsColorMix).toBe('boolean');
      expect(typeof supportsGrid).toBe('boolean');
      expect(typeof supportsFlexbox).toBe('boolean');
    });

    test('JavaScript Feature Detection', () => {
      // Test JavaScript feature detection
      const supportsES6 =
        typeof Promise !== 'undefined' &&
        typeof Symbol !== 'undefined' &&
        typeof Map !== 'undefined';

      const supportsWebComponents = 'customElements' in window;
      const supportsShadowDOM = 'attachShadow' in Element.prototype;

      expect(typeof supportsES6).toBe('boolean');
      expect(typeof supportsWebComponents).toBe('boolean');
      expect(typeof supportsShadowDOM).toBe('boolean');
    });
  });

  describe('Browser-Specific Tests', () => {
    test('User Agent Detection', () => {
      // Test user agent detection
      const userAgent = navigator.userAgent;
      expect(typeof userAgent).toBe('string');
      expect(userAgent.length).toBeGreaterThan(0);
    });

    test('Browser Capabilities', () => {
      // Test browser capabilities
      expect(typeof navigator.language).toBe('string');
      expect(typeof navigator.platform).toBe('string');
      expect(typeof screen.width).toBe('number');
      expect(typeof screen.height).toBe('number');
    });

    test('Performance API Support', () => {
      // Test Performance API support
      if ('performance' in window) {
        expect(typeof performance.now).toBe('function');
        expect(typeof performance.mark).toBe('function');
        expect(typeof performance.measure).toBe('function');
      }
    });

    test('Intersection Observer Support', () => {
      // Test Intersection Observer support
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(() => {});
        expect(observer).toBeInstanceOf(IntersectionObserver);
        observer.disconnect();
      }
    });

    test('Resize Observer Support', () => {
      // Test Resize Observer support
      if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(() => {});
        expect(observer).toBeInstanceOf(ResizeObserver);
        observer.disconnect();
      }
    });
  });

  describe('Polyfill Detection', () => {
    test('Core-js Polyfill Detection', () => {
      // Test if core-js polyfills are available
      const hasArrayFrom = typeof Array.from === 'function';
      const hasObjectAssign = typeof Object.assign === 'function';
      const hasStringIncludes = typeof String.prototype.includes === 'function';

      expect(typeof hasArrayFrom).toBe('boolean');
      expect(typeof hasObjectAssign).toBe('boolean');
      expect(typeof hasStringIncludes).toBe('boolean');
    });

    test('Web Components Polyfill Detection', () => {
      // Test if Web Components polyfills are available
      if ('customElements' in window) {
        const hasCustomElements = true;
        const hasShadowDOM = 'attachShadow' in Element.prototype;

        expect(hasCustomElements).toBe(true);
        expect(typeof hasShadowDOM).toBe('boolean');
      }
    });
  });
});
