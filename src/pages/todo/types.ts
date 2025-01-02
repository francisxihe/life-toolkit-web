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
  /** 任务名称 */
  task: string;
  /** 任务描述 */
  description?: string;
  /** 任务重要程度 */
  importance?: 'low' | 'medium' | 'high';
  /** 任务紧急程度 */
  urgency?: 'high' | 'medium' | 'low';
  /** 任务标签 */
  tags: string[];
  /** 任务是否完成 */
  completed: boolean;
  /** 预计任务开始时间 */
  startDateTime?: string;
  /** 预计任务结束时间 */
  endDateTime?: string;
  /** 任务开始时间 */
  startAt?: string;
  /** 任务完成时间 */
  completedAt?: string;
  /** 任务创建时间 */
  createdAt: string;
  /** 任务是否是重复任务 */
  recurring?: string;
  /** 任务是否是放弃任务 */
  abandoned?: boolean;
  /** 放弃任务时间 */
  abandonedAt?: string;
}
