import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Pagination component variants
 */
export type PaginationVariant = 'default' | 'minimal' | 'compact';

/**
 * Pagination component sizes
 */
export type PaginationSize = 'small' | 'medium' | 'large';

/**
 * Pagination component states
 */
export type PaginationState = 'default' | 'focus' | 'disabled';

/**
 * Pagination item interface
 */
export interface PaginationItem {
  page: number;
  label?: string;
  disabled?: boolean;
  current?: boolean;
  type?: 'page' | 'ellipsis' | 'previous' | 'next' | 'first' | 'last';
}

/**
 * Pagination component properties interface
 */
export interface PaginationProperties {
  variant?: PaginationVariant;
  size?: PaginationSize;
  state?: PaginationState;
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  showFirstLast?: boolean;
  showPreviousNext?: boolean;
  maxVisiblePages?: number;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Pagination Component
 *
 * A navigation component for displaying pagination controls.
 * Supports multiple variants, sizes, and states with full accessibility compliance.
 *
 * @example
 * ```html
 * <ds-pagination
 *   variant="default"
 *   size="medium"
 *   current-page="3"
 *   total-pages="10"
 *   show-first-last
 *   show-previous-next
 * ></ds-pagination>
 * ```
 *
 * @fires ds-pagination-render - Fired when the pagination is rendered
 * @fires ds-pagination-navigate - Fired when a pagination item is clicked
 * @fires ds-pagination-focus - Fired when the pagination receives focus
 * @fires ds-pagination-blur - Fired when the pagination loses focus
 */
@customElement('ds-pagination')
export class Pagination extends DesignSystemElement {
  /**
   * Pagination variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: PaginationVariant = 'default';

  /**
   * Pagination size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: PaginationSize = 'medium';

  /**
   * Pagination state
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  state: PaginationState = 'default';

  /**
   * Current page number (1-based)
   * @default 1
   */
  @property({ type: Number, attribute: 'current-page' })
  currentPage: number = 1;

  /**
   * Total number of pages
   * @default 1
   */
  @property({ type: Number, attribute: 'total-pages' })
  totalPages: number = 1;

  /**
   * Items per page
   * @default 10
   */
  @property({ type: Number, attribute: 'items-per-page' })
  itemsPerPage: number = 10;

  /**
   * Total number of items
   * @default 0
   */
  @property({ type: Number, attribute: 'total-items' })
  totalItems: number = 0;

  /**
   * Show first and last page buttons
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-first-last' })
  showFirstLast: boolean = false;

  /**
   * Show previous and next page buttons
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-previous-next' })
  showPreviousNext: boolean = true;

  /**
   * Maximum number of visible page numbers
   * @default 7
   */
  @property({ type: Number, attribute: 'max-visible-pages' })
  maxVisiblePages: number = 7;

  /**
   * Accessible label for the pagination
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string;

  /**
   * ID of element that describes the pagination
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

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-1);
      font-family: var(--font-family-sans);
      line-height: var(--line-height-normal);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .pagination:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .pagination:focus:not(:focus-visible) {
      outline: none;
    }

    .pagination:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .pagination__item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pagination__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 2.5rem;
      height: 2.5rem;
      padding: var(--spacing-2);
      border: 1px solid var(--color-border-default);
      border-radius: var(--border-radius-sm);
      background-color: var(--color-background-primary);
      color: var(--color-text-primary);
      text-decoration: none;
      font-size: var(--font-size-2);
      font-weight: var(--font-weight-normal);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      user-select: none;
    }

    .pagination__button:hover:not(:disabled) {
      background-color: var(--color-gray-100);
      border-color: var(--color-border-hover);
    }

    .pagination__button:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .pagination__button:focus:not(:focus-visible) {
      outline: none;
    }

    .pagination__button:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .pagination__button--current {
      background-color: var(--color-primary-500);
      border-color: var(--color-primary-500);
      color: var(--color-white);
      font-weight: var(--font-weight-medium);
    }

    .pagination__button--current:hover {
      background-color: var(--color-primary-600);
      border-color: var(--color-primary-600);
    }

    .pagination__button--disabled {
      background-color: var(--color-gray-100);
      border-color: var(--color-border-disabled);
      color: var(--color-text-tertiary);
      cursor: not-allowed;
      pointer-events: none;
    }

    .pagination__button--ellipsis {
      background-color: transparent;
      border-color: transparent;
      cursor: default;
      pointer-events: none;
    }

    .pagination__button--ellipsis:hover {
      background-color: transparent;
      border-color: transparent;
    }

    .pagination__icon {
      width: 1rem;
      height: 1rem;
      fill: currentColor;
    }

    /* Size variants */
    .pagination--small .pagination__button {
      min-width: 2rem;
      height: 2rem;
      padding: var(--spacing-1);
      font-size: var(--font-size-1);
    }

    .pagination--small .pagination__icon {
      width: 0.875rem;
      height: 0.875rem;
    }

    .pagination--medium .pagination__button {
      min-width: 2.5rem;
      height: 2.5rem;
      padding: var(--spacing-2);
      font-size: var(--font-size-2);
    }

    .pagination--large .pagination__button {
      min-width: 3rem;
      height: 3rem;
      padding: var(--spacing-3);
      font-size: var(--font-size-3);
    }

    .pagination--large .pagination__icon {
      width: 1.125rem;
      height: 1.125rem;
    }

    /* Variant styles - Default */
    .pagination--default {
      /* Default styling is already applied */
    }

    /* Variant styles - Minimal */
    .pagination--minimal .pagination__button {
      border: none;
      background-color: transparent;
    }

    .pagination--minimal .pagination__button:hover:not(:disabled) {
      background-color: var(--color-gray-100);
    }

    .pagination--minimal .pagination__button--current {
      background-color: var(--color-primary-100);
      color: var(--color-primary-700);
    }

    .pagination--minimal .pagination__button--current:hover {
      background-color: var(--color-primary-200);
    }

    /* Variant styles - Compact */
    .pagination--compact {
      gap: var(--spacing-1);
    }

    .pagination--compact .pagination__button {
      min-width: 2rem;
      height: 2rem;
      padding: var(--spacing-1);
      font-size: var(--font-size-1);
    }

    /* State variants */
    .pagination--focus:not(:disabled) {
      /* Focus state styling handled by focus pseudo-class */
    }

    /* Disabled state */
    .pagination:disabled,
    :host([disabled]) .pagination {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .pagination__button {
        border-width: 2px;
      }

      .pagination__button:hover,
      .pagination__button:focus {
        border-width: 2px;
      }

      .pagination:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .pagination__button {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .pagination__button:hover:not(:disabled) {
        background-color: var(--color-gray-800);
      }

      .pagination--minimal .pagination__button:hover:not(:disabled) {
        background-color: var(--color-gray-800);
      }

      .pagination--minimal .pagination__button--current {
        background-color: var(--color-primary-900);
        color: var(--color-primary-100);
      }

      .pagination--minimal .pagination__button--current:hover {
        background-color: var(--color-primary-800);
      }
    }

    /* Print styles */
    @media print {
      .pagination__button {
        border: 1px solid black !important;
        background-color: white !important;
        color: black !important;
      }

      .pagination__button--current {
        background-color: black !important;
        color: white !important;
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const paginationClasses = this._getPaginationClasses();
    const attributes = this._getAttributes();
    const items = this._generatePaginationItems();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      state: this.state,
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      totalItems: this.totalItems,
      itemsPerPage: this.itemsPerPage,
    });

    return html`
      <nav
        class="${paginationClasses}"
        ${attributes}
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        tabindex="0"
        role="navigation"
        aria-label="${this.ariaLabel || 'Pagination navigation'}"
      >
        <ul class="pagination__list">
          ${items.map((item, index) => this._renderPaginationItem(item, index))}
        </ul>
      </nav>
    `;
  }

  /**
   * Get pagination CSS classes
   */
  private _getPaginationClasses(): string {
    const classes = ['pagination'];
    classes.push(`pagination--${this.variant}`);
    classes.push(`pagination--${this.size}`);

    if (this.state !== 'default') {
      classes.push(`pagination--${this.state}`);
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
   * Generate pagination items based on current state
   */
  private _generatePaginationItems(): PaginationItem[] {
    const items: PaginationItem[] = [];
    const totalPages = Math.max(1, this.totalPages);
    const currentPage = Math.max(1, Math.min(this.currentPage, totalPages));

    // First page button
    if (this.showFirstLast && currentPage > 2) {
      items.push({
        page: 1,
        label: '1',
        type: 'first',
      });
    }

    // Previous page button
    if (this.showPreviousNext && currentPage > 1) {
      items.push({
        page: currentPage - 1,
        label: 'Previous',
        type: 'previous',
      });
    }

    // Page numbers
    const pageNumbers = this._generatePageNumbers(currentPage, totalPages);
    pageNumbers.forEach(page => {
      if (page === 'ellipsis') {
        items.push({
          page: 0,
          label: '…',
          type: 'ellipsis',
        });
      } else {
        items.push({
          page: page,
          label: page.toString(),
          type: 'page',
          current: page === currentPage,
        });
      }
    });

    // Next page button
    if (this.showPreviousNext && currentPage < totalPages) {
      items.push({
        page: currentPage + 1,
        label: 'Next',
        type: 'next',
      });
    }

    // Last page button
    if (this.showFirstLast && currentPage < totalPages - 1) {
      items.push({
        page: totalPages,
        label: totalPages.toString(),
        type: 'last',
      });
    }

    return items;
  }

  /**
   * Generate page numbers with ellipsis
   */
  private _generatePageNumbers(
    currentPage: number,
    totalPages: number
  ): (number | 'ellipsis')[] {
    const maxVisible = this.maxVisiblePages;
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate range around current page
      const halfVisible = Math.floor(maxVisible / 2);
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, currentPage + halfVisible);

      // Adjust range if we're near the beginning or end
      if (currentPage <= halfVisible) {
        end = Math.min(totalPages, maxVisible);
      }
      if (currentPage > totalPages - halfVisible) {
        start = Math.max(1, totalPages - maxVisible + 1);
      }

      // Add first page and ellipsis if needed
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('ellipsis');
        }
      }

      // Add page range
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('ellipsis');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  }

  /**
   * Render a pagination item
   */
  private _renderPaginationItem(
    item: PaginationItem,
    index: number
  ): TemplateResult {
    const buttonClasses = this._getButtonClasses(item);
    const isDisabled = item.disabled || this.state === 'disabled';

    return html`
      <li class="pagination__item">
        <button
          class="${buttonClasses}"
          @click="${(e: Event) => this._handleItemClick(e, item, index)}"
          ?disabled="${isDisabled}"
          aria-label="${this._getAriaLabel(item)}"
          aria-current="${item.current ? 'page' : undefined}"
        >
          ${this._renderButtonContent(item)}
        </button>
      </li>
    `;
  }

  /**
   * Get button CSS classes
   */
  private _getButtonClasses(item: PaginationItem): string {
    const classes = ['pagination__button'];

    if (item.current) {
      classes.push('pagination__button--current');
    }

    if (item.disabled) {
      classes.push('pagination__button--disabled');
    }

    if (item.type === 'ellipsis') {
      classes.push('pagination__button--ellipsis');
    }

    return classes.join(' ');
  }

  /**
   * Get ARIA label for button
   */
  private _getAriaLabel(item: PaginationItem): string {
    switch (item.type) {
      case 'first':
        return 'Go to first page';
      case 'previous':
        return 'Go to previous page';
      case 'next':
        return 'Go to next page';
      case 'last':
        return 'Go to last page';
      case 'page':
        return `Go to page ${item.page}`;
      case 'ellipsis':
        return 'More pages';
      default:
        return item.label || `Page ${item.page}`;
    }
  }

  /**
   * Render button content
   */
  private _renderButtonContent(item: PaginationItem): TemplateResult {
    if (item.type === 'ellipsis') {
      return html`${item.label}`;
    }

    if (item.type === 'previous') {
      return html`
        <svg class="pagination__icon" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        <span class="sr-only">Previous</span>
      `;
    }

    if (item.type === 'next') {
      return html`
        <svg class="pagination__icon" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
        <span class="sr-only">Next</span>
      `;
    }

    if (item.type === 'first') {
      return html`
        <svg class="pagination__icon" viewBox="0 0 24 24">
          <path d="M18.41 7.41L17 6l-6 6 6 6 1.41-1.41L13.83 12zM6 6h2v12H6z" />
        </svg>
        <span class="sr-only">First</span>
      `;
    }

    if (item.type === 'last') {
      return html`
        <svg class="pagination__icon" viewBox="0 0 24 24">
          <path d="M5.59 7.41L7 6l6 6-6 6-1.41-1.41L10.17 12zM16 6h2v12h-2z" />
        </svg>
        <span class="sr-only">Last</span>
      `;
    }

    return html`${item.label}`;
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
        currentPage: this.currentPage,
        totalPages: this.totalPages,
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
        currentPage: this.currentPage,
        totalPages: this.totalPages,
      },
      event
    );
  }

  /**
   * Handle pagination item click
   */
  private _handleItemClick(
    event: Event,
    item: PaginationItem,
    index: number
  ): void {
    if (
      item.disabled ||
      item.type === 'ellipsis' ||
      this.state === 'disabled'
    ) {
      event.preventDefault();
      return;
    }

    this.dispatchDesignSystemEvent(
      'navigate',
      {
        item: item,
        index: index,
        page: item.page,
        type: item.type,
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

    // Validate numeric properties
    this.currentPage = this.validateRange(this.currentPage, 1, Infinity, 1);
    this.totalPages = this.validateRange(this.totalPages, 1, Infinity, 1);
    this.itemsPerPage = this.validateRange(this.itemsPerPage, 1, Infinity, 10);
    this.totalItems = this.validateRange(this.totalItems, 0, Infinity, 0);
    this.maxVisiblePages = this.validateRange(this.maxVisiblePages, 3, 15, 7);

    // Calculate total pages from total items if not provided
    if (this.totalItems > 0 && this.totalPages === 1) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    }

    // Ensure current page is within bounds
    this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPages));
  }

  /**
   * Public method to focus the pagination
   */
  public override focus(): void {
    const paginationElement = this.shadowRoot?.querySelector(
      '.pagination'
    ) as HTMLElement;
    if (paginationElement) {
      paginationElement.focus();
    }
  }

  /**
   * Public method to blur the pagination
   */
  public override blur(): void {
    const paginationElement = this.shadowRoot?.querySelector(
      '.pagination'
    ) as HTMLElement;
    if (paginationElement) {
      paginationElement.blur();
    }
  }

  /**
   * Public method to go to a specific page
   */
  public goToPage(page: number): void {
    const validPage = Math.max(1, Math.min(page, this.totalPages));
    if (validPage !== this.currentPage) {
      this.currentPage = validPage;
      this.requestUpdate();
    }
  }

  /**
   * Public method to go to the next page
   */
  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  /**
   * Public method to go to the previous page
   */
  public previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  /**
   * Public method to go to the first page
   */
  public firstPage(): void {
    this.goToPage(1);
  }

  /**
   * Public method to go to the last page
   */
  public lastPage(): void {
    this.goToPage(this.totalPages);
  }

  /**
   * Public method to get pagination info
   */
  public getPaginationInfo(): {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    startItem: number;
    endItem: number;
  } {
    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(
      this.currentPage * this.itemsPerPage,
      this.totalItems
    );

    return {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      totalItems: this.totalItems,
      itemsPerPage: this.itemsPerPage,
      startItem: this.totalItems > 0 ? startItem : 0,
      endItem: this.totalItems > 0 ? endItem : 0,
    };
  }

  /**
   * Public method to get pagination dimensions
   */
  public getDimensions(): { width: number; height: number } {
    const paginationElement = this.shadowRoot?.querySelector(
      '.pagination'
    ) as HTMLElement;
    if (paginationElement) {
      const rect = paginationElement.getBoundingClientRect();
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
    'ds-pagination': Pagination;
  }
}
