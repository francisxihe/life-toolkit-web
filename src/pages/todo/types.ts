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
  task: string;
  endDateTime: string;
  description?: string;
  importance: 'high' | 'low';
  urgency: 'high' | 'low';
  tags: string[];
  completed: boolean;
  startDate: string | Date;
  completedAt: string | Date;
}
