import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Stack } from './stack.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/spacing.scss';
import '../../tokens/typography.scss';

const meta: Meta<Stack> = {
  title: 'Layout/Stack',
  component: 'ds-stack',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A flexible stack layout component for organizing content in a single direction. 
Provides consistent spacing, alignment options, and responsive behavior.

## Features
- **Variants**: default (vertical), horizontal, vertical
- **Sizes**: small, medium, large, xlarge
- **States**: default, focus, disabled
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Mobile-first responsive design
- **Customizable**: Custom gaps, alignment, and wrap support

## Usage
Use stacks to create consistent layouts and organize content in rows or columns.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'horizontal', 'vertical'],
      description: 'Stack variant style',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Stack size',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the stack is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    gap: {
      control: { type: 'text' },
      description: 'Gap between stack items',
    },
    alignItems: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Cross-axis alignment of stack items',
      table: {
        defaultValue: { summary: 'stretch' },
      },
    },
    justifyContent: {
      control: { type: 'select' },
      options: [
        'start',
        'center',
        'end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      description: 'Main-axis alignment of stack items',
      table: {
        defaultValue: { summary: 'start' },
      },
    },
    wrap: {
      control: { type: 'boolean' },
      description: 'Whether items should wrap to new lines',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the stack',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the stack',
    },
    role: {
      control: { type: 'text' },
      description: 'ARIA role for the stack',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    disabled: false,
    alignItems: 'stretch',
    justifyContent: 'start',
    wrap: false,
  },
};

export default meta;
type Story = StoryObj<Stack>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-stack
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      gap="${args.gap || ''}"
      align-items="${args.alignItems}"
      justify-content="${args.justifyContent}"
      ?wrap="${args.wrap}"
      aria-label="${args.ariaLabel || ''}"
      aria-describedby="${args.ariaDescribedBy || ''}"
      role="${args.role || ''}"
    >
      <div
        style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
      >
        <h3
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Stack Item 1
        </h3>
        <p style="margin: 0; color: var(--color-text-secondary);">
          This is the first stack item with default styling.
        </p>
      </div>
      <div
        style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
      >
        <h3
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Stack Item 2
        </h3>
        <p style="margin: 0; color: var(--color-text-secondary);">
          This is the second stack item with default styling.
        </p>
      </div>
      <div
        style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
      >
        <h3
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Stack Item 3
        </h3>
        <p style="margin: 0; color: var(--color-text-secondary);">
          This is the third stack item with default styling.
        </p>
      </div>
    </ds-stack>
  `,
};

// Variants story
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Default Variant (Vertical)
        </h4>
        <ds-stack variant="default" size="medium">
          <div
            style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-secondary);">
              Default stack with vertical layout.
            </p>
          </div>
          <div
            style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-secondary);">
              Default stack with vertical layout.
            </p>
          </div>
          <div
            style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-secondary);">
              Default stack with vertical layout.
            </p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Horizontal Variant
        </h4>
        <ds-stack variant="horizontal" size="medium">
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Horizontal stack layout.
            </p>
          </div>
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Horizontal stack layout.
            </p>
          </div>
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Horizontal stack layout.
            </p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Vertical Variant
        </h4>
        <ds-stack variant="vertical" size="medium">
          <div
            style="background: var(--color-secondary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Vertical stack with explicit direction.
            </p>
          </div>
          <div
            style="background: var(--color-secondary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Vertical stack with explicit direction.
            </p>
          </div>
          <div
            style="background: var(--color-secondary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Vertical stack with explicit direction.
            </p>
          </div>
        </ds-stack>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different stack variants provide different layout directions and behaviors.',
      },
    },
  },
};

// Sizes story
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-4);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Small Size
        </h4>
        <ds-stack variant="horizontal" size="small">
          <div
            style="background: var(--color-success-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              Small gap between items.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              Small gap between items.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              Small gap between items.
            </p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Medium Size
        </h4>
        <ds-stack variant="horizontal" size="medium">
          <div
            style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-3);"
            >
              Medium gap between items.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-3);"
            >
              Medium gap between items.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-3);"
            >
              Medium gap between items.
            </p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Large Size
        </h4>
        <ds-stack variant="horizontal" size="large">
          <div
            style="background: var(--color-success-light); padding: var(--spacing-5); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-4);"
            >
              Large gap between items.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-5); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-4);"
            >
              Large gap between items.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-5); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-4);"
            >
              Large gap between items.
            </p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          XLarge Size
        </h4>
        <ds-stack variant="horizontal" size="xlarge">
          <div
            style="background: var(--color-success-light); padding: var(--spacing-6); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-5);"
            >
              XLarge gap between items.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-6); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-5);"
            >
              XLarge gap between items.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-6); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-5);"
            >
              XLarge gap between items.
            </p>
          </div>
        </ds-stack>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different stack sizes provide varying amounts of gap between items.',
      },
    },
  },
};

// Alignment story
export const Alignment: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Align Items: Start
        </h4>
        <ds-stack variant="horizontal" size="medium" align-items="start">
          <div
            style="background: var(--color-info-light); padding: var(--spacing-2); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Short</p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-6); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Much Longer Content
            </p>
            <p style="margin: 0; color: var(--color-text-primary);">
              This item has more content to demonstrate alignment.
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Medium</p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Align Items: Center
        </h4>
        <ds-stack variant="horizontal" size="medium" align-items="center">
          <div
            style="background: var(--color-info-light); padding: var(--spacing-2); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Short</p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-6); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Much Longer Content
            </p>
            <p style="margin: 0; color: var(--color-text-primary);">
              This item has more content to demonstrate alignment.
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Medium</p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Align Items: Stretch
        </h4>
        <ds-stack variant="horizontal" size="medium" align-items="stretch">
          <div
            style="background: var(--color-info-light); padding: var(--spacing-2); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Short</p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-6); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Much Longer Content
            </p>
            <p style="margin: 0; color: var(--color-text-primary);">
              This item has more content to demonstrate alignment.
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Medium</p>
          </div>
        </ds-stack>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different alignment options control how items are positioned within the stack.',
      },
    },
  },
};

// Justify Content story
export const JustifyContent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Justify Content: Start
        </h4>
        <ds-stack variant="horizontal" size="medium" justify-content="start">
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 1</p>
          </div>
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 2</p>
          </div>
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 3</p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Justify Content: Center
        </h4>
        <ds-stack variant="horizontal" size="medium" justify-content="center">
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 1</p>
          </div>
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 2</p>
          </div>
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 3</p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Justify Content: Space Between
        </h4>
        <ds-stack
          variant="horizontal"
          size="medium"
          justify-content="space-between"
        >
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 1</p>
          </div>
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 2</p>
          </div>
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 3</p>
          </div>
        </ds-stack>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different justify content options control how items are distributed along the main axis.',
      },
    },
  },
};

// Wrap story
export const Wrap: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          No Wrap (Default)
        </h4>
        <ds-stack variant="horizontal" size="medium" style="max-width: 400px;">
          <div
            style="background: var(--color-error-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); min-width: 120px;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 1</p>
          </div>
          <div
            style="background: var(--color-error-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); min-width: 120px;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 2</p>
          </div>
          <div
            style="background: var(--color-error-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); min-width: 120px;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 3</p>
          </div>
          <div
            style="background: var(--color-error-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); min-width: 120px;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 4</p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          With Wrap
        </h4>
        <ds-stack
          variant="horizontal"
          size="medium"
          wrap
          style="max-width: 400px;"
        >
          <div
            style="background: var(--color-error-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); min-width: 120px;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 1</p>
          </div>
          <div
            style="background: var(--color-error-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); min-width: 120px;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 2</p>
          </div>
          <div
            style="background: var(--color-error-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); min-width: 120px;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 3</p>
          </div>
          <div
            style="background: var(--color-error-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); min-width: 120px;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Item 4</p>
          </div>
        </ds-stack>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Wrap controls whether items should wrap to new lines when they exceed the container width.',
      },
    },
  },
};

// States story
export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Default State
        </h4>
        <ds-stack variant="horizontal" size="medium">
          <div
            style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Normal stack state - fully interactive and accessible.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Normal stack state - fully interactive and accessible.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Normal stack state - fully interactive and accessible.
            </p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Disabled State
        </h4>
        <ds-stack variant="horizontal" size="medium" disabled>
          <div
            style="background: var(--color-gray-200); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-tertiary);">
              Disabled stack state - not interactive and visually dimmed.
            </p>
          </div>
          <div
            style="background: var(--color-gray-200); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-tertiary);">
              Disabled stack state - not interactive and visually dimmed.
            </p>
          </div>
          <div
            style="background: var(--color-gray-200); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-tertiary);">
              Disabled stack state - not interactive and visually dimmed.
            </p>
          </div>
        </ds-stack>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Stack states control interactivity and visual appearance.',
      },
    },
  },
};

// Interactive story
export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Focusable Stack
        </h4>
        <ds-stack
          variant="horizontal"
          size="medium"
          aria-label="Interactive stack example"
          role="group"
        >
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              This stack is focusable and supports keyboard navigation.
            </p>
            <p
              style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
            >
              Try tabbing to focus this stack, then press Enter or Space to
              activate it.
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              This stack is focusable and supports keyboard navigation.
            </p>
            <p
              style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
            >
              Try tabbing to focus this stack, then press Enter or Space to
              activate it.
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              This stack is focusable and supports keyboard navigation.
            </p>
            <p
              style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
            >
              Try tabbing to focus this stack, then press Enter or Space to
              activate it.
            </p>
          </div>
        </ds-stack>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Custom Styling
        </h4>
        <ds-stack
          variant="horizontal"
          size="large"
          gap="20px"
          align-items="center"
          justify-content="space-between"
          wrap
          aria-label="Custom styled stack"
        >
          <div
            style="background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); padding: var(--spacing-6); border-radius: var(--border-radius-lg); text-align: center;"
          >
            <h3
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Custom Stack
            </h3>
            <p style="margin: 0; color: var(--color-text-primary);">
              This stack has custom gap, alignment, and styling applied.
            </p>
          </div>
          <div
            style="background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); padding: var(--spacing-6); border-radius: var(--border-radius-lg); text-align: center;"
          >
            <h3
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Custom Stack
            </h3>
            <p style="margin: 0; color: var(--color-text-primary);">
              This stack has custom gap, alignment, and styling applied.
            </p>
          </div>
          <div
            style="background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); padding: var(--spacing-6); border-radius: var(--border-radius-lg); text-align: center;"
          >
            <h3
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Custom Stack
            </h3>
            <p style="margin: 0; color: var(--color-text-primary);">
              This stack has custom gap, alignment, and styling applied.
            </p>
          </div>
        </ds-stack>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive stacks support focus, keyboard navigation, and custom styling.',
      },
    },
  },
};

// Examples story
export const Examples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-8);">
      <div>
        <h3
          style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-primary);"
        >
          Navigation Bar Example
        </h3>
        <ds-stack
          variant="horizontal"
          size="medium"
          align-items="center"
          justify-content="space-between"
        >
          <div
            style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);"
          >
            <h4
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              Logo
            </h4>
          </div>
          <ds-stack variant="horizontal" size="small">
            <button
              style="background: var(--color-primary); color: var(--color-text-inverse); border: none; padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
            >
              Home
            </button>
            <button
              style="background: var(--color-primary); color: var(--color-text-inverse); border: none; padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
            >
              About
            </button>
            <button
              style="background: var(--color-primary); color: var(--color-text-inverse); border: none; padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
            >
              Contact
            </button>
          </ds-stack>
        </ds-stack>
      </div>

      <div>
        <h3
          style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-primary);"
        >
          Card Layout Example
        </h3>
        <ds-stack variant="vertical" size="large">
          <div
            style="background: var(--color-background-elevated); padding: var(--spacing-6); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);"
          >
            <h4
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Card Header
            </h4>
            <p
              style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-secondary);"
            >
              This is a card layout using vertical stack with consistent
              spacing.
            </p>
            <ds-stack variant="horizontal" size="small" justify-content="end">
              <button
                style="background: var(--color-secondary); color: var(--color-text-inverse); border: none; padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
              >
                Cancel
              </button>
              <button
                style="background: var(--color-primary); color: var(--color-text-inverse); border: none; padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
              >
                Save
              </button>
            </ds-stack>
          </div>
        </ds-stack>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Real-world examples of stack usage in different layout scenarios.',
      },
    },
  },
};
