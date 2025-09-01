import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Drawer } from './drawer.js';

// Import design system styles
import '../../tokens/colors.scss';
import '../../tokens/spacing.scss';
import '../../tokens/typography.scss';

const meta: Meta<Drawer> = {
  title: 'Navigation/Drawer',
  component: 'ds-drawer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive drawer navigation component with multiple variants, sizes, and states.
Supports overlay, push, and default positioning with proper accessibility features.

## Features
- **Variants**: default, overlay, push
- **Sizes**: small, medium, large, xlarge
- **States**: default, focus, disabled
- **Position**: left, right, top, bottom positioning
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **Events**: Dispatches standardized design system events

## Usage
\`\`\`html
<ds-drawer variant="default" size="medium">
  Navigation content
</ds-drawer>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'overlay', 'push'],
      description: 'Drawer variant style',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Drawer size',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Drawer position',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Whether the drawer is open',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the drawer is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the drawer',
    },
    ariaDescribedBy: {
      control: { type: 'text' },
      description: 'ID of element that describes the drawer',
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    position: 'left',
    open: false,
    disabled: false,
    ariaLabel: 'Navigation drawer',
  },
};

export default meta;
type Story = StoryObj<Drawer>;

// Default story
export const Default: Story = {
  render: args => html`
    <div
      style="position: relative; height: 100vh; background: var(--color-background);"
    >
      <ds-drawer
        variant="${args.variant}"
        size="${args.size}"
        position="${args.position}"
        ?open="${args.open}"
        ?disabled="${args.disabled}"
        aria-label="${args.ariaLabel}"
        aria-describedby="${args.ariaDescribedBy}"
      >
        <div slot="title">Navigation</div>
        <nav>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: var(--spacing-2);">
              <a
                href="#"
                style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
              >
                Dashboard
              </a>
            </li>
            <li style="margin-bottom: var(--spacing-2);">
              <a
                href="#"
                style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
              >
                Projects
              </a>
            </li>
            <li style="margin-bottom: var(--spacing-2);">
              <a
                href="#"
                style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <div slot="footer">
          <button
            style="width: 100%; padding: var(--spacing-2); background: var(--color-primary); color: white; border: none; border-radius: var(--border-radius-sm);"
          >
            Logout
          </button>
        </div>
      </ds-drawer>
      <div style="padding: var(--spacing-4);">
        <h1>Main Content</h1>
        <p>
          This is the main content area. The drawer can be opened to show
          navigation.
        </p>
        <button
          onclick="document.querySelector('ds-drawer').openDrawer()"
          style="padding: var(--spacing-2) var(--spacing-4); background: var(--color-primary); color: white; border: none; border-radius: var(--border-radius-sm);"
        >
          Open Drawer
        </button>
      </div>
    </div>
  `,
};

// Variants
export const Variants: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-4); padding: var(--spacing-4);"
    >
      <div>
        <h3>Default</h3>
        <ds-drawer variant="default" size="medium" position="left" open>
          <div slot="title">Default Drawer</div>
          <p>This is a default drawer variant.</p>
        </ds-drawer>
      </div>
      <div>
        <h3>Overlay</h3>
        <ds-drawer variant="overlay" size="medium" position="left" open>
          <div slot="title">Overlay Drawer</div>
          <p>This is an overlay drawer variant with backdrop.</p>
        </ds-drawer>
      </div>
      <div>
        <h3>Push</h3>
        <ds-drawer variant="push" size="medium" position="left" open>
          <div slot="title">Push Drawer</div>
          <p>This is a push drawer variant.</p>
        </ds-drawer>
      </div>
    </div>
  `,
  parameters: {
    layout: 'padded',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-4); padding: var(--spacing-4);"
    >
      <div>
        <h3>Small</h3>
        <ds-drawer variant="default" size="small" position="left" open>
          <div slot="title">Small</div>
          <p>Small drawer (250px)</p>
        </ds-drawer>
      </div>
      <div>
        <h3>Medium</h3>
        <ds-drawer variant="default" size="medium" position="left" open>
          <div slot="title">Medium</div>
          <p>Medium drawer (300px)</p>
        </ds-drawer>
      </div>
      <div>
        <h3>Large</h3>
        <ds-drawer variant="default" size="large" position="left" open>
          <div slot="title">Large</div>
          <p>Large drawer (400px)</p>
        </ds-drawer>
      </div>
      <div>
        <h3>XLarge</h3>
        <ds-drawer variant="default" size="xlarge" position="left" open>
          <div slot="title">XLarge</div>
          <p>XLarge drawer (500px)</p>
        </ds-drawer>
      </div>
    </div>
  `,
  parameters: {
    layout: 'padded',
  },
};

// Positions
export const Positions: Story = {
  render: () => html`
    <div
      style="position: relative; height: 100vh; background: var(--color-background);"
    >
      <ds-drawer variant="overlay" size="medium" position="left" open>
        <div slot="title">Left Drawer</div>
        <p>This drawer slides in from the left.</p>
      </ds-drawer>
      <ds-drawer variant="overlay" size="medium" position="right" open>
        <div slot="title">Right Drawer</div>
        <p>This drawer slides in from the right.</p>
      </ds-drawer>
      <ds-drawer variant="overlay" size="medium" position="top" open>
        <div slot="title">Top Drawer</div>
        <p>This drawer slides in from the top.</p>
      </ds-drawer>
      <ds-drawer variant="overlay" size="medium" position="bottom" open>
        <div slot="title">Bottom Drawer</div>
        <p>This drawer slides in from the bottom.</p>
      </ds-drawer>
      <div style="padding: var(--spacing-4);">
        <h1>All Positions</h1>
        <p>This example shows all four drawer positions simultaneously.</p>
      </div>
    </div>
  `,
};

// Interactive
export const Interactive: Story = {
  render: () => html`
    <div
      style="position: relative; height: 100vh; background: var(--color-background);"
    >
      <ds-drawer
        id="interactive-drawer"
        variant="overlay"
        size="medium"
        position="left"
      >
        <div slot="title">Interactive Drawer</div>
        <nav>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: var(--spacing-2);">
              <a
                href="#"
                style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
              >
                Home
              </a>
            </li>
            <li style="margin-bottom: var(--spacing-2);">
              <a
                href="#"
                style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
              >
                About
              </a>
            </li>
            <li style="margin-bottom: var(--spacing-2);">
              <a
                href="#"
                style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div slot="footer">
          <button
            onclick="document.getElementById('interactive-drawer').closeDrawer()"
            style="width: 100%; padding: var(--spacing-2); background: var(--color-secondary); color: white; border: none; border-radius: var(--border-radius-sm);"
          >
            Close Drawer
          </button>
        </div>
      </ds-drawer>
      <div style="padding: var(--spacing-4);">
        <h1>Interactive Example</h1>
        <p>Click the buttons below to interact with the drawer.</p>
        <div
          style="display: flex; gap: var(--spacing-2); margin-top: var(--spacing-4);"
        >
          <button
            onclick="document.getElementById('interactive-drawer').openDrawer()"
            style="padding: var(--spacing-2) var(--spacing-4); background: var(--color-primary); color: white; border: none; border-radius: var(--border-radius-sm);"
          >
            Open Drawer
          </button>
          <button
            onclick="document.getElementById('interactive-drawer').closeDrawer()"
            style="padding: var(--spacing-2) var(--spacing-4); background: var(--color-secondary); color: white; border: none; border-radius: var(--border-radius-sm);"
          >
            Close Drawer
          </button>
          <button
            onclick="document.getElementById('interactive-drawer').toggle()"
            style="padding: var(--spacing-2) var(--spacing-4); background: var(--color-success); color: white; border: none; border-radius: var(--border-radius-sm);"
          >
            Toggle Drawer
          </button>
        </div>
      </div>
    </div>
  `,
};

// Accessibility
export const Accessibility: Story = {
  render: () => html`
    <div
      style="position: relative; height: 100vh; background: var(--color-background);"
    >
      <ds-drawer
        variant="overlay"
        size="medium"
        position="left"
        open
        aria-label="Accessible navigation drawer"
        aria-describedby="drawer-description"
      >
        <div slot="title">Accessible Drawer</div>
        <div
          id="drawer-description"
          style="margin-bottom: var(--spacing-4); padding: var(--spacing-2); background: var(--color-info-light); border-radius: var(--border-radius-sm);"
        >
          This drawer demonstrates proper accessibility features including ARIA
          labels, keyboard navigation, and screen reader support.
        </div>
        <nav role="navigation" aria-label="Main navigation">
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: var(--spacing-2);">
              <a
                href="#"
                style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
                aria-current="page"
              >
                Current Page
              </a>
            </li>
            <li style="margin-bottom: var(--spacing-2);">
              <a
                href="#"
                style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
              >
                Other Page
              </a>
            </li>
          </ul>
        </nav>
        <div slot="footer">
          <button
            style="width: 100%; padding: var(--spacing-2); background: var(--color-primary); color: white; border: none; border-radius: var(--border-radius-sm);"
            aria-describedby="logout-description"
          >
            Logout
          </button>
          <div
            id="logout-description"
            style="margin-top: var(--spacing-1); font-size: var(--font-size-1); color: var(--color-text-secondary);"
          >
            Sign out of your account
          </div>
        </div>
      </ds-drawer>
      <div style="padding: var(--spacing-4);">
        <h1>Accessibility Features</h1>
        <ul>
          <li>Proper ARIA labels and descriptions</li>
          <li>Keyboard navigation support (Escape to close)</li>
          <li>Screen reader announcements</li>
          <li>Focus management</li>
          <li>Semantic HTML structure</li>
        </ul>
        <p>
          <strong>Try:</strong> Use Tab to navigate, Escape to close, and screen
          reader to test announcements.
        </p>
      </div>
    </div>
  `,
};

// States
export const States: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--spacing-4); padding: var(--spacing-4);"
    >
      <div>
        <h3>Open State</h3>
        <ds-drawer variant="default" size="medium" position="left" open>
          <div slot="title">Open Drawer</div>
          <p>This drawer is in the open state.</p>
        </ds-drawer>
      </div>
      <div>
        <h3>Closed State</h3>
        <ds-drawer variant="default" size="medium" position="left">
          <div slot="title">Closed Drawer</div>
          <p>This drawer is in the closed state.</p>
        </ds-drawer>
      </div>
      <div>
        <h3>Disabled State</h3>
        <ds-drawer variant="default" size="medium" position="left" disabled>
          <div slot="title">Disabled Drawer</div>
          <p>This drawer is disabled and cannot be interacted with.</p>
        </ds-drawer>
      </div>
      <div>
        <h3>Focus State</h3>
        <ds-drawer variant="default" size="medium" position="left" open>
          <div slot="title">Focused Drawer</div>
          <p>This drawer can receive focus for keyboard navigation.</p>
        </ds-drawer>
      </div>
    </div>
  `,
  parameters: {
    layout: 'padded',
  },
};

// Complex Content
export const ComplexContent: Story = {
  render: () => html`
    <div
      style="position: relative; height: 100vh; background: var(--color-background);"
    >
      <ds-drawer variant="overlay" size="large" position="left" open>
        <div slot="title">Complex Navigation</div>
        <div style="overflow-y: auto; max-height: 60vh;">
          <nav>
            <div style="margin-bottom: var(--spacing-4);">
              <h4
                style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
              >
                Main
              </h4>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: var(--spacing-1);">
                  <a
                    href="#"
                    style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
                  >
                    Dashboard
                  </a>
                </li>
                <li style="margin-bottom: var(--spacing-1);">
                  <a
                    href="#"
                    style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
                  >
                    Analytics
                  </a>
                </li>
              </ul>
            </div>
            <div style="margin-bottom: var(--spacing-4);">
              <h4
                style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
              >
                Projects
              </h4>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: var(--spacing-1);">
                  <a
                    href="#"
                    style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
                  >
                    Project Alpha
                  </a>
                </li>
                <li style="margin-bottom: var(--spacing-1);">
                  <a
                    href="#"
                    style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
                  >
                    Project Beta
                  </a>
                </li>
                <li style="margin-bottom: var(--spacing-1);">
                  <a
                    href="#"
                    style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
                  >
                    Project Gamma
                  </a>
                </li>
              </ul>
            </div>
            <div style="margin-bottom: var(--spacing-4);">
              <h4
                style="margin: 0 0 var(--spacing-2) 0; color: var(--color-text-secondary); font-size: var(--font-size-2);"
              >
                Settings
              </h4>
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: var(--spacing-1);">
                  <a
                    href="#"
                    style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
                  >
                    Profile
                  </a>
                </li>
                <li style="margin-bottom: var(--spacing-1);">
                  <a
                    href="#"
                    style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
                  >
                    Preferences
                  </a>
                </li>
                <li style="margin-bottom: var(--spacing-1);">
                  <a
                    href="#"
                    style="color: var(--color-text-primary); text-decoration: none; padding: var(--spacing-2); display: block; border-radius: var(--border-radius-sm);"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div slot="footer">
          <div style="display: flex; gap: var(--spacing-2);">
            <button
              style="flex: 1; padding: var(--spacing-2); background: var(--color-primary); color: white; border: none; border-radius: var(--border-radius-sm);"
            >
              Save
            </button>
            <button
              style="flex: 1; padding: var(--spacing-2); background: var(--color-secondary); color: white; border: none; border-radius: var(--border-radius-sm);"
            >
              Cancel
            </button>
          </div>
        </div>
      </ds-drawer>
      <div style="padding: var(--spacing-4);">
        <h1>Complex Content Example</h1>
        <p>
          This drawer contains complex navigation with multiple sections,
          scrollable content, and action buttons.
        </p>
      </div>
    </div>
  `,
};

// Events
export const Events: Story = {
  render: () => html`
    <div
      style="position: relative; height: 100vh; background: var(--color-background);"
    >
      <ds-drawer
        id="events-drawer"
        variant="overlay"
        size="medium"
        position="left"
      >
        <div slot="title">Event Testing</div>
        <p>
          This drawer demonstrates event handling. Check the console for events.
        </p>
        <div slot="footer">
          <button
            onclick="document.getElementById('events-drawer').closeDrawer()"
            style="width: 100%; padding: var(--spacing-2); background: var(--color-secondary); color: white; border: none; border-radius: var(--border-radius-sm);"
          >
            Close Drawer
          </button>
        </div>
      </ds-drawer>
      <div style="padding: var(--spacing-4);">
        <h1>Event Handling</h1>
        <p>
          This example demonstrates the drawer's event system. Open the browser
          console to see events being dispatched.
        </p>
        <div
          style="display: flex; gap: var(--spacing-2); margin-top: var(--spacing-4);"
        >
          <button
            onclick="document.getElementById('events-drawer').openDrawer()"
            style="padding: var(--spacing-2) var(--spacing-4); background: var(--color-primary); color: white; border: none; border-radius: var(--border-radius-sm);"
          >
            Open Drawer
          </button>
          <button
            onclick="document.getElementById('events-drawer').closeDrawer()"
            style="padding: var(--spacing-2) var(--spacing-4); background: var(--color-secondary); color: white; border: none; border-radius: var(--border-radius-sm);"
          >
            Close Drawer
          </button>
        </div>
        <div
          id="event-log"
          style="margin-top: var(--spacing-4); padding: var(--spacing-2); background: var(--color-gray-100); border-radius: var(--border-radius-sm); font-family: monospace; font-size: var(--font-size-2);"
        >
          <strong>Event Log:</strong><br />
          <div id="events"></div>
        </div>
      </div>
    </div>
    <script>
      const drawer = document.getElementById('events-drawer');
      const eventsDiv = document.getElementById('events');

      const eventTypes = [
        'ds-drawer-render',
        'ds-drawer-toggle',
        'ds-drawer-focus',
        'ds-drawer-blur',
      ];

      eventTypes.forEach(eventType => {
        drawer.addEventListener(eventType, event => {
          const timestamp = new Date().toLocaleTimeString();
          const eventInfo = \`[\${timestamp}] \${eventType}: \${JSON.stringify(
            event.detail.data
          )}\`;
          eventsDiv.innerHTML += eventInfo + '<br>';
          console.log(eventType, event.detail);
        });
      });
    </script>
  `,
};
