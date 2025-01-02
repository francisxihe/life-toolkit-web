'use client';

import { format } from 'date-fns';
import { Card, Tag, Empty } from '@arco-design/web-react';
import { Todo } from '../../types';
import { getPriorityQuadrant } from '../../constants';

interface CompletedTodoListProps {
  todos: Todo[];
}

export function CompletedTodoList({ todos }: CompletedTodoListProps) {
  if (todos.length === 0) {
    return <Empty description="No completed todos found" className="py-6" />;
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Card key={todo.id} className="bg-muted/50" bordered={false}>
          <div className="flex justify-between items-start">
            <div>
              <p className="line-through text-muted-foreground font-medium">
                {todo.task}
              </p>
              {todo.description && (
                <p className="text-sm line-through text-muted-foreground mt-1">
                  {todo.description}
                </p>
              )}
            </div>
            <Tag color="arcoblue">
              {getPriorityQuadrant(todo.importance, todo.urgency)}
            </Tag>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {todo.tags.map((tag, index) => (
              <Tag key={index} color="gray" bordered>
                {tag}
              </Tag>
            ))}
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground mt-2">
            <span>Created: {format(new Date(todo.startDateTime), 'PPp')}</span>
            <span>Completed: {format(new Date(todo.completedAt), 'PPp')}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
