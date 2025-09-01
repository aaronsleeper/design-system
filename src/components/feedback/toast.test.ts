import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { Toast } from './toast.js';

describe('Toast Component', () => {
  let element: Toast;

  beforeEach(async () => {
    element = await fixture<Toast>(
      html`<ds-toast>Test toast message</ds-toast>`
    );
  });

  describe('Component Rendering', () => {
    it('should render with default properties', () => {
      expect(element).to.exist;
      expect(element.variant).to.equal('default');
      expect(element.size).to.equal('medium');
      expect(element.state).to.equal('default');
      expect(element.position).to.equal('top');
      expect(element.dismissible).to.be.true;
      expect(element.autoDismiss).to.be.false;
      expect(element.autoDismissDelay).to.equal(5000);
      expect(element.role).to.equal('alert');
    });

    it('should render toast content', () => {
      const toastElement = element.shadowRoot?.querySelector('.toast');
      expect(toastElement).to.exist;
      expect(toastElement?.textContent?.trim()).to.include(
        'Test toast message'
      );
    });

    it('should render with correct CSS classes', () => {
      const toastElement = element.shadowRoot?.querySelector('.toast');
      expect(toastElement?.classList.contains('toast--default')).to.be.true;
      expect(toastElement?.classList.contains('toast--medium')).to.be.true;
    });

    it('should render dismiss button when dismissible is true', () => {
      const dismissButton =
        element.shadowRoot?.querySelector('.toast__dismiss');
      expect(dismissButton).to.exist;
      expect(dismissButton?.getAttribute('aria-label')).to.equal(
        'Dismiss toast'
      );
    });

    it('should not render dismiss button when dismissible is false', async () => {
      element.dismissible = false;
      await element.updateComplete;

      const dismissButton =
        element.shadowRoot?.querySelector('.toast__dismiss');
      expect(dismissButton).to.not.exist;
    });

    it('should render icon for each variant', () => {
      const iconElement = element.shadowRoot?.querySelector('.toast__icon');
      expect(iconElement).to.exist;
      expect(iconElement?.getAttribute('aria-hidden')).to.equal('true');
    });
  });

  describe('Variant Support', () => {
    const variants = [
      'default',
      'success',
      'warning',
      'error',
      'info',
    ] as const;

    variants.forEach(variant => {
      it(`should render ${variant} variant correctly`, async () => {
        element.variant = variant;
        await element.updateComplete;

        const toastElement = element.shadowRoot?.querySelector('.toast');
        expect(toastElement?.classList.contains(`toast--${variant}`)).to.be
          .true;
      });
    });
  });

  describe('Size Support', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach(size => {
      it(`should render ${size} size correctly`, async () => {
        element.size = size;
        await element.updateComplete;

        const toastElement = element.shadowRoot?.querySelector('.toast');
        expect(toastElement?.classList.contains(`toast--${size}`)).to.be.true;
      });
    });
  });

  describe('Position Support', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;

    positions.forEach(position => {
      it(`should render ${position} position correctly`, async () => {
        element.position = position;
        await element.updateComplete;

        expect(element.getAttribute('position')).to.equal(position);
      });
    });
  });

  describe('State Management', () => {
    it('should handle focus state', async () => {
      const toastElement = element.shadowRoot?.querySelector(
        '.toast'
      ) as HTMLElement;
      toastElement.focus();
      await element.updateComplete;

      expect(element.state).to.equal('focus');
    });

    it('should handle blur state', async () => {
      const toastElement = element.shadowRoot?.querySelector(
        '.toast'
      ) as HTMLElement;
      toastElement.focus();
      toastElement.blur();
      await element.updateComplete;

      expect(element.state).to.equal('default');
    });

    it('should handle disabled state', async () => {
      element.disabled = true;
      await element.updateComplete;

      expect(element.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('Dismiss Functionality', () => {
    it('should dismiss toast when dismiss button is clicked', async () => {
      const dismissButton = element.shadowRoot?.querySelector(
        '.toast__dismiss'
      ) as HTMLElement;
      const dismissSpy = sinon.spy(element, 'dismiss');

      dismissButton.click();
      await element.updateComplete;

      expect(dismissSpy.calledOnce).to.be.true;
    });

    it('should dismiss toast when Enter key is pressed on dismiss button', async () => {
      const dismissButton = element.shadowRoot?.querySelector(
        '.toast__dismiss'
      ) as HTMLElement;
      const dismissSpy = sinon.spy(element, 'dismiss');

      dismissButton.focus();
      await sendKeys({ press: 'Enter' });
      await element.updateComplete;

      expect(dismissSpy.calledOnce).to.be.true;
    });

    it('should dismiss toast when Space key is pressed on dismiss button', async () => {
      const dismissButton = element.shadowRoot?.querySelector(
        '.toast__dismiss'
      ) as HTMLElement;
      const dismissSpy = sinon.spy(element, 'dismiss');

      dismissButton.focus();
      await sendKeys({ press: ' ' });
      await element.updateComplete;

      expect(dismissSpy.calledOnce).to.be.true;
    });

    it('should hide toast after dismiss', async () => {
      expect(element.isVisible()).to.be.true;

      element.dismiss();
      await element.updateComplete;

      expect(element.isVisible()).to.be.false;
      expect(element.hidden).to.be.true;
    });

    it('should not dismiss when dismissible is false', async () => {
      element.dismissible = false;
      await element.updateComplete;

      const dismissSpy = sinon.spy(element, 'dismiss');
      element.dismiss();

      expect(dismissSpy.calledOnce).to.be.true;
      expect(element.isVisible()).to.be.true; // Should not be dismissed
    });
  });

  describe('Auto-Dismiss Functionality', () => {
    beforeEach(() => {
      // Mock timers for auto-dismiss tests
      sinon.useFakeTimers();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should auto-dismiss after specified delay', async () => {
      element.autoDismiss = true;
      element.autoDismissDelay = 1000;
      await element.updateComplete;

      expect(element.isVisible()).to.be.true;

      // Fast-forward time
      sinon.clock.tick(1000);
      await element.updateComplete;

      expect(element.isVisible()).to.be.false;
    });

    it('should not auto-dismiss when autoDismiss is false', async () => {
      element.autoDismiss = false;
      element.autoDismissDelay = 1000;
      await element.updateComplete;

      // Fast-forward time
      sinon.clock.tick(1000);
      await element.updateComplete;

      expect(element.isVisible()).to.be.true;
    });

    it('should clear auto-dismiss timer when manually dismissed', async () => {
      element.autoDismiss = true;
      element.autoDismissDelay = 1000;
      await element.updateComplete;

      // Manually dismiss before auto-dismiss
      element.dismiss();
      await element.updateComplete;

      // Fast-forward time
      sinon.clock.tick(1000);
      await element.updateComplete;

      expect(element.isVisible()).to.be.false; // Should remain dismissed
    });

    it('should validate auto-dismiss delay range', async () => {
      element.autoDismissDelay = 500; // Below minimum
      await element.updateComplete;
      expect(element.autoDismissDelay).to.equal(5000); // Should use default

      element.autoDismissDelay = 35000; // Above maximum
      await element.updateComplete;
      expect(element.autoDismissDelay).to.equal(5000); // Should use default
    });
  });

  describe('Event System', () => {
    it('should dispatch render event', async () => {
      const renderSpy = sinon.spy();
      element.addEventListener('ds-toast-render', renderSpy);

      await element.updateComplete;

      expect(renderSpy.calledOnce).to.be.true;
      expect(renderSpy.firstCall.args[0].detail.data.variant).to.equal(
        'default'
      );
    });

    it('should dispatch focus event', async () => {
      const focusSpy = sinon.spy();
      element.addEventListener('ds-toast-focus', focusSpy);

      const toastElement = element.shadowRoot?.querySelector(
        '.toast'
      ) as HTMLElement;
      toastElement.focus();
      await element.updateComplete;

      expect(focusSpy.calledOnce).to.be.true;
    });

    it('should dispatch blur event', async () => {
      const blurSpy = sinon.spy();
      element.addEventListener('ds-toast-blur', blurSpy);

      const toastElement = element.shadowRoot?.querySelector(
        '.toast'
      ) as HTMLElement;
      toastElement.focus();
      toastElement.blur();
      await element.updateComplete;

      expect(blurSpy.calledOnce).to.be.true;
    });

    it('should dispatch dismiss event', async () => {
      const dismissSpy = sinon.spy();
      element.addEventListener('ds-toast-dismiss', dismissSpy);

      element.dismiss();
      await element.updateComplete;

      expect(dismissSpy.calledOnce).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const toastElement = element.shadowRoot?.querySelector('.toast');
      expect(toastElement?.getAttribute('role')).to.equal('alert');
      expect(toastElement?.getAttribute('tabindex')).to.equal('0');
    });

    it('should support custom aria-label', async () => {
      element.ariaLabel = 'Custom toast message';
      await element.updateComplete;

      const toastElement = element.shadowRoot?.querySelector('.toast');
      expect(toastElement?.getAttribute('aria-label')).to.equal(
        'Custom toast message'
      );
    });

    it('should support aria-describedby', async () => {
      element.ariaDescribedBy = 'description-id';
      await element.updateComplete;

      const toastElement = element.shadowRoot?.querySelector('.toast');
      expect(toastElement?.getAttribute('aria-describedby')).to.equal(
        'description-id'
      );
    });

    it('should support custom role', async () => {
      element.role = 'status';
      await element.updateComplete;

      const toastElement = element.shadowRoot?.querySelector('.toast');
      expect(toastElement?.getAttribute('role')).to.equal('status');
    });

    it('should be keyboard accessible', async () => {
      const toastElement = element.shadowRoot?.querySelector(
        '.toast'
      ) as HTMLElement;
      expect(toastElement?.getAttribute('tabindex')).to.equal('0');

      toastElement.focus();
      expect(document.activeElement).to.equal(toastElement);
    });

    it('should announce to screen readers', () => {
      const announceSpy = sinon.spy(element, 'announceToScreenReader');

      element.dismiss();
      expect(announceSpy.calledWith('Toast dismissed', 'polite')).to.be.true;

      element.show();
      expect(announceSpy.calledWith('Toast shown', 'polite')).to.be.true;
    });
  });

  describe('Public Methods', () => {
    it('should focus the toast', () => {
      const focusSpy = sinon.spy();
      const toastElement = element.shadowRoot?.querySelector(
        '.toast'
      ) as HTMLElement;
      toastElement.focus = focusSpy;

      element.focus();
      expect(focusSpy.calledOnce).to.be.true;
    });

    it('should blur the toast', () => {
      const blurSpy = sinon.spy();
      const toastElement = element.shadowRoot?.querySelector(
        '.toast'
      ) as HTMLElement;
      toastElement.blur = blurSpy;

      element.blur();
      expect(blurSpy.calledOnce).to.be.true;
    });

    it('should get text content', () => {
      expect(element.getTextContent()).to.equal('Test toast message');
    });

    it('should get dimensions', () => {
      const dimensions = element.getDimensions();
      expect(dimensions).to.have.property('width');
      expect(dimensions).to.have.property('height');
    });

    it('should check visibility', () => {
      expect(element.isVisible()).to.be.true;

      element.dismiss();
      expect(element.isVisible()).to.be.false;
    });

    it('should check dismissible state', () => {
      expect(element.isDismissible()).to.be.true;

      element.dismissible = false;
      expect(element.isDismissible()).to.be.false;
    });

    it('should check auto-dismiss state', () => {
      expect(element.hasAutoDismiss()).to.be.false;

      element.autoDismiss = true;
      expect(element.hasAutoDismiss()).to.be.true;
    });

    it('should get position', () => {
      expect(element.getPosition()).to.equal('top');

      element.position = 'bottom';
      expect(element.getPosition()).to.equal('bottom');
    });

    it('should get auto-dismiss delay', () => {
      expect(element.getAutoDismissDelay()).to.equal(5000);

      element.autoDismissDelay = 3000;
      expect(element.getAutoDismissDelay()).to.equal(3000);
    });

    it('should set auto-dismiss delay', () => {
      element.setAutoDismissDelay(2000);
      expect(element.autoDismissDelay).to.equal(2000);
    });

    it('should validate auto-dismiss delay when setting', () => {
      element.setAutoDismissDelay(500); // Below minimum
      expect(element.autoDismissDelay).to.equal(5000); // Should use default

      element.setAutoDismissDelay(35000); // Above maximum
      expect(element.autoDismissDelay).to.equal(5000); // Should use default
    });
  });

  describe('Property Validation', () => {
    it('should validate variant property', async () => {
      // @ts-ignore - Testing invalid value
      element.variant = 'invalid';
      await element.updateComplete;
      expect(element.variant).to.equal('default');
    });

    it('should validate size property', async () => {
      // @ts-ignore - Testing invalid value
      element.size = 'invalid';
      await element.updateComplete;
      expect(element.size).to.equal('medium');
    });

    it('should validate state property', async () => {
      // @ts-ignore - Testing invalid value
      element.state = 'invalid';
      await element.updateComplete;
      expect(element.state).to.equal('default');
    });

    it('should validate position property', async () => {
      // @ts-ignore - Testing invalid value
      element.position = 'invalid';
      await element.updateComplete;
      expect(element.position).to.equal('top');
    });

    it('should validate role property', async () => {
      // @ts-ignore - Testing invalid value
      element.role = 'invalid';
      await element.updateComplete;
      expect(element.role).to.equal('alert');
    });
  });

  describe('Lifecycle Management', () => {
    it('should cleanup auto-dismiss timer on disconnect', () => {
      element.autoDismiss = true;
      element.autoDismissDelay = 1000;

      const clearTimeoutSpy = sinon.spy(global, 'clearTimeout');

      element.disconnectedCallback();

      expect(clearTimeoutSpy.called).to.be.true;
    });
  });

  describe('Show/Hide Functionality', () => {
    it('should show hidden toast', async () => {
      element.dismiss();
      await element.updateComplete;
      expect(element.isVisible()).to.be.false;

      element.show();
      await element.updateComplete;
      expect(element.isVisible()).to.be.true;
      expect(element.hidden).to.be.false;
    });

    it('should start auto-dismiss timer when shown with auto-dismiss enabled', async () => {
      element.autoDismiss = true;
      element.autoDismissDelay = 1000;

      element.dismiss();
      await element.updateComplete;

      element.show();
      await element.updateComplete;

      // Should be visible and auto-dismiss timer should be running
      expect(element.isVisible()).to.be.true;
    });
  });
});
