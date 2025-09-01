import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Typography } from './typography.js';

// Register the component
customElements.define('ds-typography', Typography);

const meta: Meta<Typography> = {
  title: 'Content/Typography',
  component: 'ds-typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Typography component provides a comprehensive set of text styles with semantic HTML elements and proper accessibility attributes.

## Features
- **Variants**: heading-1 through heading-6, body, caption, label
- **Sizes**: small, medium, large, xlarge
- **Weights**: light, normal, medium, semibold, bold
- **Colors**: primary, secondary, muted, inverse
- **Accessibility**: WCAG 2.1 AA compliant with proper semantic markup
- **Custom Elements**: Override semantic elements with the \`as\` property

## Usage
\`\`\`html
<ds-typography variant="heading-1" size="large" weight="bold">Main Title</ds-typography>
<ds-typography variant="body" size="medium" color="muted">Body text content</ds-typography>
<ds-typography variant="caption" size="small" as="span">Caption text</ds-typography>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'heading-1',
        'heading-2',
        'heading-3',
        'heading-4',
        'heading-5',
        'heading-6',
        'body',
        'caption',
        'label',
      ],
      description: 'Typography variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Typography size',
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Typography weight',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'muted', 'inverse'],
      description: 'Typography color',
    },
    as: {
      control: { type: 'text' },
      description: 'HTML element to render as (overrides semantic element)',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the typography',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the typography',
    },
    ariaLevel: {
      control: { type: 'text' },
      description: 'ARIA level for headings',
    },
  },
  args: {
    variant: 'body',
    size: 'medium',
    weight: 'normal',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<Typography>;

// Default Story
export const Default: Story = {
  args: {
    variant: 'body',
    size: 'medium',
    weight: 'normal',
    color: 'primary',
  },
  render: args => html`
    <ds-typography
      variant="${args.variant}"
      size="${args.size}"
      weight="${args.weight}"
      color="${args.color}"
      as="${args.as || ''}"
      aria-label="${args.ariaLabel || ''}"
      aria-describedby="${args.ariaDescribedBy || ''}"
      aria-level="${args.ariaLevel || ''}"
    >
      This is default typography text with customizable properties.
    </ds-typography>
  `,
};

// Variants Story
export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All typography variants with their semantic HTML elements.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-typography variant="heading-1">Heading 1 - Main Title</ds-typography>
      <ds-typography variant="heading-2"
        >Heading 2 - Section Title</ds-typography
      >
      <ds-typography variant="heading-3"
        >Heading 3 - Subsection Title</ds-typography
      >
      <ds-typography variant="heading-4">Heading 4 - Minor Title</ds-typography>
      <ds-typography variant="heading-5">Heading 5 - Small Title</ds-typography>
      <ds-typography variant="heading-6">Heading 6 - Tiny Title</ds-typography>
      <ds-typography variant="body"
        >Body text - Regular paragraph content</ds-typography
      >
      <ds-typography variant="caption"
        >Caption text - Small descriptive text</ds-typography
      >
      <ds-typography variant="label"
        >Label text - Form field labels</ds-typography
      >
    </div>
  `,
};

// Sizes Story
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Typography sizes from small to extra large.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-typography variant="body" size="small"
        >Small text (12px)</ds-typography
      >
      <ds-typography variant="body" size="medium"
        >Medium text (16px)</ds-typography
      >
      <ds-typography variant="body" size="large"
        >Large text (18px)</ds-typography
      >
      <ds-typography variant="body" size="xlarge"
        >Extra large text (20px)</ds-typography
      >
    </div>
  `,
};

// Weights Story
export const Weights: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Typography weights from light to bold.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-typography variant="body" weight="light"
        >Light weight text</ds-typography
      >
      <ds-typography variant="body" weight="normal"
        >Normal weight text</ds-typography
      >
      <ds-typography variant="body" weight="medium"
        >Medium weight text</ds-typography
      >
      <ds-typography variant="body" weight="semibold"
        >Semibold weight text</ds-typography
      >
      <ds-typography variant="body" weight="bold"
        >Bold weight text</ds-typography
      >
    </div>
  `,
};

// Colors Story
export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Typography colors for different contexts.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-typography variant="body" color="primary"
        >Primary color text</ds-typography
      >
      <ds-typography variant="body" color="secondary"
        >Secondary color text</ds-typography
      >
      <ds-typography variant="body" color="muted"
        >Muted color text</ds-typography
      >
      <div
        style="background-color: var(--color-primary); padding: 1rem; border-radius: 4px;"
      >
        <ds-typography variant="body" color="inverse"
          >Inverse color text</ds-typography
        >
      </div>
    </div>
  `,
};

// Interactive Story
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive typography with event handling and dynamic updates.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Dynamic Typography</h3>
        <ds-typography
          id="dynamic-typography"
          variant="heading-2"
          size="large"
          weight="semibold"
          color="primary"
        >
          This text updates dynamically
        </ds-typography>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button onclick="updateTypography('heading-1', 'heading-1')">H1</button>
        <button onclick="updateTypography('heading-2', 'heading-2')">H2</button>
        <button onclick="updateTypography('heading-3', 'heading-3')">H3</button>
        <button onclick="updateTypography('body', 'body')">Body</button>
        <button onclick="updateTypography('caption', 'caption')">
          Caption
        </button>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button onclick="updateTypography('variant', 'small')">Small</button>
        <button onclick="updateTypography('variant', 'medium')">Medium</button>
        <button onclick="updateTypography('variant', 'large')">Large</button>
        <button onclick="updateTypography('variant', 'xlarge')">XLarge</button>
      </div>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button onclick="updateTypography('variant', 'light')">Light</button>
        <button onclick="updateTypography('variant', 'normal')">Normal</button>
        <button onclick="updateTypography('variant', 'medium')">Medium</button>
        <button onclick="updateTypography('variant', 'semibold')">
          Semibold
        </button>
        <button onclick="updateTypography('variant', 'bold')">Bold</button>
      </div>
    </div>

    <script>
      function updateTypography(property, value) {
        const element = document.getElementById('dynamic-typography');
        if (element) {
          if (property === 'variant') {
            element.setAttribute('variant', value);
          } else {
            element.setAttribute(property, value);
          }
        }
      }
    </script>
  `,
};

// Accessibility Story
export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Typography with accessibility features and ARIA attributes.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Accessible Headings</h3>
        <ds-typography
          variant="heading-1"
          aria-label="Main page title"
          aria-level="1"
        >
          Accessible Main Title
        </ds-typography>
        <ds-typography
          variant="heading-2"
          aria-describedby="section-description"
        >
          Section with Description
        </ds-typography>
        <ds-typography id="section-description" variant="body" color="muted">
          This text describes the section above.
        </ds-typography>
      </div>

      <div>
        <h3>Form Labels</h3>
        <ds-typography variant="label" aria-label="Required field">
          Email Address *
        </ds-typography>
        <input
          type="email"
          placeholder="Enter your email"
          style="margin-top: 0.5rem; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; width: 200px;"
        />
      </div>

      <div>
        <h3>Screen Reader Announcements</h3>
        <ds-typography variant="caption" color="muted" aria-live="polite">
          This text will be announced to screen readers when it changes.
        </ds-typography>
      </div>
    </div>
  `,
};

// Themes Story
export const Themes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Typography in different theme contexts.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Light Theme</h3>
        <div
          style="background: white; padding: 2rem; border-radius: 8px; border: 1px solid #e5e5e5;"
        >
          <ds-typography variant="heading-2" color="primary"
            >Light Theme Heading</ds-typography
          >
          <ds-typography variant="body" color="secondary"
            >Light theme body text</ds-typography
          >
          <ds-typography variant="caption" color="muted"
            >Light theme caption</ds-typography
          >
        </div>
      </div>

      <div>
        <h3>Dark Theme</h3>
        <div style="background: #1a1a1a; padding: 2rem; border-radius: 8px;">
          <ds-typography variant="heading-2" color="inverse"
            >Dark Theme Heading</ds-typography
          >
          <ds-typography variant="body" color="inverse"
            >Dark theme body text</ds-typography
          >
          <ds-typography variant="caption" color="muted"
            >Dark theme caption</ds-typography
          >
        </div>
      </div>

      <div>
        <h3>Brand Theme</h3>
        <div
          style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 8px;"
        >
          <ds-typography variant="heading-2" color="inverse"
            >Brand Theme Heading</ds-typography
          >
          <ds-typography variant="body" color="inverse"
            >Brand theme body text</ds-typography
          >
          <ds-typography variant="caption" color="inverse"
            >Brand theme caption</ds-typography
          >
        </div>
      </div>
    </div>
  `,
};

// Examples Story
export const Examples: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of typography usage.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <!-- Article Example -->
      <div>
        <h3>Article Layout</h3>
        <article style="max-width: 600px;">
          <ds-typography variant="heading-1" size="xlarge" weight="bold">
            The Future of Web Development
          </ds-typography>
          <ds-typography variant="body" color="muted" size="small">
            Published on March 15, 2024 • 5 min read
          </ds-typography>
          <ds-typography
            variant="body"
            size="large"
            style="margin-top: 1.5rem;"
          >
            Web development is evolving rapidly with new technologies and
            frameworks emerging every day. This article explores the latest
            trends and what they mean for developers.
          </ds-typography>
          <ds-typography variant="heading-2" style="margin-top: 2rem;">
            Key Trends to Watch
          </ds-typography>
          <ds-typography variant="body">
            From server-side rendering to edge computing, the landscape is
            changing. Understanding these trends is crucial for staying ahead in
            the industry.
          </ds-typography>
        </article>
      </div>

      <!-- Card Example -->
      <div>
        <h3>Card Component</h3>
        <div
          style="border: 1px solid #e5e5e5; border-radius: 8px; padding: 1.5rem; max-width: 300px;"
        >
          <ds-typography variant="heading-3" weight="semibold">
            Product Card
          </ds-typography>
          <ds-typography
            variant="body"
            color="secondary"
            style="margin: 0.5rem 0;"
          >
            High-quality product description that explains the key features and
            benefits.
          </ds-typography>
          <ds-typography variant="heading-4" color="primary" weight="bold">
            $99.99
          </ds-typography>
          <ds-typography variant="caption" color="muted">
            Free shipping on orders over $50
          </ds-typography>
        </div>
      </div>

      <!-- Form Example -->
      <div>
        <h3>Form Layout</h3>
        <form
          style="max-width: 400px; display: flex; flex-direction: column; gap: 1rem;"
        >
          <ds-typography variant="heading-3" weight="semibold">
            Contact Form
          </ds-typography>
          <div>
            <ds-typography variant="label" weight="medium">
              Full Name *
            </ds-typography>
            <input
              type="text"
              placeholder="Enter your full name"
              style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; margin-top: 0.25rem;"
            />
          </div>
          <div>
            <ds-typography variant="label" weight="medium">
              Email Address *
            </ds-typography>
            <input
              type="email"
              placeholder="Enter your email"
              style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; margin-top: 0.25rem;"
            />
          </div>
          <div>
            <ds-typography variant="label" weight="medium">
              Message
            </ds-typography>
            <textarea
              placeholder="Enter your message"
              rows="4"
              style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; margin-top: 0.25rem; resize: vertical;"
            ></textarea>
          </div>
          <ds-typography variant="caption" color="muted">
            * Required fields
          </ds-typography>
        </form>
      </div>
    </div>
  `,
};

// Custom Elements Story
export const CustomElements: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Using the `as` property to override semantic elements.',
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Override Semantic Elements</h3>
        <p>
          Sometimes you need to use different HTML elements while maintaining
          the typography styles:
        </p>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <ds-typography variant="heading-1" as="div">
            H1 style as div element
          </ds-typography>
          <ds-typography variant="heading-2" as="span">
            H2 style as span element
          </ds-typography>
          <ds-typography variant="body" as="article">
            Body style as article element
          </ds-typography>
          <ds-typography variant="caption" as="time">
            Caption style as time element
          </ds-typography>
        </div>
      </div>

      <div>
        <h3>Inline vs Block Elements</h3>
        <p>
          This is a paragraph with
          <ds-typography
            variant="heading-3"
            as="span"
            size="small"
            weight="bold"
          >
            inline heading style
          </ds-typography>
          and
          <ds-typography
            variant="body"
            as="span"
            color="primary"
            weight="semibold"
          >
            inline body style
          </ds-typography>
          text mixed together.
        </p>
      </div>
    </div>
  `,
};
