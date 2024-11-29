export const IMPORTANCE_LEVELS = {
  low: 'Low Importance',
  medium: 'Medium Importance',
  high: 'High Importance',
} as const;

export const URGENCY_LEVELS = {
  low: 'Low Urgency',
  medium: 'Medium Urgency',
  high: 'High Urgency',
} as const;

export const RECURRENCE_PATTERNS = {
  none: 'No Recurrence',
  daily: 'Daily',
  weekdays: 'Every Weekday',
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
  if (importance === 'high' && urgency !== 'high') return 'Important';
  if (importance !== 'high' && urgency === 'high') return 'Urgent';
  return 'Regular';
}
