import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Pagination } from './pagination.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/typography.scss';
import '../../tokens/spacing.scss';

const meta: Meta<Pagination> = {
  title: 'Components/Content/Pagination',
  component: 'ds-pagination',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A navigation component for displaying pagination controls. 
The pagination component helps users navigate through large sets of data by providing page numbers and navigation controls.

## Features
- Multiple variants: default, minimal, compact
- Three sizes: small, medium, large
- Full accessibility support with ARIA attributes
- Keyboard navigation support
- Smart page number display with ellipsis
- Support for first/last and previous/next buttons
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
      description: 'The visual style variant of the pagination',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the pagination component',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'focus', 'disabled'],
      description: 'The current state of the pagination',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    currentPage: {
      control: { type: 'number' },
      description: 'The current page number (1-based)',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    totalPages: {
      control: { type: 'number' },
      description: 'The total number of pages',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    totalItems: {
      control: { type: 'number' },
      description: 'The total number of items',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    itemsPerPage: {
      control: { type: 'number' },
      description: 'The number of items per page',
      table: {
        defaultValue: { summary: '10' },
      },
    },
    showFirstLast: {
      control: { type: 'boolean' },
      description: 'Show first and last page buttons',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showPreviousNext: {
      control: { type: 'boolean' },
      description: 'Show previous and next page buttons',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    maxVisiblePages: {
      control: { type: 'number' },
      description: 'Maximum number of visible page numbers',
      table: {
        defaultValue: { summary: '7' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the pagination navigation',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the pagination',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    state: 'default',
    currentPage: 3,
    totalPages: 10,
    totalItems: 0,
    itemsPerPage: 10,
    showFirstLast: false,
    showPreviousNext: true,
    maxVisiblePages: 7,
  },
};

export default meta;
type Story = StoryObj<Pagination>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-pagination
      variant="${args.variant}"
      size="${args.size}"
      state="${args.state}"
      current-page="${args.currentPage}"
      total-pages="${args.totalPages}"
      total-items="${args.totalItems}"
      items-per-page="${args.itemsPerPage}"
      ?show-first-last="${args.showFirstLast}"
      ?show-previous-next="${args.showPreviousNext}"
      max-visible-pages="${args.maxVisiblePages}"
      aria-label="${args.ariaLabel || ''}"
      aria-describedby="${args.ariaDescribedBy || ''}"
    ></ds-pagination>
  `,
};

// Variants
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Default Variant</h3>
        <ds-pagination
          variant="default"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      </div>

      <div>
        <h3>Minimal Variant</h3>
        <ds-pagination
          variant="minimal"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      </div>

      <div>
        <h3>Compact Variant</h3>
        <ds-pagination
          variant="compact"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants of the pagination component.',
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
        <ds-pagination
          size="small"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      </div>

      <div>
        <h3>Medium Size</h3>
        <ds-pagination
          size="medium"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      </div>

      <div>
        <h3>Large Size</h3>
        <ds-pagination
          size="large"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of the pagination component.',
      },
    },
  },
};

// With First/Last Buttons
export const WithFirstLastButtons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>With First/Last Buttons</h3>
        <ds-pagination
          current-page="5"
          total-pages="20"
          show-first-last
        ></ds-pagination>
      </div>

      <div>
        <h3>On First Page</h3>
        <ds-pagination
          current-page="1"
          total-pages="20"
          show-first-last
        ></ds-pagination>
      </div>

      <div>
        <h3>On Last Page</h3>
        <ds-pagination
          current-page="20"
          total-pages="20"
          show-first-last
        ></ds-pagination>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Pagination components with first and last page buttons enabled.',
      },
    },
  },
};

// Large Dataset
export const LargeDataset: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Many Pages with Ellipsis</h3>
        <ds-pagination
          current-page="10"
          total-pages="50"
          max-visible-pages="7"
        ></ds-pagination>
      </div>

      <div>
        <h3>Near Beginning</h3>
        <ds-pagination
          current-page="3"
          total-pages="50"
          max-visible-pages="7"
        ></ds-pagination>
      </div>

      <div>
        <h3>Near End</h3>
        <ds-pagination
          current-page="48"
          total-pages="50"
          max-visible-pages="7"
        ></ds-pagination>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Pagination components with large datasets showing ellipsis behavior.',
      },
    },
  },
};

// Custom Max Visible Pages
export const CustomMaxVisiblePages: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Max 5 Pages</h3>
        <ds-pagination
          current-page="5"
          total-pages="20"
          max-visible-pages="5"
        ></ds-pagination>
      </div>

      <div>
        <h3>Max 9 Pages</h3>
        <ds-pagination
          current-page="5"
          total-pages="20"
          max-visible-pages="9"
        ></ds-pagination>
      </div>

      <div>
        <h3>Max 3 Pages</h3>
        <ds-pagination
          current-page="5"
          total-pages="20"
          max-visible-pages="3"
        ></ds-pagination>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Pagination components with different maximum visible page settings.',
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
        `Navigating to page: ${event.detail.data.page} (${event.detail.data.type})`
      );
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <p>Click on any pagination button to see the navigation event:</p>
        <ds-pagination
          current-page="5"
          total-pages="20"
          show-first-last
          @ds-pagination-navigate="${handleNavigate}"
        ></ds-pagination>

        <div
          style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;"
        >
          <h4>Event Log:</h4>
          <p>
            Open the browser console to see navigation events when clicking
            pagination buttons.
          </p>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive pagination that demonstrates event handling. Click on buttons to see navigation events.',
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
        <ds-pagination
          aria-label="Product search results pagination"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      </div>

      <div>
        <h3>With ARIA Described By</h3>
        <p id="pagination-desc">
          This pagination shows 10 results per page. Use the navigation buttons
          to browse through all results.
        </p>
        <ds-pagination
          aria-describedby="pagination-desc"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      </div>

      <div>
        <h3>Keyboard Navigation</h3>
        <p>
          Use Tab to focus the pagination, then use Tab to navigate between
          buttons. Press Enter or Space to activate buttons.
        </p>
        <ds-pagination
          current-page="3"
          total-pages="10"
          show-first-last
        ></ds-pagination>
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
    <ds-pagination disabled current-page="3" total-pages="10"></ds-pagination>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'A disabled pagination component where all interactions are disabled.',
      },
    },
  },
};

// Single Page
export const SinglePage: Story = {
  render: () => html`
    <ds-pagination current-page="1" total-pages="1"></ds-pagination>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A pagination component with only one page.',
      },
    },
  },
};

// With Total Items
export const WithTotalItems: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>100 Items, 10 per page</h3>
        <ds-pagination
          current-page="3"
          total-items="100"
          items-per-page="10"
        ></ds-pagination>
      </div>

      <div>
        <h3>250 Items, 25 per page</h3>
        <ds-pagination
          current-page="5"
          total-items="250"
          items-per-page="25"
        ></ds-pagination>
      </div>

      <div>
        <h3>1000 Items, 50 per page</h3>
        <ds-pagination
          current-page="8"
          total-items="1000"
          items-per-page="50"
        ></ds-pagination>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Pagination components using total items and items per page to calculate total pages.',
      },
    },
  },
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>E-commerce Product List</h3>
        <ds-pagination
          variant="minimal"
          current-page="2"
          total-items="150"
          items-per-page="12"
          show-first-last
        ></ds-pagination>
      </div>

      <div>
        <h3>Search Results</h3>
        <ds-pagination
          variant="compact"
          size="small"
          current-page="1"
          total-items="45"
          items-per-page="10"
        ></ds-pagination>
      </div>

      <div>
        <h3>Admin Dashboard</h3>
        <ds-pagination
          current-page="7"
          total-items="500"
          items-per-page="25"
          show-first-last
          max-visible-pages="5"
        ></ds-pagination>
      </div>

      <div>
        <h3>Blog Archive</h3>
        <ds-pagination
          variant="minimal"
          current-page="3"
          total-pages="15"
          show-first-last
        ></ds-pagination>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of pagination usage in different contexts.',
      },
    },
  },
};
