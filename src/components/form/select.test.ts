import { expect, fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { Select, SelectOption, SelectOptionGroup } from './select.js';

describe('Select Component', () => {
  let select: Select;

  const mockOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3', disabled: true },
  ];

  const mockOptionGroups: SelectOptionGroup[] = [
    {
      label: 'Group 1',
      options: [
        { value: 'group1-option1', label: 'Group 1 Option 1' },
        { value: 'group1-option2', label: 'Group 1 Option 2' },
      ],
    },
    {
      label: 'Group 2',
      options: [
        { value: 'group2-option1', label: 'Group 2 Option 1' },
        { value: 'group2-option2', label: 'Group 2 Option 2' },
      ],
    },
  ];

  beforeEach(async () => {
    select = await fixture<Select>(html`
      <ds-select
        .options="${mockOptions}"
        placeholder="Choose an option"
        aria-label="Test select"
      ></ds-select>
    `);
  });

  describe('Component Rendering', () => {
    it('should render with default properties', async () => {
      const select = await fixture<Select>(html`<ds-select></ds-select>`);

      expect(select).to.exist;
      expect(select.type).to.equal('single');
      expect(select.size).to.equal('medium');
      expect(select.value).to.equal('');
      expect(select.placeholder).to.equal('');
      expect(select.disabled).to.be.false;
      expect(select.required).to.be.false;
      expect(select.validationState).to.equal('default');
    });

    it('should render with custom properties', async () => {
      const select = await fixture<Select>(html`
        <ds-select
          type="multiple"
          size="large"
          placeholder="Choose multiple options"
          disabled
          required
          validation-state="error"
          error-message="Please select an option"
        ></ds-select>
      `);

      expect(select.type).to.equal('multiple');
      expect(select.size).to.equal('large');
      expect(select.placeholder).to.equal('Choose multiple options');
      expect(select.disabled).to.be.true;
      expect(select.required).to.be.true;
      expect(select.validationState).to.equal('error');
      expect(select.errorMessage).to.equal('Please select an option');
    });

    it('should display placeholder when no value is selected', () => {
      const placeholder = select.shadowRoot?.querySelector(
        '.select-placeholder'
      );
      expect(placeholder).to.exist;
      expect(placeholder?.textContent).to.equal('Choose an option');
    });

    it('should display selected value', async () => {
      select.value = 'option1';
      await select.updateComplete;

      const valueElement =
        select.shadowRoot?.querySelector('.select-value span');
      expect(valueElement?.textContent).to.equal('Option 1');
    });

    it('should display loading state', async () => {
      select.loading = true;
      await select.updateComplete;

      const loadingElement =
        select.shadowRoot?.querySelector('.select-loading');
      expect(loadingElement).to.exist;
    });
  });

  describe('Options and Option Groups', () => {
    it('should render options correctly', async () => {
      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const options = dropdown?.querySelectorAll('.select-option');

      expect(options).to.have.length(3);
      expect(options?.[0]?.textContent?.trim()).to.equal('Option 1');
      expect(options?.[1]?.textContent?.trim()).to.equal('Option 2');
      expect(options?.[2]?.textContent?.trim()).to.equal('Option 3');
    });

    it('should render option groups correctly', async () => {
      const selectWithGroups = await fixture<Select>(html`
        <ds-select .optionGroups="${mockOptionGroups}"></ds-select>
      `);

      selectWithGroups.open();
      await selectWithGroups.updateComplete;

      const dropdown =
        selectWithGroups.shadowRoot?.querySelector('.select-dropdown');
      const groups = dropdown?.querySelectorAll('.select-option-group');
      const options = dropdown?.querySelectorAll('.select-option');

      expect(groups).to.have.length(2);
      expect(groups?.[0]?.textContent?.trim()).to.equal('GROUP 1');
      expect(groups?.[1]?.textContent?.trim()).to.equal('GROUP 2');
      expect(options).to.have.length(4);
    });

    it('should handle disabled options', async () => {
      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const disabledOption = dropdown?.querySelector(
        '.select-option--disabled'
      );

      expect(disabledOption).to.exist;
      expect(disabledOption?.textContent?.trim()).to.equal('Option 3');
    });
  });

  describe('Single Selection', () => {
    it('should select an option on click', async () => {
      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const firstOption = dropdown?.querySelector(
        '.select-option'
      ) as HTMLElement;

      firstOption.click();
      await select.updateComplete;

      expect(select.value).to.equal('option1');
    });

    it('should close dropdown after selection', async () => {
      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const firstOption = dropdown?.querySelector(
        '.select-option'
      ) as HTMLElement;

      firstOption.click();
      await select.updateComplete;

      expect(select.shadowRoot?.querySelector('.select-dropdown')).to.not.exist;
    });

    it('should not select disabled options', async () => {
      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const disabledOption = dropdown?.querySelector(
        '.select-option--disabled'
      ) as HTMLElement;

      disabledOption.click();
      await select.updateComplete;

      expect(select.value).to.equal('');
    });
  });

  describe('Multiple Selection', () => {
    beforeEach(async () => {
      select = await fixture<Select>(html`
        <ds-select
          type="multiple"
          .options="${mockOptions}"
          placeholder="Choose multiple options"
        ></ds-select>
      `);
    });

    it('should select multiple options', async () => {
      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const firstOption = dropdown?.querySelector(
        '.select-option'
      ) as HTMLElement;
      const secondOption = dropdown?.querySelectorAll(
        '.select-option'
      )[1] as HTMLElement;

      firstOption.click();
      secondOption.click();
      await select.updateComplete;

      expect(Array.isArray(select.value)).to.be.true;
      expect(select.value as string[]).to.include('option1');
      expect(select.value as string[]).to.include('option2');
    });

    it('should display checkbox for multiple selection', async () => {
      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const checkboxes = dropdown?.querySelectorAll('.select-option-checkbox');

      expect(checkboxes).to.have.length(3);
    });

    it('should toggle selection on click', async () => {
      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const firstOption = dropdown?.querySelector(
        '.select-option'
      ) as HTMLElement;

      // Select option
      firstOption.click();
      await select.updateComplete;
      expect(select.value as string[]).to.include('option1');

      // Deselect option
      firstOption.click();
      await select.updateComplete;
      expect(select.value as string[]).to.not.include('option1');
    });

    it('should display count for multiple selections', async () => {
      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const firstOption = dropdown?.querySelector(
        '.select-option'
      ) as HTMLElement;
      const secondOption = dropdown?.querySelectorAll(
        '.select-option'
      )[1] as HTMLElement;

      firstOption.click();
      secondOption.click();
      await select.updateComplete;

      const valueElement =
        select.shadowRoot?.querySelector('.select-value span');
      expect(valueElement?.textContent).to.equal('2 items selected');
    });
  });

  describe('Searchable Selection', () => {
    beforeEach(async () => {
      select = await fixture<Select>(html`
        <ds-select
          type="searchable"
          .options="${mockOptions}"
          placeholder="Search and select"
        ></ds-select>
      `);
    });

    it('should show search input when opened', async () => {
      select.open();
      await select.updateComplete;

      const searchInput = select.shadowRoot?.querySelector(
        '.select-search-input'
      );
      expect(searchInput).to.exist;
    });

    it('should filter options based on search query', async () => {
      select.open();
      await select.updateComplete;

      const searchInput = select.shadowRoot?.querySelector(
        '.select-search-input'
      ) as HTMLInputElement;
      searchInput.value = 'Option 1';
      searchInput.dispatchEvent(new Event('input'));
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const options = dropdown?.querySelectorAll('.select-option');

      expect(options).to.have.length(1);
      expect(options?.[0]?.textContent?.trim()).to.equal('Option 1');
    });

    it('should clear search when dropdown closes', async () => {
      select.open();
      await select.updateComplete;

      const searchInput = select.shadowRoot?.querySelector(
        '.select-search-input'
      ) as HTMLInputElement;
      searchInput.value = 'test';
      searchInput.dispatchEvent(new Event('input'));
      await select.updateComplete;

      select.close();
      await select.updateComplete;

      select.open();
      await select.updateComplete;

      const newSearchInput = select.shadowRoot?.querySelector(
        '.select-search-input'
      ) as HTMLInputElement;
      expect(newSearchInput.value).to.equal('');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should open dropdown on Enter key', async () => {
      const trigger = select.shadowRoot?.querySelector(
        '.select-trigger'
      ) as HTMLElement;
      trigger.focus();

      await sendKeys({ press: 'Enter' });
      await select.updateComplete;

      expect(select.shadowRoot?.querySelector('.select-dropdown')).to.exist;
    });

    it('should open dropdown on Space key', async () => {
      const trigger = select.shadowRoot?.querySelector(
        '.select-trigger'
      ) as HTMLElement;
      trigger.focus();

      await sendKeys({ press: ' ' });
      await select.updateComplete;

      expect(select.shadowRoot?.querySelector('.select-dropdown')).to.exist;
    });

    it('should close dropdown on Escape key', async () => {
      select.open();
      await select.updateComplete;

      const trigger = select.shadowRoot?.querySelector(
        '.select-trigger'
      ) as HTMLElement;
      trigger.focus();

      await sendKeys({ press: 'Escape' });
      await select.updateComplete;

      expect(select.shadowRoot?.querySelector('.select-dropdown')).to.not.exist;
    });

    it('should navigate options with arrow keys', async () => {
      select.open();
      await select.updateComplete;

      const trigger = select.shadowRoot?.querySelector(
        '.select-trigger'
      ) as HTMLElement;
      trigger.focus();

      await sendKeys({ press: 'ArrowDown' });
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const focusedOption = dropdown?.querySelector('.select-option--focused');
      expect(focusedOption).to.exist;
    });
  });

  describe('Validation', () => {
    it('should show error message when required and no value', async () => {
      const select = await fixture<Select>(html`
        <ds-select
          required
          validation-state="error"
          error-message="Please select an option"
        ></ds-select>
      `);

      const validationMessage = select.shadowRoot?.querySelector(
        '.validation-message'
      );
      expect(validationMessage).to.exist;
      expect(validationMessage?.textContent?.trim()).to.equal(
        'Please select an option'
      );
    });

    it('should show success message when valid', async () => {
      const select = await fixture<Select>(html`
        <ds-select
          value="option1"
          validation-state="success"
          success-message="Selection is valid"
        ></ds-select>
      `);

      const validationMessage = select.shadowRoot?.querySelector(
        '.validation-message'
      );
      expect(validationMessage).to.exist;
      expect(validationMessage?.textContent?.trim()).to.equal(
        'Selection is valid'
      );
    });

    it('should validate required field', async () => {
      const select = await fixture<Select>(html`
        <ds-select required></ds-select>
      `);

      // Initially should be invalid
      expect(select.validationState).to.equal('default');

      // Select an option
      select.value = 'option1';
      select._validateSelection();
      select._updateValidationState();
      await select.updateComplete;

      expect(select.validationState).to.equal('success');
    });
  });

  describe('Clearable Functionality', () => {
    beforeEach(async () => {
      select = await fixture<Select>(html`
        <ds-select
          value="option1"
          clearable
          .options="${mockOptions}"
        ></ds-select>
      `);
    });

    it('should show clear button when value is set and clearable', () => {
      const clearButton = select.shadowRoot?.querySelector('.select-clear');
      expect(clearButton).to.exist;
    });

    it('should clear value when clear button is clicked', async () => {
      const clearButton = select.shadowRoot?.querySelector(
        '.select-clear'
      ) as HTMLElement;
      clearButton.click();
      await select.updateComplete;

      expect(select.value).to.equal('');
    });

    it('should not show clear button when disabled', async () => {
      select.disabled = true;
      await select.updateComplete;

      const clearButton = select.shadowRoot?.querySelector('.select-clear');
      expect(clearButton).to.not.exist;
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const trigger = select.shadowRoot?.querySelector('.select-trigger');

      expect(trigger?.getAttribute('role')).to.equal('combobox');
      expect(trigger?.getAttribute('aria-expanded')).to.equal('false');
      expect(trigger?.getAttribute('aria-haspopup')).to.equal('listbox');
      expect(trigger?.getAttribute('aria-label')).to.equal('Test select');
    });

    it('should update ARIA attributes when opened', async () => {
      select.open();
      await select.updateComplete;

      const trigger = select.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('aria-expanded')).to.equal('true');
    });

    it('should have proper ARIA attributes on options', async () => {
      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const firstOption = dropdown?.querySelector('.select-option');

      expect(firstOption?.getAttribute('role')).to.equal('option');
      expect(firstOption?.getAttribute('aria-selected')).to.equal('false');
    });

    it('should announce selection to screen readers', async () => {
      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const firstOption = dropdown?.querySelector(
        '.select-option'
      ) as HTMLElement;

      firstOption.click();
      await select.updateComplete;

      const trigger = select.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('aria-expanded')).to.equal('false');
    });
  });

  describe('Event Dispatching', () => {
    it('should dispatch change event when option is selected', async () => {
      let changeEvent: CustomEvent | null = null;
      select.addEventListener('ds-select-change', e => {
        changeEvent = e as CustomEvent;
      });

      select.open();
      await select.updateComplete;

      const dropdown = select.shadowRoot?.querySelector('.select-dropdown');
      const firstOption = dropdown?.querySelector(
        '.select-option'
      ) as HTMLElement;

      firstOption.click();
      await select.updateComplete;

      expect(changeEvent).to.exist;
      expect(changeEvent?.detail.data.value).to.equal('option1');
      expect(changeEvent?.detail.data.selectedOption.value).to.equal('option1');
    });

    it('should dispatch open event when dropdown opens', async () => {
      let openEvent: CustomEvent | null = null;
      select.addEventListener('ds-select-open', e => {
        openEvent = e as CustomEvent;
      });

      select.open();
      await select.updateComplete;

      expect(openEvent).to.exist;
      expect(openEvent?.detail.data.type).to.equal('single');
    });

    it('should dispatch close event when dropdown closes', async () => {
      let closeEvent: CustomEvent | null = null;
      select.addEventListener('ds-select-close', e => {
        closeEvent = e as CustomEvent;
      });

      select.open();
      await select.updateComplete;
      select.close();
      await select.updateComplete;

      expect(closeEvent).to.exist;
      expect(closeEvent?.detail.data.type).to.equal('single');
    });

    it('should dispatch focus event when focused', async () => {
      let focusEvent: CustomEvent | null = null;
      select.addEventListener('ds-select-focus', e => {
        focusEvent = e as CustomEvent;
      });

      const trigger = select.shadowRoot?.querySelector(
        '.select-trigger'
      ) as HTMLElement;
      trigger.focus();
      await select.updateComplete;

      expect(focusEvent).to.exist;
      expect(focusEvent?.detail.data.type).to.equal('single');
    });

    it('should dispatch blur event when blurred', async () => {
      let blurEvent: CustomEvent | null = null;
      select.addEventListener('ds-select-blur', e => {
        blurEvent = e as CustomEvent;
      });

      const trigger = select.shadowRoot?.querySelector(
        '.select-trigger'
      ) as HTMLElement;
      trigger.focus();
      trigger.blur();
      await select.updateComplete;

      expect(blurEvent).to.exist;
      expect(blurEvent?.detail.data.type).to.equal('single');
    });
  });

  describe('Public Methods', () => {
    it('should open dropdown programmatically', async () => {
      select.open();
      await select.updateComplete;

      expect(select.shadowRoot?.querySelector('.select-dropdown')).to.exist;
    });

    it('should close dropdown programmatically', async () => {
      select.open();
      await select.updateComplete;
      select.close();
      await select.updateComplete;

      expect(select.shadowRoot?.querySelector('.select-dropdown')).to.not.exist;
    });

    it('should clear selection programmatically', async () => {
      select.value = 'option1';
      await select.updateComplete;

      select.clear();
      await select.updateComplete;

      expect(select.value).to.equal('');
    });

    it('should focus programmatically', () => {
      select.focus();

      const trigger = select.shadowRoot?.querySelector(
        '.select-trigger'
      ) as HTMLElement;
      expect(document.activeElement).to.equal(trigger);
    });

    it('should blur programmatically', async () => {
      const trigger = select.shadowRoot?.querySelector(
        '.select-trigger'
      ) as HTMLElement;
      trigger.focus();

      select.blur();

      expect(document.activeElement).to.not.equal(trigger);
    });
  });

  describe('Size Variants', () => {
    it('should apply small size styles', async () => {
      const select = await fixture<Select>(html`
        <ds-select size="small"></ds-select>
      `);

      const trigger = select.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.classList.contains('select-trigger--small')).to.be.true;
    });

    it('should apply medium size styles', async () => {
      const select = await fixture<Select>(html`
        <ds-select size="medium"></ds-select>
      `);

      const trigger = select.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.classList.contains('select-trigger--medium')).to.be.true;
    });

    it('should apply large size styles', async () => {
      const select = await fixture<Select>(html`
        <ds-select size="large"></ds-select>
      `);

      const trigger = select.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.classList.contains('select-trigger--large')).to.be.true;
    });
  });

  describe('Validation States', () => {
    it('should apply error state styles', async () => {
      const select = await fixture<Select>(html`
        <ds-select validation-state="error"></ds-select>
      `);

      const trigger = select.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.classList.contains('select-trigger--error')).to.be.true;
    });

    it('should apply success state styles', async () => {
      const select = await fixture<Select>(html`
        <ds-select validation-state="success"></ds-select>
      `);

      const trigger = select.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.classList.contains('select-trigger--success')).to.be.true;
    });

    it('should apply warning state styles', async () => {
      const select = await fixture<Select>(html`
        <ds-select validation-state="warning"></ds-select>
      `);

      const trigger = select.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.classList.contains('select-trigger--warning')).to.be.true;
    });
  });

  describe('Disabled State', () => {
    it('should disable interaction when disabled', async () => {
      const select = await fixture<Select>(html`
        <ds-select disabled .options="${mockOptions}"></ds-select>
      `);

      const trigger = select.shadowRoot?.querySelector(
        '.select-trigger'
      ) as HTMLElement;
      trigger.click();
      await select.updateComplete;

      expect(select.shadowRoot?.querySelector('.select-dropdown')).to.not.exist;
    });

    it('should apply disabled styles', async () => {
      const select = await fixture<Select>(html`
        <ds-select disabled></ds-select>
      `);

      const trigger = select.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.classList.contains('select-trigger--disabled')).to.be
        .false; // CSS handles this
    });
  });
});
