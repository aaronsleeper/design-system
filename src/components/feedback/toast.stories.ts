import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Toast } from './toast.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/spacing.scss';
import '../../tokens/typography.scss';

const meta: Meta<Toast> = {
  title: 'Components/Feedback/Toast',
  component: 'ds-toast',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A feedback component for displaying temporary messages to users. 
Supports multiple variants, sizes, states, positioning, and auto-dismiss functionality with full accessibility compliance.

## Features
- **Variants**: default, success, warning, error, info
- **Sizes**: small, medium, large
- **Positions**: top, bottom, left, right
- **Auto-dismiss**: Configurable auto-dismiss timing
- **Dismissible**: Manual dismiss functionality
- **Accessibility**: WCAG 2.1 AA compliant

## Usage
\`\`\`html
<ds-toast variant="success" size="medium" position="top" auto-dismiss>
  Success message
</ds-toast>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Visual variant of the toast',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the toast',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the toast on screen',
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether the toast can be dismissed',
    },
    autoDismiss: {
      control: { type: 'boolean' },
      description: 'Whether the toast should auto-dismiss',
    },
    autoDismissDelay: {
      control: { type: 'number', min: 1000, max: 30000, step: 1000 },
      description: 'Auto-dismiss delay in milliseconds',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the toast',
    },
    role: {
      control: { type: 'select' },
      options: ['alert', 'alertdialog', 'status'],
      description: 'ARIA role for the toast',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    position: 'top',
    dismissible: true,
    autoDismiss: false,
    autoDismissDelay: 5000,
    role: 'alert',
  },
};

export default meta;
type Story = StoryObj<Toast>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-toast
      variant="${args.variant}"
      size="${args.size}"
      position="${args.position}"
      ?dismissible="${args.dismissible}"
      ?auto-dismiss="${args.autoDismiss}"
      auto-dismiss-delay="${args.autoDismissDelay}"
      aria-label="${args.ariaLabel || ''}"
      role="${args.role}"
    >
      This is a default toast message with some content to demonstrate the
      component.
    </ds-toast>
  `,
};

// Variants story
export const Variants: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;"
    >
      <ds-toast variant="default" position="top">
        Default toast message
      </ds-toast>

      <ds-toast variant="success" position="top">
        Success! Your action was completed successfully.
      </ds-toast>

      <ds-toast variant="warning" position="top">
        Warning: Please review your input before proceeding.
      </ds-toast>

      <ds-toast variant="error" position="top">
        Error: Something went wrong. Please try again.
      </ds-toast>

      <ds-toast variant="info" position="top">
        Info: Here's some helpful information for you.
      </ds-toast>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants of the toast component.',
      },
    },
  },
};

// Sizes story
export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;"
    >
      <ds-toast variant="info" size="small" position="top">
        Small toast message
      </ds-toast>

      <ds-toast variant="info" size="medium" position="top">
        Medium toast message with more content to demonstrate the size
        difference.
      </ds-toast>

      <ds-toast variant="info" size="large" position="top">
        Large toast message with even more content to show the full size
        capabilities of the component.
      </ds-toast>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different sizes of the toast component.',
      },
    },
  },
};

// Positions story
export const Positions: Story = {
  render: () => html`
    <ds-toast variant="success" size="medium" position="top">
      Top positioned toast
    </ds-toast>

    <ds-toast variant="warning" size="medium" position="bottom">
      Bottom positioned toast
    </ds-toast>

    <ds-toast variant="error" size="medium" position="left">
      Left positioned toast
    </ds-toast>

    <ds-toast variant="info" size="medium" position="right">
      Right positioned toast
    </ds-toast>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different positioning options for the toast component.',
      },
    },
  },
};

// Auto-dismiss story
export const AutoDismiss: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;"
    >
      <ds-toast
        variant="success"
        size="medium"
        position="top"
        auto-dismiss
        auto-dismiss-delay="3000"
      >
        This toast will auto-dismiss in 3 seconds
      </ds-toast>

      <ds-toast
        variant="info"
        size="medium"
        position="top"
        auto-dismiss
        auto-dismiss-delay="5000"
      >
        This toast will auto-dismiss in 5 seconds
      </ds-toast>

      <ds-toast
        variant="warning"
        size="medium"
        position="top"
        auto-dismiss
        auto-dismiss-delay="7000"
      >
        This toast will auto-dismiss in 7 seconds
      </ds-toast>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Toast components with auto-dismiss functionality enabled.',
      },
    },
  },
};

// Interactive story
export const Interactive: Story = {
  render: () => html`
    <div style="padding: 1rem;">
      <div style="margin-bottom: 1rem;">
        <button
          id="show-success"
          style="margin-right: 0.5rem; padding: 0.5rem 1rem; background: #22c55e; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Show Success Toast
        </button>
        <button
          id="show-warning"
          style="margin-right: 0.5rem; padding: 0.5rem 1rem; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Show Warning Toast
        </button>
        <button
          id="show-error"
          style="margin-right: 0.5rem; padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Show Error Toast
        </button>
        <button
          id="show-info"
          style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Show Info Toast
        </button>
      </div>

      <ds-toast
        id="interactive-toast"
        variant="default"
        size="medium"
        position="top"
        dismissible
      >
        Click the buttons above to change this toast
      </ds-toast>
    </div>

    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const toast = document.getElementById('interactive-toast');
        const successBtn = document.getElementById('show-success');
        const warningBtn = document.getElementById('show-warning');
        const errorBtn = document.getElementById('show-error');
        const infoBtn = document.getElementById('show-info');

        successBtn?.addEventListener('click', () => {
          toast.variant = 'success';
          toast.textContent = 'Success! Action completed successfully.';
          toast.show();
        });

        warningBtn?.addEventListener('click', () => {
          toast.variant = 'warning';
          toast.textContent = 'Warning: Please review your input.';
          toast.show();
        });

        errorBtn?.addEventListener('click', () => {
          toast.variant = 'error';
          toast.textContent = 'Error: Something went wrong.';
          toast.show();
        });

        infoBtn?.addEventListener('click', () => {
          toast.variant = 'info';
          toast.textContent = 'Info: Here is some helpful information.';
          toast.show();
        });
      });
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive toast that can be controlled with buttons.',
      },
    },
  },
};

// Accessibility story
export const Accessibility: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;"
    >
      <ds-toast
        variant="success"
        size="medium"
        position="top"
        aria-label="Success notification"
      >
        Success message with custom aria-label
      </ds-toast>

      <ds-toast variant="warning" size="medium" position="top" role="status">
        Warning message with status role
      </ds-toast>

      <ds-toast variant="error" size="medium" position="top" role="alertdialog">
        Error message with alertdialog role
      </ds-toast>

      <ds-toast variant="info" size="medium" position="top" dismissible="false">
        Non-dismissible info message
      </ds-toast>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Toast components demonstrating accessibility features including ARIA attributes and roles.',
      },
    },
  },
};

// Themes story
export const Themes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;"
    >
      <h3>Light Theme</h3>
      <ds-toast variant="default" size="medium" position="top">
        Default toast in light theme
      </ds-toast>

      <h3>Dark Theme (simulated)</h3>
      <div style="background: #1f2937; padding: 1rem; border-radius: 8px;">
        <ds-toast variant="default" size="medium" position="top">
          Default toast in dark theme
        </ds-toast>
      </div>

      <h3>High Contrast</h3>
      <ds-toast
        variant="success"
        size="medium"
        position="top"
        style="border-width: 2px;"
      >
        Success toast with high contrast styling
      </ds-toast>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Toast components in different theme contexts.',
      },
    },
  },
};

// Examples story
export const Examples: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;"
    >
      <h3>Form Validation</h3>
      <ds-toast variant="error" size="medium" position="top" dismissible>
        Please fill in all required fields before submitting the form.
      </ds-toast>

      <h3>File Upload</h3>
      <ds-toast
        variant="success"
        size="medium"
        position="top"
        auto-dismiss
        auto-dismiss-delay="4000"
      >
        File uploaded successfully! Your document is now available.
      </ds-toast>

      <h3>Network Status</h3>
      <ds-toast
        variant="warning"
        size="small"
        position="bottom"
        auto-dismiss
        auto-dismiss-delay="6000"
      >
        Connection unstable. Some features may not work properly.
      </ds-toast>

      <h3>System Notification</h3>
      <ds-toast variant="info" size="large" position="right" dismissible>
        <strong>System Maintenance</strong><br />
        Scheduled maintenance will begin at 2:00 AM EST. Please save your work.
      </ds-toast>

      <h3>User Action Feedback</h3>
      <ds-toast
        variant="success"
        size="medium"
        position="top"
        auto-dismiss
        auto-dismiss-delay="3000"
      >
        Profile updated successfully!
      </ds-toast>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of toast usage in different scenarios.',
      },
    },
  },
};

// Performance story
export const Performance: Story = {
  render: () => html`
    <div style="padding: 1rem;">
      <div style="margin-bottom: 1rem;">
        <button
          id="show-many-toasts"
          style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Show 10 Toasts
        </button>
        <button
          id="clear-toasts"
          style="margin-left: 0.5rem; padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Clear All Toasts
        </button>
      </div>

      <div id="toast-container"></div>
    </div>

    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('toast-container');
        const showBtn = document.getElementById('show-many-toasts');
        const clearBtn = document.getElementById('clear-toasts');

        showBtn?.addEventListener('click', () => {
          const variants = ['success', 'warning', 'error', 'info'];
          const positions = ['top', 'bottom', 'left', 'right'];

          for (let i = 0; i < 10; i++) {
            const toast = document.createElement('ds-toast');
            toast.variant = variants[i % variants.length];
            toast.position = positions[i % positions.length];
            toast.size = 'small';
            toast.autoDismiss = true;
            toast.autoDismissDelay = 3000 + i * 500;
            toast.textContent = \`Toast \${i + 1}: \${toast.variant} variant\`;

            container?.appendChild(toast);
          }
        });

        clearBtn?.addEventListener('click', () => {
          const toasts = container?.querySelectorAll('ds-toast');
          toasts?.forEach(toast => toast.dismiss());
        });
      });
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Performance demonstration with multiple toasts.',
      },
    },
  },
};
