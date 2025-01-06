export const IMPORTANCE_MAP = new Map([
  [
    1,
    {
      color: 'danger',
      label: '非常重要',
    },
  ],
  [
    2,
    {
      color: 'warning',
      label: '重要',
    },
  ],
  [
    3,
    {
      color: 'success',
      label: '一般',
    },
  ],
]);

export const URGENCY_MAP = new Map([
  [
    1,
    {
      color: 'danger',
      label: '非常紧急',
    },
  ],
  [
    2,
    {
      color: 'warning',
      label: '紧急',
    },
  ],
  [
    3,
    {
      color: 'success',
      label: '一般',
    },
  ],
]);

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
  if (importance === 'high' && urgency === 'high') return '紧急且重要';
  if (importance === 'high' && urgency !== 'high') return '重要';
  if (importance !== 'high' && urgency === 'high') return '紧急';
  return '常规';
}
