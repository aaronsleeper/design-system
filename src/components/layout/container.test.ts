import { expect, fixture, html } from '@open-wc/testing';
import { Container } from './container.js';

describe('Container Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Container>(html`<ds-container></ds-container>`);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.disabled).to.be.false;
      expect(el.shadowRoot?.querySelector('.container')).to.exist;
    });

    it('should render with custom content', async () => {
      const el = await fixture<Container>(html`
        <ds-container>
          <p>Test content</p>
        </ds-container>
      `);

      const slot = el.shadowRoot?.querySelector('slot');
      expect(slot).to.exist;
    });

    it('should apply correct CSS classes', async () => {
      const el = await fixture<Container>(html`
        <ds-container variant="fixed" size="large"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--fixed')).to.be.true;
      expect(container?.classList.contains('container--large')).to.be.true;
    });
  });

  describe('Variants', () => {
    it('should render default variant', async () => {
      const el = await fixture<Container>(html`
        <ds-container variant="default"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--default')).to.be.true;
    });

    it('should render fluid variant', async () => {
      const el = await fixture<Container>(html`
        <ds-container variant="fluid"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--fluid')).to.be.true;
    });

    it('should render fixed variant', async () => {
      const el = await fixture<Container>(html`
        <ds-container variant="fixed"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--fixed')).to.be.true;
    });

    it('should validate variant and use default for invalid values', async () => {
      const el = await fixture<Container>(html`
        <ds-container variant="invalid"></ds-container>
      `);

      // The component should validate and use default
      expect(el.variant).to.equal('default');
    });
  });

  describe('Sizes', () => {
    it('should render small size', async () => {
      const el = await fixture<Container>(html`
        <ds-container size="small"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--small')).to.be.true;
    });

    it('should render medium size', async () => {
      const el = await fixture<Container>(html`
        <ds-container size="medium"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--medium')).to.be.true;
    });

    it('should render large size', async () => {
      const el = await fixture<Container>(html`
        <ds-container size="large"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--large')).to.be.true;
    });

    it('should render xlarge size', async () => {
      const el = await fixture<Container>(html`
        <ds-container size="xlarge"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--xlarge')).to.be.true;
    });

    it('should validate size and use default for invalid values', async () => {
      const el = await fixture<Container>(html`
        <ds-container size="invalid"></ds-container>
      `);

      // The component should validate and use default
      expect(el.size).to.equal('medium');
    });
  });

  describe('States', () => {
    it('should render disabled state', async () => {
      const el = await fixture<Container>(html`
        <ds-container disabled></ds-container>
      `);

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.getAttribute('tabindex')).to.equal('-1');
    });

    it('should not be focusable when disabled', async () => {
      const el = await fixture<Container>(html`
        <ds-container disabled></ds-container>
      `);

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      expect(container?.getAttribute('tabindex')).to.equal('-1');
    });

    it('should be focusable when not disabled', async () => {
      const el = await fixture<Container>(html`
        <ds-container></ds-container>
      `);

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      expect(container?.getAttribute('tabindex')).to.equal('0');
    });
  });

  describe('Custom Properties', () => {
    it('should apply custom max-width', async () => {
      const el = await fixture<Container>(html`
        <ds-container max-width="800px"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      const styles = container?.getAttribute('style');
      expect(styles).to.include('max-width: 800px');
    });

    it('should apply custom padding', async () => {
      const el = await fixture<Container>(html`
        <ds-container padding="20px"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      const styles = container?.getAttribute('style');
      expect(styles).to.include('padding: 20px');
    });

    it('should apply custom margin', async () => {
      const el = await fixture<Container>(html`
        <ds-container margin="10px auto"></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      const styles = container?.getAttribute('style');
      expect(styles).to.include('margin: 10px auto');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Container>(html`
        <ds-container
          aria-label="Test container"
          aria-describedby="description"
          role="main"
        ></ds-container>
      `);

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.getAttribute('aria-label')).to.equal('Test container');
      expect(container?.getAttribute('aria-describedby')).to.equal(
        'description'
      );
      expect(container?.getAttribute('role')).to.equal('main');
    });

    it('should support keyboard navigation', async () => {
      const el = await fixture<Container>(html`
        <ds-container></ds-container>
      `);

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      expect(container?.getAttribute('tabindex')).to.equal('0');
    });

    it('should handle focus events', async () => {
      const el = await fixture<Container>(html`
        <ds-container></ds-container>
      `);

      let focusEventFired = false;
      el.addEventListener('ds-container-focus', () => {
        focusEventFired = true;
      });

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      container.focus();

      expect(focusEventFired).to.be.true;
    });

    it('should handle blur events', async () => {
      const el = await fixture<Container>(html`
        <ds-container></ds-container>
      `);

      let blurEventFired = false;
      el.addEventListener('ds-container-blur', () => {
        blurEventFired = true;
      });

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      container.focus();
      container.blur();

      expect(blurEventFired).to.be.true;
    });

    it('should handle keyboard activation', async () => {
      const el = await fixture<Container>(html`
        <ds-container></ds-container>
      `);

      let activateEventFired = false;
      el.addEventListener('ds-container-activate', () => {
        activateEventFired = true;
      });

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      container.focus();

      // Simulate Enter key press
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      container.dispatchEvent(enterEvent);

      expect(activateEventFired).to.be.true;
    });

    it('should handle Space key activation', async () => {
      const el = await fixture<Container>(html`
        <ds-container></ds-container>
      `);

      let activateEventFired = false;
      el.addEventListener('ds-container-activate', () => {
        activateEventFired = true;
      });

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      container.focus();

      // Simulate Space key press
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      container.dispatchEvent(spaceEvent);

      expect(activateEventFired).to.be.true;
    });
  });

  describe('Events', () => {
    it('should dispatch render event on render', async () => {
      const el = await fixture<Container>(html`
        <ds-container variant="fixed" size="large"></ds-container>
      `);

      let renderEventFired = false;
      let eventData: any = null;

      el.addEventListener('ds-container-render', (event: any) => {
        renderEventFired = true;
        eventData = event.detail;
      });

      // Trigger a re-render by changing a property
      el.variant = 'fluid';
      await el.updateComplete;

      expect(renderEventFired).to.be.true;
      expect(eventData).to.exist;
      expect(eventData.variant).to.equal('fluid');
      expect(eventData.size).to.equal('large');
    });

    it('should not fire events when disabled', async () => {
      const el = await fixture<Container>(html`
        <ds-container disabled></ds-container>
      `);

      let focusEventFired = false;
      el.addEventListener('ds-container-focus', () => {
        focusEventFired = true;
      });

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      container.focus();

      expect(focusEventFired).to.be.false;
    });
  });

  describe('Public Methods', () => {
    it('should focus the container when focus() is called', async () => {
      const el = await fixture<Container>(html`
        <ds-container></ds-container>
      `);

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      const focusSpy = sinon.spy(container, 'focus');

      el.focus();

      expect(focusSpy.calledOnce).to.be.true;
    });

    it('should blur the container when blur() is called', async () => {
      const el = await fixture<Container>(html`
        <ds-container></ds-container>
      `);

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      const blurSpy = sinon.spy(container, 'blur');

      el.blur();

      expect(blurSpy.calledOnce).to.be.true;
    });

    it('should not focus when disabled', async () => {
      const el = await fixture<Container>(html`
        <ds-container disabled></ds-container>
      `);

      const container = el.shadowRoot?.querySelector(
        '.container'
      ) as HTMLElement;
      const focusSpy = sinon.spy(container, 'focus');

      el.focus();

      expect(focusSpy.called).to.be.false;
    });
  });

  describe('Property Updates', () => {
    it('should update variant when property changes', async () => {
      const el = await fixture<Container>(html`
        <ds-container variant="default"></ds-container>
      `);

      el.variant = 'fixed';
      await el.updateComplete;

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--fixed')).to.be.true;
      expect(container?.classList.contains('container--default')).to.be.false;
    });

    it('should update size when property changes', async () => {
      const el = await fixture<Container>(html`
        <ds-container size="medium"></ds-container>
      `);

      el.size = 'large';
      await el.updateComplete;

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--large')).to.be.true;
      expect(container?.classList.contains('container--medium')).to.be.false;
    });

    it('should update disabled state when property changes', async () => {
      const el = await fixture<Container>(html`
        <ds-container></ds-container>
      `);

      el.disabled = true;
      await el.updateComplete;

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.getAttribute('tabindex')).to.equal('-1');
    });
  });

  describe('Combined Properties', () => {
    it('should handle multiple properties together', async () => {
      const el = await fixture<Container>(html`
        <ds-container
          variant="fluid"
          size="large"
          max-width="900px"
          padding="30px"
          aria-label="Main content"
        ></ds-container>
      `);

      expect(el.variant).to.equal('fluid');
      expect(el.size).to.equal('large');
      expect(el.maxWidth).to.equal('900px');
      expect(el.padding).to.equal('30px');
      expect(el.ariaLabel).to.equal('Main content');

      const container = el.shadowRoot?.querySelector('.container');
      expect(container?.classList.contains('container--fluid')).to.be.true;
      expect(container?.classList.contains('container--large')).to.be.true;
      expect(container?.getAttribute('aria-label')).to.equal('Main content');

      const styles = container?.getAttribute('style');
      expect(styles).to.include('max-width: 900px');
      expect(styles).to.include('padding: 30px');
    });
  });
});
