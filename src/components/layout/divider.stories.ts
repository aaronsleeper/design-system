import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Divider } from './divider.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/spacing.scss';
import '../../tokens/typography.scss';

const meta: Meta<Divider> = {
  title: 'Layout/Divider',
  component: 'ds-divider',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A visual separator component for dividing content sections. 
Provides consistent styling and accessibility support.

## Features
- **Variants**: default (horizontal), horizontal, vertical
- **Sizes**: small, medium, large, xlarge
- **States**: default, focus, disabled
- **Accessibility**: WCAG 2.1 AA compliant
- **Customizable**: Custom thickness and color support

## Usage
Use dividers to visually separate content sections and improve readability.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'horizontal', 'vertical'],
      description: 'Divider variant style',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Divider size',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the divider is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    thickness: {
      control: { type: 'text' },
      description: 'Custom thickness for the divider',
    },
    color: {
      control: { type: 'color' },
      description: 'Custom color for the divider',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the divider',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the divider',
    },
    role: {
      control: { type: 'text' },
      description: 'ARIA role for the divider',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<Divider>;

// Default story
export const Default: Story = {
  render: args => html`
    <div style="padding: var(--spacing-6);">
      <div
        style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-4);"
      >
        <h3
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Section 1
        </h3>
        <p style="margin: 0; color: var(--color-text-secondary);">
          This is the first content section that will be separated by a divider.
        </p>
      </div>

      <ds-divider
        variant="${args.variant}"
        size="${args.size}"
        ?disabled="${args.disabled}"
        thickness="${args.thickness || ''}"
        color="${args.color || ''}"
        aria-label="${args.ariaLabel || ''}"
        aria-describedby="${args.ariaDescribedBy || ''}"
        role="${args.role || ''}"
      ></ds-divider>

      <div
        style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-top: var(--spacing-4);"
      >
        <h3
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Section 2
        </h3>
        <p style="margin: 0; color: var(--color-text-secondary);">
          This is the second content section separated by the divider above.
        </p>
      </div>
    </div>
  `,
};

// Variants story
export const Variants: Story = {
  render: () => html`
    <div
      style="padding: var(--spacing-6); display: flex; flex-direction: column; gap: var(--spacing-6);"
    >
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Default Variant (Horizontal)
        </h4>
        <div
          style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-secondary);">
            Content above the default horizontal divider.
          </p>
        </div>
        <ds-divider variant="default" size="medium"></ds-divider>
        <div
          style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-top: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-secondary);">
            Content below the default horizontal divider.
          </p>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Horizontal Variant
        </h4>
        <div
          style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-primary);">
            Content above the horizontal divider.
          </p>
        </div>
        <ds-divider variant="horizontal" size="medium"></ds-divider>
        <div
          style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-top: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-primary);">
            Content below the horizontal divider.
          </p>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Vertical Variant
        </h4>
        <div style="display: flex; align-items: center; gap: var(--spacing-4);">
          <div
            style="background: var(--color-secondary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); flex: 1;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Content to the left of the vertical divider.
            </p>
          </div>
          <ds-divider
            variant="vertical"
            size="medium"
            style="height: 60px;"
          ></ds-divider>
          <div
            style="background: var(--color-secondary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); flex: 1;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Content to the right of the vertical divider.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different divider variants provide different orientations and behaviors.',
      },
    },
  },
};

// Sizes story
export const Sizes: Story = {
  render: () => html`
    <div
      style="padding: var(--spacing-6); display: flex; flex-direction: column; gap: var(--spacing-6);"
    >
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Small Size
        </h4>
        <div
          style="background: var(--color-success-light); padding: var(--spacing-3); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-2);"
        >
          <p
            style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
          >
            Content with small divider spacing.
          </p>
        </div>
        <ds-divider variant="horizontal" size="small"></ds-divider>
        <div
          style="background: var(--color-success-light); padding: var(--spacing-3); border-radius: var(--border-radius-md); margin-top: var(--spacing-2);"
        >
          <p
            style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
          >
            Content with small divider spacing.
          </p>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Medium Size
        </h4>
        <div
          style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-4);"
        >
          <p
            style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-3);"
          >
            Content with medium divider spacing.
          </p>
        </div>
        <ds-divider variant="horizontal" size="medium"></ds-divider>
        <div
          style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-top: var(--spacing-4);"
        >
          <p
            style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-3);"
          >
            Content with medium divider spacing.
          </p>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Large Size
        </h4>
        <div
          style="background: var(--color-success-light); padding: var(--spacing-5); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-6);"
        >
          <p
            style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-4);"
          >
            Content with large divider spacing.
          </p>
        </div>
        <ds-divider variant="horizontal" size="large"></ds-divider>
        <div
          style="background: var(--color-success-light); padding: var(--spacing-5); border-radius: var(--border-radius-md); margin-top: var(--spacing-6);"
        >
          <p
            style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-4);"
          >
            Content with large divider spacing.
          </p>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          XLarge Size
        </h4>
        <div
          style="background: var(--color-success-light); padding: var(--spacing-6); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-8);"
        >
          <p
            style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-5);"
          >
            Content with xlarge divider spacing.
          </p>
        </div>
        <ds-divider variant="horizontal" size="xlarge"></ds-divider>
        <div
          style="background: var(--color-success-light); padding: var(--spacing-6); border-radius: var(--border-radius-md); margin-top: var(--spacing-8);"
        >
          <p
            style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-5);"
          >
            Content with xlarge divider spacing.
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different divider sizes provide varying amounts of spacing around the divider.',
      },
    },
  },
};

// States story
export const States: Story = {
  render: () => html`
    <div
      style="padding: var(--spacing-6); display: flex; flex-direction: column; gap: var(--spacing-6);"
    >
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Default State
        </h4>
        <div
          style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-primary);">
            Normal divider state - fully interactive and accessible.
          </p>
        </div>
        <ds-divider variant="horizontal" size="medium"></ds-divider>
        <div
          style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-top: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-primary);">
            Normal divider state - fully interactive and accessible.
          </p>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Disabled State
        </h4>
        <div
          style="background: var(--color-gray-200); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-tertiary);">
            Disabled divider state - not interactive and visually dimmed.
          </p>
        </div>
        <ds-divider variant="horizontal" size="medium" disabled></ds-divider>
        <div
          style="background: var(--color-gray-200); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-top: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-tertiary);">
            Disabled divider state - not interactive and visually dimmed.
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Divider states control interactivity and visual appearance.',
      },
    },
  },
};

// Custom Properties story
export const CustomProperties: Story = {
  render: () => html`
    <div
      style="padding: var(--spacing-6); display: flex; flex-direction: column; gap: var(--spacing-6);"
    >
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Custom Thickness
        </h4>
        <div
          style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-primary);">
            Content above a thick divider (4px).
          </p>
        </div>
        <ds-divider
          variant="horizontal"
          size="medium"
          thickness="4px"
        ></ds-divider>
        <div
          style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-top: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-primary);">
            Content below a thick divider (4px).
          </p>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Custom Color
        </h4>
        <div
          style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-primary);">
            Content above a red divider.
          </p>
        </div>
        <ds-divider
          variant="horizontal"
          size="medium"
          color="#ff0000"
        ></ds-divider>
        <div
          style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-top: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-primary);">
            Content below a red divider.
          </p>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Custom Thickness and Color
        </h4>
        <div
          style="background: var(--color-error-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-primary);">
            Content above a thick blue divider (3px).
          </p>
        </div>
        <ds-divider
          variant="horizontal"
          size="medium"
          thickness="3px"
          color="#0066cc"
        ></ds-divider>
        <div
          style="background: var(--color-error-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-top: var(--spacing-4);"
        >
          <p style="margin: 0; color: var(--color-text-primary);">
            Content below a thick blue divider (3px).
          </p>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Vertical with Custom Properties
        </h4>
        <div style="display: flex; align-items: center; gap: var(--spacing-4);">
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); flex: 1;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Content to the left of a thick green vertical divider.
            </p>
          </div>
          <ds-divider
            variant="vertical"
            size="medium"
            thickness="2px"
            color="#00aa00"
            style="height: 60px;"
          ></ds-divider>
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); flex: 1;"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Content to the right of a thick green vertical divider.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Custom properties allow you to override the default thickness and color of dividers.',
      },
    },
  },
};

// Interactive story
export const Interactive: Story = {
  render: () => html`
    <div
      style="padding: var(--spacing-6); display: flex; flex-direction: column; gap: var(--spacing-6);"
    >
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Focusable Divider
        </h4>
        <div
          style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-bottom: var(--spacing-4);"
        >
          <p
            style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
          >
            This divider is focusable and supports keyboard navigation.
          </p>
          <p
            style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
          >
            Try tabbing to focus this divider, then press Enter or Space to
            activate it.
          </p>
        </div>
        <ds-divider
          variant="horizontal"
          size="medium"
          aria-label="Interactive divider example"
          role="separator"
        ></ds-divider>
        <div
          style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md); margin-top: var(--spacing-4);"
        >
          <p
            style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
          >
            This divider is focusable and supports keyboard navigation.
          </p>
          <p
            style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
          >
            Try tabbing to focus this divider, then press Enter or Space to
            activate it.
          </p>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Custom Styled Divider
        </h4>
        <div
          style="background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); padding: var(--spacing-6); border-radius: var(--border-radius-lg); margin-bottom: var(--spacing-4);"
        >
          <h3
            style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
          >
            Custom Divider
          </h3>
          <p style="margin: 0; color: var(--color-text-primary);">
            This divider has custom thickness and color applied.
          </p>
        </div>
        <ds-divider
          variant="horizontal"
          size="large"
          thickness="3px"
          color="#ff6b35"
          aria-label="Custom styled divider"
        ></ds-divider>
        <div
          style="background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); padding: var(--spacing-6); border-radius: var(--border-radius-lg); margin-top: var(--spacing-4);"
        >
          <h3
            style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
          >
            Custom Divider
          </h3>
          <p style="margin: 0; color: var(--color-text-primary);">
            This divider has custom thickness and color applied.
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive dividers support focus, keyboard navigation, and custom styling.',
      },
    },
  },
};

// Examples story
export const Examples: Story = {
  render: () => html`
    <div
      style="padding: var(--spacing-6); display: flex; flex-direction: column; gap: var(--spacing-8);"
    >
      <div>
        <h3
          style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-primary);"
        >
          Article Layout Example
        </h3>
        <div
          style="background: var(--color-background-elevated); padding: var(--spacing-6); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);"
        >
          <h4
            style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
          >
            Article Title
          </h4>
          <p
            style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-secondary);"
          >
            This is the introduction paragraph of the article. It provides an
            overview of the content that follows.
          </p>

          <ds-divider
            variant="horizontal"
            size="medium"
            aria-label="Article section separator"
          ></ds-divider>

          <h5
            style="margin: var(--spacing-4) 0 var(--spacing-3) 0; color: var(--color-text-primary);"
          >
            Section 1
          </h5>
          <p
            style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-secondary);"
          >
            This is the first section of the article with detailed content and
            information.
          </p>

          <ds-divider
            variant="horizontal"
            size="small"
            thickness="1px"
            color="var(--color-border-subtle)"
          ></ds-divider>

          <h5
            style="margin: var(--spacing-4) 0 var(--spacing-3) 0; color: var(--color-text-primary);"
          >
            Section 2
          </h5>
          <p style="margin: 0; color: var(--color-text-secondary);">
            This is the second section of the article with more detailed content
            and information.
          </p>
        </div>
      </div>

      <div>
        <h3
          style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-primary);"
        >
          Sidebar Layout Example
        </h3>
        <div style="display: flex; gap: var(--spacing-6);">
          <div
            style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border); flex: 1;"
          >
            <h4
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Main Content
            </h4>
            <p style="margin: 0; color: var(--color-text-secondary);">
              This is the main content area of the layout. It contains the
              primary information and content.
            </p>
          </div>

          <ds-divider
            variant="vertical"
            size="medium"
            style="height: 120px;"
            aria-label="Content separator"
          ></ds-divider>

          <div
            style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border); width: 200px;"
          >
            <h4
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Sidebar
            </h4>
            <p style="margin: 0; color: var(--color-text-secondary);">
              This is the sidebar content area with additional information and
              navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Real-world examples of divider usage in different layout scenarios.',
      },
    },
  },
};
