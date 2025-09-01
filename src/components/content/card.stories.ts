import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Card } from './card.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/spacing.scss';
import '../../tokens/typography.scss';

const meta: Meta<Card> = {
  title: 'Components/Content/Card',
  component: 'ds-card',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive card component with multiple variants, sizes, states, and colors.
Supports both static cards and clickable cards with optional link functionality.

## Features
- **Variants**: default, elevated, outlined, filled
- **Sizes**: small, medium, large
- **States**: default, hover, focus, disabled
- **Colors**: primary, secondary, neutral, inverse
- **Accessibility**: WCAG 2.1 AA compliant
- **Events**: ds-card-click, ds-card-focus, ds-card-blur

## Usage
\`\`\`html
<ds-card variant="elevated" size="medium" color="primary">
  Card content
</ds-card>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'Card variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Card size',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'focus', 'disabled'],
      description: 'Card state',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'neutral', 'inverse'],
      description: 'Card color theme',
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Whether the card is clickable',
    },
    href: {
      control: { type: 'text' },
      description: 'URL for clickable cards (renders as anchor tag)',
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Target for clickable cards',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the card',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the card',
    },
    ariaExpanded: {
      control: { type: 'text' },
      description: 'Whether the card controls an expanded element',
    },
    ariaPressed: {
      control: { type: 'text' },
      description: 'Whether the card is pressed (for toggle cards)',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    state: 'default',
    color: 'neutral',
    clickable: false,
    href: undefined,
    target: '_self',
    ariaLabel: undefined,
    ariaDescribedBy: undefined,
    ariaExpanded: undefined,
    ariaPressed: undefined,
  },
};

export default meta;
type Story = StoryObj<Card>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-card
      variant="${args.variant}"
      size="${args.size}"
      state="${args.state}"
      color="${args.color}"
      ?clickable="${args.clickable}"
      href="${args.href || undefined}"
      target="${args.target}"
      aria-label="${args.ariaLabel || undefined}"
      aria-describedby="${args.ariaDescribedBy || undefined}"
      aria-expanded="${args.ariaExpanded || undefined}"
      aria-pressed="${args.ariaPressed || undefined}"
    >
      <div class="card__header">
        <h3>Card Title</h3>
      </div>
      <div class="card__body">
        <p>
          This is a basic card with default styling. It contains a header and
          body content.
        </p>
      </div>
    </ds-card>
  `,
};

// Variants story
export const Variants: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 800px;"
    >
      <ds-card variant="default">
        <div class="card__header">
          <h3>Default Card</h3>
        </div>
        <div class="card__body">
          <p>This is a default card with a simple border.</p>
        </div>
      </ds-card>

      <ds-card variant="elevated">
        <div class="card__header">
          <h3>Elevated Card</h3>
        </div>
        <div class="card__body">
          <p>This is an elevated card with shadow effects.</p>
        </div>
      </ds-card>

      <ds-card variant="outlined">
        <div class="card__header">
          <h3>Outlined Card</h3>
        </div>
        <div class="card__body">
          <p>This is an outlined card with a prominent border.</p>
        </div>
      </ds-card>

      <ds-card variant="filled">
        <div class="card__header">
          <h3>Filled Card</h3>
        </div>
        <div class="card__body">
          <p>This is a filled card with background color.</p>
        </div>
      </ds-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different card variants showing various visual styles.',
      },
    },
  },
};

// Sizes story
export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;"
    >
      <ds-card size="small">
        <div class="card__header">
          <h4>Small Card</h4>
        </div>
        <div class="card__body">
          <p>This is a small card with compact padding.</p>
        </div>
      </ds-card>

      <ds-card size="medium">
        <div class="card__header">
          <h3>Medium Card</h3>
        </div>
        <div class="card__body">
          <p>This is a medium card with standard padding.</p>
        </div>
      </ds-card>

      <ds-card size="large">
        <div class="card__header">
          <h2>Large Card</h2>
        </div>
        <div class="card__body">
          <p>This is a large card with generous padding.</p>
        </div>
      </ds-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different card sizes showing various padding and font sizes.',
      },
    },
  },
};

// Colors story
export const Colors: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 800px;"
    >
      <ds-card color="primary" variant="elevated">
        <div class="card__header">
          <h3>Primary Card</h3>
        </div>
        <div class="card__body">
          <p>This is a primary colored card.</p>
        </div>
      </ds-card>

      <ds-card color="secondary" variant="elevated">
        <div class="card__header">
          <h3>Secondary Card</h3>
        </div>
        <div class="card__body">
          <p>This is a secondary colored card.</p>
        </div>
      </ds-card>

      <ds-card color="neutral" variant="elevated">
        <div class="card__header">
          <h3>Neutral Card</h3>
        </div>
        <div class="card__body">
          <p>This is a neutral colored card.</p>
        </div>
      </ds-card>

      <ds-card color="inverse" variant="elevated">
        <div class="card__header">
          <h3>Inverse Card</h3>
        </div>
        <div class="card__body">
          <p>This is an inverse colored card.</p>
        </div>
      </ds-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different card colors showing various theme options.',
      },
    },
  },
};

// Interactive story
export const Interactive: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 800px;"
    >
      <ds-card clickable>
        <div class="card__header">
          <h3>Clickable Card</h3>
        </div>
        <div class="card__body">
          <p>This card is clickable and will show hover effects.</p>
        </div>
        <div class="card__footer">
          <small>Click me!</small>
        </div>
      </ds-card>

      <ds-card href="https://example.com" target="_blank">
        <div class="card__header">
          <h3>Link Card</h3>
        </div>
        <div class="card__body">
          <p>This card is a link that opens in a new tab.</p>
        </div>
        <div class="card__footer">
          <small>External link</small>
        </div>
      </ds-card>

      <ds-card state="disabled">
        <div class="card__header">
          <h3>Disabled Card</h3>
        </div>
        <div class="card__body">
          <p>This card is disabled and cannot be interacted with.</p>
        </div>
      </ds-card>

      <ds-card clickable aria-pressed="false">
        <div class="card__header">
          <h3>Toggle Card</h3>
        </div>
        <div class="card__body">
          <p>This card can be toggled on and off.</p>
        </div>
      </ds-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive cards showing different interaction states and behaviors.',
      },
    },
  },
};

// Accessibility story
export const Accessibility: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;"
    >
      <ds-card
        clickable
        aria-label="Product card for wireless headphones"
        aria-describedby="headphone-description"
      >
        <div class="card__header">
          <h3>Wireless Headphones</h3>
        </div>
        <div class="card__body">
          <p id="headphone-description">
            High-quality wireless headphones with noise cancellation and 30-hour
            battery life.
          </p>
        </div>
        <div class="card__footer">
          <strong>$199.99</strong>
        </div>
      </ds-card>

      <ds-card
        clickable
        aria-expanded="false"
        aria-controls="expandable-content"
      >
        <div class="card__header">
          <h3>Expandable Card</h3>
        </div>
        <div class="card__body">
          <p>This card can be expanded to show more content.</p>
          <div id="expandable-content" style="display: none;">
            <p>Additional content that can be shown or hidden.</p>
          </div>
        </div>
      </ds-card>

      <ds-card clickable aria-pressed="false" role="button">
        <div class="card__header">
          <h3>Toggle Card</h3>
        </div>
        <div class="card__body">
          <p>This card acts as a toggle button with proper ARIA attributes.</p>
        </div>
      </ds-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Cards with proper accessibility attributes for screen readers and keyboard navigation.',
      },
    },
  },
};

// Complex content story
export const ComplexContent: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 800px;"
    >
      <ds-card variant="elevated" size="large">
        <img
          class="card__media"
          src="https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Product+Image"
          alt="Product image"
        />
        <div class="card__header">
          <h3>Product Card</h3>
          <p style="color: var(--color-text-secondary); margin: 0;">Category</p>
        </div>
        <div class="card__body">
          <p>
            This is a product card with an image, header, body, and action
            buttons.
          </p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
        <div class="card__actions">
          <button>Add to Cart</button>
          <button>View Details</button>
        </div>
      </ds-card>

      <ds-card variant="outlined" color="primary">
        <div class="card__header">
          <h3>Article Card</h3>
          <p
            style="color: var(--color-text-secondary); margin: 0; font-size: 0.875rem;"
          >
            Published on March 15, 2024
          </p>
        </div>
        <div class="card__body">
          <p>
            This is an article card with metadata, content preview, and social
            actions.
          </p>
          <blockquote
            style="border-left: 3px solid var(--color-primary); padding-left: 1rem; margin: 1rem 0; font-style: italic;"
          >
            "A great quote from the article that provides insight into the
            content."
          </blockquote>
        </div>
        <div class="card__footer">
          <div
            style="display: flex; justify-content: space-between; align-items: center;"
          >
            <span
              style="font-size: 0.875rem; color: var(--color-text-secondary);"
            >
              By Author Name
            </span>
            <div class="card__actions">
              <button>Like</button>
              <button>Share</button>
            </div>
          </div>
        </div>
      </ds-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Cards with complex content including images, metadata, and multiple action areas.',
      },
    },
  },
};

// States story
export const States: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 800px;"
    >
      <ds-card state="default">
        <div class="card__header">
          <h3>Default State</h3>
        </div>
        <div class="card__body">
          <p>This card is in its default state.</p>
        </div>
      </ds-card>

      <ds-card state="hover">
        <div class="card__header">
          <h3>Hover State</h3>
        </div>
        <div class="card__body">
          <p>This card is in hover state (simulated).</p>
        </div>
      </ds-card>

      <ds-card state="focus">
        <div class="card__header">
          <h3>Focus State</h3>
        </div>
        <div class="card__body">
          <p>This card is in focus state (simulated).</p>
        </div>
      </ds-card>

      <ds-card state="disabled">
        <div class="card__header">
          <h3>Disabled State</h3>
        </div>
        <div class="card__body">
          <p>This card is disabled and cannot be interacted with.</p>
        </div>
      </ds-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different card states showing various interaction states.',
      },
    },
  },
};

// Form integration story
export const FormIntegration: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;"
    >
      <ds-card clickable>
        <div class="card__header">
          <h3>Select Option A</h3>
        </div>
        <div class="card__body">
          <p>This is option A with detailed description.</p>
        </div>
        <input
          type="radio"
          name="option"
          value="A"
          style="position: absolute; top: 1rem; right: 1rem;"
        />
      </ds-card>

      <ds-card clickable>
        <div class="card__header">
          <h3>Select Option B</h3>
        </div>
        <div class="card__body">
          <p>This is option B with detailed description.</p>
        </div>
        <input
          type="radio"
          name="option"
          value="B"
          style="position: absolute; top: 1rem; right: 1rem;"
        />
      </ds-card>

      <ds-card clickable>
        <div class="card__header">
          <h3>Select Option C</h3>
        </div>
        <div class="card__body">
          <p>This is option C with detailed description.</p>
        </div>
        <input
          type="radio"
          name="option"
          value="C"
          style="position: absolute; top: 1rem; right: 1rem;"
        />
      </ds-card>
    </form>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Cards integrated with form elements for selection interfaces.',
      },
    },
  },
};

// Theming story
export const Theming: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 800px;"
    >
      <div>
        <h4>Light Theme</h4>
        <ds-card variant="elevated" color="primary">
          <div class="card__header">
            <h3>Light Theme Card</h3>
          </div>
          <div class="card__body">
            <p>This card uses the light theme colors.</p>
          </div>
        </ds-card>
      </div>

      <div
        style="background: var(--color-gray-900); padding: 1rem; border-radius: 0.5rem;"
      >
        <h4 style="color: white;">Dark Theme</h4>
        <ds-card variant="elevated" color="inverse">
          <div class="card__header">
            <h3>Dark Theme Card</h3>
          </div>
          <div class="card__body">
            <p>This card uses the dark theme colors.</p>
          </div>
        </ds-card>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Cards showing different theme variations and color schemes.',
      },
    },
  },
};
