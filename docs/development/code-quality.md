# Code Quality Setup

This document outlines the code quality tools and configuration used in the design system project.

## Overview

The project uses a comprehensive code quality setup with:

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Pre-commit formatting and linting

## Configuration Files

### ESLint Configuration (`.eslintrc.cjs`)

ESLint is configured with TypeScript support and Prettier integration:

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier', // Disable ESLint rules that conflict with Prettier
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',
    
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-var-requires': 'error',
    
    // General code quality rules
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Lit-specific rules for web components
    'no-undef': 'off', // TypeScript handles this
    'no-redeclare': 'off', // TypeScript handles this
  },
  overrides: [
    {
      // Test files
      files: ['**/*.test.ts', '**/*.spec.ts', 'src/test/**/*.ts'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off',
      },
    },
    {
      // Configuration files
      files: ['*.config.js', '*.config.ts', 'vite.config.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.min.js',
    'coverage/',
    'storybook-static/',
  ],
};
```

### Prettier Configuration (`.prettierrc`)

Prettier is configured for consistent code formatting:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "embeddedLanguageFormatting": "auto"
}
```

### Prettier Ignore (`.prettierignore`)

Files and directories excluded from Prettier formatting:

```
# Build outputs
dist/
node_modules/
*.min.js
*.min.css

# Generated files
coverage/
storybook-static/
*.map

# Package files
package-lock.json
yarn.lock

# Documentation
*.md

# Configuration files that should maintain their format
*.config.js
*.config.ts
vite.config.js
rollup.config.js
jest.config.js
tsconfig.json
```

### lint-staged Configuration

Pre-commit hooks configuration in `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.{js,jsx}": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ],
    "*.{scss,css}": [
      "prettier --write"
    ]
  }
}
```

## Available Scripts

### Linting

```bash
# Lint all TypeScript files
npm run lint

# Lint and auto-fix issues
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting without making changes
npm run format:check
```

## Pre-commit Hooks

The project uses Husky to run pre-commit hooks:

- **Pre-commit**: Runs `lint-staged` to format and lint staged files
- **Configuration**: `.husky/pre-commit`

## Rules and Standards

### TypeScript Rules

- **`@typescript-eslint/no-unused-vars`**: Error for unused variables (ignores `_` prefixed)
- **`@typescript-eslint/no-explicit-any`**: Warning for `any` types
- **`@typescript-eslint/no-var-requires`**: Error for `require()` statements

### General Code Quality

- **`no-console`**: Warning for console statements
- **`no-debugger`**: Error for debugger statements
- **`prefer-const`**: Error for variables that could be const
- **`no-var`**: Error for var declarations

### Lit Component Rules

- **`no-undef`**: Disabled (TypeScript handles this)
- **`no-redeclare`**: Disabled (TypeScript handles this)

### Test File Overrides

Test files have relaxed rules:

- **`@typescript-eslint/no-explicit-any`**: Allowed
- **`no-console`**: Allowed

### Configuration File Overrides

Config files have relaxed rules:

- **`@typescript-eslint/no-var-requires`**: Allowed

## Integration with Development Workflow

### IDE Integration

For optimal development experience, configure your IDE:

#### VS Code

Install these extensions:
- ESLint
- Prettier - Code formatter

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript"]
}
```

#### Other IDEs

- **WebStorm**: Enable ESLint and Prettier integration
- **Atom**: Install linter-eslint and prettier-atom packages

### CI/CD Integration

The linting and formatting checks are integrated into the CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
- name: Lint and format check
  run: |
    npm run lint
    npm run format:check
```

## Troubleshooting

### Common Issues

#### TypeScript Version Warning

If you see a TypeScript version warning:

```
WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.
```

This is expected with TypeScript 5.9.2. The linting still works correctly.

#### Pre-commit Hook Failures

If pre-commit hooks fail:

1. Check that all dependencies are installed: `npm install`
2. Verify Husky is properly initialized: `npx husky install`
3. Check lint-staged configuration in `package.json`

#### Formatting Conflicts

If ESLint and Prettier conflict:

1. Ensure `eslint-config-prettier` is in the extends array
2. Run `npm run format` then `npm run lint:fix`
3. Check that `.prettierrc` and `.eslintrc.cjs` are properly configured

### Performance

- **Large files**: Consider splitting large files to improve linting performance
- **Many files**: Use `npm run lint:fix` to batch process all files
- **IDE integration**: Use IDE extensions for real-time feedback

## Best Practices

### Code Style

1. **Consistent formatting**: Always use Prettier for formatting
2. **Meaningful names**: Use descriptive variable and function names
3. **Type safety**: Avoid `any` types when possible
4. **Documentation**: Add JSDoc comments for public APIs

### Git Workflow

1. **Pre-commit**: Always run pre-commit hooks
2. **Commit messages**: Use conventional commit format
3. **Branch naming**: Use descriptive branch names

### Maintenance

1. **Regular updates**: Keep ESLint and Prettier versions updated
2. **Rule reviews**: Periodically review and adjust rules
3. **Team alignment**: Ensure all team members use the same configuration

## Dependencies

### Required Packages

```json
{
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-prettier": "^4.2.5",
    "husky": "^9.1.7",
    "lint-staged": "^16.1.6",
    "prettier": "^2.8.8"
  }
}
```

### Version Compatibility

- **TypeScript**: 5.2.0+ (with warnings for 5.9.2)
- **ESLint**: 8.0.0+
- **Prettier**: 2.8.8 (compatible with Storybook)
- **Husky**: 9.1.7+

## Future Improvements

### Planned Enhancements

1. **Custom rules**: Add project-specific ESLint rules
2. **Performance**: Optimize linting performance for large codebases
3. **Integration**: Better integration with Storybook and testing tools
4. **Automation**: Automated rule updates and configuration management

### Monitoring

- **Lint errors**: Track and reduce lint errors over time
- **Formatting issues**: Monitor formatting consistency
- **Performance**: Measure linting and formatting performance
- **Developer experience**: Gather feedback on tool effectiveness
