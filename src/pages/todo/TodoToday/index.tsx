import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';
import { TodoStats } from './TodoStats';
import { useTodoContext } from '../context/todo-context';
import { useMemo } from 'react';
import dayjs from 'dayjs';

const today = dayjs().format('YYYY-MM-DD');
export default function TodoPage() {
  const { todoList } = useTodoContext();

  const todayDoneTodos = useMemo(() => {
    return todoList.filter(
      (todo) => todo.completed && dayjs(todo.completedAt).isSame(today, 'day')
    );
  }, [todoList]);

  const todayTodos = useMemo(() => {
    return todoList.filter(
      (todo) => !todo.completed && dayjs(todo.startDate).isSame(today, 'day')
    );
  }, [todoList]);

  const expiredTodos = useMemo(() => {
    return todoList.filter(
      (todo) => !todo.completed && dayjs(todo.startDate).isBefore(today, 'day')
    );
  }, [todoList]);

  return (
    <div className="bg-white rounded-lg">
      <div className="px-4 py-2 flex justify-between items-center border-b border-gray-100">
        <div className="text-2xl font-bold py-3">代办列表</div>
      </div>

      <div className="px-4 py-2 flex">
        <div className="flex-1">
          <TodoForm />
          {expiredTodos.length > 0 && (
            <>
              <div className="text-sm text-gray-500">已过期</div>
              <TodoList todoList={expiredTodos} />
            </>
          )}
          {todayTodos.length > 0 && (
            <>
              <div className="text-sm text-gray-500">今天</div>
              <TodoList todoList={todayTodos} />
            </>
          )}
          {todayDoneTodos.length > 0 && (
            <>
              <div className="text-sm text-gray-500">已完成</div>
              <TodoList todoList={todayDoneTodos} />
            </>
          )}
        </div>
        <div className="flex-1">
          <TodoStats />
        </div>
      </div>
    </div>
  );
}
