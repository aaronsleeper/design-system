import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { Pagination } from './pagination.js';

describe('Pagination Component', () => {
  describe('Component Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.state).to.equal('default');
      expect(el.currentPage).to.equal(3);
      expect(el.totalPages).to.equal(10);
      expect(el.showFirstLast).to.equal(false);
      expect(el.showPreviousNext).to.equal(true);
      expect(el.maxVisiblePages).to.equal(7);
    });

    it('should render with custom properties', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          variant="minimal"
          size="large"
          current-page="5"
          total-pages="20"
          show-first-last
          max-visible-pages="5"
        ></ds-pagination>
      `);

      expect(el.variant).to.equal('minimal');
      expect(el.size).to.equal('large');
      expect(el.currentPage).to.equal(5);
      expect(el.totalPages).to.equal(20);
      expect(el.showFirstLast).to.equal(true);
      expect(el.maxVisiblePages).to.equal(5);
    });

    it('should render pagination items correctly', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      const items = el.shadowRoot?.querySelectorAll('.pagination__item');
      expect(items).to.have.length.greaterThan(0);

      const buttons = el.shadowRoot?.querySelectorAll('.pagination__button');
      expect(buttons).to.have.length.greaterThan(0);

      const currentButton = el.shadowRoot?.querySelector(
        '.pagination__button--current'
      );
      expect(currentButton).to.exist;
      expect(currentButton?.textContent?.trim()).to.equal('3');
    });

    it('should apply correct CSS classes', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          variant="compact"
          size="small"
          current-page="2"
          total-pages="5"
        ></ds-pagination>
      `);

      const pagination = el.shadowRoot?.querySelector('.pagination');
      expect(pagination).to.have.class('pagination--compact');
      expect(pagination).to.have.class('pagination--small');
    });

    it('should render with single page', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="1" total-pages="1"></ds-pagination>
      `);

      const buttons = el.shadowRoot?.querySelectorAll('.pagination__button');
      expect(buttons).to.have.length(1);
      expect(buttons[0]).to.have.class('pagination__button--current');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          aria-label="Custom pagination"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav).to.have.attribute('role', 'navigation');
      expect(nav).to.have.attribute('aria-label', 'Custom pagination');
    });

    it('should have default aria-label when not provided', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav).to.have.attribute('aria-label', 'Pagination navigation');
    });

    it('should mark current page with aria-current', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      const currentButton = el.shadowRoot?.querySelector(
        '.pagination__button--current'
      );
      expect(currentButton).to.have.attribute('aria-current', 'page');
    });

    it('should have proper tabindex for keyboard navigation', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav).to.have.attribute('tabindex', '0');
    });

    it('should support aria-describedby', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          aria-describedby="pagination-desc"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      `);

      const nav = el.shadowRoot?.querySelector('nav');
      expect(nav).to.have.attribute('aria-describedby', 'pagination-desc');
    });

    it('should have proper aria-labels for navigation buttons', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          current-page="3"
          total-pages="10"
          show-first-last
        ></ds-pagination>
      `);

      const previousButton = el.shadowRoot?.querySelector(
        'button[aria-label="Go to previous page"]'
      );
      expect(previousButton).to.exist;

      const nextButton = el.shadowRoot?.querySelector(
        'button[aria-label="Go to next page"]'
      );
      expect(nextButton).to.exist;
    });
  });

  describe('Event Handling', () => {
    it('should dispatch render event on render', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      let renderEventFired = false;
      el.addEventListener('ds-pagination-render', () => {
        renderEventFired = true;
      });

      // Trigger a re-render
      el.requestUpdate();
      await el.updateComplete;

      expect(renderEventFired).to.be.true;
    });

    it('should dispatch navigate event when page is clicked', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      let navigateEventFired = false;
      let navigateEventData: any = null;

      el.addEventListener('ds-pagination-navigate', (event: any) => {
        navigateEventFired = true;
        navigateEventData = event.detail;
      });

      const pageButton = el.shadowRoot?.querySelector(
        'button[aria-label="Go to page 4"]'
      ) as HTMLElement;
      pageButton.click();

      expect(navigateEventFired).to.be.true;
      expect(navigateEventData.data.page).to.equal(4);
      expect(navigateEventData.data.type).to.equal('page');
    });

    it('should dispatch navigate event for previous button', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      let navigateEventFired = false;
      let navigateEventData: any = null;

      el.addEventListener('ds-pagination-navigate', (event: any) => {
        navigateEventFired = true;
        navigateEventData = event.detail;
      });

      const previousButton = el.shadowRoot?.querySelector(
        'button[aria-label="Go to previous page"]'
      ) as HTMLElement;
      previousButton.click();

      expect(navigateEventFired).to.be.true;
      expect(navigateEventData.data.page).to.equal(2);
      expect(navigateEventData.data.type).to.equal('previous');
    });

    it('should dispatch navigate event for next button', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      let navigateEventFired = false;
      let navigateEventData: any = null;

      el.addEventListener('ds-pagination-navigate', (event: any) => {
        navigateEventFired = true;
        navigateEventData = event.detail;
      });

      const nextButton = el.shadowRoot?.querySelector(
        'button[aria-label="Go to next page"]'
      ) as HTMLElement;
      nextButton.click();

      expect(navigateEventFired).to.be.true;
      expect(navigateEventData.data.page).to.equal(4);
      expect(navigateEventData.data.type).to.equal('next');
    });

    it('should not dispatch navigate event for ellipsis', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="5" total-pages="20"></ds-pagination>
      `);

      let navigateEventFired = false;
      el.addEventListener('ds-pagination-navigate', () => {
        navigateEventFired = true;
      });

      const ellipsisButton = el.shadowRoot?.querySelector(
        '.pagination__button--ellipsis'
      ) as HTMLElement;
      ellipsisButton.click();

      expect(navigateEventFired).to.be.false;
    });

    it('should dispatch focus and blur events', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      let focusEventFired = false;
      let blurEventFired = false;

      el.addEventListener('ds-pagination-focus', () => {
        focusEventFired = true;
      });

      el.addEventListener('ds-pagination-blur', () => {
        blurEventFired = true;
      });

      const nav = el.shadowRoot?.querySelector('nav') as HTMLElement;
      nav.focus();
      nav.blur();

      expect(focusEventFired).to.be.true;
      expect(blurEventFired).to.be.true;
    });
  });

  describe('Page Generation Logic', () => {
    it('should show all pages when total pages is less than max visible', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          current-page="3"
          total-pages="5"
          max-visible-pages="7"
        ></ds-pagination>
      `);

      const pageButtons = el.shadowRoot?.querySelectorAll(
        'button[aria-label*="Go to page"]'
      );
      expect(pageButtons).to.have.length(5);
    });

    it('should show ellipsis when total pages exceeds max visible', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          current-page="5"
          total-pages="20"
          max-visible-pages="7"
        ></ds-pagination>
      `);

      const ellipsisButton = el.shadowRoot?.querySelector(
        '.pagination__button--ellipsis'
      );
      expect(ellipsisButton).to.exist;
    });

    it('should show first and last buttons when enabled', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          current-page="5"
          total-pages="20"
          show-first-last
        ></ds-pagination>
      `);

      const firstButton = el.shadowRoot?.querySelector(
        'button[aria-label="Go to first page"]'
      );
      const lastButton = el.shadowRoot?.querySelector(
        'button[aria-label="Go to last page"]'
      );

      expect(firstButton).to.exist;
      expect(lastButton).to.exist;
    });

    it('should not show first/last buttons when on first/last page', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          current-page="1"
          total-pages="10"
          show-first-last
        ></ds-pagination>
      `);

      const firstButton = el.shadowRoot?.querySelector(
        'button[aria-label="Go to first page"]'
      );
      expect(firstButton).to.not.exist;
    });

    it('should calculate total pages from total items', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          current-page="1"
          total-items="100"
          items-per-page="10"
        ></ds-pagination>
      `);

      expect(el.totalPages).to.equal(10);
    });
  });

  describe('Public Methods', () => {
    it('should go to specific page', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      el.goToPage(5);
      expect(el.currentPage).to.equal(5);
    });

    it('should not go to invalid page', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      el.goToPage(15);
      expect(el.currentPage).to.equal(10); // Should clamp to max

      el.goToPage(0);
      expect(el.currentPage).to.equal(1); // Should clamp to min
    });

    it('should navigate to next page', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      el.nextPage();
      expect(el.currentPage).to.equal(4);
    });

    it('should not navigate beyond last page', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="10" total-pages="10"></ds-pagination>
      `);

      el.nextPage();
      expect(el.currentPage).to.equal(10); // Should not change
    });

    it('should navigate to previous page', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      el.previousPage();
      expect(el.currentPage).to.equal(2);
    });

    it('should not navigate before first page', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="1" total-pages="10"></ds-pagination>
      `);

      el.previousPage();
      expect(el.currentPage).to.equal(1); // Should not change
    });

    it('should go to first page', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="5" total-pages="10"></ds-pagination>
      `);

      el.firstPage();
      expect(el.currentPage).to.equal(1);
    });

    it('should go to last page', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="5" total-pages="10"></ds-pagination>
      `);

      el.lastPage();
      expect(el.currentPage).to.equal(10);
    });

    it('should get pagination info correctly', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          current-page="3"
          total-pages="10"
          total-items="100"
          items-per-page="10"
        ></ds-pagination>
      `);

      const info = el.getPaginationInfo();
      expect(info.currentPage).to.equal(3);
      expect(info.totalPages).to.equal(10);
      expect(info.totalItems).to.equal(100);
      expect(info.itemsPerPage).to.equal(10);
      expect(info.startItem).to.equal(21);
      expect(info.endItem).to.equal(30);
    });

    it('should get dimensions correctly', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      const dimensions = el.getDimensions();
      expect(dimensions).to.have.property('width');
      expect(dimensions).to.have.property('height');
    });

    it('should focus and blur correctly', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
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
      const el = await fixture<Pagination>(html`
        <ds-pagination
          variant="invalid"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      `);

      expect(el.variant).to.equal('default');
    });

    it('should validate size property', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          size="invalid"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      `);

      expect(el.size).to.equal('medium');
    });

    it('should validate state property', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          state="invalid"
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      `);

      expect(el.state).to.equal('default');
    });

    it('should validate numeric properties', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          current-page="-1"
          total-pages="0"
          items-per-page="-5"
          max-visible-pages="1"
        ></ds-pagination>
      `);

      expect(el.currentPage).to.equal(1);
      expect(el.totalPages).to.equal(1);
      expect(el.itemsPerPage).to.equal(10);
      expect(el.maxVisiblePages).to.equal(7);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable with Tab key', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      const nav = el.shadowRoot?.querySelector('nav') as HTMLElement;
      nav.focus();

      expect(document.activeElement).to.equal(nav);
    });

    it('should handle Enter key on buttons', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="3" total-pages="10"></ds-pagination>
      `);

      let navigateEventFired = false;
      el.addEventListener('ds-pagination-navigate', () => {
        navigateEventFired = true;
      });

      const nextButton = el.shadowRoot?.querySelector(
        'button[aria-label="Go to next page"]'
      ) as HTMLElement;
      nextButton.focus();
      await sendKeys({ press: 'Enter' });

      expect(navigateEventFired).to.be.true;
    });
  });

  describe('Disabled State', () => {
    it('should disable pointer events when disabled', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          disabled
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      `);

      expect(el).to.have.attribute('disabled');
    });

    it('should not dispatch navigate events when disabled', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          disabled
          current-page="3"
          total-pages="10"
        ></ds-pagination>
      `);

      let navigateEventFired = false;
      el.addEventListener('ds-pagination-navigate', () => {
        navigateEventFired = true;
      });

      const pageButton = el.shadowRoot?.querySelector(
        'button[aria-label="Go to page 4"]'
      ) as HTMLElement;
      pageButton.click();

      expect(navigateEventFired).to.be.false;
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero total items', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          current-page="1"
          total-items="0"
          items-per-page="10"
        ></ds-pagination>
      `);

      const info = el.getPaginationInfo();
      expect(info.startItem).to.equal(0);
      expect(info.endItem).to.equal(0);
    });

    it('should handle single item', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination
          current-page="1"
          total-items="1"
          items-per-page="10"
        ></ds-pagination>
      `);

      const info = el.getPaginationInfo();
      expect(info.startItem).to.equal(1);
      expect(info.endItem).to.equal(1);
    });

    it('should handle current page greater than total pages', async () => {
      const el = await fixture<Pagination>(html`
        <ds-pagination current-page="15" total-pages="10"></ds-pagination>
      `);

      expect(el.currentPage).to.equal(10);
    });
  });
});
