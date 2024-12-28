export const IMPORTANCE_LEVELS = {
  low: '低',
  medium: '中',
  high: '高',
} as const;

export const URGENCY_LEVELS = {
  low: '低',
  medium: '中',
  high: '高',
} as const;

export const RECURRENCE_PATTERNS = {
  none: '不重复',
  daily: '每日',
  weekdays: '每周工作日',
  weekly: '每周',
  monthly: '每月',
  yearly: '每年',
  custom: '自定义',
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
