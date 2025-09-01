import { LitElement } from 'lit';

  /**
   * Standardized event payload interface for all design system events.
   */
  export interface DesignSystemEventPayload {
    // Component identifier
    component: string;
    
    // Event timestamp
    timestamp: number;
    
    // Component instance ID (for debugging)
    instanceId: string;
    
    // Event-specific data
    data: Record<string, any>;
    
    // Original DOM event (if applicable)
    originalEvent?: Event | undefined;
  }

/**
 * Base class for all design system components.
 * Provides standardized event dispatching and common functionality.
 */
export class DesignSystemElement extends LitElement {
  private _instanceId?: string;

  /**
   * Dispatches a standardized design system event.
   * 
   * @param action - The action being performed (e.g., 'click', 'change', 'focus')
   * @param data - Event-specific data
   * @param originalEvent - Original DOM event (optional)
   */
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

  /**
   * Generates a unique instance ID for this component.
   * Used for debugging and event tracking.
   */
  private _generateInstanceId(): string {
    this._instanceId = `ds-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return this._instanceId;
  }

  /**
   * Gets the current instance ID.
   */
  get instanceId(): string {
    return this._instanceId || this._generateInstanceId();
  }

  /**
   * Announces a message to screen readers.
   * Useful for accessibility announcements.
   * 
   * @param message - The message to announce
   * @param priority - The announcement priority ('polite' or 'assertive')
   */
  protected announceToScreenReader(
    message: string, 
    priority: 'polite' | 'assertive' = 'polite'
  ): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  /**
   * Debounces a function call.
   * Useful for optimizing frequent events like input changes.
   * 
   * @param func - The function to debounce
   * @param delay - The delay in milliseconds
   */
  protected debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  /**
   * Throttles a function call.
   * Useful for optimizing frequent events like scroll or resize.
   * 
   * @param func - The function to throttle
   * @param delay - The delay in milliseconds
   */
  protected throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let lastCall = 0;
    
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }

  /**
   * Validates that a property value is within a specified range.
   * 
   * @param value - The value to validate
   * @param min - Minimum allowed value
   * @param max - Maximum allowed value
   * @param defaultValue - Default value if validation fails
   */
  protected validateRange(
    value: number,
    min: number,
    max: number,
    defaultValue: number
  ): number {
    if (value >= min && value <= max) {
      return value;
    }
    
    console.warn(
      `${this.tagName}: Value ${value} is outside valid range [${min}, ${max}]. Using default value ${defaultValue}.`
    );
    
    return defaultValue;
  }

  /**
   * Validates that a property value is one of the allowed values.
   * 
   * @param value - The value to validate
   * @param allowedValues - Array of allowed values
   * @param defaultValue - Default value if validation fails
   */
  protected validateEnum<T>(
    value: T,
    allowedValues: readonly T[],
    defaultValue: T
  ): T {
    if (allowedValues.includes(value)) {
      return value;
    }
    
    console.warn(
      `${this.tagName}: Value ${value} is not allowed. Allowed values: ${allowedValues.join(', ')}. Using default value ${defaultValue}.`
    );
    
    return defaultValue;
  }

  /**
   * Gets a CSS custom property value with fallback.
   * 
   * @param propertyName - The CSS custom property name
   * @param fallback - Fallback value if property is not set
   */
  protected getCSSProperty(propertyName: string, fallback: string): string {
    return getComputedStyle(this).getPropertyValue(propertyName).trim() || fallback;
  }

  /**
   * Sets a CSS custom property value.
   * 
   * @param propertyName - The CSS custom property name
   * @param value - The value to set
   */
  protected setCSSProperty(propertyName: string, value: string): void {
    this.style.setProperty(propertyName, value);
  }

  /**
   * Checks if the component is currently focused.
   */
  protected isFocused(): boolean {
    return this === document.activeElement || this.contains(document.activeElement);
  }

  /**
   * Checks if the component is currently visible in the viewport.
   */
  protected isVisible(): boolean {
    const rect = this.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Gets the component's computed styles.
   */
  protected getComputedStyles(): CSSStyleDeclaration {
    return getComputedStyle(this);
  }

  /**
   * Checks if the component supports a specific feature.
   * 
   * @param feature - The feature to check
   */
  protected supportsFeature(feature: string): boolean {
    return CSS.supports(feature);
  }

  /**
   * Dispatches a custom event with the given name and detail.
   * This is a convenience method for simple custom events.
   * 
   * @param eventName - The name of the event
   * @param detail - The event detail
   */
  protected dispatchCustomEvent(eventName: string, detail?: any): void {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Lifecycle method called when the component is connected to the DOM.
   * Override this method to add custom initialization logic.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    
    // Generate instance ID if not already set
    if (!this._instanceId) {
      this._generateInstanceId();
    }
  }

  /**
   * Lifecycle method called when the component is disconnected from the DOM.
   * Override this method to add custom cleanup logic.
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    
    // Clean up any resources
    this._cleanup();
  }

  /**
   * Cleanup method for component resources.
   * Override this method to add custom cleanup logic.
   */
  protected _cleanup(): void {
    // Override in subclasses to add cleanup logic
  }
}
