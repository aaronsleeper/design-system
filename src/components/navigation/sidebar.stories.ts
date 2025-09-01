import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Sidebar } from './sidebar.js';

// Import design system styles
import '../../tokens/colors.scss';
import '../../tokens/spacing.scss';
import '../../tokens/typography.scss';

const meta: Meta<Sidebar> = {
  title: 'Navigation/Sidebar',
  component: 'ds-sidebar',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A comprehensive sidebar navigation component with multiple variants, sizes, and states.
Supports collapsible functionality and proper accessibility features.

## Features
- **Variants**: default, collapsed, expanded
- **Sizes**: small, medium, large, xlarge
- **States**: default, focus, disabled
- **Collapsible**: Toggle between expanded and collapsed states
- **Position**: left or right positioning
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **Events**: Dispatches standardized design system events

## Usage
\`\`\`html
<ds-sidebar variant="default" size="medium">
  Navigation content
</ds-sidebar>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'collapsed', 'expanded'],
      description: 'Sidebar variant style',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Sidebar size',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the sidebar is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    collapsible: {
      control: { type: 'boolean' },
      description: 'Whether the sidebar is collapsible',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    collapsed: {
      control: { type: 'boolean' },
      description:
        'Whether the sidebar is collapsed (for collapsible sidebars)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Sidebar position',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the sidebar',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the sidebar',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    disabled: false,
    collapsible: false,
    collapsed: false,
    position: 'left',
    ariaLabel: 'Sidebar navigation',
  },
};

export default meta;
type Story = StoryObj<Sidebar>;

// Default story
export const Default: Story = {
  render: args => html`
    <div style="display: flex; height: 400px; gap: 16px;">
      <ds-sidebar
        variant="${args.variant}"
        size="${args.size}"
        ?disabled="${args.disabled}"
        ?collapsible="${args.collapsible}"
        ?collapsed="${args.collapsed}"
        position="${args.position}"
        aria-label="${args.ariaLabel}"
        aria-describedby="${args.ariaDescribedBy}"
      >
        <nav>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Dashboard
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Projects
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Team
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div slot="footer">
          <p
            style="margin: 0; font-size: var(--font-size-2); color: var(--color-text-secondary);"
          >
            Version 1.0.0
          </p>
        </div>
      </ds-sidebar>
      <div
        style="flex: 1; padding: 16px; background-color: var(--color-background); border-radius: var(--border-radius-md);"
      >
        <h2>Main Content</h2>
        <p>
          This is the main content area. The sidebar provides navigation to
          different sections of the application.
        </p>
      </div>
    </div>
  `,
};

// Variants story
export const Variants: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;"
    >
      <div>
        <h3>Default</h3>
        <ds-sidebar variant="default" size="medium" style="height: 300px;">
          <nav>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Dashboard
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </ds-sidebar>
      </div>

      <div>
        <h3>Collapsed</h3>
        <ds-sidebar variant="collapsed" size="medium" style="height: 300px;">
          <nav>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Dashboard
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </ds-sidebar>
      </div>

      <div>
        <h3>Expanded</h3>
        <ds-sidebar variant="expanded" size="medium" style="height: 300px;">
          <nav>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Dashboard
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </ds-sidebar>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different sidebar variants: default, collapsed, and expanded.',
      },
    },
  },
};

// Sizes story
export const Sizes: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;"
    >
      <div>
        <h3>Small</h3>
        <ds-sidebar size="small" style="height: 300px;">
          <nav>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Dashboard
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </ds-sidebar>
      </div>

      <div>
        <h3>Medium</h3>
        <ds-sidebar size="medium" style="height: 300px;">
          <nav>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Dashboard
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </ds-sidebar>
      </div>

      <div>
        <h3>Large</h3>
        <ds-sidebar size="large" style="height: 300px;">
          <nav>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Dashboard
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </ds-sidebar>
      </div>

      <div>
        <h3>XLarge</h3>
        <ds-sidebar size="xlarge" style="height: 300px;">
          <nav>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Dashboard
                </a>
              </li>
              <li style="margin-bottom: 8px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
                >
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </ds-sidebar>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different sidebar sizes: small, medium, large, and xlarge.',
      },
    },
  },
};

// Collapsible story
export const Collapsible: Story = {
  render: () => html`
    <div style="display: flex; height: 400px; gap: 16px;">
      <ds-sidebar collapsible size="medium" aria-label="Collapsible navigation">
        <span slot="title">Navigation</span>
        <nav>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Dashboard
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Projects
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Team
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div slot="footer">
          <p
            style="margin: 0; font-size: var(--font-size-2); color: var(--color-text-secondary);"
          >
            Version 1.0.0
          </p>
        </div>
      </ds-sidebar>
      <div
        style="flex: 1; padding: 16px; background-color: var(--color-background); border-radius: var(--border-radius-md);"
      >
        <h2>Main Content</h2>
        <p>
          This sidebar can be collapsed and expanded using the toggle button in
          the header. Try clicking the toggle button or pressing Escape when the
          sidebar is focused.
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'A collapsible sidebar with toggle functionality. Click the toggle button or press Escape to collapse/expand.',
      },
    },
  },
};

// Interactive story
export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; height: 400px; gap: 16px;">
      <ds-sidebar
        id="interactive-sidebar"
        collapsible
        size="medium"
        aria-label="Interactive navigation"
      >
        <span slot="title">Navigation</span>
        <nav>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Dashboard
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Projects
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Team
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div slot="footer">
          <p
            style="margin: 0; font-size: var(--font-size-2); color: var(--color-text-secondary);"
          >
            Version 1.0.0
          </p>
        </div>
      </ds-sidebar>
      <div
        style="flex: 1; padding: 16px; background-color: var(--color-background); border-radius: var(--border-radius-md);"
      >
        <h2>Interactive Sidebar</h2>
        <p>
          This sidebar demonstrates interactive functionality. Try these
          actions:
        </p>
        <ul>
          <li>Click the toggle button to collapse/expand</li>
          <li>Press Escape when the sidebar is focused to collapse</li>
          <li>Use Tab to navigate to the toggle button</li>
          <li>Press Enter or Space on the toggle button</li>
        </ul>
        <div style="margin-top: 16px;">
          <button
            onclick="document.getElementById('interactive-sidebar').toggle()"
            style="padding: 8px 16px; margin-right: 8px; background-color: var(--color-primary); color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Toggle Sidebar
          </button>
          <button
            onclick="document.getElementById('interactive-sidebar').collapse()"
            style="padding: 8px 16px; margin-right: 8px; background-color: var(--color-secondary); color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Collapse
          </button>
          <button
            onclick="document.getElementById('interactive-sidebar').expand()"
            style="padding: 8px 16px; background-color: var(--color-success); color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Expand
          </button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive sidebar with programmatic control buttons and keyboard navigation.',
      },
    },
  },
};

// Accessibility story
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; height: 400px; gap: 16px;">
      <ds-sidebar
        collapsible
        size="medium"
        aria-label="Main navigation"
        aria-describedby="nav-description"
      >
        <span slot="title">Navigation</span>
        <nav>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Dashboard
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Projects
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Team
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div slot="footer">
          <p
            style="margin: 0; font-size: var(--font-size-2); color: var(--color-text-secondary);"
          >
            Version 1.0.0
          </p>
        </div>
      </ds-sidebar>
      <div
        style="flex: 1; padding: 16px; background-color: var(--color-background); border-radius: var(--border-radius-md);"
      >
        <h2>Accessibility Features</h2>
        <p id="nav-description">
          This sidebar demonstrates accessibility features including:
        </p>
        <ul>
          <li>
            Proper ARIA attributes (role="navigation", aria-label,
            aria-expanded)
          </li>
          <li>Keyboard navigation (Tab, Enter, Space, Escape)</li>
          <li>Screen reader announcements</li>
          <li>Focus management</li>
          <li>High contrast mode support</li>
          <li>Reduced motion support</li>
        </ul>
        <p>
          Try using a screen reader or keyboard navigation to interact with the
          sidebar.
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar with comprehensive accessibility features including ARIA attributes, keyboard navigation, and screen reader support.',
      },
    },
  },
};

// Disabled story
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; height: 400px; gap: 16px;">
      <ds-sidebar
        collapsible
        disabled
        size="medium"
        aria-label="Disabled navigation"
      >
        <span slot="title">Navigation</span>
        <nav>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
              >
                Dashboard
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
              >
                Projects
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
              >
                Team
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px;"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div slot="footer">
          <p
            style="margin: 0; font-size: var(--font-size-2); color: var(--color-text-secondary);"
          >
            Version 1.0.0
          </p>
        </div>
      </ds-sidebar>
      <div
        style="flex: 1; padding: 16px; background-color: var(--color-background); border-radius: var(--border-radius-md);"
      >
        <h2>Disabled Sidebar</h2>
        <p>
          This sidebar is disabled and cannot be interacted with. The toggle
          button and keyboard navigation are disabled.
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A disabled sidebar that cannot be interacted with.',
      },
    },
  },
};

// Position story
export const Position: Story = {
  render: () => html`
    <div style="display: flex; height: 400px; gap: 16px;">
      <div
        style="flex: 1; padding: 16px; background-color: var(--color-background); border-radius: var(--border-radius-md);"
      >
        <h2>Main Content</h2>
        <p>This content is on the left side of the right-positioned sidebar.</p>
      </div>
      <ds-sidebar position="right" size="medium" aria-label="Right navigation">
        <nav>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Dashboard
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Projects
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Team
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div slot="footer">
          <p
            style="margin: 0; font-size: var(--font-size-2); color: var(--color-text-secondary);"
          >
            Version 1.0.0
          </p>
        </div>
      </ds-sidebar>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A sidebar positioned on the right side of the content.',
      },
    },
  },
};

// Complex content story
export const ComplexContent: Story = {
  render: () => html`
    <div style="display: flex; height: 500px; gap: 16px;">
      <ds-sidebar collapsible size="large" aria-label="Complex navigation">
        <span slot="title">Application</span>
        <nav>
          <div style="margin-bottom: 16px;">
            <h4
              style="margin: 0 0 8px 0; font-size: var(--font-size-2); color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.05em;"
            >
              Main
            </h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 4px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
                >
                  Dashboard
                </a>
              </li>
              <li style="margin-bottom: 4px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
                >
                  Analytics
                </a>
              </li>
            </ul>
          </div>

          <div style="margin-bottom: 16px;">
            <h4
              style="margin: 0 0 8px 0; font-size: var(--font-size-2); color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.05em;"
            >
              Projects
            </h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 4px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
                >
                  All Projects
                </a>
              </li>
              <li style="margin-bottom: 4px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
                >
                  Active
                </a>
              </li>
              <li style="margin-bottom: 4px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
                >
                  Archived
                </a>
              </li>
            </ul>
          </div>

          <div style="margin-bottom: 16px;">
            <h4
              style="margin: 0 0 8px 0; font-size: var(--font-size-2); color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.05em;"
            >
              Team
            </h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 4px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
                >
                  Members
                </a>
              </li>
              <li style="margin-bottom: 4px;">
                <a
                  href="#"
                  style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
                >
                  Roles
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div slot="footer">
          <div
            style="border-top: 1px solid var(--color-border); padding-top: 12px;"
          >
            <div
              style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;"
            >
              <div
                style="width: 32px; height: 32px; background-color: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;"
              >
                JD
              </div>
              <div>
                <div
                  style="font-size: var(--font-size-2); font-weight: var(--font-weight-medium); color: var(--color-text-primary);"
                >
                  John Doe
                </div>
                <div
                  style="font-size: var(--font-size-1); color: var(--color-text-secondary);"
                >
                  john@example.com
                </div>
              </div>
            </div>
            <p
              style="margin: 0; font-size: var(--font-size-1); color: var(--color-text-secondary);"
            >
              Version 1.0.0
            </p>
          </div>
        </div>
      </ds-sidebar>
      <div
        style="flex: 1; padding: 16px; background-color: var(--color-background); border-radius: var(--border-radius-md);"
      >
        <h2>Complex Sidebar</h2>
        <p>
          This sidebar demonstrates complex content with multiple navigation
          sections, user profile, and organized structure.
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'A sidebar with complex content including multiple navigation sections and user profile.',
      },
    },
  },
};

// Events story
export const Events: Story = {
  render: () => html`
    <div style="display: flex; height: 400px; gap: 16px;">
      <ds-sidebar
        id="events-sidebar"
        collapsible
        size="medium"
        aria-label="Events navigation"
      >
        <span slot="title">Navigation</span>
        <nav>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Dashboard
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              <a
                href="#"
                style="text-decoration: none; color: var(--color-text-primary); padding: 8px 12px; display: block; border-radius: 4px; transition: background-color 0.2s;"
              >
                Projects
              </a>
            </li>
          </ul>
        </nav>
      </ds-sidebar>
      <div
        style="flex: 1; padding: 16px; background-color: var(--color-background); border-radius: var(--border-radius-md);"
      >
        <h2>Event Log</h2>
        <div
          id="event-log"
          style="background-color: var(--color-gray-100); padding: 12px; border-radius: 4px; font-family: monospace; font-size: var(--font-size-2); max-height: 300px; overflow-y: auto;"
        >
          <p style="margin: 0; color: var(--color-text-secondary);">
            Events will appear here...
          </p>
        </div>
        <button
          onclick="document.getElementById('event-log').innerHTML = '<p style=&quot;margin: 0; color: var(--color-text-secondary);&quot;>Events will appear here...</p>'"
          style="margin-top: 8px; padding: 4px 8px; background-color: var(--color-gray-200); border: none; border-radius: 4px; cursor: pointer;"
        >
          Clear Log
        </button>
      </div>
    </div>
    <script>
      const sidebar = document.getElementById('events-sidebar');
      const eventLog = document.getElementById('event-log');

      function logEvent(event) {
        const timestamp = new Date().toLocaleTimeString();
        const eventInfo = \`[\${timestamp}] \${event.type}: \${JSON.stringify(
          event.detail.data,
          null,
          2
        )}\`;
        const logEntry = document.createElement('p');
        logEntry.style.margin = '0 0 4px 0';
        logEntry.textContent = eventInfo;
        eventLog.appendChild(logEntry);
        eventLog.scrollTop = eventLog.scrollHeight;
      }

      sidebar.addEventListener('ds-sidebar-render', logEvent);
      sidebar.addEventListener('ds-sidebar-toggle', logEvent);
      sidebar.addEventListener('ds-sidebar-focus', logEvent);
      sidebar.addEventListener('ds-sidebar-blur', logEvent);
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar with event logging to demonstrate the events it dispatches.',
      },
    },
  },
};
