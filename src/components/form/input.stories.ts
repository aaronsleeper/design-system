import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Input } from './input.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<Input> = {
  title: 'Components/Form/Input',
  component: 'ds-input',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Input component provides a comprehensive form input with multiple types, sizes, and validation states.

## Features
- **Multiple Types**: text, email, password, number, tel, url, search
- **Size Variants**: small, medium, large
- **Validation States**: default, error, success, warning
- **Accessibility**: WCAG 2.1 AA compliant with ARIA attributes
- **Character Count**: Optional character limit with visual feedback
- **Custom Validation**: Built-in validation with custom error messages

## Usage
\`\`\`html
<ds-input type="email" placeholder="Enter your email" required></ds-input>
<ds-input type="password" validation-state="error" error-message="Password is required"></ds-input>
\`\`\`

## Events
- \`ds-input-change\` - Fired when the input value changes
- \`ds-input-focus\` - Fired when the input receives focus
- \`ds-input-blur\` - Fired when the input loses focus
- \`ds-input-validate\` - Fired when validation state changes
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The input type',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The input size',
    },
    value: {
      control: { type: 'text' },
      description: 'The input value',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Whether the input is readonly',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required',
    },
    validationState: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning'],
      description: 'Validation state',
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
    minLength: {
      control: { type: 'number' },
      description: 'Minimum length for text inputs',
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum length for text inputs',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value for number inputs',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value for number inputs',
    },
    step: {
      control: { type: 'number' },
      description: 'Step value for number inputs',
    },
    pattern: {
      control: { type: 'text' },
      description: 'Pattern for validation',
    },
    autocomplete: {
      control: { type: 'text' },
      description: 'Autocomplete attribute',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the input',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the input',
    },
    ariaInvalid: {
      control: { type: 'select' },
      options: ['true', 'false', 'grammar', 'spelling'],
      description: 'Whether the input is invalid',
    },
  },
  args: {
    type: 'text',
    size: 'medium',
    value: '',
    placeholder: '',
    disabled: false,
    readonly: false,
    required: false,
    validationState: 'default',
    errorMessage: '',
    successMessage: '',
    warningMessage: '',
    minLength: undefined,
    maxLength: undefined,
    min: undefined,
    max: undefined,
    step: undefined,
    pattern: '',
    autocomplete: '',
    ariaLabel: '',
    ariaDescribedBy: '',
    ariaInvalid: 'false',
  },
};

export default meta;
type Story = StoryObj<Input>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Hello World',
    placeholder: 'Enter text...',
  },
};

export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-input size="small" placeholder="Small input"></ds-input>
      <ds-input size="medium" placeholder="Medium input"></ds-input>
      <ds-input size="large" placeholder="Large input"></ds-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Input component in different sizes: small, medium, and large.',
      },
    },
  },
};

export const Types: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-input type="text" placeholder="Text input"></ds-input>
      <ds-input type="email" placeholder="Email input"></ds-input>
      <ds-input type="password" placeholder="Password input"></ds-input>
      <ds-input type="number" placeholder="Number input"></ds-input>
      <ds-input type="tel" placeholder="Phone input"></ds-input>
      <ds-input type="url" placeholder="URL input"></ds-input>
      <ds-input type="search" placeholder="Search input"></ds-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Input component with different types for various use cases.',
      },
    },
  },
};

export const ValidationStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-input placeholder="Default state"></ds-input>
      <ds-input
        validation-state="error"
        error-message="This field is required"
        placeholder="Error state"
      ></ds-input>
      <ds-input
        validation-state="success"
        success-message="Input is valid"
        placeholder="Success state"
      ></ds-input>
      <ds-input
        validation-state="warning"
        warning-message="Please double-check your input"
        placeholder="Warning state"
      ></ds-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Input component in different validation states with appropriate messages.',
      },
    },
  },
};

export const States: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-input placeholder="Normal state"></ds-input>
      <ds-input disabled placeholder="Disabled state"></ds-input>
      <ds-input
        readonly
        value="Readonly value"
        placeholder="Readonly state"
      ></ds-input>
      <ds-input required placeholder="Required field"></ds-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Input component in different states: normal, disabled, readonly, and required.',
      },
    },
  },
};

export const WithCharacterCount: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-input
        max-length="50"
        placeholder="Enter up to 50 characters"
      ></ds-input>
      <ds-input
        max-length="20"
        value="This is a long text that exceeds the limit"
        placeholder="Over character limit"
      ></ds-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Input component with character count display and limit enforcement.',
      },
    },
  },
};

export const NumberInput: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-input
        type="number"
        min="0"
        max="100"
        step="1"
        placeholder="Enter number (0-100)"
      ></ds-input>
      <ds-input
        type="number"
        min="0"
        max="10"
        step="0.1"
        placeholder="Enter decimal (0-10, step 0.1)"
      ></ds-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Number input with min, max, and step constraints.',
      },
    },
  },
};

export const WithPattern: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-input
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="Phone: 123-456-7890"
      ></ds-input>
      <ds-input
        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}"
        placeholder="Email pattern validation"
      ></ds-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Input component with pattern validation for specific formats.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-input
        id="interactive-input"
        type="email"
        placeholder="Enter your email"
        required
      ></ds-input>
      <div
        id="event-log"
        style="font-size: 0.875rem; color: #666; max-height: 200px; overflow-y: auto;"
      ></div>
    </div>
    <script>
      const input = document.getElementById('interactive-input');
      const log = document.getElementById('event-log');

      function addLog(message) {
        const time = new Date().toLocaleTimeString();
        log.innerHTML += \`[\${time}] \${message}<br>\`;
        log.scrollTop = log.scrollHeight;
      }

      input.addEventListener('ds-input-change', e => {
        addLog(\`Change: "\${e.detail.data.value}"\`);
      });

      input.addEventListener('ds-input-focus', () => {
        addLog('Focus');
      });

      input.addEventListener('ds-input-blur', () => {
        addLog('Blur');
      });

      input.addEventListener('ds-input-validate', e => {
        addLog(
          \`Validate: \${e.detail.data.validationState} (\${
            e.detail.data.isValid ? 'valid' : 'invalid'
          })\`
        );
      });
    </script>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive input that logs all events to demonstrate the event system.',
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <label for="accessible-input">Email Address</label>
      <ds-input
        id="accessible-input"
        type="email"
        placeholder="Enter your email address"
        aria-describedby="email-help"
        required
      ></ds-input>
      <div id="email-help" style="font-size: 0.875rem; color: #666;">
        We'll never share your email with anyone else.
      </div>

      <label for="error-input">Password</label>
      <ds-input
        id="error-input"
        type="password"
        placeholder="Enter your password"
        validation-state="error"
        error-message="Password must be at least 8 characters long"
        aria-describedby="password-help"
        required
      ></ds-input>
      <div id="password-help" style="font-size: 0.875rem; color: #666;">
        Password must contain at least 8 characters.
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Input component with proper accessibility features including labels and descriptions.',
      },
    },
  },
};

export const FormIntegration: Story = {
  render: () => html`
    <form
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <label for="form-email">Email</label>
      <ds-input
        id="form-email"
        name="email"
        type="email"
        placeholder="Enter your email"
        required
      ></ds-input>

      <label for="form-password">Password</label>
      <ds-input
        id="form-password"
        name="password"
        type="password"
        placeholder="Enter your password"
        min-length="8"
        required
      ></ds-input>

      <label for="form-phone">Phone Number</label>
      <ds-input
        id="form-phone"
        name="phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="123-456-7890"
      ></ds-input>

      <button
        type="submit"
        style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.375rem; cursor: pointer;"
      >
        Submit
      </button>
    </form>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Input component integrated into a complete form with validation.',
      },
    },
  },
};

export const Themes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">Light Theme</h3>
        <div
          style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
        >
          <ds-input placeholder="Light theme input"></ds-input>
          <ds-input
            validation-state="error"
            error-message="Error in light theme"
          ></ds-input>
        </div>
      </div>

      <div style="background: #1f2937; padding: 1rem; border-radius: 0.5rem;">
        <h3 style="margin-bottom: 1rem; color: white;">Dark Theme</h3>
        <div
          style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
        >
          <ds-input placeholder="Dark theme input"></ds-input>
          <ds-input
            validation-state="error"
            error-message="Error in dark theme"
          ></ds-input>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Input component appearance in different theme contexts.',
      },
    },
  },
};
