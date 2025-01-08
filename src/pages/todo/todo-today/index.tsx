import { TodoList } from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import { useTodoContext } from '../context';
import { useMemo, useEffect } from 'react';
import dayjs from 'dayjs';
import FlexibleContainer from '@/components/FlexibleContainer';
import { Collapse, Divider } from '@arco-design/web-react';
import TodoDetail from '../components/TodoDetail';
import styles from './style.module.less';

const today = dayjs().format('YYYY-MM-DD');

export default function TodoPage() {
  const { todoList, currentTodo, loadTodoList } = useTodoContext();

  const todayDoneTodos = useMemo(() => {
    return todoList.filter(
      (todo) =>
        todo.status === 'done' && dayjs(todo.doneAt).isSame(today, 'day')
    );
  }, [todoList]);

  const todayTodos = useMemo(() => {
    return todoList.filter(
      (todo) =>
        todo.status === 'todo' && dayjs(todo.planDate).isSame(today, 'day')
    );
  }, [todoList]);

  const expiredTodos = useMemo(() => {
    return todoList.filter(
      (todo) =>
        todo.status === 'todo' && dayjs(todo.planDate).isBefore(today, 'day')
    );
  }, [todoList]);

  const todayAbandonedTodos = useMemo(() => {
    return todoList.filter(
      (todo) =>
        todo.status === 'abandoned' &&
        dayjs(todo.abandonedAt).isSame(today, 'day')
    );
  }, [todoList]);

  useEffect(() => {
    loadTodoList();
  }, []);

  return (
    <FlexibleContainer className="bg-background-2 rounded-lg w-full h-full">
      <FlexibleContainer.Fixed className="px-5 py-2 flex justify-between items-center border-b">
        <div className="text-text-1 text-title-2 font-[500] py-1">今日待办</div>
      </FlexibleContainer.Fixed>

      <FlexibleContainer.Shrink className="px-5 w-full h-full flex">
        <div className="w-full py-2">
          <AddTodo />
          <Collapse
            defaultActiveKey={['expired', 'today']}
            className={`${styles['custom-collapse']} mt-2`}
            bordered={false}
          >
            {expiredTodos.length > 0 && (
              <Collapse.Item
                header="已过期"
                name="expired"
                contentStyle={{ padding: 0 }}
              >
                <TodoList todoList={expiredTodos} />
              </Collapse.Item>
            )}
            {todayTodos.length > 0 && (
              <Collapse.Item
                header="今天"
                name="today"
                contentStyle={{ padding: 0 }}
              >
                <TodoList todoList={todayTodos} />
              </Collapse.Item>
            )}
            {todayDoneTodos.length > 0 && (
              <Collapse.Item
                header="已完成"
                name="done"
                contentStyle={{ padding: 0 }}
              >
                <TodoList todoList={todayDoneTodos} />
              </Collapse.Item>
            )}
            {todayAbandonedTodos.length > 0 && (
              <Collapse.Item
                header="已放弃"
                name="abandoned"
                contentStyle={{ padding: 0 }}
              >
                <TodoList todoList={todayAbandonedTodos} />
              </Collapse.Item>
            )}
          </Collapse>
        </div>
        {currentTodo && (
          <>
            <Divider type="vertical" className="!h-full" />{' '}
            <div className="w-full py-2">
              <TodoDetail />
            </div>
          </>
        )}
      </FlexibleContainer.Shrink>
    </FlexibleContainer>
  );
}
