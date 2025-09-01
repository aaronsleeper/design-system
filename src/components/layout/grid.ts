import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Grid component variants
 */
export type GridVariant = 'default' | 'responsive' | 'fixed';

/**
 * Grid component sizes
 */
export type GridSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Grid component properties interface
 */
export interface GridProperties {
  variant?: GridVariant;
  size?: GridSize;
  disabled?: boolean;
  columns?: number;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
}

/**
 * Grid Component
 *
 * A flexible grid layout component for organizing content in rows and columns.
 * Provides consistent spacing, responsive behavior, and alignment options.
 *
 * @example
 * ```html
 * <ds-grid variant="responsive" size="large" columns="3">Content here</ds-grid>
 * <ds-grid variant="fixed" size="medium" columns="2" gap="16px">Fixed grid</ds-grid>
 * <ds-grid variant="default" size="small" columns="4" disabled>Disabled grid</ds-grid>
 * ```
 *
 * @fires ds-grid-render - Fired when the grid is rendered
 */
@customElement('ds-grid')
export class Grid extends DesignSystemElement {
  /**
   * Grid variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: GridVariant = 'default';

  /**
   * Grid size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: GridSize = 'medium';

  /**
   * Whether the grid is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Number of columns in the grid
   * @default 3
   */
  @property({ type: Number, reflect: true })
  columns = 3;

  /**
   * Gap between grid items
   */
  @property({ type: String })
  gap?: string;

  /**
   * Row gap between grid items
   */
  @property({ type: String, attribute: 'row-gap' })
  rowGap?: string;

  /**
   * Column gap between grid items
   */
  @property({ type: String, attribute: 'column-gap' })
  columnGap?: string;

  /**
   * Vertical alignment of grid items
   * @default 'stretch'
   */
  @property({ type: String, attribute: 'align-items' })
  alignItems: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  /**
   * Horizontal alignment of grid items
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
   * Accessible label for the grid
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the grid
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * ARIA role for the grid
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

    .grid {
      display: grid;
      position: relative;
      width: 100%;
      transition: all 0.2s ease-in-out;
    }

    .grid:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .grid:focus:not(:focus-visible) {
      outline: none;
    }

    .grid:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Variant styles - Default */
    .grid--default {
      grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
      gap: var(--spacing-4);
    }

    /* Variant styles - Responsive */
    .grid--responsive {
      grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
      gap: var(--spacing-4);
    }

    /* Variant styles - Fixed */
    .grid--fixed {
      grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
      gap: var(--spacing-4);
      max-width: 100%;
    }

    /* Size variants */
    .grid--small {
      gap: var(--spacing-2);
    }

    .grid--medium {
      gap: var(--spacing-4);
    }

    .grid--large {
      gap: var(--spacing-6);
    }

    .grid--xlarge {
      gap: var(--spacing-8);
    }

    /* Alignment options */
    .grid--align-start {
      align-items: start;
    }

    .grid--align-center {
      align-items: center;
    }

    .grid--align-end {
      align-items: end;
    }

    .grid--align-stretch {
      align-items: stretch;
    }

    .grid--justify-start {
      justify-content: start;
    }

    .grid--justify-center {
      justify-content: center;
    }

    .grid--justify-end {
      justify-content: end;
    }

    .grid--justify-space-between {
      justify-content: space-between;
    }

    .grid--justify-space-around {
      justify-content: space-around;
    }

    .grid--justify-space-evenly {
      justify-content: space-evenly;
    }

    /* Responsive breakpoints for responsive variant */
    @media (min-width: 640px) {
      .grid--responsive {
        grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
        gap: var(--spacing-6);
      }

      .grid--responsive.grid--small {
        gap: var(--spacing-3);
      }

      .grid--responsive.grid--large {
        gap: var(--spacing-8);
      }

      .grid--responsive.grid--xlarge {
        gap: var(--spacing-10);
      }
    }

    @media (min-width: 768px) {
      .grid--responsive {
        grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
        gap: var(--spacing-8);
      }

      .grid--responsive.grid--small {
        gap: var(--spacing-4);
      }

      .grid--responsive.grid--large {
        gap: var(--spacing-10);
      }

      .grid--responsive.grid--xlarge {
        gap: var(--spacing-12);
      }
    }

    @media (min-width: 1024px) {
      .grid--responsive {
        grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
        gap: var(--spacing-10);
      }

      .grid--responsive.grid--small {
        gap: var(--spacing-6);
      }

      .grid--responsive.grid--large {
        gap: var(--spacing-12);
      }

      .grid--responsive.grid--xlarge {
        gap: var(--spacing-16);
      }
    }

    @media (min-width: 1280px) {
      .grid--responsive {
        grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
        gap: var(--spacing-12);
      }

      .grid--responsive.grid--small {
        gap: var(--spacing-8);
      }

      .grid--responsive.grid--large {
        gap: var(--spacing-16);
      }

      .grid--responsive.grid--xlarge {
        gap: var(--spacing-20);
      }
    }

    /* Mobile-first responsive columns for responsive variant */
    @media (max-width: 639px) {
      .grid--responsive {
        grid-template-columns: 1fr;
      }
    }

    @media (min-width: 640px) and (max-width: 767px) {
      .grid--responsive {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .grid--responsive {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1024px) and (max-width: 1279px) {
      .grid--responsive {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    @media (min-width: 1280px) {
      .grid--responsive {
        grid-template-columns: repeat(var(--grid-columns, 5), 1fr);
      }
    }

    /* Disabled state */
    :host([disabled]) .grid {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .grid:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .grid {
        transition: none;
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const gridClasses = this._getGridClasses();
    const gridStyles = this._getGridStyles();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
      columns: this.columns,
      gap: this.gap,
      rowGap: this.rowGap,
      columnGap: this.columnGap,
      alignItems: this.alignItems,
      justifyContent: this.justifyContent,
    });

    return html`
      <div
        class="${gridClasses}"
        style="${gridStyles}"
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
   * Get grid CSS classes
   */
  private _getGridClasses(): string {
    const classes = ['grid'];
    classes.push(`grid--${this.variant}`);
    classes.push(`grid--${this.size}`);
    classes.push(`grid--align-${this.alignItems}`);
    classes.push(`grid--justify-${this.justifyContent}`);

    return classes.join(' ');
  }

  /**
   * Get grid inline styles
   */
  private _getGridStyles(): string {
    const styles: string[] = [];

    // Set CSS custom property for columns
    styles.push(`--grid-columns: ${this.columns}`);

    if (this.gap) {
      styles.push(`gap: ${this.gap}`);
    }

    if (this.rowGap) {
      styles.push(`row-gap: ${this.rowGap}`);
    }

    if (this.columnGap) {
      styles.push(`column-gap: ${this.columnGap}`);
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
        columns: this.columns,
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
        columns: this.columns,
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
          columns: this.columns,
        },
        event
      );
    }
  }

  /**
   * Public method to focus the grid
   */
  public override focus(): void {
    if (!this.disabled) {
      const grid = this.shadowRoot?.querySelector('.grid') as HTMLElement;
      if (grid) {
        grid.focus();
      }
    }
  }

  /**
   * Public method to blur the grid
   */
  public override blur(): void {
    const grid = this.shadowRoot?.querySelector('.grid') as HTMLElement;
    if (grid) {
      grid.blur();
    }
  }

  /**
   * Public method to get grid item count
   */
  public getItemCount(): number {
    return this.children.length;
  }

  /**
   * Public method to get grid dimensions
   */
  public getDimensions(): { columns: number; rows: number } {
    const itemCount = this.getItemCount();
    const rows = Math.ceil(itemCount / this.columns);
    return { columns: this.columns, rows };
  }

  /**
   * Validate component properties
   */
  override connectedCallback(): void {
    super.connectedCallback();

    // Validate variant
    this.variant = this.validateEnum(
      this.variant,
      ['default', 'responsive', 'fixed'],
      'default'
    );

    // Validate size
    this.size = this.validateEnum(
      this.size,
      ['small', 'medium', 'large', 'xlarge'],
      'medium'
    );

    // Validate columns
    this.columns = this.validateRange(this.columns, 1, 12, 3);

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
    'ds-grid': Grid;
  }
}
