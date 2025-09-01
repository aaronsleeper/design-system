import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Stack component variants
 */
export type StackVariant = 'default' | 'horizontal' | 'vertical';

/**
 * Stack component sizes
 */
export type StackSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Stack component properties interface
 */
export interface StackProperties {
  variant?: StackVariant;
  size?: StackSize;
  disabled?: boolean;
  gap?: string;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  wrap?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
}

/**
 * Stack Component
 *
 * A flexible stack layout component for organizing content in a single direction.
 * Provides consistent spacing, alignment options, and responsive behavior.
 *
 * @example
 * ```html
 * <ds-stack variant="vertical" size="large" gap="16px">Content here</ds-stack>
 * <ds-stack variant="horizontal" size="medium" align-items="center">Horizontal stack</ds-stack>
 * <ds-stack variant="default" size="small" disabled>Disabled stack</ds-stack>
 * ```
 *
 * @fires ds-stack-render - Fired when the stack is rendered
 */
@customElement('ds-stack')
export class Stack extends DesignSystemElement {
  /**
   * Stack variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: StackVariant = 'default';

  /**
   * Stack size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: StackSize = 'medium';

  /**
   * Whether the stack is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Gap between stack items
   */
  @property({ type: String })
  gap?: string;

  /**
   * Cross-axis alignment of stack items
   * @default 'stretch'
   */
  @property({ type: String, attribute: 'align-items' })
  alignItems: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  /**
   * Main-axis alignment of stack items
   * @default 'start'
   */
  @property({ type: String, attribute: 'justify-content' })
  justifyContent:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly' = 'start';

  /**
   * Whether items should wrap to new lines
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  wrap = false;

  /**
   * Accessible label for the stack
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the stack
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * ARIA role for the stack
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

    .stack {
      display: flex;
      position: relative;
      width: 100%;
      transition: all 0.2s ease-in-out;
    }

    .stack:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .stack:focus:not(:focus-visible) {
      outline: none;
    }

    .stack:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Variant styles - Default (vertical) */
    .stack--default {
      flex-direction: column;
      gap: var(--spacing-4);
    }

    /* Variant styles - Horizontal */
    .stack--horizontal {
      flex-direction: row;
      gap: var(--spacing-4);
    }

    /* Variant styles - Vertical */
    .stack--vertical {
      flex-direction: column;
      gap: var(--spacing-4);
    }

    /* Size variants */
    .stack--small {
      gap: var(--spacing-2);
    }

    .stack--medium {
      gap: var(--spacing-4);
    }

    .stack--large {
      gap: var(--spacing-6);
    }

    .stack--xlarge {
      gap: var(--spacing-8);
    }

    /* Alignment options */
    .stack--align-start {
      align-items: flex-start;
    }

    .stack--align-center {
      align-items: center;
    }

    .stack--align-end {
      align-items: flex-end;
    }

    .stack--align-stretch {
      align-items: stretch;
    }

    .stack--justify-start {
      justify-content: flex-start;
    }

    .stack--justify-center {
      justify-content: center;
    }

    .stack--justify-end {
      justify-content: flex-end;
    }

    .stack--justify-space-between {
      justify-content: space-between;
    }

    .stack--justify-space-around {
      justify-content: space-around;
    }

    .stack--justify-space-evenly {
      justify-content: space-evenly;
    }

    /* Wrap option */
    .stack--wrap {
      flex-wrap: wrap;
    }

    .stack--no-wrap {
      flex-wrap: nowrap;
    }

    /* Responsive behavior for horizontal stacks */
    @media (max-width: 767px) {
      .stack--horizontal {
        flex-direction: column;
      }
    }

    /* Disabled state */
    :host([disabled]) .stack {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .stack:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .stack {
        transition: none;
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const stackClasses = this._getStackClasses();
    const stackStyles = this._getStackStyles();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
      gap: this.gap,
      alignItems: this.alignItems,
      justifyContent: this.justifyContent,
      wrap: this.wrap,
    });

    return html`
      <div
        class="${stackClasses}"
        style="${stackStyles}"
        role="${this.role || undefined}"
        aria-label="${this.ariaLabel || undefined}"
        aria-describedby="${this.ariaDescribedBy || undefined}"
        tabindex="${this.disabled ? -1 : 0}"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        @keydown="${this._handleKeyDown}"
      >
        <slot></slot>
      </div>
    `;
  }

  /**
   * Get stack CSS classes
   */
  private _getStackClasses(): string {
    const classes = ['stack'];
    classes.push(`stack--${this.variant}`);
    classes.push(`stack--${this.size}`);
    classes.push(`stack--align-${this.alignItems}`);
    classes.push(`stack--justify-${this.justifyContent}`);
    classes.push(this.wrap ? 'stack--wrap' : 'stack--no-wrap');

    return classes.join(' ');
  }

  /**
   * Get stack inline styles
   */
  private _getStackStyles(): string {
    const styles: string[] = [];

    if (this.gap) {
      styles.push(`gap: ${this.gap}`);
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
        alignItems: this.alignItems,
        justifyContent: this.justifyContent,
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
        alignItems: this.alignItems,
        justifyContent: this.justifyContent,
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
          alignItems: this.alignItems,
          justifyContent: this.justifyContent,
        },
        event
      );
    }
  }

  /**
   * Public method to focus the stack
   */
  public override focus(): void {
    if (!this.disabled) {
      const stack = this.shadowRoot?.querySelector('.stack') as HTMLElement;
      if (stack) {
        stack.focus();
      }
    }
  }

  /**
   * Public method to blur the stack
   */
  public override blur(): void {
    const stack = this.shadowRoot?.querySelector('.stack') as HTMLElement;
    if (stack) {
      stack.blur();
    }
  }

  /**
   * Public method to get stack item count
   */
  public getItemCount(): number {
    return this.children.length;
  }

  /**
   * Public method to get stack direction
   */
  public getDirection(): 'row' | 'column' {
    return this.variant === 'horizontal' ? 'row' : 'column';
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

    // Validate alignItems
    this.alignItems = this.validateEnum(
      this.alignItems,
      ['start', 'center', 'end', 'stretch'],
      'stretch'
    );

    // Validate justifyContent
    this.justifyContent = this.validateEnum(
      this.justifyContent,
      [
        'start',
        'center',
        'end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      'start'
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-stack': Stack;
  }
}
