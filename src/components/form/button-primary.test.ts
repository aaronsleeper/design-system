import { fixture, expect, html } from '@open-wc/testing';
import { ButtonPrimary } from './button-primary.js';

describe('ButtonPrimary', () => {
  it('renders with default properties', async () => {
    const el = await fixture<ButtonPrimary>(
      html`<ds-button-primary>Click me</ds-button-primary>`
    );

    expect(el.variant).to.equal('primary');
    expect(el.disabled).to.equal(false);
    expect(el.size).to.equal('medium');
    expect(el.shadowRoot?.querySelector('button')).to.exist;
  });

  it('renders with custom properties', async () => {
    const el = await fixture<ButtonPrimary>(
      html`<ds-button-primary variant="secondary" size="large" disabled
        >Click me</ds-button-primary
      >`
    );

    expect(el.variant).to.equal('secondary');
    expect(el.disabled).to.equal(true);
    expect(el.size).to.equal('large');
  });

  it('dispatches click event when not disabled', async () => {
    const el = await fixture<ButtonPrimary>(
      html`<ds-button-primary>Click me</ds-button-primary>`
    );

    let clickEvent: CustomEvent | undefined;
    el.addEventListener('ds-button-click', e => {
      clickEvent = e as CustomEvent;
    });

    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button?.click();

    expect(clickEvent).to.exist;
    expect(clickEvent?.detail.variant).to.equal('primary');
    expect(clickEvent?.detail.size).to.equal('medium');
  });

  it('does not dispatch click event when disabled', async () => {
    const el = await fixture<ButtonPrimary>(
      html`<ds-button-primary disabled>Click me</ds-button-primary>`
    );

    let clickEvent: CustomEvent | undefined;
    el.addEventListener('ds-button-click', e => {
      clickEvent = e as CustomEvent;
    });

    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button?.click();

    expect(clickEvent).to.not.exist;
  });

  it('has correct CSS classes based on properties', async () => {
    const el = await fixture<ButtonPrimary>(
      html`<ds-button-primary variant="tertiary" size="small"
        >Click me</ds-button-primary
      >`
    );

    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    expect(button?.classList.contains('button--tertiary')).to.be.true;
    expect(button?.classList.contains('button--small')).to.be.true;
  });

  it('renders slot content', async () => {
    const el = await fixture<ButtonPrimary>(
      html`<ds-button-primary>Custom Text</ds-button-primary>`
    );

    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    expect(button?.textContent?.trim()).to.equal('Custom Text');
  });
});
