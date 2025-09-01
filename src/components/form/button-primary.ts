import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Primary Button Component
 * A customizable button component with multiple variants
 */
@customElement('ds-button-primary')
export class ButtonPrimary extends LitElement {
  /**
   * Button variant style
   */
  @property({ type: String })
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  /**
   * Whether the button is disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Button size
   */
  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Component styles
   */
  static override styles = css`
    :host {
      display: inline-block;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: var(--border-width-button) var(--border-style-solid);
      border-radius: var(--border-radius-md);
      font-family: var(--font-family-sans);
      font-size: var(--font-size-button);
      font-weight: var(--font-weight-medium);
      line-height: var(--line-height-normal);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      box-shadow: var(--lighting-button-shadow);
    }

    .button:hover:not(:disabled) {
      box-shadow: var(--lighting-button-shadow-hover);
    }

    .button:focus {
      outline: var(--border-width-focus) var(--border-style-solid)
        var(--color-border-focus);
      outline-offset: 2px;
    }

    /* Size variants */
    .button--small {
      padding: var(--spacing-button-padding-y) var(--spacing-button-padding-x);
      font-size: var(--font-size-2);
    }

    .button--medium {
      padding: calc(var(--spacing-button-padding-y) * 1.5)
        calc(var(--spacing-button-padding-x) * 1.5);
      font-size: var(--font-size-3);
    }

    .button--large {
      padding: calc(var(--spacing-button-padding-y) * 2)
        calc(var(--spacing-button-padding-x) * 2);
      font-size: var(--font-size-4);
    }

    /* Variant styles */
    .button--primary {
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-text-inverse);
    }

    .button--primary:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
      border-color: var(--color-primary-dark);
    }

    .button--secondary {
      background-color: var(--color-secondary);
      border-color: var(--color-secondary);
      color: var(--color-text-inverse);
    }

    .button--secondary:hover:not(:disabled) {
      background-color: var(--color-secondary-dark);
      border-color: var(--color-secondary-dark);
    }

    .button--tertiary {
      background-color: transparent;
      border-color: var(--color-border);
      color: var(--color-text-primary);
    }

    .button--tertiary:hover:not(:disabled) {
      background-color: var(--color-gray-100);
      border-color: var(--color-gray-300);
    }

    /* Disabled state */
    .button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: var(--shadow-none);
    }
  `;

  /**
   * Render the component
   */
  override render() {
    return html`
      <button
        class="button button--${this.variant} button--${this.size}"
        ?disabled="${this.disabled}"
        @click="${this._handleClick}"
      >
        <slot></slot>
      </button>
    `;
  }

  /**
   * Handle button click
   */
  private _handleClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent('ds-button-click', {
        detail: {
          variant: this.variant,
          size: this.size,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-button-primary': ButtonPrimary;
  }
}
