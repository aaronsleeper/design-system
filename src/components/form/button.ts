import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Button component variants
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link';

/**
 * Button component sizes
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Button component properties interface
 */
export interface ButtonProperties {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: string;
  ariaPressed?: string;
}

/**
 * Button Component
 *
 * A comprehensive button component with multiple variants, sizes, and states.
 * Supports both button and anchor tag rendering based on the href property.
 *
 * @example
 * ```html
 * <ds-button variant="primary" size="medium">Click me</ds-button>
 * <ds-button variant="outline" size="large" disabled>Disabled</ds-button>
 * <ds-button variant="ghost" href="/link" target="_blank">External Link</ds-button>
 * ```
 *
 * @fires ds-button-click - Fired when the button is clicked
 * @fires ds-button-focus - Fired when the button receives focus
 * @fires ds-button-blur - Fired when the button loses focus
 */
@customElement('ds-button')
export class Button extends DesignSystemElement {
  /**
   * Button variant style
   * @default 'primary'
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'primary';

  /**
   * Button size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: ButtonSize = 'medium';

  /**
   * Whether the button is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the button is in loading state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Button type (for form submission)
   * @default 'button'
   */
  @property({ type: String, reflect: true })
  type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * URL for link buttons (renders as anchor tag)
   */
  @property({ type: String, reflect: true })
  href?: string;

  /**
   * Target for link buttons
   * @default '_self'
   */
  @property({ type: String, reflect: true })
  target: '_blank' | '_self' | '_parent' | '_top' = '_self';

  /**
   * Accessible label for the button
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string;

  /**
   * ID of element that describes the button
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * Whether the button controls an expanded element
   */
  @property({ type: String, attribute: 'aria-expanded' })
  override ariaExpanded?: string;

  /**
   * Whether the button is pressed (for toggle buttons)
   */
  @property({ type: String, attribute: 'aria-pressed' })
  override ariaPressed?: string;

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

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
      border: 1px solid transparent;
      border-radius: var(--border-radius-md);
      font-family: var(--font-family-sans);
      font-weight: var(--font-weight-medium);
      line-height: var(--line-height-tight);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .button:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .button:focus:not(:focus-visible) {
      outline: none;
    }

    .button:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Size variants */
    .button--small {
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--font-size-2);
      min-height: 32px;
    }

    .button--medium {
      padding: var(--spacing-3) var(--spacing-4);
      font-size: var(--font-size-3);
      min-height: 40px;
    }

    .button--large {
      padding: var(--spacing-4) var(--spacing-6);
      font-size: var(--font-size-4);
      min-height: 48px;
    }

    /* Variant styles - Primary */
    .button--primary {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-text-inverse);
    }

    .button--primary:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
      border-color: var(--color-primary-dark);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .button--primary:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Variant styles - Secondary */
    .button--secondary {
      background-color: var(--color-secondary);
      border-color: var(--color-secondary);
      color: var(--color-text-inverse);
    }

    .button--secondary:hover:not(:disabled) {
      background-color: var(--color-secondary-dark);
      border-color: var(--color-secondary-dark);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .button--secondary:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Variant styles - Outline */
    .button--outline {
      background-color: transparent;
      border-color: var(--color-primary);
      color: var(--color-primary);
    }

    .button--outline:hover:not(:disabled) {
      background-color: var(--color-primary);
      color: var(--color-text-inverse);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .button--outline:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Variant styles - Ghost */
    .button--ghost {
      background-color: transparent;
      border-color: transparent;
      color: var(--color-primary);
    }

    .button--ghost:hover:not(:disabled) {
      background-color: var(--color-gray-100);
      color: var(--color-primary-dark);
    }

    .button--ghost:active:not(:disabled) {
      background-color: var(--color-gray-200);
    }

    /* Variant styles - Link */
    .button--link {
      background-color: transparent;
      border-color: transparent;
      color: var(--color-primary);
      text-decoration: underline;
      text-underline-offset: 2px;
      padding: 0;
      min-height: auto;
    }

    .button--link:hover:not(:disabled) {
      color: var(--color-primary-dark);
      text-decoration-thickness: 2px;
    }

    .button--link:active:not(:disabled) {
      color: var(--color-primary-dark);
    }

    /* Disabled state */
    .button:disabled,
    :host([disabled]) .button {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    /* Loading state */
    .button--loading {
      cursor: wait;
      pointer-events: none;
    }

    .loading-spinner {
      width: 1em;
      height: 1em;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
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
      .button {
        border-width: 2px;
      }

      .button:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .button {
        transition: none;
      }

      .button:hover:not(:disabled) {
        transform: none;
      }

      .loading-spinner {
        animation: none;
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const isLink = Boolean(this.href);
    const isDisabled = this.disabled || this.loading;
    const buttonClasses = this._getButtonClasses();

    if (isLink) {
      return this._renderLink(buttonClasses, isDisabled);
    }

    return this._renderButton(buttonClasses, isDisabled);
  }

  /**
   * Render as button element
   */
  private _renderButton(classes: string, disabled: boolean): TemplateResult {
    return html`
      <button
        class="${classes}"
        ?disabled="${disabled}"
        type="${this.type}"
        aria-label="${this.ariaLabel || undefined}"
        aria-describedby="${this.ariaDescribedBy || undefined}"
        aria-expanded="${this.ariaExpanded || undefined}"
        aria-pressed="${this.ariaPressed || undefined}"
        @click="${this._handleClick}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        @keydown="${this._handleKeyDown}"
      >
        ${this.loading ? this._renderLoadingSpinner() : ''}
        <slot></slot>
        ${this.loading ? html`<span class="sr-only">Loading...</span>` : ''}
      </button>
    `;
  }

  /**
   * Render as anchor element
   */
  private _renderLink(classes: string, disabled: boolean): TemplateResult {
    return html`
      <a
        class="${classes}"
        href="${disabled ? undefined : this.href}"
        target="${this.target}"
        rel="${this.target === '_blank' ? 'noopener noreferrer' : undefined}"
        aria-label="${this.ariaLabel || undefined}"
        aria-describedby="${this.ariaDescribedBy || undefined}"
        aria-expanded="${this.ariaExpanded || undefined}"
        aria-pressed="${this.ariaPressed || undefined}"
        @click="${this._handleClick}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        @keydown="${this._handleKeyDown}"
      >
        ${this.loading ? this._renderLoadingSpinner() : ''}
        <slot></slot>
        ${this.loading ? html`<span class="sr-only">Loading...</span>` : ''}
      </a>
    `;
  }

  /**
   * Render loading spinner
   */
  private _renderLoadingSpinner(): TemplateResult {
    return html`<span class="loading-spinner" aria-hidden="true"></span>`;
  }

  /**
   * Get button CSS classes
   */
  private _getButtonClasses(): string {
    const classes = ['button'];
    classes.push(`button--${this.variant}`);
    classes.push(`button--${this.size}`);

    if (this.loading) {
      classes.push('button--loading');
    }

    return classes.join(' ');
  }

  /**
   * Handle button click
   */
  private _handleClick(event: Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Dispatch design system event
    this.dispatchDesignSystemEvent(
      'click',
      {
        variant: this.variant,
        size: this.size,
        type: this.type,
        href: this.href,
        target: this.target,
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
        variant: this.variant,
        size: this.size,
      },
      event
    );
  }

  /**
   * Handle blur event
   */
  private _handleBlur(event: FocusEvent): void {
    this.dispatchDesignSystemEvent(
      'blur',
      {
        variant: this.variant,
        size: this.size,
      },
      event
    );
  }

  /**
   * Handle key down event
   */
  private _handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.loading) {
      return;
    }

    // Handle Enter and Space keys
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleClick(event);
    }
  }

  /**
   * Validate component properties
   */
  override connectedCallback(): void {
    super.connectedCallback();

    // Validate variant
    this.variant = this.validateEnum(
      this.variant,
      ['primary', 'secondary', 'outline', 'ghost', 'link'],
      'primary'
    );

    // Validate size
    this.size = this.validateEnum(
      this.size,
      ['small', 'medium', 'large'],
      'medium'
    );

    // Validate type
    this.type = this.validateEnum(
      this.type,
      ['button', 'submit', 'reset'],
      'button'
    );

    // Validate target
    if (this.href) {
      this.target = this.validateEnum(
        this.target,
        ['_blank', '_self', '_parent', '_top'],
        '_self'
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-button': Button;
  }
}
