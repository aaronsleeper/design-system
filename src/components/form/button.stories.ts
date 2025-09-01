import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Button } from './button.js';

// Import design system CSS
import '../../tokens/index.scss';

const meta: Meta<Button> = {
  title: 'Components/Form/Button',
  component: 'ds-button',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive button component with multiple variants, sizes, and states. 
Supports both button and anchor tag rendering based on the href property.

## Features
- Multiple variants: primary, secondary, outline, ghost, link
- Three sizes: small, medium, large
- Loading and disabled states
- Full accessibility support (WCAG 2.1 AA)
- Keyboard navigation
- Link support with external link handling
- Design system event system integration

## Usage
\`\`\`html
<ds-button variant="primary" size="medium">Click me</ds-button>
<ds-button variant="outline" size="large" disabled>Disabled</ds-button>
<ds-button variant="ghost" href="/link" target="_blank">External Link</ds-button>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      description: 'Button variant style',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Button type (for form submission)',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    href: {
      control: { type: 'text' },
      description: 'URL for link buttons (renders as anchor tag)',
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Target for link buttons',
      table: {
        defaultValue: { summary: '_self' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the button',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the button',
    },
    ariaExpanded: {
      control: { type: 'boolean' },
      description: 'Whether the button controls an expanded element',
    },
    ariaPressed: {
      control: { type: 'boolean' },
      description: 'Whether the button is pressed (for toggle buttons)',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    type: 'button',
    target: '_self',
  },
};

export default meta;
type Story = StoryObj<Button>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
  },
  render: args => html`
    <ds-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      type="${args.type}"
      href="${args.href || ''}"
      target="${args.target}"
      aria-label="${args.ariaLabel || ''}"
      aria-describedby="${args.ariaDescribedBy || ''}"
      ?aria-expanded="${args.ariaExpanded}"
      ?aria-pressed="${args.ariaPressed}"
    >
      ${args.children}
    </ds-button>
  `,
};

// Variants story
export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All available button variants with their different visual styles.',
      },
    },
  },
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ds-button variant="primary">Primary</ds-button>
      <ds-button variant="secondary">Secondary</ds-button>
      <ds-button variant="outline">Outline</ds-button>
      <ds-button variant="ghost">Ghost</ds-button>
      <ds-button variant="link">Link</ds-button>
    </div>
  `,
};

// Sizes story
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes from small to large.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ds-button variant="primary" size="small">Small</ds-button>
      <ds-button variant="primary" size="medium">Medium</ds-button>
      <ds-button variant="primary" size="large">Large</ds-button>
    </div>
  `,
};

// States story
export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Different button states including default, disabled, and loading.',
      },
    },
  },
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ds-button variant="primary">Default</ds-button>
      <ds-button variant="primary" disabled>Disabled</ds-button>
      <ds-button variant="primary" loading>Loading</ds-button>
    </div>
  `,
};

// Interactive story
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive buttons with event handling. Check the Actions panel to see events.',
      },
    },
  },
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ds-button
        variant="primary"
        @ds-button-click="${(e: CustomEvent) =>
          console.log('Primary clicked:', e.detail)}"
      >
        Click Me
      </ds-button>
      <ds-button
        variant="secondary"
        @ds-button-click="${(e: CustomEvent) =>
          console.log('Secondary clicked:', e.detail)}"
      >
        Click Me Too
      </ds-button>
      <ds-button
        variant="outline"
        @ds-button-focus="${(e: CustomEvent) =>
          console.log('Focused:', e.detail)}"
        @ds-button-blur="${(e: CustomEvent) =>
          console.log('Blurred:', e.detail)}"
      >
        Focus Me
      </ds-button>
    </div>
  `,
};

// Accessibility story
export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility features including ARIA attributes and keyboard navigation.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h3>ARIA Labels</h3>
        <ds-button variant="primary" aria-label="Close dialog">×</ds-button>
        <ds-button variant="secondary" aria-label="Save document">💾</ds-button>
      </div>

      <div>
        <h3>Toggle Button</h3>
        <ds-button
          variant="outline"
          aria-pressed="false"
          @ds-button-click="${(e: CustomEvent) => {
            const button = e.target as Button;
            button.ariaPressed =
              button.ariaPressed === 'true' ? 'false' : 'true';
          }}"
        >
          Toggle Me
        </ds-button>
      </div>

      <div>
        <h3>Expanded Button</h3>
        <ds-button
          variant="ghost"
          aria-expanded="false"
          aria-describedby="menu-description"
        >
          Menu
        </ds-button>
        <div
          id="menu-description"
          style="font-size: 0.875rem; color: var(--color-text-secondary);"
        >
          Opens the navigation menu
        </div>
      </div>
    </div>
  `,
};

// Link buttons story
export const LinkButtons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Buttons that render as anchor tags for navigation.',
      },
    },
  },
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ds-button variant="primary" href="/internal">Internal Link</ds-button>
      <ds-button variant="outline" href="https://example.com" target="_blank">
        External Link
      </ds-button>
      <ds-button variant="link" href="/documentation">Documentation</ds-button>
    </div>
  `,
};

// Complex content story
export const ComplexContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Buttons with complex content including icons and multiple elements.',
      },
    },
  },
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ds-button variant="primary">
        <span style="margin-right: 0.5rem;">📁</span>
        Open Folder
      </ds-button>
      <ds-button variant="secondary">
        <span style="margin-right: 0.5rem;">⬇️</span>
        Download
        <span style="margin-left: 0.5rem;">(2.3MB)</span>
      </ds-button>
      <ds-button variant="outline" loading>
        <span style="margin-right: 0.5rem;">🔄</span>
        Processing...
      </ds-button>
    </div>
  `,
};

// Form integration story
export const FormIntegration: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Buttons integrated with forms for submission and reset functionality.',
      },
    },
  },
  render: () => html`
    <form style="display: flex; gap: 1rem; align-items: center;">
      <input
        type="text"
        placeholder="Enter your name"
        style="padding: 0.5rem; border: 1px solid var(--color-border); border-radius: var(--border-radius-md);"
      />
      <ds-button type="submit" variant="primary">Submit</ds-button>
      <ds-button type="reset" variant="outline">Reset</ds-button>
    </form>
  `,
};

// Theme variations story
export const ThemeVariations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Button variants across different theme contexts.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Light Theme</h3>
        <div
          style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
        >
          <ds-button variant="primary">Primary</ds-button>
          <ds-button variant="secondary">Secondary</ds-button>
          <ds-button variant="outline">Outline</ds-button>
          <ds-button variant="ghost">Ghost</ds-button>
        </div>
      </div>

      <div
        style="background: var(--color-gray-900); padding: 1rem; border-radius: var(--border-radius-md);"
      >
        <h3 style="color: white;">Dark Theme Context</h3>
        <div
          style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
        >
          <ds-button variant="primary">Primary</ds-button>
          <ds-button variant="secondary">Secondary</ds-button>
          <ds-button variant="outline">Outline</ds-button>
          <ds-button variant="ghost">Ghost</ds-button>
        </div>
      </div>
    </div>
  `,
};

// Performance story
export const Performance: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Performance considerations and best practices for button usage.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h3>Many Buttons (Performance Test)</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${Array.from(
            { length: 20 },
            (_, i) => html`
              <ds-button variant="primary" size="small"
                >Button ${i + 1}</ds-button
              >
            `
          )}
        </div>
      </div>

      <div>
        <h3>Loading States</h3>
        <div
          style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
        >
          <ds-button variant="primary" loading>Loading...</ds-button>
          <ds-button variant="secondary" loading>Processing</ds-button>
          <ds-button variant="outline" loading>Please Wait</ds-button>
        </div>
      </div>
    </div>
  `,
};
