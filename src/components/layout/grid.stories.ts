import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Grid } from './grid.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/spacing.scss';
import '../../tokens/typography.scss';

const meta: Meta<Grid> = {
  title: 'Layout/Grid',
  component: 'ds-grid',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A flexible grid layout component for organizing content in rows and columns. 
Provides consistent spacing, responsive behavior, and alignment options.

## Features
- **Variants**: default, responsive, fixed
- **Sizes**: small, medium, large, xlarge
- **States**: default, focus, disabled
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Mobile-first responsive design
- **Customizable**: Custom columns, gaps, and alignment support

## Usage
Use grids to create consistent layouts and organize content in rows and columns.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'responsive', 'fixed'],
      description: 'Grid variant style',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Grid size',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the grid is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    columns: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of columns in the grid',
      table: {
        defaultValue: { summary: '3' },
      },
    },
    gap: {
      control: { type: 'text' },
      description: 'Gap between grid items',
    },
    rowGap: {
      control: { type: 'text' },
      description: 'Row gap between grid items',
    },
    columnGap: {
      control: { type: 'text' },
      description: 'Column gap between grid items',
    },
    alignItems: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Vertical alignment of grid items',
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
      description: 'Horizontal alignment of grid items',
      table: {
        defaultValue: { summary: 'start' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the grid',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the grid',
    },
    role: {
      control: { type: 'text' },
      description: 'ARIA role for the grid',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    disabled: false,
    columns: 3,
    alignItems: 'stretch',
    justifyContent: 'start',
  },
};

export default meta;
type Story = StoryObj<Grid>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-grid
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      columns="${args.columns}"
      gap="${args.gap || ''}"
      row-gap="${args.rowGap || ''}"
      column-gap="${args.columnGap || ''}"
      align-items="${args.alignItems}"
      justify-content="${args.justifyContent}"
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
          Grid Item 1
        </h3>
        <p style="margin: 0; color: var(--color-text-secondary);">
          This is the first grid item with default styling.
        </p>
      </div>
      <div
        style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
      >
        <h3
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Grid Item 2
        </h3>
        <p style="margin: 0; color: var(--color-text-secondary);">
          This is the second grid item with default styling.
        </p>
      </div>
      <div
        style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
      >
        <h3
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Grid Item 3
        </h3>
        <p style="margin: 0; color: var(--color-text-secondary);">
          This is the third grid item with default styling.
        </p>
      </div>
    </ds-grid>
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
        <ds-grid variant="default" size="medium" columns="3">
          <div
            style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-secondary);">
              Default grid with fixed columns.
            </p>
          </div>
          <div
            style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-secondary);">
              Default grid with fixed columns.
            </p>
          </div>
          <div
            style="background: var(--color-gray-100); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-secondary);">
              Default grid with fixed columns.
            </p>
          </div>
        </ds-grid>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Responsive Variant
        </h4>
        <ds-grid variant="responsive" size="medium" columns="4">
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Responsive grid adapts to screen size.
            </p>
          </div>
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Responsive grid adapts to screen size.
            </p>
          </div>
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Responsive grid adapts to screen size.
            </p>
          </div>
          <div
            style="background: var(--color-primary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Responsive grid adapts to screen size.
            </p>
          </div>
        </ds-grid>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Fixed Variant
        </h4>
        <ds-grid variant="fixed" size="medium" columns="2">
          <div
            style="background: var(--color-secondary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Fixed grid with consistent layout.
            </p>
          </div>
          <div
            style="background: var(--color-secondary-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Fixed grid with consistent layout.
            </p>
          </div>
        </ds-grid>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different grid variants provide different layout behaviors and responsive patterns.',
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
        <ds-grid variant="default" size="small" columns="3">
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
        </ds-grid>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Medium Size
        </h4>
        <ds-grid variant="default" size="medium" columns="3">
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
        </ds-grid>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Large Size
        </h4>
        <ds-grid variant="default" size="large" columns="3">
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
        </ds-grid>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          XLarge Size
        </h4>
        <ds-grid variant="default" size="xlarge" columns="3">
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
        </ds-grid>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different grid sizes provide varying amounts of gap between items.',
      },
    },
  },
};

// Columns story
export const Columns: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--spacing-6);">
      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          2 Columns
        </h4>
        <ds-grid variant="default" size="medium" columns="2">
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Column 1</p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Column 2</p>
          </div>
        </ds-grid>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          4 Columns
        </h4>
        <ds-grid variant="default" size="medium" columns="4">
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Column 1</p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Column 2</p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Column 3</p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">Column 4</p>
          </div>
        </ds-grid>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          6 Columns
        </h4>
        <ds-grid variant="default" size="medium" columns="6">
          <div
            style="background: var(--color-info-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              1
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              2
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              3
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              4
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              5
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-3); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0; color: var(--color-text-primary); font-size: var(--font-size-2);"
            >
              6
            </p>
          </div>
        </ds-grid>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Grids can have different numbers of columns to accommodate various layout needs.',
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
        <ds-grid variant="default" size="medium" columns="3">
          <div
            style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Normal grid state - fully interactive and accessible.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Normal grid state - fully interactive and accessible.
            </p>
          </div>
          <div
            style="background: var(--color-success-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-primary);">
              Normal grid state - fully interactive and accessible.
            </p>
          </div>
        </ds-grid>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Disabled State
        </h4>
        <ds-grid variant="default" size="medium" columns="3" disabled>
          <div
            style="background: var(--color-gray-200); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-tertiary);">
              Disabled grid state - not interactive and visually dimmed.
            </p>
          </div>
          <div
            style="background: var(--color-gray-200); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-tertiary);">
              Disabled grid state - not interactive and visually dimmed.
            </p>
          </div>
          <div
            style="background: var(--color-gray-200); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p style="margin: 0; color: var(--color-text-tertiary);">
              Disabled grid state - not interactive and visually dimmed.
            </p>
          </div>
        </ds-grid>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Grid states control interactivity and visual appearance.',
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
          Focusable Grid
        </h4>
        <ds-grid
          variant="default"
          size="medium"
          columns="3"
          aria-label="Interactive grid example"
          role="grid"
        >
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              This grid is focusable and supports keyboard navigation.
            </p>
            <p
              style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
            >
              Try tabbing to focus this grid, then press Enter or Space to
              activate it.
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              This grid is focusable and supports keyboard navigation.
            </p>
            <p
              style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
            >
              Try tabbing to focus this grid, then press Enter or Space to
              activate it.
            </p>
          </div>
          <div
            style="background: var(--color-info-light); padding: var(--spacing-4); border-radius: var(--border-radius-md);"
          >
            <p
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              This grid is focusable and supports keyboard navigation.
            </p>
            <p
              style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
            >
              Try tabbing to focus this grid, then press Enter or Space to
              activate it.
            </p>
          </div>
        </ds-grid>
      </div>

      <div>
        <h4
          style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
        >
          Custom Styling
        </h4>
        <ds-grid
          variant="responsive"
          size="large"
          columns="4"
          gap="20px"
          align-items="center"
          justify-content="space-between"
          aria-label="Custom styled grid"
        >
          <div
            style="background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); padding: var(--spacing-6); border-radius: var(--border-radius-lg); text-align: center;"
          >
            <h3
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Custom Grid
            </h3>
            <p style="margin: 0; color: var(--color-text-primary);">
              This grid has custom gap, alignment, and styling applied.
            </p>
          </div>
          <div
            style="background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); padding: var(--spacing-6); border-radius: var(--border-radius-lg); text-align: center;"
          >
            <h3
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Custom Grid
            </h3>
            <p style="margin: 0; color: var(--color-text-primary);">
              This grid has custom gap, alignment, and styling applied.
            </p>
          </div>
          <div
            style="background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); padding: var(--spacing-6); border-radius: var(--border-radius-lg); text-align: center;"
          >
            <h3
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Custom Grid
            </h3>
            <p style="margin: 0; color: var(--color-text-primary);">
              This grid has custom gap, alignment, and styling applied.
            </p>
          </div>
          <div
            style="background: linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light)); padding: var(--spacing-6); border-radius: var(--border-radius-lg); text-align: center;"
          >
            <h3
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-primary);"
            >
              Custom Grid
            </h3>
            <p style="margin: 0; color: var(--color-text-primary);">
              This grid has custom gap, alignment, and styling applied.
            </p>
          </div>
        </ds-grid>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive grids support focus, keyboard navigation, and custom styling.',
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
          Product Grid Example
        </h3>
        <ds-grid variant="responsive" size="large" columns="4">
          <div
            style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);"
          >
            <h4
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              Product 1
            </h4>
            <p
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-secondary);"
            >
              Description of the first product with some details.
            </p>
            <button
              style="background: var(--color-primary); color: var(--color-text-inverse); border: none; padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
            >
              Add to Cart
            </button>
          </div>
          <div
            style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);"
          >
            <h4
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              Product 2
            </h4>
            <p
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-secondary);"
            >
              Description of the second product with some details.
            </p>
            <button
              style="background: var(--color-primary); color: var(--color-text-inverse); border: none; padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
            >
              Add to Cart
            </button>
          </div>
          <div
            style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);"
          >
            <h4
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              Product 3
            </h4>
            <p
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-secondary);"
            >
              Description of the third product with some details.
            </p>
            <button
              style="background: var(--color-primary); color: var(--color-text-inverse); border: none; padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
            >
              Add to Cart
            </button>
          </div>
          <div
            style="background: var(--color-background-elevated); padding: var(--spacing-4); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border);"
          >
            <h4
              style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-primary);"
            >
              Product 4
            </h4>
            <p
              style="margin: 0 0 var(--spacing-3) 0; color: var(--color-text-secondary);"
            >
              Description of the fourth product with some details.
            </p>
            <button
              style="background: var(--color-primary); color: var(--color-text-inverse); border: none; padding: var(--spacing-2) var(--spacing-4); border-radius: var(--border-radius-md); cursor: pointer;"
            >
              Add to Cart
            </button>
          </div>
        </ds-grid>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Real-world examples of grid usage in different layout scenarios.',
      },
    },
  },
};
