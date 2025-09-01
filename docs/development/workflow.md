# Development Workflow Documentation

## Overview

This document describes the complete development workflow for the design system, including hot reloading, component development cycle, debugging setup, and development server configuration.

## Development Environment Setup

### Prerequisites

- Node.js ≥18.0.0
- npm ≥8.0.0
- Modern browser with DevTools support

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run tests
npm run test
```

## Development Server Configuration

### Vite Configuration

The development server is configured using Vite with the following features:

- **Hot Module Replacement (HMR)**: Instant updates without page refresh
- **TypeScript Support**: Full TypeScript compilation with source maps
- **SCSS Processing**: Automatic SCSS compilation with CSS custom properties
- **Source Maps**: Full debugging support with original source files
- **Port Configuration**: Development server on port 3000, Storybook on port 6006

### Key Configuration Files

- `vite.config.js`: Main development server configuration
- `tsconfig.json`: TypeScript configuration with strict mode
- `sass.config.js`: SCSS compilation settings
- `index.html`: Development environment entry point

## Hot Reloading

### How It Works

1. **File Watching**: Vite monitors all source files for changes
2. **Module Replacement**: Changed modules are hot-swapped without full page reload
3. **State Preservation**: Component state is preserved during hot reloads
4. **CSS Updates**: Style changes are applied instantly

### Testing Hot Reloading

```typescript
// Edit any component file and save
// Changes should appear instantly in the browser
// No page refresh required
```

### Hot Reload Detection

The workflow test component automatically detects hot reloading:

```typescript
// Check if hot reload is active
const isHotReloadActive = import.meta.env?.DEV;

// Monitor reload events
window.addEventListener('beforeunload', () => {
  console.log('Page reload detected');
});
```

## Component Development Cycle

### 1. Component Creation

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-component')
export class MyComponent extends LitElement {
  @property({ type: String }) label = '';
  
  static styles = css`
    :host {
      display: block;
    }
  `;
  
  render() {
    return html`
      <div>${this.label}</div>
    `;
  }
}
```

### 2. Component Testing

```typescript
// Add to development environment
<my-component label="Test Label"></my-component>

// Check browser console for any errors
// Verify component renders correctly
```

### 3. Component Iteration

- Edit component code
- Save file
- See changes instantly in browser
- Debug using browser DevTools
- Repeat until satisfied

### 4. Component Integration

```typescript
// Export from component index
export { MyComponent } from './my-component.js';

// Import in main index
export { MyComponent } from './components/my-component.js';
```

## Debugging Setup

### Browser DevTools Integration

#### Chrome DevTools

1. **Elements Panel**: Inspect component structure and styles
2. **Console Panel**: View logs and errors with source maps
3. **Sources Panel**: Debug TypeScript code directly
4. **Network Panel**: Monitor module loading and hot reloads

#### Firefox DevTools

1. **Inspector**: Examine component DOM and CSS
2. **Console**: JavaScript debugging with source maps
3. **Debugger**: Step-through TypeScript code
4. **Network**: Monitor resource loading

### Source Maps

Source maps are enabled for all build outputs:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    sourcemap: true,
  },
});

// rollup.config.js
export default {
  output: {
    sourcemap: true,
  },
};
```

### Console Logging

Structured logging for development:

```typescript
// Component lifecycle logging
console.log('Component: Initializing', this.tagName);

// Property change logging
console.log('Component: Property changed', property, value);

// Event logging
console.log('Component: Event fired', event.type);
```

### Error Handling

```typescript
// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global Error:', event.error);
});

// Unhandled promise rejection
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
});
```

## Development Workflow Testing

### Automated Testing

The workflow includes comprehensive testing:

```bash
# Run workflow tests
npm run test:workflow

# Test hot reloading
npm run test:hot-reload

# Test component cycle
npm run test:component-cycle
```

### Manual Testing

1. **Hot Reload Test**:
   - Edit a component file
   - Save the file
   - Verify changes appear instantly

2. **Component Development Test**:
   - Create a new component
   - Add it to the development environment
   - Test all component features
   - Debug any issues

3. **Debugging Test**:
   - Open browser DevTools
   - Set breakpoints in TypeScript code
   - Step through component logic
   - Inspect component state

### Workflow Test Component

The `WorkflowTest` component provides real-time feedback:

```html
<workflow-test></workflow-test>
```

Features:
- Hot reload status indicator
- Component lifecycle monitoring
- Environment detection
- Performance metrics

## Performance Monitoring

### Development Performance

- **Bundle Size**: Monitor during development
- **Hot Reload Speed**: Measure update latency
- **Memory Usage**: Track memory leaks
- **CPU Usage**: Monitor during heavy development

### Performance Tools

```bash
# Bundle analysis
npm run analyze

# Performance benchmarks
npm run benchmark

# Memory profiling
npm run profile
```

## Troubleshooting

### Common Issues

#### Hot Reload Not Working

1. Check file watchers are active
2. Verify Vite is running in development mode
3. Check browser console for errors
4. Restart development server

#### TypeScript Errors

1. Check `tsconfig.json` configuration
2. Verify all imports are correct
3. Check for circular dependencies
4. Run `npm run type-check`

#### SCSS Compilation Issues

1. Verify `sass.config.js` settings
2. Check import paths in SCSS files
3. Verify CSS custom properties syntax
4. Check for syntax errors

#### Component Not Rendering

1. Check component registration
2. Verify custom element name
3. Check for JavaScript errors
4. Inspect component in DevTools

### Debugging Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Test specific component
npm run test -- --testNamePattern="MyComponent"

# Build for debugging
npm run build:debug
```

## Best Practices

### Development Workflow

1. **Start Small**: Begin with minimal component implementation
2. **Test Early**: Test components as you develop
3. **Use DevTools**: Leverage browser debugging tools
4. **Monitor Performance**: Keep an eye on bundle size and performance
5. **Document Changes**: Update documentation as you go

### Code Organization

1. **Component Isolation**: Keep components independent
2. **Clear Naming**: Use descriptive component and property names
3. **Consistent Patterns**: Follow established component patterns
4. **Error Handling**: Implement proper error boundaries

### Testing Strategy

1. **Unit Tests**: Test individual component functionality
2. **Integration Tests**: Test component interactions
3. **Visual Tests**: Verify component appearance
4. **Accessibility Tests**: Ensure WCAG compliance

## Environment Variables

### Development Variables

```bash
# Development mode
NODE_ENV=development

# Vite development
VITE_DEV=true

# Debug mode
DEBUG=true
```

### Configuration

```typescript
// Access environment variables
const isDev = import.meta.env?.DEV;
const isDebug = import.meta.env?.VITE_DEBUG;
```

## Integration with Build Pipeline

### Development to Production Flow

1. **Development**: Use Vite dev server with hot reloading
2. **Testing**: Run comprehensive test suite
3. **Building**: Generate production bundles
4. **Deployment**: Deploy optimized bundles

### Build Integration

```bash
# Development build
npm run build:dev

# Production build
npm run build

# IE11 build
npm run build:ie11
```

## Conclusion

The development workflow provides a robust, efficient environment for building and testing design system components. With hot reloading, comprehensive debugging tools, and automated testing, developers can iterate quickly while maintaining code quality and performance standards.

For additional information, see:
- [Build Pipeline Documentation](../technical/build-pipeline.md)
- [Performance Benchmarks](../performance/benchmarks.md)
- [Browser Compatibility](../compatibility/browser-matrix.md)
- [Accessibility Guidelines](../accessibility/audit-checklist.md)
