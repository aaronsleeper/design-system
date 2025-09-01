// Token Types
// Type definitions for design tokens

export interface ColorToken {
  name: string;
  value: string;
  category: 'hue' | 'semantic' | 'neutral';
}

export interface SpacingToken {
  name: string;
  value: string;
  multiplier: number;
}

export interface TypographyToken {
  name: string;
  value: string;
  category: 'size' | 'weight' | 'line-height' | 'letter-spacing';
}

export interface BorderToken {
  name: string;
  value: string;
  category: 'width' | 'style' | 'radius';
}

export interface ShadowToken {
  name: string;
  value: string;
  category: 'box-shadow' | 'text-shadow';
}
