import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Breadcrumb component variants
 */
export type BreadcrumbVariant = 'default' | 'minimal' | 'compact';

/**
 * Breadcrumb component sizes
 */
export type BreadcrumbSize = 'small' | 'medium' | 'large';

/**
 * Breadcrumb component states
 */
export type BreadcrumbState = 'default' | 'focus' | 'disabled';

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
  disabled?: boolean;
}

/**
 * Breadcrumb component properties interface
 */
export interface BreadcrumbProperties {
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  state?: BreadcrumbState;
  items?: BreadcrumbItem[];
  separator?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Breadcrumb Component
 *
 * A navigation component for displaying hierarchical navigation paths.
 * Supports multiple variants, sizes, and states with full accessibility compliance.
 *
 * @example
 * ```html
 * <ds-breadcrumb
 *   variant="default"
 *   size="medium"
 *   .items="${[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Category', current: true }
 *   ]}"
 * ></ds-breadcrumb>
 * ```
 *
 * @fires ds-breadcrumb-render - Fired when the breadcrumb is rendered
 * @fires ds-breadcrumb-navigate - Fired when a breadcrumb item is clicked
 * @fires ds-breadcrumb-focus - Fired when the breadcrumb receives focus
 * @fires ds-breadcrumb-blur - Fired when the breadcrumb loses focus
 */
@customElement('ds-breadcrumb')
export class Breadcrumb extends DesignSystemElement {
  /**
   * Breadcrumb variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: BreadcrumbVariant = 'default';

  /**
   * Breadcrumb size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: BreadcrumbSize = 'medium';

  /**
   * Breadcrumb state
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  state: BreadcrumbState = 'default';

  /**
   * Breadcrumb items array
   */
  @property({ type: Array })
  items: BreadcrumbItem[] = [];

  /**
   * Separator character between breadcrumb items
   * @default '/'
   */
  @property({ type: String })
  separator: string = '/';

  /**
   * Accessible label for the breadcrumb
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string;

  /**
   * ID of element that describes the breadcrumb
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

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

    .breadcrumb {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--spacing-2);
      font-family: var(--font-family-sans);
      line-height: var(--line-height-normal);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .breadcrumb:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .breadcrumb:focus:not(:focus-visible) {
      outline: none;
    }

    .breadcrumb:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .breadcrumb__item {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    .breadcrumb__item:last-child .breadcrumb__separator {
      display: none;
    }

    .breadcrumb__link {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      color: var(--color-text-secondary);
      transition: color 0.2s ease-in-out;
      border-radius: var(--border-radius-sm);
      padding: var(--spacing-1) var(--spacing-2);
      margin: calc(-1 * var(--spacing-1)) calc(-1 * var(--spacing-2));
    }

    .breadcrumb__link:hover {
      color: var(--color-text-primary);
      background-color: var(--color-gray-100);
    }

    .breadcrumb__link:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .breadcrumb__link:focus:not(:focus-visible) {
      outline: none;
    }

    .breadcrumb__link:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .breadcrumb__link--current {
      color: var(--color-text-primary);
      font-weight: var(--font-weight-medium);
      cursor: default;
    }

    .breadcrumb__link--current:hover {
      background-color: transparent;
    }

    .breadcrumb__link--disabled {
      color: var(--color-text-tertiary);
      cursor: not-allowed;
      pointer-events: none;
    }

    .breadcrumb__separator {
      display: inline-flex;
      align-items: center;
      color: var(--color-text-tertiary);
      user-select: none;
    }

    /* Size variants */
    .breadcrumb--small {
      font-size: var(--font-size-1);
      gap: var(--spacing-1);
    }

    .breadcrumb--small .breadcrumb__item {
      gap: var(--spacing-1);
    }

    .breadcrumb--small .breadcrumb__link {
      padding: var(--spacing-1);
      margin: calc(-1 * var(--spacing-1));
    }

    .breadcrumb--medium {
      font-size: var(--font-size-2);
      gap: var(--spacing-2);
    }

    .breadcrumb--large {
      font-size: var(--font-size-3);
      gap: var(--spacing-3);
    }

    .breadcrumb--large .breadcrumb__item {
      gap: var(--spacing-3);
    }

    .breadcrumb--large .breadcrumb__link {
      padding: var(--spacing-2) var(--spacing-3);
      margin: calc(-1 * var(--spacing-2)) calc(-1 * var(--spacing-3));
    }

    /* Variant styles - Default */
    .breadcrumb--default {
      /* Default styling is already applied */
    }

    /* Variant styles - Minimal */
    .breadcrumb--minimal .breadcrumb__link {
      padding: var(--spacing-1);
      margin: calc(-1 * var(--spacing-1));
    }

    .breadcrumb--minimal .breadcrumb__link:hover {
      background-color: transparent;
      text-decoration: underline;
    }

    /* Variant styles - Compact */
    .breadcrumb--compact {
      gap: var(--spacing-1);
    }

    .breadcrumb--compact .breadcrumb__item {
      gap: var(--spacing-1);
    }

    .breadcrumb--compact .breadcrumb__link {
      padding: var(--spacing-1);
      margin: calc(-1 * var(--spacing-1));
    }

    .breadcrumb--compact .breadcrumb__separator {
      font-size: 0.875em;
    }

    /* State variants */
    .breadcrumb--focus:not(:disabled) {
      /* Focus state styling handled by focus pseudo-class */
    }

    /* Disabled state */
    .breadcrumb:disabled,
    :host([disabled]) .breadcrumb {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .breadcrumb__link {
        border: 1px solid transparent;
      }

      .breadcrumb__link:hover,
      .breadcrumb__link:focus {
        border-color: currentColor;
      }

      .breadcrumb:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .breadcrumb__link {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .breadcrumb__link:hover {
        background-color: var(--color-gray-800);
      }
    }

    /* Print styles */
    @media print {
      .breadcrumb__link {
        color: black !important;
        text-decoration: underline !important;
      }

      .breadcrumb__separator {
        color: black !important;
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const breadcrumbClasses = this._getBreadcrumbClasses();
    const attributes = this._getAttributes();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      state: this.state,
      itemCount: this.items.length,
      separator: this.separator,
    });

    return html`
      <nav
        class="${breadcrumbClasses}"
        ${attributes}
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        tabindex="0"
        role="navigation"
        aria-label="${this.ariaLabel || 'Breadcrumb navigation'}"
      >
        <ol class="breadcrumb__list">
          ${this.items.map((item, index) =>
            this._renderBreadcrumbItem(item, index)
          )}
        </ol>
      </nav>
    `;
  }

  /**
   * Get breadcrumb CSS classes
   */
  private _getBreadcrumbClasses(): string {
    const classes = ['breadcrumb'];
    classes.push(`breadcrumb--${this.variant}`);
    classes.push(`breadcrumb--${this.size}`);

    if (this.state !== 'default') {
      classes.push(`breadcrumb--${this.state}`);
    }

    return classes.join(' ');
  }

  /**
   * Get HTML attributes
   */
  private _getAttributes(): TemplateResult {
    const attributes = [];

    if (this.ariaDescribedBy) {
      attributes.push(html`aria-describedby="${this.ariaDescribedBy}"`);
    }

    return html`${attributes}`;
  }

  /**
   * Render a breadcrumb item
   */
  private _renderBreadcrumbItem(
    item: BreadcrumbItem,
    index: number
  ): TemplateResult {
    const isLast = index === this.items.length - 1;
    const linkClasses = this._getLinkClasses(item, isLast);

    return html`
      <li class="breadcrumb__item">
        ${item.href && !item.disabled && !item.current
          ? html`
              <a
                class="${linkClasses}"
                href="${item.href}"
                @click="${(e: Event) => this._handleItemClick(e, item, index)}"
                aria-current="${item.current ? 'page' : undefined}"
              >
                ${item.label}
              </a>
            `
          : html`
              <span
                class="${linkClasses}"
                aria-current="${item.current ? 'page' : undefined}"
                role="${item.current ? 'link' : 'text'}"
              >
                ${item.label}
              </span>
            `}
        ${!isLast
          ? html`<span class="breadcrumb__separator" aria-hidden="true"
              >${this.separator}</span
            >`
          : ''}
      </li>
    `;
  }

  /**
   * Get link CSS classes
   */
  private _getLinkClasses(item: BreadcrumbItem, isLast: boolean): string {
    const classes = ['breadcrumb__link'];

    if (item.current || isLast) {
      classes.push('breadcrumb__link--current');
    }

    if (item.disabled) {
      classes.push('breadcrumb__link--disabled');
    }

    return classes.join(' ');
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
        itemCount: this.items.length,
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
        itemCount: this.items.length,
      },
      event
    );
  }

  /**
   * Handle breadcrumb item click
   */
  private _handleItemClick(
    event: Event,
    item: BreadcrumbItem,
    index: number
  ): void {
    if (item.disabled || item.current) {
      event.preventDefault();
      return;
    }

    this.dispatchDesignSystemEvent(
      'navigate',
      {
        item: item,
        index: index,
        href: item.href,
        label: item.label,
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
      ['default', 'minimal', 'compact'],
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

    // Validate items array
    if (!Array.isArray(this.items)) {
      this.items = [];
    }
  }

  /**
   * Public method to focus the breadcrumb
   */
  public override focus(): void {
    const breadcrumbElement = this.shadowRoot?.querySelector(
      '.breadcrumb'
    ) as HTMLElement;
    if (breadcrumbElement) {
      breadcrumbElement.focus();
    }
  }

  /**
   * Public method to blur the breadcrumb
   */
  public override blur(): void {
    const breadcrumbElement = this.shadowRoot?.querySelector(
      '.breadcrumb'
    ) as HTMLElement;
    if (breadcrumbElement) {
      breadcrumbElement.blur();
    }
  }

  /**
   * Public method to get the breadcrumb items
   */
  public getItems(): BreadcrumbItem[] {
    return [...this.items];
  }

  /**
   * Public method to set breadcrumb items
   */
  public setItems(items: BreadcrumbItem[]): void {
    this.items = [...items];
    this.requestUpdate();
  }

  /**
   * Public method to add a breadcrumb item
   */
  public addItem(item: BreadcrumbItem, index?: number): void {
    if (typeof index === 'number' && index >= 0 && index <= this.items.length) {
      this.items.splice(index, 0, item);
    } else {
      this.items.push(item);
    }
    this.requestUpdate();
  }

  /**
   * Public method to remove a breadcrumb item
   */
  public removeItem(index: number): BreadcrumbItem | undefined {
    if (index >= 0 && index < this.items.length) {
      const removedItem = this.items.splice(index, 1)[0];
      this.requestUpdate();
      return removedItem;
    }
    return undefined;
  }

  /**
   * Public method to get the current item
   */
  public getCurrentItem(): BreadcrumbItem | undefined {
    return this.items.find(item => item.current);
  }

  /**
   * Public method to get breadcrumb dimensions
   */
  public getDimensions(): { width: number; height: number } {
    const breadcrumbElement = this.shadowRoot?.querySelector(
      '.breadcrumb'
    ) as HTMLElement;
    if (breadcrumbElement) {
      const rect = breadcrumbElement.getBoundingClientRect();
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
    'ds-breadcrumb': Breadcrumb;
  }
}
