import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Badge component variants
 */
export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Badge component sizes
 */
export type BadgeSize = 'small' | 'medium' | 'large';

/**
 * Badge component states
 */
export type BadgeState = 'default' | 'focus' | 'disabled';

/**
 * Badge component properties interface
 */
export interface BadgeProperties {
  variant?: BadgeVariant;
  size?: BadgeSize;
  state?: BadgeState;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Badge Component
 *
 * A small status indicator component for displaying labels, counts, or status information.
 * Supports multiple variants, sizes, and states with full accessibility compliance.
 *
 * @example
 * ```html
 * <ds-badge variant="primary" size="medium">New</ds-badge>
 * <ds-badge variant="success" size="small">Active</ds-badge>
 * <ds-badge variant="error" size="large">Error</ds-badge>
 * ```
 *
 * @fires ds-badge-render - Fired when the badge is rendered
 * @fires ds-badge-focus - Fired when the badge receives focus
 * @fires ds-badge-blur - Fired when the badge loses focus
 */
@customElement('ds-badge')
export class Badge extends DesignSystemElement {
  /**
   * Badge variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: BadgeVariant = 'default';

  /**
   * Badge size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: BadgeSize = 'medium';

  /**
   * Badge state
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  state: BadgeState = 'default';

  /**
   * Accessible label for the badge
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the badge
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

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

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius-full);
      font-family: var(--font-family-sans);
      font-weight: var(--font-weight-medium);
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      transition: all 0.2s ease-in-out;
      box-sizing: border-box;
      border: 1px solid transparent;
    }

    .badge:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .badge:focus:not(:focus-visible) {
      outline: none;
    }

    .badge:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Size variants */
    .badge--small {
      padding: var(--spacing-1) var(--spacing-2);
      font-size: var(--font-size-1);
      min-height: 1.25rem;
    }

    .badge--medium {
      padding: var(--spacing-1) var(--spacing-3);
      font-size: var(--font-size-2);
      min-height: 1.5rem;
    }

    .badge--large {
      padding: var(--spacing-2) var(--spacing-4);
      font-size: var(--font-size-3);
      min-height: 2rem;
    }

    /* Variant styles - Default */
    .badge--default {
      background-color: var(--color-gray-100);
      color: var(--color-gray-700);
      border-color: var(--color-gray-200);
    }

    /* Variant styles - Primary */
    .badge--primary {
      background-color: var(--color-primary-light);
      color: var(--color-primary-dark);
      border-color: var(--color-primary);
    }

    /* Variant styles - Secondary */
    .badge--secondary {
      background-color: var(--color-secondary-light);
      color: var(--color-secondary-dark);
      border-color: var(--color-secondary);
    }

    /* Variant styles - Success */
    .badge--success {
      background-color: var(--color-success-light);
      color: var(--color-success-dark);
      border-color: var(--color-success);
    }

    /* Variant styles - Warning */
    .badge--warning {
      background-color: var(--color-warning-light);
      color: var(--color-warning-dark);
      border-color: var(--color-warning);
    }

    /* Variant styles - Error */
    .badge--error {
      background-color: var(--color-error-light);
      color: var(--color-error-dark);
      border-color: var(--color-error);
    }

    /* Variant styles - Info */
    .badge--info {
      background-color: var(--color-info-light);
      color: var(--color-info-dark);
      border-color: var(--color-info);
    }

    /* State variants */
    .badge--focus:not(:disabled) {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Disabled state */
    .badge:disabled,
    :host([disabled]) .badge {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .badge {
        border-width: 2px;
      }

      .badge:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .badge {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .badge--default {
        background-color: var(--color-gray-700);
        color: var(--color-gray-200);
        border-color: var(--color-gray-600);
      }

      .badge--primary {
        background-color: var(--color-primary-dark);
        color: var(--color-primary-light);
      }

      .badge--secondary {
        background-color: var(--color-secondary-dark);
        color: var(--color-secondary-light);
      }

      .badge--success {
        background-color: var(--color-success-dark);
        color: var(--color-success-light);
      }

      .badge--warning {
        background-color: var(--color-warning-dark);
        color: var(--color-warning-light);
      }

      .badge--error {
        background-color: var(--color-error-dark);
        color: var(--color-error-light);
      }

      .badge--info {
        background-color: var(--color-info-dark);
        color: var(--color-info-light);
      }
    }

    /* Print styles */
    @media print {
      .badge {
        background: white !important;
        color: black !important;
        border: 1px solid black !important;
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const badgeClasses = this._getBadgeClasses();
    const attributes = this._getAttributes();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      state: this.state,
    });

    return html`
      <span
        class="${badgeClasses}"
        ${attributes}
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        tabindex="0"
        role="status"
      >
        <slot></slot>
      </span>
    `;
  }

  /**
   * Get badge CSS classes
   */
  private _getBadgeClasses(): string {
    const classes = ['badge'];
    classes.push(`badge--${this.variant}`);
    classes.push(`badge--${this.size}`);

    if (this.state !== 'default') {
      classes.push(`badge--${this.state}`);
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

    return html`${attributes}`;
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
      },
      event
    );
  }

  /**
   * Validate component properties
   */
  override connectedCallback(): void {
    super.connectedCallback();

    // Validate variant
    this.variant = this.validateEnum(
      this.variant,
      [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
      ],
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
  }

  /**
   * Public method to focus the badge
   */
  public override focus(): void {
    const badgeElement = this.shadowRoot?.querySelector(
      '.badge'
    ) as HTMLElement;
    if (badgeElement) {
      badgeElement.focus();
    }
  }

  /**
   * Public method to blur the badge
   */
  public override blur(): void {
    const badgeElement = this.shadowRoot?.querySelector(
      '.badge'
    ) as HTMLElement;
    if (badgeElement) {
      badgeElement.blur();
    }
  }

  /**
   * Public method to get the badge text content
   */
  public getTextContent(): string {
    return this.textContent?.trim() || '';
  }

  /**
   * Public method to get the badge dimensions
   */
  public getDimensions(): { width: number; height: number } {
    const badgeElement = this.shadowRoot?.querySelector(
      '.badge'
    ) as HTMLElement;
    if (badgeElement) {
      const rect = badgeElement.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
      };
    }
    return { width: 0, height: 0 };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-badge': Badge;
  }
}
