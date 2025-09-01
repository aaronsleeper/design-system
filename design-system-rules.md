# Design System Rules

## Naming Conventions

### Component Names

- Use **kebab-case** for component file names: `button-primary.ts`, `sidebar-navigation.ts`
- Use **PascalCase** for component class names: `ButtonPrimary`, `SidebarNavigation`
- Use **kebab-case** for custom element tags: `<button-primary>`, `<sidebar-navigation>`
- Prefix all custom elements with `ds-` (design system): `<ds-button-primary>`

### Design Tokens

- Use **kebab-case** for all token names: `--color-primary`, `--spacing-unit`
- Group tokens with prefixes:
  - `--color-*` for colors
  - `--spacing-*` for spacing
  - `--typography-*` for typography
  - `--border-*` for borders
  - `--shadow-*` for shadows
  - `--light-*` for lighting system
- Use semantic names over visual descriptions: `--color-success` not `--color-green`

### File Organization

- One component per file
- Group related components in folders: `form/`, `layout/`, `navigation/`
- Use index files for exports: `form/index.ts`
- Separate styles into `.scss` files: `button-primary.scss`

## Code Style Guidelines

### TypeScript

- Use **strict mode** with all strict flags enabled
- Prefer **interfaces** over types for object shapes
- Use **readonly** for immutable properties
- Use **union types** for variant props: `'primary' | 'secondary' | 'tertiary'`
- Document all public APIs with JSDoc comments

### SCSS

- Use **BEM methodology** for component-specific styles
- Nest no deeper than **3 levels**
- Use **mixins** for repeated patterns
- Use **functions** for calculations
- Prefer **CSS custom properties** over SCSS variables for runtime values

### Component Structure

```typescript
// 1. Imports
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// 2. Component class
@customElement('ds-button-primary')
export class ButtonPrimary extends LitElement {
	// 3. Properties
	@property({ type: String })
	variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

	@property({ type: Boolean })
	disabled = false;

	// 4. Render method
	render() {
		return html`
			<button
				class="button button--${this.variant}"
				?disabled="${this.disabled}"
				@click="${this._handleClick}"
			>
				<slot></slot>
			</button>
		`;
	}

	// 5. Styles
	static styles = css`
		:host {
			display: inline-block;
		}

		.button {
			/* styles */
		}
	`;

	// 6. Event handlers
	private _handleClick(e: Event) {
		if (this.disabled) return;
		this.dispatchEvent(new CustomEvent('click', { detail: e }));
	}
}
```

## Accessibility Standards

### WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Visible focus indicators on all interactive elements
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and roles
- **Semantic HTML**: Use appropriate HTML elements and attributes

### ARIA Guidelines

- Use **aria-label** for elements without visible text
- Use **aria-describedby** for additional descriptions
- Use **aria-expanded** for collapsible content
- Use **aria-pressed** for toggle buttons
- Use **aria-current** for current page/step indicators

### Keyboard Navigation

- **Tab Order**: Logical tab order following visual layout
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate within components (dropdowns, tabs, etc.)
- **Escape**: Close modals, dropdowns, and other overlays

## Performance Guidelines

### Bundle Size

- Target **< 50KB** for the entire design system (gzipped)
- Individual components should be **< 5KB** each
- Use **tree-shaking** to exclude unused components
- Minimize dependencies and prefer native browser APIs

### Runtime Performance

- Use **CSS custom properties** for dynamic values
- Avoid **layout thrashing** in responsive designs
- Use **requestAnimationFrame** for smooth animations
- Implement **lazy loading** for heavy components
- Cache **light source calculations** to avoid recalculation

### Optimization Strategies

- **CSS-in-JS**: Avoid for better performance
- **Shadow DOM**: Use for style encapsulation
- **Event Delegation**: Use for dynamic content
- **Debouncing**: For resize and scroll events

## Documentation Standards

### Storybook Stories

- **Default Story**: Basic component usage
- **Variant Stories**: All prop variations
- **Interactive Stories**: With controls for all props
- **Accessibility Stories**: Focus on a11y features
- **Responsive Stories**: Different screen sizes

### API Documentation

- **Props Table**: All properties with types and defaults
- **Events Table**: All dispatched events
- **Slots Table**: Available content slots
- **Examples**: Real-world usage patterns
- **Best Practices**: Common pitfalls and solutions

### Code Examples

- Use **TypeScript** for all examples
- Include **import statements**
- Show **complete component usage**
- Provide **error handling** examples
- Include **accessibility** considerations

## Testing Requirements

### Unit Tests

- **Component Rendering**: Verify correct HTML output
- **Props Validation**: Test all prop combinations
- **Event Dispatching**: Verify custom events
- **State Management**: Test internal state changes
- **Edge Cases**: Test with invalid props

### Integration Tests

- **Component Interaction**: Test component communication
- **Theme Switching**: Verify theme changes
- **Responsive Behavior**: Test at different screen sizes
- **Light Source Positioning**: Test lighting system

### Accessibility Tests

- **Screen Reader**: Test with NVDA, JAWS, VoiceOver
- **Keyboard Navigation**: Test all interactive elements
- **Color Contrast**: Verify contrast ratios
- **Focus Management**: Test focus indicators and order

## Theme System Rules

### Token Organization

- **Base Tokens**: Raw values (colors, spacing, typography)
- **Semantic Tokens**: Named values (`--color-primary`, `--spacing-md`)
- **Component Tokens**: Component-specific values (`--button-padding`)
- **Theme Tokens**: Theme-specific overrides

### Color Calculations

- Use **CSS color-mix()** for dynamic color generation
- Base all colors on **hue variables**: `--hue-blue`, `--hue-red`
- Use **tonal variants**: `--hue-blue-lightest`, `--hue-blue-darkest`
- Calculate intermediate values: `color-mix(--hue-blue 60%, --hue-blue-darkest 40%)`

### Lighting System Rules

- **Light Source**: Global position and color variables
- **Element Positioning**: Track component position for shadow direction
- **Shadow Calculation**: Multiple layered shadows for realism
- **Performance**: Cache calculations and use CSS custom properties

## Component Architecture Rules

### Props Design

- Use **primitive types** when possible
- Provide **sensible defaults** for all props
- Use **union types** for variant props
- Make **required props** explicit in type definitions
- Use **boolean props** for simple toggles

### Event Handling

- Dispatch **CustomEvent** for all user interactions
- Include **event detail** with relevant data
- Use **preventDefault()** when appropriate
- Provide **cancelable events** for complex interactions

### Styling Approach

- Use **CSS custom properties** for themeable values
- Implement **BEM methodology** for component styles
- Use **logical properties** for RTL support
- Provide **CSS parts** for external styling
- Use **CSS layers** for specificity management

### Composition Patterns

- Use **slots** for content injection
- Provide **named slots** for complex layouts
- Use **CSS parts** for style customization
- Implement **container queries** for responsive behavior

## Responsive Design Rules

### Fluid Scaling

- Use **clamp()** for fluid typography and spacing
- Implement **constrained scaling** with min/max values
- Use **container queries** for component-level responsiveness
- Avoid **fixed breakpoints** when possible

### Breakpoint Strategy

- Use **content-based breakpoints** over device-based
- Implement **mobile-first** approach
- Use **logical breakpoints**: `--breakpoint-sm`, `--breakpoint-md`
- Test **edge cases** at all screen sizes

## Internationalization Rules

### RTL Support

- Use **logical properties**: `margin-block-start`, `padding-inline-end`
- Implement **bidirectional text** support
- Test **RTL layouts** for all components
- Use **CSS logical values**: `start`, `end`, `block`, `inline`

### Localization

- Support **text direction** changes
- Use **flexible layouts** for different text lengths
- Implement **cultural considerations** in design
- Provide **translation-ready** content slots

## Cursor Rules

### SVG Implementation

- Use **SVG cursors** for theme integration
- Control **cursor colors** with design tokens
- Scale **cursor sizes** with sizing tokens
- Provide **high contrast** alternatives for accessibility

### Context Awareness

- Different **cursors for different interactions**
- **Loading states** with appropriate cursors
- **Disabled states** with clear visual feedback
- **Drag and drop** cursors for interactive elements
