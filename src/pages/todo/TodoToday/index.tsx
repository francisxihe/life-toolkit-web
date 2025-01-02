import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';
import { useTodoContext } from '../context/TodoContext';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import FlexibleContainer from '@/components/FlexibleContainer';

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
      (todo) =>
        !todo.completed && dayjs(todo.startDateTime).isSame(today, 'day')
    );
  }, [todoList]);

  const expiredTodos = useMemo(() => {
    return todoList.filter(
      (todo) =>
        !todo.completed && dayjs(todo.startDateTime).isBefore(today, 'day')
    );
  }, [todoList]);

  return (
    <FlexibleContainer className="bg-white rounded-lg w-full h-full">
      <FlexibleContainer.Fixed className="px-4 py-2 flex justify-between items-center border-b border-gray-100">
        <div className="text-2xl font-bold py-3">今日代办</div>
      </FlexibleContainer.Fixed>

      <FlexibleContainer.Shrink className="px-4 py-2 w-full h-full">
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
      </FlexibleContainer.Shrink>
    </FlexibleContainer>
  );
}
