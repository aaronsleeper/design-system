import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Toast component variants
 */
export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

/**
 * Toast component sizes
 */
export type ToastSize = 'small' | 'medium' | 'large';

/**
 * Toast component states
 */
export type ToastState = 'default' | 'focus' | 'disabled';

/**
 * Toast component positions
 */
export type ToastPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Toast component properties interface
 */
export interface ToastProperties {
  variant?: ToastVariant;
  size?: ToastSize;
  state?: ToastState;
  position?: ToastPosition;
  dismissible?: boolean;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
}

/**
 * Toast Component
 *
 * A feedback component for displaying temporary messages to users.
 * Supports multiple variants, sizes, states, positioning, and auto-dismiss functionality with full accessibility compliance.
 *
 * @example
 * ```html
 * <ds-toast variant="success" size="medium" position="top" auto-dismiss>Success message</ds-toast>
 * <ds-toast variant="error" size="large" position="bottom" dismissible>Error message</ds-toast>
 * <ds-toast variant="warning" size="small" position="right" auto-dismiss auto-dismiss-delay="5000">Warning message</ds-toast>
 * ```
 *
 * @fires ds-toast-render - Fired when the toast is rendered
 * @fires ds-toast-dismiss - Fired when the toast is dismissed
 * @fires ds-toast-focus - Fired when the toast receives focus
 * @fires ds-toast-blur - Fired when the toast loses focus
 */
@customElement('ds-toast')
export class Toast extends DesignSystemElement {
  /**
   * Toast variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: ToastVariant = 'default';

  /**
   * Toast size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: ToastSize = 'medium';

  /**
   * Toast state
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  state: ToastState = 'default';

  /**
   * Toast position
   * @default 'top'
   */
  @property({ type: String, reflect: true })
  position: ToastPosition = 'top';

  /**
   * Whether the toast can be dismissed
   * @default true
   */
  @property({ type: Boolean, reflect: true })
  dismissible: boolean = true;

  /**
   * Whether the toast should auto-dismiss
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-dismiss' })
  autoDismiss: boolean = false;

  /**
   * Auto-dismiss delay in milliseconds
   * @default 5000
   */
  @property({ type: Number, reflect: true, attribute: 'auto-dismiss-delay' })
  autoDismissDelay: number = 5000;

  /**
   * Accessible label for the toast
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the toast
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * ARIA role for the toast
   * @default 'alert'
   */
  @property({ type: String, reflect: true })
  override role: string = 'alert';

  /**
   * Whether the toast is currently visible
   * @private
   */
  private _isVisible: boolean = true;

  /**
   * Auto-dismiss timer
   * @private
   */
  private _autoDismissTimer?: number;

  /**
   * Component styles
   */
  static override styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 1000;
      max-width: 400px;
      min-width: 300px;
    }

    :host([hidden]) {
      display: none;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    /* Position variants */
    :host([position='top']) {
      top: var(--spacing-4);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position='bottom']) {
      bottom: var(--spacing-4);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position='left']) {
      top: 50%;
      left: var(--spacing-4);
      transform: translateY(-50%);
    }

    :host([position='right']) {
      top: 50%;
      right: var(--spacing-4);
      transform: translateY(-50%);
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-3);
      padding: var(--spacing-4);
      border-radius: var(--border-radius-md);
      font-family: var(--font-family-sans);
      font-weight: var(--font-weight-normal);
      line-height: var(--line-height-relaxed);
      border: 1px solid transparent;
      transition: all 0.3s ease-in-out;
      box-sizing: border-box;
      position: relative;
      box-shadow: var(--shadow-lg);
      backdrop-filter: blur(8px);
    }

    .toast:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .toast:focus:not(:focus-visible) {
      outline: none;
    }

    .toast:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .toast__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .toast__icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
    }

    .toast__dismiss {
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

    .toast__dismiss:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .toast__dismiss:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .toast__dismiss:focus:not(:focus-visible) {
      outline: none;
    }

    .toast__dismiss:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Size variants */
    .toast--small {
      padding: var(--spacing-3);
      font-size: var(--font-size-2);
      max-width: 300px;
      min-width: 250px;
    }

    .toast--small .toast__icon {
      width: 1rem;
      height: 1rem;
    }

    .toast--small .toast__dismiss {
      width: 1.25rem;
      height: 1.25rem;
    }

    .toast--medium {
      padding: var(--spacing-4);
      font-size: var(--font-size-3);
      max-width: 400px;
      min-width: 300px;
    }

    .toast--large {
      padding: var(--spacing-5);
      font-size: var(--font-size-4);
      max-width: 500px;
      min-width: 400px;
    }

    .toast--large .toast__icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    .toast--large .toast__dismiss {
      width: 1.75rem;
      height: 1.75rem;
    }

    /* Variant styles - Default */
    .toast--default {
      background-color: rgba(255, 255, 255, 0.95);
      color: var(--color-gray-800);
      border-color: var(--color-gray-200);
    }

    .toast--default .toast__icon {
      color: var(--color-gray-600);
    }

    /* Variant styles - Success */
    .toast--success {
      background-color: rgba(34, 197, 94, 0.95);
      color: white;
      border-color: var(--color-success);
    }

    .toast--success .toast__icon {
      color: white;
    }

    /* Variant styles - Warning */
    .toast--warning {
      background-color: rgba(245, 158, 11, 0.95);
      color: white;
      border-color: var(--color-warning);
    }

    .toast--warning .toast__icon {
      color: white;
    }

    /* Variant styles - Error */
    .toast--error {
      background-color: rgba(239, 68, 68, 0.95);
      color: white;
      border-color: var(--color-error);
    }

    .toast--error .toast__icon {
      color: white;
    }

    /* Variant styles - Info */
    .toast--info {
      background-color: rgba(59, 130, 246, 0.95);
      color: white;
      border-color: var(--color-info);
    }

    .toast--info .toast__icon {
      color: white;
    }

    /* State variants */
    .toast--focus:not(:disabled) {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Disabled state */
    .toast:disabled,
    :host([disabled]) .toast {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .toast {
        border-width: 2px;
      }

      .toast:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .toast {
        transition: none;
      }

      .toast__dismiss {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .toast--default {
        background-color: rgba(31, 41, 55, 0.95);
        color: var(--color-gray-100);
        border-color: var(--color-gray-600);
      }

      .toast--default .toast__icon {
        color: var(--color-gray-400);
      }

      .toast__dismiss:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    /* Print styles */
    @media print {
      .toast {
        background: white !important;
        color: black !important;
        border: 1px solid black !important;
        box-shadow: none !important;
        position: static !important;
        transform: none !important;
      }

      .toast__dismiss {
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

    const toastClasses = this._getToastClasses();
    const attributes = this._getAttributes();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      state: this.state,
      position: this.position,
      dismissible: this.dismissible,
      autoDismiss: this.autoDismiss,
      autoDismissDelay: this.autoDismissDelay,
    });

    return html`
      <div
        class="${toastClasses}"
        ${attributes}
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        tabindex="0"
      >
        ${this._renderIcon()}
        <div class="toast__content">
          <slot></slot>
        </div>
        ${this.dismissible ? this._renderDismissButton() : ''}
      </div>
    `;
  }

  /**
   * Get toast CSS classes
   */
  private _getToastClasses(): string {
    const classes = ['toast'];
    classes.push(`toast--${this.variant}`);
    classes.push(`toast--${this.size}`);

    if (this.state !== 'default') {
      classes.push(`toast--${this.state}`);
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
   * Render toast icon
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
      <div class="toast__icon" aria-hidden="true">${iconMap[this.variant]}</div>
    `;
  }

  /**
   * Render dismiss button
   */
  private _renderDismissButton(): TemplateResult {
    return html`
      <button
        class="toast__dismiss"
        type="button"
        aria-label="Dismiss toast"
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
        position: this.position,
        dismissible: this.dismissible,
        autoDismiss: this.autoDismiss,
        autoDismissDelay: this.autoDismissDelay,
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
        position: this.position,
        dismissible: this.dismissible,
        autoDismiss: this.autoDismiss,
        autoDismissDelay: this.autoDismissDelay,
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
   * Start auto-dismiss timer
   */
  private _startAutoDismissTimer(): void {
    if (!this.autoDismiss || this.autoDismissDelay <= 0) {
      return;
    }

    this._clearAutoDismissTimer();
    this._autoDismissTimer = window.setTimeout(() => {
      this.dismiss();
    }, this.autoDismissDelay);
  }

  /**
   * Clear auto-dismiss timer
   */
  private _clearAutoDismissTimer(): void {
    if (this._autoDismissTimer) {
      clearTimeout(this._autoDismissTimer);
      this._autoDismissTimer = undefined as any;
    }
  }

  /**
   * Dismiss the toast
   */
  public dismiss(): void {
    if (!this.dismissible) {
      return;
    }

    this._clearAutoDismissTimer();
    this._isVisible = false;
    this.hidden = true;

    // Announce dismissal to screen readers
    this.announceToScreenReader('Toast dismissed', 'polite');

    this.dispatchDesignSystemEvent('dismiss', {
      variant: this.variant,
      size: this.size,
      state: this.state,
      position: this.position,
      dismissible: this.dismissible,
      autoDismiss: this.autoDismiss,
      autoDismissDelay: this.autoDismissDelay,
    });

    // Force re-render
    this.requestUpdate();
  }

  /**
   * Show the toast
   */
  public show(): void {
    this._isVisible = true;
    this.hidden = false;

    // Announce show to screen readers
    this.announceToScreenReader('Toast shown', 'polite');

    // Start auto-dismiss timer if enabled
    this._startAutoDismissTimer();

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

    // Validate position
    this.position = this.validateEnum(
      this.position,
      ['top', 'bottom', 'left', 'right'],
      'top'
    );

    // Validate role
    this.role = this.validateEnum(
      this.role,
      ['alert', 'alertdialog', 'status'],
      'alert'
    );

    // Validate auto-dismiss delay
    this.autoDismissDelay = this.validateRange(
      this.autoDismissDelay,
      1000,
      30000,
      5000
    );

    // Start auto-dismiss timer if enabled
    if (this.autoDismiss) {
      this._startAutoDismissTimer();
    }
  }

  /**
   * Cleanup when component is disconnected
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearAutoDismissTimer();
  }

  /**
   * Public method to focus the toast
   */
  public override focus(): void {
    const toastElement = this.shadowRoot?.querySelector(
      '.toast'
    ) as HTMLElement;
    if (toastElement) {
      toastElement.focus();
    }
  }

  /**
   * Public method to blur the toast
   */
  public override blur(): void {
    const toastElement = this.shadowRoot?.querySelector(
      '.toast'
    ) as HTMLElement;
    if (toastElement) {
      toastElement.blur();
    }
  }

  /**
   * Public method to get the toast text content
   */
  public getTextContent(): string {
    return this.textContent?.trim() || '';
  }

  /**
   * Public method to get the toast dimensions
   */
  public getDimensions(): { width: number; height: number } {
    const toastElement = this.shadowRoot?.querySelector(
      '.toast'
    ) as HTMLElement;
    if (toastElement) {
      const rect = toastElement.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
      };
    }
    return { width: 0, height: 0 };
  }

  /**
   * Public method to check if toast is visible
   */
  public override isVisible(): boolean {
    return this._isVisible;
  }

  /**
   * Public method to check if toast is dismissible
   */
  public isDismissible(): boolean {
    return this.dismissible;
  }

  /**
   * Public method to check if toast has auto-dismiss enabled
   */
  public hasAutoDismiss(): boolean {
    return this.autoDismiss;
  }

  /**
   * Public method to get the toast position
   */
  public getPosition(): ToastPosition {
    return this.position;
  }

  /**
   * Public method to get the auto-dismiss delay
   */
  public getAutoDismissDelay(): number {
    return this.autoDismissDelay;
  }

  /**
   * Public method to set auto-dismiss delay
   */
  public setAutoDismissDelay(delay: number): void {
    this.autoDismissDelay = this.validateRange(delay, 1000, 30000, 5000);
    if (this.autoDismiss) {
      this._startAutoDismissTimer();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-toast': Toast;
  }
}
