/**
 * Performance Testing Configuration
 *
 * This module provides centralized configuration for all performance testing
 * utilities and defines performance targets, thresholds, and monitoring settings
 */

export interface PerformanceConfig {
  bundleSize: {
    limits: {
      esm: number;
      umd: number;
      css: number;
    };
    regressionThresholds: {
      esm: number;
      umd: number;
      css: number;
    };
  };
  runtime: {
    targets: {
      componentInitTime: {
        simple: number;
        complex: number;
      };
      eventResponseTime: {
        click: number;
        input: number;
        scroll: number;
      };
      memoryUsage: number;
    };
    regressionThresholds: {
      initTime: number;
      eventTime: number;
      memoryUsage: number;
    };
  };
  lighting: {
    targets: {
      shadowCalculation: number;
      positionUpdate: number;
      frameRate: number;
    };
    regressionThresholds: {
      calculationTime: number;
      updateTime: number;
      frameRate: number;
    };
  };
  webVitals: {
    targets: {
      CLS: number;
      FID: number;
      FCP: number;
      LCP: number;
      TTFB: number;
    };
    severityThresholds: {
      low: number;
      medium: number;
      high: number;
    };
  };
  monitoring: {
    interval: number;
    enabled: boolean;
    alertThresholds: {
      bundleSize: number;
      runtime: number;
      memory: number;
    };
  };
  testing: {
    sampleSize: number;
    timeout: number;
    retries: number;
    parallel: boolean;
  };
}

export const DEFAULT_PERFORMANCE_CONFIG: PerformanceConfig = {
  bundleSize: {
    limits: {
      esm: 20 * 1024, // 20KB
      umd: 25 * 1024, // 25KB
      css: 20 * 1024, // 20KB
    },
    regressionThresholds: {
      esm: 0.05, // 5% increase limit
      umd: 0.05, // 5% increase limit
      css: 0.05, // 5% increase limit
    },
  },
  runtime: {
    targets: {
      componentInitTime: {
        simple: 50, // 50ms for simple components
        complex: 100, // 100ms for complex components
      },
      eventResponseTime: {
        click: 16, // 16ms for 60fps
        input: 8, // 8ms for real-time feedback
        scroll: 16, // 16ms for smooth scrolling
      },
      memoryUsage: 10 * 1024 * 1024, // 10MB limit
    },
    regressionThresholds: {
      initTime: 0.1, // 10% increase limit
      eventTime: 0.1, // 10% increase limit
      memoryUsage: 0.2, // 20% increase limit
    },
  },
  lighting: {
    targets: {
      shadowCalculation: 5, // 5ms per calculation
      positionUpdate: 2, // 2ms per update
      frameRate: 60, // 60fps target
    },
    regressionThresholds: {
      calculationTime: 0.1, // 10% increase limit
      updateTime: 0.1, // 10% increase limit
      frameRate: 0.05, // 5% decrease limit
    },
  },
  webVitals: {
    targets: {
      CLS: 0.1, // Cumulative Layout Shift
      FID: 100, // First Input Delay (ms)
      FCP: 1800, // First Contentful Paint (ms)
      LCP: 2500, // Largest Contentful Paint (ms)
      TTFB: 800, // Time to First Byte (ms)
    },
    severityThresholds: {
      low: 1.1, // 10% over target
      medium: 1.5, // 50% over target
      high: 2.0, // 100% over target
    },
  },
  monitoring: {
    interval: 60000, // 1 minute
    enabled: true,
    alertThresholds: {
      bundleSize: 0.1, // 10% over limit
      runtime: 0.2, // 20% over limit
      memory: 0.3, // 30% over limit
    },
  },
  testing: {
    sampleSize: 10, // Number of samples for averaging
    timeout: 30000, // 30 second timeout
    retries: 3, // Number of retries on failure
    parallel: true, // Run tests in parallel
  },
};

export class PerformanceConfigManager {
  private config: PerformanceConfig;
  private listeners: Array<(config: PerformanceConfig) => void> = [];

  constructor(initialConfig?: Partial<PerformanceConfig>) {
    this.config = { ...DEFAULT_PERFORMANCE_CONFIG, ...initialConfig };
    this.loadFromStorage();
  }

  /**
   * Get current configuration
   */
  getConfig(): PerformanceConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<PerformanceConfig>): void {
    this.config = { ...this.config, ...updates };
    this.saveToStorage();
    this.notifyListeners();
  }

  /**
   * Get specific configuration section
   */
  getSection<K extends keyof PerformanceConfig>(
    section: K
  ): PerformanceConfig[K] {
    return this.config[section];
  }

  /**
   * Update specific configuration section
   */
  updateSection<K extends keyof PerformanceConfig>(
    section: K,
    updates: Partial<PerformanceConfig[K]>
  ): void {
    this.config[section] = { ...this.config[section], ...updates };
    this.saveToStorage();
    this.notifyListeners();
  }

  /**
   * Reset configuration to defaults
   */
  resetToDefaults(): void {
    this.config = { ...DEFAULT_PERFORMANCE_CONFIG };
    this.saveToStorage();
    this.notifyListeners();
  }

  /**
   * Add configuration change listener
   */
  addListener(listener: (config: PerformanceConfig) => void): void {
    this.listeners.push(listener);
  }

  /**
   * Remove configuration change listener
   */
  removeListener(listener: (config: PerformanceConfig) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Notify all listeners of configuration changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.config));
  }

  /**
   * Load configuration from localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('performance-config');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.config = { ...this.config, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load performance configuration:', error);
    }
  }

  /**
   * Save configuration to localStorage
   */
  private saveToStorage(): void {
    try {
      localStorage.setItem('performance-config', JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save performance configuration:', error);
    }
  }
}

/**
 * Component-specific performance targets
 */
export const COMPONENT_PERFORMANCE_TARGETS = {
  // Form Components
  'form/button-primary': {
    bundleSize: 5 * 1024,
    initTime: 100,
    eventTime: 16,
    memoryUsage: 1024,
  },
  'form/input-text': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 8,
    memoryUsage: 512,
  },
  'form/select': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 8,
    memoryUsage: 512,
  },
  'form/checkbox': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 8,
    memoryUsage: 512,
  },
  'form/radio': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 8,
    memoryUsage: 512,
  },
  'form/textarea': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 8,
    memoryUsage: 512,
  },
  'form/switch': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 8,
    memoryUsage: 512,
  },

  // Layout Components
  'layout/container': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 16,
    memoryUsage: 512,
  },
  'layout/grid': {
    bundleSize: 3 * 1024,
    initTime: 75,
    eventTime: 16,
    memoryUsage: 1024,
  },
  'layout/stack': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 16,
    memoryUsage: 512,
  },
  'layout/divider': {
    bundleSize: 1 * 1024,
    initTime: 25,
    eventTime: 16,
    memoryUsage: 256,
  },

  // Navigation Components
  'navigation/sidebar': {
    bundleSize: 5 * 1024,
    initTime: 150,
    eventTime: 16,
    memoryUsage: 2048,
  },
  'navigation/drawer': {
    bundleSize: 5 * 1024,
    initTime: 150,
    eventTime: 16,
    memoryUsage: 2048,
  },

  // Content Components
  'content/typography': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 16,
    memoryUsage: 512,
  },
  'content/card': {
    bundleSize: 3 * 1024,
    initTime: 75,
    eventTime: 16,
    memoryUsage: 1024,
  },
  'content/badge': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 16,
    memoryUsage: 512,
  },
  'content/avatar': {
    bundleSize: 2 * 1024,
    initTime: 50,
    eventTime: 16,
    memoryUsage: 512,
  },
  'content/breadcrumb': {
    bundleSize: 3 * 1024,
    initTime: 75,
    eventTime: 16,
    memoryUsage: 1024,
  },
  'content/pagination': {
    bundleSize: 4 * 1024,
    initTime: 100,
    eventTime: 16,
    memoryUsage: 1536,
  },

  // Feedback Components
  'feedback/alert': {
    bundleSize: 3 * 1024,
    initTime: 75,
    eventTime: 16,
    memoryUsage: 1024,
  },
  'feedback/toast': {
    bundleSize: 3 * 1024,
    initTime: 75,
    eventTime: 16,
    memoryUsage: 1024,
  },
  'feedback/modal': {
    bundleSize: 5 * 1024,
    initTime: 150,
    eventTime: 16,
    memoryUsage: 2048,
  },
  'feedback/tooltip': {
    bundleSize: 3 * 1024,
    initTime: 75,
    eventTime: 16,
    memoryUsage: 1024,
  },
} as const;

/**
 * Performance testing environment configuration
 */
export const PERFORMANCE_TEST_ENVIRONMENTS = {
  development: {
    name: 'Development',
    bundleSizeMultiplier: 1.0,
    runtimeMultiplier: 1.0,
    memoryMultiplier: 1.0,
    monitoringEnabled: true,
    alertThresholds: {
      bundleSize: 0.1,
      runtime: 0.2,
      memory: 0.3,
    },
  },
  staging: {
    name: 'Staging',
    bundleSizeMultiplier: 1.0,
    runtimeMultiplier: 1.0,
    memoryMultiplier: 1.0,
    monitoringEnabled: true,
    alertThresholds: {
      bundleSize: 0.05,
      runtime: 0.1,
      memory: 0.2,
    },
  },
  production: {
    name: 'Production',
    bundleSizeMultiplier: 1.0,
    runtimeMultiplier: 1.0,
    memoryMultiplier: 1.0,
    monitoringEnabled: true,
    alertThresholds: {
      bundleSize: 0.02,
      runtime: 0.05,
      memory: 0.1,
    },
  },
  testing: {
    name: 'Testing',
    bundleSizeMultiplier: 1.0,
    runtimeMultiplier: 1.0,
    memoryMultiplier: 1.0,
    monitoringEnabled: false,
    alertThresholds: {
      bundleSize: 0.2,
      runtime: 0.3,
      memory: 0.5,
    },
  },
} as const;

/**
 * Performance testing scenarios
 */
export const PERFORMANCE_TEST_SCENARIOS = {
  lightLoad: {
    name: 'Light Load',
    description: 'Minimal component usage',
    componentCount: 10,
    eventFrequency: 1,
    memoryPressure: 'low',
  },
  mediumLoad: {
    name: 'Medium Load',
    description: 'Typical application usage',
    componentCount: 50,
    eventFrequency: 5,
    memoryPressure: 'medium',
  },
  heavyLoad: {
    name: 'Heavy Load',
    description: 'High component usage',
    componentCount: 100,
    eventFrequency: 10,
    memoryPressure: 'high',
  },
  stressTest: {
    name: 'Stress Test',
    description: 'Maximum component usage',
    componentCount: 200,
    eventFrequency: 20,
    memoryPressure: 'extreme',
  },
} as const;

/**
 * Performance testing utilities
 */
export class PerformanceTestUtils {
  /**
   * Get current environment
   */
  static getCurrentEnvironment(): string {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
        return 'development';
      } else if (hostname.includes('staging')) {
        return 'staging';
      } else {
        return 'production';
      }
    }
    return 'testing';
  }

  /**
   * Get environment-specific configuration
   */
  static getEnvironmentConfig() {
    const env = this.getCurrentEnvironment();
    return PERFORMANCE_TEST_ENVIRONMENTS[
      env as keyof typeof PERFORMANCE_TEST_ENVIRONMENTS
    ];
  }

  /**
   * Check if performance testing is enabled
   */
  static isPerformanceTestingEnabled(): boolean {
    const env = this.getCurrentEnvironment();
    const envConfig =
      PERFORMANCE_TEST_ENVIRONMENTS[
        env as keyof typeof PERFORMANCE_TEST_ENVIRONMENTS
      ];
    return envConfig.monitoringEnabled;
  }

  /**
   * Get performance testing timeout
   */
  static getTestTimeout(): number {
    const config = DEFAULT_PERFORMANCE_CONFIG.testing;
    return config.timeout;
  }

  /**
   * Get performance testing sample size
   */
  static getSampleSize(): number {
    const config = DEFAULT_PERFORMANCE_CONFIG.testing;
    return config.sampleSize;
  }

  /**
   * Check if parallel testing is enabled
   */
  static isParallelTestingEnabled(): boolean {
    const config = DEFAULT_PERFORMANCE_CONFIG.testing;
    return config.parallel;
  }
}

// Export singleton configuration manager
export const performanceConfigManager = new PerformanceConfigManager();
