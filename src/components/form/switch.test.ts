import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { Switch } from './switch.js';

describe('Switch Component', () => {
  describe('Basic Functionality', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);

      expect(el.size).to.equal('medium');
      expect(el.checked).to.equal(false);
      expect(el.disabled).to.equal(false);
      expect(el.required).to.equal(false);
      expect(el.validationState).to.equal('default');
    });

    it('should render with custom properties', async () => {
      const el = await fixture<Switch>(html`
        <ds-switch
          size="large"
          checked
          disabled
          required
          validation-state="error"
          error-message="This field is required"
        ></ds-switch>
      `);

      expect(el.size).to.equal('large');
      expect(el.checked).to.equal(true);
      expect(el.disabled).to.equal(true);
      expect(el.required).to.equal(true);
      expect(el.validationState).to.equal('error');
      expect(el.errorMessage).to.equal('This field is required');
    });

    it('should reflect properties to attributes', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);

      el.size = 'small';
      el.checked = true;
      el.disabled = true;
      el.required = true;

      await el.updateComplete;

      expect(el.getAttribute('size')).to.equal('small');
      expect(el.hasAttribute('checked')).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;
      expect(el.hasAttribute('required')).to.be.true;
    });
  });

  describe('Size Variants', () => {
    it('should apply small size classes', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch size="small"></ds-switch>`
      );
      const track = el.shadowRoot?.querySelector('.switch-track');
      const thumb = el.shadowRoot?.querySelector('.switch-thumb');
      const label = el.shadowRoot?.querySelector('.switch-label');

      expect(track?.classList.contains('switch-track--small')).to.be.true;
      expect(thumb?.classList.contains('switch-thumb--small')).to.be.true;
      expect(label?.classList.contains('switch-label--small')).to.be.true;
    });

    it('should apply medium size classes', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch size="medium"></ds-switch>`
      );
      const track = el.shadowRoot?.querySelector('.switch-track');
      const thumb = el.shadowRoot?.querySelector('.switch-thumb');
      const label = el.shadowRoot?.querySelector('.switch-label');

      expect(track?.classList.contains('switch-track--medium')).to.be.true;
      expect(thumb?.classList.contains('switch-thumb--medium')).to.be.true;
      expect(label?.classList.contains('switch-label--medium')).to.be.true;
    });

    it('should apply large size classes', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch size="large"></ds-switch>`
      );
      const track = el.shadowRoot?.querySelector('.switch-track');
      const thumb = el.shadowRoot?.querySelector('.switch-thumb');
      const label = el.shadowRoot?.querySelector('.switch-label');

      expect(track?.classList.contains('switch-track--large')).to.be.true;
      expect(thumb?.classList.contains('switch-thumb--large')).to.be.true;
      expect(label?.classList.contains('switch-label--large')).to.be.true;
    });
  });

  describe('State Management', () => {
    it('should apply checked state classes', async () => {
      const el = await fixture<Switch>(html`<ds-switch checked></ds-switch>`);
      const track = el.shadowRoot?.querySelector('.switch-track');
      const thumb = el.shadowRoot?.querySelector('.switch-thumb');

      expect(track?.classList.contains('switch-track--checked')).to.be.true;
      expect(thumb?.classList.contains('switch-thumb--checked')).to.be.true;
    });

    it('should apply disabled state classes', async () => {
      const el = await fixture<Switch>(html`<ds-switch disabled></ds-switch>`);
      const track = el.shadowRoot?.querySelector('.switch-track');
      const label = el.shadowRoot?.querySelector('.switch-label');

      expect(track?.classList.contains('switch-track--disabled')).to.be.true;
      expect(label?.classList.contains('switch-label--disabled')).to.be.true;
    });

    it('should apply validation state classes', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch validation-state="error"></ds-switch>`
      );
      const track = el.shadowRoot?.querySelector('.switch-track');

      expect(track?.classList.contains('switch-track--error')).to.be.true;
    });
  });

  describe('Event Handling', () => {
    it('should dispatch change event when toggled', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventFired = false;
      el.addEventListener('ds-switch-change', () => {
        eventFired = true;
      });

      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(eventFired).to.be.true;
      expect(el.checked).to.be.true;
    });

    it('should dispatch focus event when focused', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventFired = false;
      el.addEventListener('ds-switch-focus', () => {
        eventFired = true;
      });

      input.dispatchEvent(new Event('focus'));

      expect(eventFired).to.be.true;
    });

    it('should dispatch blur event when blurred', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventFired = false;
      el.addEventListener('ds-switch-blur', () => {
        eventFired = true;
      });

      input.dispatchEvent(new Event('blur'));

      expect(eventFired).to.be.true;
    });

    it('should dispatch validate event when validation state changes', async () => {
      const el = await fixture<Switch>(html`<ds-switch required></ds-switch>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventFired = false;
      el.addEventListener('ds-switch-validate', () => {
        eventFired = true;
      });

      input.dispatchEvent(new Event('blur'));

      expect(eventFired).to.be.true;
    });
  });

  describe('Validation', () => {
    it('should validate required field', async () => {
      const el = await fixture<Switch>(html`<ds-switch required></ds-switch>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      input.dispatchEvent(new Event('blur'));

      expect(el.validationState).to.equal('error');
      expect(el.errorMessage).to.equal('This field is required');
    });

    it('should show success state when required field is checked', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch required checked></ds-switch>`
      );
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      input.dispatchEvent(new Event('blur'));

      expect(el.validationState).to.equal('success');
    });

    it('should display custom error message', async () => {
      const el = await fixture<Switch>(html`
        <ds-switch
          validation-state="error"
          error-message="Custom error message"
        ></ds-switch>
      `);

      const validationMessage = el.shadowRoot?.querySelector(
        '.validation-message'
      );
      expect(validationMessage?.textContent?.trim()).to.equal(
        '❌ Custom error message'
      );
    });

    it('should display success message', async () => {
      const el = await fixture<Switch>(html`
        <ds-switch
          validation-state="success"
          success-message="Success message"
        ></ds-switch>
      `);

      const validationMessage = el.shadowRoot?.querySelector(
        '.validation-message'
      );
      expect(validationMessage?.textContent?.trim()).to.equal(
        '✅ Success message'
      );
    });

    it('should display warning message', async () => {
      const el = await fixture<Switch>(html`
        <ds-switch
          validation-state="warning"
          warning-message="Warning message"
        ></ds-switch>
      `);

      const validationMessage = el.shadowRoot?.querySelector(
        '.validation-message'
      );
      expect(validationMessage?.textContent?.trim()).to.equal(
        '⚠️ Warning message'
      );
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Switch>(html`
        <ds-switch
          aria-label="Toggle notifications"
          aria-describedby="help-text"
          aria-invalid="false"
        ></ds-switch>
      `);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      expect(input.getAttribute('aria-label')).to.equal('Toggle notifications');
      expect(input.getAttribute('aria-describedby')).to.equal('help-text');
      expect(input.getAttribute('aria-invalid')).to.equal('false');
      expect(input.getAttribute('role')).to.equal('switch');
    });

    it('should set aria-invalid to true when validation state is error', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch validation-state="error"></ds-switch>`
      );
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      expect(input.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should have proper form attributes', async () => {
      const el = await fixture<Switch>(html`
        <ds-switch name="notifications" value="enabled"></ds-switch>
      `);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      expect(input.getAttribute('name')).to.equal('notifications');
      expect(input.getAttribute('value')).to.equal('enabled');
    });

    it('should show required indicator', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch required>Enable notifications</ds-switch>`
      );
      const requiredIndicator = el.shadowRoot?.querySelector(
        '.required-indicator'
      );

      expect(requiredIndicator).to.exist;
      expect(requiredIndicator?.getAttribute('aria-label')).to.equal(
        'Required'
      );
    });

    it('should have screen reader text for required field', async () => {
      const el = await fixture<Switch>(html`<ds-switch required></ds-switch>`);
      const srOnly = el.shadowRoot?.querySelector('.sr-only');

      expect(srOnly?.textContent?.trim()).to.equal('Required field');
    });
  });

  describe('Public Methods', () => {
    it('should toggle switch state', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);

      expect(el.checked).to.be.false;

      el.toggle();
      expect(el.checked).to.be.true;

      el.toggle();
      expect(el.checked).to.be.false;
    });

    it('should check switch', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);

      expect(el.checked).to.be.false;

      el.check();
      expect(el.checked).to.be.true;
    });

    it('should uncheck switch', async () => {
      const el = await fixture<Switch>(html`<ds-switch checked></ds-switch>`);

      expect(el.checked).to.be.true;

      el.uncheck();
      expect(el.checked).to.be.false;
    });

    it('should focus switch', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let focused = false;
      input.addEventListener('focus', () => {
        focused = true;
      });

      el.focus();

      expect(focused).to.be.true;
    });

    it('should blur switch', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let blurred = false;
      input.addEventListener('blur', () => {
        blurred = true;
      });

      el.blur();

      expect(blurred).to.be.true;
    });

    it('should not toggle when disabled', async () => {
      const el = await fixture<Switch>(html`<ds-switch disabled></ds-switch>`);

      expect(el.checked).to.be.false;

      el.toggle();
      expect(el.checked).to.be.false;
    });

    it('should not check when disabled', async () => {
      const el = await fixture<Switch>(html`<ds-switch disabled></ds-switch>`);

      expect(el.checked).to.be.false;

      el.check();
      expect(el.checked).to.be.false;
    });

    it('should not uncheck when disabled', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch disabled checked></ds-switch>`
      );

      expect(el.checked).to.be.true;

      el.uncheck();
      expect(el.checked).to.be.true;
    });
  });

  describe('Keyboard Navigation', () => {
    it('should toggle when Space key is pressed', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      expect(el.checked).to.be.false;

      input.focus();
      await sendKeys({ press: ' ' });

      expect(el.checked).to.be.true;
    });

    it('should toggle when Enter key is pressed', async () => {
      const el = await fixture<Switch>(html`<ds-switch></ds-switch>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      expect(el.checked).to.be.false;

      input.focus();
      await sendKeys({ press: 'Enter' });

      expect(el.checked).to.be.true;
    });
  });

  describe('Form Integration', () => {
    it('should work with form submission', async () => {
      const form = await fixture(html`
        <form>
          <ds-switch name="notifications" value="enabled" checked></ds-switch>
        </form>
      `);

      const switchEl = form.querySelector('ds-switch') as Switch;
      const input = switchEl.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      expect(input.getAttribute('name')).to.equal('notifications');
      expect(input.getAttribute('value')).to.equal('enabled');
      expect(input.checked).to.be.true;
    });

    it('should handle form reset', async () => {
      const form = await fixture(html`
        <form>
          <ds-switch name="notifications" checked></ds-switch>
        </form>
      `);

      const switchEl = form.querySelector('ds-switch') as Switch;
      const input = switchEl.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      expect(input.checked).to.be.true;

      form.reset();

      expect(input.checked).to.be.false;
    });
  });

  describe('Property Validation', () => {
    it('should validate size property', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch size="invalid"></ds-switch>`
      );

      // Should fallback to default size
      expect(el.size).to.equal('medium');
    });

    it('should validate validation state property', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch validation-state="invalid"></ds-switch>`
      );

      // Should fallback to default validation state
      expect(el.validationState).to.equal('default');
    });
  });

  describe('Event Data', () => {
    it('should include correct data in change event', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch size="large"></ds-switch>`
      );
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventData: any = null;
      el.addEventListener('ds-switch-change', (event: any) => {
        eventData = event.detail;
      });

      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(eventData).to.deep.include({
        component: 'switch',
        size: 'large',
        checked: true,
        validationState: 'default',
        isValid: true,
      });
      expect(eventData.timestamp).to.be.a('number');
      expect(eventData.instanceId).to.be.a('string');
    });

    it('should include correct data in focus event', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch size="small" checked></ds-switch>`
      );
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventData: any = null;
      el.addEventListener('ds-switch-focus', (event: any) => {
        eventData = event.detail;
      });

      input.dispatchEvent(new Event('focus'));

      expect(eventData).to.deep.include({
        component: 'switch',
        size: 'small',
        checked: true,
      });
      expect(eventData.timestamp).to.be.a('number');
      expect(eventData.instanceId).to.be.a('string');
    });

    it('should include correct data in blur event', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch size="medium" required></ds-switch>`
      );
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventData: any = null;
      el.addEventListener('ds-switch-blur', (event: any) => {
        eventData = event.detail;
      });

      input.dispatchEvent(new Event('blur'));

      expect(eventData).to.deep.include({
        component: 'switch',
        size: 'medium',
        checked: false,
        validationState: 'error',
        isValid: false,
      });
      expect(eventData.timestamp).to.be.a('number');
      expect(eventData.instanceId).to.be.a('string');
    });

    it('should include correct data in validate event', async () => {
      const el = await fixture<Switch>(
        html`<ds-switch size="large" required checked></ds-switch>`
      );
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventData: any = null;
      el.addEventListener('ds-switch-validate', (event: any) => {
        eventData = event.detail;
      });

      input.dispatchEvent(new Event('blur'));

      expect(eventData).to.deep.include({
        component: 'switch',
        size: 'large',
        checked: true,
        validationState: 'success',
        isValid: true,
        validationMessage: '',
      });
      expect(eventData.timestamp).to.be.a('number');
      expect(eventData.instanceId).to.be.a('string');
    });
  });
});
