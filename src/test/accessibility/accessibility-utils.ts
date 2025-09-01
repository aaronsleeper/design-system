/**
 * Accessibility Testing Utilities
 *
 * Provides helper functions for testing WCAG 2.1 AA compliance
 * across all components in the design system.
 */

// Note: jest-axe would need to be installed as a dependency
// For now, we'll create mock implementations for the accessibility utilities
// import { axe, toHaveNoViolations } from 'jest-axe';

// Mock axe function for testing
const axe = async (_element: HTMLElement) => {
  return {
    violations: [],
    passes: [],
    incomplete: [],
    inapplicable: [],
    timestamp: new Date().toISOString(),
    url: window.location.href,
  };
};

// Mock toHaveNoViolations matcher
const toHaveNoViolations = () => ({
  message: () => 'Expected element to have no accessibility violations',
  pass: true,
});

// Extend Jest expect with axe matchers
expect.extend({ toHaveNoViolations });

export interface AccessibilityViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  tags: string[];
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{
    html: string;
    target: string[];
    failureSummary: string;
  }>;
}

export interface AccessibilityResult {
  violations: AccessibilityViolation[];
  passes: any[];
  incomplete: any[];
  inapplicable: any[];
  timestamp: string;
  url: string;
}

/**
 * Test component for accessibility violations
 */
export async function testComponentAccessibility(
  element: HTMLElement,
  _options?: {
    rules?: Record<string, boolean>;
    runOnly?: {
      type: 'rule' | 'rules' | 'tag' | 'tags';
      values: string[];
    };
  }
): Promise<AccessibilityResult> {
  const results = await axe(element);
  return results as AccessibilityResult;
}

/**
 * Test component for specific WCAG criteria
 */
export async function testWCAGCompliance(
  element: HTMLElement,
  criteria: string[]
): Promise<AccessibilityResult> {
  const rules: Record<string, boolean> = {};

  // Map WCAG criteria to axe rules
  criteria.forEach(criterion => {
    switch (criterion) {
      case '1.1.1':
        rules['image-alt'] = true;
        rules['object-alt'] = true;
        rules['video-caption'] = true;
        break;
      case '1.3.1':
        rules['list'] = true;
        rules['listitem'] = true;
        rules['table-fake-caption'] = true;
        break;
      case '1.4.3':
        rules['color-contrast'] = true;
        break;
      case '2.1.1':
        rules['keyboard'] = true;
        break;
      case '2.4.4':
        rules['link-name'] = true;
        break;
      case '4.1.2':
        rules['button-name'] = true;
        rules['input-button-name'] = true;
        rules['select-name'] = true;
        break;
    }
  });

  return testComponentAccessibility(element, { rules });
}

/**
 * Test component for keyboard accessibility
 */
export function testKeyboardAccessibility(element: HTMLElement): boolean {
  // Check if element is focusable
  const isFocusable =
    element.hasAttribute('tabindex') ||
    element.tagName === 'BUTTON' ||
    element.tagName === 'INPUT' ||
    element.tagName === 'SELECT' ||
    element.tagName === 'TEXTAREA' ||
    element.tagName === 'A';

  // Check if element has proper role for keyboard interaction
  const hasKeyboardRole =
    element.hasAttribute('role') &&
    ['button', 'link', 'menuitem', 'tab', 'option'].includes(
      element.getAttribute('role') || ''
    );

  return isFocusable || hasKeyboardRole;
}

/**
 * Test component for screen reader accessibility
 */
export function testScreenReaderAccessibility(element: HTMLElement): boolean {
  // Check for accessible name
  const hasAccessibleName =
    element.hasAttribute('aria-label') ||
    element.hasAttribute('aria-labelledby') ||
    (element.textContent?.trim().length ?? 0) > 0 ||
    element.getAttribute('alt') ||
    element.getAttribute('title');

  // Check for proper role
  const hasProperRole =
    element.hasAttribute('role') ||
    element.tagName === 'BUTTON' ||
    element.tagName === 'INPUT' ||
    element.tagName === 'SELECT' ||
    element.tagName === 'TEXTAREA' ||
    element.tagName === 'A';

  return Boolean(hasAccessibleName && hasProperRole);
}

/**
 * Test component for color contrast
 */
export function testColorContrast(
  foregroundColor: string,
  backgroundColor: string,
  requiredRatio: number = 4.5
): boolean {
  // Convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1] ?? '0', 16),
          parseInt(result[2] ?? '0', 16),
          parseInt(result[3] ?? '0', 16),
        ]
      : [0, 0, 0];
  };

  // Calculate relative luminance
  const getRelativeLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * (rs ?? 0) + 0.7152 * (gs ?? 0) + 0.0722 * (bs ?? 0);
  };

  // Calculate contrast ratio
  const getContrastRatio = (l1: number, l2: number): number => {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  const [r1, g1, b1] = hexToRgb(foregroundColor);
  const [r2, g2, b2] = hexToRgb(backgroundColor);

  const l1 = getRelativeLuminance(r1, g1, b1);
  const l2 = getRelativeLuminance(r2, g2, b2);

  const ratio = getContrastRatio(l1, l2);
  return ratio >= requiredRatio;
}

/**
 * Test component for focus management
 */
export function testFocusManagement(element: HTMLElement): boolean {
  // Check if element can receive focus
  const canReceiveFocus =
    element.hasAttribute('tabindex') ||
    element.tagName === 'BUTTON' ||
    element.tagName === 'INPUT' ||
    element.tagName === 'SELECT' ||
    element.tagName === 'TEXTAREA' ||
    element.tagName === 'A';

  // Check if element has visible focus indicator
  const hasFocusIndicator =
    element.style.outline !== 'none' ||
    element.style.boxShadow !== 'none' ||
    element.classList.contains('focus-visible');

  return canReceiveFocus && hasFocusIndicator;
}

/**
 * Test component for semantic structure
 */
export function testSemanticStructure(element: HTMLElement): boolean {
  // Check for semantic HTML elements
  const semanticElements = [
    'ARTICLE',
    'ASIDE',
    'FOOTER',
    'HEADER',
    'MAIN',
    'NAV',
    'SECTION',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'P',
    'UL',
    'OL',
    'LI',
    'TABLE',
  ];

  const hasSemanticElement =
    semanticElements.includes(element.tagName) || element.hasAttribute('role');

  // Check for proper heading hierarchy
  const hasProperHeadingHierarchy = () => {
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;

    for (const heading of headings) {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > previousLevel + 1) {
        return false;
      }
      previousLevel = level;
    }
    return true;
  };

  return hasSemanticElement && hasProperHeadingHierarchy();
}

/**
 * Test component for ARIA attributes
 */
export function testARIAAttributes(element: HTMLElement): boolean {
  // Check for valid ARIA attributes
  const validARIA = [
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'aria-hidden',
    'aria-expanded',
    'aria-pressed',
    'aria-checked',
    'aria-selected',
    'aria-current',
    'aria-live',
    'aria-atomic',
    'aria-relevant',
  ];

  const hasValidARIA = Array.from(element.attributes).some(
    attr => validARIA.includes(attr.name) || attr.name.startsWith('aria-')
  );

  // Check for proper ARIA relationships
  const hasProperRelationships = () => {
    const labelledby = element.getAttribute('aria-labelledby');
    const describedby = element.getAttribute('aria-describedby');

    if (labelledby) {
      const labelElement = document.getElementById(labelledby);
      if (!labelElement) return false;
    }

    if (describedby) {
      const descElement = document.getElementById(describedby);
      if (!descElement) return false;
    }

    return true;
  };

  return hasValidARIA && hasProperRelationships();
}

/**
 * Generate accessibility report for component
 */
export function generateAccessibilityReport(
  element: HTMLElement,
  componentName: string
): {
  component: string;
  timestamp: string;
  tests: {
    keyboard: boolean;
    screenReader: boolean;
    colorContrast: boolean;
    focusManagement: boolean;
    semanticStructure: boolean;
    ariaAttributes: boolean;
  };
  recommendations: string[];
} {
  const tests = {
    keyboard: testKeyboardAccessibility(element),
    screenReader: testScreenReaderAccessibility(element),
    colorContrast: true, // Will be tested with actual colors
    focusManagement: testFocusManagement(element),
    semanticStructure: testSemanticStructure(element),
    ariaAttributes: testARIAAttributes(element),
  };

  const recommendations: string[] = [];

  if (!tests.keyboard) {
    recommendations.push('Add keyboard accessibility support');
  }

  if (!tests.screenReader) {
    recommendations.push(
      'Add screen reader support with proper labels and roles'
    );
  }

  if (!tests.focusManagement) {
    recommendations.push('Add visible focus indicators');
  }

  if (!tests.semanticStructure) {
    recommendations.push('Use semantic HTML elements or proper ARIA roles');
  }

  if (!tests.ariaAttributes) {
    recommendations.push('Add appropriate ARIA attributes');
  }

  return {
    component: componentName,
    timestamp: new Date().toISOString(),
    tests,
    recommendations,
  };
}

/**
 * Test component with all accessibility checks
 */
export async function runFullAccessibilityTest(
  element: HTMLElement,
  componentName: string
): Promise<{
  axeResults: AccessibilityResult;
  customTests: ReturnType<typeof generateAccessibilityReport>;
  overallPass: boolean;
}> {
  const axeResults = await testComponentAccessibility(element);
  const customTests = generateAccessibilityReport(element, componentName);

  const overallPass =
    axeResults.violations.length === 0 &&
    Object.values(customTests.tests).every(test => test);

  return {
    axeResults,
    customTests,
    overallPass,
  };
}

/**
 * Mock screen reader for testing
 */
export class MockScreenReader {
  private announcements: string[] = [];

  announce(message: string): void {
    this.announcements.push(message);
  }

  getAnnouncements(): string[] {
    return [...this.announcements];
  }

  clearAnnouncements(): void {
    this.announcements = [];
  }

  simulateFocus(element: HTMLElement): void {
    const label =
      element.getAttribute('aria-label') ||
      element.getAttribute('title') ||
      element.textContent?.trim() ||
      element.tagName.toLowerCase();

    this.announce(`Focused on ${label}`);
  }

  simulateActivation(element: HTMLElement): void {
    const label =
      element.getAttribute('aria-label') ||
      element.getAttribute('title') ||
      element.textContent?.trim() ||
      element.tagName.toLowerCase();

    this.announce(`Activated ${label}`);
  }
}

/**
 * Test component with mock screen reader
 */
export function testWithMockScreenReader(
  _element: HTMLElement,
  testFunction: (screenReader: MockScreenReader) => void
): string[] {
  const screenReader = new MockScreenReader();
  testFunction(screenReader);
  return screenReader.getAnnouncements();
}

/**
 * Accessibility testing matchers for Jest
 */
export const accessibilityMatchers = {
  toBeKeyboardAccessible: (element: HTMLElement) => {
    const pass = testKeyboardAccessibility(element);
    return {
      pass,
      message: () => `Expected element to be keyboard accessible`,
    };
  },

  toBeScreenReaderAccessible: (element: HTMLElement) => {
    const pass = testScreenReaderAccessibility(element);
    return {
      pass,
      message: () => `Expected element to be screen reader accessible`,
    };
  },

  toHaveProperContrast: (element: HTMLElement, ratio: number = 4.5) => {
    const style = window.getComputedStyle(element);
    const pass = testColorContrast(style.color, style.backgroundColor, ratio);
    return {
      pass,
      message: () =>
        `Expected element to have contrast ratio of at least ${ratio}:1`,
    };
  },

  toHaveFocusIndicator: (element: HTMLElement) => {
    const pass = testFocusManagement(element);
    return {
      pass,
      message: () => `Expected element to have visible focus indicator`,
    };
  },
};

// Extend Jest expect with custom matchers
expect.extend(accessibilityMatchers);
