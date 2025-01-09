'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { Todo } from './service/types';
import TodoService from './service/api';
import { GetTodoListParams } from './service/types';

interface TodoContextType {
  todoList: Todo[];
  currentTodo: Todo | null;
  setCurrentTodo: Dispatch<SetStateAction<Todo | null>>;
  loadTodoList: (params?: GetTodoListParams) => Promise<void>;
  showTodoDetail: (todo: Todo) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  async function loadTodoList(params?: GetTodoListParams) {
    const todoList = await TodoService.getTodoList(params);
    setTodoList(todoList);
  }

  function showTodoDetail(todo: Todo) {
    setCurrentTodo(todo);
  }

  return (
    <TodoContext.Provider
      value={{
        todoList,
        currentTodo,
        setCurrentTodo,
        loadTodoList,
        showTodoDetail,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
