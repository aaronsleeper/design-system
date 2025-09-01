// Position Tracker
// Tracks element positions for lighting calculations

export class PositionTracker {
  private positions = new Map<HTMLElement, { x: number; y: number }>();

  trackElement(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    this.positions.set(element, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }

  getElementPosition(
    element: HTMLElement
  ): { x: number; y: number } | undefined {
    return this.positions.get(element);
  }
}
