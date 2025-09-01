import { html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../../base/design-system-element.js';

/**
 * Avatar component variants
 */
export type AvatarVariant = 'default' | 'circle' | 'square';

/**
 * Avatar component sizes
 */
export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Avatar component states
 */
export type AvatarState = 'default' | 'focus' | 'disabled';

/**
 * Avatar component properties interface
 */
export interface AvatarProperties {
  variant?: AvatarVariant;
  size?: AvatarSize;
  state?: AvatarState;
  src?: string;
  alt?: string;
  initials?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Avatar Component
 *
 * A user avatar component for displaying profile pictures, initials, or placeholder content.
 * Supports multiple variants, sizes, and states with full accessibility compliance.
 *
 * @example
 * ```html
 * <ds-avatar variant="circle" size="medium" src="profile.jpg" alt="John Doe"></ds-avatar>
 * <ds-avatar variant="square" size="large" initials="JD"></ds-avatar>
 * <ds-avatar variant="default" size="small"></ds-avatar>
 * ```
 *
 * @fires ds-avatar-render - Fired when the avatar is rendered
 * @fires ds-avatar-focus - Fired when the avatar receives focus
 * @fires ds-avatar-blur - Fired when the avatar loses focus
 */
@customElement('ds-avatar')
export class Avatar extends DesignSystemElement {
  /**
   * Avatar variant style
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  variant: AvatarVariant = 'default';

  /**
   * Avatar size
   * @default 'medium'
   */
  @property({ type: String, reflect: true })
  size: AvatarSize = 'medium';

  /**
   * Avatar state
   * @default 'default'
   */
  @property({ type: String, reflect: true })
  state: AvatarState = 'default';

  /**
   * Image source URL
   */
  @property({ type: String })
  src?: string;

  /**
   * Alt text for the image
   */
  @property({ type: String })
  alt?: string;

  /**
   * Initials to display when no image is provided
   */
  @property({ type: String })
  initials?: string;

  /**
   * Accessible label for the avatar
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel?: string;

  /**
   * ID of element that describes the avatar
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

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background-color: var(--color-gray-200);
      color: var(--color-gray-700);
      font-family: var(--font-family-sans);
      font-weight: var(--font-weight-medium);
      line-height: 1;
      text-align: center;
      transition: all 0.2s ease-in-out;
      box-sizing: border-box;
      border: 2px solid transparent;
    }

    .avatar:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .avatar:focus:not(:focus-visible) {
      outline: none;
    }

    .avatar:focus-visible {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .avatar__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .avatar__initials {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .avatar__placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .avatar__placeholder-icon {
      width: 50%;
      height: 50%;
      opacity: 0.6;
    }

    /* Size variants */
    .avatar--small {
      width: 2rem;
      height: 2rem;
      font-size: var(--font-size-1);
    }

    .avatar--medium {
      width: 2.5rem;
      height: 2.5rem;
      font-size: var(--font-size-2);
    }

    .avatar--large {
      width: 3rem;
      height: 3rem;
      font-size: var(--font-size-3);
    }

    .avatar--xlarge {
      width: 4rem;
      height: 4rem;
      font-size: var(--font-size-4);
    }

    /* Variant styles - Default */
    .avatar--default {
      border-radius: var(--border-radius-md);
    }

    /* Variant styles - Circle */
    .avatar--circle {
      border-radius: var(--border-radius-full);
    }

    /* Variant styles - Square */
    .avatar--square {
      border-radius: var(--border-radius-sm);
    }

    /* State variants */
    .avatar--focus:not(:disabled) {
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 2px var(--color-border-focus);
    }

    /* Disabled state */
    .avatar:disabled,
    :host([disabled]) .avatar {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Image loading state */
    .avatar__image[src=''] {
      display: none;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .avatar {
        border-width: 3px;
      }

      .avatar:focus {
        outline-width: 3px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .avatar {
        transition: none;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .avatar {
        background-color: var(--color-gray-700);
        color: var(--color-gray-200);
      }
    }

    /* Print styles */
    @media print {
      .avatar {
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
    const avatarClasses = this._getAvatarClasses();
    const attributes = this._getAttributes();
    const content = this._getAvatarContent();

    // Dispatch render event
    this.dispatchDesignSystemEvent('render', {
      variant: this.variant,
      size: this.size,
      state: this.state,
      hasImage: !!this.src,
      hasInitials: !!this.initials,
    });

    return html`
      <div
        class="${avatarClasses}"
        ${attributes}
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
        tabindex="0"
        role="img"
      >
        ${content}
      </div>
    `;
  }

  /**
   * Get avatar CSS classes
   */
  private _getAvatarClasses(): string {
    const classes = ['avatar'];
    classes.push(`avatar--${this.variant}`);
    classes.push(`avatar--${this.size}`);

    if (this.state !== 'default') {
      classes.push(`avatar--${this.state}`);
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
   * Get avatar content based on available data
   */
  private _getAvatarContent(): TemplateResult {
    if (this.src) {
      return html`
        <img
          class="avatar__image"
          src="${this.src}"
          alt="${this.alt || ''}"
          @error="${this._handleImageError}"
          @load="${this._handleImageLoad}"
        />
      `;
    }

    if (this.initials) {
      return html` <div class="avatar__initials">${this.initials}</div> `;
    }

    return html`
      <div class="avatar__placeholder">
        <svg
          class="avatar__placeholder-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
      </div>
    `;
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
        hasImage: !!this.src,
        hasInitials: !!this.initials,
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
        hasImage: !!this.src,
        hasInitials: !!this.initials,
      },
      event
    );
  }

  /**
   * Handle image error
   */
  private _handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';

    // Show initials or placeholder if image fails to load
    this.requestUpdate();
  }

  /**
   * Handle image load
   */
  private _handleImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'block';
  }

  /**
   * Validate component properties
   */
  override connectedCallback(): void {
    super.connectedCallback();

    // Validate variant
    this.variant = this.validateEnum(
      this.variant,
      ['default', 'circle', 'square'],
      'default'
    );

    // Validate size
    this.size = this.validateEnum(
      this.size,
      ['small', 'medium', 'large', 'xlarge'],
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
   * Public method to focus the avatar
   */
  public override focus(): void {
    const avatarElement = this.shadowRoot?.querySelector(
      '.avatar'
    ) as HTMLElement;
    if (avatarElement) {
      avatarElement.focus();
    }
  }

  /**
   * Public method to blur the avatar
   */
  public override blur(): void {
    const avatarElement = this.shadowRoot?.querySelector(
      '.avatar'
    ) as HTMLElement;
    if (avatarElement) {
      avatarElement.blur();
    }
  }

  /**
   * Public method to get the avatar content
   */
  public getContent(): string {
    if (this.src) {
      return this.alt || '';
    }
    if (this.initials) {
      return this.initials;
    }
    return 'User avatar';
  }

  /**
   * Public method to get the avatar dimensions
   */
  public getDimensions(): { width: number; height: number } {
    const avatarElement = this.shadowRoot?.querySelector(
      '.avatar'
    ) as HTMLElement;
    if (avatarElement) {
      const rect = avatarElement.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
      };
    }
    return { width: 0, height: 0 };
  }

  /**
   * Public method to check if avatar has an image
   */
  public hasImage(): boolean {
    return !!this.src;
  }

  /**
   * Public method to check if avatar has initials
   */
  public hasInitials(): boolean {
    return !!this.initials;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-avatar': Avatar;
  }
}
