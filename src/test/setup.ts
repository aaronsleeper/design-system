// Jest Test Setup
// Configuration for the testing environment

// Import testing utilities
import '@testing-library/jest-dom';

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock CSS custom properties with theme support
let currentTheme = 'light';

// Function to update theme for testing
(window as any).updateMockTheme = (theme: string) => {
  currentTheme = theme;
};

// Mock style property for elements
const mockStyleProperties = new Map<HTMLElement, Record<string, string>>();

Object.defineProperty(window, 'getComputedStyle', {
  value: (element: HTMLElement) => ({
    getPropertyValue: (prop: string) => {
      // Check if element has specific style properties
      const elementStyles = mockStyleProperties.get(element);
      if (elementStyles && elementStyles[prop]) {
        return elementStyles[prop];
      }

      // Check if it's a CSS custom property
      if (prop.startsWith('--')) {
        const properties: Record<string, string> = {
          // Base hue tokens
          '--hue-purple': '#8b5cf6',
          '--hue-yellow': '#eab308',
          '--hue-orange': '#f97316',
          '--hue-red': '#ef4444',
          '--hue-blue': '#3b82f6',
          '--hue-teal': '#14b8a6',
          '--hue-green': '#22c55e',
          '--hue-magenta': '#ec4899',

          // Semantic color tokens
          '--color-primary':
            'color-mix(var(--hue-blue) 80%, var(--hue-blue-darkest) 20%)',
          '--color-secondary':
            'color-mix(var(--hue-purple) 80%, var(--hue-purple-darkest) 20%)',
          '--color-success':
            'color-mix(var(--hue-green) 80%, var(--hue-green-darkest) 20%)',
          '--color-warning':
            'color-mix(var(--hue-yellow) 80%, var(--hue-yellow-darkest) 20%)',
          '--color-error':
            'color-mix(var(--hue-red) 80%, var(--hue-red-darkest) 20%)',
          '--color-info':
            'color-mix(var(--hue-teal) 80%, var(--hue-teal-darkest) 20%)',
          '--color-primary-light':
            'color-mix(var(--hue-blue) 60%, var(--hue-blue-lightest) 40%)',
          '--color-primary-dark':
            'color-mix(var(--hue-blue) 40%, var(--hue-blue-darkest) 60%)',
          '--color-secondary-light':
            'color-mix(var(--hue-purple) 60%, var(--hue-purple-lightest) 40%)',
          '--color-secondary-dark':
            'color-mix(var(--hue-purple) 40%, var(--hue-purple-darkest) 60%)',

          // Spacing tokens
          '--spacing-xs': '4px',
          '--spacing-sm': '8px',
          '--spacing-md': '16px',
          '--spacing-lg': '24px',
          '--spacing-xl': '32px',
          '--spacing-2xl': '48px',

          // Typography tokens
          '--font-size-1': '0.75rem',
          '--font-size-2': '0.875rem',
          '--font-size-3': '1rem',
          '--font-size-4': '1.125rem',
          '--font-size-5': '1.25rem',
          '--font-size-6': '1.5rem',

          // Border tokens
          '--border-radius-sm': '4px',
          '--border-radius-md': '8px',
          '--border-radius-lg': '12px',
          '--border-width-thin': '1px',
          '--border-width-thick': '2px',

          // Shadow tokens
          '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',

          // Logical properties for RTL support
          '--spacing-block-start': '16px',
          '--spacing-block-end': '16px',
          '--spacing-inline-start': '16px',
          '--spacing-inline-end': '16px',
          '--margin-block-start': '0px',
          '--margin-block-end': '0px',
          '--margin-inline-start': '0px',
          '--margin-inline-end': '0px',
          '--padding-block-start': '0px',
          '--padding-block-end': '0px',
          '--padding-inline-start': '0px',
          '--padding-inline-end': '0px',
          '--border-block-start-width': '0',
          '--border-block-end-width': '0',
          '--border-inline-start-width': '0',
          '--border-inline-end-width': '0',

          // Theme-specific properties (dynamic based on current theme)
          '--color-background':
            currentTheme === 'light' ? '#f9fafb' : '#1f2937',
          '--color-text-primary':
            currentTheme === 'light' ? '#111827' : '#f9fafb',
          '--color-text-secondary':
            currentTheme === 'light' ? '#6b7280' : '#d1d5db',
          '--color-border': currentTheme === 'light' ? '#e5e7eb' : '#374151',
        };
        return properties[prop] || '';
      }

      // Handle regular CSS properties
      if (prop === 'color') {
        // Check if element has a specific color set
        const elementStyles = mockStyleProperties.get(element);
        if (elementStyles && elementStyles['color']) {
          return elementStyles['color'];
        }
        return '#000000'; // Default color
      }

      return '';
    },
  }),
});

// Mock HTMLElement style property
Object.defineProperty(HTMLElement.prototype, 'style', {
  value: {
    setProperty: jest.fn(),
    getPropertyValue: jest.fn(),
    removeProperty: jest.fn(),
    color: '#000000', // Default color
  },
  writable: true,
});

// Mock performance.now to add some realistic timing
const originalPerformanceNow = performance.now;
performance.now = jest.fn(() => {
  return originalPerformanceNow() + Math.random() * 0.1; // Add small random delay
});

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(callback => setTimeout(callback, 0));
global.cancelAnimationFrame = jest.fn();

// Mock performance
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
  },
});

// Mock CSS.supports
Object.defineProperty(window, 'CSS', {
  value: {
    supports: jest.fn((property: string, value?: string) => {
      // Mock support for CSS features
      const supportedFeatures = [
        '--custom-property',
        'color',
        'display',
        'margin-block-start',
        'color-mix',
      ];

      if (property === 'color' && value?.includes('color-mix')) {
        return true; // Modern browsers support color-mix
      }

      if (property === 'display' && (value === 'grid' || value === 'flex')) {
        return true; // Modern browsers support grid and flexbox
      }

      if (property === 'margin-block-start' && value === '1rem') {
        return true; // Modern browsers support logical properties
      }

      return supportedFeatures.includes(property);
    }),
  },
});

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});
