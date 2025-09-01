import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { Breadcrumb, BreadcrumbItem } from './breadcrumb.js';

describe('Breadcrumb Component', () => {
  const sampleItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', current: true },
  ];

  describe('Component Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.state).to.equal('default');
      expect(el.separator).to.equal('/');
      expect(el.items).to.deep.equal(sampleItems);
    });

    it('should render with custom properties', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb
          variant="minimal"
          size="large"
          separator=">"
          .items="${sampleItems}"
        ></ds-breadcrumb>
      `);

      expect(el.variant).to.equal('minimal');
      expect(el.size).to.equal('large');
      expect(el.separator).to.equal('>');
    });

    it('should render breadcrumb items correctly', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const items = el.shadowRoot?.querySelectorAll('.breadcrumb__item');
      expect(items).to.have.length(3);

      const links = el.shadowRoot?.querySelectorAll('.breadcrumb__link');
      expect(links).to.have.length(3);

      const separators = el.shadowRoot?.querySelectorAll(
        '.breadcrumb__separator'
      );
      expect(separators).to.have.length(2); // Last item has no separator
    });

    it('should apply correct CSS classes', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb
          variant="compact"
          size="small"
          .items="${sampleItems}"
        ></ds-breadcrumb>
      `);

      const breadcrumb = el.shadowRoot?.querySelector('.breadcrumb');
      expect(breadcrumb).to.have.class('breadcrumb--compact');
      expect(breadcrumb).to.have.class('breadcrumb--small');
    });

    it('should render with empty items array', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${[]}"></ds-breadcrumb>
      `);

      const items = el.shadowRoot?.querySelectorAll('.breadcrumb__item');
      expect(items).to.have.length(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb
          aria-label="Custom breadcrumb"
          .items="${sampleItems}"
        ></ds-breadcrumb>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav).to.have.attribute('role', 'navigation');
      expect(nav).to.have.attribute('aria-label', 'Custom breadcrumb');
    });

    it('should have default aria-label when not provided', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav).to.have.attribute('aria-label', 'Breadcrumb navigation');
    });

    it('should mark current item with aria-current', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const currentLink = el.shadowRoot?.querySelector(
        '.breadcrumb__link--current'
      );
      expect(currentLink).to.have.attribute('aria-current', 'page');
    });

    it('should have proper tabindex for keyboard navigation', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav).to.have.attribute('tabindex', '0');
    });

    it('should support aria-describedby', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb
          aria-describedby="breadcrumb-desc"
          .items="${sampleItems}"
        ></ds-breadcrumb>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav).to.have.attribute('aria-describedby', 'breadcrumb-desc');
    });
  });

  describe('Event Handling', () => {
    it('should dispatch render event on render', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      let renderEventFired = false;
      el.addEventListener('ds-breadcrumb-render', () => {
        renderEventFired = true;
      });

      // Trigger a re-render
      el.requestUpdate();
      await el.updateComplete;

      expect(renderEventFired).to.be.true;
    });

    it('should dispatch navigate event when item is clicked', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      let navigateEventFired = false;
      let navigateEventData: any = null;

      el.addEventListener('ds-breadcrumb-navigate', (event: any) => {
        navigateEventFired = true;
        navigateEventData = event.detail;
      });

      const firstLink = el.shadowRoot?.querySelector(
        '.breadcrumb__link'
      ) as HTMLElement;
      firstLink.click();

      expect(navigateEventFired).to.be.true;
      expect(navigateEventData.data.item).to.deep.equal(sampleItems[0]);
      expect(navigateEventData.data.index).to.equal(0);
    });

    it('should not dispatch navigate event for current item', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      let navigateEventFired = false;
      el.addEventListener('ds-breadcrumb-navigate', () => {
        navigateEventFired = true;
      });

      const currentLink = el.shadowRoot?.querySelector(
        '.breadcrumb__link--current'
      ) as HTMLElement;
      currentLink.click();

      expect(navigateEventFired).to.be.false;
    });

    it('should dispatch focus and blur events', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      let focusEventFired = false;
      let blurEventFired = false;

      el.addEventListener('ds-breadcrumb-focus', () => {
        focusEventFired = true;
      });

      el.addEventListener('ds-breadcrumb-blur', () => {
        blurEventFired = true;
      });

      const nav = el.shadowRoot?.querySelector('nav') as HTMLElement;
      nav.focus();
      nav.blur();

      expect(focusEventFired).to.be.true;
      expect(blurEventFired).to.be.true;
    });
  });

  describe('Item States', () => {
    it('should handle disabled items correctly', async () => {
      const itemsWithDisabled: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Disabled', href: '/disabled', disabled: true },
        { label: 'Current', current: true },
      ];

      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${itemsWithDisabled}"></ds-breadcrumb>
      `);

      const disabledLink = el.shadowRoot?.querySelector(
        '.breadcrumb__link--disabled'
      );
      expect(disabledLink).to.exist;
      expect(disabledLink).to.have.class('breadcrumb__link--disabled');
    });

    it('should handle current item correctly', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const currentLink = el.shadowRoot?.querySelector(
        '.breadcrumb__link--current'
      );
      expect(currentLink).to.exist;
      expect(currentLink).to.have.class('breadcrumb__link--current');
    });

    it('should render items without href as spans', async () => {
      const itemsWithoutHref: BreadcrumbItem[] = [
        { label: 'Home' },
        { label: 'Products' },
        { label: 'Current', current: true },
      ];

      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${itemsWithoutHref}"></ds-breadcrumb>
      `);

      const spans = el.shadowRoot?.querySelectorAll('span.breadcrumb__link');
      expect(spans).to.have.length(3);
    });
  });

  describe('Public Methods', () => {
    it('should get items correctly', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const items = el.getItems();
      expect(items).to.deep.equal(sampleItems);
      expect(items).to.not.equal(sampleItems); // Should be a copy
    });

    it('should set items correctly', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${[]}"></ds-breadcrumb>
      `);

      el.setItems(sampleItems);
      expect(el.items).to.deep.equal(sampleItems);
    });

    it('should add item correctly', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const newItem: BreadcrumbItem = { label: 'New Item', href: '/new' };
      el.addItem(newItem, 1);

      expect(el.items[1]).to.deep.equal(newItem);
      expect(el.items).to.have.length(4);
    });

    it('should add item at end when no index provided', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const newItem: BreadcrumbItem = { label: 'New Item', href: '/new' };
      el.addItem(newItem);

      expect(el.items[el.items.length - 1]).to.deep.equal(newItem);
    });

    it('should remove item correctly', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const removedItem = el.removeItem(1);
      expect(removedItem).to.deep.equal(sampleItems[1]);
      expect(el.items).to.have.length(2);
    });

    it('should return undefined when removing invalid index', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const removedItem = el.removeItem(10);
      expect(removedItem).to.be.undefined;
    });

    it('should get current item correctly', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const currentItem = el.getCurrentItem();
      expect(currentItem).to.deep.equal(sampleItems[2]);
    });

    it('should return undefined when no current item', async () => {
      const itemsWithoutCurrent: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
      ];

      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${itemsWithoutCurrent}"></ds-breadcrumb>
      `);

      const currentItem = el.getCurrentItem();
      expect(currentItem).to.be.undefined;
    });

    it('should get dimensions correctly', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const dimensions = el.getDimensions();
      expect(dimensions).to.have.property('width');
      expect(dimensions).to.have.property('height');
    });

    it('should focus and blur correctly', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      el.focus();
      const nav = el.shadowRoot?.querySelector('nav') as HTMLElement;
      expect(document.activeElement).to.equal(nav);

      el.blur();
      expect(document.activeElement).to.not.equal(nav);
    });
  });

  describe('Property Validation', () => {
    it('should validate variant property', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb
          variant="invalid"
          .items="${sampleItems}"
        ></ds-breadcrumb>
      `);

      expect(el.variant).to.equal('default');
    });

    it('should validate size property', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb size="invalid" .items="${sampleItems}"></ds-breadcrumb>
      `);

      expect(el.size).to.equal('medium');
    });

    it('should validate state property', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb state="invalid" .items="${sampleItems}"></ds-breadcrumb>
      `);

      expect(el.state).to.equal('default');
    });

    it('should handle non-array items', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb></ds-breadcrumb>
      `);

      // @ts-ignore - Testing invalid input
      el.items = 'not an array';
      el.connectedCallback();

      expect(el.items).to.deep.equal([]);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable with Tab key', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      const nav = el.shadowRoot?.querySelector('nav') as HTMLElement;
      nav.focus();

      expect(document.activeElement).to.equal(nav);
    });

    it('should handle Enter key on links', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb .items="${sampleItems}"></ds-breadcrumb>
      `);

      let navigateEventFired = false;
      el.addEventListener('ds-breadcrumb-navigate', () => {
        navigateEventFired = true;
      });

      const firstLink = el.shadowRoot?.querySelector(
        '.breadcrumb__link'
      ) as HTMLElement;
      firstLink.focus();
      await sendKeys({ press: 'Enter' });

      expect(navigateEventFired).to.be.true;
    });
  });

  describe('Disabled State', () => {
    it('should disable pointer events when disabled', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb disabled .items="${sampleItems}"></ds-breadcrumb>
      `);

      expect(el).to.have.attribute('disabled');
    });

    it('should not dispatch navigate events when disabled', async () => {
      const el = await fixture<Breadcrumb>(html`
        <ds-breadcrumb disabled .items="${sampleItems}"></ds-breadcrumb>
      `);

      let navigateEventFired = false;
      el.addEventListener('ds-breadcrumb-navigate', () => {
        navigateEventFired = true;
      });

      const firstLink = el.shadowRoot?.querySelector(
        '.breadcrumb__link'
      ) as HTMLElement;
      firstLink.click();

      expect(navigateEventFired).to.be.false;
    });
  });
});
