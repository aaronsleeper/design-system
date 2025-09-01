import { html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Drawer component variants
 */
export type DrawerVariant = 'default' | 'overlay' | 'push';

/**
 * Drawer component sizes
 */
export type DrawerSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Drawer component properties interface
 */
export interface DrawerProperties {
  variant?: DrawerVariant;
  size?: DrawerSize;
  disabled?: boolean;
  open?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: string;
}

/**
 * Drawer Component
 *
 * A comprehensive drawer navigation component with multiple variants, sizes, and states.
 * Supports overlay, push, and default positioning with proper accessibility features.
 *
 * @example
 * ```html
 * <ds-drawer variant="default" size="medium">Navigation content</ds-drawer>
 * <ds-drawer variant="overlay" open>Overlay drawer</ds-drawer>
 * <ds-drawer variant="push" position="right">Push drawer</ds-drawer>
 * ```
 *
 * @fires ds-drawer-render - Fired when the drawer is rendered
 * @fires ds-drawer-toggle - Fired when the drawer is toggled (opened/closed)
 * @fires ds-drawer-focus - Fired when the drawer receives focus
 * @fires ds-drawer-blur - Fired when the drawer loses focus
 */
@customElement('ds-drawer')
export class Drawer extends DesignSystemElement {
  /**
   * Drawer variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: DrawerVariant = 'default';

  /**
   * Drawer size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: DrawerSize = 'medium';

  /**
   * Whether the drawer is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the drawer is open
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Drawer position
   * @default 'left'
   */
  @property({ type: String, reflect: true })
  position: 'left' | 'right' | 'top' | 'bottom' = 'left';

  /**
   * Accessible label for the drawer
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the drawer
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * Whether the drawer is expanded
   */
  @property({ type: String, attribute: 'aria-expanded' })
  override ariaExpanded?: string | null;

  /**
   * Internal state for tracking if drawer is currently open
   */
  @state()
  private _isOpen = false;

  /**
   * Component styles
   */
  static override styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 1000;
      background-color: var(--color-background-elevated);
      border: 1px solid var(--color-border);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: all 0.3s ease-in-out;
      overflow: hidden;
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Position variants */
    :host([position='left']) {
      top: 0;
      left: 0;
      height: 100vh;
      transform: translateX(-100%);
    }

    :host([position='right']) {
      top: 0;
      right: 0;
      height: 100vh;
      transform: translateX(100%);
    }

    :host([position='top']) {
      top: 0;
      left: 0;
      width: 100vw;
      transform: translateY(-100%);
    }

    :host([position='bottom']) {
      bottom: 0;
      left: 0;
      width: 100vw;
      transform: translateY(100%);
    }

    /* Open state */
    :host([open]) {
      transform: translateX(0) translateY(0);
    }

    /* Size variants for horizontal drawers */
    :host([position='left']),
    :host([position='right']) {
      width: 300px;
    }

    :host([size='small'][position='left']),
    :host([size='small'][position='right']) {
      width: 250px;
    }

    :host([size='medium'][position='left']),
    :host([size='medium'][position='right']) {
      width: 300px;
    }

    :host([size='large'][position='left']),
    :host([size='large'][position='right']) {
      width: 400px;
    }

    :host([size='xlarge'][position='left']),
    :host([size='xlarge'][position='right']) {
      width: 500px;
    }

    /* Size variants for vertical drawers */
    :host([position='top']),
    :host([position='bottom']) {
      height: 300px;
    }

    :host([size='small'][position='top']),
    :host([size='small'][position='bottom']) {
      height: 250px;
    }

    :host([size='medium'][position='top']),
    :host([size='medium'][position='bottom']) {
      height: 300px;
    }

    :host([size='large'][position='top']),
    :host([size='large'][position='bottom']) {
      height: 400px;
    }

    :host([size='xlarge'][position='top']),
    :host([size='xlarge'][position='bottom']) {
      height: 500px;
    }

    .drawer {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background-color: var(--color-background-elevated);
    }

    .drawer:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .drawer:focus:not(:focus-visible) {
      outline: none;
    }

    .drawer:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Variant styles - Default */
    .drawer--default {
      background-color: var(--color-background-elevated);
      border-color: var(--color-border);
    }

    /* Variant styles - Overlay */
    .drawer--overlay {
      background-color: var(--color-background-elevated);
      border-color: var(--color-border);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    /* Variant styles - Push */
    .drawer--push {
      background-color: var(--color-background-elevated);
      border-color: var(--color-border);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    /* Drawer header */
    .drawer__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-4);
      border-bottom: 1px solid var(--color-border);
      background-color: var(--color-background);
      flex-shrink: 0;
    }

    .drawer__title {
      font-family: var(--font-family-sans);
      font-size: var(--font-size-4);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0;
    }

    .drawer__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: var(--border-radius-sm);
      transition: background-color 0.2s ease-in-out;
      color: var(--color-text-secondary);
    }

    .drawer__close:hover:not(:disabled) {
      background-color: var(--color-gray-100);
    }

    .drawer__close:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .drawer__close:focus:not(:focus-visible) {
      outline: none;
    }

    .drawer__close:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .drawer__close-icon {
      width: 16px;
      height: 16px;
      font-size: var(--font-size-3);
      line-height: 1;
    }

    /* Drawer content */
    .drawer__content {
      flex: 1;
      padding: var(--spacing-4);
      overflow-y: auto;
    }

    .drawer__content::-webkit-scrollbar {
      width: 6px;
    }

    .drawer__content::-webkit-scrollbar-track {
      background: var(--color-gray-100);
      border-radius: 3px;
    }

    .drawer__content::-webkit-scrollbar-thumb {
      background: var(--color-gray-300);
      border-radius: 3px;
    }

    .drawer__content::-webkit-scrollbar-thumb:hover {
      background: var(--color-gray-400);
    }

    /* Drawer footer */
    .drawer__footer {
      padding: var(--spacing-4);
      border-top: 1px solid var(--color-border);
      background-color: var(--color-background);
      flex-shrink: 0;
    }

    /* Overlay backdrop for overlay variant */
    .drawer__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--color-background-overlay);
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .drawer--overlay[open] .drawer__backdrop {
      opacity: 1;
    }

    /* Responsive behavior */
    @media (max-width: 768px) {
      :host([position='left']),
      :host([position='right']) {
        width: 100vw;
        max-width: 320px;
      }

      :host([position='top']),
      :host([position='bottom']) {
        height: 50vh;
        max-height: 400px;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .drawer {
        border-width: 2px;
      }

      .drawer:focus {
        outline-width: 3px;
      }

      .drawer__close:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      :host,
      .drawer__backdrop {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .drawer {
        background-color: var(--color-gray-800);
        border-color: var(--color-gray-700);
      }

      .drawer__header,
      .drawer__footer {
        background-color: var(--color-gray-900);
        border-color: var(--color-gray-700);
      }

      .drawer__title {
        color: var(--color-text-inverse);
      }

      .drawer__close {
        color: var(--color-gray-300);
      }

      .drawer__close:hover:not(:disabled) {
        background-color: var(--color-gray-700);
      }

      .drawer__content::-webkit-scrollbar-track {
        background: var(--color-gray-700);
      }

      .drawer__content::-webkit-scrollbar-thumb {
        background: var(--color-gray-600);
      }

      .drawer__content::-webkit-scrollbar-thumb:hover {
        background: var(--color-gray-500);
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const drawerClasses = this._getDrawerClasses();
    const isOpen = this._isOpen;

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      open: isOpen,
      position: this.position,
    });

    return html`
      <div class="${drawerClasses}" role="dialog" aria-modal="true">
        ${this.variant === 'overlay'
          ? html`<div class="drawer__backdrop"></div>`
          : ''}
        <div
          class="drawer"
          aria-label="${this.ariaLabel || 'Drawer'}"
          aria-describedby="${this.ariaDescribedBy || undefined}"
          aria-expanded="${isOpen ? 'true' : 'false'}"
          tabindex="0"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @keydown="${this._handleKeyDown}"
        >
          ${this._renderHeader()}
          <div class="drawer__content">
            <slot></slot>
          </div>
          <div class="drawer__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render drawer header with close button
   */
  private _renderHeader(): TemplateResult {
    return html`
      <div class="drawer__header">
        <h2 class="drawer__title">
          <slot name="title">Drawer</slot>
        </h2>
        <button
          class="drawer__close"
          type="button"
          aria-label="Close drawer"
          @click="${this._handleClose}"
        >
          <span class="drawer__close-icon" aria-hidden="true">×</span>
        </button>
      </div>
    `;
  }

  /**
   * Get drawer CSS classes
   */
  private _getDrawerClasses(): string {
    const classes = ['drawer'];
    classes.push(`drawer--${this.variant}`);

    if (this._isOpen) {
      classes.push('drawer--open');
    }

    return classes.join(' ');
  }

  /**
   * Handle close button click
   */
  private _handleClose(event: Event): void {
    if (this.disabled) {
      return;
    }

    this._isOpen = false;
    this.open = false;

    // Dispatch toggle event
    this.dispatchDesignSystemEvent(
      'toggle',
      {
        variant: this.variant,
        size: this.size,
        open: this._isOpen,
        position: this.position,
      },
      event
    );

    // Announce to screen readers
    this.announceToScreenReader('Drawer closed');
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
        open: this._isOpen,
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
        open: this._isOpen,
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

    // Handle Escape key to close drawer
    if (event.key === 'Escape' && this._isOpen) {
      event.preventDefault();
      this._handleClose(event);
    }

    // Handle Enter and Space keys on close button
    if ((event.key === 'Enter' || event.key === ' ') && this._isOpen) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('drawer__close')) {
        event.preventDefault();
        this._handleClose(event);
      }
    }
  }

  /**
   * Open the drawer (public method)
   */
  public openDrawer(): void {
    if (!this._isOpen) {
      this._isOpen = true;
      this.open = true;

      // Dispatch toggle event
      this.dispatchDesignSystemEvent('toggle', {
        variant: this.variant,
        size: this.size,
        open: this._isOpen,
        position: this.position,
      });

      // Announce to screen readers
      this.announceToScreenReader('Drawer opened');
    }
  }

  /**
   * Close the drawer (public method)
   */
  public closeDrawer(): void {
    if (this._isOpen) {
      this._handleClose(new Event('click'));
    }
  }

  /**
   * Toggle the drawer open/closed state (public method)
   */
  public toggle(): void {
    if (this._isOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  /**
   * Get the current open state
   */
  public getOpenState(): boolean {
    return this._isOpen;
  }

  /**
   * Get the drawer dimensions
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

    // Initialize open state
    this._isOpen = this.open;

    // Validate variant
    this.variant = this.validateEnum(
      this.variant,
      ['default', 'overlay', 'push'],
      'default'
    );

    // Validate size
    this.size = this.validateEnum(
      this.size,
      ['small', 'medium', 'large', 'xlarge'],
      'medium'
    );

    // Validate position
    this.position = this.validateEnum(
      this.position,
      ['left', 'right', 'top', 'bottom'],
      'left'
    );

    // Set initial ARIA expanded state
    this.ariaExpanded = this._isOpen ? 'true' : 'false';
  }

  /**
   * Update ARIA attributes when open state changes
   */
  override updated(changedProperties: Map<string, any>): void {
    super.updated(changedProperties);

    if (changedProperties.has('_isOpen')) {
      this.ariaExpanded = this._isOpen ? 'true' : 'false';
    }

    if (changedProperties.has('open')) {
      this._isOpen = this.open;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-drawer': Drawer;
  }
}
