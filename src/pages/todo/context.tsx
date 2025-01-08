'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { Todo, TodoFilters } from './types';
import dayjs from 'dayjs';
import TodoService from './ApiService';

interface TodoContextType {
  todoList: Todo[];
  currentTodo: Todo | null;
  setCurrentTodo: Dispatch<SetStateAction<Todo | null>>;
  loadTodoList: () => void;
  showTodoDetail: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  function loadTodoList() {
    const todoList = TodoService.getTodoList();
    setTodoList(todoList);
  }

  function showTodoDetail(id: string) {
    const todo = todoList.find((todo) => todo.id === id);
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
