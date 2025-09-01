import { expect, fixture, html } from '@open-wc/testing';
import { Card } from './card.js';

describe('Card Component', () => {
  describe('Component Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Card>(html`<ds-card>Card content</ds-card>`);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.state).to.equal('default');
      expect(el.color).to.equal('neutral');
      expect(el.clickable).to.be.false;
      expect(el.href).to.be.undefined;
    });

    it('should render with custom properties', async () => {
      const el = await fixture<Card>(html`
        <ds-card variant="elevated" size="large" color="primary" clickable>
          Custom card
        </ds-card>
      `);

      expect(el.variant).to.equal('elevated');
      expect(el.size).to.equal('large');
      expect(el.color).to.equal('primary');
      expect(el.clickable).to.be.true;
    });

    it('should render as anchor when href is provided', async () => {
      const el = await fixture<Card>(html`
        <ds-card href="/test" target="_blank"> Link card </ds-card>
      `);

      const cardElement = el.shadowRoot?.querySelector('a');
      expect(cardElement).to.exist;
      expect(cardElement?.getAttribute('href')).to.equal('/test');
      expect(cardElement?.getAttribute('target')).to.equal('_blank');
      expect(cardElement?.getAttribute('rel')).to.equal('noopener noreferrer');
    });

    it('should render as div when no href is provided', async () => {
      const el = await fixture<Card>(html`<ds-card>Static card</ds-card>`);

      const cardElement = el.shadowRoot?.querySelector('div');
      expect(cardElement).to.exist;
      expect(cardElement?.tagName).to.equal('DIV');
    });

    it('should apply correct CSS classes', async () => {
      const el = await fixture<Card>(html`
        <ds-card variant="outlined" size="small" color="secondary" clickable>
          Styled card
        </ds-card>
      `);

      const cardElement = el.shadowRoot?.querySelector('.card');
      expect(cardElement?.classList.contains('card--outlined')).to.be.true;
      expect(cardElement?.classList.contains('card--small')).to.be.true;
      expect(cardElement?.classList.contains('card--secondary')).to.be.true;
      expect(cardElement?.classList.contains('card--clickable')).to.be.true;
    });
  });

  describe('Event Handling', () => {
    it('should dispatch click event when clicked', async () => {
      const el = await fixture<Card>(
        html`<ds-card clickable>Clickable card</ds-card>`
      );
      let clickEvent: CustomEvent | null = null;

      el.addEventListener('ds-card-click', e => {
        clickEvent = e as CustomEvent;
      });

      const cardElement = el.shadowRoot?.querySelector('.card') as HTMLElement;
      cardElement?.click();

      expect(clickEvent).to.exist;
      expect(clickEvent?.detail.component).to.equal('card');
      expect(clickEvent?.detail.data.variant).to.equal('default');
      expect(clickEvent?.detail.data.clickable).to.be.true;
    });

    it('should dispatch focus event when focused', async () => {
      const el = await fixture<Card>(
        html`<ds-card clickable>Focusable card</ds-card>`
      );
      let focusEvent: CustomEvent | null = null;

      el.addEventListener('ds-card-focus', e => {
        focusEvent = e as CustomEvent;
      });

      const cardElement = el.shadowRoot?.querySelector('.card') as HTMLElement;
      cardElement?.focus();

      expect(focusEvent).to.exist;
      expect(focusEvent?.detail.component).to.equal('card');
      expect(focusEvent?.detail.data.state).to.equal('focus');
    });

    it('should dispatch blur event when blurred', async () => {
      const el = await fixture<Card>(
        html`<ds-card clickable>Focusable card</ds-card>`
      );
      let blurEvent: CustomEvent | null = null;

      el.addEventListener('ds-card-blur', e => {
        blurEvent = e as CustomEvent;
      });

      const cardElement = el.shadowRoot?.querySelector('.card') as HTMLElement;
      cardElement?.focus();
      cardElement?.blur();

      expect(blurEvent).to.exist;
      expect(blurEvent?.detail.component).to.equal('card');
      expect(blurEvent?.detail.data.state).to.equal('default');
    });

    it('should handle keyboard events for clickable cards', async () => {
      const el = await fixture<Card>(
        html`<ds-card clickable>Keyboard card</ds-card>`
      );
      let clickEvent: CustomEvent | null = null;

      el.addEventListener('ds-card-click', e => {
        clickEvent = e as CustomEvent;
      });

      const cardElement = el.shadowRoot?.querySelector('.card') as HTMLElement;
      cardElement?.focus();

      // Simulate Enter key
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      cardElement?.dispatchEvent(enterEvent);

      expect(clickEvent).to.exist;
    });

    it('should not dispatch events when disabled', async () => {
      const el = await fixture<Card>(
        html`<ds-card clickable state="disabled">Disabled card</ds-card>`
      );
      let clickEvent: CustomEvent | null = null;

      el.addEventListener('ds-card-click', e => {
        clickEvent = e as CustomEvent;
      });

      const cardElement = el.shadowRoot?.querySelector('.card') as HTMLElement;
      cardElement?.click();

      expect(clickEvent).to.be.null;
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Card>(html`
        <ds-card
          aria-label="Test card"
          aria-describedby="description"
          aria-expanded="true"
          aria-pressed="false"
        >
          Accessible card
        </ds-card>
      `);

      const cardElement = el.shadowRoot?.querySelector('.card');
      expect(cardElement?.getAttribute('aria-label')).to.equal('Test card');
      expect(cardElement?.getAttribute('aria-describedby')).to.equal(
        'description'
      );
      expect(cardElement?.getAttribute('aria-expanded')).to.equal('true');
      expect(cardElement?.getAttribute('aria-pressed')).to.equal('false');
    });

    it('should be focusable when clickable', async () => {
      const el = await fixture<Card>(
        html`<ds-card clickable>Focusable card</ds-card>`
      );

      const cardElement = el.shadowRoot?.querySelector('.card') as HTMLElement;
      expect(cardElement?.getAttribute('tabindex')).to.equal('0');
      expect(cardElement?.getAttribute('role')).to.equal('button');
    });

    it('should not be focusable when not clickable', async () => {
      const el = await fixture<Card>(html`<ds-card>Static card</ds-card>`);

      const cardElement = el.shadowRoot?.querySelector('.card');
      expect(cardElement?.getAttribute('tabindex')).to.be.null;
      expect(cardElement?.getAttribute('role')).to.be.null;
    });

    it('should support keyboard navigation', async () => {
      const el = await fixture<Card>(
        html`<ds-card clickable>Keyboard card</ds-card>`
      );
      let clickEvent: CustomEvent | null = null;

      el.addEventListener('ds-card-click', e => {
        clickEvent = e as CustomEvent;
      });

      const cardElement = el.shadowRoot?.querySelector('.card') as HTMLElement;
      cardElement?.focus();

      // Test Space key
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      cardElement?.dispatchEvent(spaceEvent);

      expect(clickEvent).to.exist;
    });
  });

  describe('State Management', () => {
    it('should update state on mouse enter', async () => {
      const el = await fixture<Card>(html`<ds-card>Hover card</ds-card>`);

      const mouseEnterEvent = new MouseEvent('mouseenter');
      el.dispatchEvent(mouseEnterEvent);

      expect(el.state).to.equal('hover');
    });

    it('should update state on mouse leave', async () => {
      const el = await fixture<Card>(html`<ds-card>Hover card</ds-card>`);

      // First set to hover
      el.dispatchEvent(new MouseEvent('mouseenter'));
      expect(el.state).to.equal('hover');

      // Then leave
      el.dispatchEvent(new MouseEvent('mouseleave'));
      expect(el.state).to.equal('default');
    });

    it('should not change state when disabled', async () => {
      const el = await fixture<Card>(
        html`<ds-card state="disabled">Disabled card</ds-card>`
      );

      const mouseEnterEvent = new MouseEvent('mouseenter');
      el.dispatchEvent(mouseEnterEvent);

      expect(el.state).to.equal('disabled');
    });
  });

  describe('Property Validation', () => {
    it('should validate variant property', async () => {
      const el = await fixture<Card>(
        html`<ds-card variant="invalid">Test</ds-card>`
      );

      // Should fallback to default
      expect(el.variant).to.equal('default');
    });

    it('should validate size property', async () => {
      const el = await fixture<Card>(
        html`<ds-card size="invalid">Test</ds-card>`
      );

      // Should fallback to medium
      expect(el.size).to.equal('medium');
    });

    it('should validate color property', async () => {
      const el = await fixture<Card>(
        html`<ds-card color="invalid">Test</ds-card>`
      );

      // Should fallback to neutral
      expect(el.color).to.equal('neutral');
    });

    it('should validate state property', async () => {
      const el = await fixture<Card>(
        html`<ds-card state="invalid">Test</ds-card>`
      );

      // Should fallback to default
      expect(el.state).to.equal('default');
    });

    it('should validate target property when href is provided', async () => {
      const el = await fixture<Card>(html`
        <ds-card href="/test" target="invalid">Test</ds-card>
      `);

      // Should fallback to _self
      expect(el.target).to.equal('_self');
    });
  });

  describe('Content Areas', () => {
    it('should support card header content', async () => {
      const el = await fixture<Card>(html`
        <ds-card>
          <div class="card__header">Header content</div>
          <div class="card__body">Body content</div>
        </ds-card>
      `);

      const header = el.querySelector('.card__header');
      const body = el.querySelector('.card__body');

      expect(header).to.exist;
      expect(body).to.exist;
      expect(header?.textContent).to.equal('Header content');
      expect(body?.textContent).to.equal('Body content');
    });

    it('should support card footer content', async () => {
      const el = await fixture<Card>(html`
        <ds-card>
          <div class="card__body">Body content</div>
          <div class="card__footer">Footer content</div>
        </ds-card>
      `);

      const footer = el.querySelector('.card__footer');
      expect(footer).to.exist;
      expect(footer?.textContent).to.equal('Footer content');
    });

    it('should support card actions', async () => {
      const el = await fixture<Card>(html`
        <ds-card>
          <div class="card__body">Body content</div>
          <div class="card__actions">
            <button>Action 1</button>
            <button>Action 2</button>
          </div>
        </ds-card>
      `);

      const actions = el.querySelector('.card__actions');
      const buttons = actions?.querySelectorAll('button');

      expect(actions).to.exist;
      expect(buttons?.length).to.equal(2);
    });

    it('should support card media', async () => {
      const el = await fixture<Card>(html`
        <ds-card>
          <img class="card__media" src="test.jpg" alt="Test image" />
          <div class="card__body">Body content</div>
        </ds-card>
      `);

      const media = el.querySelector('.card__media');
      expect(media).to.exist;
      expect(media?.getAttribute('src')).to.equal('test.jpg');
    });
  });

  describe('Link Functionality', () => {
    it('should render as anchor with proper attributes', async () => {
      const el = await fixture<Card>(html`
        <ds-card href="/test" target="_blank"> Link card </ds-card>
      `);

      const anchor = el.shadowRoot?.querySelector('a');
      expect(anchor).to.exist;
      expect(anchor?.getAttribute('href')).to.equal('/test');
      expect(anchor?.getAttribute('target')).to.equal('_blank');
      expect(anchor?.getAttribute('rel')).to.equal('noopener noreferrer');
    });

    it('should handle click events on link cards', async () => {
      const el = await fixture<Card>(html`
        <ds-card href="/test"> Link card </ds-card>
      `);

      let clickEvent: CustomEvent | null = null;
      el.addEventListener('ds-card-click', e => {
        clickEvent = e as CustomEvent;
      });

      const anchor = el.shadowRoot?.querySelector('a') as HTMLElement;
      anchor?.click();

      expect(clickEvent).to.exist;
      expect(clickEvent?.detail.data.href).to.equal('/test');
    });
  });

  describe('Cleanup', () => {
    it('should remove event listeners on disconnect', async () => {
      const el = await fixture<Card>(html`<ds-card>Test card</ds-card>`);

      // Add event listeners
      el.addEventListener('mouseenter', () => {});
      el.addEventListener('mouseleave', () => {});

      // Disconnect
      el.disconnectedCallback();

      // Should not throw errors
      expect(() => {
        el.dispatchEvent(new MouseEvent('mouseenter'));
        el.dispatchEvent(new MouseEvent('mouseleave'));
      }).to.not.throw();
    });
  });
});
