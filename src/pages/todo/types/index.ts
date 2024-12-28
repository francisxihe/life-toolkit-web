
export interface TodoFilters {
  search: string;
  importance: 'all' | 'low' | 'medium' | 'high';
  urgency: 'all' | 'low' | 'medium' | 'high';
  status: 'all' | 'completed' | 'pending';
  tags: string[];
}
