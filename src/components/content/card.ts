import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Card component variants
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

/**
 * Card component sizes
 */
export type CardSize = 'small' | 'medium' | 'large';

/**
 * Card component states
 */
export type CardState = 'default' | 'hover' | 'focus' | 'disabled';

/**
 * Card component colors
 */
export type CardColor = 'primary' | 'secondary' | 'neutral' | 'inverse';

/**
 * Card component properties interface
 */
export interface CardProperties {
  variant?: CardVariant;
  size?: CardSize;
  state?: CardState;
  color?: CardColor;
  clickable?: boolean;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: string;
  ariaPressed?: string;
}

/**
 * Card Component
 *
 * A comprehensive card component with multiple variants, sizes, states, and colors.
 * Supports both static cards and clickable cards with optional link functionality.
 *
 * @example
 * ```html
 * <ds-card variant="elevated" size="medium" color="primary">Card content</ds-card>
 * <ds-card variant="outlined" clickable href="/link">Clickable card</ds-card>
 * <ds-card variant="filled" size="large" color="secondary">Large filled card</ds-card>
 * ```
 *
 * @fires ds-card-click - Fired when the card is clicked
 * @fires ds-card-focus - Fired when the card receives focus
 * @fires ds-card-blur - Fired when the card loses focus
 */
@customElement('ds-card')
export class Card extends DesignSystemElement {
  /**
   * Card variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: CardVariant = 'default';

  /**
   * Card size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: CardSize = 'medium';

  /**
   * Card state
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  state: CardState = 'default';

  /**
   * Card color theme
   * @default 'neutral'
   */
  @property({ type: String, reflect: true })
  color: CardColor = 'neutral';

  /**
   * Whether the card is clickable
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * URL for clickable cards (renders as anchor tag)
   */
  @property({ type: String, reflect: true })
  href?: string;

  /**
   * Target for clickable cards
   * @default '_self'
   */
  @property({ type: String, reflect: true })
  target: '_blank' | '_self' | '_parent' | '_top' = '_self';

  /**
   * Accessible label for the card
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string;

  /**
   * ID of element that describes the card
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * Whether the card controls an expanded element
   */
  @property({ type: String, attribute: 'aria-expanded' })
  override ariaExpanded?: string;

  /**
   * Whether the card is pressed (for toggle cards)
   */
  @property({ type: String, attribute: 'aria-pressed' })
  override ariaPressed?: string;

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

    .card {
      display: block;
      position: relative;
      border-radius: var(--border-radius-lg);
      font-family: var(--font-family-sans);
      line-height: var(--line-height-normal);
      color: var(--color-text-primary);
      background-color: var(--color-background-elevated);
      transition: all 0.2s ease-in-out;
      overflow: hidden;
      box-sizing: border-box;
    }

    .card:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .card:focus:not(:focus-visible) {
      outline: none;
    }

    .card:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Size variants */
    .card--small {
      padding: var(--spacing-3);
      font-size: var(--font-size-2);
    }

    .card--medium {
      padding: var(--spacing-4);
      font-size: var(--font-size-3);
    }

    .card--large {
      padding: var(--spacing-6);
      font-size: var(--font-size-4);
    }

    /* Variant styles - Default */
    .card--default {
      border: 1px solid var(--color-border);
      background-color: var(--color-background-elevated);
    }

    /* Variant styles - Elevated */
    .card--elevated {
      border: none;
      background-color: var(--color-background-elevated);
      box-shadow: var(--shadow-sm);
    }

    .card--elevated:hover:not(:disabled) {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }

    .card--elevated:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: var(--shadow-sm);
    }

    /* Variant styles - Outlined */
    .card--outlined {
      border: 2px solid var(--color-border);
      background-color: transparent;
    }

    .card--outlined:hover:not(:disabled) {
      border-color: var(--color-primary);
      background-color: var(--color-primary-light);
    }

    .card--outlined:active:not(:disabled) {
      border-color: var(--color-primary-dark);
      background-color: var(--color-primary-light);
    }

    /* Variant styles - Filled */
    .card--filled {
      border: none;
      background-color: var(--color-gray-100);
    }

    .card--filled:hover:not(:disabled) {
      background-color: var(--color-gray-200);
    }

    .card--filled:active:not(:disabled) {
      background-color: var(--color-gray-300);
    }

    /* Color variants */
    .card--primary {
      color: var(--color-text-primary);
    }

    .card--primary.card--elevated {
      background-color: var(--color-primary-light);
      border-color: var(--color-primary);
    }

    .card--primary.card--outlined {
      border-color: var(--color-primary);
    }

    .card--primary.card--filled {
      background-color: var(--color-primary-light);
    }

    .card--secondary {
      color: var(--color-text-primary);
    }

    .card--secondary.card--elevated {
      background-color: var(--color-secondary-light);
      border-color: var(--color-secondary);
    }

    .card--secondary.card--outlined {
      border-color: var(--color-secondary);
    }

    .card--secondary.card--filled {
      background-color: var(--color-secondary-light);
    }

    .card--neutral {
      color: var(--color-text-primary);
    }

    .card--inverse {
      color: var(--color-text-inverse);
      background-color: var(--color-gray-900);
    }

    .card--inverse.card--elevated {
      background-color: var(--color-gray-800);
    }

    .card--inverse.card--outlined {
      border-color: var(--color-gray-600);
    }

    .card--inverse.card--filled {
      background-color: var(--color-gray-700);
    }

    /* Clickable state */
    .card--clickable {
      cursor: pointer;
      user-select: none;
    }

    .card--clickable:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    .card--clickable:active:not(:disabled) {
      transform: translateY(0);
    }

    /* Disabled state */
    .card:disabled,
    :host([disabled]) .card {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    /* State variants */
    .card--hover:not(:disabled) {
      transform: translateY(-1px);
    }

    .card--focus:not(:disabled) {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Card content areas */
    .card__header {
      margin-bottom: var(--spacing-3);
    }

    .card__body {
      margin-bottom: var(--spacing-3);
    }

    .card__footer {
      margin-top: var(--spacing-3);
      padding-top: var(--spacing-3);
      border-top: 1px solid var(--color-border);
    }

    .card__header:last-child,
    .card__body:last-child,
    .card__footer:last-child {
      margin-bottom: 0;
      margin-top: 0;
    }

    /* Card media */
    .card__media {
      width: 100%;
      height: auto;
      display: block;
      margin-bottom: var(--spacing-3);
    }

    .card__media:last-child {
      margin-bottom: 0;
    }

    /* Card actions */
    .card__actions {
      display: flex;
      gap: var(--spacing-2);
      margin-top: var(--spacing-3);
      padding-top: var(--spacing-3);
      border-top: 1px solid var(--color-border);
    }

    .card__actions:last-child {
      margin-top: 0;
      padding-top: 0;
      border-top: none;
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
      .card {
        border-width: 2px;
      }

      .card:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .card {
        transition: none;
      }

      .card:hover:not(:disabled) {
        transform: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .card--default {
        background-color: var(--color-gray-800);
        border-color: var(--color-gray-600);
        color: var(--color-text-inverse);
      }

      .card--elevated {
        background-color: var(--color-gray-800);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
      }

      .card--outlined {
        border-color: var(--color-gray-600);
        background-color: transparent;
        color: var(--color-text-inverse);
      }

      .card--filled {
        background-color: var(--color-gray-700);
        color: var(--color-text-inverse);
      }

      .card--primary.card--elevated {
        background-color: var(--color-primary-dark);
      }

      .card--primary.card--filled {
        background-color: var(--color-primary-dark);
      }

      .card--secondary.card--elevated {
        background-color: var(--color-secondary-dark);
      }

      .card--secondary.card--filled {
        background-color: var(--color-secondary-dark);
      }

      .card__footer,
      .card__actions {
        border-color: var(--color-gray-600);
      }
    }

    /* Print styles */
    @media print {
      .card {
        background: white !important;
        color: black !important;
        box-shadow: none !important;
        border: 1px solid black !important;
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const isClickable = this.clickable || Boolean(this.href);
    const cardClasses = this._getCardClasses();
    const attributes = this._getAttributes();

    if (isClickable && this.href) {
      return this._renderClickableCard(cardClasses, attributes);
    }

    return this._renderStaticCard(cardClasses, attributes);
  }

  /**
   * Render as clickable card (anchor element)
   */
  private _renderClickableCard(
    classes: string,
    attributes: TemplateResult
  ): TemplateResult {
    return html`
      <a
        class="${classes}"
        href="${this.href}"
        target="${this.target}"
        rel="${this.target === '_blank' ? 'noopener noreferrer' : undefined}"
        ${attributes}
        @click="${this._handleClick}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        @keydown="${this._handleKeyDown}"
      >
        <slot></slot>
      </a>
    `;
  }

  /**
   * Render as static card (div element)
   */
  private _renderStaticCard(
    classes: string,
    attributes: TemplateResult
  ): TemplateResult {
    const clickableAttributes = this.clickable
      ? html`
          tabindex="0" role="button" @click="${this._handleClick}"
          @focus="${this._handleFocus}" @blur="${this._handleBlur}"
          @keydown="${this._handleKeyDown}"
        `
      : html``;

    return html`
      <div class="${classes}" ${attributes} ${clickableAttributes}>
        <slot></slot>
      </div>
    `;
  }

  /**
   * Get card CSS classes
   */
  private _getCardClasses(): string {
    const classes = ['card'];
    classes.push(`card--${this.variant}`);
    classes.push(`card--${this.size}`);
    classes.push(`card--${this.color}`);

    if (this.clickable || this.href) {
      classes.push('card--clickable');
    }

    if (this.state !== 'default') {
      classes.push(`card--${this.state}`);
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

    if (this.ariaExpanded) {
      attributes.push(html`aria-expanded="${this.ariaExpanded}"`);
    }

    if (this.ariaPressed) {
      attributes.push(html`aria-pressed="${this.ariaPressed}"`);
    }

    return html`${attributes}`;
  }

  /**
   * Handle card click
   */
  private _handleClick(event: Event): void {
    if (this.state === 'disabled') {
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
        state: this.state,
        color: this.color,
        clickable: this.clickable,
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
    this.state = 'focus';

    this.dispatchDesignSystemEvent(
      'focus',
      {
        variant: this.variant,
        size: this.size,
        state: this.state,
        color: this.color,
        clickable: this.clickable,
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
        color: this.color,
        clickable: this.clickable,
      },
      event
    );
  }

  /**
   * Handle key down event
   */
  private _handleKeyDown(event: KeyboardEvent): void {
    if (this.state === 'disabled') {
      return;
    }

    // Handle Enter and Space keys for clickable cards
    if (
      (this.clickable || this.href) &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      this._handleClick(event);
    }
  }

  /**
   * Handle mouse enter event
   */
  private _handleMouseEnter(): void {
    if (this.state !== 'disabled') {
      this.state = 'hover';
    }
  }

  /**
   * Handle mouse leave event
   */
  private _handleMouseLeave(): void {
    if (this.state === 'hover') {
      this.state = 'default';
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
      ['default', 'elevated', 'outlined', 'filled'],
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
      ['default', 'hover', 'focus', 'disabled'],
      'default'
    );

    // Validate color
    this.color = this.validateEnum(
      this.color,
      ['primary', 'secondary', 'neutral', 'inverse'],
      'neutral'
    );

    // Validate target
    if (this.href) {
      this.target = this.validateEnum(
        this.target,
        ['_blank', '_self', '_parent', '_top'],
        '_self'
      );
    }

    // Add mouse event listeners for hover state
    this.addEventListener('mouseenter', this._handleMouseEnter);
    this.addEventListener('mouseleave', this._handleMouseLeave);
  }

  /**
   * Cleanup event listeners
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-card': Card;
  }
}
