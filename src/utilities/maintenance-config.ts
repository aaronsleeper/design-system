/**
 * Maintenance Configuration
 *
 * Centralized configuration for all maintenance activities including
 * thresholds, schedules, and monitoring settings.
 */

import { MaintenanceConfig } from './maintenance-utils';

/**
 * Production maintenance configuration
 */
export const productionMaintenanceConfig: MaintenanceConfig = {
  performance: {
    bundleSizeThreshold: 20, // KB
    loadTimeThreshold: 2000, // ms
    memoryThreshold: 100, // MB
    regressionThreshold: 5, // percentage
  },
  security: {
    vulnerabilityScanInterval: 24 * 60 * 60 * 1000, // 24 hours
    dependencyCheckInterval: 7 * 24 * 60 * 60 * 1000, // 7 days
    securityAuditInterval: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
  quality: {
    testCoverageThreshold: 80, // percentage
    codeQualityThreshold: 90, // percentage
    documentationCoverageThreshold: 95, // percentage
    accessibilityThreshold: 100, // percentage
  },
  monitoring: {
    healthCheckInterval: 60 * 1000, // 1 minute
    reportInterval: 24 * 60 * 60 * 1000, // 24 hours
    alertThreshold: 5, // number of critical issues
  },
};

/**
 * Development maintenance configuration
 */
export const developmentMaintenanceConfig: MaintenanceConfig = {
  performance: {
    bundleSizeThreshold: 25, // KB (more lenient for development)
    loadTimeThreshold: 3000, // ms
    memoryThreshold: 150, // MB
    regressionThreshold: 10, // percentage
  },
  security: {
    vulnerabilityScanInterval: 12 * 60 * 60 * 1000, // 12 hours (more frequent)
    dependencyCheckInterval: 3 * 24 * 60 * 60 * 1000, // 3 days
    securityAuditInterval: 14 * 24 * 60 * 60 * 1000, // 14 days
  },
  quality: {
    testCoverageThreshold: 70, // percentage (more lenient)
    codeQualityThreshold: 85, // percentage
    documentationCoverageThreshold: 90, // percentage
    accessibilityThreshold: 95, // percentage
  },
  monitoring: {
    healthCheckInterval: 30 * 1000, // 30 seconds (more frequent)
    reportInterval: 12 * 60 * 60 * 1000, // 12 hours
    alertThreshold: 10, // number of critical issues
  },
};

/**
 * Testing maintenance configuration
 */
export const testingMaintenanceConfig: MaintenanceConfig = {
  performance: {
    bundleSizeThreshold: 30, // KB (most lenient for testing)
    loadTimeThreshold: 5000, // ms
    memoryThreshold: 200, // MB
    regressionThreshold: 15, // percentage
  },
  security: {
    vulnerabilityScanInterval: 6 * 60 * 60 * 1000, // 6 hours
    dependencyCheckInterval: 24 * 60 * 60 * 1000, // 1 day
    securityAuditInterval: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  quality: {
    testCoverageThreshold: 60, // percentage (most lenient)
    codeQualityThreshold: 80, // percentage
    documentationCoverageThreshold: 85, // percentage
    accessibilityThreshold: 90, // percentage
  },
  monitoring: {
    healthCheckInterval: 15 * 1000, // 15 seconds (most frequent)
    reportInterval: 6 * 60 * 60 * 1000, // 6 hours
    alertThreshold: 15, // number of critical issues
  },
};

/**
 * Get maintenance configuration based on environment
 */
export function getMaintenanceConfig(
  environment: 'production' | 'development' | 'testing' = 'production'
): MaintenanceConfig {
  switch (environment) {
    case 'development':
      return developmentMaintenanceConfig;
    case 'testing':
      return testingMaintenanceConfig;
    case 'production':
    default:
      return productionMaintenanceConfig;
  }
}

/**
 * Maintenance schedule configuration
 */
export interface MaintenanceSchedule {
  daily: {
    enabled: boolean;
    time: string; // HH:MM format
    tasks: string[];
  };
  weekly: {
    enabled: boolean;
    day: number; // 0 = Sunday, 1 = Monday, etc.
    time: string; // HH:MM format
    tasks: string[];
  };
  monthly: {
    enabled: boolean;
    day: number; // 1-31
    time: string; // HH:MM format
    tasks: string[];
  };
}

/**
 * Default maintenance schedule
 */
export const defaultMaintenanceSchedule: MaintenanceSchedule = {
  daily: {
    enabled: true,
    time: '02:00', // 2:00 AM
    tasks: [
      'security-scan',
      'performance-check',
      'quality-check',
      'build-verification',
      'test-execution',
    ],
  },
  weekly: {
    enabled: true,
    day: 1, // Monday
    time: '03:00', // 3:00 AM
    tasks: [
      'performance-regression',
      'accessibility-compliance',
      'browser-compatibility',
      'bundle-size-monitoring',
      'system-audit',
    ],
  },
  monthly: {
    enabled: true,
    day: 1, // 1st of the month
    time: '04:00', // 4:00 AM
    tasks: [
      'security-audit',
      'performance-baseline',
      'dependency-assessment',
      'cross-browser-testing',
      'accessibility-audit',
    ],
  },
};

/**
 * Maintenance notification configuration
 */
export interface MaintenanceNotification {
  email: {
    enabled: boolean;
    recipients: string[];
    onFailure: boolean;
    onWarning: boolean;
    onSuccess: boolean;
  };
  slack: {
    enabled: boolean;
    webhook: string;
    channel: string;
    onFailure: boolean;
    onWarning: boolean;
    onSuccess: boolean;
  };
  discord: {
    enabled: boolean;
    webhook: string;
    channel: string;
    onFailure: boolean;
    onWarning: boolean;
    onSuccess: boolean;
  };
}

/**
 * Default notification configuration
 */
export const defaultNotificationConfig: MaintenanceNotification = {
  email: {
    enabled: false,
    recipients: [],
    onFailure: true,
    onWarning: true,
    onSuccess: false,
  },
  slack: {
    enabled: false,
    webhook: '',
    channel: '#design-system',
    onFailure: true,
    onWarning: true,
    onSuccess: false,
  },
  discord: {
    enabled: false,
    webhook: '',
    channel: 'design-system',
    onFailure: true,
    onWarning: true,
    onSuccess: false,
  },
};

/**
 * Maintenance metrics configuration
 */
export interface MaintenanceMetrics {
  performance: {
    bundleSize: boolean;
    loadTime: boolean;
    memoryUsage: boolean;
    renderTime: boolean;
    interactionTime: boolean;
  };
  security: {
    vulnerabilities: boolean;
    dependencies: boolean;
    compliance: boolean;
    audit: boolean;
  };
  quality: {
    testCoverage: boolean;
    codeQuality: boolean;
    documentation: boolean;
    accessibility: boolean;
  };
  system: {
    uptime: boolean;
    errors: boolean;
    warnings: boolean;
    issues: boolean;
  };
}

/**
 * Default metrics configuration
 */
export const defaultMetricsConfig: MaintenanceMetrics = {
  performance: {
    bundleSize: true,
    loadTime: true,
    memoryUsage: true,
    renderTime: true,
    interactionTime: true,
  },
  security: {
    vulnerabilities: true,
    dependencies: true,
    compliance: true,
    audit: true,
  },
  quality: {
    testCoverage: true,
    codeQuality: true,
    documentation: true,
    accessibility: true,
  },
  system: {
    uptime: true,
    errors: true,
    warnings: true,
    issues: true,
  },
};

/**
 * Maintenance alert configuration
 */
export interface MaintenanceAlert {
  performance: {
    bundleSizeExceeded: boolean;
    loadTimeExceeded: boolean;
    memoryUsageExceeded: boolean;
    regressionDetected: boolean;
  };
  security: {
    criticalVulnerability: boolean;
    highVulnerability: boolean;
    dependencyOutdated: boolean;
    complianceFailure: boolean;
  };
  quality: {
    testCoverageLow: boolean;
    codeQualityLow: boolean;
    documentationIncomplete: boolean;
    accessibilityViolation: boolean;
  };
  system: {
    buildFailure: boolean;
    testFailure: boolean;
    criticalIssue: boolean;
    systemDown: boolean;
  };
}

/**
 * Default alert configuration
 */
export const defaultAlertConfig: MaintenanceAlert = {
  performance: {
    bundleSizeExceeded: true,
    loadTimeExceeded: true,
    memoryUsageExceeded: true,
    regressionDetected: true,
  },
  security: {
    criticalVulnerability: true,
    highVulnerability: true,
    dependencyOutdated: true,
    complianceFailure: true,
  },
  quality: {
    testCoverageLow: true,
    codeQualityLow: true,
    documentationIncomplete: true,
    accessibilityViolation: true,
  },
  system: {
    buildFailure: true,
    testFailure: true,
    criticalIssue: true,
    systemDown: true,
  },
};

/**
 * Complete maintenance configuration
 */
export interface CompleteMaintenanceConfig {
  environment: 'production' | 'development' | 'testing';
  maintenance: MaintenanceConfig;
  schedule: MaintenanceSchedule;
  notifications: MaintenanceNotification;
  metrics: MaintenanceMetrics;
  alerts: MaintenanceAlert;
}

/**
 * Get complete maintenance configuration
 */
export function getCompleteMaintenanceConfig(
  environment: 'production' | 'development' | 'testing' = 'production'
): CompleteMaintenanceConfig {
  return {
    environment,
    maintenance: getMaintenanceConfig(environment),
    schedule: defaultMaintenanceSchedule,
    notifications: defaultNotificationConfig,
    metrics: defaultMetricsConfig,
    alerts: defaultAlertConfig,
  };
}

/**
 * Validate maintenance configuration
 */
export function validateMaintenanceConfig(config: MaintenanceConfig): string[] {
  const errors: string[] = [];

  // Validate performance thresholds
  if (config.performance.bundleSizeThreshold <= 0) {
    errors.push('Bundle size threshold must be greater than 0');
  }
  if (config.performance.loadTimeThreshold <= 0) {
    errors.push('Load time threshold must be greater than 0');
  }
  if (config.performance.memoryThreshold <= 0) {
    errors.push('Memory threshold must be greater than 0');
  }
  if (
    config.performance.regressionThreshold < 0 ||
    config.performance.regressionThreshold > 100
  ) {
    errors.push('Regression threshold must be between 0 and 100');
  }

  // Validate security intervals
  if (config.security.vulnerabilityScanInterval <= 0) {
    errors.push('Vulnerability scan interval must be greater than 0');
  }
  if (config.security.dependencyCheckInterval <= 0) {
    errors.push('Dependency check interval must be greater than 0');
  }
  if (config.security.securityAuditInterval <= 0) {
    errors.push('Security audit interval must be greater than 0');
  }

  // Validate quality thresholds
  if (
    config.quality.testCoverageThreshold < 0 ||
    config.quality.testCoverageThreshold > 100
  ) {
    errors.push('Test coverage threshold must be between 0 and 100');
  }
  if (
    config.quality.codeQualityThreshold < 0 ||
    config.quality.codeQualityThreshold > 100
  ) {
    errors.push('Code quality threshold must be between 0 and 100');
  }
  if (
    config.quality.documentationCoverageThreshold < 0 ||
    config.quality.documentationCoverageThreshold > 100
  ) {
    errors.push('Documentation coverage threshold must be between 0 and 100');
  }
  if (
    config.quality.accessibilityThreshold < 0 ||
    config.quality.accessibilityThreshold > 100
  ) {
    errors.push('Accessibility threshold must be between 0 and 100');
  }

  // Validate monitoring settings
  if (config.monitoring.healthCheckInterval <= 0) {
    errors.push('Health check interval must be greater than 0');
  }
  if (config.monitoring.reportInterval <= 0) {
    errors.push('Report interval must be greater than 0');
  }
  if (config.monitoring.alertThreshold < 0) {
    errors.push('Alert threshold must be greater than or equal to 0');
  }

  return errors;
}

/**
 * Maintenance configuration presets
 */
export const maintenancePresets = {
  strict: {
    performance: {
      bundleSizeThreshold: 15,
      loadTimeThreshold: 1500,
      memoryThreshold: 80,
      regressionThreshold: 3,
    },
    security: {
      vulnerabilityScanInterval: 12 * 60 * 60 * 1000,
      dependencyCheckInterval: 3 * 24 * 60 * 60 * 1000,
      securityAuditInterval: 14 * 24 * 60 * 60 * 1000,
    },
    quality: {
      testCoverageThreshold: 90,
      codeQualityThreshold: 95,
      documentationCoverageThreshold: 98,
      accessibilityThreshold: 100,
    },
    monitoring: {
      healthCheckInterval: 30 * 1000,
      reportInterval: 12 * 60 * 60 * 1000,
      alertThreshold: 3,
    },
  },
  balanced: productionMaintenanceConfig,
  lenient: {
    performance: {
      bundleSizeThreshold: 30,
      loadTimeThreshold: 3000,
      memoryThreshold: 150,
      regressionThreshold: 10,
    },
    security: {
      vulnerabilityScanInterval: 48 * 60 * 60 * 1000,
      dependencyCheckInterval: 14 * 24 * 60 * 60 * 1000,
      securityAuditInterval: 60 * 24 * 60 * 60 * 1000,
    },
    quality: {
      testCoverageThreshold: 70,
      codeQualityThreshold: 85,
      documentationCoverageThreshold: 90,
      accessibilityThreshold: 95,
    },
    monitoring: {
      healthCheckInterval: 5 * 60 * 1000,
      reportInterval: 48 * 60 * 60 * 1000,
      alertThreshold: 10,
    },
  },
} as const;
