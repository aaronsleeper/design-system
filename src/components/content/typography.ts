import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Typography component variants
 */
export type TypographyVariant =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'heading-5'
  | 'heading-6'
  | 'body'
  | 'caption'
  | 'label';

/**
 * Typography component sizes
 */
export type TypographySize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Typography component weights
 */
export type TypographyWeight =
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold';

/**
 * Typography component colors
 */
export type TypographyColor = 'primary' | 'secondary' | 'muted' | 'inverse';

/**
 * Typography component properties interface
 */
export interface TypographyProperties {
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
  color?: TypographyColor;
  as?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLevel?: string;
}

/**
 * Typography Component
 *
 * A comprehensive typography component with multiple variants, sizes, weights, and colors.
 * Provides semantic HTML elements and proper accessibility attributes.
 *
 * @example
 * ```html
 * <ds-typography variant="heading-1" size="large" weight="bold">Main Title</ds-typography>
 * <ds-typography variant="body" size="medium" color="muted">Body text content</ds-typography>
 * <ds-typography variant="caption" size="small" as="span">Caption text</ds-typography>
 * ```
 *
 * @fires ds-typography-render - Fired when the typography component is rendered
 */
@customElement('ds-typography')
export class Typography extends DesignSystemElement {
  /**
   * Typography variant style
   * @default 'body'
   */
  @property({ type: String, reflect: true })
  variant: TypographyVariant = 'body';

  /**
   * Typography size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: TypographySize = 'medium';

  /**
   * Typography weight
   * @default 'normal'
   */
  @property({ type: String, reflect: true })
  weight: TypographyWeight = 'normal';

  /**
   * Typography color
   * @default 'primary'
   */
  @property({ type: String, reflect: true })
  color: TypographyColor = 'primary';

  /**
   * HTML element to render as (overrides semantic element)
   */
  @property({ type: String, reflect: true })
  as?: string;

  /**
   * Accessible label for the typography
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel?: string;

  /**
   * ID of element that describes the typography
   */
  @property({ type: String, attribute: 'aria-describedby' })
  ariaDescribedBy?: string;

  /**
   * ARIA level for headings
   */
  @property({ type: String, attribute: 'aria-level' })
  ariaLevel?: string;

  /**
   * Component styles
   */
  static override styles = css`
    :host {
      display: block;
      position: relative;
    }

    .typography {
      margin: 0;
      font-family: var(--font-family-sans);
      line-height: var(--line-height-normal);
      color: var(--color-text-primary);
      transition: color 0.2s ease-in-out;
    }

    /* Variant styles - Headings */
    .typography--heading-1 {
      font-size: var(--font-size-heading-1);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
      letter-spacing: var(--letter-spacing-tight);
      margin-bottom: var(--spacing-6);
    }

    .typography--heading-2 {
      font-size: var(--font-size-heading-2);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
      letter-spacing: var(--letter-spacing-tight);
      margin-bottom: var(--spacing-5);
    }

    .typography--heading-3 {
      font-size: var(--font-size-heading-3);
      font-weight: var(--font-weight-semibold);
      line-height: var(--line-height-tight);
      letter-spacing: var(--letter-spacing-tight);
      margin-bottom: var(--spacing-4);
    }

    .typography--heading-4 {
      font-size: var(--font-size-heading-4);
      font-weight: var(--font-weight-semibold);
      line-height: var(--line-height-normal);
      letter-spacing: var(--letter-spacing-normal);
      margin-bottom: var(--spacing-3);
    }

    .typography--heading-5 {
      font-size: var(--font-size-heading-5);
      font-weight: var(--font-weight-medium);
      line-height: var(--line-height-normal);
      letter-spacing: var(--letter-spacing-normal);
      margin-bottom: var(--spacing-3);
    }

    .typography--heading-6 {
      font-size: var(--font-size-heading-6);
      font-weight: var(--font-weight-medium);
      line-height: var(--line-height-normal);
      letter-spacing: var(--letter-spacing-normal);
      margin-bottom: var(--spacing-2);
    }

    /* Variant styles - Body */
    .typography--body {
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-normal);
      line-height: var(--line-height-relaxed);
      letter-spacing: var(--letter-spacing-normal);
      margin-bottom: var(--spacing-3);
    }

    /* Variant styles - Caption */
    .typography--caption {
      font-size: var(--font-size-caption);
      font-weight: var(--font-weight-normal);
      line-height: var(--line-height-normal);
      letter-spacing: var(--letter-spacing-normal);
      margin-bottom: var(--spacing-1);
    }

    /* Variant styles - Label */
    .typography--label {
      font-size: var(--font-size-label);
      font-weight: var(--font-weight-medium);
      line-height: var(--line-height-normal);
      letter-spacing: var(--letter-spacing-normal);
      margin-bottom: var(--spacing-1);
    }

    /* Size variants */
    .typography--small {
      font-size: var(--font-size-2);
    }

    .typography--medium {
      font-size: var(--font-size-3);
    }

    .typography--large {
      font-size: var(--font-size-4);
    }

    .typography--xlarge {
      font-size: var(--font-size-5);
    }

    /* Weight variants */
    .typography--light {
      font-weight: var(--font-weight-light);
    }

    .typography--normal {
      font-weight: var(--font-weight-normal);
    }

    .typography--medium {
      font-weight: var(--font-weight-medium);
    }

    .typography--semibold {
      font-weight: var(--font-weight-semibold);
    }

    .typography--bold {
      font-weight: var(--font-weight-bold);
    }

    /* Color variants */
    .typography--primary {
      color: var(--color-text-primary);
    }

    .typography--secondary {
      color: var(--color-text-secondary);
    }

    .typography--muted {
      color: var(--color-text-tertiary);
    }

    .typography--inverse {
      color: var(--color-text-inverse);
    }

    /* Remove margin for last child */
    .typography:last-child {
      margin-bottom: 0;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .typography {
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 2px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .typography {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .typography--primary {
        color: var(--color-text-inverse);
      }

      .typography--secondary {
        color: var(--color-gray-300);
      }

      .typography--muted {
        color: var(--color-gray-400);
      }

      .typography--inverse {
        color: var(--color-text-primary);
      }
    }

    /* Print styles */
    @media print {
      .typography {
        color: black !important;
        background: transparent !important;
      }
    }
  `;

  /**
   * Render the component
   */
  override render(): TemplateResult {
    const element = this._getElement();
    const classes = this._getTypographyClasses();
    const attributes = this._getAttributes();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      weight: this.weight,
      color: this.color,
      as: this.as,
    });

    return html`
      <${element} class="${classes}" ${attributes}>
        <slot></slot>
      </${element}>
    `;
  }

  /**
   * Get the HTML element to render
   */
  private _getElement(): string {
    if (this.as) {
      return this.as;
    }

    // Default semantic elements based on variant
    switch (this.variant) {
      case 'heading-1':
        return 'h1';
      case 'heading-2':
        return 'h2';
      case 'heading-3':
        return 'h3';
      case 'heading-4':
        return 'h4';
      case 'heading-5':
        return 'h5';
      case 'heading-6':
        return 'h6';
      case 'body':
        return 'p';
      case 'caption':
        return 'span';
      case 'label':
        return 'label';
      default:
        return 'p';
    }
  }

  /**
   * Get typography CSS classes
   */
  private _getTypographyClasses(): string {
    const classes = ['typography'];
    classes.push(`typography--${this.variant}`);
    classes.push(`typography--${this.size}`);
    classes.push(`typography--${this.weight}`);
    classes.push(`typography--${this.color}`);

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

    if (this.ariaLevel && this.variant.startsWith('heading')) {
      attributes.push(html`aria-level="${this.ariaLevel}"`);
    }

    return html`${attributes}`;
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
        'heading-1',
        'heading-2',
        'heading-3',
        'heading-4',
        'heading-5',
        'heading-6',
        'body',
        'caption',
        'label',
      ],
      'body'
    );

    // Validate size
    this.size = this.validateEnum(
      this.size,
      ['small', 'medium', 'large', 'xlarge'],
      'medium'
    );

    // Validate weight
    this.weight = this.validateEnum(
      this.weight,
      ['light', 'normal', 'medium', 'semibold', 'bold'],
      'normal'
    );

    // Validate color
    this.color = this.validateEnum(
      this.color,
      ['primary', 'secondary', 'muted', 'inverse'],
      'primary'
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-typography': Typography;
  }
}
