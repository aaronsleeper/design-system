# Changelog Template

This template provides a standardized format for documenting changes in the design system. Use this template for each release to ensure consistent and comprehensive documentation.

## Changelog Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New features that will be included in the next release

### Changed
- Changes to existing functionality

### Deprecated
- Features that will be removed in future versions

### Removed
- Features that were removed in this version

### Fixed
- Bug fixes

### Security
- Security improvements

## [Version] - YYYY-MM-DD

### Added
- New features added in this version
- New components: `ds-new-component`
- New properties: `newProperty` on `ds-component`
- New events: `newEvent` on `ds-component`
- New CSS custom properties: `--ds-new-property`
- New utilities: `newUtility()`
- New themes: `new-theme`

### Changed
- Changes to existing functionality
- Updated `ds-component` to support new property
- Improved performance of `ds-component`
- Enhanced accessibility of `ds-component`

### Deprecated
- Features marked for removal
- `oldProperty` on `ds-component` (use `newProperty` instead)
- `--ds-old-property` CSS custom property (use `--ds-new-property`)

### Removed
- Features removed in this version
- Removed `deprecatedComponent` (use `newComponent` instead)
- Removed `oldProperty` from `ds-component`

### Fixed
- Bug fixes
- Fixed `ds-button` click handler not firing in certain conditions
- Fixed memory leak in `ds-modal` component
- Fixed color contrast issues in `ds-input` component
- Fixed TypeScript type definitions for `ds-component`

### Security
- Security improvements
- Fixed XSS vulnerability in `ds-component`
- Updated dependencies to address security issues

## [Previous Version] - YYYY-MM-DD

[Previous changelog entries...]
```

## Release Notes Template

```markdown
# Release Notes - v[Version] - [Date]

## 🎉 What's New

### New Features
- **[Feature Name]**: Description of the new feature
- **[Component Name]**: New component with [key features]
- **[Property Name]**: New property for [component] that [functionality]

### Enhancements
- **[Component Name]**: Improved [specific improvement]
- **[Feature Name]**: Enhanced [specific enhancement]
- **Performance**: [Specific performance improvement]

## 🔧 Breaking Changes

### [Component/Feature Name]
- **What Changed**: [Description of the change]
- **Why**: [Reason for the change]
- **Migration**: [Steps to migrate]

### [CSS Custom Property]
- **Old**: `--ds-old-property`
- **New**: `--ds-new-property`
- **Migration**: Update all CSS references

## 🐛 Bug Fixes

- Fixed [specific bug description]
- Resolved [specific issue description]
- Corrected [specific problem description]

## 📚 Documentation

- Updated [specific documentation]
- Added [new documentation]
- Improved [documentation improvement]

## 🔒 Security

- Fixed [security issue description]
- Updated [dependency] to address [security concern]

## 📦 Installation

```bash
npm install design-system@[version]
```

## 🚀 Migration Guide

For breaking changes, see the [Migration Guide](link-to-migration-guide).

## 📋 Full Changelog

See the [full changelog](link-to-changelog) for complete details.

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](link-to-contributing-guide).

## 📞 Support

- Documentation: [Link to docs]
- Issues: [Link to issues]
- Discussions: [Link to discussions]
```

## Breaking Change Documentation Template

```markdown
# Breaking Changes - v[Version]

## Overview

This release includes [number] breaking changes that require updates to your code.

## Migration Timeline

- **Announced**: [Date] (v[previous-version])
- **Deprecated**: [Date] (v[deprecation-version])
- **Removed**: [Date] (v[current-version])

## Breaking Changes

### 1. [Change Title]

**Component**: `ds-component`
**Type**: [API Change/CSS Change/Event Change/etc.]

#### What Changed
[Description of the change]

#### Before
```html
<ds-component old-property="value" />
```

#### After
```html
<ds-component new-property="value" />
```

#### Migration Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

#### Impact
- **High**: [Description of high impact]
- **Medium**: [Description of medium impact]
- **Low**: [Description of low impact]

### 2. [Next Change Title]

[Repeat structure for each breaking change]

## Migration Tools

### Automated Migration Script
```bash
npx design-system-migrate@[version] --from [old-version] --to [new-version]
```

### Manual Migration Checklist
- [ ] [Migration step 1]
- [ ] [Migration step 2]
- [ ] [Migration step 3]

## Testing Migration

### 1. Update Dependencies
```bash
npm install design-system@[new-version]
```

### 2. Run Migration Script
```bash
npx design-system-migrate@[version]
```

### 3. Test Components
- [ ] Test all components in development
- [ ] Verify visual appearance
- [ ] Check functionality
- [ ] Validate accessibility
- [ ] Test performance

### 4. Update Tests
- [ ] Update component tests
- [ ] Update integration tests
- [ ] Update accessibility tests
- [ ] Update performance tests

## Support

### Getting Help
- **Documentation**: [Link to migration docs]
- **Issues**: [Link to GitHub issues]
- **Discussions**: [Link to GitHub discussions]
- **Email**: [Support email]

### Timeline
- **Migration Support**: [Duration]
- **Issue Resolution**: [SLA]
- **Documentation Updates**: [Timeline]

## Rollback Plan

If you need to rollback:

```bash
npm install design-system@[previous-version]
```

**Note**: Rollback may require code changes if you've already updated your code for the new version.
```

## Usage Guidelines

### When to Use Each Template

1. **Changelog Template**: Use for every release to document all changes
2. **Release Notes Template**: Use for user-facing release announcements
3. **Breaking Change Template**: Use only for major releases with breaking changes

### Best Practices

1. **Be Specific**: Provide specific examples and code snippets
2. **Explain Why**: Always explain the reason for breaking changes
3. **Provide Migration Paths**: Give clear steps for migration
4. **Test Examples**: Ensure all code examples work
5. **Update Links**: Keep all links current and working

### Automation

Consider automating parts of the changelog generation:

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "release": "standard-version",
    "release:major": "standard-version --release-as major",
    "release:minor": "standard-version --release-as minor",
    "release:patch": "standard-version --release-as patch"
  }
}
```

This template ensures consistent, comprehensive documentation for all releases while making it easy for consumers to understand and migrate to new versions.
