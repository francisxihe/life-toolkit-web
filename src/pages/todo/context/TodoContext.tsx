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
  currentTodo: Todo | null;
  setCurrentTodo: Dispatch<SetStateAction<Todo | null>>;
  getTodoList: () => void;
  addTodo: (todo: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  abandonTodo: (id: string) => void;
  showTodoDetail: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  function getTodoList() {
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
    setTodoList(todoList);
  }

  function addTodo(todo: Omit<Todo, 'id' | 'completed'>) {
    const newTodo = {
      id: Math.random().toString(36).substring(7),
      completed: false,
      createdAt: new Date().toISOString(),
      ...todo,
    };
    localStorage.setItem('todoList', JSON.stringify([...todoList, newTodo]));
    getTodoList();
  }

  function updateTodo(id: string, todo: Partial<Todo>) {
    localStorage.setItem(
      'todoList',
      JSON.stringify(todoList.map((t) => (t.id === id ? { ...t, ...todo } : t)))
    );
    getTodoList();
  }

  function toggleTodo(id: string) {
    localStorage.setItem(
      'todoList',
      JSON.stringify(
        todoList.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    );
    getTodoList();
  }

  function deleteTodo(id: string) {
    localStorage.setItem(
      'todoList',
      JSON.stringify(todoList.filter((todo) => todo.id !== id))
    );
    getTodoList();
  }

  function abandonTodo(id: string) {
    localStorage.setItem(
      'todoList',
      JSON.stringify(
        todoList.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                abandoned: true,
                abandonedAt: new Date().toISOString(),
              }
            : todo
        )
      )
    );
    getTodoList();
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
        getTodoList,
        addTodo,
        toggleTodo,
        deleteTodo,
        abandonTodo,
        updateTodo,
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
