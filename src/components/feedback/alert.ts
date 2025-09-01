import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Alert component variants
 */
export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

/**
 * Alert component sizes
 */
export type AlertSize = 'small' | 'medium' | 'large';

/**
 * Alert component states
 */
export type AlertState = 'default' | 'focus' | 'disabled';

/**
 * Alert component properties interface
 */
export interface AlertProperties {
  variant?: AlertVariant;
  size?: AlertSize;
  state?: AlertState;
  dismissible?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
}

/**
 * Alert Component
 *
 * A feedback component for displaying important messages to users.
 * Supports multiple variants, sizes, states, and dismissible functionality with full accessibility compliance.
 *
 * @example
 * ```html
 * <ds-alert variant="success" size="medium" dismissible>Success message</ds-alert>
 * <ds-alert variant="error" size="large">Error message</ds-alert>
 * <ds-alert variant="warning" size="small" dismissible>Warning message</ds-alert>
 * ```
 *
 * @fires ds-alert-render - Fired when the alert is rendered
 * @fires ds-alert-dismiss - Fired when the alert is dismissed
 * @fires ds-alert-focus - Fired when the alert receives focus
 * @fires ds-alert-blur - Fired when the alert loses focus
 */
@customElement('ds-alert')
export class Alert extends DesignSystemElement {
  /**
   * Alert variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: AlertVariant = 'default';

  /**
   * Alert size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: AlertSize = 'medium';

  /**
   * Alert state
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  state: AlertState = 'default';

  /**
   * Whether the alert can be dismissed
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  dismissible: boolean = false;

  /**
   * Accessible label for the alert
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the alert
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * ARIA role for the alert
   * @default 'alert'
   */
  @property({ type: String, reflect: true })
  role: string = 'alert';

  /**
   * Whether the alert is currently visible
   * @private
   */
  private _isVisible: boolean = true;

  /**
   * Component styles
   */
  static override styles = css`
    :host {
      display: block;
      position: relative;
    }

    :host([hidden]) {
      display: none;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    .alert {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-3);
      padding: var(--spacing-4);
      border-radius: var(--border-radius-md);
      font-family: var(--font-family-sans);
      font-weight: var(--font-weight-normal);
      line-height: var(--line-height-relaxed);
      border: 1px solid transparent;
      transition: all 0.2s ease-in-out;
      box-sizing: border-box;
      position: relative;
    }

    .alert:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .alert:focus:not(:focus-visible) {
      outline: none;
    }

    .alert:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .alert__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .alert__icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
    }

    .alert__dismiss {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      background: none;
      border: none;
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      color: inherit;
    }

    .alert__dismiss:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .alert__dismiss:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .alert__dismiss:focus:not(:focus-visible) {
      outline: none;
    }

    .alert__dismiss:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Size variants */
    .alert--small {
      padding: var(--spacing-3);
      font-size: var(--font-size-2);
    }

    .alert--small .alert__icon {
      width: 1rem;
      height: 1rem;
    }

    .alert--small .alert__dismiss {
      width: 1.25rem;
      height: 1.25rem;
    }

    .alert--medium {
      padding: var(--spacing-4);
      font-size: var(--font-size-3);
    }

    .alert--large {
      padding: var(--spacing-5);
      font-size: var(--font-size-4);
    }

    .alert--large .alert__icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    .alert--large .alert__dismiss {
      width: 1.75rem;
      height: 1.75rem;
    }

    /* Variant styles - Default */
    .alert--default {
      background-color: var(--color-gray-50);
      color: var(--color-gray-800);
      border-color: var(--color-gray-200);
    }

    .alert--default .alert__icon {
      color: var(--color-gray-600);
    }

    /* Variant styles - Success */
    .alert--success {
      background-color: var(--color-success-light);
      color: var(--color-success-dark);
      border-color: var(--color-success);
    }

    .alert--success .alert__icon {
      color: var(--color-success);
    }

    /* Variant styles - Warning */
    .alert--warning {
      background-color: var(--color-warning-light);
      color: var(--color-warning-dark);
      border-color: var(--color-warning);
    }

    .alert--warning .alert__icon {
      color: var(--color-warning);
    }

    /* Variant styles - Error */
    .alert--error {
      background-color: var(--color-error-light);
      color: var(--color-error-dark);
      border-color: var(--color-error);
    }

    .alert--error .alert__icon {
      color: var(--color-error);
    }

    /* Variant styles - Info */
    .alert--info {
      background-color: var(--color-info-light);
      color: var(--color-info-dark);
      border-color: var(--color-info);
    }

    .alert--info .alert__icon {
      color: var(--color-info);
    }

    /* State variants */
    .alert--focus:not(:disabled) {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Disabled state */
    .alert:disabled,
    :host([disabled]) .alert {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .alert {
        border-width: 2px;
      }

      .alert:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .alert {
        transition: none;
      }

      .alert__dismiss {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .alert--default {
        background-color: var(--color-gray-800);
        color: var(--color-gray-100);
        border-color: var(--color-gray-600);
      }

      .alert--default .alert__icon {
        color: var(--color-gray-400);
      }

      .alert--success {
        background-color: var(--color-success-dark);
        color: var(--color-success-light);
      }

      .alert--warning {
        background-color: var(--color-warning-dark);
        color: var(--color-warning-light);
      }

      .alert--error {
        background-color: var(--color-error-dark);
        color: var(--color-error-light);
      }

      .alert--info {
        background-color: var(--color-info-dark);
        color: var(--color-info-light);
      }

      .alert__dismiss:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    /* Print styles */
    @media print {
      .alert {
        background: white !important;
        color: black !important;
        border: 1px solid black !important;
      }

      .alert__dismiss {
        display: none;
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    if (!this._isVisible) {
      return html``;
    }

    const alertClasses = this._getAlertClasses();
    const attributes = this._getAttributes();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      state: this.state,
      dismissible: this.dismissible,
    });

    return html`
      <div
        class="${alertClasses}"
        ${attributes}
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        tabindex="0"
      >
        ${this._renderIcon()}
        <div class="alert__content">
          <slot></slot>
        </div>
        ${this.dismissible ? this._renderDismissButton() : ''}
      </div>
    `;
  }

  /**
   * Get alert CSS classes
   */
  private _getAlertClasses(): string {
    const classes = ['alert'];
    classes.push(`alert--${this.variant}`);
    classes.push(`alert--${this.size}`);

    if (this.state !== 'default') {
      classes.push(`alert--${this.state}`);
    }

    return classes.join(' ');
  }

  /**
   * Get HTML attributes
   */
  private _getAttributes(): TemplateResult {
    const attributes = [];

    if (this.ariaLabel) {
      attributes.push(html`aria-label="${this.ariaLabel}"`);
    }

    if (this.ariaDescribedBy) {
      attributes.push(html`aria-describedby="${this.ariaDescribedBy}"`);
    }

    if (this.role) {
      attributes.push(html`role="${this.role}"`);
    }

    return html`${attributes}`;
  }

  /**
   * Render alert icon
   */
  private _renderIcon(): TemplateResult {
    const iconMap = {
      default: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      info: 'ℹ️',
    };

    return html`
      <div class="alert__icon" aria-hidden="true">${iconMap[this.variant]}</div>
    `;
  }

  /**
   * Render dismiss button
   */
  private _renderDismissButton(): TemplateResult {
    return html`
      <button
        class="alert__dismiss"
        type="button"
        aria-label="Dismiss alert"
        @click="${this._handleDismiss}"
        @keydown="${this._handleDismissKeydown}"
      >
        ×
      </button>
    `;
  }

  /**
   * Handle focus event
   */
  private _handleFocus(event: FocusEvent): void {
    this.state = 'focus';

    this.dispatchDesignSystemEvent(
      'focus',
      {
        variant: this.variant,
        size: this.size,
        state: this.state,
        dismissible: this.dismissible,
      },
      event
    );
  }

  /**
   * Handle blur event
   */
  private _handleBlur(event: FocusEvent): void {
    this.state = 'default';

    this.dispatchDesignSystemEvent(
      'blur',
      {
        variant: this.variant,
        size: this.size,
        state: this.state,
        dismissible: this.dismissible,
      },
      event
    );
  }

  /**
   * Handle dismiss button click
   */
  private _handleDismiss(event: Event): void {
    event.stopPropagation();
    this.dismiss();
  }

  /**
   * Handle dismiss button keydown
   */
  private _handleDismissKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.dismiss();
    }
  }

  /**
   * Dismiss the alert
   */
  public dismiss(): void {
    if (!this.dismissible) {
      return;
    }

    this._isVisible = false;
    this.hidden = true;

    // Announce dismissal to screen readers
    this.announceToScreenReader('Alert dismissed', 'polite');

    this.dispatchDesignSystemEvent('dismiss', {
      variant: this.variant,
      size: this.size,
      state: this.state,
      dismissible: this.dismissible,
    });

    // Force re-render
    this.requestUpdate();
  }

  /**
   * Show the alert
   */
  public show(): void {
    this._isVisible = true;
    this.hidden = false;

    // Announce show to screen readers
    this.announceToScreenReader('Alert shown', 'polite');

    // Force re-render
    this.requestUpdate();
  }

  /**
   * Validate component properties
   */
  override connectedCallback(): void {
    super.connectedCallback();

    // Validate variant
    this.variant = this.validateEnum(
      this.variant,
      ['default', 'success', 'warning', 'error', 'info'],
      'default'
    );

    // Validate size
    this.size = this.validateEnum(
      this.size,
      ['small', 'medium', 'large'],
      'medium'
    );

    // Validate state
    this.state = this.validateEnum(
      this.state,
      ['default', 'focus', 'disabled'],
      'default'
    );

    // Validate role
    this.role = this.validateEnum(
      this.role,
      ['alert', 'alertdialog', 'status'],
      'alert'
    );
  }

  /**
   * Public method to focus the alert
   */
  public override focus(): void {
    const alertElement = this.shadowRoot?.querySelector(
      '.alert'
    ) as HTMLElement;
    if (alertElement) {
      alertElement.focus();
    }
  }

  /**
   * Public method to blur the alert
   */
  public override blur(): void {
    const alertElement = this.shadowRoot?.querySelector(
      '.alert'
    ) as HTMLElement;
    if (alertElement) {
      alertElement.blur();
    }
  }

  /**
   * Public method to get the alert text content
   */
  public getTextContent(): string {
    return this.textContent?.trim() || '';
  }

  /**
   * Public method to get the alert dimensions
   */
  public getDimensions(): { width: number; height: number } {
    const alertElement = this.shadowRoot?.querySelector(
      '.alert'
    ) as HTMLElement;
    if (alertElement) {
      const rect = alertElement.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
      };
    }
    return { width: 0, height: 0 };
  }

  /**
   * Public method to check if alert is visible
   */
  public isVisible(): boolean {
    return this._isVisible;
  }

  /**
   * Public method to check if alert is dismissible
   */
  public isDismissible(): boolean {
    return this.dismissible;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-alert': Alert;
  }
}
