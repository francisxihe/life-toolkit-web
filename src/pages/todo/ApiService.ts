import dayjs from 'dayjs';
import { Todo } from './types';

export default class TodoService {
  static getTodoList() {
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
    return todoList;
  }

  static addTodo(todo: Omit<Todo, 'id' | 'status' | 'createdAt'>) {
    const todoList = this.getTodoList();
    const newTodo = {
      id: Math.random().toString(36).substring(7),
      status: 'todo',
      createdAt: new Date().toISOString(),
      ...todo,
    };
    localStorage.setItem('todoList', JSON.stringify([...todoList, newTodo]));
    return newTodo;
  }

  static updateTodo(id: string, todo: Partial<Todo>) {
    const todoList = this.getTodoList();

    localStorage.setItem(
      'todoList',
      JSON.stringify(todoList.map((t) => (t.id === id ? { ...t, ...todo } : t)))
    );
  }

  static doneTodo(id: string) {
    const todoList = this.getTodoList();

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
  }

  static restoreTodo(id: string) {
    const todoList = this.getTodoList();
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
  }

  static deleteTodo(id: string) {
    const todoList = this.getTodoList();

    localStorage.setItem(
      'todoList',
      JSON.stringify(todoList.filter((todo) => todo.id !== id))
    );
  }

  static abandonTodo(id: string) {
    const todoList = this.getTodoList();

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
  }
}
