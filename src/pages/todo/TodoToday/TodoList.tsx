'use client';

import {
  Checkbox,
  Card,
  Button,
  Tag,
  Space,
  Typography,
} from '@arco-design/web-react';
import { useTodoContext } from '../context/TodoContext';
import { getPriorityQuadrant } from '../constants';
import { Todo } from '../types';
import { Popover } from '@arco-design/web-react';

const { Text, Paragraph } = Typography;

export function TodoList({ todoList }: { todoList: Todo[] }) {
  const { toggleTodo, deleteTodo, abandonTodo } = useTodoContext();

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="medium">
      {todoList.map((todo) => (
        <Card key={todo.id} style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Space align="start">
              <Checkbox
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
                  <Text type="secondary">Due: {todo.endDateTime}</Text>
                  <Text type="secondary">
                    优先级:
                    {getPriorityQuadrant(todo.importance, todo.urgency)}
                  </Text>
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
    </Space>
  );
}
