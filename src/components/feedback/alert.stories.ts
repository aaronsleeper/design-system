import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Alert } from './alert.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Feedback/Alert',
  component: 'ds-alert',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component:
          'A feedback component for displaying important messages to users. Supports multiple variants, sizes, states, and dismissible functionality with full accessibility compliance.',
      },
    },
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'The visual variant of the alert',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the alert',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether the alert can be dismissed',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the alert is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    role: {
      control: { type: 'select' },
      options: ['alert', 'alertdialog', 'status'],
      description: 'The ARIA role of the alert',
      table: {
        defaultValue: { summary: 'alert' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the alert',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the alert',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    variant: 'default',
    size: 'medium',
    dismissible: false,
    disabled: false,
    role: 'alert',
  },
} satisfies Meta<Alert>;

export default meta;
type Story = StoryObj<Alert>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    dismissible: false,
  },
  render: args => html`
    <ds-alert
      variant="${args.variant}"
      size="${args.size}"
      ?dismissible="${args.dismissible}"
      ?disabled="${args.disabled}"
      role="${args.role}"
      aria-label="${args.ariaLabel || ''}"
      aria-describedby="${args.ariaDescribedBy || ''}"
    >
      This is a default alert message.
    </ds-alert>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 600px;"
    >
      <ds-alert variant="default"> This is a default alert message. </ds-alert>
      <ds-alert variant="success"> This is a success alert message. </ds-alert>
      <ds-alert variant="warning"> This is a warning alert message. </ds-alert>
      <ds-alert variant="error"> This is an error alert message. </ds-alert>
      <ds-alert variant="info"> This is an info alert message. </ds-alert>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'All available alert variants with their respective colors and icons.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 600px;"
    >
      <ds-alert variant="info" size="small">
        This is a small alert message.
      </ds-alert>
      <ds-alert variant="info" size="medium">
        This is a medium alert message.
      </ds-alert>
      <ds-alert variant="info" size="large">
        This is a large alert message.
      </ds-alert>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different sizes available for the alert component.',
      },
    },
  },
};

export const Dismissible: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 600px;"
    >
      <ds-alert variant="success" dismissible>
        This is a dismissible success alert. Click the × to dismiss it.
      </ds-alert>
      <ds-alert variant="warning" dismissible>
        This is a dismissible warning alert. Click the × to dismiss it.
      </ds-alert>
      <ds-alert variant="error" dismissible>
        This is a dismissible error alert. Click the × to dismiss it.
      </ds-alert>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Dismissible alerts with close buttons that allow users to hide the alert.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 600px;"
    >
      <ds-alert
        id="interactive-alert"
        variant="info"
        dismissible
        @ds-alert-render="${() => {
          /* Alert rendered */
        }}"
        @ds-alert-focus="${() => {
          /* Alert focused */
        }}"
        @ds-alert-blur="${() => {
          /* Alert blurred */
        }}"
        @ds-alert-dismiss="${() => {
          /* Alert dismissed */
        }}"
      >
        This is an interactive alert. Focus it, dismiss it, and check the
        console for events.
      </ds-alert>
      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
        <button onclick="document.getElementById('interactive-alert').focus()">
          Focus Alert
        </button>
        <button
          onclick="document.getElementById('interactive-alert').dismiss()"
        >
          Dismiss Alert
        </button>
        <button onclick="document.getElementById('interactive-alert').show()">
          Show Alert
        </button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive alert with event logging and programmatic control buttons.',
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 600px;"
    >
      <ds-alert
        variant="success"
        role="alert"
        aria-label="Success notification"
      >
        This alert has proper ARIA attributes for accessibility.
      </ds-alert>
      <ds-alert
        variant="warning"
        dismissible
        role="alertdialog"
        aria-label="Warning dialog"
        aria-describedby="warning-description"
      >
        <div id="warning-description">
          This alert uses alertdialog role and has a description reference.
        </div>
      </ds-alert>
      <ds-alert variant="info" role="status" aria-label="Status update">
        This alert uses status role for less urgent information.
      </ds-alert>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Alerts with proper accessibility attributes and different ARIA roles.',
      },
    },
  },
};

export const ComplexContent: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 600px;"
    >
      <ds-alert variant="success" dismissible>
        <h3
          style="margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600;"
        >
          Success!
        </h3>
        <p style="margin: 0 0 0.5rem 0;">
          Your changes have been saved successfully. You can now continue with
          your work.
        </p>
        <div style="display: flex; gap: 0.5rem;">
          <button
            style="padding: 0.25rem 0.75rem; background: var(--color-success); color: white; border: none; border-radius: 0.25rem; cursor: pointer;"
          >
            Continue
          </button>
          <button
            style="padding: 0.25rem 0.75rem; background: transparent; color: var(--color-success); border: 1px solid var(--color-success); border-radius: 0.25rem; cursor: pointer;"
          >
            View Details
          </button>
        </div>
      </ds-alert>

      <ds-alert variant="error" dismissible>
        <h3
          style="margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600;"
        >
          Error Occurred
        </h3>
        <p style="margin: 0 0 0.5rem 0;">
          We encountered an error while processing your request. Please try
          again or contact support if the problem persists.
        </p>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li>Check your internet connection</li>
          <li>Verify your input data</li>
          <li>Try refreshing the page</li>
        </ul>
      </ds-alert>

      <ds-alert variant="info" dismissible>
        <h3
          style="margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600;"
        >
          New Feature Available
        </h3>
        <p style="margin: 0 0 0.5rem 0;">
          We've added a new feature that might interest you.
          <a href="#" style="color: inherit; text-decoration: underline;"
            >Learn more</a
          >
          about what's new.
        </p>
      </ds-alert>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Alerts with complex content including headings, paragraphs, buttons, and lists.',
      },
    },
  },
};

export const States: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 600px;"
    >
      <ds-alert variant="info" state="default">
        This is a default state alert.
      </ds-alert>
      <ds-alert variant="info" state="focus">
        This is a focused state alert.
      </ds-alert>
      <ds-alert variant="info" disabled>
        This is a disabled state alert.
      </ds-alert>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different states of the alert component.',
      },
    },
  },
};

export const Themes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 600px;"
    >
      <ds-alert variant="success" dismissible>
        This alert adapts to light and dark themes automatically.
      </ds-alert>
      <ds-alert variant="warning" dismissible>
        Colors and contrast are optimized for accessibility.
      </ds-alert>
      <ds-alert variant="error" dismissible>
        High contrast mode is also supported.
      </ds-alert>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Alerts that automatically adapt to different themes and accessibility preferences.',
      },
    },
  },
};

export const Examples: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 600px;"
    >
      <ds-alert variant="success" dismissible>
        <strong>Welcome back!</strong> You have 3 new messages in your inbox.
      </ds-alert>

      <ds-alert variant="warning" dismissible>
        <strong>Maintenance Notice:</strong> The system will be down for
        maintenance on Sunday from 2:00 AM to 4:00 AM EST.
      </ds-alert>

      <ds-alert variant="error" dismissible>
        <strong>Connection Failed:</strong> Unable to connect to the server.
        Please check your internet connection and try again.
      </ds-alert>

      <ds-alert variant="info" dismissible>
        <strong>Tip:</strong> You can use keyboard shortcuts to navigate faster.
        Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open the command palette.
      </ds-alert>

      <ds-alert variant="default" dismissible>
        <strong>Reminder:</strong> Don't forget to save your work before closing
        the application.
      </ds-alert>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Real-world examples of how alerts might be used in applications.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    variant: 'info',
    size: 'medium',
    dismissible: true,
    disabled: false,
    role: 'alert',
  },
  render: args => html`
    <ds-alert
      variant="${args.variant}"
      size="${args.size}"
      ?dismissible="${args.dismissible}"
      ?disabled="${args.disabled}"
      role="${args.role}"
      aria-label="${args.ariaLabel || ''}"
      aria-describedby="${args.ariaDescribedBy || ''}"
    >
      This is a customizable alert. Use the controls below to modify its
      properties.
    </ds-alert>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different alert configurations.',
      },
    },
  },
};
