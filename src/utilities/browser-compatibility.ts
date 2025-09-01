/**
 * Browser Compatibility Utilities
 *
 * Provides feature detection, polyfill management, and browser-specific
 * optimizations for the design system.
 */

export interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  isModern: boolean;
  supportsCSSVars: boolean;
  supportsColorMix: boolean;
  supportsGrid: boolean;
  supportsFlexbox: boolean;
  supportsWebComponents: boolean;
  supportsShadowDOM: boolean;
  supportsES6: boolean;
  requiresPolyfills: boolean;
}

export interface FeatureSupport {
  cssCustomProperties: boolean;
  colorMix: boolean;
  cssGrid: boolean;
  cssFlexbox: boolean;
  webComponents: boolean;
  shadowDOM: boolean;
  es6: boolean;
  promises: boolean;
  asyncAwait: boolean;
  modules: boolean;
  intersectionObserver: boolean;
  resizeObserver: boolean;
  performanceAPI: boolean;
}

/**
 * Detect browser information from user agent
 */
export function detectBrowser(): BrowserInfo {
  const userAgent = navigator.userAgent;
  let name = 'unknown';
  let version = '0';
  let engine = 'unknown';

  // Chrome/Chromium
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    name = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+)/);
    version = match?.[1] ?? '0';
    engine = 'Blink';
  }
  // Firefox
  else if (userAgent.includes('Firefox')) {
    name = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+)/);
    version = match?.[1] ?? '0';
    engine = 'Gecko';
  }
  // Safari
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    name = 'Safari';
    const match = userAgent.match(/Version\/(\d+)/);
    version = match?.[1] ?? '0';
    engine = 'WebKit';
  }
  // Edge (Chromium-based)
  else if (userAgent.includes('Edg')) {
    name = 'Edge';
    const match = userAgent.match(/Edg\/(\d+)/);
    version = match?.[1] ?? '0';
    engine = 'Blink';
  }
  // Internet Explorer
  else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    name = 'Internet Explorer';
    const match = userAgent.match(/(?:MSIE |rv:)(\d+)/);
    version = match?.[1] ?? '11';
    engine = 'Trident';
  }

  const versionNum = parseInt(version, 10);
  const isModern = versionNum >= getModernVersionThreshold(name);

  return {
    name,
    version,
    engine,
    isModern,
    supportsCSSVars: detectCSSVarsSupport(),
    supportsColorMix: detectColorMixSupport(),
    supportsGrid: detectGridSupport(),
    supportsFlexbox: detectFlexboxSupport(),
    supportsWebComponents: detectWebComponentsSupport(),
    supportsShadowDOM: detectShadowDOMSupport(),
    supportsES6: detectES6Support(),
    requiresPolyfills:
      !isModern || !detectES6Support() || !detectWebComponentsSupport(),
  };
}

/**
 * Get the minimum version threshold for modern browsers
 */
function getModernVersionThreshold(browserName: string): number {
  const thresholds: Record<string, number> = {
    Chrome: 88,
    Firefox: 78,
    Safari: 14,
    Edge: 88,
    'Internet Explorer': 12, // IE11 is the latest, but we consider it legacy
  };
  return thresholds[browserName] || 0;
}

/**
 * Detect CSS custom properties support
 */
export function detectCSSVarsSupport(): boolean {
  return CSS.supports('--custom-property', 'value');
}

/**
 * Detect CSS color-mix() function support
 */
export function detectColorMixSupport(): boolean {
  return CSS.supports('color', 'color-mix(in srgb, red, blue)');
}

/**
 * Detect CSS Grid support
 */
export function detectGridSupport(): boolean {
  return CSS.supports('display', 'grid');
}

/**
 * Detect CSS Flexbox support
 */
export function detectFlexboxSupport(): boolean {
  return CSS.supports('display', 'flex');
}

/**
 * Detect Web Components support
 */
export function detectWebComponentsSupport(): boolean {
  return 'customElements' in window;
}

/**
 * Detect Shadow DOM support
 */
export function detectShadowDOMSupport(): boolean {
  return 'attachShadow' in Element.prototype;
}

/**
 * Detect ES6+ features support
 */
export function detectES6Support(): boolean {
  return (
    typeof Promise !== 'undefined' &&
    typeof Symbol !== 'undefined' &&
    typeof Map !== 'undefined' &&
    typeof Set !== 'undefined' &&
    typeof Array.from === 'function' &&
    typeof Object.assign === 'function'
  );
}

/**
 * Get comprehensive feature support information
 */
export function getFeatureSupport(): FeatureSupport {
  return {
    cssCustomProperties: detectCSSVarsSupport(),
    colorMix: detectColorMixSupport(),
    cssGrid: detectGridSupport(),
    cssFlexbox: detectFlexboxSupport(),
    webComponents: detectWebComponentsSupport(),
    shadowDOM: detectShadowDOMSupport(),
    es6: detectES6Support(),
    promises: typeof Promise !== 'undefined',
    asyncAwait: typeof async function () {} === 'function',
    modules: true, // ES modules are supported in our build environment
    intersectionObserver: 'IntersectionObserver' in window,
    resizeObserver: 'ResizeObserver' in window,
    performanceAPI: 'performance' in window,
  };
}

/**
 * Check if polyfills are required
 */
export function requiresPolyfills(): boolean {
  const browser = detectBrowser();
  return browser.requiresPolyfills;
}

/**
 * Get recommended polyfills for the current browser
 */
export function getRecommendedPolyfills(): string[] {
  const polyfills: string[] = [];
  const features = getFeatureSupport();

  if (!features.es6) {
    polyfills.push('core-js/stable');
    polyfills.push('regenerator-runtime/runtime');
  }

  if (!features.webComponents) {
    polyfills.push('@webcomponents/webcomponentsjs/webcomponents-loader.js');
  }

  if (!features.promises) {
    polyfills.push('core-js/features/promise');
  }

  if (!features.intersectionObserver) {
    polyfills.push('intersection-observer');
  }

  if (!features.resizeObserver) {
    polyfills.push('resize-observer-polyfill');
  }

  return polyfills;
}

/**
 * Apply CSS fallbacks for unsupported features
 */
export function applyCSSFallbacks(): void {
  const features = getFeatureSupport();
  const root = document.documentElement;

  // Add CSS classes for feature detection
  if (features.cssCustomProperties) {
    root.classList.add('supports-css-vars');
  } else {
    root.classList.add('no-css-vars');
  }

  if (features.colorMix) {
    root.classList.add('supports-color-mix');
  } else {
    root.classList.add('no-color-mix');
  }

  if (features.cssGrid) {
    root.classList.add('supports-grid');
  } else {
    root.classList.add('no-grid');
  }

  if (features.cssFlexbox) {
    root.classList.add('supports-flexbox');
  } else {
    root.classList.add('no-flexbox');
  }

  if (features.webComponents) {
    root.classList.add('supports-web-components');
  } else {
    root.classList.add('no-web-components');
  }
}

/**
 * Load polyfills dynamically
 */
export async function loadPolyfills(): Promise<void> {
  const polyfills = getRecommendedPolyfills();

  for (const polyfill of polyfills) {
    try {
      await import(polyfill);
    } catch (error) {
      console.warn(`Failed to load polyfill: ${polyfill}`, error);
    }
  }
}

/**
 * Get browser-specific optimizations
 */
export function getBrowserOptimizations(): Record<string, any> {
  const browser = detectBrowser();
  const optimizations: Record<string, any> = {};

  // IE11 specific optimizations
  if (browser.name === 'Internet Explorer') {
    optimizations['useLegacyBuild'] = true;
    optimizations['enablePolyfills'] = true;
    optimizations['disableAdvancedFeatures'] = true;
  }

  // Safari specific optimizations
  if (browser.name === 'Safari') {
    optimizations['enableWebkitPrefixes'] = true;
    optimizations['useTransform3d'] = true; // Force hardware acceleration
  }

  // Firefox specific optimizations
  if (browser.name === 'Firefox') {
    optimizations['enableMozPrefixes'] = true;
  }

  return optimizations;
}

/**
 * Check if the current environment supports all required features
 */
export function checkCompatibility(): {
  compatible: boolean;
  issues: string[];
  recommendations: string[];
} {
  const browser = detectBrowser();
  const features = getFeatureSupport();
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check critical features
  if (!features.webComponents) {
    issues.push('Web Components not supported');
    recommendations.push('Load Web Components polyfill');
  }

  if (!features.cssCustomProperties) {
    issues.push('CSS Custom Properties not supported');
    recommendations.push('Use PostCSS fallbacks');
  }

  if (!features.es6) {
    issues.push('ES6+ features not supported');
    recommendations.push('Load core-js polyfills');
  }

  // Check browser version
  if (!browser.isModern) {
    issues.push(
      `Browser version ${browser.version} is below recommended minimum`
    );
    recommendations.push(
      `Upgrade to ${browser.name} ${getModernVersionThreshold(browser.name)}+`
    );
  }

  const compatible = issues.length === 0;

  return {
    compatible,
    issues,
    recommendations,
  };
}

/**
 * Initialize browser compatibility system
 */
export function initializeCompatibility(): void {
  // Apply CSS fallbacks
  applyCSSFallbacks();

  // Check compatibility
  const compatibility = checkCompatibility();

  if (!compatibility.compatible) {
    console.warn(
      'Browser compatibility issues detected:',
      compatibility.issues
    );
    console.info('Recommendations:', compatibility.recommendations);
  }

  // Load polyfills if needed
  if (requiresPolyfills()) {
    loadPolyfills().catch(error => {
      console.error('Failed to load polyfills:', error);
    });
  }
}

/**
 * Get browser information for analytics
 */
export function getAnalyticsData(): Record<string, any> {
  const browser = detectBrowser();
  const features = getFeatureSupport();

  return {
    browser: {
      name: browser.name,
      version: browser.version,
      engine: browser.engine,
      isModern: browser.isModern,
    },
    features: features,
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    windowSize: `${window.innerWidth}x${window.innerHeight}`,
    timestamp: new Date().toISOString(),
  };
}
