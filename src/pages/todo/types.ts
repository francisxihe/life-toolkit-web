import * as z from 'zod';

export interface TodoFilters {
  search: string;
  importance: string;
  urgency: string;
  status: string;
  tags: string[];
}

export const todoSchema = z.object({
  task: z.string().min(1, { message: 'Task cannot be empty' }),
  description: z.string().optional(),
  importance: z.enum(['low', 'medium', 'high']),
  urgency: z.enum(['low', 'medium', 'high']),
  startDateTime: z.string(),
  endDateTime: z.string(),
  recurring: z.string(),
  customDays: z.string().optional(),
  tags: z.array(z.string()),
});

export type TodoFormData = z.infer<typeof todoSchema>;

export interface Todo {
  id: string;
  /** 待办名称 */
  task: string;
  /** 待办描述 */
  description?: string;
  /** 待办重要程度 */
  importance?: number;
  /** 待办紧急程度 */
  urgency?: number;
  /** 待办标签 */
  tags: string[];
  /** 待办是否完成 */
  completed: boolean;
  /** 待办开始时间 */
  startAt?: string;
  /** 待办完成时间 */
  completedAt?: string;
  /** 计划待办日期 */
  planDate?: string;
  /** 计划待办开始时间 */
  planStartAt?: string;
  /** 计划待办结束时间 */
  planEndAt?: string;
  /** 待办创建时间 */
  createdAt: string;
  /** 待办是否是重复待办 */
  recurring?: string;
  /** 待办是否是放弃待办 */
  abandoned?: boolean;
  /** 放弃待办时间 */
  abandonedAt?: string;
}
