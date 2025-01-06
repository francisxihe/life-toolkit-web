'use client';

import {
  Checkbox,
  Card,
  Tag,
  Space,
  Typography,
  Input,
  Popover,
} from '@arco-design/web-react';
import { useTodoContext } from '../context/TodoContext';
import { Todo } from '../types';
import styles from './style.module.less';
import { isToday } from 'date-fns';
import FlexibleContainer from '@/components/FlexibleContainer';

const { Text, Paragraph } = Typography;

export function TodoList({ todoList }: { todoList: Todo[] }) {
  const { toggleTodo, deleteTodo, abandonTodo, updateTodo } = useTodoContext();

  return (
    <div className="w-full">
      {todoList.map((todo) => (
        <div
          className={'w-full border-b px-4 py-2 bg-background'}
          key={todo.id}
        >
          <FlexibleContainer direction="vertical" className="gap-2 items-start">
            <FlexibleContainer.Fixed className="flex items-start ">
              <div className="h-7 flex items-center">
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
              </div>
            </FlexibleContainer.Fixed>
            <FlexibleContainer.Shrink>
              <div>{todo.name}</div>
              {todo.description && (
                <Paragraph
                  className="text-body-1 !mb-0.5"
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: 'var(--color-text-3)',
                  }}
                >
                  {todo.description}
                </Paragraph>
              )}
              <div className="text-body-2">
                {/* <Text type="secondary">
                   优先级:
                   {getPriorityQuadrant(todo.importance, todo.urgency)}
                 </Text> */}
                {!isToday(todo.planDate) && (
                  <Text type="error">
                    {todo.planDate}{' '}
                    {todo.planStartAt && todo.planEndAt && (
                      <>
                        {todo.planStartAt}-{todo.planEndAt}
                      </>
                    )}
                  </Text>
                )}
                {todo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {todo.tags.map((tag, index) => (
                      <Tag key={index} color="arcoblue">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>
            </FlexibleContainer.Shrink>
            <FlexibleContainer.Fixed>
              <div className="h-7 flex items-center">
                <Popover
                  trigger="click"
                  content={
                    <div className="w-40">
                      <div
                        className="cursor-pointer px-3 h-9 leading-9 hover:bg-fill-2"
                        onClick={() => abandonTodo(todo.id)}
                      >
                        放弃
                      </div>
                      <div
                        className="cursor-pointer px-3 h-9 leading-9 hover:bg-fill-2"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        删除
                      </div>
                    </div>
                  }
                >
                  <svg width={16} height={16}>
                    <use href={`/public/icons.svg#more-for-task`} />
                  </svg>
                </Popover>
              </div>
            </FlexibleContainer.Fixed>
          </FlexibleContainer>
        </div>
      ))}
    </div>
  );
}
