# Design System Specification

## Project Overview

### Project Goals

- Create a clean, well-organized, and reusable design system
- Provide framework-agnostic components that can be used across different JavaScript projects
- Establish a consistent design language and user experience
- Implement realistic lighting and elevation system

### Success Criteria

- **Easily themed**: Support multiple themes and custom theming
- **Easy to use**: Simple, intuitive API for developers
- **Easy to read**: Clean, semantic code and documentation
- **Well documented**: Comprehensive guides, examples, and API references
- **DRY**: Eliminate code duplication through shared tokens and utilities
- **Well organized**: Logical structure and clear separation of concerns
- **Realistic lighting**: Dynamic shadows that respond to light source position

## Technical Architecture

### Tech Stack

- **Web Components**: Using Lit library for enhanced developer experience
- **TypeScript**: For better type safety and developer experience
- **SCSS**: For complex calculations and build-time logic
- **CSS Custom Properties**: For runtime theming and performance
- **Storybook**: For component documentation and testing
- **CSS Color Mix**: For dynamic color calculations

### Core Architecture Decisions

- **Shadow DOM**: For style encapsulation and conflict prevention
- **Design Token System**: Base-level variables that compile to component-specific properties
- **CSS Variables**: Primary styling mechanism for performance and runtime theming
- **Single Package Distribution**: With tree-shaking support for optimal bundle sizes
- **Dynamic Lighting System**: Real-time shadow calculations based on light source position

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 support with polyfills for maximum accessibility
- Fully responsive design with constrained fluid scaling

## Design System Foundation

### Color System

- **Base Hues**: Purple, yellow, orange, red, blue, teal, green, magenta
- **Tonal Variants**: Each hue has `hue`, `hue-lightest`, `hue-darkest`
- **Dynamic Calculation**: Use `color-mix()` for intermediate values
  - Example: `color-mix(blue 60%, blue-darkest 40%)` for blue-700 equivalent
- **Semantic Colors**: Primary, secondary, success, warning, error, info

### Lighting System

- **Global Light Source**:
  - `--light-source-color`: Color of the global light source
  - `--light-source-position-x`: X coordinate of light source
  - `--light-source-position-y`: Y coordinate of light source
  - `--light-source-intensity`: Scaling factor for lighting calculations
- **Dynamic Shadows**: Multiple layered box-shadows for realistic depth
- **Runtime Calculation**: All colors affected by light source via `color-mix()`
- **Element Positioning**: Components track their position for shadow direction

### Design Tokens

- **Spacing Scale**: Based on unit and scaler variables (e.g., 4px base unit)
- **Typography**: Font families, sizes, weights, line heights
- **Border Radius**: Consistent corner rounding values
- **Breakpoints**: Responsive design breakpoints (when needed)
- **Max Line Length**: 75ch maximum for text content

### Theming System

- **CSS Custom Properties**: Runtime theme switching
- **Theme Files**: Multiple theme configurations
- **Dark Mode**: Built-in dark theme support
- **Internationalization**: RTL support using logical properties (margin-block-start, etc.)

## Component Library

### Form Controls

- Button (primary, secondary, tertiary variants)
- Input (text, email, password, number)
- Select (dropdown with options)
- Checkbox
- Radio
- Textarea
- Switch/Toggle

### Layout Components

- Container (responsive max-width wrapper)
- Grid (flexible grid system)
- Stack (vertical spacing utility)
- Divider (horizontal and vertical)

### Navigation Components

- **Sidebar Navigation**:
  - Expandable/collapsible to icon-only mode
  - Hover expansion from collapsed state
  - Toggle button at top
  - Smooth transitions
- **Drawer/Pane**:
  - Right-side contextual panel
  - Similar expand/collapse functionality
  - Context-aware content display

### Content Components

- Typography (headings, body text, captions)
- Card (content containers)
- Badge (status indicators)
- Avatar (user profile images)
- Breadcrumb (navigation hierarchy)
- Pagination (page navigation)

### Feedback Components

- Alert (success, warning, error, info)
- Toast (notification system)
- Modal (overlay dialogs)
- Tooltip (contextual help)

## Development Workflow

### Git Strategy

- **GitHub Flow**: Simple, continuous deployment workflow
- **Feature Branches**: Create from main, merge via pull request
- **Semantic Versioning**: Clear version numbering for releases

### Project Structure

```
design-system/
├── src/
│   ├── tokens/           # Design tokens (colors, spacing, typography)
│   ├── components/       # Web components
│   ├── utilities/        # Helper functions and mixins
│   ├── themes/           # Theme configurations
│   ├── lighting/         # Lighting system utilities
│   ├── stories/          # Storybook stories
│   └── cursor-rules/     # MDC cursor rules
├── docs/                 # Documentation
├── dist/                 # Built assets
└── tests/                # Test files
```

### Build Process

- **SCSS Compilation**: Tokens → CSS custom properties
- **TypeScript Compilation**: Component source → JavaScript
- **Bundle Generation**: Individual components + tree-shaking support
- **Storybook Build**: Documentation site generation
- **Cursor Rules**: MDC file generation

### Quality Assurance

- **Accessibility**: WCAG 2.1 AA compliance
- **Cross-browser Testing**: Including IE11 compatibility
- **Responsive Testing**: Constrained fluid scaling across all screen sizes
- **Performance**: Bundle size optimization and runtime performance
- **Lighting Validation**: Shadow consistency and performance

## Documentation Strategy

### Storybook Integration

- **Component Stories**: Interactive examples and variants
- **Design Token Documentation**: Visual token reference
- **Lighting System Demo**: Interactive light source positioning
- **Accessibility Guidelines**: WCAG compliance documentation
- **Theme Examples**: Light, dark, and custom theme demonstrations

### Developer Documentation

- **Installation Guide**: Setup and integration instructions
- **API Reference**: Component props and methods
- **Theming Guide**: Custom theme creation
- **Lighting Guide**: Light source configuration and customization
- **Best Practices**: Usage guidelines and patterns

## Testing Strategy

### Unit Testing

- Component behavior and props
- Design token calculations
- Lighting system calculations
- Utility function validation

### Integration Testing

- Component interactions
- Theme switching
- Responsive behavior
- Light source positioning

### Accessibility Testing

- Screen reader compatibility
- Keyboard navigation
- Color contrast validation
- IE11 compatibility

## Performance Requirements

### Bundle Optimization

- Tree-shaking support for unused components
- CSS variable usage for runtime performance
- Minimal JavaScript footprint
- Efficient lighting calculations

### Runtime Performance

- Efficient DOM updates
- Optimized CSS calculations
- Responsive design without layout thrashing
- Light source position tracking optimization

## Internationalization Support

### RTL Layout

- Logical CSS properties (margin-block-start, padding-inline-end)
- Bidirectional text support
- RTL-aware component layouts

### Localization

- Text direction awareness
- Cultural considerations in design
- Flexible content containers

## Cursor Rules

### MDC Implementation

- **Custom Cursor Rules**: Based on PatrickJS/awesome-cursorrules
- **SVG Cursors**: Theme-aware cursors that respond to color and sizing tokens
- **Context-Aware Cursors**: Different cursors for different interactions
- **Accessibility**: High contrast cursor options
- **Performance**: Efficient cursor switching
- **Theme Integration**: Cursor colors and sizes controlled by design tokens
