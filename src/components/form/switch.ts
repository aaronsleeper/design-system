import { html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Switch component sizes
 */
export type SwitchSize = 'small' | 'medium' | 'large';

/**
 * Switch component validation states
 */
export type SwitchValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * Switch component properties interface
 */
export interface SwitchProperties {
  size?: SwitchSize;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  validationState?: SwitchValidationState;
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
 * Switch Component
 *
 * A comprehensive switch component with multiple sizes, states, and validation.
 * Provides toggle functionality with built-in validation feedback.
 *
 * @example
 * ```html
 * <ds-switch size="medium" checked>Enable notifications</ds-switch>
 * <ds-switch size="large" validation-state="error" error-message="This field is required"></ds-switch>
 * ```
 *
 * @fires ds-switch-change - Fired when the switch state changes
 * @fires ds-switch-focus - Fired when the switch receives focus
 * @fires ds-switch-blur - Fired when the switch loses focus
 * @fires ds-switch-validate - Fired when validation state changes
 */
@customElement('ds-switch')
export class Switch extends DesignSystemElement {
  /**
   * Switch size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: SwitchSize = 'medium';

  /**
   * Whether the switch is checked
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the switch is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the switch is required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Validation state
   * @default 'default'
   */
  @property({ type: String, attribute: 'validation-state' })
  validationState: SwitchValidationState = 'default';

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
   * Accessible label for the switch
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the switch
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * Whether the switch is invalid
   */
  @property({ type: String, attribute: 'aria-invalid' })
  override ariaInvalid?: string | null;

  /**
   * Whether the switch is expanded (for accessibility)
   */
  @property({ type: String, attribute: 'aria-expanded' })
  override ariaExpanded?: string | null;

  /**
   * Whether the switch is pressed (for accessibility)
   */
  @property({ type: String, attribute: 'aria-pressed' })
  override ariaPressed?: string | null;

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

    .switch-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      cursor: pointer;
      position: relative;
    }

    .switch-container:focus-within {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
      border-radius: var(--border-radius-sm);
    }

    .switch-container:focus-within:not(:focus-visible) {
      outline: none;
    }

    .switch-container:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
      border-radius: var(--border-radius-sm);
    }

    .switch-input {
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

    .switch-track {
      position: relative;
      display: flex;
      align-items: center;
      border-radius: 9999px;
      background-color: var(--color-gray-300);
      transition: all 0.2s ease-in-out;
      flex-shrink: 0;
    }

    .switch-track:hover:not(:disabled) {
      background-color: var(--color-gray-400);
    }

    .switch-track:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    /* Size variants */
    .switch-track--small {
      width: 32px;
      height: 18px;
    }

    .switch-track--medium {
      width: 40px;
      height: 22px;
    }

    .switch-track--large {
      width: 48px;
      height: 26px;
    }

    /* Checked state */
    .switch-track--checked {
      background-color: var(--color-primary);
    }

    .switch-track--checked:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }

    /* Disabled state */
    .switch-track:disabled,
    :host([disabled]) .switch-track {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--color-gray-200);
    }

    :host([disabled]) .switch-track--checked {
      background-color: var(--color-gray-400);
    }

    /* Validation states */
    .switch-track--error {
      background-color: var(--color-error);
    }

    .switch-track--error:hover:not(:disabled) {
      background-color: var(--color-error-dark);
    }

    .switch-track--success {
      background-color: var(--color-success);
    }

    .switch-track--success:hover:not(:disabled) {
      background-color: var(--color-success-dark);
    }

    .switch-track--warning {
      background-color: var(--color-warning);
    }

    .switch-track--warning:hover:not(:disabled) {
      background-color: var(--color-warning-dark);
    }

    /* Switch thumb */
    .switch-thumb {
      position: absolute;
      top: 50%;
      left: 2px;
      transform: translateY(-50%);
      border-radius: 50%;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease-in-out;
    }

    /* Size variants for thumb */
    .switch-thumb--small {
      width: 14px;
      height: 14px;
    }

    .switch-thumb--medium {
      width: 18px;
      height: 18px;
    }

    .switch-thumb--large {
      width: 22px;
      height: 22px;
    }

    /* Checked state for thumb */
    .switch-thumb--checked {
      transform: translateY(-50%);
    }

    .switch-thumb--checked--small {
      left: calc(100% - 16px);
    }

    .switch-thumb--checked--medium {
      left: calc(100% - 20px);
    }

    .switch-thumb--checked--large {
      left: calc(100% - 24px);
    }

    /* Label */
    .switch-label {
      font-family: var(--font-family-sans);
      font-weight: var(--font-weight-normal);
      line-height: var(--line-height-normal);
      color: var(--color-text-primary);
      cursor: pointer;
      user-select: none;
    }

    .switch-label--small {
      font-size: var(--font-size-2);
    }

    .switch-label--medium {
      font-size: var(--font-size-3);
    }

    .switch-label--large {
      font-size: var(--font-size-4);
    }

    .switch-label:disabled,
    :host([disabled]) .switch-label {
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
      .switch-track {
        border: 2px solid var(--color-gray-600);
      }

      .switch-track--checked {
        border-color: var(--color-primary-dark);
      }

      .switch-container:focus-within {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .switch-track,
      .switch-thumb {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .switch-track {
        background-color: var(--color-gray-600);
      }

      .switch-track:hover:not(:disabled) {
        background-color: var(--color-gray-500);
      }

      .switch-track:disabled,
      :host([disabled]) .switch-track {
        background-color: var(--color-gray-700);
      }

      :host([disabled]) .switch-track--checked {
        background-color: var(--color-gray-500);
      }

      .switch-label {
        color: var(--color-text-inverse);
      }

      .switch-label:disabled,
      :host([disabled]) .switch-label {
        color: var(--color-gray-400);
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const trackClasses = this._getTrackClasses();
    const thumbClasses = this._getThumbClasses();
    const labelClasses = this._getLabelClasses();
    const validationMessage = this._getValidationMessage();

    return html`
      <div class="switch-container">
        <input
          class="switch-input"
          type="checkbox"
          role="switch"
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
        <div class="${trackClasses}">
          <div class="${thumbClasses}"></div>
        </div>
        <label class="${labelClasses}" for="${this.instanceId}-switch">
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
   * Get switch track CSS classes
   */
  private _getTrackClasses(): string {
    const classes = ['switch-track'];
    classes.push(`switch-track--${this.size}`);

    if (this.checked) {
      classes.push('switch-track--checked');
    }

    if (this.validationState !== 'default') {
      classes.push(`switch-track--${this.validationState}`);
    }

    return classes.join(' ');
  }

  /**
   * Get switch thumb CSS classes
   */
  private _getThumbClasses(): string {
    const classes = ['switch-thumb'];
    classes.push(`switch-thumb--${this.size}`);

    if (this.checked) {
      classes.push('switch-thumb--checked');
      classes.push(`switch-thumb--checked--${this.size}`);
    }

    return classes.join(' ');
  }

  /**
   * Get label CSS classes
   */
  private _getLabelClasses(): string {
    const classes = ['switch-label'];
    classes.push(`switch-label--${this.size}`);
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
    this._validateSwitch();
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
    this._validateSwitch();
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
   * Validate switch
   */
  private _validateSwitch(): void {
    // Reset validation state
    this._isValid = true;
    this._validationMessage = '';

    // Check if switch is required but not checked
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
   * Focus the switch
   */
  override focus(): void {
    this.inputElement?.focus();
  }

  /**
   * Blur the switch
   */
  override blur(): void {
    this.inputElement?.blur();
  }

  /**
   * Toggle the switch state
   */
  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this._validateSwitch();
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
   * Set the switch to checked state
   */
  check(): void {
    if (this.disabled) return;
    this.checked = true;
    this._validateSwitch();
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
   * Set the switch to unchecked state
   */
  uncheck(): void {
    if (this.disabled) return;
    this.checked = false;
    this._validateSwitch();
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
    'ds-switch': Switch;
  }
}
