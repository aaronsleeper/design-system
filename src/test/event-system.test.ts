import { fixture, expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import {
  DesignSystemElement,
  DesignSystemEventPayload,
} from '../base/design-system-element.js';
import { customElement, property } from 'lit/decorators.js';
import {
  debounce,
  throttle,
  globalEventBus,
  EventBus,
} from '../utilities/event-utils.js';

// Test component that extends DesignSystemElement
@customElement('ds-test-button')
class TestButton extends DesignSystemElement {
  @property({ type: String }) variant: 'primary' | 'secondary' = 'primary';
  @property({ type: Boolean }) disabled = false;

  private _handleClick(event: MouseEvent): void {
    if (this.disabled) return;

    this.dispatchDesignSystemEvent(
      'click',
      {
        disabled: this.disabled,
        variant: this.variant,
        pressed: true,
      },
      event
    );

    // Reset pressed state after a short delay
    setTimeout(() => {
      this.dispatchDesignSystemEvent('click', {
        disabled: this.disabled,
        variant: this.variant,
        pressed: false,
      });
    }, 150);
  }

  private _handleFocus(event: FocusEvent): void {
    this.dispatchDesignSystemEvent(
      'focus',
      {
        disabled: this.disabled,
        variant: this.variant,
      },
      event
    );
  }

  render() {
    return html`
      <button
        class="ds-test-button ds-test-button--${this.variant}"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @focus=${this._handleFocus}
      >
        Test Button
      </button>
    `;
  }
}

// Test component for form integration
@customElement('ds-test-form')
class TestForm extends DesignSystemElement {
  @property({ type: Boolean }) disabled = false;

  private _handleInputChange(event: CustomEvent): void {
    const { data } = event.detail;

    this.dispatchDesignSystemEvent('change', {
      formData: { email: data.value },
      valid: data.valid,
    });
  }

  render() {
    return html`
      <form @ds-test-input-change=${this._handleInputChange}>
        <ds-test-input
          name="email"
          type="email"
          ?disabled=${this.disabled}
        ></ds-test-input>
      </form>
    `;
  }
}

// Test input component
@customElement('ds-test-input')
class TestInput extends DesignSystemElement {
  @property({ type: String }) value = '';
  @property({ type: String }) type = 'text';
  @property({ type: Boolean }) disabled = false;

  private _debouncedChange = debounce((value: string) => {
    this.dispatchDesignSystemEvent('change', {
      value,
      type: this.type,
      valid: true,
      validationMessage: '',
    });
  }, 300);

  private _handleInput(event: InputEvent): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this._debouncedChange(value);
  }

  render() {
    return html`
      <input
        type=${this.type}
        .value=${this.value}
        ?disabled=${this.disabled}
        @input=${this._handleInput}
      />
    `;
  }
}

describe('Event System', () => {
  describe('DesignSystemElement', () => {
    let button: TestButton;

    beforeEach(async () => {
      button = await fixture<TestButton>(
        html`<ds-test-button></ds-test-button>`
      );
    });

    it('should generate unique instance IDs', () => {
      expect(button.instanceId).to.be.a('string');
      expect(button.instanceId).to.match(/^ds-\d+-\w+$/);
    });

    it('should dispatch standardized click events', async () => {
      setTimeout(() => void button.click());

      const { detail } = (await oneEvent(
        button,
        'ds-test-button-click'
      )) as CustomEvent<DesignSystemEventPayload>;

      expect(detail.component).to.equal('test-button');
      expect(detail.timestamp).to.be.a('number');
      expect(detail.instanceId).to.be.a('string');
      expect(detail.data.disabled).to.equal(false);
      expect(detail.data.variant).to.equal('primary');
      expect(detail.data.pressed).to.equal(true);
      expect(detail.originalEvent).to.be.instanceOf(MouseEvent);
    });

    it('should dispatch focus events', async () => {
      const buttonElement = button.shadowRoot?.querySelector('button');
      if (!buttonElement) throw new Error('Button element not found');

      setTimeout(() => void buttonElement.focus());

      const { detail } = (await oneEvent(
        button,
        'ds-test-button-focus'
      )) as CustomEvent<DesignSystemEventPayload>;

      expect(detail.component).to.equal('test-button');
      expect(detail.data.disabled).to.equal(false);
      expect(detail.data.variant).to.equal('primary');
      expect(detail.originalEvent).to.be.instanceOf(FocusEvent);
    });

    it('should not dispatch events when disabled', async () => {
      button.disabled = true;

      let eventDispatched = false;
      button.addEventListener('ds-test-button-click', () => {
        eventDispatched = true;
      });

      void button.click();

      // Wait a bit to ensure no event is dispatched
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(eventDispatched).to.be.false;
    });
  });

  describe('Event Utilities', () => {
    describe('debounce', () => {
      it('should debounce function calls', done => {
        let callCount = 0;
        const debouncedFn = debounce(() => {
          callCount++;
        }, 100);

        // Call multiple times quickly
        void debouncedFn();
        void debouncedFn();
        void debouncedFn();

        setTimeout(() => {
          expect(callCount).to.equal(1);
          done();
        }, 150);
      });

      it('should pass arguments correctly', done => {
        let receivedArgs: any[] = [];
        const debouncedFn = debounce((...args: any[]) => {
          receivedArgs = args;
        }, 100);

        void debouncedFn('test', 123);

        setTimeout(() => {
          expect(receivedArgs).to.deep.equal(['test', 123]);
          done();
        }, 150);
      });
    });

    describe('throttle', () => {
      it('should throttle function calls', done => {
        let callCount = 0;
        const throttledFn = throttle(() => {
          callCount++;
        }, 100);

        // Call multiple times quickly
        void throttledFn();
        void throttledFn();
        void throttledFn();

        setTimeout(() => {
          expect(callCount).to.equal(1);
          done();
        }, 150);
      });

      it('should allow calls after delay', done => {
        let callCount = 0;
        const throttledFn = throttle(() => {
          callCount++;
        }, 100);

        void throttledFn();

        setTimeout(() => {
          void throttledFn();
          expect(callCount).to.equal(2);
          done();
        }, 150);
      });
    });

    describe('EventBus', () => {
      let eventBus: EventBus;

      beforeEach(() => {
        eventBus = new EventBus();
      });

      it('should register and emit events', () => {
        let receivedData: any = null;

        eventBus.on('test-event', (data: any) => {
          receivedData = data;
        });

        void eventBus.emit('test-event', { message: 'test' });

        expect(receivedData).to.deep.equal({ message: 'test' });
      });

      it('should remove event listeners', () => {
        let callCount = 0;
        const callback = () => callCount++;

        eventBus.on('test-event', callback);
        void eventBus.emit('test-event', {});
        eventBus.off('test-event', callback);
        void eventBus.emit('test-event', {});

        expect(callCount).to.equal(1);
      });

      it('should clear all listeners', () => {
        let callCount = 0;
        const callback = () => callCount++;

        eventBus.on('test-event', callback);
        void eventBus.emit('test-event', {});
        eventBus.clear();
        void eventBus.emit('test-event', {});

        expect(callCount).to.equal(1);
      });
    });

    describe('Global Event Bus', () => {
      it('should provide a global event bus instance', () => {
        expect(globalEventBus).to.be.instanceOf(EventBus);
      });

      it('should allow cross-component communication', () => {
        let receivedData: any = null;

        globalEventBus.on('navigation-change', (data: any) => {
          receivedData = data;
        });

        void globalEventBus.emit('navigation-change', { activeItem: 'home' });

        expect(receivedData).to.deep.equal({ activeItem: 'home' });
      });
    });
  });

  describe('Component Integration', () => {
    it('should handle form input changes', async () => {
      const form = await fixture<TestForm>(html`
        <ds-test-form>
          <ds-test-input name="email" type="email"></ds-test-input>
        </ds-test-form>
      `);

      const input = form.querySelector('ds-test-input') as TestInput;
      const inputElement = input.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      if (!inputElement) throw new Error('Input element not found');

      inputElement.value = 'test@example.com';
      inputElement.dispatchEvent(new Event('input'));

      const { detail } = (await oneEvent(
        form,
        'ds-test-form-change'
      )) as CustomEvent<DesignSystemEventPayload>;

      expect(detail.data.formData.email).to.equal('test@example.com');
      expect(detail.data.valid).to.be.true;
    });

    it('should debounce input changes', async () => {
      const input = await fixture<TestInput>(
        html`<ds-test-input></ds-test-input>`
      );
      const inputElement = input.shadowRoot?.querySelector(
        'input'
      ) as HTMLInputElement;

      if (!inputElement) throw new Error('Input element not found');

      let eventCount = 0;
      input.addEventListener('ds-test-input-change', () => {
        eventCount++;
      });

      // Rapid input changes
      inputElement.value = 'a';
      inputElement.dispatchEvent(new Event('input'));
      inputElement.value = 'ab';
      inputElement.dispatchEvent(new Event('input'));
      inputElement.value = 'abc';
      inputElement.dispatchEvent(new Event('input'));

      // Wait for debounce
      await new Promise(resolve => setTimeout(resolve, 400));

      expect(eventCount).to.equal(1);
    });
  });

  describe('Event Payload Validation', () => {
    it('should include all required payload fields', async () => {
      const button = await fixture<TestButton>(
        html`<ds-test-button></ds-test-button>`
      );

      setTimeout(() => void button.click());

      const { detail } = (await oneEvent(
        button,
        'ds-test-button-click'
      )) as CustomEvent<DesignSystemEventPayload>;

      expect(detail).to.have.property('component');
      expect(detail).to.have.property('timestamp');
      expect(detail).to.have.property('instanceId');
      expect(detail).to.have.property('data');
      expect(detail).to.have.property('originalEvent');

      expect(detail.component).to.be.a('string');
      expect(detail.timestamp).to.be.a('number');
      expect(detail.instanceId).to.be.a('string');
      expect(detail.data).to.be.an('object');
    });

    it('should handle events without original DOM events', async () => {
      const button = await fixture<TestButton>(
        html`<ds-test-button></ds-test-button>`
      );

      // Dispatch event without original event
      void button.dispatchDesignSystemEvent('custom', { test: true });

      const { detail } = (await oneEvent(
        button,
        'ds-test-button-custom'
      )) as CustomEvent<DesignSystemEventPayload>;

      expect(detail.originalEvent).to.be.undefined;
      expect(detail.data.test).to.be.true;
    });
  });

  describe('Accessibility Features', () => {
    it('should announce to screen readers', () => {
      // Mock document.body.appendChild and removeChild
      const originalAppendChild = document.body.appendChild;
      const originalRemoveChild = document.body.removeChild;

      let appendedElement: Element | null = null;
      document.body.appendChild = (element: Element) => {
        appendedElement = element;
        return element;
      };

      document.body.removeChild = (element: Element) => {
        return element;
      };

      // Test announcement
      const button = new TestButton();
      void button.announceToScreenReader('Test message', 'assertive');

      expect(appendedElement).to.not.be.null;
      expect(appendedElement?.getAttribute('aria-live')).to.equal('assertive');
      expect(appendedElement?.getAttribute('aria-atomic')).to.equal('true');
      expect(appendedElement?.textContent).to.equal('Test message');

      // Restore original methods
      document.body.appendChild = originalAppendChild;
      document.body.removeChild = originalRemoveChild;
    });
  });

  describe('Performance Considerations', () => {
    it('should handle multiple rapid events efficiently', async () => {
      const button = await fixture<TestButton>(
        html`<ds-test-button></ds-test-button>`
      );

      let eventCount = 0;
      button.addEventListener('ds-test-button-click', () => {
        eventCount++;
      });

      // Rapid clicks
      for (let i = 0; i < 10; i++) {
        void button.click();
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      // Wait for all events to process
      await new Promise(resolve => setTimeout(resolve, 200));

      expect(eventCount).to.be.greaterThan(0);
    });
  });
});
