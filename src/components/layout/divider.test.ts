import { expect, fixture, html } from '@open-wc/testing';
import { Divider } from './divider.js';

describe('Divider Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Divider>(html`<ds-divider></ds-divider>`);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.disabled).to.be.false;
      expect(el.shadowRoot?.querySelector('.divider')).to.exist;
    });

    it('should render as hr element', async () => {
      const el = await fixture<Divider>(html`<ds-divider></ds-divider>`);

      const divider = el.shadowRoot?.querySelector('hr');
      expect(divider).to.exist;
      expect(divider?.classList.contains('divider')).to.be.true;
    });

    it('should apply correct CSS classes', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="horizontal" size="large"></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--horizontal')).to.be.true;
      expect(divider?.classList.contains('divider--large')).to.be.true;
    });
  });

  describe('Variants', () => {
    it('should render default variant', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="default"></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--default')).to.be.true;
    });

    it('should render horizontal variant', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="horizontal"></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--horizontal')).to.be.true;
    });

    it('should render vertical variant', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="vertical"></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--vertical')).to.be.true;
    });

    it('should validate variant and use default for invalid values', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="invalid"></ds-divider>
      `);

      // The component should validate and use default
      expect(el.variant).to.equal('default');
    });
  });

  describe('Sizes', () => {
    it('should render small size', async () => {
      const el = await fixture<Divider>(
        html` <ds-divider size="small"></ds-divider> `
      );

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--small')).to.be.true;
    });

    it('should render medium size', async () => {
      const el = await fixture<Divider>(
        html` <ds-divider size="medium"></ds-divider> `
      );

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--medium')).to.be.true;
    });

    it('should render large size', async () => {
      const el = await fixture<Divider>(
        html` <ds-divider size="large"></ds-divider> `
      );

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--large')).to.be.true;
    });

    it('should render xlarge size', async () => {
      const el = await fixture<Divider>(
        html` <ds-divider size="xlarge"></ds-divider> `
      );

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--xlarge')).to.be.true;
    });

    it('should validate size and use default for invalid values', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider size="invalid"></ds-divider>
      `);

      // The component should validate and use default
      expect(el.size).to.equal('medium');
    });
  });

  describe('States', () => {
    it('should render disabled state', async () => {
      const el = await fixture<Divider>(
        html` <ds-divider disabled></ds-divider> `
      );

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.getAttribute('tabindex')).to.equal('-1');
    });

    it('should not be focusable when disabled', async () => {
      const el = await fixture<Divider>(
        html` <ds-divider disabled></ds-divider> `
      );

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      expect(divider?.getAttribute('tabindex')).to.equal('-1');
    });

    it('should be focusable when not disabled', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      expect(divider?.getAttribute('tabindex')).to.equal('0');
    });
  });

  describe('Custom Properties', () => {
    it('should apply custom thickness for horizontal divider', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="horizontal" thickness="3px"></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      const styles = divider?.getAttribute('style');
      expect(styles).to.include('height: 3px');
    });

    it('should apply custom thickness for vertical divider', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="vertical" thickness="2px"></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      const styles = divider?.getAttribute('style');
      expect(styles).to.include('width: 2px');
    });

    it('should apply custom color', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider color="#ff0000"></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      const styles = divider?.getAttribute('style');
      expect(styles).to.include('background-color: #ff0000');
    });

    it('should apply both custom thickness and color', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider thickness="4px" color="#00ff00"></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      const styles = divider?.getAttribute('style');
      expect(styles).to.include('height: 4px');
      expect(styles).to.include('background-color: #00ff00');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider
          aria-label="Section divider"
          aria-describedby="description"
          role="separator"
        ></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.getAttribute('aria-label')).to.equal('Section divider');
      expect(divider?.getAttribute('aria-describedby')).to.equal('description');
      expect(divider?.getAttribute('role')).to.equal('separator');
    });

    it('should have default separator role', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.getAttribute('role')).to.equal('separator');
    });

    it('should support keyboard navigation', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      expect(divider?.getAttribute('tabindex')).to.equal('0');
    });

    it('should handle focus events', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      let focusEventFired = false;
      el.addEventListener('ds-divider-focus', () => {
        focusEventFired = true;
      });

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      divider.focus();

      expect(focusEventFired).to.be.true;
    });

    it('should handle blur events', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      let blurEventFired = false;
      el.addEventListener('ds-divider-blur', () => {
        blurEventFired = true;
      });

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      divider.focus();
      divider.blur();

      expect(blurEventFired).to.be.true;
    });

    it('should handle keyboard activation', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      let activateEventFired = false;
      el.addEventListener('ds-divider-activate', () => {
        activateEventFired = true;
      });

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      divider.focus();

      // Simulate Enter key press
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      divider.dispatchEvent(enterEvent);

      expect(activateEventFired).to.be.true;
    });

    it('should handle Space key activation', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      let activateEventFired = false;
      el.addEventListener('ds-divider-activate', () => {
        activateEventFired = true;
      });

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      divider.focus();

      // Simulate Space key press
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      divider.dispatchEvent(spaceEvent);

      expect(activateEventFired).to.be.true;
    });
  });

  describe('Events', () => {
    it('should dispatch render event on render', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider
          variant="horizontal"
          size="large"
          thickness="2px"
          color="#ff0000"
        ></ds-divider>
      `);

      let renderEventFired = false;
      let eventData: any = null;

      el.addEventListener('ds-divider-render', (event: any) => {
        renderEventFired = true;
        eventData = event.detail;
      });

      // Trigger a re-render by changing a property
      el.variant = 'vertical';
      await el.updateComplete;

      expect(renderEventFired).to.be.true;
      expect(eventData).to.exist;
      expect(eventData.variant).to.equal('vertical');
      expect(eventData.size).to.equal('large');
      expect(eventData.thickness).to.equal('2px');
      expect(eventData.color).to.equal('#ff0000');
    });

    it('should not fire events when disabled', async () => {
      const el = await fixture<Divider>(
        html` <ds-divider disabled></ds-divider> `
      );

      let focusEventFired = false;
      el.addEventListener('ds-divider-focus', () => {
        focusEventFired = true;
      });

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      divider.focus();

      expect(focusEventFired).to.be.false;
    });
  });

  describe('Public Methods', () => {
    it('should focus the divider when focus() is called', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      const focusSpy = sinon.spy(divider, 'focus');

      el.focus();

      expect(focusSpy.calledOnce).to.be.true;
    });

    it('should blur the divider when blur() is called', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      const blurSpy = sinon.spy(divider, 'blur');

      el.blur();

      expect(blurSpy.calledOnce).to.be.true;
    });

    it('should not focus when disabled', async () => {
      const el = await fixture<Divider>(
        html` <ds-divider disabled></ds-divider> `
      );

      const divider = el.shadowRoot?.querySelector('.divider') as HTMLElement;
      const focusSpy = sinon.spy(divider, 'focus');

      el.focus();

      expect(focusSpy.called).to.be.false;
    });

    it('should return correct orientation for horizontal variant', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="horizontal"></ds-divider>
      `);

      expect(el.getOrientation()).to.equal('horizontal');
    });

    it('should return correct orientation for vertical variant', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="vertical"></ds-divider>
      `);

      expect(el.getOrientation()).to.equal('vertical');
    });

    it('should return correct orientation for default variant', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="default"></ds-divider>
      `);

      expect(el.getOrientation()).to.equal('horizontal');
    });

    it('should return correct thickness', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider thickness="3px"></ds-divider>
      `);

      expect(el.getThickness()).to.equal('3px');
    });

    it('should return default thickness when not set', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      expect(el.getThickness()).to.equal('1px');
    });
  });

  describe('Property Updates', () => {
    it('should update variant when property changes', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider variant="default"></ds-divider>
      `);

      el.variant = 'vertical';
      await el.updateComplete;

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--vertical')).to.be.true;
      expect(divider?.classList.contains('divider--default')).to.be.false;
    });

    it('should update size when property changes', async () => {
      const el = await fixture<Divider>(
        html` <ds-divider size="medium"></ds-divider> `
      );

      el.size = 'large';
      await el.updateComplete;

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--large')).to.be.true;
      expect(divider?.classList.contains('divider--medium')).to.be.false;
    });

    it('should update disabled state when property changes', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      el.disabled = true;
      await el.updateComplete;

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.getAttribute('tabindex')).to.equal('-1');
    });

    it('should update thickness when property changes', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      el.thickness = '4px';
      await el.updateComplete;

      const divider = el.shadowRoot?.querySelector('.divider');
      const styles = divider?.getAttribute('style');
      expect(styles).to.include('height: 4px');
    });

    it('should update color when property changes', async () => {
      const el = await fixture<Divider>(html` <ds-divider></ds-divider> `);

      el.color = '#00ff00';
      await el.updateComplete;

      const divider = el.shadowRoot?.querySelector('.divider');
      const styles = divider?.getAttribute('style');
      expect(styles).to.include('background-color: #00ff00');
    });
  });

  describe('Combined Properties', () => {
    it('should handle multiple properties together', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider
          variant="vertical"
          size="large"
          thickness="3px"
          color="#ff0000"
          disabled
          aria-label="Vertical divider"
        ></ds-divider>
      `);

      expect(el.variant).to.equal('vertical');
      expect(el.size).to.equal('large');
      expect(el.thickness).to.equal('3px');
      expect(el.color).to.equal('#ff0000');
      expect(el.disabled).to.be.true;
      expect(el.ariaLabel).to.equal('Vertical divider');

      const divider = el.shadowRoot?.querySelector('.divider');
      expect(divider?.classList.contains('divider--vertical')).to.be.true;
      expect(divider?.classList.contains('divider--large')).to.be.true;
      expect(divider?.getAttribute('aria-label')).to.equal('Vertical divider');
      expect(divider?.getAttribute('tabindex')).to.equal('-1');

      const styles = divider?.getAttribute('style');
      expect(styles).to.include('width: 3px');
      expect(styles).to.include('background-color: #ff0000');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty thickness value', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider thickness=""></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      const styles = divider?.getAttribute('style');
      expect(styles).to.not.include('height:');
      expect(styles).to.not.include('width:');
    });

    it('should handle empty color value', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider color=""></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      const styles = divider?.getAttribute('style');
      expect(styles).to.not.include('background-color:');
    });

    it('should handle zero thickness', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider thickness="0"></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      const styles = divider?.getAttribute('style');
      expect(styles).to.include('height: 0');
    });

    it('should handle transparent color', async () => {
      const el = await fixture<Divider>(html`
        <ds-divider color="transparent"></ds-divider>
      `);

      const divider = el.shadowRoot?.querySelector('.divider');
      const styles = divider?.getAttribute('style');
      expect(styles).to.include('background-color: transparent');
    });
  });
});
