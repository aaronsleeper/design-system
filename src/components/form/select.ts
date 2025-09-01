import { html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Select component types
 */
export type SelectType = 'single' | 'multiple' | 'searchable';

/**
 * Select component sizes
 */
export type SelectSize = 'small' | 'medium' | 'large';

/**
 * Select component validation states
 */
export type SelectValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * Select option interface
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}

/**
 * Select option group interface
 */
export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
  disabled?: boolean;
}

/**
 * Select component properties interface
 */
export interface SelectProperties {
  type?: SelectType;
  size?: SelectSize;
  value?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  validationState?: SelectValidationState;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  options?: SelectOption[];
  optionGroups?: SelectOptionGroup[];
  searchable?: boolean;
  multiple?: boolean;
  loading?: boolean;
  clearable?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: string;
}

/**
 * Select Component
 *
 * A comprehensive select component with multiple types, sizes, and validation states.
 * Supports single/multiple selection, searchable options, and option groups.
 *
 * @example
 * ```html
 * <ds-select placeholder="Choose an option" required></ds-select>
 * <ds-select type="multiple" placeholder="Choose multiple options"></ds-select>
 * <ds-select type="searchable" placeholder="Search and select"></ds-select>
 * ```
 *
 * @fires ds-select-change - Fired when the selection changes
 * @fires ds-select-focus - Fired when the select receives focus
 * @fires ds-select-blur - Fired when the select loses focus
 * @fires ds-select-open - Fired when the dropdown opens
 * @fires ds-select-close - Fired when the dropdown closes
 */
@customElement('ds-select')
export class Select extends DesignSystemElement {
  /**
   * Select type
   * @default 'single'
   */
  @property({ type: String, reflect: true })
  type: SelectType = 'single';

  /**
   * Select size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: SelectSize = 'medium';

  /**
   * Select value (string for single, array for multiple)
   */
  @property({ type: String })
  value: string | string[] = '';

  /**
   * Select placeholder text
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Whether the select is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the select is required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Validation state
   * @default 'default'
   */
  @property({ type: String, attribute: 'validation-state' })
  validationState: SelectValidationState = 'default';

  /**
   * Error message to display
   */
  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  /**
   * Success message to display
   */
  @property({ type: String, attribute: 'success-message' })
  successMessage = '';

  /**
   * Warning message to display
   */
  @property({ type: String, attribute: 'warning-message' })
  warningMessage = '';

  /**
   * Array of options
   */
  @property({ type: Array })
  options: SelectOption[] = [];

  /**
   * Array of option groups
   */
  @property({ type: Array, attribute: 'option-groups' })
  optionGroups: SelectOptionGroup[] = [];

  /**
   * Whether the select is searchable
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  searchable = false;

  /**
   * Whether multiple selection is allowed
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Whether the select is in loading state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Whether the select can be cleared
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  clearable = false;

  /**
   * Accessible label for the select
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the select
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * Whether the select is invalid
   */
  @property({ type: String, attribute: 'aria-invalid' })
  override ariaInvalid?: string | null;

  /**
   * Internal state for dropdown open/closed
   */
  @state()
  private _isOpen = false;

  /**
   * Internal state for search query
   */
  @state()
  private _searchQuery = '';

  /**
   * Internal state for validation
   */
  @state()
  private _isValid = true;

  /**
   * Internal state for validation message
   */
  @state()
  private _validationMessage = '';

  /**
   * Internal state for focused option index
   */
  @state()
  private _focusedIndex = -1;

  /**
   * Component styles
   */
  static override styles = css`
    :host {
      display: block;
      position: relative;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    .select-container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    .select-trigger {
      width: 100%;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-md);
      font-family: var(--font-family-sans);
      font-weight: var(--font-weight-normal);
      line-height: var(--line-height-normal);
      background-color: var(--color-background-elevated);
      color: var(--color-text-primary);
      transition: all 0.2s ease-in-out;
      outline: none;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }

    .select-trigger:focus {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .select-trigger:focus:not(:focus-visible) {
      box-shadow: none;
    }

    .select-trigger:focus-visible {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .select-trigger:disabled {
      background-color: var(--color-gray-100);
      color: var(--color-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* Size variants */
    .select-trigger--small {
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--font-size-2);
      min-height: 32px;
    }

    .select-trigger--medium {
      padding: var(--spacing-3) var(--spacing-4);
      font-size: var(--font-size-3);
      min-height: 40px;
    }

    .select-trigger--large {
      padding: var(--spacing-4) var(--spacing-5);
      font-size: var(--font-size-4);
      min-height: 48px;
    }

    /* Validation states */
    .select-trigger--error {
      border-color: var(--color-error);
    }

    .select-trigger--error:focus {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .select-trigger--success {
      border-color: var(--color-success);
    }

    .select-trigger--success:focus {
      border-color: var(--color-success);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .select-trigger--warning {
      border-color: var(--color-warning);
    }

    .select-trigger--warning:focus {
      border-color: var(--color-warning);
      box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.1);
    }

    .select-trigger--open {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .select-value {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .select-placeholder {
      color: var(--color-text-tertiary);
    }

    .select-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    .select-clear {
      background: none;
      border: none;
      color: var(--color-text-tertiary);
      cursor: pointer;
      padding: var(--spacing-1);
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-in-out;
    }

    .select-clear:hover {
      background-color: var(--color-gray-100);
      color: var(--color-text-primary);
    }

    .select-arrow {
      color: var(--color-text-tertiary);
      transition: transform 0.2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .select-arrow--open {
      transform: rotate(180deg);
    }

    .select-loading {
      color: var(--color-text-tertiary);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Dropdown */
    .select-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--color-background-elevated);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-md);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      z-index: 1000;
      max-height: 200px;
      overflow-y: auto;
      margin-top: var(--spacing-1);
    }

    .select-dropdown--hidden {
      display: none;
    }

    /* Search input */
    .select-search {
      padding: var(--spacing-2) var(--spacing-3);
      border-bottom: 1px solid var(--color-border);
      background-color: var(--color-background-elevated);
    }

    .select-search-input {
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-family: var(--font-family-sans);
      font-size: var(--font-size-2);
      color: var(--color-text-primary);
    }

    .select-search-input::placeholder {
      color: var(--color-text-tertiary);
    }

    /* Options */
    .select-options {
      padding: var(--spacing-1) 0;
    }

    .select-option {
      padding: var(--spacing-2) var(--spacing-3);
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    .select-option:hover {
      background-color: var(--color-gray-50);
    }

    .select-option--focused {
      background-color: var(--color-gray-100);
    }

    .select-option--selected {
      background-color: var(--color-primary-50);
      color: var(--color-primary-600);
    }

    .select-option--disabled {
      color: var(--color-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .select-option--disabled:hover {
      background-color: transparent;
    }

    .select-option-checkbox {
      width: 16px;
      height: 16px;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .select-option-checkbox--checked {
      background-color: var(--color-primary-600);
      border-color: var(--color-primary-600);
      color: white;
    }

    /* Option groups */
    .select-option-group {
      padding: var(--spacing-2) var(--spacing-3) var(--spacing-1);
      font-size: var(--font-size-1);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: var(--letter-spacing-wide);
    }

    .select-option-group--disabled {
      color: var(--color-text-tertiary);
      opacity: 0.6;
    }

    /* Validation message */
    .validation-message {
      font-size: var(--font-size-2);
      line-height: var(--line-height-tight);
      margin-top: var(--spacing-1);
      display: flex;
      align-items: center;
      gap: var(--spacing-1);
    }

    .validation-message--error {
      color: var(--color-error);
    }

    .validation-message--success {
      color: var(--color-success);
    }

    .validation-message--warning {
      color: var(--color-warning);
    }

    /* Validation icon */
    .validation-icon {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }

    /* Required indicator */
    .required-indicator {
      color: var(--color-error);
      margin-left: var(--spacing-1);
    }

    /* Screen reader only text */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .select-trigger {
        border-width: 2px;
      }

      .select-trigger:focus {
        outline: 2px solid var(--color-border-focus);
        outline-offset: 2px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .select-trigger,
      .select-arrow,
      .select-option {
        transition: none;
      }

      .select-loading {
        animation: none;
      }
    }

    /* RTL support */
    :host([dir='rtl']) .select-trigger {
      text-align: right;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .select-trigger {
        background-color: var(--color-gray-800);
        border-color: var(--color-gray-600);
        color: var(--color-text-inverse);
      }

      .select-trigger:disabled {
        background-color: var(--color-gray-700);
        color: var(--color-gray-400);
      }

      .select-dropdown {
        background-color: var(--color-gray-800);
        border-color: var(--color-gray-600);
      }

      .select-search {
        background-color: var(--color-gray-800);
        border-color: var(--color-gray-600);
      }

      .select-option:hover {
        background-color: var(--color-gray-700);
      }

      .select-option--focused {
        background-color: var(--color-gray-700);
      }

      .select-option--selected {
        background-color: var(--color-primary-900);
        color: var(--color-primary-200);
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const triggerClasses = this._getTriggerClasses();
    const validationMessage = this._getValidationMessage();
    const displayValue = this._getDisplayValue();
    const filteredOptions = this._getFilteredOptions();

    return html`
      <div class="select-container">
        <div
          class="${triggerClasses}"
          role="combobox"
          aria-expanded="${this._isOpen}"
          aria-haspopup="listbox"
          aria-label="${this.ariaLabel || undefined}"
          aria-describedby="${this._getAriaDescribedBy()}"
          aria-invalid="${this._getAriaInvalid()}"
          tabindex="${this.disabled ? -1 : 0}"
          @click="${this._handleTriggerClick}"
          @keydown="${this._handleKeydown}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
        >
          <div class="select-value">${displayValue}</div>
          <div class="select-actions">
            ${this.clearable && this.value && !this.disabled
              ? html`
                  <button
                    class="select-clear"
                    type="button"
                    @click="${this._handleClear}"
                    aria-label="Clear selection"
                  >
                    ✕
                  </button>
                `
              : ''}
            ${this.loading
              ? html`<div class="select-loading">⟳</div>`
              : html`
                  <div
                    class="select-arrow ${this._isOpen
                      ? 'select-arrow--open'
                      : ''}"
                  >
                    ▼
                  </div>
                `}
          </div>
        </div>
        ${this._isOpen ? this._renderDropdown(filteredOptions) : ''}
        ${validationMessage}
        ${this.required
          ? html`<span class="sr-only">Required field</span>`
          : ''}
      </div>
    `;
  }

  /**
   * Get trigger CSS classes
   */
  private _getTriggerClasses(): string {
    const classes = ['select-trigger'];
    classes.push(`select-trigger--${this.size}`);

    if (this.validationState !== 'default') {
      classes.push(`select-trigger--${this.validationState}`);
    }

    if (this._isOpen) {
      classes.push('select-trigger--open');
    }

    return classes.join(' ');
  }

  /**
   * Get display value
   */
  private _getDisplayValue(): TemplateResult {
    if (this.loading) {
      return html`<span class="select-placeholder">Loading...</span>`;
    }

    if (!this.value || (Array.isArray(this.value) && this.value.length === 0)) {
      return html`<span class="select-placeholder">${this.placeholder}</span>`;
    }

    if (Array.isArray(this.value)) {
      const selectedOptions = this._getSelectedOptions();
      if (selectedOptions.length === 0) {
        return html`<span class="select-placeholder"
          >${this.placeholder}</span
        >`;
      }
      if (selectedOptions.length === 1) {
        return html`<span>${selectedOptions[0]?.label}</span>`;
      }
      return html`<span>${selectedOptions.length} items selected</span>`;
    }

    const selectedOption = this._getSelectedOption(this.value);
    if (selectedOption) {
      return html`<span>${selectedOption.label}</span>`;
    }

    return html`<span class="select-placeholder">${this.placeholder}</span>`;
  }

  /**
   * Get filtered options based on search query
   */
  private _getFilteredOptions(): (SelectOption | SelectOptionGroup)[] {
    if (!this.searchable || !this._searchQuery) {
      return this.optionGroups.length > 0 ? this.optionGroups : this.options;
    }

    const query = this._searchQuery.toLowerCase();
    const filteredOptions: SelectOption[] = [];

    // Filter regular options
    this.options.forEach(option => {
      if (option.label.toLowerCase().includes(query)) {
        filteredOptions.push(option);
      }
    });

    // Filter option groups
    const filteredGroups: SelectOptionGroup[] = [];
    this.optionGroups.forEach(group => {
      const filteredGroupOptions = group.options.filter(option =>
        option.label.toLowerCase().includes(query)
      );
      if (filteredGroupOptions.length > 0) {
        filteredGroups.push({
          ...group,
          options: filteredGroupOptions,
        });
      }
    });

    return filteredGroups.length > 0 ? filteredGroups : filteredOptions;
  }

  /**
   * Render dropdown
   */
  private _renderDropdown(
    options: (SelectOption | SelectOptionGroup)[]
  ): TemplateResult {
    return html`
      <div class="select-dropdown" role="listbox">
        ${this.searchable
          ? html`
              <div class="select-search">
                <input
                  class="select-search-input"
                  type="text"
                  placeholder="Search options..."
                  .value="${this._searchQuery}"
                  @input="${this._handleSearchInput}"
                  @keydown="${this._handleSearchKeydown}"
                />
              </div>
            `
          : ''}
        <div class="select-options">
          ${options.map((option, index) => this._renderOption(option, index))}
        </div>
      </div>
    `;
  }

  /**
   * Render option or option group
   */
  private _renderOption(
    option: SelectOption | SelectOptionGroup,
    index: number
  ): TemplateResult {
    if ('options' in option) {
      // Option group
      return html`
        <div
          class="select-option-group ${option.disabled
            ? 'select-option-group--disabled'
            : ''}"
        >
          ${option.label}
        </div>
        ${option.options.map((opt, optIndex) =>
          this._renderOption(opt, index + optIndex + 1)
        )}
      `;
    }

    // Regular option
    const isSelected = this._isOptionSelected(option);
    const isFocused = this._focusedIndex === index;
    const classes = ['select-option'];
    if (isFocused) classes.push('select-option--focused');
    if (isSelected) classes.push('select-option--selected');
    if (option.disabled) classes.push('select-option--disabled');

    return html`
      <div
        class="${classes.join(' ')}"
        role="option"
        aria-selected="${isSelected}"
        data-value="${option.value}"
        @click="${option.disabled
          ? null
          : () => this._handleOptionClick(option)}"
        @mouseenter="${() => this._handleOptionMouseEnter(index)}"
      >
        ${this.multiple
          ? html`
              <div
                class="select-option-checkbox ${isSelected
                  ? 'select-option-checkbox--checked'
                  : ''}"
              >
                ${isSelected ? '✓' : ''}
              </div>
            `
          : ''}
        <span>${option.label}</span>
      </div>
    `;
  }

  /**
   * Get validation message
   */
  private _getValidationMessage(): TemplateResult | null {
    const message = this._getValidationMessageText();
    if (!message) return null;

    const messageClasses = ['validation-message'];
    if (this.validationState !== 'default') {
      messageClasses.push(`validation-message--${this.validationState}`);
    }

    return html`
      <div class="${messageClasses.join(' ')}" role="alert" aria-live="polite">
        ${this._getValidationIcon()}
        <span>${message}</span>
      </div>
    `;
  }

  /**
   * Get validation message text
   */
  private _getValidationMessageText(): string {
    switch (this.validationState) {
      case 'error':
        return this.errorMessage || this._validationMessage;
      case 'success':
        return this.successMessage;
      case 'warning':
        return this.warningMessage;
      default:
        return '';
    }
  }

  /**
   * Get validation icon
   */
  private _getValidationIcon(): TemplateResult | null {
    if (this.validationState === 'default') return null;

    const iconMap = {
      error: '❌',
      success: '✅',
      warning: '⚠️',
    };

    return html`
      <span class="validation-icon" aria-hidden="true">
        ${iconMap[this.validationState]}
      </span>
    `;
  }

  /**
   * Get aria-describedby value
   */
  private _getAriaDescribedBy(): string {
    const ids = [];
    if (this.ariaDescribedBy) {
      ids.push(this.ariaDescribedBy);
    }
    return ids.join(' ');
  }

  /**
   * Get aria-invalid value
   */
  private _getAriaInvalid(): string {
    if (this.ariaInvalid) {
      return this.ariaInvalid;
    }
    return this.validationState === 'error' ? 'true' : 'false';
  }

  /**
   * Get selected option by value
   */
  private _getSelectedOption(value: string): SelectOption | null {
    // Check regular options
    for (const option of this.options) {
      if (option.value === value) {
        return option;
      }
    }

    // Check option groups
    for (const group of this.optionGroups) {
      for (const option of group.options) {
        if (option.value === value) {
          return option;
        }
      }
    }

    return null;
  }

  /**
   * Get selected options for multiple selection
   */
  private _getSelectedOptions(): SelectOption[] {
    if (!Array.isArray(this.value)) return [];

    const selectedOptions: SelectOption[] = [];
    for (const value of this.value) {
      const option = this._getSelectedOption(value);
      if (option) {
        selectedOptions.push(option);
      }
    }
    return selectedOptions;
  }

  /**
   * Check if option is selected
   */
  private _isOptionSelected(option: SelectOption): boolean {
    if (Array.isArray(this.value)) {
      return this.value.includes(option.value);
    }
    return this.value === option.value;
  }

  /**
   * Handle trigger click
   */
  private _handleTriggerClick(): void {
    if (this.disabled || this.loading) return;

    this._isOpen = !this._isOpen;
    this._focusedIndex = -1;

    if (this._isOpen) {
      this.dispatchDesignSystemEvent('open', {
        type: this.type,
        size: this.size,
        value: this.value,
      });
    } else {
      this.dispatchDesignSystemEvent('close', {
        type: this.type,
        size: this.size,
        value: this.value,
      });
    }
  }

  /**
   * Handle keydown events
   */
  private _handleKeydown(event: KeyboardEvent): void {
    if (this.disabled || this.loading) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this._handleTriggerClick();
        break;
      case 'Escape':
        if (this._isOpen) {
          event.preventDefault();
          this._closeDropdown();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this._isOpen) {
          this._openDropdown();
        } else {
          this._focusNextOption();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this._isOpen) {
          this._focusPreviousOption();
        }
        break;
    }
  }

  /**
   * Handle search input
   */
  private _handleSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._searchQuery = target.value;
    this._focusedIndex = -1;
  }

  /**
   * Handle search keydown
   */
  private _handleSearchKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this._focusNextOption();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._focusPreviousOption();
        break;
      case 'Escape':
        event.preventDefault();
        this._closeDropdown();
        break;
    }
  }

  /**
   * Handle option click
   */
  private _handleOptionClick(option: SelectOption): void {
    if (option.disabled) return;

    if (this.multiple) {
      this._handleMultipleSelection(option);
    } else {
      this._handleSingleSelection(option);
    }
  }

  /**
   * Handle single selection
   */
  private _handleSingleSelection(option: SelectOption): void {
    this.value = option.value;
    this._closeDropdown();
    this._validateSelection();
    this._updateValidationState();

    this.dispatchDesignSystemEvent('change', {
      type: this.type,
      size: this.size,
      value: this.value,
      selectedOption: option,
    });
  }

  /**
   * Handle multiple selection
   */
  private _handleMultipleSelection(option: SelectOption): void {
    const currentValue = Array.isArray(this.value) ? this.value : [];
    const isSelected = currentValue.includes(option.value);

    if (isSelected) {
      this.value = currentValue.filter(v => v !== option.value);
    } else {
      this.value = [...currentValue, option.value];
    }

    this._validateSelection();
    this._updateValidationState();

    this.dispatchDesignSystemEvent('change', {
      type: this.type,
      size: this.size,
      value: this.value,
      selectedOption: option,
      isSelected: !isSelected,
    });
  }

  /**
   * Handle option mouse enter
   */
  private _handleOptionMouseEnter(index: number): void {
    this._focusedIndex = index;
  }

  /**
   * Handle clear button click
   */
  private _handleClear(event: Event): void {
    event.stopPropagation();
    this.value = this.multiple ? [] : '';
    this._closeDropdown();
    this._validateSelection();
    this._updateValidationState();

    this.dispatchDesignSystemEvent('change', {
      type: this.type,
      size: this.size,
      value: this.value,
    });
  }

  /**
   * Handle focus event
   */
  private _handleFocus(): void {
    this.dispatchDesignSystemEvent('focus', {
      type: this.type,
      size: this.size,
      value: this.value,
    });
  }

  /**
   * Handle blur event
   */
  private _handleBlur(): void {
    // Delay closing to allow option clicks
    setTimeout(() => {
      if (!this.contains(document.activeElement)) {
        this._closeDropdown();
      }
    }, 100);

    this.dispatchDesignSystemEvent('blur', {
      type: this.type,
      size: this.size,
      value: this.value,
    });
  }

  /**
   * Open dropdown
   */
  private _openDropdown(): void {
    this._isOpen = true;
    this._focusedIndex = -1;
    this._searchQuery = '';

    this.dispatchDesignSystemEvent('open', {
      type: this.type,
      size: this.size,
      value: this.value,
    });
  }

  /**
   * Close dropdown
   */
  private _closeDropdown(): void {
    this._isOpen = false;
    this._focusedIndex = -1;
    this._searchQuery = '';

    this.dispatchDesignSystemEvent('close', {
      type: this.type,
      size: this.size,
      value: this.value,
    });
  }

  /**
   * Focus next option
   */
  private _focusNextOption(): void {
    const options = this._getFilteredOptions();
    const flatOptions = this._flattenOptions(options);

    if (this._focusedIndex < flatOptions.length - 1) {
      this._focusedIndex++;
    } else {
      this._focusedIndex = 0;
    }
  }

  /**
   * Focus previous option
   */
  private _focusPreviousOption(): void {
    const options = this._getFilteredOptions();
    const flatOptions = this._flattenOptions(options);

    if (this._focusedIndex > 0) {
      this._focusedIndex--;
    } else {
      this._focusedIndex = flatOptions.length - 1;
    }
  }

  /**
   * Flatten options for keyboard navigation
   */
  private _flattenOptions(
    options: (SelectOption | SelectOptionGroup)[]
  ): SelectOption[] {
    const flatOptions: SelectOption[] = [];

    for (const option of options) {
      if ('options' in option) {
        flatOptions.push(...option.options);
      } else {
        flatOptions.push(option);
      }
    }

    return flatOptions;
  }

  /**
   * Validate selection
   */
  private _validateSelection(): void {
    this._isValid = true;
    this._validationMessage = '';

    if (this.required) {
      const hasValue = Array.isArray(this.value)
        ? this.value.length > 0
        : this.value !== '';

      if (!hasValue) {
        this._isValid = false;
        this._validationMessage = 'Please select an option';
        return;
      }
    }
  }

  /**
   * Update validation state
   */
  private _updateValidationState(): void {
    if (this._isValid && this.value) {
      this.validationState = 'success';
    } else if (!this._isValid) {
      this.validationState = 'error';
    } else {
      this.validationState = 'default';
    }

    // Dispatch validation event
    this.dispatchDesignSystemEvent('validate', {
      type: this.type,
      size: this.size,
      value: this.value,
      validationState: this.validationState,
      isValid: this._isValid,
      validationMessage: this._validationMessage,
    });
  }

  /**
   * Validate component properties
   */
  override connectedCallback(): void {
    super.connectedCallback();

    // Validate type
    this.type = this.validateEnum(
      this.type,
      ['single', 'multiple', 'searchable'],
      'single'
    );

    // Validate size
    this.size = this.validateEnum(
      this.size,
      ['small', 'medium', 'large'],
      'medium'
    );

    // Validate validation state
    this.validationState = this.validateEnum(
      this.validationState,
      ['default', 'error', 'success', 'warning'],
      'default'
    );

    // Set multiple based on type
    if (this.type === 'multiple') {
      this.multiple = true;
    }

    // Set searchable based on type
    if (this.type === 'searchable') {
      this.searchable = true;
    }
  }

  /**
   * Get the current select element
   */
  get selectElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.select-trigger') || null;
  }

  /**
   * Focus the select
   */
  override focus(): void {
    this.selectElement?.focus();
  }

  /**
   * Blur the select
   */
  override blur(): void {
    this.selectElement?.blur();
  }

  /**
   * Open the dropdown
   */
  open(): void {
    if (!this.disabled && !this.loading) {
      this._openDropdown();
    }
  }

  /**
   * Close the dropdown
   */
  close(): void {
    this._closeDropdown();
  }

  /**
   * Clear the selection
   */
  clear(): void {
    this.value = this.multiple ? [] : '';
    this._validateSelection();
    this._updateValidationState();

    this.dispatchDesignSystemEvent('change', {
      type: this.type,
      size: this.size,
      value: this.value,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-select': Select;
  }
}
