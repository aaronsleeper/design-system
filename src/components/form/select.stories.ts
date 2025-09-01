import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Select, SelectOption, SelectOptionGroup } from './select.js';

// Mock data for stories
const mockOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon' },
];

const mockOptionGroups: SelectOptionGroup[] = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
  {
    label: 'Grains',
    options: [
      { value: 'rice', label: 'Rice' },
      { value: 'wheat', label: 'Wheat' },
      { value: 'oats', label: 'Oats' },
    ],
  },
];

const meta: Meta<Select> = {
  title: 'Components/Form/Select',
  component: 'ds-select',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive select component with multiple types, sizes, and validation states.
Supports single/multiple selection, searchable options, and option groups.

## Features
- **Single Selection**: Choose one option from a list
- **Multiple Selection**: Choose multiple options with checkboxes
- **Searchable**: Filter options by typing
- **Option Groups**: Organize options into groups
- **Validation States**: Error, success, and warning states
- **Accessibility**: WCAG 2.1 AA compliant
- **Keyboard Navigation**: Full keyboard support
- **Loading State**: Show loading indicator
- **Clearable**: Clear selection with button

## Events
- \`ds-select-change\`: Fired when selection changes
- \`ds-select-focus\`: Fired when component receives focus
- \`ds-select-blur\`: Fired when component loses focus
- \`ds-select-open\`: Fired when dropdown opens
- \`ds-select-close\`: Fired when dropdown closes
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'searchable'],
      description: 'Type of selection behavior',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the select component',
    },
    value: {
      control: { type: 'text' },
      description: 'Selected value(s)',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the select is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the select is required',
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
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the select is in loading state',
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Whether the select can be cleared',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the select',
    },
  },
  args: {
    type: 'single',
    size: 'medium',
    value: '',
    placeholder: 'Choose an option',
    disabled: false,
    required: false,
    validationState: 'default',
    errorMessage: '',
    successMessage: '',
    warningMessage: '',
    loading: false,
    clearable: false,
    ariaLabel: 'Select an option',
  },
};

export default meta;
type Story = StoryObj<Select>;

// Default story
export const Default: Story = {
  render: args => html`
    <ds-select
      type="${args.type}"
      size="${args.size}"
      value="${args.value}"
      placeholder="${args.placeholder}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      validation-state="${args.validationState}"
      error-message="${args.errorMessage}"
      success-message="${args.successMessage}"
      warning-message="${args.warningMessage}"
      ?loading="${args.loading}"
      ?clearable="${args.clearable}"
      aria-label="${args.ariaLabel}"
      .options="${mockOptions}"
    ></ds-select>
  `,
};

// Single selection story
export const SingleSelection: Story = {
  render: () => html`
    <ds-select
      placeholder="Choose a fruit"
      aria-label="Select a fruit"
      .options="${mockOptions}"
    ></ds-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Basic single selection with a list of options.',
      },
    },
  },
};

// Multiple selection story
export const MultipleSelection: Story = {
  render: () => html`
    <ds-select
      type="multiple"
      placeholder="Choose multiple fruits"
      aria-label="Select multiple fruits"
      .options="${mockOptions}"
    ></ds-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Multiple selection with checkboxes for each option.',
      },
    },
  },
};

// Searchable selection story
export const SearchableSelection: Story = {
  render: () => html`
    <ds-select
      type="searchable"
      placeholder="Search and select a fruit"
      aria-label="Search and select a fruit"
      .options="${mockOptions}"
    ></ds-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Searchable selection with a search input to filter options.',
      },
    },
  },
};

// Option groups story
export const OptionGroups: Story = {
  render: () => html`
    <ds-select
      placeholder="Choose from categories"
      aria-label="Select from categories"
      .optionGroups="${mockOptionGroups}"
    ></ds-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Selection with options organized into groups.',
      },
    },
  },
};

// Size variants story
export const SizeVariants: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-select
        size="small"
        placeholder="Small select"
        .options="${mockOptions.slice(0, 3)}"
      ></ds-select>
      <ds-select
        size="medium"
        placeholder="Medium select"
        .options="${mockOptions.slice(0, 3)}"
      ></ds-select>
      <ds-select
        size="large"
        placeholder="Large select"
        .options="${mockOptions.slice(0, 3)}"
      ></ds-select>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different sizes available for the select component.',
      },
    },
  },
};

// Validation states story
export const ValidationStates: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-select
        placeholder="Default state"
        .options="${mockOptions.slice(0, 3)}"
      ></ds-select>
      <ds-select
        placeholder="Error state"
        validation-state="error"
        error-message="Please select an option"
        .options="${mockOptions.slice(0, 3)}"
      ></ds-select>
      <ds-select
        placeholder="Success state"
        validation-state="success"
        success-message="Selection is valid"
        value="apple"
        .options="${mockOptions.slice(0, 3)}"
      ></ds-select>
      <ds-select
        placeholder="Warning state"
        validation-state="warning"
        warning-message="Consider other options"
        .options="${mockOptions.slice(0, 3)}"
      ></ds-select>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different validation states with appropriate messages.',
      },
    },
  },
};

// Interactive story
export const Interactive: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-select
        id="interactive-select"
        placeholder="Choose an option"
        clearable
        .options="${mockOptions}"
        @ds-select-change="${() => {}}"
        @ds-select-open="${() => {}}"
        @ds-select-close="${() => {}}"
      ></ds-select>
      <div style="margin-top: 1rem;">
        <button
          onclick="document.getElementById('interactive-select').open()"
          style="margin-right: 0.5rem;"
        >
          Open
        </button>
        <button
          onclick="document.getElementById('interactive-select').close()"
          style="margin-right: 0.5rem;"
        >
          Close
        </button>
        <button
          onclick="document.getElementById('interactive-select').clear()"
          style="margin-right: 0.5rem;"
        >
          Clear
        </button>
        <button onclick="document.getElementById('interactive-select').focus()">
          Focus
        </button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example with programmatic control and event logging.',
      },
    },
  },
};

// Accessibility story
export const Accessibility: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <label for="accessible-select">Choose your favorite fruit:</label>
      <ds-select
        id="accessible-select"
        placeholder="Select a fruit"
        required
        aria-describedby="select-help"
        .options="${mockOptions}"
      ></ds-select>
      <div id="select-help" style="font-size: 0.875rem; color: #666;">
        Use arrow keys to navigate, Enter or Space to select, Escape to close.
      </div>

      <label for="accessible-select-multiple">Choose multiple fruits:</label>
      <ds-select
        id="accessible-select-multiple"
        type="multiple"
        placeholder="Select multiple fruits"
        aria-describedby="select-multiple-help"
        .options="${mockOptions}"
      ></ds-select>
      <div id="select-multiple-help" style="font-size: 0.875rem; color: #666;">
        You can select multiple options. Use checkboxes to toggle selections.
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility features including proper labeling and keyboard navigation.',
      },
    },
  },
};

// Loading state story
export const LoadingState: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-select
        placeholder="Loading options..."
        loading
        .options="${[]}"
      ></ds-select>
      <ds-select
        placeholder="Loaded options"
        .options="${mockOptions.slice(0, 3)}"
      ></ds-select>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner indicator.',
      },
    },
  },
};

// Disabled state story
export const DisabledState: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
    >
      <ds-select
        placeholder="Disabled select"
        disabled
        .options="${mockOptions}"
      ></ds-select>
      <ds-select
        placeholder="Enabled select"
        .options="${mockOptions}"
      ></ds-select>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents interaction.',
      },
    },
  },
};

// Complex example story
export const ComplexExample: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 2rem; width: 400px;"
    >
      <div>
        <h3 style="margin-bottom: 0.5rem;">Product Configuration</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label
              for="category-select"
              style="display: block; margin-bottom: 0.25rem; font-weight: 500;"
            >
              Category *
            </label>
            <ds-select
              id="category-select"
              placeholder="Select a category"
              required
              clearable
              validation-state="error"
              error-message="Please select a category"
              .optionGroups="${mockOptionGroups}"
            ></ds-select>
          </div>

          <div>
            <label
              for="features-select"
              style="display: block; margin-bottom: 0.25rem; font-weight: 500;"
            >
              Features
            </label>
            <ds-select
              id="features-select"
              type="multiple"
              placeholder="Select multiple features"
              clearable
              .options="${[
                { value: 'feature1', label: 'Advanced Analytics' },
                { value: 'feature2', label: 'Real-time Updates' },
                { value: 'feature3', label: 'Custom Themes' },
                { value: 'feature4', label: 'API Access' },
                { value: 'feature5', label: 'Priority Support' },
              ]}"
            ></ds-select>
          </div>

          <div>
            <label
              for="search-select"
              style="display: block; margin-bottom: 0.25rem; font-weight: 500;"
            >
              Search Integration
            </label>
            <ds-select
              id="search-select"
              type="searchable"
              placeholder="Search for integrations"
              clearable
              .options="${[
                { value: 'google', label: 'Google Search' },
                { value: 'bing', label: 'Bing Search' },
                { value: 'elastic', label: 'Elasticsearch' },
                { value: 'algolia', label: 'Algolia' },
                { value: 'solr', label: 'Apache Solr' },
              ]}"
            ></ds-select>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Complex form example showing different select types in a real-world scenario.',
      },
    },
  },
};

// Theme examples story
export const ThemeExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">Light Theme</h3>
        <div
          style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
        >
          <ds-select
            placeholder="Light theme select"
            .options="${mockOptions.slice(0, 3)}"
          ></ds-select>
          <ds-select
            type="multiple"
            placeholder="Multiple selection"
            .options="${mockOptions.slice(0, 3)}"
          ></ds-select>
        </div>
      </div>

      <div style="background: #1a1a1a; padding: 1rem; border-radius: 8px;">
        <h3 style="margin-bottom: 1rem; color: white;">Dark Theme</h3>
        <div
          style="display: flex; flex-direction: column; gap: 1rem; width: 300px;"
        >
          <ds-select
            placeholder="Dark theme select"
            .options="${mockOptions.slice(0, 3)}"
          ></ds-select>
          <ds-select
            type="searchable"
            placeholder="Searchable select"
            .options="${mockOptions.slice(0, 3)}"
          ></ds-select>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Examples showing how the select component adapts to different themes.',
      },
    },
  },
};
