import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { Radio } from './radio.js';

describe('Radio Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Option 1</ds-radio>`);

      expect(el).to.exist;
      expect(el.size).to.equal('medium');
      expect(el.checked).to.be.false;
      expect(el.disabled).to.be.false;
      expect(el.required).to.be.false;
      expect(el.validationState).to.equal('default');
    });

    it('should render with custom properties', async () => {
      const el = await fixture<Radio>(html`
        <ds-radio
          size="large"
          checked
          disabled
          required
          name="test-group"
          value="option1"
          validation-state="error"
          error-message="This field is required"
        >
          Custom Option
        </ds-radio>
      `);

      expect(el.size).to.equal('large');
      expect(el.checked).to.be.true;
      expect(el.disabled).to.be.true;
      expect(el.required).to.be.true;
      expect(el.name).to.equal('test-group');
      expect(el.value).to.equal('option1');
      expect(el.validationState).to.equal('error');
      expect(el.errorMessage).to.equal('This field is required');
    });

    it('should render the radio input element', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Option 1</ds-radio>`);
      const input = el.inputElement;

      expect(input).to.exist;
      expect(input?.type).to.equal('radio');
      expect(input?.checked).to.be.false;
    });

    it('should render the visual radio element', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Option 1</ds-radio>`);
      const visual = el.shadowRoot?.querySelector('.radio-visual');

      expect(visual).to.exist;
      expect(visual?.classList.contains('radio-visual--medium')).to.be.true;
    });

    it('should render the label element', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Option 1</ds-radio>`);
      const label = el.shadowRoot?.querySelector('.radio-label');

      expect(label).to.exist;
      expect(label?.textContent?.trim()).to.equal('Option 1');
    });
  });

  describe('Size Variants', () => {
    it('should apply small size classes', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio size="small">Small</ds-radio>`
      );
      const visual = el.shadowRoot?.querySelector('.radio-visual');
      const label = el.shadowRoot?.querySelector('.radio-label');

      expect(visual?.classList.contains('radio-visual--small')).to.be.true;
      expect(label?.classList.contains('radio-label--small')).to.be.true;
    });

    it('should apply medium size classes', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio size="medium">Medium</ds-radio>`
      );
      const visual = el.shadowRoot?.querySelector('.radio-visual');
      const label = el.shadowRoot?.querySelector('.radio-label');

      expect(visual?.classList.contains('radio-visual--medium')).to.be.true;
      expect(label?.classList.contains('radio-label--medium')).to.be.true;
    });

    it('should apply large size classes', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio size="large">Large</ds-radio>`
      );
      const visual = el.shadowRoot?.querySelector('.radio-visual');
      const label = el.shadowRoot?.querySelector('.radio-label');

      expect(visual?.classList.contains('radio-visual--large')).to.be.true;
      expect(label?.classList.contains('radio-label--large')).to.be.true;
    });
  });

  describe('Checked State', () => {
    it('should show checked state when checked property is true', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio checked>Checked</ds-radio>`
      );
      const visual = el.shadowRoot?.querySelector('.radio-visual');
      const dot = el.shadowRoot?.querySelector('.radio-dot');
      const input = el.inputElement;

      expect(visual?.classList.contains('radio-visual--checked')).to.be.true;
      expect(dot?.classList.contains('radio-dot--visible')).to.be.true;
      expect(input?.checked).to.be.true;
    });

    it('should hide checked state when checked property is false', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Unchecked</ds-radio>`);
      const visual = el.shadowRoot?.querySelector('.radio-visual');
      const dot = el.shadowRoot?.querySelector('.radio-dot');
      const input = el.inputElement;

      expect(visual?.classList.contains('radio-visual--checked')).to.be.false;
      expect(dot?.classList.contains('radio-dot--visible')).to.be.false;
      expect(input?.checked).to.be.false;
    });

    it('should update checked state when property changes', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Dynamic</ds-radio>`);

      el.checked = true;
      await el.updateComplete;

      const visual = el.shadowRoot?.querySelector('.radio-visual');
      const dot = el.shadowRoot?.querySelector('.radio-dot');

      expect(visual?.classList.contains('radio-visual--checked')).to.be.true;
      expect(dot?.classList.contains('radio-dot--visible')).to.be.true;
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styles when disabled', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio disabled>Disabled</ds-radio>`
      );
      const input = el.inputElement;

      expect(input?.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;
    });

    it('should not be focusable when disabled', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio disabled>Disabled</ds-radio>`
      );
      const input = el.inputElement;

      input?.focus();
      expect(document.activeElement).to.not.equal(input);
    });
  });

  describe('Validation States', () => {
    it('should apply error validation state', async () => {
      const el = await fixture<Radio>(html`
        <ds-radio validation-state="error" error-message="Error message">
          Error State
        </ds-radio>
      `);
      const visual = el.shadowRoot?.querySelector('.radio-visual');
      const message = el.shadowRoot?.querySelector('.validation-message');

      expect(visual?.classList.contains('radio-visual--error')).to.be.true;
      expect(message?.classList.contains('validation-message--error')).to.be
        .true;
      expect(message?.textContent?.trim()).to.include('Error message');
    });

    it('should apply success validation state', async () => {
      const el = await fixture<Radio>(html`
        <ds-radio validation-state="success" success-message="Success message">
          Success State
        </ds-radio>
      `);
      const visual = el.shadowRoot?.querySelector('.radio-visual');
      const message = el.shadowRoot?.querySelector('.validation-message');

      expect(visual?.classList.contains('radio-visual--success')).to.be.true;
      expect(message?.classList.contains('validation-message--success')).to.be
        .true;
      expect(message?.textContent?.trim()).to.include('Success message');
    });

    it('should apply warning validation state', async () => {
      const el = await fixture<Radio>(html`
        <ds-radio validation-state="warning" warning-message="Warning message">
          Warning State
        </ds-radio>
      `);
      const visual = el.shadowRoot?.querySelector('.radio-visual');
      const message = el.shadowRoot?.querySelector('.validation-message');

      expect(visual?.classList.contains('radio-visual--warning')).to.be.true;
      expect(message?.classList.contains('validation-message--warning')).to.be
        .true;
      expect(message?.textContent?.trim()).to.include('Warning message');
    });

    it('should not show validation message for default state', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Default State</ds-radio>`);
      const message = el.shadowRoot?.querySelector('.validation-message');

      expect(message).to.be.null;
    });
  });

  describe('Required State', () => {
    it('should show required indicator when required', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio required>Required</ds-radio>`
      );
      const indicator = el.shadowRoot?.querySelector('.required-indicator');
      const input = el.inputElement;

      expect(indicator).to.exist;
      expect(indicator?.textContent?.trim()).to.equal('*');
      expect(input?.required).to.be.true;
    });

    it('should not show required indicator when not required', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Not Required</ds-radio>`);
      const indicator = el.shadowRoot?.querySelector('.required-indicator');
      const input = el.inputElement;

      expect(indicator).to.be.null;
      expect(input?.required).to.be.false;
    });
  });

  describe('Form Integration', () => {
    it('should set name and value attributes on input', async () => {
      const el = await fixture<Radio>(html`
        <ds-radio name="test-group" value="option1">Option 1</ds-radio>
      `);
      const input = el.inputElement;

      expect(input?.name).to.equal('test-group');
      expect(input?.value).to.equal('option1');
    });

    it('should work in a form group', async () => {
      const form = await fixture(html`
        <form>
          <ds-radio name="choice" value="a">Option A</ds-radio>
          <ds-radio name="choice" value="b" checked>Option B</ds-radio>
          <ds-radio name="choice" value="c">Option C</ds-radio>
        </form>
      `);

      const radios = form.querySelectorAll('ds-radio');
      expect(radios).to.have.length(3);

      const checkedRadio = radios[1] as Radio;
      expect(checkedRadio.checked).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Radio>(html`
        <ds-radio
          aria-label="Custom label"
          aria-describedby="description"
          aria-invalid="true"
        >
          Accessible Radio
        </ds-radio>
      `);
      const input = el.inputElement;

      expect(input?.getAttribute('aria-label')).to.equal('Custom label');
      expect(input?.getAttribute('aria-describedby')).to.equal('description');
      expect(input?.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should be focusable with keyboard', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Focusable</ds-radio>`);
      const input = el.inputElement;

      input?.focus();
      expect(document.activeElement).to.equal(input);
    });

    it('should be activatable with keyboard', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Activatable</ds-radio>`);
      const input = el.inputElement;

      input?.focus();
      await sendKeys({ press: ' ' });

      expect(input?.checked).to.be.true;
    });

    it('should have proper role and live region for validation', async () => {
      const el = await fixture<Radio>(html`
        <ds-radio validation-state="error" error-message="Error">
          With Error
        </ds-radio>
      `);
      const message = el.shadowRoot?.querySelector('.validation-message');

      expect(message?.getAttribute('role')).to.equal('alert');
      expect(message?.getAttribute('aria-live')).to.equal('polite');
    });
  });

  describe('Event Handling', () => {
    it('should dispatch change event when clicked', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Clickable</ds-radio>`);
      let eventFired = false;
      let eventData: any = null;

      el.addEventListener('ds-radio-change', (e: any) => {
        eventFired = true;
        eventData = e.detail;
      });

      const input = el.inputElement;
      input?.click();

      expect(eventFired).to.be.true;
      expect(eventData.component).to.equal('radio');
      expect(eventData.data.checked).to.be.true;
    });

    it('should dispatch focus event when focused', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Focusable</ds-radio>`);
      let eventFired = false;

      el.addEventListener('ds-radio-focus', () => {
        eventFired = true;
      });

      const input = el.inputElement;
      input?.focus();

      expect(eventFired).to.be.true;
    });

    it('should dispatch blur event when blurred', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Blurrable</ds-radio>`);
      let eventFired = false;

      el.addEventListener('ds-radio-blur', () => {
        eventFired = true;
      });

      const input = el.inputElement;
      input?.focus();
      input?.blur();

      expect(eventFired).to.be.true;
    });

    it('should dispatch validate event when validation state changes', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio required>Required</ds-radio>`
      );
      let eventFired = false;
      let eventData: any = null;

      el.addEventListener('ds-radio-validate', (e: any) => {
        eventFired = true;
        eventData = e.detail;
      });

      el.checked = true;
      await el.updateComplete;

      expect(eventFired).to.be.true;
      expect(eventData.data.validationState).to.equal('success');
    });
  });

  describe('Public Methods', () => {
    it('should focus the input when focus() is called', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Focusable</ds-radio>`);

      el.focus();

      expect(document.activeElement).to.equal(el.inputElement);
    });

    it('should blur the input when blur() is called', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Blurrable</ds-radio>`);
      const input = el.inputElement;

      input?.focus();
      el.blur();

      expect(document.activeElement).to.not.equal(input);
    });

    it('should select the radio when select() is called', async () => {
      const el = await fixture<Radio>(html`<ds-radio>Selectable</ds-radio>`);

      el.select();

      expect(el.checked).to.be.true;
    });

    it('should deselect the radio when deselect() is called', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio checked>Deselectable</ds-radio>`
      );

      el.deselect();

      expect(el.checked).to.be.false;
    });

    it('should not select when disabled', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio disabled>Disabled</ds-radio>`
      );

      el.select();

      expect(el.checked).to.be.false;
    });

    it('should not deselect when disabled', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio checked disabled>Disabled</ds-radio>`
      );

      el.deselect();

      expect(el.checked).to.be.true;
    });
  });

  describe('Validation Logic', () => {
    it('should validate required field', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio required>Required</ds-radio>`
      );

      // Initially not valid because required but not checked
      expect(el.validationState).to.equal('default');

      el.checked = true;
      await el.updateComplete;

      // Should be valid when checked
      expect(el.validationState).to.equal('success');
    });

    it('should show error when required field is not checked', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio required>Required</ds-radio>`
      );

      // Trigger validation by blurring
      const input = el.inputElement;
      input?.focus();
      input?.blur();
      await el.updateComplete;

      expect(el.validationState).to.equal('error');
    });
  });

  describe('Property Validation', () => {
    it('should validate size property', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio size="invalid">Invalid Size</ds-radio>`
      );

      // Should default to medium for invalid size
      expect(el.size).to.equal('medium');
    });

    it('should validate validation state property', async () => {
      const el = await fixture<Radio>(
        html`<ds-radio validation-state="invalid">Invalid State</ds-radio>`
      );

      // Should default to default for invalid validation state
      expect(el.validationState).to.equal('default');
    });
  });
});
