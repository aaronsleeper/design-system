import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Switch } from './switch.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/typography.scss';
import '../../tokens/spacing.scss';

const meta: Meta<Switch> = {
  title: 'Components/Form/Switch',
  component: 'ds-switch',
  parameters: {
    docs: {
      description: {
        component: `
A comprehensive switch component with multiple sizes, states, and validation.
Provides toggle functionality with built-in validation feedback.

## Features
- **Sizes**: small, medium, large
- **States**: default, focus, error, disabled, checked, unchecked
- **Validation**: Built-in validation with error messages
- **Accessibility**: WCAG 2.1 AA compliant with proper labeling
- **Events**: \`ds-switch-change\`, \`ds-switch-focus\`, \`ds-switch-blur\`, \`ds-switch-validate\`

## Usage
\`\`\`html
<ds-switch size="medium" checked>Enable notifications</ds-switch>
<ds-switch size="large" validation-state="error" error-message="This field is required"></ds-switch>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the switch',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the switch is checked',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the switch is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the switch is required',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    validationState: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'The validation state of the switch',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    successMessage: {
      control: { type: 'text' },
      description: 'Success message to display',
    },
    warningMessage: {
      control: { type: 'text' },
      description: 'Warning message to display',
    },
    name: {
      control: { type: 'text' },
      description: 'Name attribute for form submission',
    },
    value: {
      control: { type: 'text' },
      description: 'Value attribute for form submission',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the switch',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the switch',
    },
    ariaInvalid: {
      control: { type: 'select' },
      options: ['true', 'false', ''],
      description: 'Whether the switch is invalid',
    },
  },
  args: {
    size: 'medium',
    checked: false,
    disabled: false,
    required: false,
    validationState: 'default',
    errorMessage: '',
    successMessage: '',
    warningMessage: '',
    name: '',
    value: '',
    ariaLabel: '',
    ariaDescribedBy: '',
    ariaInvalid: '',
  },
};

export default meta;
type Story = StoryObj<Switch>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-switch
      size="${args.size}"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      validation-state="${args.validationState}"
      error-message="${args.errorMessage}"
      success-message="${args.successMessage}"
      warning-message="${args.warningMessage}"
      name="${args.name}"
      value="${args.value}"
      aria-label="${args.ariaLabel}"
      aria-describedby="${args.ariaDescribedBy}"
      aria-invalid="${args.ariaInvalid}"
    >
      Enable notifications
    </ds-switch>
  `,
};

// Size variants
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-switch size="small">Small switch</ds-switch>
      <ds-switch size="medium">Medium switch</ds-switch>
      <ds-switch size="large">Large switch</ds-switch>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Switch component in different sizes: small, medium, and large.',
      },
    },
  },
};

// Checked states
export const CheckedStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-switch>Unchecked switch</ds-switch>
      <ds-switch checked>Checked switch</ds-switch>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Switch component in checked and unchecked states.',
      },
    },
  },
};

// Disabled states
export const DisabledStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-switch disabled>Disabled unchecked</ds-switch>
      <ds-switch disabled checked>Disabled checked</ds-switch>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Switch component in disabled states.',
      },
    },
  },
};

// Validation states
export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-switch validation-state="default">Default state</ds-switch>
      <ds-switch validation-state="error" error-message="This field is required"
        >Error state</ds-switch
      >
      <ds-switch
        validation-state="success"
        success-message="Settings saved successfully"
        >Success state</ds-switch
      >
      <ds-switch
        validation-state="warning"
        warning-message="Please review your settings"
        >Warning state</ds-switch
      >
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Switch component in different validation states with appropriate messages.',
      },
    },
  },
};

// Required field
export const RequiredField: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-switch required>Required field (unchecked)</ds-switch>
      <ds-switch required checked>Required field (checked)</ds-switch>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Switch component as a required field with validation.',
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-switch id="switch1">Enable email notifications</ds-switch>
      <ds-switch id="switch2" checked>Enable push notifications</ds-switch>
      <ds-switch id="switch3" size="large">Enable SMS notifications</ds-switch>

      <div
        style="margin-top: 1rem; padding: 1rem; background-color: var(--color-gray-100); border-radius: 0.5rem;"
      >
        <h4>Switch States:</h4>
        <p id="switch1-state">Email notifications: OFF</p>
        <p id="switch2-state">Push notifications: ON</p>
        <p id="switch3-state">SMS notifications: OFF</p>
      </div>
    </div>

    <script>
      // Add event listeners to demonstrate interactivity
      document.addEventListener('DOMContentLoaded', () => {
        const switch1 = document.getElementById('switch1');
        const switch2 = document.getElementById('switch2');
        const switch3 = document.getElementById('switch3');

        const updateState = (switchEl, stateEl) => {
          switchEl.addEventListener('ds-switch-change', event => {
            const isChecked = event.detail.checked;
            stateEl.textContent = stateEl.textContent.replace(
              /ON|OFF/,
              isChecked ? 'ON' : 'OFF'
            );
          });
        };

        updateState(switch1, document.getElementById('switch1-state'));
        updateState(switch2, document.getElementById('switch2-state'));
        updateState(switch3, document.getElementById('switch3-state'));
      });
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive switch components that demonstrate real-time state updates.',
      },
    },
  },
};

// Accessibility example
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-switch aria-label="Enable dark mode">Dark mode</ds-switch>
      <ds-switch aria-describedby="help-text">Auto-save</ds-switch>
      <p
        id="help-text"
        style="font-size: 0.875rem; color: var(--color-text-secondary); margin: 0;"
      >
        Automatically save your work every 5 minutes
      </p>
      <ds-switch aria-label="Enable notifications" checked
        >Notifications</ds-switch
      >
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Switch components with proper accessibility attributes and descriptions.',
      },
    },
  },
};

// Form integration
export const FormIntegration: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;"
    >
      <h3>Notification Preferences</h3>

      <ds-switch name="email-notifications" value="enabled" checked>
        Email notifications
      </ds-switch>

      <ds-switch name="push-notifications" value="enabled">
        Push notifications
      </ds-switch>

      <ds-switch name="sms-notifications" value="enabled" size="large">
        SMS notifications
      </ds-switch>

      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <button
          type="submit"
          style="padding: 0.5rem 1rem; background-color: var(--color-primary); color: white; border: none; border-radius: 0.25rem; cursor: pointer;"
        >
          Save Preferences
        </button>
        <button
          type="reset"
          style="padding: 0.5rem 1rem; background-color: var(--color-gray-300); color: var(--color-text-primary); border: none; border-radius: 0.25rem; cursor: pointer;"
        >
          Reset
        </button>
      </div>
    </form>

    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('form');
        form.addEventListener('submit', event => {
          event.preventDefault();
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          alert('Form data: ' + JSON.stringify(data, null, 2));
        });
      });
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Switch components integrated into a form with proper form handling.',
      },
    },
  },
};

// Theme examples
export const Themes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Light Theme</h4>
        <div
          style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem; background-color: white; border-radius: 0.5rem; border: 1px solid var(--color-border);"
        >
          <ds-switch>Light theme switch</ds-switch>
          <ds-switch checked>Light theme checked</ds-switch>
          <ds-switch
            validation-state="error"
            error-message="Error in light theme"
            >Light theme error</ds-switch
          >
        </div>
      </div>

      <div>
        <h4>Dark Theme</h4>
        <div
          style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem; background-color: var(--color-gray-800); border-radius: 0.5rem; border: 1px solid var(--color-gray-600);"
        >
          <ds-switch>Dark theme switch</ds-switch>
          <ds-switch checked>Dark theme checked</ds-switch>
          <ds-switch
            validation-state="success"
            success-message="Success in dark theme"
            >Dark theme success</ds-switch
          >
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Switch components in different theme contexts (light and dark).',
      },
    },
  },
};

// Examples
export const Examples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Settings Panel</h3>
        <div
          style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem; background-color: var(--color-background-elevated); border-radius: 0.5rem; border: 1px solid var(--color-border);"
        >
          <ds-switch size="large" checked
            >Enable two-factor authentication</ds-switch
          >
          <ds-switch size="large">Enable location services</ds-switch>
          <ds-switch size="large" checked>Enable analytics</ds-switch>
          <ds-switch size="large">Enable marketing emails</ds-switch>
        </div>
      </div>

      <div>
        <h3>Feature Toggles</h3>
        <div
          style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem; background-color: var(--color-background-elevated); border-radius: 0.5rem; border: 1px solid var(--color-border);"
        >
          <ds-switch size="small">Beta features</ds-switch>
          <ds-switch size="small" checked>Advanced search</ds-switch>
          <ds-switch size="small">Experimental UI</ds-switch>
          <ds-switch
            size="small"
            validation-state="warning"
            warning-message="This feature is experimental"
            >AI suggestions</ds-switch
          >
        </div>
      </div>

      <div>
        <h3>Accessibility Controls</h3>
        <div
          style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem; background-color: var(--color-background-elevated); border-radius: 0.5rem; border: 1px solid var(--color-border);"
        >
          <ds-switch size="medium" aria-label="Enable high contrast mode"
            >High contrast mode</ds-switch
          >
          <ds-switch size="medium" checked aria-label="Enable reduced motion"
            >Reduced motion</ds-switch
          >
          <ds-switch
            size="medium"
            aria-label="Enable screen reader announcements"
            >Screen reader announcements</ds-switch
          >
          <ds-switch
            size="medium"
            checked
            aria-label="Enable keyboard navigation"
            >Keyboard navigation</ds-switch
          >
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Real-world examples of switch components in different contexts and use cases.',
      },
    },
  },
};
