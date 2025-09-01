import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Container } from './container.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/spacing.scss';
import '../../tokens/typography.scss';

const meta: Meta<Container> = {
  title: 'Layout/Container',
  component: 'ds-container',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A flexible container component for layout and content organization. 
Provides consistent spacing, max-width constraints, and responsive behavior.

## Features
- **Variants**: default, fluid, fixed
- **Sizes**: small, medium, large, xlarge
- **States**: default, focus, disabled
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Mobile-first responsive design
- **Customizable**: Custom max-width, padding, and margin support

## Usage
Use containers to create consistent layouts and content organization across your application.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'fluid', 'fixed'],
      description: 'Container variant style',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Container size',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the container is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Maximum width of the container',
    },
    padding: {
      control: { type: 'text' },
      description: 'Custom padding for the container',
    },
    margin: {
      control: { type: 'text' },
      description: 'Custom margin for the container',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the container',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the container',
    },
    role: {
      control: { type: 'text' },
      description: 'ARIA role for the container',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<Container>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-container
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      max-width="${args.maxWidth || ''}"
      padding="${args.padding || ''}"
      margin="${args.margin || ''}"
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
          Container Content
        </h3>
        <p style="margin: 0; color: var(--color-text-secondary);">
          This is the default container with medium size. It provides consistent
          spacing and layout structure.
        </p>
      </div>
    </ds-container>
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
          Default Variant
        </h4>
        <ds-container variant="default" size="medium">
          <div
            style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-secondary);">
              Default container with no max-width constraints.
            </p>
          </div>
        </ds-container>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Fluid Variant
        </h4>
        <ds-container variant="fluid" size="medium">
          <div
            style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-secondary);">
              Fluid container with responsive padding and no max-width.
            </p>
          </div>
        </ds-container>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Fixed Variant
        </h4>
        <ds-container variant="fixed" size="medium">
          <div
            style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-secondary);">
              Fixed container with max-width constraints and responsive padding.
            </p>
          </div>
        </ds-container>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different container variants provide different layout behaviors and constraints.',
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
        <ds-container variant="fluid" size="small">
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              Small container with minimal padding.
            </p>
          </div>
        </ds-container>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Medium Size
        </h4>
        <ds-container variant="fluid" size="medium">
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-3);"
            >
              Medium container with standard padding.
            </p>
          </div>
        </ds-container>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Large Size
        </h4>
        <ds-container variant="fluid" size="large">
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-5); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-4);"
            >
              Large container with generous padding.
            </p>
          </div>
        </ds-container>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          XLarge Size
        </h4>
        <ds-container variant="fluid" size="xlarge">
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-6); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-5);"
            >
              XLarge container with maximum padding.
            </p>
          </div>
        </ds-container>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different container sizes provide varying amounts of padding and spacing.',
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
        <ds-container variant="fluid" size="medium">
          <div
            style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Normal container state - fully interactive and accessible.
            </p>
          </div>
        </ds-container>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Disabled State
        </h4>
        <ds-container variant="fluid" size="medium" disabled>
          <div
            style="background: var(--color-gray-200); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-tertiary);">
              Disabled container state - not interactive and visually dimmed.
            </p>
          </div>
        </ds-container>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Container states control interactivity and visual appearance.',
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
          Focusable Container
        </h4>
        <ds-container
          variant="fluid"
          size="medium"
          aria-label="Interactive container example"
          role="region"
        >
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              This container is focusable and supports keyboard navigation.
            </p>
            <p
              style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
            >
              Try tabbing to focus this container, then press Enter or Space to
              activate it.
            </p>
          </div>
        </ds-container>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Custom Styling
        </h4>
        <ds-container
          variant="fixed"
          size="large"
          max-width="600px"
          padding="40px"
          margin="20px auto"
          aria-label="Custom styled container"
        >
          <div
            style="background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); padding: var(--spacing-6); border-radius: var(--border-radius-lg); text-align: center;"
          >
            <h3
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Custom Container
            </h3>
            <p style="margin: 0; color: var(--color-text-primary);">
              This container has custom max-width, padding, and margin applied.
            </p>
          </div>
        </ds-container>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive containers support focus, keyboard navigation, and custom styling.',
      },
    },
  },
};

// Accessibility story
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          ARIA Label
        </h4>
        <ds-container
          variant="fluid"
          size="medium"
          aria-label="Main content area"
        >
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Container with aria-label for screen reader users.
            </p>
          </div>
        </ds-container>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          ARIA Described By
        </h4>
        <p
          id="container-description"
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
        >
          This container is described by this text element.
        </p>
        <ds-container
          variant="fluid"
          size="medium"
          aria-describedby="container-description"
        >
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Container with aria-describedby reference.
            </p>
          </div>
        </ds-container>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Semantic Role
        </h4>
        <ds-container
          variant="fluid"
          size="medium"
          role="main"
          aria-label="Primary content"
        >
          <div
            style="background: var(--color-warning-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Container with semantic role="main" for better accessibility.
            </p>
          </div>
        </ds-container>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility features include ARIA attributes, semantic roles, and keyboard navigation support.',
      },
    },
  },
};

// Themes story
export const Themes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Light Theme
        </h4>
        <ds-container variant="fixed" size="medium">
          <div
            style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-md); border: 1px solid var(--color-border);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Container in light theme with elevated background.
            </p>
          </div>
        </ds-container>
      </div>

      <div
        style="background: var(--color-gray-800); padding: var(--spacing-6); border-radius: var(--border-radius-lg);"
      >
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-inverse);"
        >
          Dark Theme
        </h4>
        <ds-container variant="fixed" size="medium">
          <div
            style="background: var(--color-gray-700); padding: var(--spacing-4); border-radius: var(--border-radius-md); border: 1px solid var(--color-gray-600);"
          >
            <p style="margin: 0; color: var(--color-text-inverse);">
              Container in dark theme with appropriate contrast.
            </p>
          </div>
        </ds-container>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Containers adapt to different themes using CSS custom properties.',
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
          Page Layout Example
        </h3>
        <ds-container variant="fixed" size="large">
          <div
            style="background: var(--color-background-elevated); padding: var(--spacing-6); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);"
          >
            <h2
              style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-primary);"
            >
              Welcome to Our Application
            </h2>
            <p
              style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-secondary);"
            >
              This is an example of using a fixed container for main page
              content. It provides consistent max-width and responsive padding.
            </p>
            <div style="display: flex; gap: var(--spacing-3);">
              <button
                style="background: var(--color-primary); color: var(--color-text-inverse); border: none; padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
              >
                Get Started
              </button>
              <button
                style="background: transparent; color: var(--color-primary); border: 1px solid var(--color-primary); padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
              >
                Learn More
              </button>
            </div>
          </div>
        </ds-container>
      </div>

      <div>
        <h3
          style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-primary);"
        >
          Card Grid Example
        </h3>
        <ds-container variant="fluid" size="medium">
          <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-4);"
          >
            <div
              style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-md); border: 1px solid var(--color-border);"
            >
              <h4
                style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
              >
                Feature 1
              </h4>
              <p style="margin: 0; color: var(--color-text-secondary);">
                Description of the first feature with some details.
              </p>
            </div>
            <div
              style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-md); border: 1px solid var(--color-border);"
            >
              <h4
                style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
              >
                Feature 2
              </h4>
              <p style="margin: 0; color: var(--color-text-secondary);">
                Description of the second feature with some details.
              </p>
            </div>
            <div
              style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-md); border: 1px solid var(--color-border);"
            >
              <h4
                style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
              >
                Feature 3
              </h4>
              <p style="margin: 0; color: var(--color-text-secondary);">
                Description of the third feature with some details.
              </p>
            </div>
          </div>
        </ds-container>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Real-world examples of container usage in different layout scenarios.',
      },
    },
  },
};

// Responsive story
export const Responsive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Responsive Behavior
        </h4>
        <p
          style="margin: 0 0 var(--spacing-4) 0; color: var(--color-text-secondary);"
        >
          Resize your browser window to see how the container adapts to
          different screen sizes.
        </p>
        <ds-container variant="fixed" size="medium">
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              This fixed container will maintain its max-width constraints and
              adjust padding responsively.
            </p>
          </div>
        </ds-container>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Breakpoint Comparison
        </h4>
        <div
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4);"
        >
          <div>
            <h5
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              Mobile
            </h5>
            <ds-container variant="fluid" size="small">
              <div
                style="background: var(--color-success-light); padding: var(--spacing-2); border-radius: var(--border-radius-sm);"
              >
                <p
                  style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-1);"
                >
                  Small padding for mobile
                </p>
              </div>
            </ds-container>
          </div>
          <div>
            <h5
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              Tablet
            </h5>
            <ds-container variant="fluid" size="medium">
              <div
                style="background: var(--color-success-light); padding: var(--spacing-3); border-radius: var(--border-radius-sm);"
              >
                <p
                  style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
                >
                  Medium padding for tablet
                </p>
              </div>
            </ds-container>
          </div>
          <div>
            <h5
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              Desktop
            </h5>
            <ds-container variant="fluid" size="large">
              <div
                style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-sm);"
              >
                <p
                  style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-3);"
                >
                  Large padding for desktop
                </p>
              </div>
            </ds-container>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Containers are responsive and adapt their padding and max-width based on screen size.',
      },
    },
  },
};
