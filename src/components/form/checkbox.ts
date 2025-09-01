import { html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Checkbox component sizes
 */
export type CheckboxSize = 'small' | 'medium' | 'large';

/**
 * Checkbox component validation states
 */
export type CheckboxValidationState =
  | 'default'
  | 'error'
  | 'success'
  | 'warning';

/**
 * Checkbox component properties interface
 */
export interface CheckboxProperties {
  size?: CheckboxSize;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  validationState?: CheckboxValidationState;
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
 * Checkbox Component
 *
 * A comprehensive checkbox component with multiple sizes, states, and validation.
 * Supports indeterminate state and provides built-in validation feedback.
 *
 * @example
 * ```html
 * <ds-checkbox size="medium" checked>Accept terms</ds-checkbox>
 * <ds-checkbox size="large" indeterminate>Select all</ds-checkbox>
 * <ds-checkbox validation-state="error" error-message="This field is required"></ds-checkbox>
 * ```
 *
 * @fires ds-checkbox-change - Fired when the checkbox state changes
 * @fires ds-checkbox-focus - Fired when the checkbox receives focus
 * @fires ds-checkbox-blur - Fired when the checkbox loses focus
 * @fires ds-checkbox-validate - Fired when validation state changes
 */
@customElement('ds-checkbox')
export class Checkbox extends DesignSystemElement {
  /**
   * Checkbox size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: CheckboxSize = 'medium';

  /**
   * Whether the checkbox is checked
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the checkbox is in indeterminate state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the checkbox is required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Validation state
   * @default 'default'
   */
  @property({ type: String, attribute: 'validation-state' })
  validationState: CheckboxValidationState = 'default';

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
   * Name attribute for form submission
   */
  @property({ type: String })
  name?: string;

  /**
   * Value attribute for form submission
   */
  @property({ type: String })
  value?: string;

  /**
   * Accessible label for the checkbox
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the checkbox
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * Whether the checkbox is invalid
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
      display: inline-block;
      position: relative;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    .checkbox-container {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-3);
      cursor: pointer;
      position: relative;
    }

    .checkbox-container:focus-within {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
      border-radius: var(--border-radius-sm);
    }

    .checkbox-container:focus-within:not(:focus-visible) {
      outline: none;
    }

    .checkbox-container:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
      border-radius: var(--border-radius-sm);
    }

    .checkbox-input {
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

    .checkbox-visual {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--color-border);
      border-radius: var(--border-radius-sm);
      background-color: var(--color-background-elevated);
      transition: all 0.2s ease-in-out;
      flex-shrink: 0;
    }

    .checkbox-visual:hover:not(:disabled) {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .checkbox-visual:focus {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    /* Size variants */
    .checkbox-visual--small {
      width: 16px;
      height: 16px;
    }

    .checkbox-visual--medium {
      width: 20px;
      height: 20px;
    }

    .checkbox-visual--large {
      width: 24px;
      height: 24px;
    }

    /* Checked state */
    .checkbox-visual--checked {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-text-inverse);
    }

    .checkbox-visual--checked:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
      border-color: var(--color-primary-dark);
    }

    /* Indeterminate state */
    .checkbox-visual--indeterminate {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-text-inverse);
    }

    .checkbox-visual--indeterminate:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
      border-color: var(--color-primary-dark);
    }

    /* Disabled state */
    .checkbox-visual:disabled,
    :host([disabled]) .checkbox-visual {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--color-gray-100);
      border-color: var(--color-gray-300);
    }

    /* Validation states */
    .checkbox-visual--error {
      border-color: var(--color-error);
    }

    .checkbox-visual--error:hover:not(:disabled) {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .checkbox-visual--success {
      border-color: var(--color-success);
    }

    .checkbox-visual--success:hover:not(:disabled) {
      border-color: var(--color-success);
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .checkbox-visual--warning {
      border-color: var(--color-warning);
    }

    .checkbox-visual--warning:hover:not(:disabled) {
      border-color: var(--color-warning);
      box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.1);
    }

    /* Check mark */
    .checkmark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75em;
      font-weight: bold;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .checkmark--visible {
      opacity: 1;
    }

    /* Indeterminate mark */
    .indeterminate-mark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 2px;
      background-color: currentColor;
      border-radius: 1px;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .indeterminate-mark--visible {
      opacity: 1;
    }

    /* Label */
    .checkbox-label {
      font-family: var(--font-family-sans);
      font-weight: var(--font-weight-normal);
      line-height: var(--line-height-normal);
      color: var(--color-text-primary);
      cursor: pointer;
      user-select: none;
    }

    .checkbox-label--small {
      font-size: var(--font-size-2);
    }

    .checkbox-label--medium {
      font-size: var(--font-size-3);
    }

    .checkbox-label--large {
      font-size: var(--font-size-4);
    }

    .checkbox-label:disabled,
    :host([disabled]) .checkbox-label {
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
      .checkbox-visual {
        border-width: 3px;
      }

      .checkbox-container:focus-within {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .checkbox-visual,
      .checkmark,
      .indeterminate-mark {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .checkbox-visual {
        background-color: var(--color-gray-800);
        border-color: var(--color-gray-600);
      }

      .checkbox-visual:disabled,
      :host([disabled]) .checkbox-visual {
        background-color: var(--color-gray-700);
        border-color: var(--color-gray-500);
      }

      .checkbox-label {
        color: var(--color-text-inverse);
      }

      .checkbox-label:disabled,
      :host([disabled]) .checkbox-label {
        color: var(--color-gray-400);
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const checkboxClasses = this._getCheckboxClasses();
    const labelClasses = this._getLabelClasses();
    const validationMessage = this._getValidationMessage();

    return html`
      <div class="checkbox-container">
        <input
          class="checkbox-input"
          type="checkbox"
          ?checked="${this.checked}"
          ?indeterminate="${this.indeterminate}"
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
        <div class="${checkboxClasses}">
          ${this._renderCheckmark()} ${this._renderIndeterminateMark()}
        </div>
        <label class="${labelClasses}" for="${this.instanceId}-checkbox">
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
   * Get checkbox CSS classes
   */
  private _getCheckboxClasses(): string {
    const classes = ['checkbox-visual'];
    classes.push(`checkbox-visual--${this.size}`);

    if (this.checked) {
      classes.push('checkbox-visual--checked');
    }

    if (this.indeterminate) {
      classes.push('checkbox-visual--indeterminate');
    }

    if (this.validationState !== 'default') {
      classes.push(`checkbox-visual--${this.validationState}`);
    }

    return classes.join(' ');
  }

  /**
   * Get label CSS classes
   */
  private _getLabelClasses(): string {
    const classes = ['checkbox-label'];
    classes.push(`checkbox-label--${this.size}`);
    return classes.join(' ');
  }

  /**
   * Render checkmark
   */
  private _renderCheckmark(): TemplateResult {
    const classes = ['checkmark'];
    if (this.checked && !this.indeterminate) {
      classes.push('checkmark--visible');
    }

    return html` <div class="${classes.join(' ')}" aria-hidden="true">✓</div> `;
  }

  /**
   * Render indeterminate mark
   */
  private _renderIndeterminateMark(): TemplateResult {
    const classes = ['indeterminate-mark'];
    if (this.indeterminate) {
      classes.push('indeterminate-mark--visible');
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
    this.indeterminate = target.indeterminate;
    this._validateCheckbox();
    this._updateValidationState();

    // Dispatch design system event
    this.dispatchDesignSystemEvent(
      'change',
      {
        size: this.size,
        checked: this.checked,
        indeterminate: this.indeterminate,
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
        indeterminate: this.indeterminate,
      },
      event
    );
  }

  /**
   * Handle blur event
   */
  private _handleBlur(event: FocusEvent): void {
    this._validateCheckbox();
    this._updateValidationState();

    this.dispatchDesignSystemEvent(
      'blur',
      {
        size: this.size,
        checked: this.checked,
        indeterminate: this.indeterminate,
        validationState: this.validationState,
        isValid: this._isValid,
      },
      event
    );
  }

  /**
   * Validate checkbox
   */
  private _validateCheckbox(): void {
    // Reset validation state
    this._isValid = true;
    this._validationMessage = '';

    // Check if checkbox is required but not checked
    if (this.required && !this.checked && !this.indeterminate) {
      this._isValid = false;
      this._validationMessage = 'This field is required';
      return;
    }
  }

  /**
   * Update validation state
   */
  private _updateValidationState(): void {
    if (this._isValid && (this.checked || this.indeterminate)) {
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
      indeterminate: this.indeterminate,
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
   * Focus the checkbox
   */
  override focus(): void {
    this.inputElement?.focus();
  }

  /**
   * Blur the checkbox
   */
  override blur(): void {
    this.inputElement?.blur();
  }

  /**
   * Toggle the checkbox state
   */
  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.indeterminate = false;
    this._validateCheckbox();
    this._updateValidationState();

    // Dispatch change event
    this.dispatchDesignSystemEvent('change', {
      size: this.size,
      checked: this.checked,
      indeterminate: this.indeterminate,
      validationState: this.validationState,
      isValid: this._isValid,
    });
  }

  /**
   * Set the checkbox to checked state
   */
  check(): void {
    if (this.disabled) return;
    this.checked = true;
    this.indeterminate = false;
    this._validateCheckbox();
    this._updateValidationState();

    // Dispatch change event
    this.dispatchDesignSystemEvent('change', {
      size: this.size,
      checked: this.checked,
      indeterminate: this.indeterminate,
      validationState: this.validationState,
      isValid: this._isValid,
    });
  }

  /**
   * Set the checkbox to unchecked state
   */
  uncheck(): void {
    if (this.disabled) return;
    this.checked = false;
    this.indeterminate = false;
    this._validateCheckbox();
    this._updateValidationState();

    // Dispatch change event
    this.dispatchDesignSystemEvent('change', {
      size: this.size,
      checked: this.checked,
      indeterminate: this.indeterminate,
      validationState: this.validationState,
      isValid: this._isValid,
    });
  }

  /**
   * Set the checkbox to indeterminate state
   */
  setIndeterminate(): void {
    if (this.disabled) return;
    this.indeterminate = true;
    this.checked = false;
    this._validateCheckbox();
    this._updateValidationState();

    // Dispatch change event
    this.dispatchDesignSystemEvent('change', {
      size: this.size,
      checked: this.checked,
      indeterminate: this.indeterminate,
      validationState: this.validationState,
      isValid: this._isValid,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-checkbox': Checkbox;
  }
}
