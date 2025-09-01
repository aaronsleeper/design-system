import { html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Sidebar component variants
 */
export type SidebarVariant = 'default' | 'collapsed' | 'expanded';

/**
 * Sidebar component sizes
 */
export type SidebarSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Sidebar component properties interface
 */
export interface SidebarProperties {
  variant?: SidebarVariant;
  size?: SidebarSize;
  disabled?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  position?: 'left' | 'right';
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: string;
}

/**
 * Sidebar Component
 *
 * A comprehensive sidebar navigation component with multiple variants, sizes, and states.
 * Supports collapsible functionality and proper accessibility features.
 *
 * @example
 * ```html
 * <ds-sidebar variant="default" size="medium">Navigation content</ds-sidebar>
 * <ds-sidebar variant="collapsed" collapsible>Collapsed sidebar</ds-sidebar>
 * <ds-sidebar variant="expanded" position="right">Right sidebar</ds-sidebar>
 * ```
 *
 * @fires ds-sidebar-render - Fired when the sidebar is rendered
 * @fires ds-sidebar-toggle - Fired when the sidebar is toggled (collapsed/expanded)
 * @fires ds-sidebar-focus - Fired when the sidebar receives focus
 * @fires ds-sidebar-blur - Fired when the sidebar loses focus
 */
@customElement('ds-sidebar')
export class Sidebar extends DesignSystemElement {
  /**
   * Sidebar variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: SidebarVariant = 'default';

  /**
   * Sidebar size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: SidebarSize = 'medium';

  /**
   * Whether the sidebar is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the sidebar is collapsible
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  collapsible = false;

  /**
   * Whether the sidebar is collapsed (for collapsible sidebars)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /**
   * Sidebar position
   * @default 'left'
   */
  @property({ type: String, reflect: true })
  position: 'left' | 'right' = 'left';

  /**
   * Accessible label for the sidebar
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the sidebar
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * Whether the sidebar is expanded (for collapsible sidebars)
   */
  @property({ type: String, attribute: 'aria-expanded' })
  override ariaExpanded?: string | null;

  /**
   * Internal state for tracking if sidebar is currently collapsed
   */
  @state()
  private _isCollapsed = false;

  /**
   * Component styles
   */
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      background-color: var(--color-background-elevated);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-md);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
      overflow: hidden;
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    :host([position='right']) {
      order: 1;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 200px;
    }

    .sidebar:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .sidebar:focus:not(:focus-visible) {
      outline: none;
    }

    .sidebar:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Size variants */
    .sidebar--small {
      min-width: 200px;
      max-width: 250px;
    }

    .sidebar--medium {
      min-width: 250px;
      max-width: 300px;
    }

    .sidebar--large {
      min-width: 300px;
      max-width: 400px;
    }

    .sidebar--xlarge {
      min-width: 400px;
      max-width: 500px;
    }

    /* Variant styles - Default */
    .sidebar--default {
      background-color: var(--color-background-elevated);
      border-color: var(--color-border);
    }

    /* Variant styles - Collapsed */
    .sidebar--collapsed {
      min-width: 60px;
      max-width: 60px;
    }

    .sidebar--collapsed .sidebar__content {
      display: none;
    }

    .sidebar--collapsed .sidebar__toggle {
      justify-content: center;
    }

    .sidebar--collapsed .sidebar__toggle-text {
      display: none;
    }

    /* Variant styles - Expanded */
    .sidebar--expanded {
      min-width: 300px;
      max-width: 400px;
    }

    /* Sidebar header */
    .sidebar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-4);
      border-bottom: 1px solid var(--color-border);
      background-color: var(--color-background);
    }

    .sidebar__title {
      font-family: var(--font-family-sans);
      font-size: var(--font-size-4);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0;
    }

    .sidebar__toggle {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      padding: var(--spacing-2);
      border: none;
      background: none;
      cursor: pointer;
      border-radius: var(--border-radius-sm);
      transition: background-color 0.2s ease-in-out;
      color: var(--color-text-secondary);
    }

    .sidebar__toggle:hover:not(:disabled) {
      background-color: var(--color-gray-100);
    }

    .sidebar__toggle:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .sidebar__toggle:focus:not(:focus-visible) {
      outline: none;
    }

    .sidebar__toggle:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .sidebar__toggle-icon {
      width: 16px;
      height: 16px;
      transition: transform 0.3s ease-in-out;
    }

    .sidebar--collapsed .sidebar__toggle-icon {
      transform: rotate(180deg);
    }

    .sidebar__toggle-text {
      font-size: var(--font-size-2);
      font-weight: var(--font-weight-medium);
    }

    /* Sidebar content */
    .sidebar__content {
      flex: 1;
      padding: var(--spacing-4);
      overflow-y: auto;
    }

    .sidebar__content::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar__content::-webkit-scrollbar-track {
      background: var(--color-gray-100);
      border-radius: 3px;
    }

    .sidebar__content::-webkit-scrollbar-thumb {
      background: var(--color-gray-300);
      border-radius: 3px;
    }

    .sidebar__content::-webkit-scrollbar-thumb:hover {
      background: var(--color-gray-400);
    }

    /* Sidebar footer */
    .sidebar__footer {
      padding: var(--spacing-4);
      border-top: 1px solid var(--color-border);
      background-color: var(--color-background);
    }

    /* Collapsible functionality */
    .sidebar--collapsible {
      transition: width 0.3s ease-in-out, min-width 0.3s ease-in-out,
        max-width 0.3s ease-in-out;
    }

    /* Responsive behavior */
    @media (max-width: 768px) {
      .sidebar--medium,
      .sidebar--large,
      .sidebar--xlarge {
        min-width: 100%;
        max-width: 100%;
      }

      .sidebar--collapsed {
        min-width: 60px;
        max-width: 60px;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .sidebar {
        border-width: 2px;
      }

      .sidebar:focus {
        outline-width: 3px;
      }

      .sidebar__toggle:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .sidebar,
      .sidebar--collapsible,
      .sidebar__toggle-icon {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .sidebar {
        background-color: var(--color-gray-800);
        border-color: var(--color-gray-700);
      }

      .sidebar__header,
      .sidebar__footer {
        background-color: var(--color-gray-900);
        border-color: var(--color-gray-700);
      }

      .sidebar__title {
        color: var(--color-text-inverse);
      }

      .sidebar__toggle {
        color: var(--color-gray-300);
      }

      .sidebar__toggle:hover:not(:disabled) {
        background-color: var(--color-gray-700);
      }

      .sidebar__content::-webkit-scrollbar-track {
        background: var(--color-gray-700);
      }

      .sidebar__content::-webkit-scrollbar-thumb {
        background: var(--color-gray-600);
      }

      .sidebar__content::-webkit-scrollbar-thumb:hover {
        background: var(--color-gray-500);
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const sidebarClasses = this._getSidebarClasses();
    const isCollapsed = this.collapsible ? this._isCollapsed : this.collapsed;

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      collapsible: this.collapsible,
      collapsed: isCollapsed,
      position: this.position,
    });

    return html`
      <nav
        class="${sidebarClasses}"
        role="navigation"
        aria-label="${this.ariaLabel || 'Sidebar navigation'}"
        aria-describedby="${this.ariaDescribedBy || undefined}"
        aria-expanded="${this.collapsible
          ? isCollapsed
            ? 'false'
            : 'true'
          : undefined}"
        tabindex="0"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        @keydown="${this._handleKeyDown}"
      >
        ${this.collapsible ? this._renderHeader() : ''}
        <div class="sidebar__content">
          <slot></slot>
        </div>
        <div class="sidebar__footer">
          <slot name="footer"></slot>
        </div>
      </nav>
    `;
  }

  /**
   * Render sidebar header with toggle button
   */
  private _renderHeader(): TemplateResult {
    const isCollapsed = this._isCollapsed;
    const toggleIcon = isCollapsed ? '→' : '←';

    return html`
      <div class="sidebar__header">
        <h2 class="sidebar__title">
          <slot name="title">Navigation</slot>
        </h2>
        <button
          class="sidebar__toggle"
          type="button"
          aria-label="${isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}"
          @click="${this._handleToggle}"
        >
          <span class="sidebar__toggle-icon" aria-hidden="true"
            >${toggleIcon}</span
          >
          <span class="sidebar__toggle-text"
            >${isCollapsed ? 'Expand' : 'Collapse'}</span
          >
        </button>
      </div>
    `;
  }

  /**
   * Get sidebar CSS classes
   */
  private _getSidebarClasses(): string {
    const classes = ['sidebar'];
    classes.push(`sidebar--${this.variant}`);
    classes.push(`sidebar--${this.size}`);

    if (this.collapsible) {
      classes.push('sidebar--collapsible');
    }

    if (this.collapsible && this._isCollapsed) {
      classes.push('sidebar--collapsed');
    }

    return classes.join(' ');
  }

  /**
   * Handle toggle button click
   */
  private _handleToggle(event: Event): void {
    if (this.disabled || !this.collapsible) {
      return;
    }

    this._isCollapsed = !this._isCollapsed;
    this.collapsed = this._isCollapsed;

    // Dispatch toggle event
    this.dispatchDesignSystemEvent(
      'toggle',
      {
        variant: this.variant,
        size: this.size,
        collapsed: this._isCollapsed,
        position: this.position,
      },
      event
    );

    // Announce to screen readers
    this.announceToScreenReader(
      this._isCollapsed ? 'Sidebar collapsed' : 'Sidebar expanded'
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
        collapsible: this.collapsible,
        collapsed: this._isCollapsed,
        position: this.position,
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
        collapsible: this.collapsible,
        collapsed: this._isCollapsed,
        position: this.position,
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

    // Handle Escape key to collapse if collapsible
    if (event.key === 'Escape' && this.collapsible && !this._isCollapsed) {
      event.preventDefault();
      this._handleToggle(event);
    }

    // Handle Enter and Space keys on toggle button
    if ((event.key === 'Enter' || event.key === ' ') && this.collapsible) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('sidebar__toggle')) {
        event.preventDefault();
        this._handleToggle(event);
      }
    }
  }

  /**
   * Toggle the sidebar collapsed state (public method)
   */
  public toggle(): void {
    if (this.collapsible) {
      this._handleToggle(new Event('click'));
    }
  }

  /**
   * Collapse the sidebar (public method)
   */
  public collapse(): void {
    if (this.collapsible && !this._isCollapsed) {
      this._handleToggle(new Event('click'));
    }
  }

  /**
   * Expand the sidebar (public method)
   */
  public expand(): void {
    if (this.collapsible && this._isCollapsed) {
      this._handleToggle(new Event('click'));
    }
  }

  /**
   * Get the current collapsed state
   */
  public getCollapsedState(): boolean {
    return this._isCollapsed;
  }

  /**
   * Get the sidebar dimensions
   */
  public getDimensions(): { width: number; height: number } {
    const rect = this.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
    };
  }

  /**
   * Validate component properties
   */
  override connectedCallback(): void {
    super.connectedCallback();

    // Initialize collapsed state
    this._isCollapsed = this.collapsed;

    // Validate variant
    this.variant = this.validateEnum(
      this.variant,
      ['default', 'collapsed', 'expanded'],
      'default'
    );

    // Validate size
    this.size = this.validateEnum(
      this.size,
      ['small', 'medium', 'large', 'xlarge'],
      'medium'
    );

    // Validate position
    this.position = this.validateEnum(this.position, ['left', 'right'], 'left');

    // Set initial ARIA expanded state for collapsible sidebars
    if (this.collapsible) {
      this.ariaExpanded = this._isCollapsed ? 'false' : 'true';
    }
  }

  /**
   * Update ARIA attributes when collapsed state changes
   */
  override updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);

    if (changedProperties.has('_isCollapsed') && this.collapsible) {
      this.ariaExpanded = this._isCollapsed ? 'false' : 'true';
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-sidebar': Sidebar;
  }
}
