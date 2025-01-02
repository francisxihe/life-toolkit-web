'use client';

import { useMemo } from 'react';
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

const { Text, Paragraph } = Typography;

export function TodoList() {
  const { todoList, filters, toggleTodo, deleteTodo } = useTodoContext();

  const filteredTodos = useMemo(() => {
    return todoList.filter((todo) => {
      const matchesSearch =
        todo.task.toLowerCase().includes(filters.search.toLowerCase()) ||
        todo.description?.toLowerCase().includes(filters.search.toLowerCase());
      const matchesImportance =
        filters.importance === 'all' || todo.importance === filters.importance;
      const matchesUrgency =
        filters.urgency === 'all' || todo.urgency === filters.urgency;
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'completed' ? todo.completed : !todo.completed);
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.some((tag) => todo.tags.includes(tag));

      return (
        matchesSearch &&
        matchesImportance &&
        matchesUrgency &&
        matchesStatus &&
        matchesTags
      );
    });
  }, [todoList, filters]);

  if (filteredTodos.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '24px',
          color: 'var(--color-text-3)',
        }}
      >
        No todos found matching the current filters
      </div>
    );
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="medium">
      {filteredTodos.map((todo) => (
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
            <Button
              type="primary"
              status="danger"
              size="small"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </Space>
  );
}
