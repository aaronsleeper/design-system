#!/usr/bin/env node

/**
 * Daily Maintenance Script
 *
 * Automated daily maintenance tasks including:
 * - Security vulnerability scanning
 * - Performance monitoring
 * - Quality checks
 * - Build verification
 * - Test execution
 */

/* eslint-disable @typescript-eslint/no-var-requires, no-console, @typescript-eslint/no-unused-vars, no-unused-vars */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  logFile: 'logs/maintenance-daily.log',
  reportFile: 'reports/maintenance-daily.json',
  thresholds: {
    bundleSize: 20, // KB
    loadTime: 2000, // ms
    testCoverage: 80, // percentage
    criticalIssues: 0,
  },
};

/**
 * Logging utility
 */
class Logger {
  constructor(logFile) {
    this.logFile = logFile;
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}`;

    console.log(logMessage);

    try {
      fs.appendFileSync(this.logFile, logMessage + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
  }

  error(message) {
    this.log(message, 'ERROR');
  }

  warn(message) {
    this.log(message, 'WARN');
  }

  info(message) {
    this.log(message, 'INFO');
  }
}

/**
 * Maintenance report generator
 */
class MaintenanceReport {
  constructor(reportFile) {
    this.reportFile = reportFile;
    this.ensureReportDirectory();
    this.report = {
      timestamp: new Date().toISOString(),
      status: 'running',
      tasks: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0,
      },
      issues: [],
      performance: {},
      security: {},
      quality: {},
    };
  }

  ensureReportDirectory() {
    const reportDir = path.dirname(this.reportFile);
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
  }

  addTask(name, status, details = {}) {
    const task = {
      name,
      status,
      timestamp: new Date().toISOString(),
      details,
    };

    this.report.tasks.push(task);
    this.report.summary.total++;

    if (status === 'passed') {
      this.report.summary.passed++;
    } else if (status === 'failed') {
      this.report.summary.failed++;
    } else if (status === 'warning') {
      this.report.summary.warnings++;
    }
  }

  addIssue(severity, title, description, details = {}) {
    const issue = {
      severity,
      title,
      description,
      timestamp: new Date().toISOString(),
      details,
    };

    this.report.issues.push(issue);
  }

  setPerformance(metrics) {
    this.report.performance = metrics;
  }

  setSecurity(metrics) {
    this.report.security = metrics;
  }

  setQuality(metrics) {
    this.report.quality = metrics;
  }

  finalize(status) {
    this.report.status = status;
    this.report.completedAt = new Date().toISOString();

    try {
      fs.writeFileSync(this.reportFile, JSON.stringify(this.report, null, 2));
    } catch (error) {
      console.error('Failed to write report file:', error.message);
    }
  }
}

/**
 * Security scanner
 */
class SecurityScanner {
  constructor(logger, report) {
    this.logger = logger;
    this.report = report;
  }

  async scanVulnerabilities() {
    this.logger.info('Starting security vulnerability scan...');

    try {
      // Run npm audit
      const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
      const auditData = JSON.parse(auditResult);

      const vulnerabilities = auditData.vulnerabilities || {};
      const criticalVulns = Object.values(vulnerabilities).filter(
        v => v.severity === 'critical'
      );
      const highVulns = Object.values(vulnerabilities).filter(
        v => v.severity === 'high'
      );

      this.report.setSecurity({
        totalVulnerabilities: Object.keys(vulnerabilities).length,
        critical: criticalVulns.length,
        high: highVulns.length,
        medium: Object.values(vulnerabilities).filter(
          v => v.severity === 'medium'
        ).length,
        low: Object.values(vulnerabilities).filter(v => v.severity === 'low')
          .length,
      });

      if (criticalVulns.length > 0) {
        this.report.addTask('Security Scan', 'failed', {
          criticalVulnerabilities: criticalVulns.length,
        });

        criticalVulns.forEach(vuln => {
          this.report.addIssue(
            'critical',
            'Security Vulnerability',
            `${vuln.name}: ${vuln.title}`,
            { vulnerability: vuln }
          );
        });
      } else if (highVulns.length > 0) {
        this.report.addTask('Security Scan', 'warning', {
          highVulnerabilities: highVulns.length,
        });
      } else {
        this.report.addTask('Security Scan', 'passed');
      }

      this.logger.info(
        `Security scan completed: ${
          Object.keys(vulnerabilities).length
        } vulnerabilities found`
      );
    } catch (error) {
      this.logger.error(`Security scan failed: ${error.message}`);
      this.report.addTask('Security Scan', 'failed', { error: error.message });
    }
  }

  async checkDependencies() {
    this.logger.info('Checking dependency status...');

    try {
      // Check for outdated dependencies
      const outdatedResult = execSync('npm outdated --json', {
        encoding: 'utf8',
      });
      const outdatedData = JSON.parse(outdatedResult);

      const outdatedCount = Object.keys(outdatedData).length;

      if (outdatedCount > 0) {
        this.report.addTask('Dependency Check', 'warning', {
          outdatedDependencies: outdatedCount,
        });

        this.report.addIssue(
          'medium',
          'Outdated Dependencies',
          `${outdatedCount} dependencies are outdated`,
          { outdated: outdatedData }
        );
      } else {
        this.report.addTask('Dependency Check', 'passed');
      }

      this.logger.info(
        `Dependency check completed: ${outdatedCount} outdated dependencies`
      );
    } catch (error) {
      this.logger.error(`Dependency check failed: ${error.message}`);
      this.report.addTask('Dependency Check', 'failed', {
        error: error.message,
      });
    }
  }
}

/**
 * Performance monitor
 */
class PerformanceMonitor {
  constructor(logger, report) {
    this.logger = logger;
    this.report = report;
  }

  async checkBundleSize() {
    this.logger.info('Checking bundle size...');

    try {
      // Build the project to get bundle size
      execSync('npm run build', { stdio: 'pipe' });

      // Check dist directory for bundle sizes
      const distDir = 'dist';
      if (fs.existsSync(distDir)) {
        const files = fs.readdirSync(distDir, { recursive: true });
        let totalSize = 0;

        files.forEach(file => {
          if (typeof file === 'string' && file.endsWith('.js')) {
            const filePath = path.join(distDir, file);
            const stats = fs.statSync(filePath);
            totalSize += stats.size;
          }
        });

        const bundleSizeKB = totalSize / 1024;

        this.report.setPerformance({
          bundleSize: bundleSizeKB,
          threshold: config.thresholds.bundleSize,
        });

        if (bundleSizeKB > config.thresholds.bundleSize) {
          this.report.addTask('Bundle Size Check', 'failed', {
            size: bundleSizeKB,
            threshold: config.thresholds.bundleSize,
          });

          this.report.addIssue(
            'high',
            'Bundle Size Exceeded',
            `Bundle size ${bundleSizeKB.toFixed(2)}KB exceeds threshold ${
              config.thresholds.bundleSize
            }KB`
          );
        } else {
          this.report.addTask('Bundle Size Check', 'passed', {
            size: bundleSizeKB,
          });
        }

        this.logger.info(
          `Bundle size check completed: ${bundleSizeKB.toFixed(2)}KB`
        );
      }
    } catch (error) {
      this.logger.error(`Bundle size check failed: ${error.message}`);
      this.report.addTask('Bundle Size Check', 'failed', {
        error: error.message,
      });
    }
  }

  async checkPerformance() {
    this.logger.info('Running performance tests...');

    try {
      // Run performance tests
      execSync('npm run test:performance', { encoding: 'utf8' });

      this.report.addTask('Performance Tests', 'passed');
      this.logger.info('Performance tests completed successfully');
    } catch (error) {
      this.logger.error(`Performance tests failed: ${error.message}`);
      this.report.addTask('Performance Tests', 'failed', {
        error: error.message,
      });
    }
  }
}

/**
 * Quality checker
 */
class QualityChecker {
  constructor(logger, report) {
    this.logger = logger;
    this.report = report;
  }

  async runTests() {
    this.logger.info('Running test suite...');

    try {
      // Run tests with coverage
      const testResult = execSync('npm run test -- --coverage', {
        encoding: 'utf8',
      });

      // Parse coverage from output (simplified)
      const coverageMatch = testResult.match(
        /All files\s+\|\s+(\d+(?:\.\d+)?)/
      );
      const coverage = coverageMatch ? parseFloat(coverageMatch[1]) : 0;

      this.report.setQuality({
        testCoverage: coverage,
        threshold: config.thresholds.testCoverage,
      });

      if (coverage < config.thresholds.testCoverage) {
        this.report.addTask('Test Coverage', 'warning', {
          coverage,
          threshold: config.thresholds.testCoverage,
        });

        this.report.addIssue(
          'medium',
          'Low Test Coverage',
          `Test coverage ${coverage}% is below threshold ${config.thresholds.testCoverage}%`
        );
      } else {
        this.report.addTask('Test Coverage', 'passed', { coverage });
      }

      this.logger.info(`Test suite completed: ${coverage}% coverage`);
    } catch (error) {
      this.logger.error(`Test suite failed: ${error.message}`);
      this.report.addTask('Test Suite', 'failed', { error: error.message });
    }
  }

  async checkCodeQuality() {
    this.logger.info('Checking code quality...');

    try {
      // Run linting
      execSync('npm run lint', { stdio: 'pipe' });

      this.report.addTask('Code Quality Check', 'passed');
      this.logger.info('Code quality check completed successfully');
    } catch (error) {
      this.logger.error(`Code quality check failed: ${error.message}`);
      this.report.addTask('Code Quality Check', 'failed', {
        error: error.message,
      });
    }
  }
}

/**
 * Build verifier
 */
class BuildVerifier {
  constructor(logger, report) {
    this.logger = logger;
    this.report = report;
  }

  async verifyBuild() {
    this.logger.info('Verifying build...');

    try {
      // Run build
      execSync('npm run build', { stdio: 'pipe' });

      // Check if dist directory exists and has files
      const distDir = 'dist';
      if (fs.existsSync(distDir)) {
        const files = fs.readdirSync(distDir, { recursive: true });
        const jsFiles = files.filter(
          file => typeof file === 'string' && file.endsWith('.js')
        );
        const cssFiles = files.filter(
          file => typeof file === 'string' && file.endsWith('.css')
        );

        if (jsFiles.length > 0 && cssFiles.length > 0) {
          this.report.addTask('Build Verification', 'passed', {
            jsFiles: jsFiles.length,
            cssFiles: cssFiles.length,
          });
        } else {
          this.report.addTask('Build Verification', 'failed', {
            jsFiles: jsFiles.length,
            cssFiles: cssFiles.length,
          });
        }
      } else {
        this.report.addTask('Build Verification', 'failed', {
          error: 'dist directory not found',
        });
      }

      this.logger.info('Build verification completed');
    } catch (error) {
      this.logger.error(`Build verification failed: ${error.message}`);
      this.report.addTask('Build Verification', 'failed', {
        error: error.message,
      });
    }
  }
}

/**
 * Main daily maintenance function
 */
async function runDailyMaintenance() {
  const logger = new Logger(config.logFile);
  const report = new MaintenanceReport(config.reportFile);

  logger.info('Starting daily maintenance...');

  try {
    // Initialize scanners
    const securityScanner = new SecurityScanner(logger, report);
    const performanceMonitor = new PerformanceMonitor(logger, report);
    const qualityChecker = new QualityChecker(logger, report);
    const buildVerifier = new BuildVerifier(logger, report);

    // Run security checks
    await securityScanner.scanVulnerabilities();
    await securityScanner.checkDependencies();

    // Run performance checks
    await performanceMonitor.checkBundleSize();
    await performanceMonitor.checkPerformance();

    // Run quality checks
    await qualityChecker.runTests();
    await qualityChecker.checkCodeQuality();

    // Verify build
    await buildVerifier.verifyBuild();

    // Determine overall status
    const criticalIssues = report.report.issues.filter(
      i => i.severity === 'critical'
    ).length;
    const failedTasks = report.report.summary.failed;

    let overallStatus = 'passed';
    if (criticalIssues > 0 || failedTasks > 0) {
      overallStatus = 'failed';
    } else if (report.report.summary.warnings > 0) {
      overallStatus = 'warning';
    }

    report.finalize(overallStatus);

    logger.info(`Daily maintenance completed with status: ${overallStatus}`);
    logger.info(
      `Summary: ${report.report.summary.passed} passed, ${report.report.summary.failed} failed, ${report.report.summary.warnings} warnings`
    );

    // Exit with appropriate code
    process.exit(overallStatus === 'failed' ? 1 : 0);
  } catch (error) {
    logger.error(`Daily maintenance failed: ${error.message}`);
    report.finalize('failed');
    process.exit(1);
  }
}

// Run daily maintenance if this script is executed directly
if (require.main === module) {
  runDailyMaintenance().catch(error => {
    console.error('Daily maintenance script failed:', error);
    process.exit(1);
  });
}

module.exports = {
  runDailyMaintenance,
  Logger,
  MaintenanceReport,
  SecurityScanner,
  PerformanceMonitor,
  QualityChecker,
  BuildVerifier,
};
