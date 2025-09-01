import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Breadcrumb } from './breadcrumb.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/typography.scss';
import '../../tokens/spacing.scss';

const meta: Meta<Breadcrumb> = {
  title: 'Components/Content/Breadcrumb',
  component: 'ds-breadcrumb',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A navigation component for displaying hierarchical navigation paths. 
The breadcrumb component helps users understand their current location within a website's hierarchy and provides quick navigation to parent levels.

## Features
- Multiple variants: default, minimal, compact
- Three sizes: small, medium, large
- Full accessibility support with ARIA attributes
- Keyboard navigation support
- Customizable separator
- Support for disabled and current items
- Event system for navigation handling

## Accessibility
- WCAG 2.1 AA compliant
- Proper ARIA attributes and roles
- Keyboard navigation support
- Screen reader announcements
- High contrast mode support
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'compact'],
      description: 'The visual style variant of the breadcrumb',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the breadcrumb component',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'focus', 'disabled'],
      description: 'The current state of the breadcrumb',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    separator: {
      control: { type: 'text' },
      description: 'The separator character between breadcrumb items',
      table: {
        defaultValue: { summary: '/' },
      },
    },
    items: {
      control: { type: 'object' },
      description: 'Array of breadcrumb items',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the breadcrumb navigation',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the breadcrumb',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    state: 'default',
    separator: '/',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones', current: true },
    ],
  },
};

export default meta;
type Story = StoryObj<Breadcrumb>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-breadcrumb
      variant="${args.variant}"
      size="${args.size}"
      state="${args.state}"
      separator="${args.separator}"
      .items="${args.items}"
      aria-label="${args.ariaLabel || ''}"
      aria-describedby="${args.ariaDescribedBy || ''}"
    ></ds-breadcrumb>
  `,
};

// Variants
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Default Variant</h3>
        <ds-breadcrumb
          variant="default"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Minimal Variant</h3>
        <ds-breadcrumb
          variant="minimal"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Compact Variant</h3>
        <ds-breadcrumb
          variant="compact"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants of the breadcrumb component.',
      },
    },
  },
};

// Sizes
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Small Size</h3>
        <ds-breadcrumb
          size="small"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Medium Size</h3>
        <ds-breadcrumb
          size="medium"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Large Size</h3>
        <ds-breadcrumb
          size="large"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of the breadcrumb component.',
      },
    },
  },
};

// Custom Separators
export const CustomSeparators: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Default Separator (/)</h3>
        <ds-breadcrumb
          separator="/"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Arrow Separator (>)</h3>
        <ds-breadcrumb
          separator=">"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Bullet Separator (•)</h3>
        <ds-breadcrumb
          separator="•"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Pipe Separator (|)</h3>
        <ds-breadcrumb
          separator="|"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb components with different separator characters.',
      },
    },
  },
};

// Item States
export const ItemStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>With Disabled Item</h3>
        <ds-breadcrumb
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Disabled', href: '/disabled', disabled: true },
            { label: 'Current', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Without Links (Text Only)</h3>
        <ds-breadcrumb
          .items="${[
            { label: 'Home' },
            { label: 'Products' },
            { label: 'Current', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Mixed States</h3>
        <ds-breadcrumb
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Disabled', disabled: true },
            { label: 'Products', href: '/products' },
            { label: 'Current', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb components showing different item states including disabled items and text-only items.',
      },
    },
  },
};

// Long Breadcrumb
export const LongBreadcrumb: Story = {
  render: () => html`
    <ds-breadcrumb
      .items="${[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Computers', href: '/products/electronics/computers' },
        { label: 'Laptops', href: '/products/electronics/computers/laptops' },
        {
          label: 'Gaming Laptops',
          href: '/products/electronics/computers/laptops/gaming',
        },
        { label: 'High-End Gaming Laptops', current: true },
      ]}"
    ></ds-breadcrumb>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A breadcrumb with many items to demonstrate wrapping behavior.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const handleNavigate = (event: CustomEvent) => {
      // Navigation event logged
      alert(
        `Navigating to: ${event.detail.data.href || event.detail.data.label}`
      );
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <p>Click on any breadcrumb item to see the navigation event:</p>
        <ds-breadcrumb
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Smartphones', current: true },
          ]}"
          @ds-breadcrumb-navigate="${handleNavigate}"
        ></ds-breadcrumb>

        <div
          style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;"
        >
          <h4>Event Log:</h4>
          <p>
            Open the browser console to see navigation events when clicking
            breadcrumb items.
          </p>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive breadcrumb that demonstrates event handling. Click on items to see navigation events.',
      },
    },
  },
};

// Accessibility Example
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>With Custom ARIA Label</h3>
        <ds-breadcrumb
          aria-label="Product category navigation"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>With ARIA Described By</h3>
        <p id="breadcrumb-desc">
          This breadcrumb shows your current location in the product catalog.
        </p>
        <ds-breadcrumb
          aria-describedby="breadcrumb-desc"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Keyboard Navigation</h3>
        <p>
          Use Tab to focus the breadcrumb, then use Tab to navigate between
          items.
        </p>
        <ds-breadcrumb
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility features including custom ARIA labels, descriptions, and keyboard navigation.',
      },
    },
  },
};

// Disabled State
export const Disabled: Story = {
  render: () => html`
    <ds-breadcrumb
      disabled
      .items="${[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Category', current: true },
      ]}"
    ></ds-breadcrumb>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'A disabled breadcrumb component where all interactions are disabled.',
      },
    },
  },
};

// Empty State
export const Empty: Story = {
  render: () => html` <ds-breadcrumb .items="${[]}"></ds-breadcrumb> `,
  parameters: {
    docs: {
      description: {
        story: 'An empty breadcrumb component with no items.',
      },
    },
  },
};

// Real World Example
export const RealWorldExample: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>E-commerce Product Page</h3>
        <ds-breadcrumb
          variant="minimal"
          separator=">"
          .items="${[
            { label: 'Home', href: '/' },
            { label: 'Electronics', href: '/electronics' },
            { label: 'Smartphones', href: '/electronics/smartphones' },
            { label: 'iPhone 15 Pro', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Documentation Site</h3>
        <ds-breadcrumb
          variant="compact"
          size="small"
          .items="${[
            { label: 'Docs', href: '/docs' },
            { label: 'Components', href: '/docs/components' },
            { label: 'Breadcrumb', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>

      <div>
        <h3>Admin Dashboard</h3>
        <ds-breadcrumb
          .items="${[
            { label: 'Dashboard', href: '/admin' },
            { label: 'Users', href: '/admin/users' },
            { label: 'User Management', href: '/admin/users/manage' },
            { label: 'Edit User', current: true },
          ]}"
        ></ds-breadcrumb>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of breadcrumb usage in different contexts.',
      },
    },
  },
};
