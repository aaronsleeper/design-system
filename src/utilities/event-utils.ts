/**
 * Utility functions for event handling and optimization.
 */

/**
 * Debounces a function call.
 * Useful for optimizing frequent events like input changes.
 * 
 * @param func - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
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
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
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
 * Creates an event listener with automatic cleanup.
 * 
 * @param target - The target element to listen to
 * @param eventName - The event name to listen for
 * @param handler - The event handler function
 * @param options - Event listener options
 * @returns A function to remove the event listener
 */
export function createEventListener(
  target: EventTarget,
  eventName: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): () => void {
  target.addEventListener(eventName, handler, options);
  
  return () => {
    target.removeEventListener(eventName, handler, options);
  };
}

/**
 * Waits for a specific event to occur.
 * 
 * @param target - The target element to listen to
 * @param eventName - The event name to wait for
 * @param timeout - Timeout in milliseconds (default: 5000)
 * @returns A promise that resolves with the event
 */
export function waitForEvent(
  target: EventTarget,
  eventName: string,
  timeout: number = 5000
): Promise<Event> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Timeout waiting for event: ${eventName}`));
    }, timeout);

    const handler = (event: Event) => {
      clearTimeout(timeoutId);
      resolve(event);
    };

    target.addEventListener(eventName, handler, { once: true });
  });
}

/**
 * Dispatches a custom event with standardized payload.
 * 
 * @param target - The target element to dispatch the event on
 * @param eventName - The name of the event
 * @param data - Event-specific data
 * @param originalEvent - Original DOM event (optional)
 */
export function dispatchDesignSystemEvent(
  target: EventTarget,
  eventName: string,
  data: Record<string, any>,
  originalEvent?: Event
): void {
  const payload = {
    component: eventName.split('-')[1], // Extract component name from event name
    timestamp: Date.now(),
    instanceId: `ds-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    data,
    originalEvent,
  };

  const customEvent = new CustomEvent(eventName, {
    detail: payload,
    bubbles: true,
    composed: true,
  });

  target.dispatchEvent(customEvent);
}

/**
 * Creates an event bus for cross-component communication.
 */
export class EventBus {
  private listeners = new Map<string, Set<Function>>();

  /**
   * Registers an event listener.
   * 
   * @param eventName - The event name to listen for
   * @param callback - The callback function
   */
  on(eventName: string, callback: Function): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(callback);
  }

  /**
   * Removes an event listener.
   * 
   * @param eventName - The event name
   * @param callback - The callback function to remove
   */
  off(eventName: string, callback: Function): void {
    const callbacks = this.listeners.get(eventName);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  /**
   * Emits an event to all registered listeners.
   * 
   * @param eventName - The event name
   * @param data - The event data
   */
  emit(eventName: string, data: any): void {
    const callbacks = this.listeners.get(eventName);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  /**
   * Removes all listeners for a specific event.
   * 
   * @param eventName - The event name
   */
  removeAllListeners(eventName: string): void {
    this.listeners.delete(eventName);
  }

  /**
   * Removes all event listeners.
   */
  clear(): void {
    this.listeners.clear();
  }
}

/**
 * Global event bus instance for cross-component communication.
 */
export const globalEventBus = new EventBus();

/**
 * Announces a message to screen readers.
 * 
 * @param message - The message to announce
 * @param priority - The announcement priority ('polite' or 'assertive')
 */
export function announceToScreenReader(
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
 * Checks if an element is currently focused.
 * 
 * @param element - The element to check
 * @returns True if the element is focused
 */
export function isElementFocused(element: Element): boolean {
  return element === document.activeElement || element.contains(document.activeElement);
}

/**
 * Checks if an element is currently visible in the viewport.
 * 
 * @param element - The element to check
 * @returns True if the element is visible
 */
export function isElementVisible(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Validates that a value is within a specified range.
 * 
 * @param value - The value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param defaultValue - Default value if validation fails
 * @returns The validated value or default value
 */
export function validateRange(
  value: number,
  min: number,
  max: number,
  defaultValue: number
): number {
  if (value >= min && value <= max) {
    return value;
  }
  
  console.warn(
    `Value ${value} is outside valid range [${min}, ${max}]. Using default value ${defaultValue}.`
  );
  
  return defaultValue;
}

/**
 * Validates that a value is one of the allowed values.
 * 
 * @param value - The value to validate
 * @param allowedValues - Array of allowed values
 * @param defaultValue - Default value if validation fails
 * @returns The validated value or default value
 */
export function validateEnum<T>(
  value: T,
  allowedValues: readonly T[],
  defaultValue: T
): T {
  if (allowedValues.includes(value)) {
    return value;
  }
  
  console.warn(
    `Value ${value} is not allowed. Allowed values: ${allowedValues.join(', ')}. Using default value ${defaultValue}.`
  );
  
  return defaultValue;
}
