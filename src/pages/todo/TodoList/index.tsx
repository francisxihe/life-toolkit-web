'use client';

import { TodoFilters } from './TodoFilters';
import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';
import { TodoStats } from './TodoStats';

export default function TodoPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Todo List</h1>
      </div>

      <TodoStats />
      <TodoFilters />
      <TodoForm />
      <TodoList />
    </div>
  );
}
