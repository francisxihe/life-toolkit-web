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
import { GetTodoListParams, TodoFilters } from '../service/types';
import { createInjectState } from '@/utils/createInjectState';

export const { Provider: TodoAllProvider, useInjectState: useTodoAllContext } =
  createInjectState<{
    todoList: Todo[];
    getTodoList: () => Promise<void>;
    filters: TodoFilters;
    setFilters: Dispatch<SetStateAction<TodoFilters>>;
  }>(() => {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    async function getTodoList() {
      const todoList = await TodoService.getTodoList();
      setTodoList(todoList);
    }

    const [filters, setFilters] = useState<TodoFilters>({
      search: '',
      importance: undefined,
      urgency: undefined,
      status: undefined,
      tags: [],
    });

    return { todoList, getTodoList, filters, setFilters };
  });
