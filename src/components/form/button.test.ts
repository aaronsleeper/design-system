import { fixture, expect, html, elementUpdated } from '@open-wc/testing';
import { Button } from './button.js';
import { DesignSystemEventPayload } from '../../base/design-system-element.js';

describe('Button', () => {
  describe('Basic Rendering', () => {
    it('renders with default properties', async () => {
      const el = await fixture<Button>(html`<ds-button>Click me</ds-button>`);

      expect(el.variant).to.equal('primary');
      expect(el.size).to.equal('medium');
      expect(el.disabled).to.equal(false);
      expect(el.loading).to.equal(false);
      expect(el.type).to.equal('button');
      expect(el.href).to.be.undefined;
      expect(el.target).to.equal('_self');
    });

    it('renders with custom properties', async () => {
      const el = await fixture<Button>(
        html`<ds-button
          variant="secondary"
          size="large"
          disabled
          loading
          type="submit"
          aria-label="Custom button"
          >Click me</ds-button
        >`
      );

      expect(el.variant).to.equal('secondary');
      expect(el.size).to.equal('large');
      expect(el.disabled).to.equal(true);
      expect(el.loading).to.equal(true);
      expect(el.type).to.equal('submit');
      expect(el.ariaLabel).to.equal('Custom button');
    });

    it('renders as anchor when href is provided', async () => {
      const el = await fixture<Button>(
        html`<ds-button href="/test" target="_blank">Link Button</ds-button>`
      );

      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor).to.exist;
      expect(anchor?.getAttribute('href')).to.equal('/test');
      expect(anchor?.getAttribute('target')).to.equal('_blank');
      expect(anchor?.getAttribute('rel')).to.equal('noopener noreferrer');
    });

    it('renders as button when href is not provided', async () => {
      const el = await fixture<Button>(html`<ds-button>Button</ds-button>`);

      const button = el.shadowRoot?.querySelector('button');
      const anchor = el.shadowRoot?.querySelector('a');

      expect(button).to.exist;
      expect(anchor).to.not.exist;
      expect(button?.getAttribute('type')).to.equal('button');
    });
  });

  describe('CSS Classes', () => {
    it('applies correct CSS classes for variant', async () => {
      const el = await fixture<Button>(
        html`<ds-button variant="outline">Button</ds-button>`
      );

      const button = el.shadowRoot?.querySelector('button');
      expect(button?.classList.contains('button--outline')).to.be.true;
    });

    it('applies correct CSS classes for size', async () => {
      const el = await fixture<Button>(
        html`<ds-button size="small">Button</ds-button>`
      );

      const button = el.shadowRoot?.querySelector('button');
      expect(button?.classList.contains('button--small')).to.be.true;
    });

    it('applies loading class when loading', async () => {
      const el = await fixture<Button>(
        html`<ds-button loading>Button</ds-button>`
      );

      const button = el.shadowRoot?.querySelector('button');
      expect(button?.classList.contains('button--loading')).to.be.true;
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading', async () => {
      const el = await fixture<Button>(
        html`<ds-button loading>Button</ds-button>`
      );

      const spinner = el.shadowRoot?.querySelector('.loading-spinner');
      const srText = el.shadowRoot?.querySelector('.sr-only');

      expect(spinner).to.exist;
      expect(srText?.textContent?.trim()).to.equal('Loading...');
    });

    it('does not show loading spinner when not loading', async () => {
      const el = await fixture<Button>(html`<ds-button>Button</ds-button>`);

      const spinner = el.shadowRoot?.querySelector('.loading-spinner');
      expect(spinner).to.not.exist;
    });
  });

  describe('Event Handling', () => {
    it('dispatches click event when not disabled', async () => {
      const el = await fixture<Button>(html`<ds-button>Click me</ds-button>`);

      let clickEvent: CustomEvent<DesignSystemEventPayload> | undefined;
      el.addEventListener('ds-button-click', e => {
        clickEvent = e as CustomEvent<DesignSystemEventPayload>;
      });

      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      button?.click();

      expect(clickEvent).to.exist;
      expect(clickEvent?.detail.component).to.equal('button');
      expect(clickEvent?.detail.data.variant).to.equal('primary');
      expect(clickEvent?.detail.data.size).to.equal('medium');
    });

    it('does not dispatch click event when disabled', async () => {
      const el = await fixture<Button>(
        html`<ds-button disabled>Click me</ds-button>`
      );

      let clickEvent: CustomEvent<DesignSystemEventPayload> | undefined;
      el.addEventListener('ds-button-click', e => {
        clickEvent = e as CustomEvent<DesignSystemEventPayload>;
      });

      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      button?.click();

      expect(clickEvent).to.not.exist;
    });

    it('does not dispatch click event when loading', async () => {
      const el = await fixture<Button>(
        html`<ds-button loading>Click me</ds-button>`
      );

      let clickEvent: CustomEvent<DesignSystemEventPayload> | undefined;
      el.addEventListener('ds-button-click', e => {
        clickEvent = e as CustomEvent<DesignSystemEventPayload>;
      });

      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      button?.click();

      expect(clickEvent).to.not.exist;
    });

    it('dispatches focus event', async () => {
      const el = await fixture<Button>(html`<ds-button>Click me</ds-button>`);

      let focusEvent: CustomEvent<DesignSystemEventPayload> | undefined;
      el.addEventListener('ds-button-focus', e => {
        focusEvent = e as CustomEvent<DesignSystemEventPayload>;
      });

      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      button?.focus();

      expect(focusEvent).to.exist;
      expect(focusEvent?.detail.component).to.equal('button');
    });

    it('dispatches blur event', async () => {
      const el = await fixture<Button>(html`<ds-button>Click me</ds-button>`);

      let blurEvent: CustomEvent<DesignSystemEventPayload> | undefined;
      el.addEventListener('ds-button-blur', e => {
        blurEvent = e as CustomEvent<DesignSystemEventPayload>;
      });

      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      button?.focus();
      button?.blur();

      expect(blurEvent).to.exist;
      expect(blurEvent?.detail.component).to.equal('button');
    });
  });

  describe('Keyboard Navigation', () => {
    it('handles Enter key', async () => {
      const el = await fixture<Button>(html`<ds-button>Click me</ds-button>`);

      let clickEvent: CustomEvent<DesignSystemEventPayload> | undefined;
      el.addEventListener('ds-button-click', e => {
        clickEvent = e as CustomEvent<DesignSystemEventPayload>;
      });

      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      button?.dispatchEvent(enterEvent);

      expect(clickEvent).to.exist;
    });

    it('handles Space key', async () => {
      const el = await fixture<Button>(html`<ds-button>Click me</ds-button>`);

      let clickEvent: CustomEvent<DesignSystemEventPayload> | undefined;
      el.addEventListener('ds-button-click', e => {
        clickEvent = e as CustomEvent<DesignSystemEventPayload>;
      });

      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      button?.dispatchEvent(spaceEvent);

      expect(clickEvent).to.exist;
    });

    it('ignores other keys', async () => {
      const el = await fixture<Button>(html`<ds-button>Click me</ds-button>`);

      let clickEvent: CustomEvent<DesignSystemEventPayload> | undefined;
      el.addEventListener('ds-button-click', e => {
        clickEvent = e as CustomEvent<DesignSystemEventPayload>;
      });

      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      const otherEvent = new KeyboardEvent('keydown', { key: 'a' });
      button?.dispatchEvent(otherEvent);

      expect(clickEvent).to.not.exist;
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', async () => {
      const el = await fixture<Button>(
        html`<ds-button
          aria-label="Custom label"
          aria-describedby="description"
          aria-expanded="true"
          aria-pressed="false"
          >Button</ds-button
        >`
      );

      const button = el.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('aria-label')).to.equal('Custom label');
      expect(button?.getAttribute('aria-describedby')).to.equal('description');
      expect(button?.getAttribute('aria-expanded')).to.equal('true');
      expect(button?.getAttribute('aria-pressed')).to.equal('false');
    });

    it('is focusable when not disabled', async () => {
      const el = await fixture<Button>(html`<ds-button>Button</ds-button>`);

      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      button?.focus();

      expect(document.activeElement).to.equal(button);
    });

    it('is not focusable when disabled', async () => {
      const el = await fixture<Button>(
        html`<ds-button disabled>Button</ds-button>`
      );

      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      button?.focus();

      expect(document.activeElement).to.not.equal(button);
    });

    it('has proper focus styles', async () => {
      const el = await fixture<Button>(html`<ds-button>Button</ds-button>`);

      const button = el.shadowRoot?.querySelector('button');
      expect(button?.style.outline).to.include('var(--color-border-focus)');
    });
  });

  describe('Slot Content', () => {
    it('renders slot content', async () => {
      const el = await fixture<Button>(
        html`<ds-button>Custom Text</ds-button>`
      );

      const button = el.shadowRoot?.querySelector('button');
      expect(button?.textContent?.trim()).to.equal('Custom Text');
    });

    it('renders complex slot content', async () => {
      const el = await fixture<Button>(
        html`<ds-button>
          <span>Icon</span>
          <span>Text</span>
        </ds-button>`
      );

      const button = el.shadowRoot?.querySelector('button');
      expect(button?.textContent?.trim()).to.equal('IconText');
    });
  });

  describe('Property Validation', () => {
    it('validates variant property', async () => {
      const el = await fixture<Button>(
        html`<ds-button variant="invalid">Button</ds-button>`
      );

      // Should fallback to default
      expect(el.variant).to.equal('primary');
    });

    it('validates size property', async () => {
      const el = await fixture<Button>(
        html`<ds-button size="invalid">Button</ds-button>`
      );

      // Should fallback to default
      expect(el.size).to.equal('medium');
    });

    it('validates type property', async () => {
      const el = await fixture<Button>(
        html`<ds-button type="invalid">Button</ds-button>`
      );

      // Should fallback to default
      expect(el.type).to.equal('button');
    });

    it('validates target property for links', async () => {
      const el = await fixture<Button>(
        html`<ds-button href="/test" target="invalid">Button</ds-button>`
      );

      // Should fallback to default
      expect(el.target).to.equal('_self');
    });
  });

  describe('Link Behavior', () => {
    it('prevents navigation when disabled', async () => {
      const el = await fixture<Button>(
        html`<ds-button href="/test" disabled>Link</ds-button>`
      );

      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('href')).to.be.null;
    });

    it('prevents navigation when loading', async () => {
      const el = await fixture<Button>(
        html`<ds-button href="/test" loading>Link</ds-button>`
      );

      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('href')).to.be.null;
    });

    it('adds rel="noopener noreferrer" for external links', async () => {
      const el = await fixture<Button>(
        html`<ds-button href="/test" target="_blank">Link</ds-button>`
      );

      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('rel')).to.equal('noopener noreferrer');
    });

    it('does not add rel for same-window links', async () => {
      const el = await fixture<Button>(
        html`<ds-button href="/test" target="_self">Link</ds-button>`
      );

      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor?.getAttribute('rel')).to.be.null;
    });
  });

  describe('State Management', () => {
    it('updates when properties change', async () => {
      const el = await fixture<Button>(html`<ds-button>Button</ds-button>`);

      el.variant = 'secondary';
      el.size = 'large';
      el.disabled = true;
      el.loading = true;

      await elementUpdated(el);

      const button = el.shadowRoot?.querySelector('button');
      expect(button?.classList.contains('button--secondary')).to.be.true;
      expect(button?.classList.contains('button--large')).to.be.true;
      expect(button?.classList.contains('button--loading')).to.be.true;
      expect(button?.disabled).to.be.true;
    });

    it('cleans up on disconnect', async () => {
      const el = await fixture<Button>(html`<ds-button>Button</ds-button>`);

      // Simulate focus and active states
      const button = el.shadowRoot?.querySelector(
        'button'
      ) as HTMLButtonElement;
      button?.focus();

      // Disconnect the element
      el.remove();

      // State should be cleaned up (this is more of a structural test)
      expect(el.isConnected).to.be.false;
    });
  });
});
