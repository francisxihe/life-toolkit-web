export const IMPORTANCE_LEVELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
} as const;

export const URGENCY_LEVELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
} as const;

export const RECURRENCE_PATTERNS = {
  none: 'No recurrence',
  daily: 'Daily',
  weekdays: 'Every weekday',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
  custom: 'Custom',
} as const;

export function getPriorityQuadrant(
  importance: string,
  urgency: string
): string {
  if (importance === 'high' && urgency === 'high') return 'Critical';
  if (importance === 'high') return 'Important';
  if (urgency === 'high') return 'Urgent';
  return 'Regular';
}
