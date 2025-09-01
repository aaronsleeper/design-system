import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { Checkbox } from './checkbox.js';

describe('Checkbox Component', () => {
  describe('Basic Functionality', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox>Test checkbox</ds-checkbox>`
      );

      expect(el).to.exist;
      expect(el.size).to.equal('medium');
      expect(el.checked).to.be.false;
      expect(el.indeterminate).to.be.false;
      expect(el.disabled).to.be.false;
      expect(el.required).to.be.false;
      expect(el.validationState).to.equal('default');
    });

    it('should render with custom properties', async () => {
      const el = await fixture<Checkbox>(html`
        <ds-checkbox
          size="large"
          checked
          required
          validation-state="success"
          name="test-checkbox"
          value="test-value"
        >
          Custom checkbox
        </ds-checkbox>
      `);

      expect(el.size).to.equal('large');
      expect(el.checked).to.be.true;
      expect(el.required).to.be.true;
      expect(el.validationState).to.equal('success');
      expect(el.name).to.equal('test-checkbox');
      expect(el.value).to.equal('test-value');
    });

    it('should reflect properties to attributes', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox>Test</ds-checkbox>`);

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
    it('should apply small size styles', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox size="small">Small</ds-checkbox>`
      );
      const visual = el.shadowRoot?.querySelector('.checkbox-visual');

      expect(visual).to.have.class('checkbox-visual--small');
    });

    it('should apply medium size styles', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox size="medium">Medium</ds-checkbox>`
      );
      const visual = el.shadowRoot?.querySelector('.checkbox-visual');

      expect(visual).to.have.class('checkbox-visual--medium');
    });

    it('should apply large size styles', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox size="large">Large</ds-checkbox>`
      );
      const visual = el.shadowRoot?.querySelector('.checkbox-visual');

      expect(visual).to.have.class('checkbox-visual--large');
    });
  });

  describe('State Management', () => {
    it('should show checked state', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox checked>Checked</ds-checkbox>`
      );
      const visual = el.shadowRoot?.querySelector('.checkbox-visual');
      const checkmark = el.shadowRoot?.querySelector('.checkmark');

      expect(visual).to.have.class('checkbox-visual--checked');
      expect(checkmark).to.have.class('checkmark--visible');
    });

    it('should show indeterminate state', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox indeterminate>Indeterminate</ds-checkbox>`
      );
      const visual = el.shadowRoot?.querySelector('.checkbox-visual');
      const indeterminateMark = el.shadowRoot?.querySelector(
        '.indeterminate-mark'
      );

      expect(visual).to.have.class('checkbox-visual--indeterminate');
      expect(indeterminateMark).to.have.class('indeterminate-mark--visible');
    });

    it('should show disabled state', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox disabled>Disabled</ds-checkbox>`
      );
      const input = el.shadowRoot?.querySelector('input');

      expect(input).to.have.attribute('disabled');
      expect(el.hasAttribute('disabled')).to.be.true;
    });

    it('should show required state', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox required>Required</ds-checkbox>`
      );
      const input = el.shadowRoot?.querySelector('input');
      const requiredIndicator = el.shadowRoot?.querySelector(
        '.required-indicator'
      );

      expect(input).to.have.attribute('required');
      expect(requiredIndicator).to.exist;
    });
  });

  describe('Validation States', () => {
    it('should show error validation state', async () => {
      const el = await fixture<Checkbox>(html`
        <ds-checkbox
          validation-state="error"
          error-message="This field is required"
        >
          Error checkbox
        </ds-checkbox>
      `);
      const visual = el.shadowRoot?.querySelector('.checkbox-visual');
      const message = el.shadowRoot?.querySelector('.validation-message');

      expect(visual).to.have.class('checkbox-visual--error');
      expect(message).to.have.class('validation-message--error');
      expect(message?.textContent?.trim()).to.include('This field is required');
    });

    it('should show success validation state', async () => {
      const el = await fixture<Checkbox>(html`
        <ds-checkbox validation-state="success" success-message="Great!">
          Success checkbox
        </ds-checkbox>
      `);
      const visual = el.shadowRoot?.querySelector('.checkbox-visual');
      const message = el.shadowRoot?.querySelector('.validation-message');

      expect(visual).to.have.class('checkbox-visual--success');
      expect(message).to.have.class('validation-message--success');
      expect(message?.textContent?.trim()).to.include('Great!');
    });

    it('should show warning validation state', async () => {
      const el = await fixture<Checkbox>(html`
        <ds-checkbox validation-state="warning" warning-message="Please review">
          Warning checkbox
        </ds-checkbox>
      `);
      const visual = el.shadowRoot?.querySelector('.checkbox-visual');
      const message = el.shadowRoot?.querySelector('.validation-message');

      expect(visual).to.have.class('checkbox-visual--warning');
      expect(message).to.have.class('validation-message--warning');
      expect(message?.textContent?.trim()).to.include('Please review');
    });
  });

  describe('Event Handling', () => {
    it('should dispatch change event when clicked', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox>Test</ds-checkbox>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventFired = false;
      el.addEventListener('ds-checkbox-change', () => {
        eventFired = true;
      });

      input.checked = true;
      input.dispatchEvent(new Event('change'));

      expect(eventFired).to.be.true;
      expect(el.checked).to.be.true;
    });

    it('should dispatch focus event', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox>Test</ds-checkbox>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventFired = false;
      el.addEventListener('ds-checkbox-focus', () => {
        eventFired = true;
      });

      input.dispatchEvent(new Event('focus'));

      expect(eventFired).to.be.true;
    });

    it('should dispatch blur event', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox>Test</ds-checkbox>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      let eventFired = false;
      el.addEventListener('ds-checkbox-blur', () => {
        eventFired = true;
      });

      input.dispatchEvent(new Event('blur'));

      expect(eventFired).to.be.true;
    });

    it('should dispatch validate event', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox required>Test</ds-checkbox>`
      );

      let eventFired = false;
      el.addEventListener('ds-checkbox-validate', () => {
        eventFired = true;
      });

      // Trigger validation by calling blur
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new Event('blur'));

      expect(eventFired).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Checkbox>(html`
        <ds-checkbox
          aria-label="Test checkbox"
          aria-describedby="help-text"
          aria-invalid="false"
        >
          Test
        </ds-checkbox>
      `);
      const input = el.shadowRoot?.querySelector('input');

      expect(input).to.have.attribute('aria-label', 'Test checkbox');
      expect(input).to.have.attribute('aria-describedby', 'help-text');
      expect(input).to.have.attribute('aria-invalid', 'false');
    });

    it('should set aria-invalid based on validation state', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox validation-state="error">Test</ds-checkbox>`
      );
      const input = el.shadowRoot?.querySelector('input');

      expect(input).to.have.attribute('aria-invalid', 'true');
    });

    it('should have proper role for validation message', async () => {
      const el = await fixture<Checkbox>(html`
        <ds-checkbox validation-state="error" error-message="Error message">
          Test
        </ds-checkbox>
      `);
      const message = el.shadowRoot?.querySelector('.validation-message');

      expect(message).to.have.attribute('role', 'alert');
      expect(message).to.have.attribute('aria-live', 'polite');
    });

    it('should be focusable with keyboard', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox>Test</ds-checkbox>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      input.focus();
      expect(document.activeElement).to.equal(input);
    });
  });

  describe('Public Methods', () => {
    it('should toggle checkbox state', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox>Test</ds-checkbox>`);

      expect(el.checked).to.be.false;
      el.toggle();
      expect(el.checked).to.be.true;
      el.toggle();
      expect(el.checked).to.be.false;
    });

    it('should check checkbox', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox>Test</ds-checkbox>`);

      expect(el.checked).to.be.false;
      el.check();
      expect(el.checked).to.be.true;
      expect(el.indeterminate).to.be.false;
    });

    it('should uncheck checkbox', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox checked>Test</ds-checkbox>`
      );

      expect(el.checked).to.be.true;
      el.uncheck();
      expect(el.checked).to.be.false;
      expect(el.indeterminate).to.be.false;
    });

    it('should set indeterminate state', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox checked>Test</ds-checkbox>`
      );

      expect(el.checked).to.be.true;
      el.setIndeterminate();
      expect(el.indeterminate).to.be.true;
      expect(el.checked).to.be.false;
    });

    it('should not change state when disabled', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox disabled>Test</ds-checkbox>`
      );

      expect(el.checked).to.be.false;
      el.toggle();
      expect(el.checked).to.be.false;

      el.check();
      expect(el.checked).to.be.false;
    });

    it('should focus and blur checkbox', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox>Test</ds-checkbox>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      el.focus();
      expect(document.activeElement).to.equal(input);

      el.blur();
      expect(document.activeElement).to.not.equal(input);
    });
  });

  describe('Validation Logic', () => {
    it('should validate required checkbox', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox required>Test</ds-checkbox>`
      );

      // Initially not checked, should be invalid
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new Event('blur'));

      expect(el.validationState).to.equal('error');
      expect(el._isValid).to.be.false;
    });

    it('should validate checked required checkbox', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox required checked>Test</ds-checkbox>`
      );

      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new Event('blur'));

      expect(el.validationState).to.equal('success');
      expect(el._isValid).to.be.true;
    });

    it('should validate indeterminate required checkbox', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox required indeterminate>Test</ds-checkbox>`
      );

      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new Event('blur'));

      expect(el.validationState).to.equal('success');
      expect(el._isValid).to.be.true;
    });
  });

  describe('Keyboard Interaction', () => {
    it('should toggle on Space key', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox>Test</ds-checkbox>`);
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      input.focus();
      await sendKeys({ press: ' ' });

      expect(el.checked).to.be.true;
    });

    it('should not toggle when disabled', async () => {
      const el = await fixture<Checkbox>(
        html`<ds-checkbox disabled>Test</ds-checkbox>`
      );
      const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

      input.focus();
      await sendKeys({ press: ' ' });

      expect(el.checked).to.be.false;
    });
  });

  describe('Form Integration', () => {
    it('should have proper form attributes', async () => {
      const el = await fixture<Checkbox>(html`
        <ds-checkbox name="test-name" value="test-value">Test</ds-checkbox>
      `);
      const input = el.shadowRoot?.querySelector('input');

      expect(input).to.have.attribute('name', 'test-name');
      expect(input).to.have.attribute('value', 'test-value');
    });

    it('should be included in form data when checked', async () => {
      const form = await fixture(html`
        <form>
          <ds-checkbox name="test-checkbox" value="test-value" checked
            >Test</ds-checkbox
          >
        </form>
      `);

      const formData = new FormData(form);
      expect(formData.get('test-checkbox')).to.equal('test-value');
    });

    it('should not be included in form data when unchecked', async () => {
      const form = await fixture(html`
        <form>
          <ds-checkbox name="test-checkbox" value="test-value"
            >Test</ds-checkbox
          >
        </form>
      `);

      const formData = new FormData(form);
      expect(formData.get('test-checkbox')).to.be.null;
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid state changes', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox>Test</ds-checkbox>`);

      // Rapidly change states
      el.check();
      el.uncheck();
      el.setIndeterminate();
      el.check();

      expect(el.checked).to.be.true;
      expect(el.indeterminate).to.be.false;
    });

    it('should handle empty slot content', async () => {
      const el = await fixture<Checkbox>(html`<ds-checkbox></ds-checkbox>`);

      expect(el).to.exist;
      expect(el.shadowRoot?.querySelector('label')).to.exist;
    });

    it('should handle long text content', async () => {
      const longText =
        'This is a very long text that should wrap properly in the checkbox label and not break the layout or cause any visual issues with the component';
      const el = await fixture<Checkbox>(
        html`<ds-checkbox>${longText}</ds-checkbox>`
      );

      expect(el).to.exist;
      expect(
        el.shadowRoot?.querySelector('label')?.textContent?.trim()
      ).to.include(longText);
    });
  });
});
