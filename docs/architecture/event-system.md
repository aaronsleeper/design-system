# Event System Standards

This document defines the event system standards for the Lit-based design system, including custom event naming conventions, payload structures, and component communication patterns.

## Overview

The design system uses a standardized event system to ensure consistent communication between components and with external applications. All custom events follow specific naming conventions and payload structures.

## Event Naming Conventions

### Format: `ds-[component]-[action]`

All custom events follow the pattern: `ds-[component]-[action]`

- **Prefix**: `ds-` (design system)
- **Component**: Component name in kebab-case
- **Action**: Action being performed in kebab-case

### Examples

```typescript
// Button events
'ds-button-click'
'ds-button-focus'
'ds-button-blur'

// Input events
'ds-input-change'
'ds-input-focus'
'ds-input-blur'
'ds-input-invalid'

// Select events
'ds-select-change'
'ds-select-open'
'ds-select-close'

// Modal events
'ds-modal-open'
'ds-modal-close'
'ds-modal-backdrop-click'

// Toast events
'ds-toast-show'
'ds-toast-hide'
'ds-toast-dismiss'
```

## Event Payload Structure

### Standard Payload Interface

All custom events include a standardized payload structure:

```typescript
interface DesignSystemEventPayload {
  // Component identifier
  component: string;
  
  // Event timestamp
  timestamp: number;
  
  // Component instance ID (for debugging)
  instanceId: string;
  
  // Event-specific data
  data: Record<string, any>;
  
  // Original DOM event (if applicable)
  originalEvent?: Event;
}
```

### Component-Specific Payloads

Each component defines specific payload structures for its events:

#### Button Events

```typescript
interface ButtonClickPayload extends DesignSystemEventPayload {
  component: 'button';
  data: {
    disabled: boolean;
    variant: 'primary' | 'secondary' | 'tertiary' | 'danger';
    size: 'small' | 'medium' | 'large';
    pressed: boolean;
  };
  originalEvent: MouseEvent;
}

interface ButtonFocusPayload extends DesignSystemEventPayload {
  component: 'button';
  data: {
    disabled: boolean;
    variant: string;
    size: string;
  };
  originalEvent: FocusEvent;
}
```

#### Input Events

```typescript
interface InputChangePayload extends DesignSystemEventPayload {
  component: 'input';
  data: {
    value: string;
    type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    placeholder: string;
    required: boolean;
    disabled: boolean;
    valid: boolean;
    validationMessage: string;
  };
  originalEvent: InputEvent;
}

interface InputInvalidPayload extends DesignSystemEventPayload {
  component: 'input';
  data: {
    value: string;
    type: string;
    validationMessage: string;
    validityState: ValidityState;
  };
  originalEvent: Event;
}
```

#### Select Events

```typescript
interface SelectChangePayload extends DesignSystemEventPayload {
  component: 'select';
  data: {
    value: string;
    selectedOption: {
      value: string;
      label: string;
      disabled: boolean;
    };
    options: Array<{
      value: string;
      label: string;
      disabled: boolean;
    }>;
    required: boolean;
    disabled: boolean;
  };
  originalEvent: Event;
}
```

#### Modal Events

```typescript
interface ModalOpenPayload extends DesignSystemEventPayload {
  component: 'modal';
  data: {
    title: string;
    closable: boolean;
    backdrop: boolean;
    size: 'small' | 'medium' | 'large' | 'full';
  };
}

interface ModalClosePayload extends DesignSystemEventPayload {
  component: 'modal';
  data: {
    reason: 'backdrop' | 'close-button' | 'escape' | 'programmatic';
    title: string;
  };
}
```

## Event Dispatching

### Standard Event Dispatching Method

All components use a standardized method for dispatching custom events:

```typescript
import { LitElement } from 'lit';

export class DesignSystemElement extends LitElement {
  protected dispatchDesignSystemEvent(
    action: string,
    data: Record<string, any>,
    originalEvent?: Event
  ): void {
    const eventName = `ds-${this.tagName.toLowerCase().replace('ds-', '')}-${action}`;
    
    const payload: DesignSystemEventPayload = {
      component: this.tagName.toLowerCase().replace('ds-', ''),
      timestamp: Date.now(),
      instanceId: this._instanceId || this._generateInstanceId(),
      data,
      originalEvent,
    };

    const customEvent = new CustomEvent(eventName, {
      detail: payload,
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(customEvent);
  }

  private _instanceId?: string;
  private _generateInstanceId(): string {
    this._instanceId = `ds-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return this._instanceId;
  }
}
```

### Component Implementation Example

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DesignSystemElement } from '../base/design-system-element.js';

@customElement('ds-button')
export class Button extends DesignSystemElement {
  @property({ type: String }) variant: 'primary' | 'secondary' | 'tertiary' | 'danger' = 'primary';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) disabled = false;

  private _handleClick(event: MouseEvent): void {
    if (this.disabled) return;

    this.dispatchDesignSystemEvent('click', {
      disabled: this.disabled,
      variant: this.variant,
      size: this.size,
      pressed: true,
    }, event);

    // Reset pressed state after a short delay
    setTimeout(() => {
      this.dispatchDesignSystemEvent('click', {
        disabled: this.disabled,
        variant: this.variant,
        size: this.size,
        pressed: false,
      });
    }, 150);
  }

  private _handleFocus(event: FocusEvent): void {
    this.dispatchDesignSystemEvent('focus', {
      disabled: this.disabled,
      variant: this.variant,
      size: this.size,
    }, event);
  }

  private _handleBlur(event: FocusEvent): void {
    this.dispatchDesignSystemEvent('blur', {
      disabled: this.disabled,
      variant: this.variant,
      size: this.size,
    }, event);
  }

  render() {
    return html`
      <button
        class="ds-button ds-button--${this.variant} ds-button--${this.size}"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
      >
        <slot></slot>
      </button>
    `;
  }
}
```

## Event Listening

### Standard Event Listening Pattern

Applications should listen for design system events using the standard pattern:

```typescript
// Listen for all design system events
document.addEventListener('ds-button-click', (event: CustomEvent) => {
  const { component, timestamp, instanceId, data, originalEvent } = event.detail;
  
  console.log(`Button clicked:`, {
    component,
    timestamp: new Date(timestamp),
    instanceId,
    data,
  });
});

// Listen for specific component events
const button = document.querySelector('ds-button');
button?.addEventListener('ds-button-click', (event: CustomEvent) => {
  const { data } = event.detail;
  
  if (data.variant === 'primary') {
    // Handle primary button click
  }
});
```

### Event Delegation

For dynamic content, use event delegation:

```typescript
// Listen for all button clicks in the document
document.addEventListener('ds-button-click', (event: CustomEvent) => {
  const { data } = event.detail;
  
  // Handle based on button variant
  switch (data.variant) {
    case 'primary':
      handlePrimaryAction();
      break;
    case 'danger':
      handleDangerAction();
      break;
    case 'secondary':
      handleSecondaryAction();
      break;
  }
});
```

## Component Communication Patterns

### Parent-Child Communication

Components communicate with their children through properties and events:

```typescript
// Parent component
@customElement('ds-form')
export class Form extends DesignSystemElement {
  @property({ type: Boolean }) disabled = false;

  private _handleInputChange(event: CustomEvent): void {
    const { data } = event.detail;
    
    // Validate form
    this.validateForm();
    
    // Dispatch form change event
    this.dispatchDesignSystemEvent('change', {
      formData: this.getFormData(),
      valid: this.isValid(),
    });
  }

  render() {
    return html`
      <form @ds-input-change=${this._handleInputChange}>
        <ds-input name="email" type="email" ?disabled=${this.disabled}></ds-input>
        <ds-input name="password" type="password" ?disabled=${this.disabled}></ds-input>
        <ds-button type="submit" ?disabled=${this.disabled}>Submit</ds-button>
      </form>
    `;
  }
}
```

### Sibling Communication

Siblings communicate through parent components or direct event dispatching:

```typescript
// Modal and backdrop communication
@customElement('ds-modal')
export class Modal extends DesignSystemElement {
  @property({ type: Boolean }) open = false;

  private _handleBackdropClick(): void {
    this.dispatchDesignSystemEvent('backdrop-click', {
      title: this.title,
    });
  }

  private _handleClose(): void {
    this.dispatchDesignSystemEvent('close', {
      reason: 'close-button',
      title: this.title,
    });
  }

  render() {
    return html`
      ${this.open ? html`
        <div class="ds-modal-backdrop" @click=${this._handleBackdropClick}>
          <div class="ds-modal">
            <header>
              <h2>${this.title}</h2>
              <ds-button variant="tertiary" @ds-button-click=${this._handleClose}>×</ds-button>
            </header>
            <div class="ds-modal-content">
              <slot></slot>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }
}
```

### Cross-Component Communication

For complex interactions, use a centralized event bus:

```typescript
// Event bus for cross-component communication
class DesignSystemEventBus {
  private listeners = new Map<string, Set<Function>>();

  on(eventName: string, callback: Function): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(callback);
  }

  off(eventName: string, callback: Function): void {
    const callbacks = this.listeners.get(eventName);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  emit(eventName: string, data: any): void {
    const callbacks = this.listeners.get(eventName);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

// Global event bus instance
export const eventBus = new DesignSystemEventBus();

// Usage in components
@customElement('ds-sidebar')
export class Sidebar extends DesignSystemElement {
  connectedCallback(): void {
    super.connectedCallback();
    
    // Listen for navigation events
    eventBus.on('navigation-change', (data) => {
      this.updateActiveItem(data.activeItem);
    });
  }

  private _handleItemClick(item: string): void {
    // Emit navigation change event
    eventBus.emit('navigation-change', { activeItem: item });
    
    // Dispatch local event
    this.dispatchDesignSystemEvent('item-click', { item });
  }
}
```

## Event Testing

### Unit Testing Events

Test event dispatching in component unit tests:

```typescript
import { fixture, expect, oneEvent } from '@open-wc/testing';
import { Button } from '../button.js';

describe('Button', () => {
  it('dispatches click event with correct payload', async () => {
    const button = await fixture<Button>(html`<ds-button>Click me</ds-button>`);
    
    setTimeout(() => button.click());
    
    const { detail } = await oneEvent(button, 'ds-button-click');
    
    expect(detail.component).to.equal('button');
    expect(detail.data.variant).to.equal('primary');
    expect(detail.data.size).to.equal('medium');
    expect(detail.data.disabled).to.equal(false);
    expect(detail.originalEvent).to.be.instanceOf(MouseEvent);
  });
});
```

### Integration Testing

Test component communication in integration tests:

```typescript
import { fixture, expect, oneEvent } from '@open-wc/testing';
import { Form } from '../form.js';
import { Input } from '../input.js';

describe('Form Integration', () => {
  it('dispatches form change event when input changes', async () => {
    const form = await fixture<Form>(html`
      <ds-form>
        <ds-input name="email" type="email"></ds-input>
      </ds-form>
    `);
    
    const input = form.querySelector('ds-input') as Input;
    input.value = 'test@example.com';
    input.dispatchEvent(new Event('input'));
    
    const { detail } = await oneEvent(form, 'ds-form-change');
    
    expect(detail.data.formData.email).to.equal('test@example.com');
  });
});
```

## Performance Considerations

### Event Optimization

- **Debouncing**: Debounce frequent events like input changes
- **Throttling**: Throttle scroll and resize events
- **Event delegation**: Use event delegation for dynamic content
- **Memory management**: Remove event listeners in disconnectedCallback

### Example: Debounced Input Events

```typescript
import { debounce } from '../utilities/debounce.js';

@customElement('ds-input')
export class Input extends DesignSystemElement {
  private _debouncedChange = debounce((value: string) => {
    this.dispatchDesignSystemEvent('change', {
      value,
      type: this.type,
      placeholder: this.placeholder,
      required: this.required,
      disabled: this.disabled,
      valid: this.validity.valid,
      validationMessage: this.validationMessage,
    });
  }, 300);

  private _handleInput(event: InputEvent): void {
    const value = (event.target as HTMLInputElement).value;
    this._debouncedChange(value);
  }
}
```

## Accessibility Considerations

### ARIA Event Integration

Events should support accessibility features:

```typescript
interface AccessibleEventPayload extends DesignSystemEventPayload {
  accessibility: {
    ariaLabel?: string;
    ariaDescribedBy?: string;
    role?: string;
    liveRegion?: string;
  };
}

// Example: Toast events with accessibility
interface ToastShowPayload extends AccessibleEventPayload {
  component: 'toast';
  data: {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration: number;
  };
  accessibility: {
    ariaLabel: string;
    liveRegion: 'polite' | 'assertive';
  };
}
```

### Screen Reader Support

Events should provide information for screen readers:

```typescript
// Announce events to screen readers
private _announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Usage in components
private _handleSuccess(): void {
  this.dispatchDesignSystemEvent('success', { message: 'Operation completed' });
  this._announceToScreenReader('Operation completed successfully');
}
```

## Migration Guide

### From Native Events

When migrating from native DOM events to design system events:

```typescript
// Before: Native event
element.addEventListener('click', (event) => {
  console.log('Button clicked');
});

// After: Design system event
element.addEventListener('ds-button-click', (event: CustomEvent) => {
  const { data } = event.detail;
  console.log('Button clicked:', data);
});
```

### From Custom Events

When migrating from existing custom events:

```typescript
// Before: Custom event
element.addEventListener('buttonClick', (event) => {
  console.log(event.detail);
});

// After: Design system event
element.addEventListener('ds-button-click', (event: CustomEvent) => {
  const { data } = event.detail;
  console.log(data);
});
```

## Best Practices

### Event Naming

1. **Consistent naming**: Always use the `ds-[component]-[action]` pattern
2. **Descriptive actions**: Use clear, descriptive action names
3. **Kebab-case**: Use kebab-case for all event names
4. **Avoid abbreviations**: Use full words instead of abbreviations

### Payload Design

1. **Include essential data**: Include all necessary data in the payload
2. **Avoid circular references**: Don't include DOM elements in payloads
3. **Type safety**: Use TypeScript interfaces for payload types
4. **Backward compatibility**: Maintain backward compatibility when possible

### Event Handling

1. **Event delegation**: Use event delegation for dynamic content
2. **Memory management**: Remove event listeners when components are destroyed
3. **Error handling**: Handle errors gracefully in event handlers
4. **Performance**: Debounce or throttle frequent events

### Testing

1. **Unit tests**: Test event dispatching in component unit tests
2. **Integration tests**: Test component communication in integration tests
3. **Event mocking**: Mock events for testing complex interactions
4. **Accessibility testing**: Test events with screen readers

## Future Enhancements

### Planned Improvements

1. **Event validation**: Add runtime validation for event payloads
2. **Event logging**: Add comprehensive event logging for debugging
3. **Event analytics**: Add analytics tracking for user interactions
4. **Event replay**: Add ability to replay events for testing

### Monitoring

- **Event frequency**: Monitor event frequency to identify performance issues
- **Event errors**: Track event-related errors and failures
- **User interactions**: Analyze user interaction patterns
- **Accessibility usage**: Monitor accessibility feature usage

---

**Last Updated**: Task 4.1 completion
**Next Task**: Task 4.2 - Test CSS custom properties system
