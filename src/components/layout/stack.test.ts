import { expect, fixture, html } from '@open-wc/testing';
import { Stack } from './stack.js';

describe('Stack Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Stack>(html`<ds-stack></ds-stack>`);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.disabled).to.be.false;
      expect(el.alignItems).to.equal('stretch');
      expect(el.justifyContent).to.equal('start');
      expect(el.wrap).to.be.false;
      expect(el.shadowRoot?.querySelector('.stack')).to.exist;
    });

    it('should render with custom content', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </ds-stack>
      `);

      const slot = el.shadowRoot?.querySelector('slot');
      expect(slot).to.exist;
    });

    it('should apply correct CSS classes', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack
          variant="horizontal"
          size="large"
          align-items="center"
          wrap
        ></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--horizontal')).to.be.true;
      expect(stack?.classList.contains('stack--large')).to.be.true;
      expect(stack?.classList.contains('stack--align-center')).to.be.true;
      expect(stack?.classList.contains('stack--justify-start')).to.be.true;
      expect(stack?.classList.contains('stack--wrap')).to.be.true;
    });
  });

  describe('Variants', () => {
    it('should render default variant', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack variant="default"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--default')).to.be.true;
    });

    it('should render horizontal variant', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack variant="horizontal"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--horizontal')).to.be.true;
    });

    it('should render vertical variant', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack variant="vertical"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--vertical')).to.be.true;
    });

    it('should validate variant and use default for invalid values', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack variant="invalid"></ds-stack>
      `);

      // The component should validate and use default
      expect(el.variant).to.equal('default');
    });
  });

  describe('Sizes', () => {
    it('should render small size', async () => {
      const el = await fixture<Stack>(
        html` <ds-stack size="small"></ds-stack> `
      );

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--small')).to.be.true;
    });

    it('should render medium size', async () => {
      const el = await fixture<Stack>(
        html` <ds-stack size="medium"></ds-stack> `
      );

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--medium')).to.be.true;
    });

    it('should render large size', async () => {
      const el = await fixture<Stack>(
        html` <ds-stack size="large"></ds-stack> `
      );

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--large')).to.be.true;
    });

    it('should render xlarge size', async () => {
      const el = await fixture<Stack>(
        html` <ds-stack size="xlarge"></ds-stack> `
      );

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--xlarge')).to.be.true;
    });

    it('should validate size and use default for invalid values', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack size="invalid"></ds-stack>
      `);

      // The component should validate and use default
      expect(el.size).to.equal('medium');
    });
  });

  describe('Alignment', () => {
    it('should render with start alignment', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack align-items="start"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--align-start')).to.be.true;
    });

    it('should render with center alignment', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack align-items="center"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--align-center')).to.be.true;
    });

    it('should render with end alignment', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack align-items="end"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--align-end')).to.be.true;
    });

    it('should render with stretch alignment', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack align-items="stretch"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--align-stretch')).to.be.true;
    });

    it('should validate alignItems and use default for invalid values', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack align-items="invalid"></ds-stack>
      `);

      // The component should validate and use default
      expect(el.alignItems).to.equal('stretch');
    });
  });

  describe('Justify Content', () => {
    it('should render with start justify content', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack justify-content="start"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--justify-start')).to.be.true;
    });

    it('should render with center justify content', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack justify-content="center"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--justify-center')).to.be.true;
    });

    it('should render with end justify content', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack justify-content="end"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--justify-end')).to.be.true;
    });

    it('should render with space-between justify content', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack justify-content="space-between"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--justify-space-between')).to.be
        .true;
    });

    it('should render with space-around justify content', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack justify-content="space-around"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--justify-space-around')).to.be
        .true;
    });

    it('should render with space-evenly justify content', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack justify-content="space-evenly"></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--justify-space-evenly')).to.be
        .true;
    });

    it('should validate justifyContent and use default for invalid values', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack justify-content="invalid"></ds-stack>
      `);

      // The component should validate and use default
      expect(el.justifyContent).to.equal('start');
    });
  });

  describe('Wrap', () => {
    it('should render with wrap enabled', async () => {
      const el = await fixture<Stack>(html` <ds-stack wrap></ds-stack> `);

      expect(el.wrap).to.be.true;
      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--wrap')).to.be.true;
    });

    it('should render with wrap disabled', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      expect(el.wrap).to.be.false;
      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--no-wrap')).to.be.true;
    });
  });

  describe('States', () => {
    it('should render disabled state', async () => {
      const el = await fixture<Stack>(html` <ds-stack disabled></ds-stack> `);

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.getAttribute('tabindex')).to.equal('-1');
    });

    it('should not be focusable when disabled', async () => {
      const el = await fixture<Stack>(html` <ds-stack disabled></ds-stack> `);

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      expect(stack?.getAttribute('tabindex')).to.equal('-1');
    });

    it('should be focusable when not disabled', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      expect(stack?.getAttribute('tabindex')).to.equal('0');
    });
  });

  describe('Custom Properties', () => {
    it('should apply custom gap', async () => {
      const el = await fixture<Stack>(html` <ds-stack gap="20px"></ds-stack> `);

      const stack = el.shadowRoot?.querySelector('.stack');
      const styles = stack?.getAttribute('style');
      expect(styles).to.include('gap: 20px');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack
          aria-label="Test stack"
          aria-describedby="description"
          role="group"
        ></ds-stack>
      `);

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.getAttribute('aria-label')).to.equal('Test stack');
      expect(stack?.getAttribute('aria-describedby')).to.equal('description');
      expect(stack?.getAttribute('role')).to.equal('group');
    });

    it('should support keyboard navigation', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      expect(stack?.getAttribute('tabindex')).to.equal('0');
    });

    it('should handle focus events', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      let focusEventFired = false;
      el.addEventListener('ds-stack-focus', () => {
        focusEventFired = true;
      });

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      stack.focus();

      expect(focusEventFired).to.be.true;
    });

    it('should handle blur events', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      let blurEventFired = false;
      el.addEventListener('ds-stack-blur', () => {
        blurEventFired = true;
      });

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      stack.focus();
      stack.blur();

      expect(blurEventFired).to.be.true;
    });

    it('should handle keyboard activation', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      let activateEventFired = false;
      el.addEventListener('ds-stack-activate', () => {
        activateEventFired = true;
      });

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      stack.focus();

      // Simulate Enter key press
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      stack.dispatchEvent(enterEvent);

      expect(activateEventFired).to.be.true;
    });

    it('should handle Space key activation', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      let activateEventFired = false;
      el.addEventListener('ds-stack-activate', () => {
        activateEventFired = true;
      });

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      stack.focus();

      // Simulate Space key press
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      stack.dispatchEvent(spaceEvent);

      expect(activateEventFired).to.be.true;
    });
  });

  describe('Events', () => {
    it('should dispatch render event on render', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack
          variant="horizontal"
          size="large"
          align-items="center"
        ></ds-stack>
      `);

      let renderEventFired = false;
      let eventData: any = null;

      el.addEventListener('ds-stack-render', (event: any) => {
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
      expect(eventData.alignItems).to.equal('center');
    });

    it('should not fire events when disabled', async () => {
      const el = await fixture<Stack>(html` <ds-stack disabled></ds-stack> `);

      let focusEventFired = false;
      el.addEventListener('ds-stack-focus', () => {
        focusEventFired = true;
      });

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      stack.focus();

      expect(focusEventFired).to.be.false;
    });
  });

  describe('Public Methods', () => {
    it('should focus the stack when focus() is called', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      const focusSpy = sinon.spy(stack, 'focus');

      el.focus();

      expect(focusSpy.calledOnce).to.be.true;
    });

    it('should blur the stack when blur() is called', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      const blurSpy = sinon.spy(stack, 'blur');

      el.blur();

      expect(blurSpy.calledOnce).to.be.true;
    });

    it('should not focus when disabled', async () => {
      const el = await fixture<Stack>(html` <ds-stack disabled></ds-stack> `);

      const stack = el.shadowRoot?.querySelector('.stack') as HTMLElement;
      const focusSpy = sinon.spy(stack, 'focus');

      el.focus();

      expect(focusSpy.called).to.be.false;
    });

    it('should return correct item count', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </ds-stack>
      `);

      expect(el.getItemCount()).to.equal(4);
    });

    it('should return correct direction for horizontal variant', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack variant="horizontal"></ds-stack>
      `);

      expect(el.getDirection()).to.equal('row');
    });

    it('should return correct direction for vertical variant', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack variant="vertical"></ds-stack>
      `);

      expect(el.getDirection()).to.equal('column');
    });

    it('should return correct direction for default variant', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack variant="default"></ds-stack>
      `);

      expect(el.getDirection()).to.equal('column');
    });
  });

  describe('Property Updates', () => {
    it('should update variant when property changes', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack variant="default"></ds-stack>
      `);

      el.variant = 'horizontal';
      await el.updateComplete;

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--horizontal')).to.be.true;
      expect(stack?.classList.contains('stack--default')).to.be.false;
    });

    it('should update size when property changes', async () => {
      const el = await fixture<Stack>(
        html` <ds-stack size="medium"></ds-stack> `
      );

      el.size = 'large';
      await el.updateComplete;

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--large')).to.be.true;
      expect(stack?.classList.contains('stack--medium')).to.be.false;
    });

    it('should update alignment when property changes', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack align-items="stretch"></ds-stack>
      `);

      el.alignItems = 'center';
      await el.updateComplete;

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--align-center')).to.be.true;
      expect(stack?.classList.contains('stack--align-stretch')).to.be.false;
    });

    it('should update justify content when property changes', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack justify-content="start"></ds-stack>
      `);

      el.justifyContent = 'center';
      await el.updateComplete;

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--justify-center')).to.be.true;
      expect(stack?.classList.contains('stack--justify-start')).to.be.false;
    });

    it('should update wrap when property changes', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      el.wrap = true;
      await el.updateComplete;

      expect(el.wrap).to.be.true;
      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--wrap')).to.be.true;
      expect(stack?.classList.contains('stack--no-wrap')).to.be.false;
    });

    it('should update disabled state when property changes', async () => {
      const el = await fixture<Stack>(html` <ds-stack></ds-stack> `);

      el.disabled = true;
      await el.updateComplete;

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.getAttribute('tabindex')).to.equal('-1');
    });
  });

  describe('Combined Properties', () => {
    it('should handle multiple properties together', async () => {
      const el = await fixture<Stack>(html`
        <ds-stack
          variant="horizontal"
          size="large"
          gap="20px"
          align-items="center"
          justify-content="space-between"
          wrap
          aria-label="Main stack"
        ></ds-stack>
      `);

      expect(el.variant).to.equal('horizontal');
      expect(el.size).to.equal('large');
      expect(el.gap).to.equal('20px');
      expect(el.alignItems).to.equal('center');
      expect(el.justifyContent).to.equal('space-between');
      expect(el.wrap).to.be.true;
      expect(el.ariaLabel).to.equal('Main stack');

      const stack = el.shadowRoot?.querySelector('.stack');
      expect(stack?.classList.contains('stack--horizontal')).to.be.true;
      expect(stack?.classList.contains('stack--large')).to.be.true;
      expect(stack?.classList.contains('stack--align-center')).to.be.true;
      expect(stack?.classList.contains('stack--justify-space-between')).to.be
        .true;
      expect(stack?.classList.contains('stack--wrap')).to.be.true;
      expect(stack?.getAttribute('aria-label')).to.equal('Main stack');

      const styles = stack?.getAttribute('style');
      expect(styles).to.include('gap: 20px');
    });
  });
});
