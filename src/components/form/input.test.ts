import { expect, fixture, html } from '@open-wc/testing';
import { Input } from './input.js';

describe('Input Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Input>(html`<ds-input></ds-input>`);

      expect(el).to.exist;
      expect(el.type).to.equal('text');
      expect(el.size).to.equal('medium');
      expect(el.value).to.equal('');
      expect(el.disabled).to.be.false;
      expect(el.readonly).to.be.false;
      expect(el.required).to.be.false;
      expect(el.validationState).to.equal('default');
    });

    it('should render with custom properties', async () => {
      const el = await fixture<Input>(html`
        <ds-input
          type="email"
          size="large"
          value="test@example.com"
          placeholder="Enter email"
          disabled
          required
        ></ds-input>
      `);

      expect(el.type).to.equal('email');
      expect(el.size).to.equal('large');
      expect(el.value).to.equal('test@example.com');
      expect(el.placeholder).to.equal('Enter email');
      expect(el.disabled).to.be.true;
      expect(el.required).to.be.true;
    });

    it('should render input element with correct attributes', async () => {
      const el = await fixture<Input>(html`<ds-input></ds-input>`);
      const input = el.inputElement;

      expect(input).to.exist;
      expect(input?.type).to.equal('text');
      expect(input?.classList.contains('input--medium')).to.be.true;
    });
  });

  describe('Input Types', () => {
    it('should support text input type', async () => {
      const el = await fixture<Input>(html`<ds-input type="text"></ds-input>`);
      expect(el.inputElement?.type).to.equal('text');
    });

    it('should support email input type', async () => {
      const el = await fixture<Input>(html`<ds-input type="email"></ds-input>`);
      expect(el.inputElement?.type).to.equal('email');
    });

    it('should support password input type', async () => {
      const el = await fixture<Input>(
        html`<ds-input type="password"></ds-input>`
      );
      expect(el.inputElement?.type).to.equal('password');
    });

    it('should support number input type', async () => {
      const el = await fixture<Input>(
        html`<ds-input type="number"></ds-input>`
      );
      expect(el.inputElement?.type).to.equal('number');
    });

    it('should support tel input type', async () => {
      const el = await fixture<Input>(html`<ds-input type="tel"></ds-input>`);
      expect(el.inputElement?.type).to.equal('tel');
    });

    it('should support url input type', async () => {
      const el = await fixture<Input>(html`<ds-input type="url"></ds-input>`);
      expect(el.inputElement?.type).to.equal('url');
    });

    it('should support search input type', async () => {
      const el = await fixture<Input>(
        html`<ds-input type="search"></ds-input>`
      );
      expect(el.inputElement?.type).to.equal('search');
    });
  });

  describe('Input Sizes', () => {
    it('should support small size', async () => {
      const el = await fixture<Input>(html`<ds-input size="small"></ds-input>`);
      expect(el.inputElement?.classList.contains('input--small')).to.be.true;
    });

    it('should support medium size', async () => {
      const el = await fixture<Input>(
        html`<ds-input size="medium"></ds-input>`
      );
      expect(el.inputElement?.classList.contains('input--medium')).to.be.true;
    });

    it('should support large size', async () => {
      const el = await fixture<Input>(html`<ds-input size="large"></ds-input>`);
      expect(el.inputElement?.classList.contains('input--large')).to.be.true;
    });
  });

  describe('Input States', () => {
    it('should handle disabled state', async () => {
      const el = await fixture<Input>(html`<ds-input disabled></ds-input>`);
      expect(el.inputElement?.disabled).to.be.true;
      expect(el.inputElement?.classList.contains('input--disabled')).to.be
        .false; // CSS class not applied to input
    });

    it('should handle readonly state', async () => {
      const el = await fixture<Input>(html`<ds-input readonly></ds-input>`);
      expect(el.inputElement?.readOnly).to.be.true;
    });

    it('should handle required state', async () => {
      const el = await fixture<Input>(html`<ds-input required></ds-input>`);
      expect(el.inputElement?.required).to.be.true;
    });
  });

  describe('Validation States', () => {
    it('should handle default validation state', async () => {
      const el = await fixture<Input>(html`<ds-input></ds-input>`);
      expect(el.validationState).to.equal('default');
      expect(el.inputElement?.classList.contains('input--default')).to.be.false;
    });

    it('should handle error validation state', async () => {
      const el = await fixture<Input>(html`
        <ds-input
          validation-state="error"
          error-message="Invalid input"
        ></ds-input>
      `);
      expect(el.validationState).to.equal('error');
      expect(el.inputElement?.classList.contains('input--error')).to.be.true;
    });

    it('should handle success validation state', async () => {
      const el = await fixture<Input>(html`
        <ds-input
          validation-state="success"
          success-message="Valid input"
        ></ds-input>
      `);
      expect(el.validationState).to.equal('success');
      expect(el.inputElement?.classList.contains('input--success')).to.be.true;
    });

    it('should handle warning validation state', async () => {
      const el = await fixture<Input>(html`
        <ds-input
          validation-state="warning"
          warning-message="Warning message"
        ></ds-input>
      `);
      expect(el.validationState).to.equal('warning');
      expect(el.inputElement?.classList.contains('input--warning')).to.be.true;
    });
  });

  describe('Event Handling', () => {
    it('should dispatch ds-input-change event on input', async () => {
      const el = await fixture<Input>(html`<ds-input></ds-input>`);
      const input = el.inputElement!;

      let eventFired = false;
      el.addEventListener('ds-input-change', () => {
        eventFired = true;
      });

      input.value = 'test value';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      expect(eventFired).to.be.true;
      expect(el.value).to.equal('test value');
    });

    it('should dispatch ds-input-focus event on focus', async () => {
      const el = await fixture<Input>(html`<ds-input></ds-input>`);

      let eventFired = false;
      el.addEventListener('ds-input-focus', () => {
        eventFired = true;
      });

      el.inputElement?.dispatchEvent(new Event('focus', { bubbles: true }));

      expect(eventFired).to.be.true;
    });

    it('should dispatch ds-input-blur event on blur', async () => {
      const el = await fixture<Input>(html`<ds-input></ds-input>`);

      let eventFired = false;
      el.addEventListener('ds-input-blur', () => {
        eventFired = true;
      });

      el.inputElement?.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(eventFired).to.be.true;
    });

    it('should dispatch ds-input-validate event on validation', async () => {
      const el = await fixture<Input>(html`<ds-input required></ds-input>`);

      let eventFired = false;
      el.addEventListener('ds-input-validate', () => {
        eventFired = true;
      });

      el.inputElement?.dispatchEvent(new Event('invalid', { bubbles: true }));

      expect(eventFired).to.be.true;
    });
  });

  describe('Validation', () => {
    it('should validate required field', async () => {
      const el = await fixture<Input>(html`<ds-input required></ds-input>`);

      // Trigger validation by setting empty value and blurring
      el.value = '';
      el.inputElement?.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(el.validationState).to.equal('error');
    });

    it('should validate min length', async () => {
      const el = await fixture<Input>(
        html`<ds-input min-length="5"></ds-input>`
      );

      el.value = 'abc';
      el.inputElement?.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(el.validationState).to.equal('error');
    });

    it('should validate max length', async () => {
      const el = await fixture<Input>(
        html`<ds-input max-length="5"></ds-input>`
      );

      el.value = 'abcdefgh';
      el.inputElement?.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(el.validationState).to.equal('error');
    });

    it('should validate number min value', async () => {
      const el = await fixture<Input>(
        html`<ds-input type="number" min="10"></ds-input>`
      );

      el.value = '5';
      el.inputElement?.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(el.validationState).to.equal('error');
    });

    it('should validate number max value', async () => {
      const el = await fixture<Input>(
        html`<ds-input type="number" max="10"></ds-input>`
      );

      el.value = '15';
      el.inputElement?.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(el.validationState).to.equal('error');
    });

    it('should validate pattern', async () => {
      const el = await fixture<Input>(
        html`<ds-input pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></ds-input>`
      );

      el.value = '123-456';
      el.inputElement?.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(el.validationState).to.equal('error');
    });

    it('should show success state for valid input', async () => {
      const el = await fixture<Input>(html`<ds-input required></ds-input>`);

      el.value = 'valid input';
      el.inputElement?.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(el.validationState).to.equal('success');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Input>(html`
        <ds-input
          aria-label="Email address"
          aria-describedby="email-help"
          aria-invalid="false"
        ></ds-input>
      `);

      const input = el.inputElement!;
      expect(input.getAttribute('aria-label')).to.equal('Email address');
      expect(input.getAttribute('aria-describedby')).to.equal('email-help');
      expect(input.getAttribute('aria-invalid')).to.equal('false');
    });

    it('should set aria-invalid to true for error state', async () => {
      const el = await fixture<Input>(
        html`<ds-input validation-state="error"></ds-input>`
      );

      expect(el.inputElement?.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should include character count in aria-describedby', async () => {
      const el = await fixture<Input>(
        html`<ds-input max-length="10"></ds-input>`
      );

      const describedBy = el.inputElement?.getAttribute('aria-describedby');
      expect(describedBy).to.include('character-count');
    });

    it('should announce validation messages to screen readers', async () => {
      const el = await fixture<Input>(html`
        <ds-input
          validation-state="error"
          error-message="Invalid input"
        ></ds-input>
      `);

      const validationMessage = el.shadowRoot?.querySelector(
        '.validation-message'
      );
      expect(validationMessage?.getAttribute('role')).to.equal('alert');
      expect(validationMessage?.getAttribute('aria-live')).to.equal('polite');
    });
  });

  describe('Character Count', () => {
    it('should show character count when max-length is set', async () => {
      const el = await fixture<Input>(
        html`<ds-input max-length="10"></ds-input>`
      );

      const characterCount = el.shadowRoot?.querySelector('.character-count');
      expect(characterCount).to.exist;
    });

    it('should update character count when value changes', async () => {
      const el = await fixture<Input>(
        html`<ds-input max-length="10"></ds-input>`
      );

      el.value = 'test';
      await el.updateComplete;

      const characterCount = el.shadowRoot?.querySelector('.character-count');
      expect(characterCount?.textContent).to.include('4/10');
    });

    it('should show error state when over character limit', async () => {
      const el = await fixture<Input>(
        html`<ds-input max-length="5"></ds-input>`
      );

      el.value = 'abcdefgh';
      await el.updateComplete;

      const characterCount = el.shadowRoot?.querySelector('.character-count');
      expect(characterCount?.classList.contains('character-count--error')).to.be
        .true;
    });
  });

  describe('Public Methods', () => {
    it('should focus the input', async () => {
      const el = await fixture<Input>(html`<ds-input></ds-input>`);

      el.focus();
      expect(document.activeElement).to.equal(el.inputElement);
    });

    it('should blur the input', async () => {
      const el = await fixture<Input>(html`<ds-input></ds-input>`);

      el.focus();
      el.blur();
      expect(document.activeElement).to.not.equal(el.inputElement);
    });

    it('should select all text', async () => {
      const el = await fixture<Input>(
        html`<ds-input value="test text"></ds-input>`
      );

      el.select();
      // Note: selection testing is limited in test environment
      expect(el.inputElement?.selectionStart).to.equal(0);
    });

    it('should set selection range', async () => {
      const el = await fixture<Input>(
        html`<ds-input value="test text"></ds-input>`
      );

      el.setSelectionRange(2, 6);
      expect(el.inputElement?.selectionStart).to.equal(2);
      expect(el.inputElement?.selectionEnd).to.equal(6);
    });
  });

  describe('Property Validation', () => {
    it('should validate type property', async () => {
      const el = await fixture<Input>(
        html`<ds-input type="invalid"></ds-input>`
      );

      // Should fallback to default
      expect(el.type).to.equal('text');
    });

    it('should validate size property', async () => {
      const el = await fixture<Input>(
        html`<ds-input size="invalid"></ds-input>`
      );

      // Should fallback to default
      expect(el.size).to.equal('medium');
    });

    it('should validate validation state property', async () => {
      const el = await fixture<Input>(
        html`<ds-input validation-state="invalid"></ds-input>`
      );

      // Should fallback to default
      expect(el.validationState).to.equal('default');
    });
  });

  describe('Integration', () => {
    it('should work with form elements', async () => {
      const form = await fixture(html`
        <form>
          <ds-input name="email" type="email" required></ds-input>
          <ds-input name="password" type="password" required></ds-input>
        </form>
      `);

      const inputs = form.querySelectorAll('ds-input');
      expect(inputs).to.have.length(2);
    });

    it('should maintain value consistency', async () => {
      const el = await fixture<Input>(
        html`<ds-input value="initial"></ds-input>`
      );

      expect(el.value).to.equal('initial');
      expect(el.inputElement?.value).to.equal('initial');

      el.value = 'updated';
      await el.updateComplete;

      expect(el.value).to.equal('updated');
      expect(el.inputElement?.value).to.equal('updated');
    });
  });
});
