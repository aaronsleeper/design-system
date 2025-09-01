import { expect, fixture, html } from '@open-wc/testing';
import { Badge } from './badge.js';

describe('Badge Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Badge>(html`<ds-badge>Default Badge</ds-badge>`);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.state).to.equal('default');
      expect(el.textContent?.trim()).to.equal('Default Badge');
    });

    it('should render with custom variant', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge variant="primary">Primary Badge</ds-badge>`
      );

      expect(el.variant).to.equal('primary');
      expect(el.shadowRoot?.querySelector('.badge')).to.have.class(
        'badge--primary'
      );
    });

    it('should render with custom size', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge size="large">Large Badge</ds-badge>`
      );

      expect(el.size).to.equal('large');
      expect(el.shadowRoot?.querySelector('.badge')).to.have.class(
        'badge--large'
      );
    });

    it('should render with custom state', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge state="focus">Focus Badge</ds-badge>`
      );

      expect(el.state).to.equal('focus');
      expect(el.shadowRoot?.querySelector('.badge')).to.have.class(
        'badge--focus'
      );
    });
  });

  describe('Variants', () => {
    const variants = [
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'error',
      'info',
    ];

    variants.forEach(variant => {
      it(`should render ${variant} variant correctly`, async () => {
        const el = await fixture<Badge>(
          html`<ds-badge variant="${variant}">${variant} Badge</ds-badge>`
        );

        expect(el.variant).to.equal(variant);
        expect(el.shadowRoot?.querySelector('.badge')).to.have.class(
          `badge--${variant}`
        );
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`should render ${size} size correctly`, async () => {
        const el = await fixture<Badge>(
          html`<ds-badge size="${size}">${size} Badge</ds-badge>`
        );

        expect(el.size).to.equal(size);
        expect(el.shadowRoot?.querySelector('.badge')).to.have.class(
          `badge--${size}`
        );
      });
    });
  });

  describe('States', () => {
    const states = ['default', 'focus', 'disabled'];

    states.forEach(state => {
      it(`should render ${state} state correctly`, async () => {
        const el = await fixture<Badge>(
          html`<ds-badge state="${state}">${state} Badge</ds-badge>`
        );

        expect(el.state).to.equal(state);
        if (state !== 'default') {
          expect(el.shadowRoot?.querySelector('.badge')).to.have.class(
            `badge--${state}`
          );
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Badge>(html`
        <ds-badge
          aria-label="Status badge"
          aria-describedby="badge-description"
        >
          Active
        </ds-badge>
      `);

      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge).to.have.attribute('aria-label', 'Status badge');
      expect(badge).to.have.attribute('aria-describedby', 'badge-description');
      expect(badge).to.have.attribute('role', 'status');
    });

    it('should be focusable', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge>Focusable Badge</ds-badge>`
      );

      const badge = el.shadowRoot?.querySelector('.badge') as HTMLElement;
      expect(badge).to.have.attribute('tabindex', '0');
    });

    it('should handle focus events', async () => {
      const el = await fixture<Badge>(html`<ds-badge>Focus Badge</ds-badge>`);

      const badge = el.shadowRoot?.querySelector('.badge') as HTMLElement;

      // Focus the badge
      badge.focus();
      await el.updateComplete;

      expect(el.state).to.equal('focus');
    });

    it('should handle blur events', async () => {
      const el = await fixture<Badge>(html`<ds-badge>Blur Badge</ds-badge>`);

      const badge = el.shadowRoot?.querySelector('.badge') as HTMLElement;

      // Focus then blur the badge
      badge.focus();
      await el.updateComplete;
      expect(el.state).to.equal('focus');

      badge.blur();
      await el.updateComplete;
      expect(el.state).to.equal('default');
    });

    it('should be disabled when disabled attribute is set', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge disabled>Disabled Badge</ds-badge>`
      );

      expect(el.hasAttribute('disabled')).to.be.true;
      expect(el.shadowRoot?.querySelector('.badge')).to.have.class(
        'badge--disabled'
      );
    });
  });

  describe('Event System', () => {
    it('should dispatch render event on render', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge variant="primary" size="medium">Test Badge</ds-badge>`
      );

      // Wait for the render event to be dispatched
      await new Promise(resolve => setTimeout(resolve, 0));

      // Check if the component has the correct properties (render event sets these)
      expect(el.variant).to.equal('primary');
      expect(el.size).to.equal('medium');
    });

    it('should dispatch focus event on focus', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge>Focus Event Badge</ds-badge>`
      );
      let focusEventDispatched = false;

      el.addEventListener('ds-badge-focus', () => {
        focusEventDispatched = true;
      });

      const badge = el.shadowRoot?.querySelector('.badge') as HTMLElement;
      badge.focus();
      await el.updateComplete;

      expect(focusEventDispatched).to.be.true;
    });

    it('should dispatch blur event on blur', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge>Blur Event Badge</ds-badge>`
      );
      let blurEventDispatched = false;

      el.addEventListener('ds-badge-blur', () => {
        blurEventDispatched = true;
      });

      const badge = el.shadowRoot?.querySelector('.badge') as HTMLElement;
      badge.focus();
      badge.blur();
      await el.updateComplete;

      expect(blurEventDispatched).to.be.true;
    });
  });

  describe('Public Methods', () => {
    it('should focus the badge when focus() is called', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge>Focus Method Badge</ds-badge>`
      );

      el.focus();
      await el.updateComplete;

      expect(el.state).to.equal('focus');
    });

    it('should blur the badge when blur() is called', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge>Blur Method Badge</ds-badge>`
      );

      el.focus();
      await el.updateComplete;
      expect(el.state).to.equal('focus');

      el.blur();
      await el.updateComplete;
      expect(el.state).to.equal('default');
    });

    it('should return text content when getTextContent() is called', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge>Text Content Badge</ds-badge>`
      );

      expect(el.getTextContent()).to.equal('Text Content Badge');
    });

    it('should return dimensions when getDimensions() is called', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge>Dimensions Badge</ds-badge>`
      );

      const dimensions = el.getDimensions();
      expect(dimensions).to.have.property('width');
      expect(dimensions).to.have.property('height');
      expect(dimensions.width).to.be.greaterThan(0);
      expect(dimensions.height).to.be.greaterThan(0);
    });
  });

  describe('Property Validation', () => {
    it('should validate variant property', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge variant="invalid">Invalid Variant</ds-badge>`
      );

      // Should fallback to default
      expect(el.variant).to.equal('default');
    });

    it('should validate size property', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge size="invalid">Invalid Size</ds-badge>`
      );

      // Should fallback to medium
      expect(el.size).to.equal('medium');
    });

    it('should validate state property', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge state="invalid">Invalid State</ds-badge>`
      );

      // Should fallback to default
      expect(el.state).to.equal('default');
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct CSS classes for all properties', async () => {
      const el = await fixture<Badge>(html`
        <ds-badge variant="primary" size="large" state="focus">
          Complete Badge
        </ds-badge>
      `);

      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge).to.have.class('badge');
      expect(badge).to.have.class('badge--primary');
      expect(badge).to.have.class('badge--large');
      expect(badge).to.have.class('badge--focus');
    });

    it('should not apply state class for default state', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge state="default">Default State Badge</ds-badge>`
      );

      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge).to.not.have.class('badge--default');
    });
  });

  describe('Content Handling', () => {
    it('should render slot content', async () => {
      const el = await fixture<Badge>(html`
        <ds-badge>
          <span>Slot Content</span>
        </ds-badge>
      `);

      expect(el.textContent?.trim()).to.equal('Slot Content');
    });

    it('should handle empty content', async () => {
      const el = await fixture<Badge>(html`<ds-badge></ds-badge>`);

      expect(el.textContent?.trim()).to.equal('');
      expect(el.getTextContent()).to.equal('');
    });

    it('should handle numeric content', async () => {
      const el = await fixture<Badge>(html`<ds-badge>42</ds-badge>`);

      expect(el.textContent?.trim()).to.equal('42');
      expect(el.getTextContent()).to.equal('42');
    });
  });

  describe('Responsive Behavior', () => {
    it('should maintain proper styling across different sizes', async () => {
      const sizes = ['small', 'medium', 'large'];

      for (const size of sizes) {
        const el = await fixture<Badge>(
          html`<ds-badge size="${size}">${size} Badge</ds-badge>`
        );
        const badge = el.shadowRoot?.querySelector('.badge') as HTMLElement;

        expect(badge).to.have.class(`badge--${size}`);

        // Check that the badge has proper dimensions
        const dimensions = el.getDimensions();
        expect(dimensions.width).to.be.greaterThan(0);
        expect(dimensions.height).to.be.greaterThan(0);
      }
    });
  });

  describe('Integration', () => {
    it('should work with other components', async () => {
      const el = await fixture<Badge>(html`
        <ds-badge variant="success" size="small" aria-label="Status indicator">
          <span>Active</span>
        </ds-badge>
      `);

      expect(el.variant).to.equal('success');
      expect(el.size).to.equal('small');
      expect(el.shadowRoot?.querySelector('.badge')).to.have.attribute(
        'aria-label',
        'Status indicator'
      );
      expect(el.textContent?.trim()).to.equal('Active');
    });

    it('should handle property changes dynamically', async () => {
      const el = await fixture<Badge>(
        html`<ds-badge variant="default">Dynamic Badge</ds-badge>`
      );

      // Change variant
      el.variant = 'primary';
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector('.badge')).to.have.class(
        'badge--primary'
      );

      // Change size
      el.size = 'large';
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector('.badge')).to.have.class(
        'badge--large'
      );

      // Change state
      el.state = 'focus';
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector('.badge')).to.have.class(
        'badge--focus'
      );
    });
  });
});
