# Accessibility Documentation

## Overview

This directory contains comprehensive accessibility documentation and testing utilities for the design system, ensuring compliance with WCAG 2.1 AA standards.

## Files

- `audit-checklist.md` - Complete WCAG 2.1 AA audit checklist with component-specific requirements
- `README.md` - This overview document

## WCAG 2.1 AA Principles

### 1. Perceivable
Information and user interface components must be presentable to users in ways they can perceive.

### 2. Operable
User interface components and navigation must be operable.

### 3. Understandable
Information and operation of the user interface must be understandable.

### 4. Robust
Content must be robust enough to be interpreted by a wide variety of user agents.

## Component Accessibility Requirements

### Form Components

| Component | Key Requirements | Automated Tests | Manual Tests |
|-----------|------------------|-----------------|--------------|
| Button | Accessible name, keyboard support, focus indicator | ✅ | Screen reader, keyboard |
| Input | Associated label, keyboard support, error handling | ✅ | Screen reader, voice input |
| Select | Accessible name, keyboard navigation | ✅ | Screen reader, keyboard |
| Checkbox | Associated label, state announcement | ✅ | Screen reader, keyboard |
| Radio | Group association, state announcement | ✅ | Screen reader, keyboard |
| Textarea | Associated label, character count | ✅ | Screen reader, voice input |
| Switch | Accessible name, state announcement | ✅ | Screen reader, keyboard |

### Layout Components

| Component | Key Requirements | Automated Tests | Manual Tests |
|-----------|------------------|-----------------|--------------|
| Container | Semantic structure | ✅ | Screen reader |
| Grid | Table semantics, keyboard navigation | ✅ | Screen reader, keyboard |
| Stack | Logical content order | ✅ | Screen reader |
| Divider | Semantic meaning | ✅ | Screen reader |

### Navigation Components

| Component | Key Requirements | Automated Tests | Manual Tests |
|-----------|------------------|-----------------|--------------|
| Sidebar | Skip link, navigation role | ✅ | Screen reader, keyboard |
| Drawer | Focus management, dialog role | ✅ | Screen reader, keyboard |

### Content Components

| Component | Key Requirements | Automated Tests | Manual Tests |
|-----------|------------------|-----------------|--------------|
| Typography | Contrast ratio, text resizing | ✅ | High contrast, zoom |
| Card | Semantic structure | ✅ | Screen reader |
| Badge | Accessible name | ✅ | Screen reader |
| Avatar | Accessible name | ✅ | Screen reader |
| Breadcrumb | Navigation role, current location | ✅ | Screen reader, keyboard |
| Pagination | Navigation role, current page | ✅ | Screen reader, keyboard |

### Feedback Components

| Component | Key Requirements | Automated Tests | Manual Tests |
|-----------|------------------|-----------------|--------------|
| Alert | Alert role, status announcement | ✅ | Screen reader |
| Toast | Status role, status announcement | ✅ | Screen reader |
| Modal | Dialog role, focus management | ✅ | Screen reader, keyboard |
| Tooltip | Tooltip role, keyboard access | ✅ | Screen reader, keyboard |

## Testing Strategy

### Automated Testing

#### Tools Used
- **axe-core**: Automated accessibility testing
- **jest-axe**: Jest integration for axe-core
- **@testing-library/jest-dom**: Accessibility matchers
- **Storybook Accessibility Addon**: Component-level testing

#### Test Configuration
```javascript
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**/*',
  ],
};
```

#### Test Setup
```typescript
// src/test/setup.ts
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';

// Mock browser APIs
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
```

#### Component Testing Example
```typescript
// src/components/button/button.test.ts
import { render } from '@testing-library/web-components';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render('<ds-button>Click me</ds-button>');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible name', () => {
    const button = document.createElement('ds-button');
    button.setAttribute('aria-label', 'Submit form');
    expect(button.getAttribute('aria-label')).toBe('Submit form');
  });
});
```

### Manual Testing

#### Screen Reader Testing

**NVDA (Windows)**
1. Install NVDA
2. Navigate to component using Tab key
3. Listen for proper announcements
4. Test all interactive elements
5. Verify state changes are announced

**JAWS (Windows)**
1. Install JAWS
2. Navigate to component using Tab key
3. Listen for proper announcements
4. Test all interactive elements
5. Verify state changes are announced

**VoiceOver (macOS)**
1. Enable VoiceOver (Cmd + F5)
2. Navigate to component using Tab key
3. Listen for proper announcements
4. Test all interactive elements
5. Verify state changes are announced

#### Keyboard Navigation Testing

**Tab Navigation**
- [ ] All interactive elements are reachable
- [ ] Tab order is logical
- [ ] No keyboard traps

**Arrow Key Navigation**
- [ ] Arrow keys work for select components
- [ ] Arrow keys work for radio groups
- [ ] Arrow keys work for navigation menus

**Enter/Space Activation**
- [ ] Enter key activates buttons
- [ ] Space key activates buttons
- [ ] Enter key opens dropdowns
- [ ] Space key toggles checkboxes

#### Visual Testing

**High Contrast Mode**
- [ ] Components are visible in high contrast
- [ ] Text is readable
- [ ] Focus indicators are visible

**Zoom Testing**
- [ ] Components work at 200% zoom
- [ ] Text remains readable
- [ ] Layout doesn't break

**Color Blindness Testing**
- [ ] Information isn't conveyed by color alone
- [ ] Contrast ratios are sufficient
- [ ] Icons have text alternatives

## Accessibility Utilities

### Testing Utilities

The `src/test/accessibility/accessibility-utils.ts` module provides:

- **testComponentAccessibility**: Test component for accessibility violations
- **testWCAGCompliance**: Test component for specific WCAG criteria
- **testKeyboardAccessibility**: Test keyboard accessibility
- **testScreenReaderAccessibility**: Test screen reader accessibility
- **testColorContrast**: Test color contrast ratios
- **testFocusManagement**: Test focus management
- **testSemanticStructure**: Test semantic structure
- **testARIAAttributes**: Test ARIA attributes
- **generateAccessibilityReport**: Generate comprehensive accessibility report
- **runFullAccessibilityTest**: Run all accessibility tests
- **MockScreenReader**: Mock screen reader for testing

### Usage Examples

```typescript
import {
  testComponentAccessibility,
  testWCAGCompliance,
  generateAccessibilityReport,
} from 'src/test/accessibility/accessibility-utils';

// Test component for accessibility violations
const results = await testComponentAccessibility(element);
expect(results.violations).toHaveLength(0);

// Test specific WCAG criteria
const wcagResults = await testWCAGCompliance(element, ['1.1.1', '2.1.1']);
expect(wcagResults.violations).toHaveLength(0);

// Generate accessibility report
const report = generateAccessibilityReport(element, 'Button');
console.log(report.recommendations);
```

## Continuous Integration

### GitHub Actions

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Testing

on: [push, pull_request]

jobs:
  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:accessibility
      - run: npm run storybook:test:accessibility
```

### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:accessibility"
    }
  }
}
```

## Storybook Integration

### Accessibility Addon Configuration

```typescript
// src/components/button/button.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: 'ds-button',
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};
```

## Monitoring and Reporting

### Accessibility Dashboard

```typescript
// src/utils/accessibility-report.ts
export interface AccessibilityReport {
  component: string;
  violations: Array<{
    rule: string;
    description: string;
    severity: 'minor' | 'moderate' | 'serious' | 'critical';
  }>;
  passes: string[];
  timestamp: string;
}

export function generateAccessibilityReport(): AccessibilityReport {
  // Implementation
}
```

### Monitoring Tools

1. **axe-core**: Automated testing
2. **Lighthouse**: Performance and accessibility
3. **WAVE**: Web accessibility evaluation
4. **pa11y**: Command-line accessibility testing

## Training and Resources

### Team Training

1. **WCAG 2.1 Guidelines**: Understanding requirements
2. **Screen Reader Testing**: Practical experience
3. **Keyboard Navigation**: Testing procedures
4. **Color and Contrast**: Visual accessibility

### Resources

1. **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
2. **axe-core Documentation**: https://github.com/dequelabs/axe-core
3. **Testing Library**: https://testing-library.com/docs/guide-accessibility
4. **Storybook Accessibility**: https://storybook.js.org/addons/@storybook/addon-a11y

## Best Practices

### Component Development

1. **Start with semantic HTML**: Use proper HTML elements
2. **Add ARIA attributes**: Enhance accessibility with ARIA
3. **Test with keyboard**: Ensure keyboard accessibility
4. **Test with screen reader**: Verify screen reader support
5. **Check contrast ratios**: Ensure sufficient color contrast

### Testing Workflow

1. **Automated testing**: Run accessibility tests in CI/CD
2. **Manual testing**: Test with screen readers and keyboard
3. **Visual testing**: Test with high contrast and zoom
4. **User testing**: Test with users with disabilities

### Documentation

1. **Component documentation**: Document accessibility features
2. **Testing procedures**: Document manual testing steps
3. **Accessibility guidelines**: Document team guidelines
4. **Training materials**: Provide training resources

## Success Metrics

### Key Performance Indicators

- [ ] 100% of components pass automated accessibility tests
- [ ] 0 critical accessibility violations
- [ ] All components work with screen readers
- [ ] All components are keyboard accessible
- [ ] All components meet contrast requirements
- [ ] Regular accessibility training for team members

### Monitoring

- **Automated testing**: Continuous monitoring in CI/CD
- **Manual testing**: Regular manual testing sessions
- **User feedback**: Collect feedback from users with disabilities
- **Compliance audits**: Regular compliance audits

## Conclusion

The accessibility system ensures that all components in the design system meet WCAG 2.1 AA standards. Regular testing and monitoring help maintain compliance and provide an inclusive user experience for all users.

### Key Benefits

- **Inclusive Design**: Ensures access for users with disabilities
- **Compliance**: Meets legal and regulatory requirements
- **Better UX**: Improves experience for all users
- **Future-Proof**: Ensures compatibility with assistive technologies
- **Team Education**: Builds accessibility knowledge in the team
