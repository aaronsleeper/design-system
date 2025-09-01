import { html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Textarea component sizes
 */
export type TextareaSize = 'small' | 'medium' | 'large';

/**
 * Textarea component validation states
 */
export type TextareaValidationState =
  | 'default'
  | 'error'
  | 'success'
  | 'warning';

/**
 * Textarea component properties interface
 */
export interface TextareaProperties {
  size?: TextareaSize;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  validationState?: TextareaValidationState;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
  wrap?: 'soft' | 'hard' | 'off';
  spellcheck?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: string;
}

/**
 * Textarea Component
 *
 * A comprehensive textarea component with multiple sizes and validation states.
 * Supports all standard HTML textarea attributes and provides built-in validation feedback.
 *
 * @example
 * ```html
 * <ds-textarea placeholder="Enter your message" required></ds-textarea>
 * <ds-textarea validation-state="error" error-message="Message is required"></ds-textarea>
 * <ds-textarea rows="5" maxlength="500"></ds-textarea>
 * ```
 *
 * @fires ds-textarea-change - Fired when the textarea value changes
 * @fires ds-textarea-focus - Fired when the textarea receives focus
 * @fires ds-textarea-blur - Fired when the textarea loses focus
 * @fires ds-textarea-validate - Fired when validation state changes
 */
@customElement('ds-textarea')
export class Textarea extends DesignSystemElement {
  /**
   * Textarea size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: TextareaSize = 'medium';

  /**
   * Textarea value
   */
  @property({ type: String })
  value = '';

  /**
   * Textarea placeholder text
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Whether the textarea is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the textarea is readonly
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the textarea is required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Validation state
   * @default 'default'
   */
  @property({ type: String, attribute: 'validation-state' })
  validationState: TextareaValidationState = 'default';

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
   * Minimum length for textarea
   */
  @property({ type: Number, attribute: 'min-length' })
  minLength?: number;

  /**
   * Maximum length for textarea
   */
  @property({ type: Number, attribute: 'max-length' })
  maxLength?: number;

  /**
   * Number of visible text lines
   */
  @property({ type: Number })
  rows = 3;

  /**
   * Number of visible character widths
   */
  @property({ type: Number })
  cols?: number;

  /**
   * How the text should be wrapped
   */
  @property({ type: String })
  wrap: 'soft' | 'hard' | 'off' = 'soft';

  /**
   * Whether spellcheck is enabled
   */
  @property({ type: Boolean })
  spellcheck = true;

  /**
   * Accessible label for the textarea
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the textarea
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * Whether the textarea is invalid
   */
  @property({ type: String, attribute: 'aria-invalid' })
  override ariaInvalid?: string | null;

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

    .textarea-container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    .textarea {
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
      resize: vertical;
      min-height: 60px;
    }

    .textarea:focus {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .textarea:focus:not(:focus-visible) {
      box-shadow: none;
    }

    .textarea:focus-visible {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .textarea::placeholder {
      color: var(--color-text-tertiary);
      opacity: 1;
    }

    .textarea:disabled {
      background-color: var(--color-gray-100);
      color: var(--color-text-tertiary);
      cursor: not-allowed;
      opacity: 0.6;
      resize: none;
    }

    .textarea:read-only {
      background-color: var(--color-gray-50);
      cursor: default;
      resize: none;
    }

    /* Size variants */
    .textarea--small {
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--font-size-2);
      min-height: 48px;
    }

    .textarea--medium {
      padding: var(--spacing-3) var(--spacing-4);
      font-size: var(--font-size-3);
      min-height: 60px;
    }

    .textarea--large {
      padding: var(--spacing-4) var(--spacing-5);
      font-size: var(--font-size-4);
      min-height: 72px;
    }

    /* Validation states */
    .textarea--error {
      border-color: var(--color-error);
    }

    .textarea--error:focus {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .textarea--success {
      border-color: var(--color-success);
    }

    .textarea--success:focus {
      border-color: var(--color-success);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .textarea--warning {
      border-color: var(--color-warning);
    }

    .textarea--warning:focus {
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
      .textarea {
        border-width: 2px;
      }

      .textarea:focus {
        outline: 2px solid var(--color-border-focus);
        outline-offset: 2px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .textarea {
        transition: none;
      }
    }

    /* RTL support */
    :host([dir='rtl']) .textarea {
      text-align: right;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .textarea {
        background-color: var(--color-gray-800);
        border-color: var(--color-gray-600);
        color: var(--color-text-inverse);
      }

      .textarea::placeholder {
        color: var(--color-gray-400);
      }

      .textarea:disabled {
        background-color: var(--color-gray-700);
        color: var(--color-gray-400);
      }

      .textarea:read-only {
        background-color: var(--color-gray-700);
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const textareaClasses = this._getTextareaClasses();
    const validationMessage = this._getValidationMessage();
    const characterCount = this._getCharacterCount();

    return html`
      <div class="textarea-container">
        <textarea
          class="${textareaClasses}"
          .value="${this.value}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          minlength="${this.minLength || undefined}"
          maxlength="${this.maxLength || undefined}"
          rows="${this.rows}"
          cols="${this.cols || undefined}"
          wrap="${this.wrap}"
          ?spellcheck="${this.spellcheck}"
          aria-label="${this.ariaLabel || undefined}"
          aria-describedby="${this._getAriaDescribedBy()}"
          aria-invalid="${this._getAriaInvalid()}"
          @input="${this._handleInput}"
          @change="${this._handleChange}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @invalid="${this._handleInvalid}"
        ></textarea>
        ${validationMessage} ${characterCount}
        ${this.required
          ? html`<span class="sr-only">Required field</span>`
          : ''}
      </div>
    `;
  }

  /**
   * Get textarea CSS classes
   */
  private _getTextareaClasses(): string {
    const classes = ['textarea'];
    classes.push(`textarea--${this.size}`);

    if (this.validationState !== 'default') {
      classes.push(`textarea--${this.validationState}`);
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
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this._validateTextarea();
    this._updateValidationState();

    // Dispatch design system event
    this.dispatchDesignSystemEvent(
      'change',
      {
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
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this._validateTextarea();
    this._updateValidationState();

    // Dispatch design system event
    this.dispatchDesignSystemEvent(
      'change',
      {
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
    this._validateTextarea();
    this._updateValidationState();

    this.dispatchDesignSystemEvent(
      'blur',
      {
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
    const target = event.target as HTMLTextAreaElement;
    this._validationMessage = target.validationMessage;
    this._isValid = false;
    this.validationState = 'error';

    this.dispatchDesignSystemEvent(
      'validate',
      {
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
   * Validate textarea value
   */
  private _validateTextarea(): void {
    const textarea = this.shadowRoot?.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    // Reset validation state
    this._isValid = true;
    this._validationMessage = '';

    // Check if textarea is valid
    if (!textarea.checkValidity()) {
      this._isValid = false;
      this._validationMessage = textarea.validationMessage;
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

    // Validate wrap
    this.wrap = this.validateEnum(this.wrap, ['soft', 'hard', 'off'], 'soft');

    // Validate rows
    if (this.rows < 1) {
      this.rows = 3;
    }
  }

  /**
   * Get the current textarea element
   */
  get textareaElement(): HTMLTextAreaElement | null {
    return this.shadowRoot?.querySelector('textarea') || null;
  }

  /**
   * Focus the textarea
   */
  override focus(): void {
    this.textareaElement?.focus();
  }

  /**
   * Blur the textarea
   */
  override blur(): void {
    this.textareaElement?.blur();
  }

  /**
   * Select all text in the textarea
   */
  select(): void {
    this.textareaElement?.select();
  }

  /**
   * Set the selection range
   */
  setSelectionRange(start: number, end: number): void {
    this.textareaElement?.setSelectionRange(start, end);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-textarea': Textarea;
  }
}
