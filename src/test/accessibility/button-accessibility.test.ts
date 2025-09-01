/**
 * Button Component Accessibility Tests
 *
 * Demonstrates comprehensive accessibility testing for the Button component
 * following WCAG 2.1 AA guidelines.
 */

import { expect } from '@jest/globals';
import {
  testComponentAccessibility,
  testWCAGCompliance,
  testKeyboardAccessibility,
  testScreenReaderAccessibility,
  testColorContrast,
  testFocusManagement,
  testSemanticStructure,
  testARIAAttributes,
  generateAccessibilityReport,
  runFullAccessibilityTest,
  MockScreenReader,
  testWithMockScreenReader,
} from './accessibility-utils';

describe('Button Accessibility', () => {
  let button: HTMLElement;

  beforeEach(() => {
    // Create a button element for testing
    button = document.createElement('button');
    button.textContent = 'Click me';
    button.setAttribute('type', 'button');
    document.body.appendChild(button);
  });

  afterEach(() => {
    document.body.removeChild(button);
  });

  describe('WCAG 2.1 AA Compliance', () => {
    test('should not have accessibility violations', async () => {
      const results = await testComponentAccessibility(button);
      expect(results.violations).toHaveLength(0);
    });

    test('should meet specific WCAG criteria', async () => {
      const results = await testWCAGCompliance(button, [
        '1.1.1', // Non-text Content
        '2.1.1', // Keyboard
        '2.4.4', // Link Purpose
        '4.1.2', // Name, Role, Value
      ]);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('Keyboard Accessibility', () => {
    test('should be keyboard accessible', () => {
      expect(testKeyboardAccessibility(button)).toBe(true);
    });

    test('should have proper tabindex', () => {
      expect(button.getAttribute('tabindex')).toBe('0');
    });

    test('should respond to Enter key', () => {
      const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      let activated = false;

      button.addEventListener('click', () => {
        activated = true;
      });

      button.dispatchEvent(mockEvent);
      expect(activated).toBe(true);
    });

    test('should respond to Space key', () => {
      const mockEvent = new KeyboardEvent('keydown', { key: ' ' });
      let activated = false;

      button.addEventListener('click', () => {
        activated = true;
      });

      button.dispatchEvent(mockEvent);
      expect(activated).toBe(true);
    });
  });

  describe('Screen Reader Accessibility', () => {
    test('should be screen reader accessible', () => {
      expect(testScreenReaderAccessibility(button)).toBe(true);
    });

    test('should have accessible name', () => {
      expect(button.textContent?.trim()).toBe('Click me');
    });

    test('should work with aria-label', () => {
      button.setAttribute('aria-label', 'Submit form');
      expect(button.getAttribute('aria-label')).toBe('Submit form');
    });

    test('should work with aria-labelledby', () => {
      const label = document.createElement('label');
      label.id = 'button-label';
      label.textContent = 'Submit form';
      document.body.appendChild(label);

      button.setAttribute('aria-labelledby', 'button-label');
      expect(button.getAttribute('aria-labelledby')).toBe('button-label');

      document.body.removeChild(label);
    });

    test('should announce properly with screen reader', () => {
      const announcements = testWithMockScreenReader(button, screenReader => {
        screenReader.simulateFocus(button);
        screenReader.simulateActivation(button);
      });

      expect(announcements).toContain('Focused on Click me');
      expect(announcements).toContain('Activated Click me');
    });
  });

  describe('Color Contrast', () => {
    test('should meet contrast requirements', () => {
      // Set test colors
      button.style.color = '#ffffff';
      button.style.backgroundColor = '#000000';

      expect(testColorContrast('#ffffff', '#000000', 4.5)).toBe(true);
    });

    test('should meet contrast requirements with different colors', () => {
      // Test with various color combinations
      const testCases = [
        { foreground: '#ffffff', background: '#000000', expected: true },
        { foreground: '#000000', background: '#ffffff', expected: true },
        { foreground: '#666666', background: '#ffffff', expected: false },
      ];

      testCases.forEach(({ foreground, background, expected }) => {
        expect(testColorContrast(foreground, background, 4.5)).toBe(expected);
      });
    });
  });

  describe('Focus Management', () => {
    test('should have focus management', () => {
      expect(testFocusManagement(button)).toBe(true);
    });

    test('should have visible focus indicator', () => {
      // Add focus styles
      button.style.outline = '2px solid #007acc';
      button.style.outlineOffset = '2px';

      expect(button.style.outline).not.toBe('none');
    });

    test('should receive focus programmatically', () => {
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    test('should maintain focus when clicked', () => {
      button.focus();
      button.click();
      expect(document.activeElement).toBe(button);
    });
  });

  describe('Semantic Structure', () => {
    test('should have semantic structure', () => {
      expect(testSemanticStructure(button)).toBe(true);
    });

    test('should have proper role', () => {
      expect(button.getAttribute('role')).toBe('button');
    });

    test('should have proper type attribute', () => {
      expect(button.getAttribute('type')).toBe('button');
    });
  });

  describe('ARIA Attributes', () => {
    test('should have proper ARIA attributes', () => {
      expect(testARIAAttributes(button)).toBe(true);
    });

    test('should support aria-pressed for toggle buttons', () => {
      button.setAttribute('aria-pressed', 'false');
      expect(button.getAttribute('aria-pressed')).toBe('false');
    });

    test('should support aria-expanded for expandable buttons', () => {
      button.setAttribute('aria-expanded', 'false');
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    test('should support aria-describedby', () => {
      const description = document.createElement('div');
      description.id = 'button-desc';
      description.textContent = 'This button submits the form';
      document.body.appendChild(description);

      button.setAttribute('aria-describedby', 'button-desc');
      expect(button.getAttribute('aria-describedby')).toBe('button-desc');

      document.body.removeChild(description);
    });
  });

  describe('State Management', () => {
    test('should announce state changes', () => {
      const announcements = testWithMockScreenReader(button, screenReader => {
        button.setAttribute('aria-pressed', 'true');
        screenReader.announce('Button pressed');
      });

      expect(announcements).toContain('Button pressed');
    });

    test('should handle disabled state', () => {
      button.setAttribute('disabled', '');
      expect(button.hasAttribute('disabled')).toBe(true);
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    test('should handle loading state', () => {
      button.setAttribute('aria-busy', 'true');
      expect(button.getAttribute('aria-busy')).toBe('true');
    });
  });

  describe('Accessibility Report', () => {
    test('should generate comprehensive accessibility report', () => {
      const report = generateAccessibilityReport(button, 'Button');

      expect(report.component).toBe('Button');
      expect(report.timestamp).toBeDefined();
      expect(report.tests).toBeDefined();
      expect(report.recommendations).toBeDefined();
    });

    test('should pass all accessibility tests', async () => {
      const results = await runFullAccessibilityTest(button, 'Button');

      expect(results.overallPass).toBe(true);
      expect(results.axeResults.violations).toHaveLength(0);
      expect(Object.values(results.customTests.tests).every(test => test)).toBe(
        true
      );
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty button', () => {
      const emptyButton = document.createElement('button');
      emptyButton.setAttribute('aria-label', 'Empty button');

      expect(testScreenReaderAccessibility(emptyButton)).toBe(true);
    });

    test('should handle button with only icon', () => {
      const iconButton = document.createElement('button');
      iconButton.innerHTML = '<svg aria-hidden="true"><!-- icon --></svg>';
      iconButton.setAttribute('aria-label', 'Icon button');

      expect(testScreenReaderAccessibility(iconButton)).toBe(true);
    });

    test('should handle button with complex content', () => {
      const complexButton = document.createElement('button');
      complexButton.innerHTML = `
        <span class="icon">📧</span>
        <span class="text">Send Email</span>
        <span class="badge">3</span>
      `;

      expect(testScreenReaderAccessibility(complexButton)).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    test('should work in form context', () => {
      const form = document.createElement('form');
      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'email';

      const label = document.createElement('label');
      label.setAttribute('for', 'email');
      label.textContent = 'Email';

      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(button);
      document.body.appendChild(form);

      expect(testSemanticStructure(form)).toBe(true);
      expect(input.getAttribute('id')).toBe(label.getAttribute('for'));

      document.body.removeChild(form);
    });

    test('should work in navigation context', () => {
      const nav = document.createElement('nav');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      button1.textContent = 'Previous';
      button2.textContent = 'Next';

      nav.appendChild(button1);
      nav.appendChild(button2);
      document.body.appendChild(nav);

      expect(testSemanticStructure(nav)).toBe(true);

      document.body.removeChild(nav);
    });
  });
});
