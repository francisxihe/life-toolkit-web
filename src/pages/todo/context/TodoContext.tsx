'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { Todo, TodoFilters } from '../types';

interface TodoContextType {
  todoList: Todo[];
  filters: TodoFilters;
  setFilters: Dispatch<SetStateAction<TodoFilters>>;
  addTodo: (todo: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  abandonTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      id: '1',
      task: 'test',
      completed: false,
      createdAt: new Date().toISOString(),
      tags: [],
    },
  ]);
  const [filters, setFilters] = useState<TodoFilters>({
    search: '',
    importance: 'all',
    urgency: 'all',
    status: 'all',
    tags: [],
  });

  const addTodo = useCallback((todo: Omit<Todo, 'id' | 'completed'>) => {
    setTodoList((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        completed: false,
        createdAt: new Date().toISOString(),
        ...todo,
      },
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const abandonTodo = useCallback((id: string) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, abandoned: true, abandonedAt: new Date().toISOString() }
          : todo
      )
    );
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        filters,
        setFilters,
        addTodo,
        toggleTodo,
        deleteTodo,
        abandonTodo,
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
