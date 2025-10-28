import { WheelOption } from './types';

export const SPIN_DURATION_S = 2; // Very fast spin
export const SPIN_DURATION_MS = SPIN_DURATION_S * 1000;

// A palette of 8 vibrant colors
export const DEFAULT_COLORS = [
  '#f44336', // Red
  '#2196f3', // Blue
  '#4caf50', // Green
  '#ffeb3b', // Yellow
  '#9c27b0', // Purple
  '#ff9800', // Orange
  '#00bcd4', // Cyan
  '#e91e63', // Pink
];

export const INITIAL_OPTIONS: WheelOption[] = [
  { id: crypto.randomUUID(), label: 'Pizza Night', color: DEFAULT_COLORS[0] },
  { id: crypto.randomUUID(), label: 'Movie Marathon', color: DEFAULT_COLORS[1] },
  { id: crypto.randomUUID(), label: 'Go for a Hike', color: DEFAULT_COLORS[2] },
  { id: crypto.randomUUID(), label: 'Learn a Skill', color: DEFAULT_COLORS[3] },
  { id: crypto.randomUUID(), label: 'Read a Book', color: DEFAULT_COLORS[4] },
  { id: crypto.randomUUID(), label: 'Board Games', color: DEFAULT_COLORS[5] },
  { id: crypto.randomUUID(), label: 'Try a Recipe', color: DEFAULT_COLORS[6] },
  { id: crypto.randomUUID(), label: 'Visit a Museum', color: DEFAULT_COLORS[7] },
];
