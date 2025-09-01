import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { Sidebar } from './sidebar.js';

describe('Sidebar Component', () => {
  describe('Component Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Sidebar>(html`<ds-sidebar></ds-sidebar>`);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.disabled).to.be.false;
      expect(el.collapsible).to.be.false;
      expect(el.collapsed).to.be.false;
      expect(el.position).to.equal('left');
    });

    it('should render with custom properties', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar
          variant="expanded"
          size="large"
          position="right"
          aria-label="Custom sidebar"
        ></ds-sidebar>
      `);

      expect(el.variant).to.equal('expanded');
      expect(el.size).to.equal('large');
      expect(el.position).to.equal('right');
      expect(el.ariaLabel).to.equal('Custom sidebar');
    });

    it('should apply correct CSS classes', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar variant="default" size="small"></ds-sidebar>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav?.classList.contains('sidebar--default')).to.be.true;
      expect(nav?.classList.contains('sidebar--small')).to.be.true;
    });

    it('should render with content in slots', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar>
          <p>Main content</p>
          <div slot="footer">Footer content</div>
        </ds-sidebar>
      `);

      const content = el.shadowRoot?.querySelector('.sidebar__content');
      const footer = el.shadowRoot?.querySelector('.sidebar__footer');

      expect(content?.textContent).to.include('Main content');
      expect(footer?.textContent).to.include('Footer content');
    });
  });

  describe('Collapsible Functionality', () => {
    it('should render header when collapsible is true', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const header = el.shadowRoot?.querySelector('.sidebar__header');
      const toggle = el.shadowRoot?.querySelector('.sidebar__toggle');

      expect(header).to.exist;
      expect(toggle).to.exist;
      expect(el.shadowRoot?.querySelector('.sidebar--collapsible')).to.exist;
    });

    it('should not render header when collapsible is false', async () => {
      const el = await fixture<Sidebar>(html`<ds-sidebar></ds-sidebar>`);

      const header = el.shadowRoot?.querySelector('.sidebar__header');
      expect(header).to.not.exist;
    });

    it('should toggle collapsed state when toggle button is clicked', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const toggle = el.shadowRoot?.querySelector(
        '.sidebar__toggle'
      ) as HTMLButtonElement;

      expect(el.getCollapsedState()).to.be.false;

      toggle.click();
      await el.updateComplete;

      expect(el.getCollapsedState()).to.be.true;
      expect(el.shadowRoot?.querySelector('.sidebar--collapsed')).to.exist;
    });

    it('should update ARIA expanded attribute when toggled', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      const toggle = el.shadowRoot?.querySelector(
        '.sidebar__toggle'
      ) as HTMLButtonElement;

      expect(nav?.getAttribute('aria-expanded')).to.equal('true');

      toggle.click();
      await el.updateComplete;

      expect(nav?.getAttribute('aria-expanded')).to.equal('false');
    });

    it('should update toggle button text and icon when collapsed', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const toggle = el.shadowRoot?.querySelector(
        '.sidebar__toggle'
      ) as HTMLButtonElement;
      const toggleText = el.shadowRoot?.querySelector('.sidebar__toggle-text');
      const toggleIcon = el.shadowRoot?.querySelector('.sidebar__toggle-icon');

      expect(toggleText?.textContent).to.equal('Collapse');
      expect(toggleIcon?.textContent).to.equal('←');

      toggle.click();
      await el.updateComplete;

      expect(toggleText?.textContent).to.equal('Expand');
      expect(toggleIcon?.textContent).to.equal('→');
    });
  });

  describe('Public Methods', () => {
    it('should toggle collapsed state using public toggle method', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      expect(el.getCollapsedState()).to.be.false;

      el.toggle();
      await el.updateComplete;

      expect(el.getCollapsedState()).to.be.true;
    });

    it('should collapse using public collapse method', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      expect(el.getCollapsedState()).to.be.false;

      el.collapse();
      await el.updateComplete;

      expect(el.getCollapsedState()).to.be.true;
    });

    it('should expand using public expand method', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible collapsed>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      expect(el.getCollapsedState()).to.be.true;

      el.expand();
      await el.updateComplete;

      expect(el.getCollapsedState()).to.be.false;
    });

    it('should return correct dimensions', async () => {
      const el = await fixture<Sidebar>(html`<ds-sidebar></ds-sidebar>`);

      const dimensions = el.getDimensions();

      expect(dimensions).to.have.property('width');
      expect(dimensions).to.have.property('height');
      expect(dimensions.width).to.be.a('number');
      expect(dimensions.height).to.be.a('number');
    });
  });

  describe('Event Dispatching', () => {
    it('should dispatch render event on render', async () => {
      const el = await fixture<Sidebar>(html`<ds-sidebar></ds-sidebar>`);

      let renderEventFired = false;
      el.addEventListener('ds-sidebar-render', () => {
        renderEventFired = true;
      });

      await el.updateComplete;

      expect(renderEventFired).to.be.true;
    });

    it('should dispatch toggle event when toggled', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      let toggleEventFired = false;
      let eventDetail: any;

      el.addEventListener('ds-sidebar-toggle', (event: any) => {
        toggleEventFired = true;
        eventDetail = event.detail;
      });

      const toggle = el.shadowRoot?.querySelector(
        '.sidebar__toggle'
      ) as HTMLButtonElement;
      toggle.click();
      await el.updateComplete;

      expect(toggleEventFired).to.be.true;
      expect(eventDetail.component).to.equal('sidebar');
      expect(eventDetail.data.collapsed).to.be.true;
    });

    it('should dispatch focus event when focused', async () => {
      const el = await fixture<Sidebar>(html`<ds-sidebar></ds-sidebar>`);

      let focusEventFired = false;
      el.addEventListener('ds-sidebar-focus', () => {
        focusEventFired = true;
      });

      const nav = el.shadowRoot?.querySelector('nav') as HTMLElement;
      nav.focus();

      expect(focusEventFired).to.be.true;
    });

    it('should dispatch blur event when blurred', async () => {
      const el = await fixture<Sidebar>(html`<ds-sidebar></ds-sidebar>`);

      let blurEventFired = false;
      el.addEventListener('ds-sidebar-blur', () => {
        blurEventFired = true;
      });

      const nav = el.shadowRoot?.querySelector('nav') as HTMLElement;
      nav.focus();
      nav.blur();

      expect(blurEventFired).to.be.true;
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle Escape key to collapse sidebar', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const nav = el.shadowRoot?.querySelector('nav') as HTMLElement;
      nav.focus();

      expect(el.getCollapsedState()).to.be.false;

      await sendKeys({ press: 'Escape' });
      await el.updateComplete;

      expect(el.getCollapsedState()).to.be.true;
    });

    it('should handle Enter key on toggle button', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const toggle = el.shadowRoot?.querySelector(
        '.sidebar__toggle'
      ) as HTMLButtonElement;
      toggle.focus();

      expect(el.getCollapsedState()).to.be.false;

      await sendKeys({ press: 'Enter' });
      await el.updateComplete;

      expect(el.getCollapsedState()).to.be.true;
    });

    it('should handle Space key on toggle button', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const toggle = el.shadowRoot?.querySelector(
        '.sidebar__toggle'
      ) as HTMLButtonElement;
      toggle.focus();

      expect(el.getCollapsedState()).to.be.false;

      await sendKeys({ press: ' ' });
      await el.updateComplete;

      expect(el.getCollapsedState()).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA attributes', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar
          collapsible
          aria-label="Main navigation"
          aria-describedby="nav-description"
        >
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const nav = el.shadowRoot?.querySelector('nav');

      expect(nav?.getAttribute('role')).to.equal('navigation');
      expect(nav?.getAttribute('aria-label')).to.equal('Main navigation');
      expect(nav?.getAttribute('aria-describedby')).to.equal('nav-description');
      expect(nav?.getAttribute('aria-expanded')).to.equal('true');
    });

    it('should have correct toggle button ARIA attributes', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const toggle = el.shadowRoot?.querySelector(
        '.sidebar__toggle'
      ) as HTMLButtonElement;

      expect(toggle.getAttribute('aria-label')).to.equal('Collapse sidebar');
      expect(toggle.getAttribute('type')).to.equal('button');
    });

    it('should update toggle button ARIA label when collapsed', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const toggle = el.shadowRoot?.querySelector(
        '.sidebar__toggle'
      ) as HTMLButtonElement;

      expect(toggle.getAttribute('aria-label')).to.equal('Collapse sidebar');

      toggle.click();
      await el.updateComplete;

      expect(toggle.getAttribute('aria-label')).to.equal('Expand sidebar');
    });

    it('should be focusable', async () => {
      const el = await fixture<Sidebar>(html`<ds-sidebar></ds-sidebar>`);

      const nav = el.shadowRoot?.querySelector('nav') as HTMLElement;
      expect(nav.tabIndex).to.equal(0);
    });
  });

  describe('Disabled State', () => {
    it('should not respond to toggle when disabled', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible disabled>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const toggle = el.shadowRoot?.querySelector(
        '.sidebar__toggle'
      ) as HTMLButtonElement;

      expect(el.getCollapsedState()).to.be.false;

      toggle.click();
      await el.updateComplete;

      expect(el.getCollapsedState()).to.be.false;
    });

    it('should not respond to keyboard events when disabled', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar collapsible disabled>
          <span slot="title">Navigation</span>
        </ds-sidebar>
      `);

      const nav = el.shadowRoot?.querySelector('nav') as HTMLElement;
      nav.focus();

      expect(el.getCollapsedState()).to.be.false;

      await sendKeys({ press: 'Escape' });
      await el.updateComplete;

      expect(el.getCollapsedState()).to.be.false;
    });

    it('should have disabled styling', async () => {
      const el = await fixture<Sidebar>(
        html`<ds-sidebar disabled></ds-sidebar>`
      );

      expect(el.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('Property Validation', () => {
    it('should validate variant property', async () => {
      const el = await fixture<Sidebar>(html`<ds-sidebar></ds-sidebar>`);

      // Set invalid variant
      el.variant = 'invalid' as any;
      el.connectedCallback();

      expect(el.variant).to.equal('default');
    });

    it('should validate size property', async () => {
      const el = await fixture<Sidebar>(html`<ds-sidebar></ds-sidebar>`);

      // Set invalid size
      el.size = 'invalid' as any;
      el.connectedCallback();

      expect(el.size).to.equal('medium');
    });

    it('should validate position property', async () => {
      const el = await fixture<Sidebar>(html`<ds-sidebar></ds-sidebar>`);

      // Set invalid position
      el.position = 'invalid' as any;
      el.connectedCallback();

      expect(el.position).to.equal('left');
    });
  });

  describe('Variant Styles', () => {
    it('should apply collapsed variant styles', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar variant="collapsed"></ds-sidebar>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav?.classList.contains('sidebar--collapsed')).to.be.true;
    });

    it('should apply expanded variant styles', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar variant="expanded"></ds-sidebar>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav?.classList.contains('sidebar--expanded')).to.be.true;
    });
  });

  describe('Size Variants', () => {
    it('should apply small size styles', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar size="small"></ds-sidebar>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav?.classList.contains('sidebar--small')).to.be.true;
    });

    it('should apply large size styles', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar size="large"></ds-sidebar>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav?.classList.contains('sidebar--large')).to.be.true;
    });

    it('should apply xlarge size styles', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar size="xlarge"></ds-sidebar>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav?.classList.contains('sidebar--xlarge')).to.be.true;
    });
  });

  describe('Position Variants', () => {
    it('should apply right position styles', async () => {
      const el = await fixture<Sidebar>(html`
        <ds-sidebar position="right"></ds-sidebar>
      `);

      expect(el.hasAttribute('position')).to.be.true;
      expect(el.getAttribute('position')).to.equal('right');
    });
  });
});
