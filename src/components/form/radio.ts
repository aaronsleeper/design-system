import { html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Radio component sizes
 */
export type RadioSize = 'small' | 'medium' | 'large';

/**
 * Radio component validation states
 */
export type RadioValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * Radio component properties interface
 */
export interface RadioProperties {
  size?: RadioSize;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  validationState?: RadioValidationState;
  errorMessage?: string;
  successMessage?: string;
  warningMessage?: string;
  name?: string;
  value?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: string;
}

/**
 * Radio Component
 *
 * A comprehensive radio component with multiple sizes, states, and validation.
 * Supports radio button groups and provides built-in validation feedback.
 *
 * @example
 * ```html
 * <ds-radio size="medium" name="option" value="1" checked>Option 1</ds-radio>
 * <ds-radio size="large" name="option" value="2">Option 2</ds-radio>
 * <ds-radio validation-state="error" error-message="This field is required"></ds-radio>
 * ```
 *
 * @fires ds-radio-change - Fired when the radio state changes
 * @fires ds-radio-focus - Fired when the radio receives focus
 * @fires ds-radio-blur - Fired when the radio loses focus
 * @fires ds-radio-validate - Fired when validation state changes
 */
@customElement('ds-radio')
export class Radio extends DesignSystemElement {
  /**
   * Radio size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: RadioSize = 'medium';

  /**
   * Whether the radio is checked
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the radio is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the radio is required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Validation state
   * @default 'default'
   */
  @property({ type: String, attribute: 'validation-state' })
  validationState: RadioValidationState = 'default';

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
   * Name attribute for form submission and grouping
   */
  @property({ type: String })
  name?: string;

  /**
   * Value attribute for form submission
   */
  @property({ type: String })
  value?: string;

  /**
   * Accessible label for the radio
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel?: string;

  /**
   * ID of element that describes the radio
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * Whether the radio is invalid
   */
  @property({ type: String, attribute: 'aria-invalid' })
  ariaInvalid?: string;

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
      display: inline-block;
      position: relative;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    .radio-container {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-3);
      cursor: pointer;
      position: relative;
    }

    .radio-container:focus-within {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
      border-radius: var(--border-radius-sm);
    }

    .radio-container:focus-within:not(:focus-visible) {
      outline: none;
    }

    .radio-container:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
      border-radius: var(--border-radius-sm);
    }

    .radio-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;
      border: 0;
      outline: 0;
      clip: rect(0, 0, 0, 0);
      overflow: hidden;
    }

    .radio-visual {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--color-border);
      border-radius: 50%;
      background-color: var(--color-background-elevated);
      transition: all 0.2s ease-in-out;
      flex-shrink: 0;
    }

    .radio-visual:hover:not(:disabled) {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .radio-visual:focus {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    /* Size variants */
    .radio-visual--small {
      width: 16px;
      height: 16px;
    }

    .radio-visual--medium {
      width: 20px;
      height: 20px;
    }

    .radio-visual--large {
      width: 24px;
      height: 24px;
    }

    /* Checked state */
    .radio-visual--checked {
      border-color: var(--color-primary);
    }

    .radio-visual--checked:hover:not(:disabled) {
      border-color: var(--color-primary-dark);
    }

    /* Disabled state */
    .radio-visual:disabled,
    :host([disabled]) .radio-visual {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--color-gray-100);
      border-color: var(--color-gray-300);
    }

    /* Validation states */
    .radio-visual--error {
      border-color: var(--color-error);
    }

    .radio-visual--error:hover:not(:disabled) {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .radio-visual--success {
      border-color: var(--color-success);
    }

    .radio-visual--success:hover:not(:disabled) {
      border-color: var(--color-success);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .radio-visual--warning {
      border-color: var(--color-warning);
    }

    .radio-visual--warning:hover:not(:disabled) {
      border-color: var(--color-warning);
      box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.1);
    }

    /* Radio dot */
    .radio-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: var(--color-primary);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .radio-dot--visible {
      opacity: 1;
    }

    /* Size variants for radio dot */
    .radio-dot--small {
      width: 6px;
      height: 6px;
    }

    .radio-dot--medium {
      width: 8px;
      height: 8px;
    }

    .radio-dot--large {
      width: 10px;
      height: 10px;
    }

    /* Label */
    .radio-label {
      font-family: var(--font-family-sans);
      font-weight: var(--font-weight-normal);
      line-height: var(--line-height-normal);
      color: var(--color-text-primary);
      cursor: pointer;
      user-select: none;
    }

    .radio-label--small {
      font-size: var(--font-size-2);
    }

    .radio-label--medium {
      font-size: var(--font-size-3);
    }

    .radio-label--large {
      font-size: var(--font-size-4);
    }

    .radio-label:disabled,
    :host([disabled]) .radio-label {
      color: var(--color-text-tertiary);
      cursor: not-allowed;
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
      .radio-visual {
        border-width: 3px;
      }

      .radio-container:focus-within {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .radio-visual,
      .radio-dot {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .radio-visual {
        background-color: var(--color-gray-800);
        border-color: var(--color-gray-600);
      }

      .radio-visual:disabled,
      :host([disabled]) .radio-visual {
        background-color: var(--color-gray-700);
        border-color: var(--color-gray-500);
      }

      .radio-label {
        color: var(--color-text-inverse);
      }

      .radio-label:disabled,
      :host([disabled]) .radio-label {
        color: var(--color-gray-400);
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const radioClasses = this._getRadioClasses();
    const labelClasses = this._getLabelClasses();
    const validationMessage = this._getValidationMessage();

    return html`
      <div class="radio-container">
        <input
          class="radio-input"
          type="radio"
          ?checked="${this.checked}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          name="${this.name || undefined}"
          value="${this.value || undefined}"
          aria-label="${this.ariaLabel || undefined}"
          aria-describedby="${this._getAriaDescribedBy()}"
          aria-invalid="${this._getAriaInvalid()}"
          @change="${this._handleChange}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
        />
        <div class="${radioClasses}">${this._renderRadioDot()}</div>
        <label class="${labelClasses}" for="${this.instanceId}-radio">
          <slot></slot>
          ${this.required
            ? html`<span class="required-indicator" aria-label="Required"
                >*</span
              >`
            : ''}
        </label>
      </div>
      ${validationMessage}
      ${this.required ? html`<span class="sr-only">Required field</span>` : ''}
    `;
  }

  /**
   * Get radio CSS classes
   */
  private _getRadioClasses(): string {
    const classes = ['radio-visual'];
    classes.push(`radio-visual--${this.size}`);

    if (this.checked) {
      classes.push('radio-visual--checked');
    }

    if (this.validationState !== 'default') {
      classes.push(`radio-visual--${this.validationState}`);
    }

    return classes.join(' ');
  }

  /**
   * Get label CSS classes
   */
  private _getLabelClasses(): string {
    const classes = ['radio-label'];
    classes.push(`radio-label--${this.size}`);
    return classes.join(' ');
  }

  /**
   * Render radio dot
   */
  private _renderRadioDot(): TemplateResult {
    const classes = ['radio-dot', `radio-dot--${this.size}`];
    if (this.checked) {
      classes.push('radio-dot--visible');
    }

    return html` <div class="${classes.join(' ')}" aria-hidden="true"></div> `;
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
   * Handle change event
   */
  private _handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this._validateRadio();
    this._updateValidationState();

    // Dispatch design system event
    this.dispatchDesignSystemEvent(
      'change',
      {
        size: this.size,
        checked: this.checked,
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
        checked: this.checked,
      },
      event
    );
  }

  /**
   * Handle blur event
   */
  private _handleBlur(event: FocusEvent): void {
    this._validateRadio();
    this._updateValidationState();

    this.dispatchDesignSystemEvent(
      'blur',
      {
        size: this.size,
        checked: this.checked,
        validationState: this.validationState,
        isValid: this._isValid,
      },
      event
    );
  }

  /**
   * Validate radio
   */
  private _validateRadio(): void {
    // Reset validation state
    this._isValid = true;
    this._validationMessage = '';

    // Check if radio is required but not checked
    if (this.required && !this.checked) {
      this._isValid = false;
      this._validationMessage = 'This field is required';
      return;
    }
  }

  /**
   * Update validation state
   */
  private _updateValidationState(): void {
    if (this._isValid && this.checked) {
      this.validationState = 'success';
    } else if (!this._isValid) {
      this.validationState = 'error';
    } else {
      this.validationState = 'default';
    }

    // Dispatch validation event
    this.dispatchDesignSystemEvent('validate', {
      size: this.size,
      checked: this.checked,
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
  }

  /**
   * Get the current input element
   */
  get inputElement(): HTMLInputElement | null {
    return this.shadowRoot?.querySelector('input') || null;
  }

  /**
   * Focus the radio
   */
  override focus(): void {
    this.inputElement?.focus();
  }

  /**
   * Blur the radio
   */
  override blur(): void {
    this.inputElement?.blur();
  }

  /**
   * Select the radio
   */
  select(): void {
    if (this.disabled) return;
    this.checked = true;
    this._validateRadio();
    this._updateValidationState();

    // Dispatch change event
    this.dispatchDesignSystemEvent('change', {
      size: this.size,
      checked: this.checked,
      validationState: this.validationState,
      isValid: this._isValid,
    });
  }

  /**
   * Deselect the radio
   */
  deselect(): void {
    if (this.disabled) return;
    this.checked = false;
    this._validateRadio();
    this._updateValidationState();

    // Dispatch change event
    this.dispatchDesignSystemEvent('change', {
      size: this.size,
      checked: this.checked,
      validationState: this.validationState,
      isValid: this._isValid,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-radio': Radio;
  }
}
