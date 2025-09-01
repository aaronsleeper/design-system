import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Radio } from './radio.js';

// Import the component styles
import '../../tokens/colors.scss';
import '../../tokens/typography.scss';
import '../../tokens/spacing.scss';

const meta: Meta<Radio> = {
  title: 'Components/Form/Radio',
  component: 'ds-radio',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive radio component with multiple sizes, states, and validation.
Supports radio button groups and provides built-in validation feedback.

## Features
- **Sizes**: small, medium, large
- **States**: default, focus, error, disabled, required
- **Validation**: Built-in validation with error messages
- **Accessibility**: WCAG 2.1 AA compliant with proper labeling
- **Events**: ds-radio-change, ds-radio-focus, ds-radio-blur, ds-radio-validate

## Usage
Radio buttons are used when users need to select one option from a set of mutually exclusive choices.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the radio button',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the radio is checked',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the radio is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the radio is required',
    },
    validationState: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'The validation state of the radio',
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
      description: 'Name attribute for form submission and grouping',
    },
    value: {
      control: { type: 'text' },
      description: 'Value attribute for form submission',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the radio',
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
  },
};

export default meta;
type Story = StoryObj<Radio>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-radio
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
    >
      Default Radio Option
    </ds-radio>
  `,
};

// Size variants
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ds-radio size="small">Small Radio Option</ds-radio>
      <ds-radio size="medium">Medium Radio Option</ds-radio>
      <ds-radio size="large">Large Radio Option</ds-radio>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons come in three sizes: small, medium, and large.',
      },
    },
  },
};

// Checked states
export const CheckedStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ds-radio>Unchecked Option</ds-radio>
      <ds-radio checked>Checked Option</ds-radio>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons can be in checked or unchecked states.',
      },
    },
  },
};

// Disabled states
export const DisabledStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ds-radio>Enabled Option</ds-radio>
      <ds-radio disabled>Disabled Option</ds-radio>
      <ds-radio checked disabled>Disabled Checked Option</ds-radio>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons can be disabled to prevent interaction.',
      },
    },
  },
};

// Required states
export const RequiredStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ds-radio>Optional Option</ds-radio>
      <ds-radio required>Required Option</ds-radio>
      <ds-radio required checked>Required Checked Option</ds-radio>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Radio buttons can be marked as required with a visual indicator.',
      },
    },
  },
};

// Validation states
export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ds-radio validation-state="default">Default State</ds-radio>
      <ds-radio validation-state="error" error-message="This field is required"
        >Error State</ds-radio
      >
      <ds-radio validation-state="success" success-message="Selection confirmed"
        >Success State</ds-radio
      >
      <ds-radio
        validation-state="warning"
        warning-message="Please review your selection"
        >Warning State</ds-radio
      >
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Radio buttons support different validation states with appropriate messaging.',
      },
    },
  },
};

// Radio group example
export const RadioGroup: Story = {
  render: () => html`
    <fieldset style="border: none; padding: 0; margin: 0;">
      <legend style="font-weight: 600; margin-bottom: 12px;">
        Choose your preferred option:
      </legend>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ds-radio name="preference" value="option1">Option 1</ds-radio>
        <ds-radio name="preference" value="option2" checked
          >Option 2 (Default)</ds-radio
        >
        <ds-radio name="preference" value="option3">Option 3</ds-radio>
      </div>
    </fieldset>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Radio buttons work together in groups where only one option can be selected.',
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ds-radio id="interactive-1" name="interactive" value="1"
        >Interactive Option 1</ds-radio
      >
      <ds-radio id="interactive-2" name="interactive" value="2"
        >Interactive Option 2</ds-radio
      >
      <ds-radio id="interactive-3" name="interactive" value="3"
        >Interactive Option 3</ds-radio
      >
    </div>
    <script>
      document.addEventListener('ds-radio-change', e => {
        console.log('Radio changed:', e.detail);
      });
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive radio group that logs events to the console.',
      },
    },
  },
};

// Accessibility example
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ds-radio aria-label="Accessible option 1" name="accessible" value="1">
        Option with aria-label
      </ds-radio>
      <ds-radio name="accessible" value="2" aria-describedby="description">
        Option with description
      </ds-radio>
      <div
        id="description"
        style="font-size: 0.875rem; color: #666; margin-top: -8px;"
      >
        This option has additional context provided via aria-describedby.
      </div>
      <ds-radio
        name="accessible"
        value="3"
        required
        validation-state="error"
        error-message="This field is required"
      >
        Required option with validation
      </ds-radio>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Examples of accessible radio buttons with proper ARIA attributes and validation.',
      },
    },
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;"
    >
      <fieldset
        style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;"
      >
        <legend style="font-weight: 600; padding: 0 8px;">
          Contact Method
        </legend>
        <div
          style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;"
        >
          <ds-radio name="contact" value="email" checked>Email</ds-radio>
          <ds-radio name="contact" value="phone">Phone</ds-radio>
          <ds-radio name="contact" value="mail">Mail</ds-radio>
        </div>
      </fieldset>

      <fieldset
        style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;"
      >
        <legend style="font-weight: 600; padding: 0 8px;">
          Newsletter Frequency
        </legend>
        <div
          style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;"
        >
          <ds-radio name="frequency" value="daily">Daily</ds-radio>
          <ds-radio name="frequency" value="weekly" checked>Weekly</ds-radio>
          <ds-radio name="frequency" value="monthly">Monthly</ds-radio>
          <ds-radio name="frequency" value="never">Never</ds-radio>
        </div>
      </fieldset>

      <button
        type="submit"
        style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;"
      >
        Submit Form
      </button>
    </form>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Radio buttons integrated into a form with proper fieldset and legend elements.',
      },
    },
  },
};

// Complex content example
export const ComplexContent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <ds-radio name="plan" value="basic">
        <div>
          <div style="font-weight: 600;">Basic Plan</div>
          <div style="font-size: 0.875rem; color: #666;">
            $9/month - Essential features
          </div>
        </div>
      </ds-radio>

      <ds-radio name="plan" value="pro" checked>
        <div>
          <div style="font-weight: 600;">Pro Plan</div>
          <div style="font-size: 0.875rem; color: #666;">
            $19/month - Advanced features
          </div>
        </div>
      </ds-radio>

      <ds-radio name="plan" value="enterprise">
        <div>
          <div style="font-weight: 600;">Enterprise Plan</div>
          <div style="font-size: 0.875rem; color: #666;">
            $49/month - All features + support
          </div>
        </div>
      </ds-radio>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Radio buttons with complex content including titles and descriptions.',
      },
    },
  },
};

// Theming example
export const Theming: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h4 style="margin: 0 0 12px 0;">Light Theme</h4>
        <div
          style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background: white; border-radius: 8px;"
        >
          <ds-radio name="theme-light" value="1">Light Option 1</ds-radio>
          <ds-radio name="theme-light" value="2" checked
            >Light Option 2</ds-radio
          >
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0;">Dark Theme</h4>
        <div
          style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background: #1f2937; border-radius: 8px;"
        >
          <ds-radio name="theme-dark" value="1">Dark Option 1</ds-radio>
          <ds-radio name="theme-dark" value="2" checked>Dark Option 2</ds-radio>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons in different theme contexts.',
      },
    },
  },
};
