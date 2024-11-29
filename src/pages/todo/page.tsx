'use client';

import TodoLayout from './layout';
import { TodoFilters } from './components/todo-filters';
import { TodoList } from './components/todo-list';
import { TodoForm } from './components/todo-form';
import { TodoStats } from './components/todo-stats';

export default function TodoPage() {
  return (
    <TodoLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Todo List</h1>
        </div>

        <TodoStats />
        <TodoFilters />
        <TodoForm />
        <TodoList />
      </div>
    </TodoLayout>
  );
}
