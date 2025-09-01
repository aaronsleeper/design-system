import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Container component variants
 */
export type ContainerVariant = 'default' | 'fluid' | 'fixed';

/**
 * Container component sizes
 */
export type ContainerSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Container component properties interface
 */
export interface ContainerProperties {
  variant?: ContainerVariant;
  size?: ContainerSize;
  disabled?: boolean;
  maxWidth?: string;
  padding?: string;
  margin?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
}

/**
 * Container Component
 *
 * A flexible container component for layout and content organization.
 * Provides consistent spacing, max-width constraints, and responsive behavior.
 *
 * @example
 * ```html
 * <ds-container variant="fixed" size="large">Content here</ds-container>
 * <ds-container variant="fluid" size="medium" disabled>Disabled container</ds-container>
 * <ds-container variant="default" size="small" max-width="800px">Custom width</ds-container>
 * ```
 *
 * @fires ds-container-render - Fired when the container is rendered
 */
@customElement('ds-container')
export class Container extends DesignSystemElement {
  /**
   * Container variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: ContainerVariant = 'default';

  /**
   * Container size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: ContainerSize = 'medium';

  /**
   * Whether the container is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Maximum width of the container
   */
  @property({ type: String, attribute: 'max-width' })
  maxWidth?: string;

  /**
   * Custom padding for the container
   */
  @property({ type: String })
  padding?: string;

  /**
   * Custom margin for the container
   */
  @property({ type: String })
  margin?: string;

  /**
   * Accessible label for the container
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string | null;

  /**
   * ID of element that describes the container
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * ARIA role for the container
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

    .container {
      display: block;
      position: relative;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      transition: all 0.2s ease-in-out;
    }

    .container:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .container:focus:not(:focus-visible) {
      outline: none;
    }

    .container:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Variant styles - Default */
    .container--default {
      max-width: 100%;
    }

    /* Variant styles - Fluid */
    .container--fluid {
      max-width: 100%;
      padding-left: var(--spacing-4);
      padding-right: var(--spacing-4);
    }

    /* Variant styles - Fixed */
    .container--fixed {
      max-width: 1200px;
      padding-left: var(--spacing-4);
      padding-right: var(--spacing-4);
    }

    /* Size variants */
    .container--small {
      padding-top: var(--spacing-4);
      padding-bottom: var(--spacing-4);
    }

    .container--small.container--fluid,
    .container--small.container--fixed {
      padding-left: var(--spacing-3);
      padding-right: var(--spacing-3);
    }

    .container--medium {
      padding-top: var(--spacing-6);
      padding-bottom: var(--spacing-6);
    }

    .container--medium.container--fluid,
    .container--medium.container--fixed {
      padding-left: var(--spacing-4);
      padding-right: var(--spacing-4);
    }

    .container--large {
      padding-top: var(--spacing-8);
      padding-bottom: var(--spacing-8);
    }

    .container--large.container--fluid,
    .container--large.container--fixed {
      padding-left: var(--spacing-6);
      padding-right: var(--spacing-6);
    }

    .container--xlarge {
      padding-top: var(--spacing-12);
      padding-bottom: var(--spacing-12);
    }

    .container--xlarge.container--fluid,
    .container--xlarge.container--fixed {
      padding-left: var(--spacing-8);
      padding-right: var(--spacing-8);
    }

    /* Responsive breakpoints */
    @media (min-width: 640px) {
      .container--fluid,
      .container--fixed {
        padding-left: var(--spacing-6);
        padding-right: var(--spacing-6);
      }

      .container--small.container--fluid,
      .container--small.container--fixed {
        padding-left: var(--spacing-4);
        padding-right: var(--spacing-4);
      }

      .container--large.container--fluid,
      .container--large.container--fixed {
        padding-left: var(--spacing-8);
        padding-right: var(--spacing-8);
      }

      .container--xlarge.container--fluid,
      .container--xlarge.container--fixed {
        padding-left: var(--spacing-10);
        padding-right: var(--spacing-10);
      }
    }

    @media (min-width: 768px) {
      .container--fixed {
        max-width: 768px;
      }

      .container--fluid,
      .container--fixed {
        padding-left: var(--spacing-8);
        padding-right: var(--spacing-8);
      }

      .container--small.container--fluid,
      .container--small.container--fixed {
        padding-left: var(--spacing-6);
        padding-right: var(--spacing-6);
      }

      .container--large.container--fluid,
      .container--large.container--fixed {
        padding-left: var(--spacing-10);
        padding-right: var(--spacing-10);
      }

      .container--xlarge.container--fluid,
      .container--xlarge.container--fixed {
        padding-left: var(--spacing-12);
        padding-right: var(--spacing-12);
      }
    }

    @media (min-width: 1024px) {
      .container--fixed {
        max-width: 1024px;
      }

      .container--fluid,
      .container--fixed {
        padding-left: var(--spacing-10);
        padding-right: var(--spacing-10);
      }

      .container--small.container--fluid,
      .container--small.container--fixed {
        padding-left: var(--spacing-8);
        padding-right: var(--spacing-8);
      }

      .container--large.container--fluid,
      .container--large.container--fixed {
        padding-left: var(--spacing-12);
        padding-right: var(--spacing-12);
      }

      .container--xlarge.container--fluid,
      .container--xlarge.container--fixed {
        padding-left: var(--spacing-16);
        padding-right: var(--spacing-16);
      }
    }

    @media (min-width: 1280px) {
      .container--fixed {
        max-width: 1280px;
      }

      .container--fluid,
      .container--fixed {
        padding-left: var(--spacing-12);
        padding-right: var(--spacing-12);
      }

      .container--small.container--fluid,
      .container--small.container--fixed {
        padding-left: var(--spacing-10);
        padding-right: var(--spacing-10);
      }

      .container--large.container--fluid,
      .container--large.container--fixed {
        padding-left: var(--spacing-16);
        padding-right: var(--spacing-16);
      }

      .container--xlarge.container--fluid,
      .container--xlarge.container--fixed {
        padding-left: var(--spacing-20);
        padding-right: var(--spacing-20);
      }
    }

    @media (min-width: 1536px) {
      .container--fixed {
        max-width: 1536px;
      }
    }

    /* Disabled state */
    :host([disabled]) .container {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .container:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .container {
        transition: none;
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const containerClasses = this._getContainerClasses();
    const containerStyles = this._getContainerStyles();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
      maxWidth: this.maxWidth,
    });

    return html`
      <div
        class="${containerClasses}"
        style="${containerStyles}"
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
   * Get container CSS classes
   */
  private _getContainerClasses(): string {
    const classes = ['container'];
    classes.push(`container--${this.variant}`);
    classes.push(`container--${this.size}`);

    return classes.join(' ');
  }

  /**
   * Get container inline styles
   */
  private _getContainerStyles(): string {
    const styles: string[] = [];

    if (this.maxWidth) {
      styles.push(`max-width: ${this.maxWidth}`);
    }

    if (this.padding) {
      styles.push(`padding: ${this.padding}`);
    }

    if (this.margin) {
      styles.push(`margin: ${this.margin}`);
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
        },
        event
      );
    }
  }

  /**
   * Public method to focus the container
   */
  public override focus(): void {
    if (!this.disabled) {
      const container = this.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      if (container) {
        container.focus();
      }
    }
  }

  /**
   * Public method to blur the container
   */
  public override blur(): void {
    const container = this.shadowRoot?.querySelector(
      '.container'
    ) as HTMLElement;
    if (container) {
      container.blur();
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
      ['default', 'fluid', 'fixed'],
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
    'ds-container': Container;
  }
}
