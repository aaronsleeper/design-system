import { expect, fixture, html } from '@open-wc/testing';
import { Avatar } from './avatar.js';

describe('Avatar Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);

      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('medium');
      expect(el.state).to.equal('default');
    });

    it('should render with custom properties', async () => {
      const el = await fixture<Avatar>(html`
        <ds-avatar
          variant="circle"
          size="large"
          initials="JD"
          aria-label="John Doe"
        ></ds-avatar>
      `);

      expect(el.variant).to.equal('circle');
      expect(el.size).to.equal('large');
      expect(el.initials).to.equal('JD');
      expect(el.ariaLabel).to.equal('John Doe');
    });

    it('should render with image source', async () => {
      const el = await fixture<Avatar>(html`
        <ds-avatar src="test-image.jpg" alt="Test User"></ds-avatar>
      `);

      expect(el.src).to.equal('test-image.jpg');
      expect(el.alt).to.equal('Test User');
    });
  });

  describe('Variants', () => {
    it('should apply default variant styles', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar variant="default"></ds-avatar>`
      );
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.have.class('avatar--default');
    });

    it('should apply circle variant styles', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar variant="circle"></ds-avatar>`
      );
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.have.class('avatar--circle');
    });

    it('should apply square variant styles', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar variant="square"></ds-avatar>`
      );
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.have.class('avatar--square');
    });
  });

  describe('Sizes', () => {
    it('should apply small size styles', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar size="small"></ds-avatar>`
      );
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.have.class('avatar--small');
    });

    it('should apply medium size styles', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar size="medium"></ds-avatar>`
      );
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.have.class('avatar--medium');
    });

    it('should apply large size styles', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar size="large"></ds-avatar>`
      );
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.have.class('avatar--large');
    });

    it('should apply xlarge size styles', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar size="xlarge"></ds-avatar>`
      );
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.have.class('avatar--xlarge');
    });
  });

  describe('States', () => {
    it('should apply default state styles', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar state="default"></ds-avatar>`
      );
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.not.have.class('avatar--focus');
    });

    it('should apply focus state styles', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar state="focus"></ds-avatar>`
      );
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.have.class('avatar--focus');
    });

    it('should apply disabled state styles', async () => {
      const el = await fixture<Avatar>(html`<ds-avatar disabled></ds-avatar>`);

      expect(el.disabled).to.be.true;
    });
  });

  describe('Content Rendering', () => {
    it('should render initials when provided', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar initials="AB"></ds-avatar>`
      );
      const initials = el.shadowRoot?.querySelector('.avatar__initials');

      expect(initials).to.exist;
      expect(initials?.textContent?.trim()).to.equal('AB');
    });

    it('should render image when src is provided', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar src="test.jpg" alt="Test"></ds-avatar>`
      );
      const image = el.shadowRoot?.querySelector('.avatar__image');

      expect(image).to.exist;
      expect(image).to.have.attribute('src', 'test.jpg');
      expect(image).to.have.attribute('alt', 'Test');
    });

    it('should render placeholder when no content is provided', async () => {
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);
      const placeholder = el.shadowRoot?.querySelector('.avatar__placeholder');

      expect(placeholder).to.exist;
    });

    it('should prioritize image over initials', async () => {
      const el = await fixture<Avatar>(html`
        <ds-avatar src="test.jpg" initials="AB"></ds-avatar>
      `);
      const image = el.shadowRoot?.querySelector('.avatar__image');
      const initials = el.shadowRoot?.querySelector('.avatar__initials');

      expect(image).to.exist;
      expect(initials).to.not.exist;
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const el = await fixture<Avatar>(html`
        <ds-avatar aria-label="User Avatar" aria-describedby="desc"></ds-avatar>
      `);
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.have.attribute('aria-label', 'User Avatar');
      expect(avatar).to.have.attribute('aria-describedby', 'desc');
      expect(avatar).to.have.attribute('role', 'img');
    });

    it('should be focusable', async () => {
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);
      const avatar = el.shadowRoot?.querySelector('.avatar') as HTMLElement;

      expect(avatar).to.have.attribute('tabindex', '0');
    });

    it('should support keyboard navigation', async () => {
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);
      const avatar = el.shadowRoot?.querySelector('.avatar') as HTMLElement;

      avatar.focus();
      expect(document.activeElement).to.equal(avatar);
    });
  });

  describe('Events', () => {
    it('should dispatch render event on mount', async () => {
      const renderSpy = sinon.spy();
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);

      el.addEventListener('ds-avatar-render', renderSpy);
      await el.updateComplete;

      expect(renderSpy).to.have.been.calledOnce;
    });

    it('should dispatch focus event when focused', async () => {
      const focusSpy = sinon.spy();
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);
      const avatar = el.shadowRoot?.querySelector('.avatar') as HTMLElement;

      el.addEventListener('ds-avatar-focus', focusSpy);
      avatar.focus();

      expect(focusSpy).to.have.been.calledOnce;
    });

    it('should dispatch blur event when blurred', async () => {
      const blurSpy = sinon.spy();
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);
      const avatar = el.shadowRoot?.querySelector('.avatar') as HTMLElement;

      el.addEventListener('ds-avatar-blur', blurSpy);
      avatar.focus();
      avatar.blur();

      expect(blurSpy).to.have.been.calledOnce;
    });
  });

  describe('Image Handling', () => {
    it('should handle image load event', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar src="test.jpg"></ds-avatar>`
      );
      const image = el.shadowRoot?.querySelector(
        '.avatar__image'
      ) as HTMLImageElement;

      // Simulate image load
      const loadEvent = new Event('load');
      image.dispatchEvent(loadEvent);

      expect(image.style.display).to.equal('block');
    });

    it('should handle image error event', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar src="invalid.jpg"></ds-avatar>`
      );
      const image = el.shadowRoot?.querySelector(
        '.avatar__image'
      ) as HTMLImageElement;

      // Simulate image error
      const errorEvent = new Event('error');
      image.dispatchEvent(errorEvent);

      expect(image.style.display).to.equal('none');
    });
  });

  describe('Public Methods', () => {
    it('should focus the avatar', async () => {
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);
      const avatar = el.shadowRoot?.querySelector('.avatar') as HTMLElement;
      const focusSpy = sinon.spy(avatar, 'focus');

      el.focus();

      expect(focusSpy).to.have.been.calledOnce;
    });

    it('should blur the avatar', async () => {
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);
      const avatar = el.shadowRoot?.querySelector('.avatar') as HTMLElement;
      const blurSpy = sinon.spy(avatar, 'blur');

      el.blur();

      expect(blurSpy).to.have.been.calledOnce;
    });

    it('should get content correctly', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar initials="AB"></ds-avatar>`
      );

      expect(el.getContent()).to.equal('AB');
    });

    it('should get dimensions correctly', async () => {
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);
      const dimensions = el.getDimensions();

      expect(dimensions).to.have.property('width');
      expect(dimensions).to.have.property('height');
    });

    it('should check if has image', async () => {
      const elWithImage = await fixture<Avatar>(
        html`<ds-avatar src="test.jpg"></ds-avatar>`
      );
      const elWithoutImage = await fixture<Avatar>(
        html`<ds-avatar></ds-avatar>`
      );

      expect(elWithImage.hasImage()).to.be.true;
      expect(elWithoutImage.hasImage()).to.be.false;
    });

    it('should check if has initials', async () => {
      const elWithInitials = await fixture<Avatar>(
        html`<ds-avatar initials="AB"></ds-avatar>`
      );
      const elWithoutInitials = await fixture<Avatar>(
        html`<ds-avatar></ds-avatar>`
      );

      expect(elWithInitials.hasInitials()).to.be.true;
      expect(elWithoutInitials.hasInitials()).to.be.false;
    });
  });

  describe('Property Validation', () => {
    it('should validate variant property', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar variant="invalid"></ds-avatar>`
      );

      expect(el.variant).to.equal('default');
    });

    it('should validate size property', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar size="invalid"></ds-avatar>`
      );

      expect(el.size).to.equal('medium');
    });

    it('should validate state property', async () => {
      const el = await fixture<Avatar>(
        html`<ds-avatar state="invalid"></ds-avatar>`
      );

      expect(el.state).to.equal('default');
    });
  });

  describe('CSS Custom Properties', () => {
    it('should use CSS custom properties for theming', async () => {
      const el = await fixture<Avatar>(html`<ds-avatar></ds-avatar>`);
      const avatar = el.shadowRoot?.querySelector('.avatar');

      expect(avatar).to.have.style('background-color', 'var(--color-gray-200)');
      expect(avatar).to.have.style('color', 'var(--color-gray-700)');
    });
  });

  describe('Responsive Design', () => {
    it('should support different sizes responsively', async () => {
      const smallEl = await fixture<Avatar>(
        html`<ds-avatar size="small"></ds-avatar>`
      );
      const largeEl = await fixture<Avatar>(
        html`<ds-avatar size="large"></ds-avatar>`
      );

      const smallAvatar = smallEl.shadowRoot?.querySelector('.avatar');
      const largeAvatar = largeEl.shadowRoot?.querySelector('.avatar');

      expect(smallAvatar).to.have.class('avatar--small');
      expect(largeAvatar).to.have.class('avatar--large');
    });
  });
});
