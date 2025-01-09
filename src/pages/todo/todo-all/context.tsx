'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { Todo } from '../service/types';
import TodoService from '../service/api';
import { TodoFilters } from '../types';
import { createInjectState } from '@/utils/createInjectState';

export const { Provider: TodoAllProvider, useInjectState: useTodoAllContext } =
  createInjectState<{
    todoList: Todo[];
    getTodoList: () => Promise<void>;
    filters: TodoFilters;
    setFilters: Dispatch<SetStateAction<TodoFilters>>;
  }>(() => {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    const [filters, setFilters] = useState<TodoFilters>({
      keyword: '',
      importance: undefined,
      urgency: undefined,
      status: undefined,
      planDateStart: undefined,
      planDateEnd: undefined,
      doneDateStart: undefined,
      doneDateEnd: undefined,
      abandonedDateStart: undefined,
      abandonedDateEnd: undefined,
      tags: [],
    });

    async function getTodoList() {
      const todoList = await TodoService.getTodoList(filters);
      setTodoList(todoList);
    }

    return { todoList, getTodoList, filters, setFilters };
  });
