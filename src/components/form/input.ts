import { html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Input component types
 */
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

/**
 * Input component sizes
 */
export type InputSize = 'small' | 'medium' | 'large';

/**
 * Input component validation states
 */
export type InputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * Input component properties interface
 */
export interface InputProperties {
  type?: InputType;
  size?: InputSize;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  validationState?: InputValidationState;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  autocomplete?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: string;
}

/**
 * Input Component
 *
 * A comprehensive input component with multiple types, sizes, and validation states.
 * Supports all standard HTML input attributes and provides built-in validation feedback.
 *
 * @example
 * ```html
 * <ds-input type="email" placeholder="Enter your email" required></ds-input>
 * <ds-input type="password" validation-state="error" error-message="Password is required"></ds-input>
 * <ds-input type="number" min="0" max="100" step="1"></ds-input>
 * ```
 *
 * @fires ds-input-change - Fired when the input value changes
 * @fires ds-input-focus - Fired when the input receives focus
 * @fires ds-input-blur - Fired when the input loses focus
 * @fires ds-input-validate - Fired when validation state changes
 */
@customElement('ds-input')
export class Input extends DesignSystemElement {
  /**
   * Input type
   * @default 'text'
   */
  @property({ type: String, reflect: true })
  type: InputType = 'text';

  /**
   * Input size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: InputSize = 'medium';

  /**
   * Input value
   */
  @property({ type: String })
  value = '';

  /**
   * Input placeholder text
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Whether the input is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the input is readonly
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the input is required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Validation state
   * @default 'default'
   */
  @property({ type: String, attribute: 'validation-state' })
  validationState: InputValidationState = 'default';

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
   * Minimum length for text inputs
   */
  @property({ type: Number, attribute: 'min-length' })
  minLength?: number;

  /**
   * Maximum length for text inputs
   */
  @property({ type: Number, attribute: 'max-length' })
  maxLength?: number;

  /**
   * Minimum value for number inputs
   */
  @property({ type: Number })
  min?: number;

  /**
   * Maximum value for number inputs
   */
  @property({ type: Number })
  max?: number;

  /**
   * Step value for number inputs
   */
  @property({ type: Number })
  step?: number;

  /**
   * Pattern for validation
   */
  @property({ type: String })
  pattern?: string;

  /**
   * Autocomplete attribute
   */
  @property({ type: String })
  autocomplete?: string;

  /**
   * Accessible label for the input
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string;

  /**
   * ID of element that describes the input
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * Whether the input is invalid
   */
  @property({ type: String, attribute: 'aria-invalid' })
  override ariaInvalid?: string;

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

    .input-container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    .input {
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
    }

    .input:focus {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .input:focus:not(:focus-visible) {
      box-shadow: none;
    }

    .input:focus-visible {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .input::placeholder {
      color: var(--color-text-tertiary);
      opacity: 1;
    }

    .input:disabled {
      background-color: var(--color-gray-100);
      color: var(--color-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .input:read-only {
      background-color: var(--color-gray-50);
      cursor: default;
    }

    /* Size variants */
    .input--small {
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--font-size-2);
      min-height: 32px;
    }

    .input--medium {
      padding: var(--spacing-3) var(--spacing-4);
      font-size: var(--font-size-3);
      min-height: 40px;
    }

    .input--large {
      padding: var(--spacing-4) var(--spacing-5);
      font-size: var(--font-size-4);
      min-height: 48px;
    }

    /* Validation states */
    .input--error {
      border-color: var(--color-error);
    }

    .input--error:focus {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .input--success {
      border-color: var(--color-success);
    }

    .input--success:focus {
      border-color: var(--color-success);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .input--warning {
      border-color: var(--color-warning);
    }

    .input--warning:focus {
      border-color: var(--color-warning);
      box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.1);
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

    /* Character count */
    .character-count {
      font-size: var(--font-size-1);
      color: var(--color-text-tertiary);
      text-align: right;
      margin-top: var(--spacing-1);
    }

    .character-count--error {
      color: var(--color-error);
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
      .input {
        border-width: 2px;
      }

      .input:focus {
        outline: 2px solid var(--color-border-focus);
        outline-offset: 2px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .input {
        transition: none;
      }
    }

    /* RTL support */
    :host([dir='rtl']) .input {
      text-align: right;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .input {
        background-color: var(--color-gray-800);
        border-color: var(--color-gray-600);
        color: var(--color-text-inverse);
      }

      .input::placeholder {
        color: var(--color-gray-400);
      }

      .input:disabled {
        background-color: var(--color-gray-700);
        color: var(--color-gray-400);
      }

      .input:read-only {
        background-color: var(--color-gray-700);
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const inputClasses = this._getInputClasses();
    const validationMessage = this._getValidationMessage();
    const characterCount = this._getCharacterCount();

    return html`
      <div class="input-container">
        <input
          class="${inputClasses}"
          type="${this.type}"
          .value="${this.value}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          minlength="${this.minLength || undefined}"
          maxlength="${this.maxLength || undefined}"
          min="${this.min || undefined}"
          max="${this.max || undefined}"
          step="${this.step || undefined}"
          pattern="${this.pattern || undefined}"
          autocomplete="${this.autocomplete || undefined}"
          aria-label="${this.ariaLabel || undefined}"
          aria-describedby="${this._getAriaDescribedBy()}"
          aria-invalid="${this._getAriaInvalid()}"
          @input="${this._handleInput}"
          @change="${this._handleChange}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @invalid="${this._handleInvalid}"
        />
        ${validationMessage} ${characterCount}
        ${this.required
          ? html`<span class="sr-only">Required field</span>`
          : ''}
      </div>
    `;
  }

  /**
   * Get input CSS classes
   */
  private _getInputClasses(): string {
    const classes = ['input'];
    classes.push(`input--${this.size}`);

    if (this.validationState !== 'default') {
      classes.push(`input--${this.validationState}`);
    }

    return classes.join(' ');
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
   * Get character count
   */
  private _getCharacterCount(): TemplateResult | null {
    if (!this.maxLength) return null;

    const currentLength = this.value.length;
    const isOverLimit = currentLength > this.maxLength;
    const classes = ['character-count'];
    if (isOverLimit) {
      classes.push('character-count--error');
    }

    return html`
      <div class="${classes.join(' ')}">${currentLength}/${this.maxLength}</div>
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
    if (this.maxLength) {
      ids.push(`${this.instanceId}-character-count`);
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
   * Handle input event
   */
  private _handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this._validateInput();
    this._updateValidationState();

    // Dispatch design system event
    this.dispatchDesignSystemEvent(
      'change',
      {
        type: this.type,
        size: this.size,
        value: this.value,
        validationState: this.validationState,
        isValid: this._isValid,
      },
      event
    );
  }

  /**
   * Handle change event
   */
  private _handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this._validateInput();
    this._updateValidationState();

    // Dispatch design system event
    this.dispatchDesignSystemEvent(
      'change',
      {
        type: this.type,
        size: this.size,
        value: this.value,
        validationState: this.validationState,
        isValid: this._isValid,
      },
      event
    );
  }

  /**
   * Handle focus event
   */
  private _handleFocus(event: FocusEvent): void {
    this.dispatchDesignSystemEvent(
      'focus',
      {
        type: this.type,
        size: this.size,
        value: this.value,
      },
      event
    );
  }

  /**
   * Handle blur event
   */
  private _handleBlur(event: FocusEvent): void {
    this._validateInput();
    this._updateValidationState();

    this.dispatchDesignSystemEvent(
      'blur',
      {
        type: this.type,
        size: this.size,
        value: this.value,
        validationState: this.validationState,
        isValid: this._isValid,
      },
      event
    );
  }

  /**
   * Handle invalid event
   */
  private _handleInvalid(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._validationMessage = target.validationMessage;
    this._isValid = false;
    this.validationState = 'error';

    this.dispatchDesignSystemEvent(
      'validate',
      {
        type: this.type,
        size: this.size,
        value: this.value,
        validationState: this.validationState,
        isValid: this._isValid,
        validationMessage: this._validationMessage,
      },
      event
    );
  }

  /**
   * Validate input value
   */
  private _validateInput(): void {
    const input = this.shadowRoot?.querySelector('input') as HTMLInputElement;
    if (!input) return;

    // Reset validation state
    this._isValid = true;
    this._validationMessage = '';

    // Check if input is valid
    if (!input.checkValidity()) {
      this._isValid = false;
      this._validationMessage = input.validationMessage;
    }

    // Custom validation rules
    this._validateCustomRules();
  }

  /**
   * Validate custom rules
   */
  private _validateCustomRules(): void {
    // Check required field
    if (this.required && !this.value.trim()) {
      this._isValid = false;
      this._validationMessage = 'This field is required';
      return;
    }

    // Check min/max length
    if (this.minLength && this.value.length < this.minLength) {
      this._isValid = false;
      this._validationMessage = `Minimum length is ${this.minLength} characters`;
      return;
    }

    if (this.maxLength && this.value.length > this.maxLength) {
      this._isValid = false;
      this._validationMessage = `Maximum length is ${this.maxLength} characters`;
      return;
    }

    // Check min/max values for number inputs
    if (this.type === 'number') {
      const numValue = Number(this.value);
      if (this.min !== undefined && numValue < this.min) {
        this._isValid = false;
        this._validationMessage = `Minimum value is ${this.min}`;
        return;
      }
      if (this.max !== undefined && numValue > this.max) {
        this._isValid = false;
        this._validationMessage = `Maximum value is ${this.max}`;
        return;
      }
    }

    // Check pattern
    if (
      this.pattern &&
      this.value &&
      !new RegExp(this.pattern).test(this.value)
    ) {
      this._isValid = false;
      this._validationMessage = 'Invalid format';
      return;
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
      ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      'text'
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
  }

  /**
   * Get the current input element
   */
  get inputElement(): HTMLInputElement | null {
    return this.shadowRoot?.querySelector('input') || null;
  }

  /**
   * Focus the input
   */
  override focus(): void {
    this.inputElement?.focus();
  }

  /**
   * Blur the input
   */
  override blur(): void {
    this.inputElement?.blur();
  }

  /**
   * Select all text in the input
   */
  select(): void {
    this.inputElement?.select();
  }

  /**
   * Set the selection range
   */
  setSelectionRange(start: number, end: number): void {
    this.inputElement?.setSelectionRange(start, end);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-input': Input;
  }
}
