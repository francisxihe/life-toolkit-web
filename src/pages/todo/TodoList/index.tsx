'use client';

import { TodoFilters } from './TodoFilters';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';
import { TodoStats } from './TodoStats';

export default function TodoPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold py-3">代办列表</div>
      </div>

      <TodoStats />
      <TodoFilters />
      <TodoForm />
      <TodoList todoList={[]} />
    </div>
  );
}
