export interface Todo {
  id: number;
  task: string;
  description?: string;
  importance: 'high' | 'low';
  urgency: 'high' | 'low';
  tags: string[];
  completed: boolean;
  startDate: string | Date;
  completedAt: string | Date;
}

export interface TodoFilters {
  search: string;
  importance: 'all' | 'low' | 'medium' | 'high';
  urgency: 'all' | 'low' | 'medium' | 'high';
  status: 'all' | 'completed' | 'pending';
  tags: string[];
}
