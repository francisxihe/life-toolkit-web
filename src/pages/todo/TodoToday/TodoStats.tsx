'use client';

import { useMemo } from 'react';
import { Card, Grid, Typography } from '@arco-design/web-react';
import { useTodoContext } from '../context/todo-context';

const { Row, Col } = Grid;
const { Title, Text } = Typography;

export function TodoStats() {
  const { todoList } = useTodoContext();

  const stats = useMemo(() => {
    const total = todoList.length;
    const completed = todoList.filter((todo) => todo.completed).length;
    const pending = total - completed;
    const highPriority = todoList.filter(
      (todo) => todo.importance === 'high' && todo.urgency === 'high'
    ).length;

    return { total, completed, pending, highPriority };
  }, [todoList]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card>
          <Title heading={6}>总计</Title>
          <Text style={{ fontSize: 24, fontWeight: 600 }}>{stats.total}</Text>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Title heading={6}>已完成</Title>
          <Text style={{ fontSize: 24, fontWeight: 600 }}>
            {stats.completed}
          </Text>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Title heading={6}>未完成</Title>
          <Text style={{ fontSize: 24, fontWeight: 600 }}>{stats.pending}</Text>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Title heading={6}>高优先级</Title>
          <Text style={{ fontSize: 24, fontWeight: 600 }}>
            {stats.highPriority}
          </Text>
        </Card>
      </Col>
    </Row>
  );
}
