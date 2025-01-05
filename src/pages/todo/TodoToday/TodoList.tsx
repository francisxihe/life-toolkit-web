'use client';

import { Checkbox, Card, Tag, Space, Typography } from '@arco-design/web-react';
import { useTodoContext } from '../context/TodoContext';
import { Todo } from '../types';
import { Popover } from '@arco-design/web-react';
import styles from './style.module.less';
import { isToday } from 'date-fns';

const { Text, Paragraph } = Typography;

export function TodoList({ todoList }: { todoList: Todo[] }) {
  const { toggleTodo, deleteTodo, abandonTodo } = useTodoContext();

  return (
    <div className="w-full">
      {todoList.map((todo) => (
        <Card className={'w-full border-b py-0'} key={todo.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Space align="start">
              <Checkbox
                className={styles['custom-checkbox']}
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <div>
                <Paragraph
                  style={{
                    margin: 0,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'var(--color-text-3)' : 'inherit',
                  }}
                >
                  {todo.task}
                </Paragraph>
                {todo.description && (
                  <Paragraph
                    style={{
                      margin: '4px 0',
                      fontSize: '14px',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: 'var(--color-text-3)',
                    }}
                  >
                    {todo.description}
                  </Paragraph>
                )}
                <Space wrap style={{ marginTop: '8px' }}>
                  {todo.tags.map((tag, index) => (
                    <Tag key={index} color="arcoblue">
                      {tag}
                    </Tag>
                  ))}
                </Space>
                <Space style={{ marginTop: '8px' }}>
                  {/* <Text type="secondary">
                    优先级:
                    {getPriorityQuadrant(todo.importance, todo.urgency)}
                  </Text> */}
                  {isToday(todo.planDate) || (
                    <>
                      <Text type="secondary">{todo.planDate}</Text>
                      {todo.planStartAt && todo.planEndAt && (
                        <Text type="secondary">
                          {todo.planStartAt}-{todo.planEndAt}
                        </Text>
                      )}
                    </>
                  )}
                </Space>
              </div>
            </Space>

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
        </Card>
      ))}
    </div>
  );
}
