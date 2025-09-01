import { expect, fixture, html } from '@open-wc/testing';
import { Grid } from './grid.js';

describe('Grid Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Grid>(html`<ds-grid></ds-grid>`);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.disabled).to.be.false;
      expect(el.columns).to.equal(3);
      expect(el.alignItems).to.equal('stretch');
      expect(el.justifyContent).to.equal('start');
      expect(el.shadowRoot?.querySelector('.grid')).to.exist;
    });

    it('should render with custom content', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </ds-grid>
      `);

      const slot = el.shadowRoot?.querySelector('slot');
      expect(slot).to.exist;
    });

    it('should apply correct CSS classes', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid variant="responsive" size="large" columns="4"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--responsive')).to.be.true;
      expect(grid?.classList.contains('grid--large')).to.be.true;
      expect(grid?.classList.contains('grid--align-stretch')).to.be.true;
      expect(grid?.classList.contains('grid--justify-start')).to.be.true;
    });
  });

  describe('Variants', () => {
    it('should render default variant', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid variant="default"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--default')).to.be.true;
    });

    it('should render responsive variant', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid variant="responsive"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--responsive')).to.be.true;
    });

    it('should render fixed variant', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid variant="fixed"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--fixed')).to.be.true;
    });

    it('should validate variant and use default for invalid values', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid variant="invalid"></ds-grid>
      `);

      // The component should validate and use default
      expect(el.variant).to.equal('default');
    });
  });

  describe('Sizes', () => {
    it('should render small size', async () => {
      const el = await fixture<Grid>(html` <ds-grid size="small"></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--small')).to.be.true;
    });

    it('should render medium size', async () => {
      const el = await fixture<Grid>(html` <ds-grid size="medium"></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--medium')).to.be.true;
    });

    it('should render large size', async () => {
      const el = await fixture<Grid>(html` <ds-grid size="large"></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--large')).to.be.true;
    });

    it('should render xlarge size', async () => {
      const el = await fixture<Grid>(html` <ds-grid size="xlarge"></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--xlarge')).to.be.true;
    });

    it('should validate size and use default for invalid values', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid size="invalid"></ds-grid>
      `);

      // The component should validate and use default
      expect(el.size).to.equal('medium');
    });
  });

  describe('Columns', () => {
    it('should render with custom number of columns', async () => {
      const el = await fixture<Grid>(html` <ds-grid columns="4"></ds-grid> `);

      expect(el.columns).to.equal(4);
      const grid = el.shadowRoot?.querySelector('.grid');
      const styles = grid?.getAttribute('style');
      expect(styles).to.include('--grid-columns: 4');
    });

    it('should validate columns and use default for invalid values', async () => {
      const el = await fixture<Grid>(html` <ds-grid columns="15"></ds-grid> `);

      // The component should validate and use default (3)
      expect(el.columns).to.equal(3);
    });

    it('should validate columns and use default for values below minimum', async () => {
      const el = await fixture<Grid>(html` <ds-grid columns="0"></ds-grid> `);

      // The component should validate and use default (3)
      expect(el.columns).to.equal(3);
    });
  });

  describe('Alignment', () => {
    it('should render with start alignment', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid align-items="start"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--align-start')).to.be.true;
    });

    it('should render with center alignment', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid align-items="center"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--align-center')).to.be.true;
    });

    it('should render with end alignment', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid align-items="end"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--align-end')).to.be.true;
    });

    it('should render with stretch alignment', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid align-items="stretch"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--align-stretch')).to.be.true;
    });

    it('should validate alignItems and use default for invalid values', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid align-items="invalid"></ds-grid>
      `);

      // The component should validate and use default
      expect(el.alignItems).to.equal('stretch');
    });
  });

  describe('Justify Content', () => {
    it('should render with start justify content', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid justify-content="start"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--justify-start')).to.be.true;
    });

    it('should render with center justify content', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid justify-content="center"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--justify-center')).to.be.true;
    });

    it('should render with end justify content', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid justify-content="end"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--justify-end')).to.be.true;
    });

    it('should render with space-between justify content', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid justify-content="space-between"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--justify-space-between')).to.be
        .true;
    });

    it('should render with space-around justify content', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid justify-content="space-around"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--justify-space-around')).to.be.true;
    });

    it('should render with space-evenly justify content', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid justify-content="space-evenly"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--justify-space-evenly')).to.be.true;
    });

    it('should validate justifyContent and use default for invalid values', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid justify-content="invalid"></ds-grid>
      `);

      // The component should validate and use default
      expect(el.justifyContent).to.equal('start');
    });
  });

  describe('States', () => {
    it('should render disabled state', async () => {
      const el = await fixture<Grid>(html` <ds-grid disabled></ds-grid> `);

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.getAttribute('tabindex')).to.equal('-1');
    });

    it('should not be focusable when disabled', async () => {
      const el = await fixture<Grid>(html` <ds-grid disabled></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      expect(grid?.getAttribute('tabindex')).to.equal('-1');
    });

    it('should be focusable when not disabled', async () => {
      const el = await fixture<Grid>(html` <ds-grid></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      expect(grid?.getAttribute('tabindex')).to.equal('0');
    });
  });

  describe('Custom Properties', () => {
    it('should apply custom gap', async () => {
      const el = await fixture<Grid>(html` <ds-grid gap="20px"></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid');
      const styles = grid?.getAttribute('style');
      expect(styles).to.include('gap: 20px');
    });

    it('should apply custom row gap', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid row-gap="10px"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      const styles = grid?.getAttribute('style');
      expect(styles).to.include('row-gap: 10px');
    });

    it('should apply custom column gap', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid column-gap="15px"></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      const styles = grid?.getAttribute('style');
      expect(styles).to.include('column-gap: 15px');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid
          aria-label="Test grid"
          aria-describedby="description"
          role="grid"
        ></ds-grid>
      `);

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.getAttribute('aria-label')).to.equal('Test grid');
      expect(grid?.getAttribute('aria-describedby')).to.equal('description');
      expect(grid?.getAttribute('role')).to.equal('grid');
    });

    it('should support keyboard navigation', async () => {
      const el = await fixture<Grid>(html` <ds-grid></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      expect(grid?.getAttribute('tabindex')).to.equal('0');
    });

    it('should handle focus events', async () => {
      const el = await fixture<Grid>(html` <ds-grid></ds-grid> `);

      let focusEventFired = false;
      el.addEventListener('ds-grid-focus', () => {
        focusEventFired = true;
      });

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      grid.focus();

      expect(focusEventFired).to.be.true;
    });

    it('should handle blur events', async () => {
      const el = await fixture<Grid>(html` <ds-grid></ds-grid> `);

      let blurEventFired = false;
      el.addEventListener('ds-grid-blur', () => {
        blurEventFired = true;
      });

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      grid.focus();
      grid.blur();

      expect(blurEventFired).to.be.true;
    });

    it('should handle keyboard activation', async () => {
      const el = await fixture<Grid>(html` <ds-grid></ds-grid> `);

      let activateEventFired = false;
      el.addEventListener('ds-grid-activate', () => {
        activateEventFired = true;
      });

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      grid.focus();

      // Simulate Enter key press
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      grid.dispatchEvent(enterEvent);

      expect(activateEventFired).to.be.true;
    });

    it('should handle Space key activation', async () => {
      const el = await fixture<Grid>(html` <ds-grid></ds-grid> `);

      let activateEventFired = false;
      el.addEventListener('ds-grid-activate', () => {
        activateEventFired = true;
      });

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      grid.focus();

      // Simulate Space key press
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      grid.dispatchEvent(spaceEvent);

      expect(activateEventFired).to.be.true;
    });
  });

  describe('Events', () => {
    it('should dispatch render event on render', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid variant="responsive" size="large" columns="4"></ds-grid>
      `);

      let renderEventFired = false;
      let eventData: any = null;

      el.addEventListener('ds-grid-render', (event: any) => {
        renderEventFired = true;
        eventData = event.detail;
      });

      // Trigger a re-render by changing a property
      el.variant = 'fixed';
      await el.updateComplete;

      expect(renderEventFired).to.be.true;
      expect(eventData).to.exist;
      expect(eventData.variant).to.equal('fixed');
      expect(eventData.size).to.equal('large');
      expect(eventData.columns).to.equal(4);
    });

    it('should not fire events when disabled', async () => {
      const el = await fixture<Grid>(html` <ds-grid disabled></ds-grid> `);

      let focusEventFired = false;
      el.addEventListener('ds-grid-focus', () => {
        focusEventFired = true;
      });

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      grid.focus();

      expect(focusEventFired).to.be.false;
    });
  });

  describe('Public Methods', () => {
    it('should focus the grid when focus() is called', async () => {
      const el = await fixture<Grid>(html` <ds-grid></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      const focusSpy = sinon.spy(grid, 'focus');

      el.focus();

      expect(focusSpy.calledOnce).to.be.true;
    });

    it('should blur the grid when blur() is called', async () => {
      const el = await fixture<Grid>(html` <ds-grid></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      const blurSpy = sinon.spy(grid, 'blur');

      el.blur();

      expect(blurSpy.calledOnce).to.be.true;
    });

    it('should not focus when disabled', async () => {
      const el = await fixture<Grid>(html` <ds-grid disabled></ds-grid> `);

      const grid = el.shadowRoot?.querySelector('.grid') as HTMLElement;
      const focusSpy = sinon.spy(grid, 'focus');

      el.focus();

      expect(focusSpy.called).to.be.false;
    });

    it('should return correct item count', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </ds-grid>
      `);

      expect(el.getItemCount()).to.equal(4);
    });

    it('should return correct grid dimensions', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid columns="3">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
        </ds-grid>
      `);

      const dimensions = el.getDimensions();
      expect(dimensions.columns).to.equal(3);
      expect(dimensions.rows).to.equal(2); // 5 items / 3 columns = 2 rows
    });
  });

  describe('Property Updates', () => {
    it('should update variant when property changes', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid variant="default"></ds-grid>
      `);

      el.variant = 'responsive';
      await el.updateComplete;

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--responsive')).to.be.true;
      expect(grid?.classList.contains('grid--default')).to.be.false;
    });

    it('should update size when property changes', async () => {
      const el = await fixture<Grid>(html` <ds-grid size="medium"></ds-grid> `);

      el.size = 'large';
      await el.updateComplete;

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--large')).to.be.true;
      expect(grid?.classList.contains('grid--medium')).to.be.false;
    });

    it('should update columns when property changes', async () => {
      const el = await fixture<Grid>(html` <ds-grid columns="3"></ds-grid> `);

      el.columns = 5;
      await el.updateComplete;

      expect(el.columns).to.equal(5);
      const grid = el.shadowRoot?.querySelector('.grid');
      const styles = grid?.getAttribute('style');
      expect(styles).to.include('--grid-columns: 5');
    });

    it('should update alignment when property changes', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid align-items="stretch"></ds-grid>
      `);

      el.alignItems = 'center';
      await el.updateComplete;

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--align-center')).to.be.true;
      expect(grid?.classList.contains('grid--align-stretch')).to.be.false;
    });

    it('should update justify content when property changes', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid justify-content="start"></ds-grid>
      `);

      el.justifyContent = 'center';
      await el.updateComplete;

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--justify-center')).to.be.true;
      expect(grid?.classList.contains('grid--justify-start')).to.be.false;
    });

    it('should update disabled state when property changes', async () => {
      const el = await fixture<Grid>(html` <ds-grid></ds-grid> `);

      el.disabled = true;
      await el.updateComplete;

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.getAttribute('tabindex')).to.equal('-1');
    });
  });

  describe('Combined Properties', () => {
    it('should handle multiple properties together', async () => {
      const el = await fixture<Grid>(html`
        <ds-grid
          variant="responsive"
          size="large"
          columns="4"
          gap="20px"
          align-items="center"
          justify-content="space-between"
          aria-label="Main grid"
        ></ds-grid>
      `);

      expect(el.variant).to.equal('responsive');
      expect(el.size).to.equal('large');
      expect(el.columns).to.equal(4);
      expect(el.gap).to.equal('20px');
      expect(el.alignItems).to.equal('center');
      expect(el.justifyContent).to.equal('space-between');
      expect(el.ariaLabel).to.equal('Main grid');

      const grid = el.shadowRoot?.querySelector('.grid');
      expect(grid?.classList.contains('grid--responsive')).to.be.true;
      expect(grid?.classList.contains('grid--large')).to.be.true;
      expect(grid?.classList.contains('grid--align-center')).to.be.true;
      expect(grid?.classList.contains('grid--justify-space-between')).to.be
        .true;
      expect(grid?.getAttribute('aria-label')).to.equal('Main grid');

      const styles = grid?.getAttribute('style');
      expect(styles).to.include('--grid-columns: 4');
      expect(styles).to.include('gap: 20px');
    });
  });
});
