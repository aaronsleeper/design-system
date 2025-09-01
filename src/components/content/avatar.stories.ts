import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Avatar } from './avatar.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/spacing.scss';
import '../../tokens/typography.scss';

const meta: Meta<Avatar> = {
  title: 'Content/Avatar',
  component: 'ds-avatar',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Avatar component displays user profile pictures, initials, or placeholder content. 
It supports multiple variants, sizes, and states with full accessibility compliance.

## Features
- **Variants**: default, circle, square
- **Sizes**: small, medium, large, xlarge
- **States**: default, focus, disabled
- **Content**: image, initials, or placeholder
- **Accessibility**: WCAG 2.1 AA compliant
- **Theming**: CSS custom properties support

## Usage
Use avatars to represent users in your application. They can display profile images, 
user initials, or a default placeholder icon.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'circle', 'square'],
      description: 'The visual style variant of the avatar',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'The size of the avatar',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'focus', 'disabled'],
      description: 'The current state of the avatar',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    src: {
      control: { type: 'text' },
      description: 'Image source URL for the avatar',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for the avatar image',
    },
    initials: {
      control: { type: 'text' },
      description: 'Initials to display when no image is provided',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the avatar',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the avatar',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    state: 'default',
  },
};

export default meta;
type Story = StoryObj<Avatar>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-avatar
      variant="${args.variant}"
      size="${args.size}"
      state="${args.state}"
      src="${args.src || ''}"
      alt="${args.alt || ''}"
      initials="${args.initials || ''}"
      aria-label="${args.ariaLabel || ''}"
      aria-describedby="${args.ariaDescribedBy || ''}"
    ></ds-avatar>
  `,
  args: {
    initials: 'JD',
  },
};

// Variants story
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div style="text-align: center;">
        <ds-avatar variant="default" initials="AB" size="large"></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Default</p>
      </div>
      <div style="text-align: center;">
        <ds-avatar variant="circle" initials="CD" size="large"></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Circle</p>
      </div>
      <div style="text-align: center;">
        <ds-avatar variant="square" initials="EF" size="large"></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Square</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Avatar component supports three visual variants: default (rounded corners), circle (fully rounded), and square (sharp corners).',
      },
    },
  },
};

// Sizes story
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div style="text-align: center;">
        <ds-avatar size="small" initials="S" variant="circle"></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Small</p>
      </div>
      <div style="text-align: center;">
        <ds-avatar size="medium" initials="M" variant="circle"></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Medium</p>
      </div>
      <div style="text-align: center;">
        <ds-avatar size="large" initials="L" variant="circle"></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Large</p>
      </div>
      <div style="text-align: center;">
        <ds-avatar size="xlarge" initials="XL" variant="circle"></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">XLarge</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Avatar component supports four sizes: small (2rem), medium (2.5rem), large (3rem), and xlarge (4rem).',
      },
    },
  },
};

// Content types story
export const ContentTypes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div style="text-align: center;">
        <ds-avatar initials="JD" size="large" variant="circle"></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Initials</p>
      </div>
      <div style="text-align: center;">
        <ds-avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          alt="John Doe"
          size="large"
          variant="circle"
        ></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Image</p>
      </div>
      <div style="text-align: center;">
        <ds-avatar size="large" variant="circle"></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Placeholder</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Avatar component can display user initials, profile images, or a default placeholder icon when no content is provided.',
      },
    },
  },
};

// States story
export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <div style="text-align: center;">
        <ds-avatar
          state="default"
          initials="D"
          size="large"
          variant="circle"
        ></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Default</p>
      </div>
      <div style="text-align: center;">
        <ds-avatar
          state="focus"
          initials="F"
          size="large"
          variant="circle"
        ></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Focus</p>
      </div>
      <div style="text-align: center;">
        <ds-avatar
          disabled
          initials="X"
          size="large"
          variant="circle"
        ></ds-avatar>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Disabled</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Avatar component supports different states: default, focus (with focus ring), and disabled (with reduced opacity).',
      },
    },
  },
};

// Interactive story
export const Interactive: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; align-items: center;"
    >
      <ds-avatar
        id="interactive-avatar"
        initials="IA"
        size="large"
        variant="circle"
        aria-label="Interactive Avatar"
      ></ds-avatar>
      <div style="display: flex; gap: 0.5rem;">
        <button onclick="document.getElementById('interactive-avatar').focus()">
          Focus Avatar
        </button>
        <button onclick="document.getElementById('interactive-avatar').blur()">
          Blur Avatar
        </button>
      </div>
      <div
        id="event-log"
        style="font-size: 0.875rem; color: #666; max-width: 300px; text-align: center;"
      >
        Events will appear here...
      </div>
    </div>
    <script>
      const avatar = document.getElementById('interactive-avatar');
      const eventLog = document.getElementById('event-log');

      avatar.addEventListener('ds-avatar-render', e => {
        eventLog.textContent = 'Render event fired';
      });

      avatar.addEventListener('ds-avatar-focus', e => {
        eventLog.textContent = 'Focus event fired';
      });

      avatar.addEventListener('ds-avatar-blur', e => {
        eventLog.textContent = 'Blur event fired';
      });
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive avatar demonstrating focus management and event handling. Click the buttons to focus/blur the avatar and see events in the log.',
      },
    },
  },
};

// Accessibility story
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <ds-avatar
          initials="JD"
          size="large"
          variant="circle"
          aria-label="John Doe, Software Engineer"
        ></ds-avatar>
        <div>
          <h3 style="margin: 0; font-size: 1.125rem;">John Doe</h3>
          <p style="margin: 0; color: #666; font-size: 0.875rem;">
            Software Engineer
          </p>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; align-items: center;">
        <ds-avatar
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
          alt="Jane Smith, Product Manager"
          size="large"
          variant="circle"
        ></ds-avatar>
        <div>
          <h3 style="margin: 0; font-size: 1.125rem;">Jane Smith</h3>
          <p style="margin: 0; color: #666; font-size: 0.875rem;">
            Product Manager
          </p>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; align-items: center;">
        <ds-avatar
          initials="AB"
          size="large"
          variant="circle"
          aria-label="Alex Brown, Designer"
          aria-describedby="user-role"
        ></ds-avatar>
        <div>
          <h3 style="margin: 0; font-size: 1.125rem;">Alex Brown</h3>
          <p
            id="user-role"
            style="margin: 0; color: #666; font-size: 0.875rem;"
          >
            Designer
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility examples showing proper ARIA labeling and semantic markup for screen readers.',
      },
    },
  },
};

// Themes story
export const Themes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">Light Theme</h3>
        <div
          style="display: flex; gap: 1rem; align-items: center; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;"
        >
          <ds-avatar initials="LT" size="large" variant="circle"></ds-avatar>
          <ds-avatar initials="LM" size="large" variant="default"></ds-avatar>
          <ds-avatar initials="LS" size="large" variant="square"></ds-avatar>
        </div>
      </div>

      <div>
        <h3 style="margin-bottom: 1rem;">Dark Theme</h3>
        <div
          style="display: flex; gap: 1rem; align-items: center; padding: 1rem; background: #1f2937; border-radius: 0.5rem;"
        >
          <ds-avatar initials="DT" size="large" variant="circle"></ds-avatar>
          <ds-avatar initials="DM" size="large" variant="default"></ds-avatar>
          <ds-avatar initials="DS" size="large" variant="square"></ds-avatar>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Avatar component supports both light and dark themes through CSS custom properties.',
      },
    },
  },
};

// Examples story
export const Examples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">User List</h3>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div
            style="display: flex; gap: 0.75rem; align-items: center; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;"
          >
            <ds-avatar initials="JD" size="medium" variant="circle"></ds-avatar>
            <div>
              <p style="margin: 0; font-weight: 500;">John Doe</p>
              <p style="margin: 0; font-size: 0.875rem; color: #666;">
                john@example.com
              </p>
            </div>
          </div>
          <div
            style="display: flex; gap: 0.75rem; align-items: center; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;"
          >
            <ds-avatar initials="JS" size="medium" variant="circle"></ds-avatar>
            <div>
              <p style="margin: 0; font-weight: 500;">Jane Smith</p>
              <p style="margin: 0; font-size: 0.875rem; color: #666;">
                jane@example.com
              </p>
            </div>
          </div>
          <div
            style="display: flex; gap: 0.75rem; align-items: center; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;"
          >
            <ds-avatar initials="AB" size="medium" variant="circle"></ds-avatar>
            <div>
              <p style="margin: 0; font-weight: 500;">Alex Brown</p>
              <p style="margin: 0; font-size: 0.875rem; color: #666;">
                alex@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin-bottom: 1rem;">Team Members</h3>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <ds-avatar initials="TM" size="small" variant="circle"></ds-avatar>
          <ds-avatar initials="TM" size="small" variant="circle"></ds-avatar>
          <ds-avatar initials="TM" size="small" variant="circle"></ds-avatar>
          <ds-avatar initials="TM" size="small" variant="circle"></ds-avatar>
          <span style="font-size: 0.875rem; color: #666;">+5 more</span>
        </div>
      </div>

      <div>
        <h3 style="margin-bottom: 1rem;">Profile Card</h3>
        <div
          style="display: flex; flex-direction: column; align-items: center; padding: 2rem; border: 1px solid #e5e7eb; border-radius: 0.75rem; max-width: 300px;"
        >
          <ds-avatar initials="PC" size="xlarge" variant="circle"></ds-avatar>
          <h2 style="margin: 1rem 0 0.5rem 0; font-size: 1.25rem;">
            Profile Card
          </h2>
          <p
            style="margin: 0; color: #666; text-align: center; font-size: 0.875rem;"
          >
            This is an example of how avatars can be used in profile cards and
            user interfaces.
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Real-world examples showing how the Avatar component can be used in different contexts like user lists, team members, and profile cards.',
      },
    },
  },
};
