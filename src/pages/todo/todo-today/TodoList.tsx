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
          <FlexibleContainer direction="vertical">
            <FlexibleContainer.Shrink>
              <div className="flex items-start w-full gap-2">
                <div
                  className={`${styles['custom-checkbox-wrapper']} flex items-center h-7`}
                >
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                </div>
                <div>
                  <Input
                    value={todo.task}
                    onChange={(value) => {
                      updateTodo(todo.id, {
                        task: value,
                      });
                    }}
                    type="primary"
                    size="small"
                    className="text-body !bg-transparent !border-none !px-0"
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? 'var(--color-text-3)' : 'inherit',
                    }}
                  ></Input>
                  {todo.description && (
                    <Paragraph
                      className="text-body-1 !mb-0.5"
                      style={{
                        textDecoration: todo.completed
                          ? 'line-through'
                          : 'none',
                        color: 'var(--color-text-3)',
                      }}
                    >
                      {todo.description}
                    </Paragraph>
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
                  {isToday(todo.planDate) || (
                    <Space>
                      {/* <Text type="secondary">
                   优先级:
                   {getPriorityQuadrant(todo.importance, todo.urgency)}
                 </Text> */}
                      {
                        <Text type="error" className="text-body-2">
                          {todo.planDate}&nbsp;
                          {todo.planStartAt && todo.planEndAt && (
                            <>
                              {todo.planStartAt}-{todo.planEndAt}
                            </>
                          )}
                        </Text>
                      }
                    </Space>
                  )}
                </div>
              </div>
            </FlexibleContainer.Shrink>
            <FlexibleContainer.Fixed>
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
            </FlexibleContainer.Fixed>
          </FlexibleContainer>
        </div>
      ))}
    </div>
  );
}
