import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm/TodoForm';
import { useTodoContext } from '../context/TodoContext';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import FlexibleContainer from '@/components/FlexibleContainer';
import { Collapse } from '@arco-design/web-react';
import styles from './style.module.less';

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
      (todo) => !todo.completed && dayjs(todo.planDate).isSame(today, 'day')
    );
  }, [todoList]);

  const expiredTodos = useMemo(() => {
    return todoList.filter(
      (todo) => !todo.completed && dayjs(todo.planDate).isBefore(today, 'day')
    );
  }, [todoList]);

  return (
    <FlexibleContainer className="bg-background-2 rounded-lg w-full h-full">
      <FlexibleContainer.Fixed className="px-5 py-2 flex justify-between items-center border-b">
        <div className="text-text-1 text-title-3 font-bold py-1">今日待办</div>
      </FlexibleContainer.Fixed>

      <FlexibleContainer.Shrink className="px-5 py-2 w-full h-full">
        <TodoForm />

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
        </Collapse>
      </FlexibleContainer.Shrink>
    </FlexibleContainer>
  );
}
