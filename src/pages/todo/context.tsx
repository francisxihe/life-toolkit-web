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

interface TodoContextType {
  todoList: Todo[];
  currentTodo: Todo | null;
  setCurrentTodo: Dispatch<SetStateAction<Todo | null>>;
  getTodoList: () => void;
  addTodo: (todo: Omit<Todo, 'id' | 'status' | 'createdAt'>) => void;
  doneTodo: (id: string) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  restoreTodo: (id: string) => void;
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

  function addTodo(todo: Omit<Todo, 'id' | 'status'>) {
    const newTodo = {
      id: Math.random().toString(36).substring(7),
      status: 'todo',
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

  function doneTodo(id: string) {
    localStorage.setItem(
      'todoList',
      JSON.stringify(
        todoList.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                status: 'done',
                doneAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              }
            : todo
        )
      )
    );
    getTodoList();
  }

  function restoreTodo(id: string) {
    localStorage.setItem(
      'todoList',
      JSON.stringify(
        todoList.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                status: 'todo',
                doneAt: undefined,
              }
            : todo
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
                status: 'abandoned',
                abandonedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
        doneTodo,
        restoreTodo,
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
