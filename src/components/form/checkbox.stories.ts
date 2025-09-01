import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Checkbox } from './checkbox.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/typography.scss';
import '../../tokens/spacing.scss';

const meta: Meta<Checkbox> = {
  title: 'Components/Form/Checkbox',
  component: 'ds-checkbox',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive checkbox component with multiple sizes, states, and validation.
Supports indeterminate state and provides built-in validation feedback.

## Features
- **Sizes**: small, medium, large
- **States**: default, focus, error, disabled, indeterminate
- **Validation**: Built-in validation with error messages
- **Accessibility**: WCAG 2.1 AA compliant with proper labeling
- **Events**: \`ds-checkbox-change\`, \`ds-checkbox-focus\`, \`ds-checkbox-blur\`, \`ds-checkbox-validate\`

## Usage
\`\`\`html
<ds-checkbox size="medium" checked>Accept terms</ds-checkbox>
<ds-checkbox size="large" indeterminate>Select all</ds-checkbox>
<ds-checkbox validation-state="error" error-message="This field is required"></ds-checkbox>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the checkbox',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is checked',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is in indeterminate state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is required',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    validationState: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'Validation state of the checkbox',
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
      description: 'Accessible label for the checkbox',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the checkbox',
    },
    ariaInvalid: {
      control: { type: 'select' },
      options: ['true', 'false'],
      description: 'Whether the checkbox is invalid',
    },
  },
  args: {
    size: 'medium',
    checked: false,
    indeterminate: false,
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
    ariaInvalid: 'false',
  },
};

export default meta;
type Story = StoryObj<Checkbox>;

// Default story
export const Default: Story = {
  args: {
    children: 'Default checkbox',
  },
  render: args => html`
    <ds-checkbox
      size="${args.size}"
      ?checked="${args.checked}"
      ?indeterminate="${args.indeterminate}"
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
      ${args.children}
    </ds-checkbox>
  `,
};

// Size variants
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-checkbox size="small">Small checkbox</ds-checkbox>
      <ds-checkbox size="medium">Medium checkbox</ds-checkbox>
      <ds-checkbox size="large">Large checkbox</ds-checkbox>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox component in different sizes: small, medium, and large.',
      },
    },
  },
};

// State variants
export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-checkbox>Default state</ds-checkbox>
      <ds-checkbox checked>Checked state</ds-checkbox>
      <ds-checkbox indeterminate>Indeterminate state</ds-checkbox>
      <ds-checkbox disabled>Disabled state</ds-checkbox>
      <ds-checkbox required>Required state</ds-checkbox>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Different states of the checkbox component: default, checked, indeterminate, disabled, and required.',
      },
    },
  },
};

// Validation states
export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-checkbox validation-state="default">Default validation</ds-checkbox>
      <ds-checkbox
        validation-state="error"
        error-message="This field is required"
      >
        Error validation
      </ds-checkbox>
      <ds-checkbox
        validation-state="success"
        success-message="Great! This looks good."
      >
        Success validation
      </ds-checkbox>
      <ds-checkbox
        validation-state="warning"
        warning-message="Please review this option"
      >
        Warning validation
      </ds-checkbox>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox component with different validation states and messages.',
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-checkbox id="interactive-checkbox">Interactive checkbox</ds-checkbox>
      <div style="margin-top: 1rem;">
        <button
          onclick="document.getElementById('interactive-checkbox').toggle()"
        >
          Toggle
        </button>
        <button
          onclick="document.getElementById('interactive-checkbox').check()"
        >
          Check
        </button>
        <button
          onclick="document.getElementById('interactive-checkbox').uncheck()"
        >
          Uncheck
        </button>
        <button
          onclick="document.getElementById('interactive-checkbox').setIndeterminate()"
        >
          Set Indeterminate
        </button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive checkbox with buttons to control its state programmatically.',
      },
    },
  },
};

// Accessibility example
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-checkbox aria-label="Accept terms and conditions">
        Accept terms and conditions
      </ds-checkbox>
      <ds-checkbox aria-describedby="help-text">
        Subscribe to newsletter
      </ds-checkbox>
      <div id="help-text" style="font-size: 0.875rem; color: #6b7280;">
        We'll send you updates about new features and improvements.
      </div>
      <ds-checkbox required aria-invalid="false"> Required field </ds-checkbox>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox component with proper accessibility attributes and ARIA labels.',
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
      <h3>User Preferences</h3>

      <ds-checkbox name="notifications" value="email">
        Email notifications
      </ds-checkbox>

      <ds-checkbox name="notifications" value="sms">
        SMS notifications
      </ds-checkbox>

      <ds-checkbox name="marketing" value="newsletter">
        Marketing newsletter
      </ds-checkbox>

      <ds-checkbox name="terms" value="accepted" required>
        I accept the terms and conditions
      </ds-checkbox>

      <button type="submit" style="margin-top: 1rem; padding: 0.5rem 1rem;">
        Submit
      </button>
    </form>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox components integrated in a form with proper name and value attributes.',
      },
    },
  },
};

// Complex content
export const ComplexContent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ds-checkbox>
        <strong>Bold text</strong> with <em>emphasis</em>
      </ds-checkbox>

      <ds-checkbox>
        <div>
          <div style="font-weight: 600;">Multi-line content</div>
          <div style="font-size: 0.875rem; color: #6b7280;">
            This checkbox has multiple lines of text content
          </div>
        </div>
      </ds-checkbox>

      <ds-checkbox>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span
            style="width: 20px; height: 20px; background: #3b82f6; border-radius: 4px;"
          ></span>
          <span>Checkbox with icon</span>
        </div>
      </ds-checkbox>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox components with complex content including HTML elements and styling.',
      },
    },
  },
};

// Theming example
export const Theming: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4>Light Theme</h4>
        <ds-checkbox checked>Light theme checkbox</ds-checkbox>
      </div>

      <div style="background: #1f2937; padding: 1rem; border-radius: 8px;">
        <h4 style="color: white;">Dark Theme</h4>
        <ds-checkbox checked>Dark theme checkbox</ds-checkbox>
      </div>

      <div style="background: #fef3c7; padding: 1rem; border-radius: 8px;">
        <h4>Custom Theme</h4>
        <ds-checkbox checked>Custom theme checkbox</ds-checkbox>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Checkbox component in different theme contexts.',
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
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <ds-checkbox checked>Enable notifications</ds-checkbox>
          <ds-checkbox checked>Auto-save documents</ds-checkbox>
          <ds-checkbox>Dark mode</ds-checkbox>
          <ds-checkbox indeterminate>Sync settings</ds-checkbox>
        </div>
      </div>

      <div>
        <h3>Permissions</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <ds-checkbox
            required
            validation-state="error"
            error-message="You must accept to continue"
          >
            Accept privacy policy
          </ds-checkbox>
          <ds-checkbox
            validation-state="success"
            success-message="Thank you for subscribing"
          >
            Subscribe to updates
          </ds-checkbox>
        </div>
      </div>

      <div>
        <h3>Bulk Actions</h3>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <ds-checkbox indeterminate>Select all items</ds-checkbox>
          <ds-checkbox checked>Item 1</ds-checkbox>
          <ds-checkbox checked>Item 2</ds-checkbox>
          <ds-checkbox>Item 3</ds-checkbox>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of checkbox usage in different contexts.',
      },
    },
  },
};
