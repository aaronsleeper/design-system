import { expect, fixture, html } from '@open-wc/testing';
import { Textarea } from './textarea.js';

describe('Textarea Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);

      expect(el).to.exist;
      expect(el.size).to.equal('medium');
      expect(el.value).to.equal('');
      expect(el.disabled).to.be.false;
      expect(el.readonly).to.be.false;
      expect(el.required).to.be.false;
      expect(el.validationState).to.equal('default');
      expect(el.rows).to.equal(3);
      expect(el.wrap).to.equal('soft');
      expect(el.spellcheck).to.be.true;
    });

    it('should render with custom properties', async () => {
      const el = await fixture<Textarea>(html`
        <ds-textarea
          size="large"
          value="Test content"
          placeholder="Enter message"
          disabled
          required
          rows="5"
          maxlength="100"
        ></ds-textarea>
      `);

      expect(el.size).to.equal('large');
      expect(el.value).to.equal('Test content');
      expect(el.placeholder).to.equal('Enter message');
      expect(el.disabled).to.be.true;
      expect(el.required).to.be.true;
      expect(el.rows).to.equal(5);
      expect(el.maxLength).to.equal(100);
    });

    it('should render textarea element with correct attributes', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);
      const textarea = el.textareaElement;

      expect(textarea).to.exist;
      expect(textarea?.classList.contains('textarea--medium')).to.be.true;
      expect(textarea?.rows).to.equal(3);
      expect(textarea?.wrap).to.equal('soft');
    });
  });

  describe('Size Variants', () => {
    it('should support small size', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea size="small"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      expect(el.size).to.equal('small');
      expect(textarea?.classList.contains('textarea--small')).to.be.true;
    });

    it('should support medium size', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea size="medium"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      expect(el.size).to.equal('medium');
      expect(textarea?.classList.contains('textarea--medium')).to.be.true;
    });

    it('should support large size', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea size="large"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      expect(el.size).to.equal('large');
      expect(textarea?.classList.contains('textarea--large')).to.be.true;
    });
  });

  describe('Validation States', () => {
    it('should support default validation state', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);
      const textarea = el.textareaElement;

      expect(el.validationState).to.equal('default');
      expect(textarea?.classList.contains('textarea--error')).to.be.false;
      expect(textarea?.classList.contains('textarea--success')).to.be.false;
      expect(textarea?.classList.contains('textarea--warning')).to.be.false;
    });

    it('should support error validation state', async () => {
      const el = await fixture<Textarea>(html`
        <ds-textarea
          validation-state="error"
          error-message="This field is required"
        ></ds-textarea>
      `);
      const textarea = el.textareaElement;

      expect(el.validationState).to.equal('error');
      expect(textarea?.classList.contains('textarea--error')).to.be.true;
      expect(el.errorMessage).to.equal('This field is required');
    });

    it('should support success validation state', async () => {
      const el = await fixture<Textarea>(html`
        <ds-textarea
          validation-state="success"
          success-message="Looks good!"
        ></ds-textarea>
      `);
      const textarea = el.textareaElement;

      expect(el.validationState).to.equal('success');
      expect(textarea?.classList.contains('textarea--success')).to.be.true;
      expect(el.successMessage).to.equal('Looks good!');
    });

    it('should support warning validation state', async () => {
      const el = await fixture<Textarea>(html`
        <ds-textarea
          validation-state="warning"
          warning-message="Please review"
        ></ds-textarea>
      `);
      const textarea = el.textareaElement;

      expect(el.validationState).to.equal('warning');
      expect(textarea?.classList.contains('textarea--warning')).to.be.true;
      expect(el.warningMessage).to.equal('Please review');
    });
  });

  describe('Event Handling', () => {
    it('should dispatch ds-textarea-change event on input', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);
      const textarea = el.textareaElement;
      let eventFired = false;
      let eventData: any = null;

      el.addEventListener('ds-textarea-change', (e: any) => {
        eventFired = true;
        eventData = e.detail;
      });

      textarea!.value = 'New content';
      textarea!.dispatchEvent(new Event('input', { bubbles: true }));

      expect(eventFired).to.be.true;
      expect(eventData.component).to.equal('textarea');
      expect(eventData.data.value).to.equal('New content');
    });

    it('should dispatch ds-textarea-focus event on focus', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);
      const textarea = el.textareaElement;
      let eventFired = false;
      let eventData: any = null;

      el.addEventListener('ds-textarea-focus', (e: any) => {
        eventFired = true;
        eventData = e.detail;
      });

      textarea!.dispatchEvent(new Event('focus', { bubbles: true }));

      expect(eventFired).to.be.true;
      expect(eventData.component).to.equal('textarea');
    });

    it('should dispatch ds-textarea-blur event on blur', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);
      const textarea = el.textareaElement;
      let eventFired = false;
      let eventData: any = null;

      el.addEventListener('ds-textarea-blur', (e: any) => {
        eventFired = true;
        eventData = e.detail;
      });

      textarea!.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(eventFired).to.be.true;
      expect(eventData.component).to.equal('textarea');
    });

    it('should dispatch ds-textarea-validate event on validation', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea required></ds-textarea>`
      );
      const textarea = el.textareaElement;
      let eventFired = false;
      let eventData: any = null;

      el.addEventListener('ds-textarea-validate', (e: any) => {
        eventFired = true;
        eventData = e.detail;
      });

      textarea!.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(eventFired).to.be.true;
      expect(eventData.component).to.equal('textarea');
      expect(eventData.data.isValid).to.be.false;
    });
  });

  describe('Validation', () => {
    it('should validate required field', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea required></ds-textarea>`
      );
      const textarea = el.textareaElement;

      // Empty value should be invalid
      textarea!.value = '';
      textarea!.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(el.validationState).to.equal('error');
    });

    it('should validate min length', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea min-length="10"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      // Value too short should be invalid
      textarea!.value = 'short';
      textarea!.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(el.validationState).to.equal('error');
    });

    it('should validate max length', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea max-length="10"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      // Value too long should be invalid
      textarea!.value = 'This is a very long message that exceeds the limit';
      textarea!.dispatchEvent(new Event('blur', { bubbles: true }));

      expect(el.validationState).to.equal('error');
    });

    it('should show character count when max length is set', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea max-length="100"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      textarea!.value = 'Hello world';
      textarea!.dispatchEvent(new Event('input', { bubbles: true }));

      const characterCount = el.shadowRoot?.querySelector('.character-count');
      expect(characterCount).to.exist;
      expect(characterCount?.textContent).to.include('11/100');
    });

    it('should show error state when character count exceeds limit', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea max-length="5"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      textarea!.value = 'This is too long';
      textarea!.dispatchEvent(new Event('input', { bubbles: true }));

      const characterCount = el.shadowRoot?.querySelector(
        '.character-count--error'
      );
      expect(characterCount).to.exist;
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Textarea>(html`
        <ds-textarea
          aria-label="Message input"
          aria-describedby="help-text"
          required
        ></ds-textarea>
      `);
      const textarea = el.textareaElement;

      expect(textarea?.getAttribute('aria-label')).to.equal('Message input');
      expect(textarea?.getAttribute('aria-describedby')).to.include(
        'help-text'
      );
      expect(textarea?.getAttribute('aria-invalid')).to.equal('false');
    });

    it('should have aria-invalid="true" when in error state', async () => {
      const el = await fixture<Textarea>(html`
        <ds-textarea validation-state="error"></ds-textarea>
      `);
      const textarea = el.textareaElement;

      expect(textarea?.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should have required indicator for screen readers', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea required></ds-textarea>`
      );
      const srOnly = el.shadowRoot?.querySelector('.sr-only');

      expect(srOnly).to.exist;
      expect(srOnly?.textContent).to.include('Required field');
    });

    it('should have validation message with proper ARIA attributes', async () => {
      const el = await fixture<Textarea>(html`
        <ds-textarea
          validation-state="error"
          error-message="This field is required"
        ></ds-textarea>
      `);
      const validationMessage = el.shadowRoot?.querySelector(
        '.validation-message'
      );

      expect(validationMessage).to.exist;
      expect(validationMessage?.getAttribute('role')).to.equal('alert');
      expect(validationMessage?.getAttribute('aria-live')).to.equal('polite');
    });
  });

  describe('Public Methods', () => {
    it('should focus the textarea', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);
      const textarea = el.textareaElement;

      el.focus();

      expect(document.activeElement).to.equal(textarea);
    });

    it('should blur the textarea', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);
      const textarea = el.textareaElement;

      textarea!.focus();
      expect(document.activeElement).to.equal(textarea);

      el.blur();
      expect(document.activeElement).to.not.equal(textarea);
    });

    it('should select all text', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea value="Select me"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      el.select();

      expect(textarea?.selectionStart).to.equal(0);
      expect(textarea?.selectionEnd).to.equal(9);
    });

    it('should set selection range', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea value="Hello world"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      el.setSelectionRange(0, 5);

      expect(textarea?.selectionStart).to.equal(0);
      expect(textarea?.selectionEnd).to.equal(5);
    });
  });

  describe('State Management', () => {
    it('should update value on input', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);
      const textarea = el.textareaElement;

      textarea!.value = 'New content';
      textarea!.dispatchEvent(new Event('input', { bubbles: true }));

      expect(el.value).to.equal('New content');
    });

    it('should update value on change', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);
      const textarea = el.textareaElement;

      textarea!.value = 'Changed content';
      textarea!.dispatchEvent(new Event('change', { bubbles: true }));

      expect(el.value).to.equal('Changed content');
    });

    it('should reflect disabled state', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);

      el.disabled = true;
      await el.updateComplete;

      expect(el.hasAttribute('disabled')).to.be.true;
      expect(el.textareaElement?.disabled).to.be.true;
    });

    it('should reflect readonly state', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);

      el.readonly = true;
      await el.updateComplete;

      expect(el.hasAttribute('readonly')).to.be.true;
      expect(el.textareaElement?.readOnly).to.be.true;
    });

    it('should reflect required state', async () => {
      const el = await fixture<Textarea>(html`<ds-textarea></ds-textarea>`);

      el.required = true;
      await el.updateComplete;

      expect(el.hasAttribute('required')).to.be.true;
      expect(el.textareaElement?.required).to.be.true;
    });
  });

  describe('Textarea Attributes', () => {
    it('should support rows attribute', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea rows="5"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      expect(el.rows).to.equal(5);
      expect(textarea?.rows).to.equal(5);
    });

    it('should support cols attribute', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea cols="50"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      expect(el.cols).to.equal(50);
      expect(textarea?.cols).to.equal(50);
    });

    it('should support wrap attribute', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea wrap="hard"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      expect(el.wrap).to.equal('hard');
      expect(textarea?.wrap).to.equal('hard');
    });

    it('should support spellcheck attribute', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea spellcheck="false"></ds-textarea>`
      );
      const textarea = el.textareaElement;

      expect(el.spellcheck).to.be.false;
      expect(textarea?.spellcheck).to.be.false;
    });
  });

  describe('Property Validation', () => {
    it('should validate size property', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea size="invalid"></ds-textarea>`
      );

      expect(el.size).to.equal('medium'); // Should default to medium
    });

    it('should validate validation state property', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea validation-state="invalid"></ds-textarea>`
      );

      expect(el.validationState).to.equal('default'); // Should default to default
    });

    it('should validate wrap property', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea wrap="invalid"></ds-textarea>`
      );

      expect(el.wrap).to.equal('soft'); // Should default to soft
    });

    it('should validate rows property', async () => {
      const el = await fixture<Textarea>(
        html`<ds-textarea rows="0"></ds-textarea>`
      );

      expect(el.rows).to.equal(3); // Should default to 3
    });
  });
});
