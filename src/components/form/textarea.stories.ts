import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Textarea } from './textarea.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<Textarea> = {
  title: 'Components/Form/Textarea',
  component: 'ds-textarea',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Textarea component provides a comprehensive form textarea with multiple sizes and validation states.

## Features
- **Size Variants**: small, medium, large
- **Validation States**: default, error, success, warning
- **Accessibility**: WCAG 2.1 AA compliant with ARIA attributes
- **Character Count**: Optional character limit with visual feedback
- **Custom Validation**: Built-in validation with custom error messages
- **Textarea Attributes**: Support for rows, cols, wrap, spellcheck

## Usage
\`\`\`html
<ds-textarea placeholder="Enter your message" required></ds-textarea>
<ds-textarea validation-state="error" error-message="Message is required"></ds-textarea>
<ds-textarea rows="5" maxlength="500"></ds-textarea>
\`\`\`

## Events
- \`ds-textarea-change\` - Fired when the textarea value changes
- \`ds-textarea-focus\` - Fired when the textarea receives focus
- \`ds-textarea-blur\` - Fired when the textarea loses focus
- \`ds-textarea-validate\` - Fired when validation state changes
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The textarea size',
    },
    value: {
      control: { type: 'text' },
      description: 'The textarea value',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the textarea is disabled',
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Whether the textarea is readonly',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the textarea is required',
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
      description: 'Minimum length for textarea',
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum length for textarea',
    },
    rows: {
      control: { type: 'number' },
      description: 'Number of visible text lines',
    },
    cols: {
      control: { type: 'number' },
      description: 'Number of visible character widths',
    },
    wrap: {
      control: { type: 'select' },
      options: ['soft', 'hard', 'off'],
      description: 'How the text should be wrapped',
    },
    spellcheck: {
      control: { type: 'boolean' },
      description: 'Whether spellcheck is enabled',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the textarea',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the textarea',
    },
    ariaInvalid: {
      control: { type: 'select' },
      options: ['true', 'false', 'grammar', 'spelling'],
      description: 'Whether the textarea is invalid',
    },
  },
  args: {
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
    rows: 3,
    cols: undefined,
    wrap: 'soft',
    spellcheck: true,
    ariaLabel: '',
    ariaDescribedBy: '',
    ariaInvalid: 'false',
  },
};

export default meta;
type Story = StoryObj<Textarea>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small textarea',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: 'Medium textarea',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large textarea',
  },
};

// Validation states
export const Error: Story = {
  args: {
    validationState: 'error',
    errorMessage: 'This field is required',
    placeholder: 'Enter your message',
  },
};

export const Success: Story = {
  args: {
    validationState: 'success',
    successMessage: 'Message looks good!',
    value: 'This is a valid message',
    placeholder: 'Enter your message',
  },
};

export const Warning: Story = {
  args: {
    validationState: 'warning',
    warningMessage: 'Please review your message',
    value: 'This might need review',
    placeholder: 'Enter your message',
  },
};

// Interactive examples
export const WithCharacterCount: Story = {
  args: {
    maxLength: 100,
    placeholder: 'Enter your message (max 100 characters)',
  },
};

export const RequiredField: Story = {
  args: {
    required: true,
    placeholder: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'This textarea is disabled',
  },
};

export const ReadOnly: Story = {
  args: {
    readonly: true,
    value: 'This textarea is read-only',
  },
};

// Textarea attributes
export const CustomRows: Story = {
  args: {
    rows: 5,
    placeholder: 'This textarea has 5 rows',
  },
};

export const CustomCols: Story = {
  args: {
    cols: 50,
    placeholder: 'This textarea has 50 columns',
  },
};

export const NoSpellcheck: Story = {
  args: {
    spellcheck: false,
    placeholder: 'Spellcheck is disabled',
  },
};

export const HardWrap: Story = {
  args: {
    wrap: 'hard',
    placeholder: 'Text will wrap with line breaks',
  },
};

// Accessibility examples
export const WithAriaLabel: Story = {
  args: {
    ariaLabel: 'Message input field',
    placeholder: 'Enter your message',
  },
};

export const WithAriaDescribedBy: Story = {
  render: () => html`
    <div>
      <label for="message-textarea">Message</label>
      <ds-textarea
        id="message-textarea"
        aria-describedby="message-help"
        placeholder="Enter your message"
      ></ds-textarea>
      <div id="message-help">Please provide a detailed message</div>
    </div>
  `,
};

// Form integration
export const FormIntegration: Story = {
  render: () => html`
    <form>
      <div style="margin-bottom: 1rem;">
        <label for="name">Name</label>
        <ds-input
          id="name"
          name="name"
          placeholder="Your name"
          required
        ></ds-input>
      </div>
      <div style="margin-bottom: 1rem;">
        <label for="email">Email</label>
        <ds-input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
        ></ds-input>
      </div>
      <div style="margin-bottom: 1rem;">
        <label for="message">Message</label>
        <ds-textarea
          id="message"
          name="message"
          placeholder="Your message"
          rows="4"
          maxlength="500"
          required
        ></ds-textarea>
      </div>
      <ds-button type="submit">Send Message</ds-button>
    </form>
  `,
};

// Complex example
export const ContactForm: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h2>Contact Us</h2>
      <form>
        <div style="display: grid; gap: 1rem;">
          <div>
            <label for="contact-name">Name *</label>
            <ds-input
              id="contact-name"
              name="name"
              placeholder="Your full name"
              required
              size="large"
            ></ds-input>
          </div>

          <div>
            <label for="contact-email">Email *</label>
            <ds-input
              id="contact-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              size="large"
            ></ds-input>
          </div>

          <div>
            <label for="contact-subject">Subject</label>
            <ds-input
              id="contact-subject"
              name="subject"
              placeholder="What's this about?"
              size="large"
            ></ds-input>
          </div>

          <div>
            <label for="contact-message">Message *</label>
            <ds-textarea
              id="contact-message"
              name="message"
              placeholder="Tell us more about your inquiry..."
              rows="6"
              maxlength="1000"
              required
              size="large"
            ></ds-textarea>
          </div>

          <div>
            <ds-button type="submit" variant="primary" size="large">
              Send Message
            </ds-button>
          </div>
        </div>
      </form>
    </div>
  `,
};

// Theme examples
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    placeholder: 'This textarea adapts to dark mode',
  },
};

export const HighContrast: Story = {
  parameters: {
    backgrounds: { default: 'white' },
  },
  args: {
    placeholder: 'This textarea supports high contrast mode',
  },
};

// Event handling example
export const WithEventHandling: Story = {
  render: () => html`
    <div>
      <ds-textarea
        id="event-textarea"
        placeholder="Type something to see events..."
        maxlength="50"
      ></ds-textarea>
      <div
        id="event-log"
        style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 0.875rem;"
      >
        <strong>Event Log:</strong>
        <div id="events"></div>
      </div>
    </div>
    <script>
      const textarea = document.getElementById('event-textarea');
      const eventsDiv = document.getElementById('events');

      const logEvent = (eventName, detail) => {
        const eventDiv = document.createElement('div');
        eventDiv.textContent = \`\${new Date().toLocaleTimeString()}: \${eventName}\`;
        if (detail) {
          const detailDiv = document.createElement('div');
          detailDiv.style.marginLeft = '1rem';
          detailDiv.style.color = '#666';
          detailDiv.textContent = \`Value: "\${detail.data?.value || ''}"\`;
          eventDiv.appendChild(detailDiv);
        }
        eventsDiv.appendChild(eventDiv);
        eventsDiv.scrollTop = eventsDiv.scrollHeight;
      };

      textarea.addEventListener('ds-textarea-change', e =>
        logEvent('change', e.detail)
      );
      textarea.addEventListener('ds-textarea-focus', e =>
        logEvent('focus', e.detail)
      );
      textarea.addEventListener('ds-textarea-blur', e =>
        logEvent('blur', e.detail)
      );
      textarea.addEventListener('ds-textarea-validate', e =>
        logEvent('validate', e.detail)
      );
    </script>
  `,
};
