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
  addTodo: (todo: Omit<Todo, 'id' | 'completed'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<Todo[]>([]);
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
        ...todo,
        id: Math.random().toString(36).substring(7),
        completed: false,
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

  return (
    <TodoContext.Provider
      value={{
        todoList,
        filters,
        setFilters,
        addTodo,
        toggleTodo,
        deleteTodo,
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
