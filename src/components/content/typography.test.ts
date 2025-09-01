import { html } from 'lit';
import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { Typography } from './typography.js';

describe('Typography Component', () => {
  describe('Component Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography>Default text</ds-typography>`
      );

      expect(el).to.exist;
      expect(el.variant).to.equal('body');
      expect(el.size).to.equal('medium');
      expect(el.weight).to.equal('normal');
      expect(el.color).to.equal('primary');
      expect(el.textContent).to.equal('Default text');
    });

    it('should render as paragraph element by default', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography>Body text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element).to.exist;
      expect(element?.classList.contains('typography')).to.be.true;
    });

    it('should render with custom element using as property', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography as="div">Custom element</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('div');
      expect(element).to.exist;
      expect(element?.classList.contains('typography')).to.be.true;
    });
  });

  describe('Variant Properties', () => {
    it('should render heading-1 variant as h1 element', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="heading-1">Main Title</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('h1');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--heading-1')).to.be.true;
    });

    it('should render heading-2 variant as h2 element', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="heading-2">Section Title</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('h2');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--heading-2')).to.be.true;
    });

    it('should render heading-3 variant as h3 element', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="heading-3"
          >Subsection Title</ds-typography
        >`
      );

      const element = el.shadowRoot?.querySelector('h3');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--heading-3')).to.be.true;
    });

    it('should render heading-4 variant as h4 element', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="heading-4">Minor Title</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('h4');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--heading-4')).to.be.true;
    });

    it('should render heading-5 variant as h5 element', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="heading-5">Small Title</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('h5');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--heading-5')).to.be.true;
    });

    it('should render heading-6 variant as h6 element', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="heading-6">Tiny Title</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('h6');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--heading-6')).to.be.true;
    });

    it('should render body variant as p element', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="body">Body text content</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--body')).to.be.true;
    });

    it('should render caption variant as span element', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="caption">Caption text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('span');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--caption')).to.be.true;
    });

    it('should render label variant as label element', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="label">Label text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('label');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--label')).to.be.true;
    });
  });

  describe('Size Properties', () => {
    it('should apply small size class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography size="small">Small text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--small')).to.be.true;
    });

    it('should apply medium size class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography size="medium">Medium text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--medium')).to.be.true;
    });

    it('should apply large size class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography size="large">Large text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--large')).to.be.true;
    });

    it('should apply xlarge size class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography size="xlarge">Extra large text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--xlarge')).to.be.true;
    });
  });

  describe('Weight Properties', () => {
    it('should apply light weight class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography weight="light">Light text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--light')).to.be.true;
    });

    it('should apply normal weight class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography weight="normal">Normal text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--normal')).to.be.true;
    });

    it('should apply medium weight class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography weight="medium">Medium text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--medium')).to.be.true;
    });

    it('should apply semibold weight class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography weight="semibold">Semibold text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--semibold')).to.be.true;
    });

    it('should apply bold weight class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography weight="bold">Bold text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--bold')).to.be.true;
    });
  });

  describe('Color Properties', () => {
    it('should apply primary color class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography color="primary">Primary text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--primary')).to.be.true;
    });

    it('should apply secondary color class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography color="secondary">Secondary text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--secondary')).to.be.true;
    });

    it('should apply muted color class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography color="muted">Muted text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--muted')).to.be.true;
    });

    it('should apply inverse color class', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography color="inverse">Inverse text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--inverse')).to.be.true;
    });
  });

  describe('Property Updates', () => {
    it('should update variant when property changes', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="body">Text</ds-typography>`
      );

      el.variant = 'heading-1';
      await elementUpdated(el);

      const element = el.shadowRoot?.querySelector('h1');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--heading-1')).to.be.true;
    });

    it('should update size when property changes', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography size="medium">Text</ds-typography>`
      );

      el.size = 'large';
      await elementUpdated(el);

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--large')).to.be.true;
    });

    it('should update weight when property changes', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography weight="normal">Text</ds-typography>`
      );

      el.weight = 'bold';
      await elementUpdated(el);

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--bold')).to.be.true;
    });

    it('should update color when property changes', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography color="primary">Text</ds-typography>`
      );

      el.color = 'muted';
      await elementUpdated(el);

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.classList.contains('typography--muted')).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('should apply aria-label when provided', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography aria-label="Main heading">Title</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.getAttribute('aria-label')).to.equal('Main heading');
    });

    it('should apply aria-describedby when provided', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography aria-describedby="description">Text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.getAttribute('aria-describedby')).to.equal('description');
    });

    it('should apply aria-level for heading variants', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="heading-1" aria-level="1"
          >Title</ds-typography
        >`
      );

      const element = el.shadowRoot?.querySelector('h1');
      expect(element?.getAttribute('aria-level')).to.equal('1');
    });

    it('should not apply aria-level for non-heading variants', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="body" aria-level="1">Text</ds-typography>`
      );

      const element = el.shadowRoot?.querySelector('p');
      expect(element?.getAttribute('aria-level')).to.be.null;
    });
  });

  describe('Event System', () => {
    it('should dispatch ds-typography-render event on render', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography
          variant="heading-1"
          size="large"
          weight="bold"
          color="primary"
          >Title</ds-typography
        >`
      );

      let eventDispatched = false;
      let eventDetail: any = null;

      el.addEventListener('ds-typography-render', (event: CustomEvent) => {
        eventDispatched = true;
        eventDetail = event.detail;
      });

      // Trigger a re-render by updating a property
      el.variant = 'heading-2';
      await elementUpdated(el);

      expect(eventDispatched).to.be.true;
      expect(eventDetail).to.exist;
      expect(eventDetail.component).to.equal('typography');
      expect(eventDetail.data.variant).to.equal('heading-2');
      expect(eventDetail.data.size).to.equal('large');
      expect(eventDetail.data.weight).to.equal('bold');
      expect(eventDetail.data.color).to.equal('primary');
    });
  });

  describe('Property Validation', () => {
    it('should validate and correct invalid variant', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="invalid">Text</ds-typography>`
      );

      expect(el.variant).to.equal('body');
    });

    it('should validate and correct invalid size', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography size="invalid">Text</ds-typography>`
      );

      expect(el.size).to.equal('medium');
    });

    it('should validate and correct invalid weight', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography weight="invalid">Text</ds-typography>`
      );

      expect(el.weight).to.equal('normal');
    });

    it('should validate and correct invalid color', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography color="invalid">Text</ds-typography>`
      );

      expect(el.color).to.equal('primary');
    });
  });

  describe('Complex Combinations', () => {
    it('should handle all properties together', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography
          variant="heading-3"
          size="large"
          weight="semibold"
          color="secondary"
          aria-label="Complex heading"
          >Complex Text</ds-typography
        >`
      );

      const element = el.shadowRoot?.querySelector('h3');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--heading-3')).to.be.true;
      expect(element?.classList.contains('typography--large')).to.be.true;
      expect(element?.classList.contains('typography--semibold')).to.be.true;
      expect(element?.classList.contains('typography--secondary')).to.be.true;
      expect(element?.getAttribute('aria-label')).to.equal('Complex heading');
    });

    it('should override semantic element with as property', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography variant="heading-1" as="span"
          >Title as span</ds-typography
        >`
      );

      const element = el.shadowRoot?.querySelector('span');
      expect(element).to.exist;
      expect(element?.classList.contains('typography--heading-1')).to.be.true;
    });
  });

  describe('Slot Content', () => {
    it('should render slot content correctly', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography
          >Slot content with <strong>bold</strong> text</ds-typography
        >`
      );

      expect(el.textContent).to.include('Slot content with');
      expect(el.textContent).to.include('bold');
      expect(el.textContent).to.include('text');
    });

    it('should handle empty slot content', async () => {
      const el = await fixture<Typography>(
        html`<ds-typography></ds-typography>`
      );

      expect(el.textContent).to.equal('');
    });
  });
});
