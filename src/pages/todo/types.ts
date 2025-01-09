import { Todo } from './service/types';

export type TodoFormData = {
  name: string;
  description?: string;
  status?: Todo['status'];
  tags?: string[];
  importance?: number;
  urgency?: number;
  planDate: string;
  planTimeRange?: [string, string];
  recurring?: Todo['recurring'];
  subTodoList: SubTodoFormData[];
};

export type SubTodoFormData = {
  name: string;
  description?: string;
  status?: Todo['status'];
  tags?: string[];
  importance?: number;
  urgency?: number;
  planTimeRange?: [string, string];
  subTodoList: SubTodoFormData[];
};
