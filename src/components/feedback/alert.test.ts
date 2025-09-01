import { expect, fixture, html } from '@open-wc/testing';
import { Alert } from './alert.js';

describe('Alert Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.state).to.equal('default');
      expect(el.dismissible).to.be.false;
      expect(el.role).to.equal('alert');
      expect(el.textContent?.trim()).to.equal('Test alert');
    });

    it('should render with custom variant', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="success">Success message</ds-alert>`
      );

      expect(el.variant).to.equal('success');
      expect(el.getAttribute('variant')).to.equal('success');
    });

    it('should render with custom size', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert size="large">Large alert</ds-alert>`
      );

      expect(el.size).to.equal('large');
      expect(el.getAttribute('size')).to.equal('large');
    });

    it('should render with dismissible attribute', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert dismissible>Dismissible alert</ds-alert>`
      );

      expect(el.dismissible).to.be.true;
      expect(el.getAttribute('dismissible')).to.equal('');
    });

    it('should render with custom role', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert role="status">Status alert</ds-alert>`
      );

      expect(el.role).to.equal('status');
      expect(el.getAttribute('role')).to.equal('status');
    });
  });

  describe('Variants', () => {
    it('should render default variant correctly', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="default">Default alert</ds-alert>`
      );
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.class('alert--default');
    });

    it('should render success variant correctly', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="success">Success alert</ds-alert>`
      );
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.class('alert--success');
    });

    it('should render warning variant correctly', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="warning">Warning alert</ds-alert>`
      );
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.class('alert--warning');
    });

    it('should render error variant correctly', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="error">Error alert</ds-alert>`
      );
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.class('alert--error');
    });

    it('should render info variant correctly', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="info">Info alert</ds-alert>`
      );
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.class('alert--info');
    });
  });

  describe('Sizes', () => {
    it('should render small size correctly', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert size="small">Small alert</ds-alert>`
      );
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.class('alert--small');
    });

    it('should render medium size correctly', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert size="medium">Medium alert</ds-alert>`
      );
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.class('alert--medium');
    });

    it('should render large size correctly', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert size="large">Large alert</ds-alert>`
      );
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.class('alert--large');
    });
  });

  describe('Dismissible Functionality', () => {
    it('should show dismiss button when dismissible is true', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert dismissible>Dismissible alert</ds-alert>`
      );
      const dismissButton = el.shadowRoot?.querySelector('.alert__dismiss');

      expect(dismissButton).to.exist;
      expect(dismissButton).to.have.attribute('aria-label', 'Dismiss alert');
    });

    it('should not show dismiss button when dismissible is false', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert>Non-dismissible alert</ds-alert>`
      );
      const dismissButton = el.shadowRoot?.querySelector('.alert__dismiss');

      expect(dismissButton).to.not.exist;
    });

    it('should dismiss alert when dismiss button is clicked', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert dismissible>Dismissible alert</ds-alert>`
      );
      const dismissButton = el.shadowRoot?.querySelector(
        '.alert__dismiss'
      ) as HTMLButtonElement;

      expect(el.isVisible()).to.be.true;

      dismissButton.click();

      expect(el.isVisible()).to.be.false;
      expect(el.hidden).to.be.true;
    });

    it('should dismiss alert when dismiss method is called', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert dismissible>Dismissible alert</ds-alert>`
      );

      expect(el.isVisible()).to.be.true;

      el.dismiss();

      expect(el.isVisible()).to.be.false;
      expect(el.hidden).to.be.true;
    });

    it('should not dismiss alert when dismiss method is called on non-dismissible alert', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert>Non-dismissible alert</ds-alert>`
      );

      expect(el.isVisible()).to.be.true;

      el.dismiss();

      expect(el.isVisible()).to.be.true;
      expect(el.hidden).to.be.false;
    });

    it('should show alert when show method is called', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert dismissible>Dismissible alert</ds-alert>`
      );

      el.dismiss();
      expect(el.isVisible()).to.be.false;

      el.show();
      expect(el.isVisible()).to.be.true;
      expect(el.hidden).to.be.false;
    });
  });

  describe('Icons', () => {
    it('should render default icon', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="default">Default alert</ds-alert>`
      );
      const icon = el.shadowRoot?.querySelector('.alert__icon');

      expect(icon).to.exist;
      expect(icon?.textContent?.trim()).to.equal('ℹ️');
    });

    it('should render success icon', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="success">Success alert</ds-alert>`
      );
      const icon = el.shadowRoot?.querySelector('.alert__icon');

      expect(icon).to.exist;
      expect(icon?.textContent?.trim()).to.equal('✅');
    });

    it('should render warning icon', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="warning">Warning alert</ds-alert>`
      );
      const icon = el.shadowRoot?.querySelector('.alert__icon');

      expect(icon).to.exist;
      expect(icon?.textContent?.trim()).to.equal('⚠️');
    });

    it('should render error icon', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="error">Error alert</ds-alert>`
      );
      const icon = el.shadowRoot?.querySelector('.alert__icon');

      expect(icon).to.exist;
      expect(icon?.textContent?.trim()).to.equal('❌');
    });

    it('should render info icon', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="info">Info alert</ds-alert>`
      );
      const icon = el.shadowRoot?.querySelector('.alert__icon');

      expect(icon).to.exist;
      expect(icon?.textContent?.trim()).to.equal('ℹ️');
    });

    it('should have aria-hidden on icon', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);
      const icon = el.shadowRoot?.querySelector('.alert__icon');

      expect(icon).to.have.attribute('aria-hidden', 'true');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.attribute('role', 'alert');
      expect(alertElement).to.have.attribute('tabindex', '0');
    });

    it('should have custom aria-label when provided', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert aria-label="Custom label">Test alert</ds-alert>`
      );
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.attribute('aria-label', 'Custom label');
    });

    it('should have aria-describedby when provided', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert aria-describedby="description">Test alert</ds-alert>`
      );
      const alertElement = el.shadowRoot?.querySelector('.alert');

      expect(alertElement).to.have.attribute('aria-describedby', 'description');
    });

    it('should be focusable', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);
      const alertElement = el.shadowRoot?.querySelector(
        '.alert'
      ) as HTMLElement;

      alertElement.focus();
      expect(document.activeElement).to.equal(alertElement);
    });

    it('should support keyboard navigation for dismiss button', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert dismissible>Dismissible alert</ds-alert>`
      );
      const dismissButton = el.shadowRoot?.querySelector(
        '.alert__dismiss'
      ) as HTMLButtonElement;

      dismissButton.focus();
      expect(document.activeElement).to.equal(dismissButton);
    });
  });

  describe('Events', () => {
    it('should dispatch render event on render', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);
      const renderEvent = new Promise(resolve => {
        el.addEventListener('ds-alert-render', event => {
          resolve(event);
        });
      });

      await renderEvent;
      expect(true).to.be.true; // Event was dispatched
    });

    it('should dispatch focus event on focus', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);
      const alertElement = el.shadowRoot?.querySelector(
        '.alert'
      ) as HTMLElement;

      const focusEvent = new Promise(resolve => {
        el.addEventListener('ds-alert-focus', event => {
          resolve(event);
        });
      });

      alertElement.focus();
      await focusEvent;
      expect(el.state).to.equal('focus');
    });

    it('should dispatch blur event on blur', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);
      const alertElement = el.shadowRoot?.querySelector(
        '.alert'
      ) as HTMLElement;

      const blurEvent = new Promise(resolve => {
        el.addEventListener('ds-alert-blur', event => {
          resolve(event);
        });
      });

      alertElement.focus();
      alertElement.blur();
      await blurEvent;
      expect(el.state).to.equal('default');
    });

    it('should dispatch dismiss event when dismissed', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert dismissible>Dismissible alert</ds-alert>`
      );

      const dismissEvent = new Promise(resolve => {
        el.addEventListener('ds-alert-dismiss', event => {
          resolve(event);
        });
      });

      el.dismiss();
      await dismissEvent;
      expect(true).to.be.true; // Event was dispatched
    });
  });

  describe('Public Methods', () => {
    it('should focus the alert element', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);
      const alertElement = el.shadowRoot?.querySelector(
        '.alert'
      ) as HTMLElement;

      el.focus();
      expect(document.activeElement).to.equal(alertElement);
    });

    it('should blur the alert element', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);
      const alertElement = el.shadowRoot?.querySelector(
        '.alert'
      ) as HTMLElement;

      alertElement.focus();
      el.blur();
      expect(document.activeElement).to.not.equal(alertElement);
    });

    it('should get text content', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert>Test alert content</ds-alert>`
      );

      expect(el.getTextContent()).to.equal('Test alert content');
    });

    it('should get dimensions', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);
      const dimensions = el.getDimensions();

      expect(dimensions).to.have.property('width');
      expect(dimensions).to.have.property('height');
      expect(dimensions.width).to.be.a('number');
      expect(dimensions.height).to.be.a('number');
    });

    it('should check if visible', async () => {
      const el = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);

      expect(el.isVisible()).to.be.true;

      el.dismiss();
      expect(el.isVisible()).to.be.false;
    });

    it('should check if dismissible', async () => {
      const el1 = await fixture<Alert>(html`<ds-alert>Test alert</ds-alert>`);
      const el2 = await fixture<Alert>(
        html`<ds-alert dismissible>Dismissible alert</ds-alert>`
      );

      expect(el1.isDismissible()).to.be.false;
      expect(el2.isDismissible()).to.be.true;
    });
  });

  describe('Property Validation', () => {
    it('should validate variant property', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert variant="invalid">Test alert</ds-alert>`
      );

      expect(el.variant).to.equal('default');
    });

    it('should validate size property', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert size="invalid">Test alert</ds-alert>`
      );

      expect(el.size).to.equal('medium');
    });

    it('should validate state property', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert state="invalid">Test alert</ds-alert>`
      );

      expect(el.state).to.equal('default');
    });

    it('should validate role property', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert role="invalid">Test alert</ds-alert>`
      );

      expect(el.role).to.equal('alert');
    });
  });

  describe('Disabled State', () => {
    it('should handle disabled state', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert disabled>Disabled alert</ds-alert>`
      );

      expect(el.disabled).to.be.true;
      expect(el.getAttribute('disabled')).to.equal('');
    });

    it('should not be dismissible when disabled', async () => {
      const el = await fixture<Alert>(
        html`<ds-alert dismissible disabled>Disabled alert</ds-alert>`
      );

      el.dismiss();
      expect(el.isVisible()).to.be.true;
    });
  });

  describe('Content Slots', () => {
    it('should render slot content', async () => {
      const el = await fixture<Alert>(html`
        <ds-alert>
          <strong>Bold text</strong> and <em>italic text</em>
        </ds-alert>
      `);

      expect(el.innerHTML).to.include('<strong>Bold text</strong>');
      expect(el.innerHTML).to.include('<em>italic text</em>');
    });

    it('should render complex content', async () => {
      const el = await fixture<Alert>(html`
        <ds-alert>
          <h3>Alert Title</h3>
          <p>Alert description with <a href="#">link</a></p>
        </ds-alert>
      `);

      expect(el.innerHTML).to.include('<h3>Alert Title</h3>');
      expect(el.innerHTML).to.include(
        '<p>Alert description with <a href="#">link</a></p>'
      );
    });
  });
});
