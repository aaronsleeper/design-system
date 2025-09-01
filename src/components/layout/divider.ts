import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Divider component variants
 */
export type DividerVariant = 'default' | 'horizontal' | 'vertical';

/**
 * Divider component sizes
 */
export type DividerSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Divider component properties interface
 */
export interface DividerProperties {
  variant?: DividerVariant;
  size?: DividerSize;
  disabled?: boolean;
  thickness?: string;
  color?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
}

/**
 * Divider Component
 *
 * A visual separator component for dividing content sections.
 * Provides consistent styling and accessibility support.
 *
 * @example
 * ```html
 * <ds-divider variant="horizontal" size="large"></ds-divider>
 * <ds-divider variant="vertical" size="medium" thickness="2px"></ds-divider>
 * <ds-divider variant="default" size="small" disabled></ds-divider>
 * ```
 *
 * @fires ds-divider-render - Fired when the divider is rendered
 */
@customElement('ds-divider')
export class Divider extends DesignSystemElement {
  /**
   * Divider variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: DividerVariant = 'default';

  /**
   * Divider size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: DividerSize = 'medium';

  /**
   * Whether the divider is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Custom thickness for the divider
   */
  @property({ type: String })
  thickness?: string;

  /**
   * Custom color for the divider
   */
  @property({ type: String })
  color?: string;

  /**
   * Accessible label for the divider
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the divider
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * ARIA role for the divider
   */
  @property({ type: String })
  override role?: string | null;

  /**
   * Component styles
   */
  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: 0.6;
    }

    .divider {
      position: relative;
      border: none;
      background-color: var(--color-border-default);
      transition: all 0.2s ease-in-out;
    }

    .divider:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .divider:focus:not(:focus-visible) {
      outline: none;
    }

    .divider:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Variant styles - Default (horizontal) */
    .divider--default {
      width: 100%;
      height: 1px;
      margin: var(--spacing-4) 0;
    }

    /* Variant styles - Horizontal */
    .divider--horizontal {
      width: 100%;
      height: 1px;
      margin: var(--spacing-4) 0;
    }

    /* Variant styles - Vertical */
    .divider--vertical {
      width: 1px;
      height: 100%;
      margin: 0 var(--spacing-4);
      display: inline-block;
      vertical-align: middle;
    }

    /* Size variants */
    .divider--small {
      margin: var(--spacing-2) 0;
    }

    .divider--small.divider--vertical {
      margin: 0 var(--spacing-2);
    }

    .divider--medium {
      margin: var(--spacing-4) 0;
    }

    .divider--medium.divider--vertical {
      margin: 0 var(--spacing-4);
    }

    .divider--large {
      margin: var(--spacing-6) 0;
    }

    .divider--large.divider--vertical {
      margin: 0 var(--spacing-6);
    }

    .divider--xlarge {
      margin: var(--spacing-8) 0;
    }

    .divider--xlarge.divider--vertical {
      margin: 0 var(--spacing-8);
    }

    /* Disabled state */
    :host([disabled]) .divider {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .divider {
        background-color: var(--color-border-high-contrast);
        height: 2px;
      }

      .divider--vertical {
        width: 2px;
        height: 100%;
      }

      .divider:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .divider {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .divider {
        background-color: var(--color-border-default-dark);
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const dividerClasses = this._getDividerClasses();
    const dividerStyles = this._getDividerStyles();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
      thickness: this.thickness,
      color: this.color,
    });

    return html`
      <hr
        class="${dividerClasses}"
        style="${dividerStyles}"
        role="${this.role || 'separator'}"
        aria-label="${this.ariaLabel || undefined}"
        aria-describedby="${this.ariaDescribedBy || undefined}"
        tabindex="${this.disabled ? -1 : 0}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        @keydown="${this._handleKeyDown}"
      />
    `;
  }

  /**
   * Get divider CSS classes
   */
  private _getDividerClasses(): string {
    const classes = ['divider'];
    classes.push(`divider--${this.variant}`);
    classes.push(`divider--${this.size}`);

    return classes.join(' ');
  }

  /**
   * Get divider inline styles
   */
  private _getDividerStyles(): string {
    const styles: string[] = [];

    if (this.thickness) {
      if (this.variant === 'vertical') {
        styles.push(`width: ${this.thickness}`);
      } else {
        styles.push(`height: ${this.thickness}`);
      }
    }

    if (this.color) {
      styles.push(`background-color: ${this.color}`);
    }

    return styles.join('; ');
  }

  /**
   * Handle focus event
   */
  private _handleFocus(event: FocusEvent): void {
    if (this.disabled) {
      return;
    }

    this.dispatchDesignSystemEvent(
      'focus',
      {
        variant: this.variant,
        size: this.size,
        thickness: this.thickness,
        color: this.color,
      },
      event
    );
  }

  /**
   * Handle blur event
   */
  private _handleBlur(event: FocusEvent): void {
    if (this.disabled) {
      return;
    }

    this.dispatchDesignSystemEvent(
      'blur',
      {
        variant: this.variant,
        size: this.size,
        thickness: this.thickness,
        color: this.color,
      },
      event
    );
  }

  /**
   * Handle key down event
   */
  private _handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    // Handle Enter and Space keys for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.dispatchDesignSystemEvent(
        'activate',
        {
          variant: this.variant,
          size: this.size,
          thickness: this.thickness,
          color: this.color,
        },
        event
      );
    }
  }

  /**
   * Public method to focus the divider
   */
  public override focus(): void {
    if (!this.disabled) {
      const divider = this.shadowRoot?.querySelector('.divider') as HTMLElement;
      if (divider) {
        divider.focus();
      }
    }
  }

  /**
   * Public method to blur the divider
   */
  public override blur(): void {
    const divider = this.shadowRoot?.querySelector('.divider') as HTMLElement;
    if (divider) {
      divider.blur();
    }
  }

  /**
   * Public method to get divider orientation
   */
  public getOrientation(): 'horizontal' | 'vertical' {
    return this.variant === 'vertical' ? 'vertical' : 'horizontal';
  }

  /**
   * Public method to get divider thickness
   */
  public getThickness(): string {
    return this.thickness || (this.variant === 'vertical' ? '1px' : '1px');
  }

  /**
   * Validate component properties
   */
  override connectedCallback(): void {
    super.connectedCallback();

    // Validate variant
    this.variant = this.validateEnum(
      this.variant,
      ['default', 'horizontal', 'vertical'],
      'default'
    );

    // Validate size
    this.size = this.validateEnum(
      this.size,
      ['small', 'medium', 'large', 'xlarge'],
      'medium'
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-divider': Divider;
  }
}
