import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Badge } from './badge.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<Badge> = {
  title: 'Content/Badge',
  component: 'ds-badge',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A small status indicator component for displaying labels, counts, or status information.

## Features
- **Variants**: default, primary, secondary, success, warning, error, info
- **Sizes**: small, medium, large
- **States**: default, focus, disabled
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **Events**: ds-badge-render, ds-badge-focus, ds-badge-blur

## Usage
\`\`\`html
<ds-badge variant="primary" size="medium">New</ds-badge>
<ds-badge variant="success" size="small">Active</ds-badge>
<ds-badge variant="error" size="large">Error</ds-badge>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
      ],
      description: 'Badge variant style',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Badge size',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'focus', 'disabled'],
      description: 'Badge state',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the badge',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the badge',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    state: 'default',
  },
};

export default meta;
type Story = StoryObj<Badge>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    state: 'default',
  },
  render: args => html`
    <ds-badge
      variant="${args.variant}"
      size="${args.size}"
      state="${args.state}"
      aria-label="${args.ariaLabel || ''}"
      aria-describedby="${args.ariaDescribedBy || ''}"
    >
      Default Badge
    </ds-badge>
  `,
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants with different semantic meanings.',
      },
    },
  },
  render: () => html`
    <div
      style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
    >
      <ds-badge variant="default">Default</ds-badge>
      <ds-badge variant="primary">Primary</ds-badge>
      <ds-badge variant="secondary">Secondary</ds-badge>
      <ds-badge variant="success">Success</ds-badge>
      <ds-badge variant="warning">Warning</ds-badge>
      <ds-badge variant="error">Error</ds-badge>
      <ds-badge variant="info">Info</ds-badge>
    </div>
  `,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Badge component in different sizes for various use cases.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ds-badge variant="primary" size="small">Small</ds-badge>
      <ds-badge variant="primary" size="medium">Medium</ds-badge>
      <ds-badge variant="primary" size="large">Large</ds-badge>
    </div>
  `,
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different badge states including focus and disabled states.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ds-badge variant="primary" state="default">Default</ds-badge>
      <ds-badge variant="primary" state="focus">Focus</ds-badge>
      <ds-badge variant="primary" state="disabled">Disabled</ds-badge>
    </div>
  `,
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive badge with event handling. Focus the badge to see focus state.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ds-badge
        variant="primary"
        size="medium"
        @ds-badge-focus="${() => {
          /* Badge focused */
        }}"
        @ds-badge-blur="${() => {
          /* Badge blurred */
        }}"
      >
        Interactive Badge
      </ds-badge>
    </div>
  `,
};

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Badge with proper accessibility attributes and screen reader support.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ds-badge
        variant="success"
        size="medium"
        aria-label="User status indicator"
        aria-describedby="status-description"
      >
        Active
      </ds-badge>
      <div id="status-description" style="font-size: 0.875rem; color: #666;">
        This badge indicates the current user status
      </div>
    </div>
  `,
};

export const Themes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Badge component in different color themes and contexts.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin-bottom: 1rem;">Light Theme</h4>
        <div
          style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
        >
          <ds-badge variant="default">Default</ds-badge>
          <ds-badge variant="primary">Primary</ds-badge>
          <ds-badge variant="secondary">Secondary</ds-badge>
          <ds-badge variant="success">Success</ds-badge>
          <ds-badge variant="warning">Warning</ds-badge>
          <ds-badge variant="error">Error</ds-badge>
          <ds-badge variant="info">Info</ds-badge>
        </div>
      </div>

      <div style="background: #1f2937; padding: 2rem; border-radius: 8px;">
        <h4 style="margin-bottom: 1rem; color: white;">Dark Theme</h4>
        <div
          style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
        >
          <ds-badge variant="default">Default</ds-badge>
          <ds-badge variant="primary">Primary</ds-badge>
          <ds-badge variant="secondary">Secondary</ds-badge>
          <ds-badge variant="success">Success</ds-badge>
          <ds-badge variant="warning">Warning</ds-badge>
          <ds-badge variant="error">Error</ds-badge>
          <ds-badge variant="info">Info</ds-badge>
        </div>
      </div>
    </div>
  `,
};

export const Examples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of badge usage in different contexts.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin-bottom: 1rem;">Status Indicators</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <ds-badge variant="success" size="small">Online</ds-badge>
          <ds-badge variant="warning" size="small">Away</ds-badge>
          <ds-badge variant="error" size="small">Offline</ds-badge>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 1rem;">Counters</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <ds-badge variant="primary" size="small">3</ds-badge>
          <ds-badge variant="secondary" size="small">12</ds-badge>
          <ds-badge variant="info" size="small">99+</ds-badge>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 1rem;">Labels</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <ds-badge variant="primary" size="small">New</ds-badge>
          <ds-badge variant="success" size="small">Verified</ds-badge>
          <ds-badge variant="warning" size="small">Beta</ds-badge>
          <ds-badge variant="error" size="small">Deprecated</ds-badge>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 1rem;">Categories</h4>
        <div
          style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
        >
          <ds-badge variant="info" size="small">Technology</ds-badge>
          <ds-badge variant="secondary" size="small">Design</ds-badge>
          <ds-badge variant="primary" size="small">Development</ds-badge>
          <ds-badge variant="success" size="small">Marketing</ds-badge>
        </div>
      </div>
    </div>
  `,
};

export const WithContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Badge with different types of content including icons and text.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin-bottom: 1rem;">Text Content</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <ds-badge variant="primary">Simple Text</ds-badge>
          <ds-badge variant="success">Longer Text Content</ds-badge>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 1rem;">Numeric Content</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <ds-badge variant="primary">1</ds-badge>
          <ds-badge variant="secondary">42</ds-badge>
          <ds-badge variant="info">999</ds-badge>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 1rem;">Mixed Content</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <ds-badge variant="warning"> <span>⚠️</span> Warning </ds-badge>
          <ds-badge variant="error"> <span>❌</span> Error </ds-badge>
          <ds-badge variant="success"> <span>✅</span> Success </ds-badge>
        </div>
      </div>
    </div>
  `,
};

export const Responsive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Badge component behavior across different screen sizes and contexts.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin-bottom: 1rem;">Mobile (Small)</h4>
        <div
          style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;"
        >
          <ds-badge variant="primary" size="small">Mobile</ds-badge>
          <ds-badge variant="success" size="small">Small</ds-badge>
          <ds-badge variant="info" size="small">Badges</ds-badge>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 1rem;">Tablet (Medium)</h4>
        <div
          style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;"
        >
          <ds-badge variant="primary" size="medium">Tablet</ds-badge>
          <ds-badge variant="secondary" size="medium">Medium</ds-badge>
          <ds-badge variant="warning" size="medium">Badges</ds-badge>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 1rem;">Desktop (Large)</h4>
        <div
          style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center;"
        >
          <ds-badge variant="primary" size="large">Desktop</ds-badge>
          <ds-badge variant="error" size="large">Large</ds-badge>
          <ds-badge variant="info" size="large">Badges</ds-badge>
        </div>
      </div>
    </div>
  `,
};
